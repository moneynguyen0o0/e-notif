import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  id: String,
  email: { type: String, unique: true, lowercase: true },
  password: String,
  first_name: { type: String, default: '' },
  last_name: { type: String, default: '' },
  created: { type: Date, default: Date.now },
  tokens: Array,
  resetPasswordToken: String,
  resetPasswordExpires: Date
});

/*
 Defining our own custom document instance method
 */
UserSchema.methods = {
  comparePassword(candidatePassword, cb) {
    if (candidatePassword === this.password) {
      return cb(null, true);
    }

    return cb(err);
  }
};

export default mongoose.model('User', UserSchema);
