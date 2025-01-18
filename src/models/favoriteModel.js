const mongoose = require('mongoose');
const { Schema, model, Types } = mongoose;

const favoriteSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: 'User',
      required: true
    },
    favoriteLectures: [
      {
        type: Types.ObjectId,
        ref: 'Lecture'
      }
    ],
    favoriteCourses: [
      {
        type: Types.ObjectId,
        ref: 'Courses'
      }
    ]
  },
  {
    timestamps: true, 
  }
);

module.exports = model('Favorite', favoriteSchema);
