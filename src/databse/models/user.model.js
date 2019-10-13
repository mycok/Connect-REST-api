import mongoose from 'mongoose';
import crypto from 'crypto';

import { emailRegex, passwordRegex } from '../../utils/validations';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: 'A name is required!',
  },
  email: {
    type: String,
    trim: true,
    unique: 'Email already exists',
    required: 'An email address is required!',
  },
  hashed_password: {
    type: String,
  },
  salt: String,
}, { timestamps: true });

UserSchema.virtual('password')
  .set(function (password) {
    this._password = password;
    this.salt = this.generateSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

UserSchema.methods = {
  verifyPassword: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },
  encryptPassword: function (password) {
    if (!password) return '';
    try {
      return crypto
        .createHmac('sha1', this.salt)
        .update(password)
        .digest('hex');
    } catch (err) {
      return err;
    }
  },
  generateSalt: function () {
    return `${Math.round((new Date().valueOf() * Math.random()))} ''`;
  },
};

UserSchema.path('email').validate(emailRegex, 'Please provide a valid email address!');

UserSchema.path('name').validate(function (value) {
  const minNameLength = 3;
  if (value.length < minNameLength) this.invalidate('name', 'A username must contain atleast 3 characters!');
}, null);

UserSchema.path('hashed_password').validate(function () {
  if (this.isNew && !this._password) {
    this.invalidate('password', 'A password is required!');
  } else if (!passwordRegex(this._password)) {
    this.invalidate('password', 'A password must contain a minimum of 8 characters including atleast one an uppercase, lowercase, number and a special character!');
  }
}, null);

export default mongoose.model('User', UserSchema);
