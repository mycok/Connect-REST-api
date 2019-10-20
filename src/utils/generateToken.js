import jwt from 'jsonwebtoken';
import config from '../config';

const { jwtSecret } = config;

const generateToken = (_id, name, email) => jwt.sign(
  { _id, name, email },
  jwtSecret,
  { expiresIn: '1d' },
);

export default generateToken;
