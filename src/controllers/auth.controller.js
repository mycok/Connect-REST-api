import jwt from 'jsonwebtoken';

import User from '../databse/models/user.model';
import ActivationToken from '../databse/models/activationToken.model';

import { onSuccess, onFailure } from '../utils/customResponses';
import generateToken from '../utils/generateToken';
import generateLink from '../utils/generateLink';
import sendAccountActivationEmail from '../mail';
import config from '../config';

class AuthController {
  static async signin(req, res) {
    const { body: { email, password }, protocol, hostname } = req;
    let user = {};

    try {
      user = await User.findOne({ email });
      if (!user) return res.status(401).json({ error: `User with email ${email} doesn't exist!` });
    } catch (err) { return onFailure(res, 401, err); }

    if (!user.doPasswordsMatch(password)) {
      return res.status(401)
        .json({ error: 'Provided password does not match your registered password!' });
    }

    const token = generateToken(user._id, user.name, user.email);
    if (!user.isActive) {
      /*
      This means the user is trying to login after resetting
      their email or didn't activate their account after registration,
      generate a token for the user, mail it to them and tell them to check their inbox
      */
      const link = generateLink(protocol, hostname, config.port, token);
      await new ActivationToken({ _userId: user._id, token: token }).save();
      sendAccountActivationEmail(user.email, user.name, link);
      return res.status(401).json({ error: 'Please activate your account by clicking the link in your email inbox!' });
    }

    res.cookie('t', token, { expire: new Date() + 900000 });
    const data = { token, _id: user._id, name: user.name, email: user.email };
    return onSuccess(res, 200, data, `${user.name} has successfully signed in!`);
  }

  static signout(req, res) {
    res.clearCookie('t');
    return res.status(200).json({ message: 'Signed out' });
  }

  static async activateUserAccount(req, res) {
    const { token } = req.params;
    const { protocol, hostname } = req;
    const { jwtSecret, port } = config;

    try {
      const data = jwt.verify(token, jwtSecret);
      const { _id, name, email } = data;
      const storedToken = await ActivationToken.findOne({ _userId: _id, token });
      const user = await User.findOne({ _id, email });

      if (user && !storedToken && !user.isActive) {
        /*
          if the token is not found and the user account is still inactive,
          it means the token expired before the user had a chance to active their account.
          so we generate a new token for the user and email it
        */
        const newToken = generateToken(_id, name, email);
        const link = generateLink(protocol, hostname, port, newToken);
        await new ActivationToken({ _userId: _id, token: newToken }).save();
        sendAccountActivationEmail(email, name, link);

        return res.status(401).json({
          error: 'Provided token is invalid or expired!. A new link has been sent to your inbox, click the new link to activate your account!',
        });
      }

      if (!storedToken && user && user.isActive) return res.status(401).json({ error: 'Your account is already active!. Please login' });
      if (user && storedToken && !storedToken.isActive) return res.status(401).json({ error: 'This link has already been used to activate your account!. Please login' });

      await ActivationToken.findOneAndUpdate({ _userId: _id, token }, { isActive: false });
      await User.findOneAndUpdate({ _id, email }, { isActive: true });
    } catch (err) {
      return onFailure(res, 401, err);
    }
    return res.status(200).json({ message: 'Your account has been activated!: Please login to access your account' });
  }
}

export default AuthController;
