const mongoose = require('mongoose');
const { Schema, model, Types } = mongoose;

const intructorSchema = new Schema(
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
    intructorPhoneNumber: {
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

module.exports = model('Instructor', intructorSchema);