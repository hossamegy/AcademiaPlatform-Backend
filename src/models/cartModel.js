const mongoose = require('mongoose');
const { Schema, model, Types } = mongoose;

const cardSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: 'User',
      required: true
    },
    cardType: {
      type: String,
      enum: ['Subscription', 'Payment', 'Course Access'],
      required: true
    },
    cardDetails: {
      type: String,
      required: true
    },
    validUntil: {
      type: Date,
      required: true
    },
  },
  {
    timestamps: true
  }
);

module.exports = model('Card', cardSchema);
