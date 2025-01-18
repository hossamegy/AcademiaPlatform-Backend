const Assignments = require('../models/assignmentModel');
const factory = require('./factory');
const statusCode = require('http-status-codes');
const asyncWrapper = require('../middlewares/async-wrapper');
const BadError = require('../errors/bad-error');


const getAllAssignments = factory.getAllDocument(Assignments, 'Assignment');

const getAssignment = factory.getDocumentById(Assignments, 'Assignment');

const getStudentAssignment = asyncWrapper(async (req, res, next) => {
  const studentAssignment = await Assignments.find({ _id: req.params.id }).populate('submissions.studentId');
  if (!studentAssignment) {
    throw new BadError(`No documentName found with id DocumentID`);
  }

  res.status(200).json({
    message: 'success',
    data: {
      studentAssignment
    }
  })

});

const createAssignment = factory.createDocument(Assignments, 'Assignment');

const updateAssignmentData = factory.updateDocument(Assignments, 'Assignment');

const deleteAssignment = factory.deleteDocument(Assignments, 'Assignment');

module.exports = {
  getAllAssignments,
  getAssignment,
  createAssignment,
  updateAssignmentData,
  deleteAssignment,
  getStudentAssignment
};