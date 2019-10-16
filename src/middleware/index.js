import expressJwt from 'express-jwt';
import config from '../config';

const userModelSanitizer = (req, res, next) => {
  const { body } = req;
  const userProperties = Object.keys(body);
  const requiredNumberOfUserProperties = 3;

  if (userProperties.length !== requiredNumberOfUserProperties) {
    return res.status(400).json({
      error: 'User object requires only three properties',
      sample: {
        name: 'sample-name',
        email: 'sample-email',
        password: 'sample-password',
      },
    });
  }

  return next();
};

const authenticate = expressJwt({
  secret: config.jwtSecret,
  userProperty: 'auth',
});


const authorize = (req, res, next) => {
  const isAuthorized = req.user && req.auth && req.user._id == req.auth._id;

  if (!isAuthorized) {
    return res.status(401).json({ error: 'Unauthorized access!' });
  }
  next();
};


export {
  userModelSanitizer,
  authenticate,
  authorize,
};
