const mongoose = require('mongoose');
const { Schema, model, Types } = mongoose;

const lectureSchema = new Schema(
  {
    courseID: Types.ObjectId,
    link: String,
    name: String,
    classes: String,
  },
  {
    timestamps: true
  }
);

module.exports = model('Lecture', lectureSchema);
