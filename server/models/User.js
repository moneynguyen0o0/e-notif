import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import * as Role from '../constants/Role';

const UserSchema = new mongoose.Schema({
  id: String,
  email: { type: String, unique: true, lowercase: true },
  password: String,
  first_name: { type: String, default: '' },
  last_name: { type: String, default: '' },
  roles: { type: Array, default: [Role.USER] },
  created: { type: Date, default: Date.now },
  tokens: Array,
  resetPasswordToken: String,
  resetPasswordExpires: Date
});

// Issue: https://github.com/Automattic/mongoose/issues/4537
function encryptPassword(next) {
  if (!this.isModified('password')) return next();

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err);

      this.password = hash;

      return next();
    });
  });
};

/**
 * Password hash middleware.
 */
UserSchema.pre('save', encryptPassword);

/*
 Defining our own custom document instance method
 */
UserSchema.methods = {
  comparePassword(password, cb) {
      bcrypt.compare(password, this.password, (err, isMatch) => {
      console.log(isMatch);

      if (err) return cb(err);

      return cb(null, isMatch);
    });
  }
};

export default mongoose.model('User', UserSchema);
