const express = require('express');
const reviewController = require('../controllers/reviewController');
const { protect, optionalAuth, admin } = require('../middlewares/auth');
const { rules, validate } = require('../utils/validators');

const router = express.Router({ mergeParams: true });

// Public: list reviews for a product.
router.get('/product/:productId', reviewController.listReviews);

// Optional auth: logged-in or guest can add a review.
router.post(
  '/product/:productId',
  optionalAuth,
  rules.review,
  validate,
  reviewController.addReview
);

// Delete a review (owner or admin). protect enforces a token.
router.delete('/:id', protect, reviewController.deleteReview);

module.exports = router;
