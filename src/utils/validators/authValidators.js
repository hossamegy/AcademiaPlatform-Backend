const { check } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validators');
const User = require('../../models/userModel');


const signUpValidator = [
  check('firstName')
    .notEmpty().withMessage('First name is required')
    .isLength({ min: 2, max: 50 }).withMessage('First name must be between 2 and 50 characters'),

  check('lastName')
    .notEmpty().withMessage('Last name is required')
    .isLength({ min: 2, max: 50 }).withMessage('Last name must be between 2 and 50 characters'),

  check('userPhoneNumber')
    .notEmpty().withMessage('Student phone number is required')
    .isMobilePhone('ar-EG').withMessage('Invalid phone number format')
    .custom(async (val) => {
      const user = await User.findOne({ userPhoneNumber: val });
      if (user) {
        return Promise.reject(new Error('Phone number already exists'));
      }
    }),

  check('parentPhoneNumber')
    .notEmpty().withMessage('Parent phone number is required')
    .isMobilePhone('ar-EG').withMessage('Invalid phone number format')
    .custom(async (val) => {
      const user = await User.findOne({ parentPhoneNumber: val });
      if (user) {
        return Promise.reject(new Error('Parent phone number already exists'));
      }
    }),

  check('email')
    .notEmpty().withMessage('E-mail address is required')
    .isEmail().withMessage('Invalid E-mail address format')
    .custom(async (val) => {
      const user = await User.findOne({ email: val });
      if (user) {
        return Promise.reject(new Error('E-mail address already exists'));
      }
    }),

  check('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
    .custom((password, {  req }) => {
      if (password != req.body.passwordConfirm) {
        throw new Error('Password confirmation incorrect')
      }
      return true
    }),

  check('passwordConfirm')
  .notEmpty().withMessage('Password confirmation is required'),

  validatorMiddleware
];

const loginValidator = [
  check('email')
    .notEmpty().withMessage('E-mail address is required')
    .isEmail().withMessage('Invalid E-mail address format'),

  check('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),

  validatorMiddleware
];

module.exports = {
  signUpValidator,
  loginValidator
};
