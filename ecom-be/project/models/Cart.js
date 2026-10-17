// const mongoose = require('mongoose');

// /**
//  * Guest cart stored against an anonymous cart token (issued by the API).
//  * Logged-in users can also have a cart, linked via user.
//  */
// const cartItemSchema = new mongoose.Schema(
//   {
//     product: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Product',
//       required: true,
//     },
//     quantity: { type: Number, required: true, min: 1, default: 1 },
//     // Price snapshot at the time the item was added (so historical carts
//     // don't change if the product price is later edited).
//     price: { type: Number, required: true, min: 0 },
//   },
//   { _id: false }
// );

// const cartSchema = new mongoose.Schema(
//   {
//     cartToken: { type: String, unique: true, index: true, sparse: true },
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User',
//       default: null,
//       index: true,
//       sparse: true,
//     },
//     items: [cartItemSchema],
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model('Cart', cartSchema);


const mongoose = require('mongoose');

/**
 * Cart for logged-in users (linked via `user`) or anonymous visitors
 * (identified by `cartToken`).
 *
 * NOTE: logged-in users ke cart me `cartToken` field SET MAT karo (missing rakho,
 * null nahi). Sparse unique index sirf missing field ko skip karta hai, explicit
 * null ko nahi — null dene se 2nd user ka cart duplicate key error dega.
 */
const cartItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    // Product.variants me _id nahi hai, isliye label se match hota hai.
    // Variant wala product na ho to null.
    variantLabel: { type: String, default: null, trim: true },
    quantity: { type: Number, required: true, min: 1, default: 1 },
    // Sirf reference ke liye. Real price hamesha Product se live nikalo.
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