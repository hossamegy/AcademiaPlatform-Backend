const bycrpt = require('bcrypt');
const { check, body } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validators');
const User = require('../../models/userModel');
const BadError = require('../../errors/bad-error');

const getUserValidator = [
  check('id').isMongoId().withMessage('Invalid user id'),
  validatorMiddleware
];

const createUserValidator = [
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
    .custom((password, { req }) => {
      if (password != req.body.passwordConfirm) {
        throw new Error('Password confirmation incorrect')
      }
      return true
    }),

  check('passwordConfirm')
    .notEmpty().withMessage('Password confirmation is required'),

  check('role').optional(),

  validatorMiddleware
];

const updateUserValidator = [
  check('id').isMongoId().withMessage('Invalid user id'),
  check('firstName')
    .optional()
    .isLength({ min: 2, max: 50 }).withMessage('First name must be between 2 and 50 characters'),

  check('lastName')
    .optional()
    .isLength({ min: 2, max: 50 }).withMessage('Last name must be between 2 and 50 characters'),

  check('userPhoneNumber')
    .optional()
    .isMobilePhone('ar-EG').withMessage('Invalid phone number format')
    .custom(async (val) => {
      const user = await User.findOne({ userPhoneNumber: val });
      if (user) {
        return Promise.reject(new Error('Phone number already exists'));
      }
    }),

  check('parentPhoneNumber')
    .optional()
    .isMobilePhone('ar-EG').withMessage('Invalid phone number format')
    .custom(async (val) => {
      const user = await User.findOne({ parentPhoneNumber: val });
      if (user) {
        return Promise.reject(new Error('Parent phone number already exists'));
      }
    }),

  check('email')
    .optional()
    .isEmail().withMessage('Invalid E-mail address format')
    .custom(async (val) => {
      const user = await User.findOne({ email: val });
      if (user) {
        return Promise.reject(new Error('E-mail address already exists'));
      }
    }),

  check('password')
    .optional()
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  check('role').optional(),
  validatorMiddleware
];

const changeUserPasswordValidator = [
  check('id').isMongoId().withMessage('Invalid user id'),
  body('currentPassword')
  .notEmpty().withMessage('You must enter your current password'),

  body('passwordConfirm')
  .notEmpty().withMessage('You must enter the password confirm'),
  body('password')
  .notEmpty().withMessage('You must enter the password')
  .custom(async(val, { req }) => {
    const user = await User.findById(req.params.id);
    if (!user) {
      throw new BadError('There is no user for this id');
    };
    const isCorrectPassword = await bycrpt.compare(req.body.currentPassword, user.password);
    if (!isCorrectPassword) {
      throw new BadError('Incorrect current password');
    }
    if (val != req.body.passwordConfirm) {
      throw new BadError('Incorrect password confirm');
    }
  }),

  validatorMiddleware
]

const deleteUserValidator = [
  check('id').isMongoId().withMessage('Invalid user id'),
  validatorMiddleware
];

module.exports = {
  getUserValidator,
  createUserValidator,
  updateUserValidator,
  changeUserPasswordValidator,
  deleteUserValidator
};
