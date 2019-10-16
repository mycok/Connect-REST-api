import jwt from 'jsonwebtoken';

import config from '../config';
import User from '../databse/models/user.model';
import { onSuccess, onFailure } from '../utils/customResponses';

class AuthController {
  static async signin(req, res) {
    const { body: { email, password } } = req;
    const { jwtSecret } = config;
    let user = {};

    try {
      user = await User.findOne({ email });
      if (!user) return res.status(401).json({ error: `User with email ${email} doesn't exist!` });
    } catch (err) {
      return onFailure(res, 401, err);
    }

    if (!user.doPasswordsMatch(password)) {
      return res.status(401)
        .json({ error: 'Provided password does not match the registered password!' });
    }

    const token = jwt.sign(
      { _id: user._id, email: user.email },
      jwtSecret,
      { expiresIn: '1d' },
    );

    res.cookie('t', token, {
      expire: new Date() + 900000,
    });

    const data = {
      token,
      _id: user._id,
      name: user.name,
      email: user.email,
    };

    return onSuccess(res, 200, data, `${user.name} has successfully signed in!`);
  }

  static signout(req, res) {
    res.clearCookie('t');
    return res.status(200).json({ message: 'Signed out' });
  }
}

export default AuthController;
