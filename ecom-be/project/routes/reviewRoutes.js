// const express = require('express');
// const reviewController = require('../controllers/reviewController');
// const { protect, optionalAuth, admin } = require('../middlewares/auth');
// const { rules, validate } = require('../utils/validators');

// const router = express.Router({ mergeParams: true });

// // Public: list reviews for a product.
// router.get('/product/:productId', reviewController.listReviews);

// // Optional auth: logged-in or guest can add a review.
// router.post(
//   '/product/:productId',
//   optionalAuth,
//   rules.review,
//   validate,
//   reviewController.addReview
// );

// // Delete a review (owner or admin). protect enforces a token.
// router.delete('/:id', protect, reviewController.deleteReview);

// module.exports = router;

const express = require('express');
const reviewController = require('../controllers/reviewController');
const { protect, optionalAuth, admin } = require('../middlewares/auth');
const { rules, validate } = require('../utils/validators');
const reviewUpload = require('../middlewares/reviewUpload'); // 👈 add this

const router = express.Router({ mergeParams: true });

router.get('/product/:productId', reviewController.listReviews);

// router.post(
//   '/product/:productId',
//   optionalAuth,
//   reviewUpload.array('images', 5),   // 👈 order matters — parses multipart body
//   rules.review,
//   validate,
//   reviewController.addReview
// );
router.post(
  '/product/:productId',
  optionalAuth,
  reviewUpload.array('images', 5),
  (req, res, next) => {           // 👈 temporary debug middleware
    console.log('BODY:', req.body);
    console.log('FILES:', req.files);
    next();
  },
  rules.review,
  validate,
  reviewController.addReview
);

router.delete('/:id', protect, reviewController.deleteReview);

module.exports = router;