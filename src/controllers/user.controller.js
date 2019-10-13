import User from '../databse/models/user.model';
import {
  onFailure,
  onSuccess,
  onDuplicates,
} from '../utils/customResponses';

class UserController {
  static async create(req, res) {
    const { body } = req;
    let user = {};

    try {
      user = await new User(body).save();
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
      users = await User.find().select('name email, created, updated');
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
    let updatedUser = {};

    try {
      updatedUser = await User.findOneAndUpdate(
        { _id }, body,
        { omitUndefined: true, new: true, runValidators: true },
      )
        .select('name email createdAt updatedAt');
    } catch (err) {
      return onFailure(res, 400, err);
    }

    return onSuccess(res, 200, updatedUser);
  }

  static async delete(req, res) {
    const { user: { name } } = req;
    let deletedResponse = {};
    try {
      deletedResponse = await User.deleteOne();
    } catch (err) {
      return onFailure(res, 400, err);
    }

    return onSuccess(res, 200, deletedResponse, `${name} successfully deleted!`);
  }

  static async fetchUserByID(req, res, next, id) {
    try {
      const user = await User.findById(id, '_id name email');
      if (!user) return res.status(400).json({ error: 'User not found!' });
      req.user = user;
    } catch (err) {
      return onFailure(res, 400, err);
    }

    return next();
  }

  static async checkDuplicatesOnUpdate(req, res, next) {
    const { body } = req;
    const updateParams = Object.keys(body);
    let param = '';

    try {
      if (updateParams.includes('name')) {
        param = 'name';
        const user = await User.findOne({ [param]: body[param] });
        if (user) return onDuplicates(res, 400, body[param]);
      }
      if (updateParams.includes('email')) { param = 'email'; }
      const user = await User.findOne({ [param]: body[param] });
      if (user) return onDuplicates(res, 400, body[param]);
    } catch (err) {
      return onFailure(res, 400, err);
    }
    return next();
  }
}

export default UserController;
