const Review = require('../models/Review');
const Product = require('../models/Product');
const { success, asyncHandler } = require('../utils/apiResponse');

/**
 * Add a review. Logged-in users attach their userId; guests send guestName.
 * One review per logged-in user per product (enforced by schema index).
 */
// const addReview = asyncHandler(async (req, res) => {
//   const { rating, comment, guestName } = req.body;
//   const productId = req.params.productId;

//   const product = await Product.findById(productId);
//   if (!product) {
//     const err = new Error('Product not found');
//     err.status = 404;
//     throw err;
//   }

//   const review = await Review.create({
//     product: productId,
//     user: req.user ? req.user.id : null,
//     guestName: req.user ? null : (guestName || 'Anonymous'),
//     rating,
//     comment,
//   });

//   // Recalculate the product's average rating + count.
//   const agg = await Review.aggregate([
//     { $match: { product: product._id } },
//     { $group: { _id: null, avg: { $avg: '$rating' }, count: { $sum: 1 } } },
//   ]);
//   if (agg[0]) {
//     product.averageRating = Number(agg[0].avg.toFixed(2));
//     product.reviewCount = agg[0].count;
//     await product.save();
//   }

//   success(res, review, 'Review added', 201);
// });

const addReview = asyncHandler(async (req, res) => {
  const { rating, comment, guestName } = req.body;
  const productId = req.params.productId;

  const product = await Product.findById(productId);
  if (!product) {
    const err = new Error('Product not found');
    err.status = 404;
    throw err;
  }

  const images = (req.files || []).map((f) => f.path);

  const review = await Review.create({
    product: productId,
    user: req.user ? req.user.id : null,
    guestName: req.user ? null : (guestName || 'Anonymous'),
    rating,
    comment,
    images,
  });

  const agg = await Review.aggregate([
    { $match: { product: product._id } },
    { $group: { _id: null, avg: { $avg: '$rating' }, count: { $sum: 1 } } },
  ]);
  if (agg[0]) {
    product.averageRating = Number(agg[0].avg.toFixed(2));
    product.reviewCount = agg[0].count;
    await product.save();
  }

  success(res, review, 'Review added', 201);
});

/**
 * Fetch all reviews for a product.
 */
const listReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ product: req.params.productId })
    .populate('user', 'name')
    .sort({ createdAt: -1 });
  success(res, reviews, 'Reviews fetched');
});

/**
 * Delete a review. Admin can delete any; a user can delete their own.
 */
const deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review) {
    const err = new Error('Review not found');
    err.status = 404;
    throw err;
  }
  if (req.user.role !== 'admin' && (!review.user || review.user.toString() !== req.user.id)) {
    const err = new Error('Not authorized to delete this review');
    err.status = 403;
    throw err;
  }
  await review.deleteOne();

  // Recalc product summary.
  const product = await Product.findById(review.product);
  if (product) {
    const agg = await Review.aggregate([
      { $match: { product: product._id } },
      { $group: { _id: null, avg: { $avg: '$rating' }, count: { $sum: 1 } } },
    ]);
    product.averageRating = agg[0] ? Number(agg[0].avg.toFixed(2)) : 0;
    product.reviewCount = agg[0] ? agg[0].count : 0;
    await product.save();
  }

  success(res, null, 'Review deleted');
});

module.exports = { addReview, listReviews, deleteReview };
