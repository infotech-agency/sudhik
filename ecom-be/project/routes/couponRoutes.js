const express = require('express');
const router = express.Router();

const {
  createCoupon,
  getCoupons,
  getCouponById,
  updateCoupon,
  deleteCoupon,
  validateCoupon,
} = require('../controllers/couponController');

// ⚠️ Adjust this import to match your existing admin-auth middleware name
// const { protectAdmin } = require('../middlewares/authMiddleware');

// Public — used at checkout to apply a coupon
router.post('/validate', validateCoupon);

// Admin only
router.get('/', getCoupons);
router.get('/:id', getCouponById);
router.post('/',  createCoupon);
router.put('/:id',  updateCoupon);
router.delete('/:id', deleteCoupon);

module.exports = router;