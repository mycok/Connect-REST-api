import User from '../models/user.model';
import {
  successWithMessage,
  failure,
  success,
  duplicate,
} from '../utils/customResponses';

class UserController {
  static async create(req, res) {
    const { body } = req;
    const user = new User(body);

    try {
      await user.save();
    } catch (err) {
      return failure(res, 400, err);
    }

    return successWithMessage(res, 201, 'Account creation successful');
  }

  static async list(req, res) {
    let users = [];
    try {
      users = await User.find().select('name email, created, updated');
    } catch (err) {
      return failure(res, 400, err);
    }

    return success(res, 200, users);
  }

  static read(req, res) {
    const { user } = req;
    return success(res, 200, user);
  }

  static async update(req, res) {
    const { user: { _id }, body } = req;
    const query = { _id };
    let updatedUser = {};

    try {
      updatedUser = await User.findOneAndUpdate(
        query, body,
        { omitUndefined: true, new: true, runValidators: true },
      )
        .select('name email createdAt updatedAt');
    } catch (err) {
      return failure(res, 400, err);
    }

    return success(res, 200, updatedUser);
  }

  static async delete(req, res) {
    const { user: { _id } } = req;
    let deletedUser = {};

    try {
      deletedUser = await User.deleteOne({ _id });
    } catch (err) {
      return failure(res, 400, err);
    }

    return success(res, 200, deletedUser);
  }

  static async fetchUserByID(req, res, next, id) {
    try {
      const user = await User.findById(id).select('name email');
      if (!user) return res.status(400).json({ error: 'User not found!' });
      req.user = user;
    } catch (err) {
      return failure(res, 400, err);
    }

    return next();
  }

  static async checkDuplicatesOnUpdate(req, res, next) {
    const { body } = req;
    const updateParams = Object.keys(body);
    try {
      if (updateParams.includes('name')) {
        const user = await User.findOne({ name: body.name });
        if (user) return duplicate(res, 400, `${user.name} already exists`);
      }
      if (updateParams.includes('email')) {
        const user = await User.findOne({ email: body.email });
        if (user) return duplicate(res, 400, `${user.email} already exists`);
      }
    } catch (err) {
      return failure(res, 400, err);
    }
    return next();
  }
}

export default UserController;
