const mongoose = require('mongoose');

/**
 * Guest cart stored against an anonymous cart token (issued by the API).
 * Logged-in users can also have a cart, linked via user.
 */
const cartItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: { type: Number, required: true, min: 1, default: 1 },
    // Price snapshot at the time the item was added (so historical carts
    // don't change if the product price is later edited).
    price: { type: Number, required: true, min: 0 },
  },
  { _id: false }
);

const cartSchema = new mongoose.Schema(
  {
    cartToken: { type: String, unique: true, index: true, sparse: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
      index: true,
      sparse: true,
    },
    items: [cartItemSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Cart', cartSchema);
