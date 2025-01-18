const express = require('express');
const {
  getInstructorValidator,
  createInstructorValidator,
  updateIntructorValidator,
  changePasswordValidator,
  deleteIntructorValidator
} = require('../utils/validators/instructorValidators');
const {
  getAllInstructors,
  getInstructor,
  createInstructor,
  updateInstructorData,
  deleteInstructor,
  changeInstructorPassword
} = require('../controllers/instructorController');

// Not use auth to test routes
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router()

router.route('/')
  .get(getAllInstructors)
  .post(createInstructorValidator, createInstructor);

router.route('/:id')
  .get(getInstructorValidator, getInstructor)
  .put(updateIntructorValidator, updateInstructorData)
  .delete(deleteIntructorValidator, deleteInstructor);

router.route('/changeUserPassword/:id').put(changePasswordValidator, changeInstructorPassword);

module.exports = router;