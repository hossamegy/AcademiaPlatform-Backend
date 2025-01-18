const asyncWrapper = require('../middlewares/async-wrapper');
const BadError = require('../errors/bad-error');
const Instructors = require('../models/instructorModel');
const factory = require('./factory');

const getAllInstructors = factory.getAllDocument(Instructors, 'Instructors');

const getInstructor = factory.getDocumentById(Instructors, 'Instructor');

const createInstructor = factory.createDocument(Instructors, 'Instructor');

const updateInstructorData = factory.updateDocument(Instructors, 'Instructor');

const deleteInstructor = factory.deleteDocument(Instructors, 'Instructor');

const changeInstructorPassword = factory.changePassword(Instructors, 'Instructor');



module.exports = {
  getAllInstructors,
  getInstructor,
  createInstructor,
  updateInstructorData,
  deleteInstructor,
  changeInstructorPassword
};
