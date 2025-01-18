const mongoose = require('mongoose');
const { Schema, model, Types } = mongoose;

const CourseSchema = new Schema(
  {
    courseImage: String,
    courseName: String,
    description: String,
    price: Number,
    lecturesID: [
      {
        type: Types.ObjectId,
        ref: 'Lecture'
      }
    ],
    studentsID: [
      {
        type: Types.ObjectId,
        ref: 'User'
      }
    ],
    instructorID: [
      {
        type: Types.ObjectId,
        ref: 'Instructor'
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = model('Course', CourseSchema);
