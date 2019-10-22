import User from '../databse/models/user.model';
import ActivationToken from '../databse/models/activationToken.model';
import { onFailure, onSuccess, onDuplicates } from '../utils/customResponses';
import generateToken from '../utils/generateToken';
import generateLink from '../utils/generateLink';
import sendAccountActivationEmail from '../mail';
import config from '../config';
import { passwordRegex } from '../utils/validations';

class UserController {
  static async create(req, res) {
    const { body, protocol, hostname } = req;
    const { port } = config;
    let user = {};

    try {
      user = await new User(body).save();

      if (user) {
        const { _id, name, email } = user;
        const token = generateToken(_id, name, email);
        await new ActivationToken({ _userId: _id, token }).save();
        const link = generateLink(protocol, hostname, port, token);
        sendAccountActivationEmail(email, name, link);
      }
    } catch (err) {
      return onFailure(res, 400, err);
    }
    user.salt = undefined;
    user.hashed_password = undefined;
    user.createdAt = undefined;
    user.updatedAt = undefined;

    return onSuccess(res, 201, user, 'Account creation successful');
  }

  static async list(req, res) {
    let users = [];

    try {
      users = await User.find().select('_id name email isActive');
    } catch (err) {
      return onFailure(res, 400, err);
    }

    return onSuccess(res, 200, users);
  }

  static read(req, res) {
    const { user } = req;
    return onSuccess(res, 200, user);
  }

  static async update(req, res) {
    const { user: { _id }, body } = req;
    const propertiesToUpdate = { ...body };
    let updatedUser = {};

    if (propertiesToUpdate.email) propertiesToUpdate.isActive = false;

    try {
      updatedUser = await User.findOneAndUpdate(
        { _id }, propertiesToUpdate,
        { omitUndefined: true, new: true, runValidators: true },
      )
        .select('name email isActive createdAt updatedAt');
    } catch (err) {
      return onFailure(res, 400, err);
    }

    return onSuccess(res, 200, updatedUser);
  }

  static async remove(req, res) {
    const { user: { name } } = req;
    let deletedResponse = {};

    try {
      deletedResponse = await User.deleteOne();
    } catch (err) {
      return onFailure(res, 400, err);
    }

    return onSuccess(res, 200, deletedResponse, `${name} successfully deleted!`);
  }

  static async passwordReset(req, res) {
    const { body: { oldPassword, newPassword }, user: { _id, email } } = req;

    try {
      const user = await User.findOne({ _id, email });

      if (!user.doPasswordsMatch(oldPassword)) return res.status(400).json({ error: 'oldPassword does not match your registered password!' });
      if (!passwordRegex(newPassword)) {
        return res.status(400).json({ error: 'A password must contain a minimum of 8 characters including atleast one an uppercase, lowercase, number and a special character!' });
      }

      const hashedPassword = user.encryptPassword(newPassword);
      await User.findOneAndUpdate({ _id, email }, { hashed_password: hashedPassword });
    } catch (err) {
      return onFailure(res, 400, err);
    }
    return res.status(200).json({ success: 'Password reset sucessful!' });
  }

  static async fetchUserByID(req, res, next, id) {
    try {
      const user = await User.findById(id, '_id name email isActive');

      if (!user) return res.status(400).json({ error: 'User not found!' });
      req.user = user;
    } catch (err) {
      return onFailure(res, 400, err);
    }

    return next();
  }

  static async checkDuplicatesOnUpdate(req, res, next) {
    const { body } = req;
    const propertiesToUpdate = Object.keys(body);

    try {
      for (const property of propertiesToUpdate) {
        if (property === 'name' || property === 'email') {
          const user = await User.findOne({ [property]: body[property] });
          if (user) return onDuplicates(res, 400, body[property]);
        }
      }
    } catch (err) {
      return onFailure(res, 400, err);
    }
    return next();
  }
}

export default UserController;
