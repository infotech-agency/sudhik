const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
      index: true,
    },
    user: {
      // Null for anonymous guest reviews.
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    guestName: { type: String, default: null, trim: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

// One review per product per user (guest reviews allowed without this constraint).
reviewSchema.index({ product: 1, user: 1 }, { unique: true, partialFilterExpression: { user: { $type: 'ObjectId' } } });

module.exports = mongoose.model('Review', reviewSchema);
