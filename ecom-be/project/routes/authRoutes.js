const express = require('express');
const { passport, ensureGoogleStrategy } = require('../config/passport');
const authController = require('../controllers/authController');
const { protect, optionalAuth } = require('../middlewares/auth');
const { rules, validate } = require('../utils/validators');
const { asyncHandler } = require('../utils/apiResponse');

const router = express.Router();

// --- Admin ---
router.post('/admin/create', rules.adminLogin, validate, authController.createAdmin);
router.post('/admin/login', rules.adminLogin, validate, authController.loginAdmin);

// --- User email/password ---
const { authRateLimiter } = require('../middlewares/rateLimiter');

router.post('/signup', authRateLimiter, rules.userSignup, validate, authController.signup);
router.post('/login', authRateLimiter, rules.userLogin, validate, authController.login);
router.post('/verify-otp', authRateLimiter, authController.verifyOtp);
router.post('/resend-otp', authRateLimiter, authController.resendOtp);
router.post('/forgot-password', authRateLimiter, authController.forgotPassword);
router.post('/verify-forgot-otp', authRateLimiter, authController.verifyForgotOtp);
router.post('/reset-password', authRateLimiter, authController.resetPassword);

// --- Google OAuth (Passport) ---
router.get(
  '/google',
  (req, _res, next) => {
    try {
      ensureGoogleStrategy();
      next();
    } catch (err) {
      next(err);
    }
  },
  passport.authenticate('google', { scope: ['profile', 'email'] })
);
// router.get(
//   '/google/callback',
//   (req, _res, next) => {
//     try {
//       ensureGoogleStrategy();
//       next();
//     } catch (err) {
//       next(err);
//     }
//   },
//   passport.authenticate('google', { session: false, failureRedirect: '/api/auth/google/failed' }),
//   asyncHandler(async (req, res) => {
//     const { user, token } = req.user;
//     const redirect = process.env.GOOGLE_LOGIN_SUCCESS_URL || 'http://localhost:3000/login?google=1';
//     res.redirect(`${redirect}?token=${token}&userId=${user._id}`);
//   })
// );


router.get(
  '/google/callback',
  (req, _res, next) => {
    try {
      ensureGoogleStrategy();
      next();
    } catch (err) {
      next(err);
    }
  },
  passport.authenticate('google', { session: false, failureRedirect: '/api/auth/google/failed' }),
  asyncHandler(async (req, res) => {
    const { user, token } = req.user;
    const baseUrl = process.env.GOOGLE_LOGIN_SUCCESS_URL || 'http://localhost:3000/auth/login';
    res.redirect(`${baseUrl}?google=1&token=${token}&userId=${user._id}`);
  })
);

router.get('/google/failed', (_req, res) => {
  res.status(401).json({ success: false, message: 'Google authentication failed' });
});

// --- Current user (any logged-in token) ---
// router.get('/me', protect, authController.getMe, (req, res) => {
//   res.json({ success: true, data: { id: req.user.id, role: req.user.role } });
// });
// --- Current user (any logged-in token) ---
router.get('/me', protect, authController.getMe);
module.exports = router;
