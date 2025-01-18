const bycrpt = require('bcrypt');
const { check, body } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validators');
const Admins = require('../../models/adminModel');
const BadError = require('../../errors/bad-error');

const getAdminValidator = [
  check('id').isMongoId().withMessage('Invalid admain id'),
  validatorMiddleware
];

const createAdminValidator = [
  check('firstName')
    .notEmpty().withMessage('First name is required')
    .isLength({ min: 2, max: 50 }).withMessage('First name must be between 2 and 50 characters'),

  check('lastName')
    .notEmpty().withMessage('Last name is required')
    .isLength({ min: 2, max: 50 }).withMessage('Last name must be between 2 and 50 characters'),

  check('adminPhoneNumber')
    .notEmpty().withMessage('Student phone number is required')
    .isMobilePhone('ar-EG').withMessage('Invalid phone number format')
    .custom(async (val) => {
      const admin = await Admins.findOne({ adminPhoneNumber: val });
      if (admin) {
        return Promise.reject(new Error('Phone number already exists'));
      }
    }),

  check('email')
    .notEmpty().withMessage('E-mail address is required')
    .isEmail().withMessage('Invalid E-mail address format')
    .custom(async (val) => {
      const admin = await Admins.findOne({ email: val });
      if (admin) {
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

  validatorMiddleware
];

const updateAdminValidator = [
  check('id').isMongoId().withMessage('Invalid admin id'),
  check('firstName')
    .optional()
    .isLength({ min: 2, max: 50 }).withMessage('First name must be between 2 and 50 characters'),

  check('lastName')
    .optional()
    .isLength({ min: 2, max: 50 }).withMessage('Last name must be between 2 and 50 characters'),

  check('adminPhoneNumber')
    .optional()
    .isMobilePhone('ar-EG').withMessage('Invalid phone number format')
    .custom(async (val) => {
      const admin = await Admins.findOne({ adminPhoneNumber: val });
      if (admin) {
        return Promise.reject(new Error('Phone number already exists'));
      }
    }),

  check('email')
    .optional()
    .isEmail().withMessage('Invalid E-mail address format')
    .custom(async (val) => {
      const admin = await Admins.findOne({ email: val });
      if (admin) {
        return Promise.reject(new Error('E-mail address already exists'));
      }
    }),

  check('password')
    .optional()
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),

  validatorMiddleware
];

const changePasswordValidator = [
  check('id').isMongoId().withMessage('Invalid admin id'),
  body('currentPassword')
  .notEmpty().withMessage('You must enter your current password'),

  body('passwordConfirm')
  .notEmpty().withMessage('You must enter the password confirm'),
  body('password')
  .notEmpty().withMessage('You must enter the password')
  .custom(async(val, { req }) => {
    const admin = await Admins.findById(req.params.id);
    if (!admin) {
      throw new BadError('There is no admin for this id');
    };
    const isCorrectPassword = await bycrpt.compare(req.body.currentPassword, admin.password);
    if (!isCorrectPassword) {
      throw new BadError('Incorrect current password');
    }
    if (val != req.body.passwordConfirm) {
      throw new BadError('Incorrect password confirm');
    }
  }),

  validatorMiddleware
]

const deleteAdminValidator = [
  check('id').isMongoId().withMessage('Invalid admin id'),
  validatorMiddleware
];

module.exports = {
  getAdminValidator,
  createAdminValidator,
  updateAdminValidator,
  changePasswordValidator,
  deleteAdminValidator
};
