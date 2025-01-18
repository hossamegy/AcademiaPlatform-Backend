const bycrpt = require('bcrypt');
const { check, body } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validators');
const User = require('../../models/userModel');
const BadError = require('../../errors/bad-error');
const Instructors = require('../../models/instructorModel');


const getInstructorValidator = [
  check('id').isMongoId().withMessage('Invalid Instructor id'),
  validatorMiddleware
]

const createInstructorValidator = [
  check('firstName')
    .notEmpty().withMessage('First name is required')
    .isLength({ min: 2, max: 50 }).withMessage('First name must be between 2 and 50 characters'),

  check('lastName')
    .notEmpty().withMessage('Last name is required')
    .isLength({ min: 2, max: 50 }).withMessage('First name must be between 2 and 50 characters'),

  check('intructorPhoneNumber')
    .notEmpty().withMessage('Phone number is required')
    .isMobilePhone('ar-EG').withMessage('Invalid phone number format')
    .custom(async (val) => {
      const instructor = await Instructors.find({ intructorPhoneNumber: val });
      if (instructor) {
        return Promise.reject(new BadError('Instructor phone number already exists'))
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
    .notEmpty().withMessage('Phone number is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
    .custom((password, { req }) => {
      if (password != req.body.confirmPassword) {
        throw new Error('Password confirmation incorrect')
      }
      return true
    }),
  validatorMiddleware
]

const updateIntructorValidator = [
  check('id').isMongoId().withMessage('Invalid user id'),
  check('firstName')
    .optional()
    .isLength({ min: 2, max: 50 }).withMessage('First name must be between 2 and 50 characters'),

  check('lastName')
    .optional()
    .isLength({ min: 2, max: 50 }).withMessage('Last name must be between 2 and 50 characters'),

  check('intructorPhoneNumber')
    .optional()
    .isMobilePhone('ar-EG').withMessage('Invalid phone number format')
    .custom(async (val) => {
      const user = await User.findOne({ userPhoneNumber: val });
      if (user) {
        return Promise.reject(new Error('Phone number already exists'));
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

  validatorMiddleware
];

const changePasswordValidator = [
  check('id').isMongoId().withMessage('Invalid user id'),
  body('currentPassword')
    .notEmpty().withMessage('You must enter your current password'),

  body('passwordConfirm')
    .notEmpty().withMessage('You must enter the password confirm'),
  body('password')
    .notEmpty().withMessage('You must enter the password')
    .custom(async (val, { req }) => {
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

const deleteIntructorValidator = [
  check('id').isMongoId().withMessage('Invalid user id'),
  validatorMiddleware
];


module.exports = {
  getInstructorValidator,
  createInstructorValidator,
  updateIntructorValidator,
  changePasswordValidator,
  deleteIntructorValidator
};
