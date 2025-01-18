const asyncWrapper = require('../middlewares/async-wrapper');
const CustomError = require('../errors/custom-error');
const BadError = require('../errors/bad-error');
const Lectures = require('../models/lectureModel');
const Courses = require('../models/courseModel');
const factory = require('./factory');
const statusCode = require('http-status-codes');

const getAllLectures = factory.getAllDocument(Lectures, 'lectures');

const getLecture = factory.getDocumentById(Lectures, 'lecture');


const createLecture = asyncWrapper(async (req, res) => {
  const { courseID, link, name, classes } = req.body;

  const course = await Courses.findById(courseID);
  if (!course) {
    throw new BadError('Course not found');
  }

  const newLecture = new Lectures({ courseID, link, name, classes });
  await newLecture.save();

  course.lecturesID.push(newLecture._id);

  await course.save();
  res.status(statusCode.CREATED).json({
    message: 'Lecture created and added to course successfully',
    data: newLecture
  });
});


const deleteLecture = asyncWrapper(async (req, res) => {
  const { lectureId } = req.params;

  const lecture = await Lectures.findById(lectureId);
  if (!lecture) {
    throw new BadError('Lecture not found');
  }

  await Courses.updateMany(
    { 'lectures.lectureID': lectureId },
    { $pull: { lectures: { lectureID: lectureId } } }
  );

  await Lectures.findByIdAndDelete(lectureId);

  res.status(statusCode.OK).json({
    message: 'Deleted success',
    data: lecture
  });
});

module.exports = {
  getAllLectures,
  getLecture,
  createLecture,
  deleteLecture
};
