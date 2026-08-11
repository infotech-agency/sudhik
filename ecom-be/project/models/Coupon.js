const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, 'Coupon code is required'],
      unique: true,
      trim: true,
      uppercase: true,
    },
    discountType: {
      type: String,
      enum: ['FLAT', 'PERCENTAGE'],
      required: true,
    },
    amount: {
      type: Number,
      required: [true, 'Discount amount/percentage is required'],
      min: 0,
    },
    minOrderAmount: {
      type: Number,
      default: 0,
      min: 0,
    },
    usageLimit: {
      type: Number,
      default: null, // null = unlimited
      min: 1,
    },
    usedCount: {
      type: Number,
      default: 0,
    },
    expiryDate: {
      type: Date,
      default: null, // null = never expires
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Validate percentage doesn't exceed 100
couponSchema.pre('save', function (next) {
  if (this.discountType === 'PERCENTAGE' && this.amount > 100) {
    return next(new Error('Percentage discount cannot exceed 100'));
  }
  next();
});

module.exports = mongoose.model('Coupon', couponSchema);