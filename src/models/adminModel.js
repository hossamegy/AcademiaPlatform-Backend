const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema, model } = mongoose;

const AdminSchema = new Schema(
  {
    profileImg: {
      type: String,
    },
    firstName: {
      type: String,
      trim: true,
      required: [true, 'First name is required'],
      minlength: [2, 'First name should have at least 9 characters'],
      maxlength: [50, 'First name should not exceed 20 characters'],
    },
    lastName: {
      type: String,
      trim: true,
      required: [true, 'Last name is required'],
      minlength: [2, 'Last name should have at least 2 characters'],
      maxlength: [50, 'Last name should not exceed 50 characters'],
    },
    adminPhoneNumber: {
      type: String,
      required: [true, 'User phone number is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      require: [true, 'Password is required'],
      minlength: [6, 'Password should have at least 6 characters'],
    },
  }
);

AdminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

module.exports = model('Admain', AdminSchema);