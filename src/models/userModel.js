const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema(
  {
    img: {
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
    userPhoneNumber: {
      type: String,
      required: [true, 'User phone number is required'],
    },
    parentPhoneNumber: {
      type: String,
      required: [true, 'Parent phone number is required'],
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
    proofOfIdentity: {
      type: String,
      required: [true, 'Proof of identity is required'],
    },
    classes: {
      type: String,
      required: [true, 'Class is required'],
      enum: {
        values: ['Class 1', 'Class 2', 'Class 3'],
        message: 'Invalid class, please select a valid class',
      },
    },
    section: {
      type: String,
      required: [true, 'Section is required'],
    },
    school: {
      type: String,
      required: [true, 'School is required'],
    },
    birthDate: {
      type: Date,
      required: [true, 'Birth date is required'],
    },
    city: {
      type: String,
      required: [true, 'City is required'],
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    passwordChangeAt: Date
  },
  {
    timestamps: true,
  }
);

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

module.exports = mongoose.model('User', UserSchema);
