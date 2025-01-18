const Courses = require('../models/courseModel');
const factory = require('./factory');
const asyncWrapper = require('../middlewares/async-wrapper');
const BadError = require('../errors/bad-error');
const Users = require('../models/userModel');

const getAllCourse = factory.getAllDocument(Courses, 'Courses');

const getCourse = factory.getDocumentById(Courses, 'Courses');

const createCourse = factory.createDocument(Courses, 'Courses');

const updateCourseData = factory.updateDocument(Courses, 'Courses');

const deleteCourse = factory.deleteDocument(Courses, 'Courses');

const getAllLecturesCourse = factory.getRelatedDocuments(Courses, 'Courses');


const getAllStudentsCourse = factory.getRelatedDocuments(Users, 'Users');



module.exports = {
  getAllCourse,
  getCourse,
  createCourse,
  updateCourseData,
  deleteCourse,
  getAllLecturesCourse
};
