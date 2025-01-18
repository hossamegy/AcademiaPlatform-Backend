const mongoose = require('mongoose');
const { Schema, model, Types } = mongoose;

const AssignmentSchema = new Schema({
  title: String,
  description: String,
  deadline: Date,
  
  submissions: [{
    studentID: {
      type: Types.ObjectId,
      ref: 'User'
    },
    fileUrl: String,
    grade: Number
  }],

  courses: [{
    courseID: {
      type: Types.ObjectId,
      ref: 'Course'
    }
  }]
});

module.exports = model('Assignment', AssignmentSchema);
