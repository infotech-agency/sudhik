const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateToken } = require('../utils/generateToken');
const { success } = require('../utils/apiResponse');
const { asyncHandler } = require('../utils/apiResponse');
const Order = require('../models/Order');
const emailService = require('../services/emailService');

/**
 * Admin login. Returns a JWT scoped to role 'admin'.
 */
const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
  if (!user || user.role !== 'admin') {
    const err = new Error('Invalid admin credentials');
    err.status = 401;
    throw err;
  }
  const ok = await user.matchPassword(password);
  if (!ok) {
    const err = new Error('Invalid admin credentials');
    err.status = 401;
    throw err;
  }
  const token = generateToken(user._id, user.role);
  success(res, { token, user: { id: user._id, name: user.name, email: user.email, role: user.role } }, 'Admin login successful');
});

/**
 * Create the initial admin account (only used for first-time setup).
 * Refuses to run if any admin already exists.
 */
const createAdmin = asyncHandler(async (req, res) => {
  const adminCount = await User.countDocuments({ role: 'admin' });
  if (adminCount > 0) {
    const err = new Error('An admin account already exists');
    err.status = 409;
    throw err;
  }
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email: email.toLowerCase(),
    password,
    role: 'admin',
    isGuest: false,
    isEmailVerified: true,
  });
  const token = generateToken(user._id, user.role);
  success(res, { token, user: { id: user._id, name: user.name, email: user.email, role: user.role } }, 'Admin account created', 201);
});

/**
 * Generates and saves OTP details to a user.
 */
const generateAndSendOtp = async (user, type = 'verify') => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6 digit OTP
  const salt = await bcrypt.genSalt(10);
  const otpHash = await bcrypt.hash(otp, salt);

  user.otpHash = otpHash;
  user.otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 mins
  user.otpAttempts = 0;
  user.lastOtpSentAt = new Date();

  await user.save();

  if (type === 'verify') {
    await emailService.sendVerificationOtp(user.email, user.name, otp);
  } else if (type === 'reset') {
    await emailService.sendPasswordResetOtp(user.email, user.name, otp);
  }
};

/**
 * User signup (email + password). Initiates OTP verification.
 */
const signup = asyncHandler(async (req, res) => {
  const { name, email, password, phone } = req.body;
  const normalizedEmail = email.toLowerCase().trim();

  let user = await User.findOne({ email: normalizedEmail });

  if (user) {
    if (user.isEmailVerified && user.authProvider === 'local' && user.password) {
      const err = new Error('Email already registered');
      err.status = 409;
      throw err;
    }

    // Convert guest or incomplete signup
    user.name = name || user.name;
    user.password = password; // pre-save hook will hash
    user.phone = phone || user.phone;
    user.isGuest = false;
    user.authProvider = 'local';
  } else {
    user = new User({
      name,
      email: normalizedEmail,
      password,
      phone,
      isGuest: false,
      authProvider: 'local',
      isEmailVerified: false,
    });
  }

  await generateAndSendOtp(user, 'verify');

  success(
    res,
    { email: user.email, isEmailVerified: false },
    'Account registered successfully. Verification OTP sent to your email.',
    201
  );
});

/**
 * OTP Verification.
 */
const verifyOtp = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    const err = new Error('Email and OTP are required');
    err.status = 400;
    throw err;
  }

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    const err = new Error('User not found');
    err.status = 404;
    throw err;
  }

  if (user.isEmailVerified && !user.otpHash) {
    return success(res, { isEmailVerified: true }, 'Email is already verified');
  }

  if (!user.otpHash || !user.otpExpiresAt || new Date() > user.otpExpiresAt) {
    const err = new Error('OTP has expired. Please request a new one.');
    err.status = 400;
    throw err;
  }

  if (user.otpAttempts >= 5) {
    const err = new Error('Too many failed verification attempts. Please request a new OTP.');
    err.status = 400;
    throw err;
  }

  const isMatch = await bcrypt.compare(otp, user.otpHash);
  if (!isMatch) {
    user.otpAttempts += 1;
    await user.save();
    const err = new Error(`Invalid OTP. ${5 - user.otpAttempts} attempts remaining.`);
    err.status = 400;
    throw err;
  }

  // Clear OTP fields upon successful verification
  user.isEmailVerified = true;
  user.otpHash = null;
  user.otpExpiresAt = null;
  user.otpAttempts = 0;
  user.lastOtpSentAt = null;
  await user.save();

  const token = generateToken(user._id, user.role);

  success(
    res,
    {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        isEmailVerified: user.isEmailVerified,
      },
    },
    'Email verified and login successful'
  );
});

/**
 * Resend OTP.
 */
const resendOtp = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    const err = new Error('Email is required');
    err.status = 400;
    throw err;
  }

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    const err = new Error('User not found');
    err.status = 404;
    throw err;
  }

  if (user.isEmailVerified && user.authProvider === 'google') {
    return success(res, { isEmailVerified: true }, 'Email already verified via Google');
  }

  const now = Date.now();

  // Cooldown check (60s limit)
  if (user.lastOtpSentAt && (now - new Date(user.lastOtpSentAt).getTime() < 60000)) {
    const secondsRemaining = Math.ceil((60000 - (now - new Date(user.lastOtpSentAt).getTime())) / 1000);
    const err = new Error(`Please wait ${secondsRemaining} seconds before requesting a new OTP.`);
    err.status = 429;
    throw err;
  }

  // Rate limiting check (max 3 resends in 15 mins window)
  const windowDuration = 15 * 60 * 1000;
  if (!user.otpWindowStart || (now - new Date(user.otpWindowStart).getTime() > windowDuration)) {
    user.otpWindowStart = new Date(now);
    user.otpResendCount = 1;
  } else {
    if (user.otpResendCount >= 3) {
      const err = new Error('Maximum OTP requests exceeded. Please try again after 15 minutes.');
      err.status = 429;
      throw err;
    }
    user.otpResendCount += 1;
  }

  await generateAndSendOtp(user, 'verify');

  success(res, { email: user.email }, 'Verification OTP resent to your email');
});

/**
 * User login (email + password).
 */
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    const err = new Error('Email and password are required');
    err.status = 400;
    throw err;
  }

  const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
  if (!user || user.isGuest) {
    const err = new Error('Invalid credentials');
    err.status = 401;
    throw err;
  }

  const ok = await user.matchPassword(password);
  if (!ok) {
    const err = new Error('Invalid credentials');
    err.status = 401;
    throw err;
  }

  // Restrict password login for unverified accounts
  if (!user.isEmailVerified) {
    return res.status(403).json({
      success: false,
      isEmailVerified: false,
      email: user.email,
      message: 'Email is not verified. Please verify your account first.',
    });
  }

  const token = generateToken(user._id, user.role);
  success(
    res,
    {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        isEmailVerified: user.isEmailVerified,
      },
    },
    'Login successful'
  );
});

/**
 * Initiates Forgot Password flow by generating and emailing reset OTP.
 */
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    const err = new Error('Email is required');
    err.status = 400;
    throw err;
  }

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    const err = new Error('No account found with this email address.');
    err.status = 404;
    throw err;
  }

  if (user.authProvider === 'google') {
    const err = new Error('This email is linked with Google Sign-In. Please sign in using Google.');
    err.status = 400;
    throw err;
  }

  const now = Date.now();

  // Cooldown check (60s limit)
  if (user.lastOtpSentAt && (now - new Date(user.lastOtpSentAt).getTime() < 60000)) {
    const secondsRemaining = Math.ceil((60000 - (now - new Date(user.lastOtpSentAt).getTime())) / 1000);
    const err = new Error(`Please wait ${secondsRemaining} seconds before requesting a new OTP.`);
    err.status = 429;
    throw err;
  }

  // Rate limiting window check
  const windowDuration = 15 * 60 * 1000;
  if (!user.otpWindowStart || (now - new Date(user.otpWindowStart).getTime() > windowDuration)) {
    user.otpWindowStart = new Date(now);
    user.otpResendCount = 1;
  } else {
    if (user.otpResendCount >= 3) {
      const err = new Error('Maximum reset requests exceeded. Please try again after 15 minutes.');
      err.status = 429;
      throw err;
    }
    user.otpResendCount += 1;
  }

  await generateAndSendOtp(user, 'reset');

  success(res, { email: user.email }, 'Password reset OTP sent to your email');
});

/**
 * Verifies forgot password OTP and returns a short-lived reset token.
 */
const verifyForgotOtp = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    const err = new Error('Email and OTP are required');
    err.status = 400;
    throw err;
  }

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    const err = new Error('User not found');
    err.status = 404;
    throw err;
  }

  if (!user.otpHash || !user.otpExpiresAt || new Date() > user.otpExpiresAt) {
    const err = new Error('OTP has expired. Please request a new one.');
    err.status = 400;
    throw err;
  }

  if (user.otpAttempts >= 5) {
    const err = new Error('Too many failed verification attempts. Please request a new OTP.');
    err.status = 400;
    throw err;
  }

  const isMatch = await bcrypt.compare(otp, user.otpHash);
  if (!isMatch) {
    user.otpAttempts += 1;
    await user.save();
    const err = new Error(`Invalid OTP. ${5 - user.otpAttempts} attempts remaining.`);
    err.status = 400;
    throw err;
  }

  // Clear OTP fields on successful verify
  user.otpHash = null;
  user.otpExpiresAt = null;
  user.otpAttempts = 0;
  user.lastOtpSentAt = null;
  await user.save();

  // Create temporary reset token JWT valid for 15 minutes
  const resetToken = jwt.sign(
    { id: user._id, email: user.email, scope: 'password-reset' },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }
  );

  success(res, { resetToken }, 'OTP verified successfully. You can now reset your password.');
});

/**
 * Resets password using the temporary reset token.
 */
const resetPassword = asyncHandler(async (req, res) => {
  const { resetToken, password } = req.body;
  if (!resetToken || !password) {
    const err = new Error('Reset token and new password are required');
    err.status = 400;
    throw err;
  }

  let decoded;
  try {
    decoded = jwt.verify(resetToken, process.env.JWT_SECRET);
  } catch (e) {
    const err = new Error('Invalid or expired password reset token.');
    err.status = 400;
    throw err;
  }

  if (decoded.scope !== 'password-reset') {
    const err = new Error('Unauthorized action.');
    err.status = 400;
    throw err;
  }

  const user = await User.findById(decoded.id);
  if (!user) {
    const err = new Error('User not found');
    err.status = 404;
    throw err;
  }

  user.password = password; // Will be hashed automatically by pre-save hook
  user.isEmailVerified = true; // Mark verified if not already
  await user.save();

  success(res, {}, 'Password reset successfully. You can now log in.');
});

/**
 * Guest user find/create.
 */
async function findOrCreateGuestUser({ name, email, phone }) {
  if (!email) return null;

  const normalizedEmail = email.trim().toLowerCase();
  let user = await User.findOne({ email: normalizedEmail });

  if (!user) {
    user = await User.create({
      name,
      email: normalizedEmail,
      phone,
      isGuest: true,
      authProvider: 'local',
    });
  } else {
    let changed = false;
    if (!user.phone && phone) { user.phone = phone; changed = true; }
    if (!user.name && name) { user.name = name; changed = true; }
    if (changed) await user.save();
  }

  return user;
}

const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    const err = new Error('User not found');
    err.status = 404;
    throw err;
  }

  const stats = await Order.aggregate([
    {
      $match: {
        user: user._id,
        status: { $ne: 'Cancelled' },
        $or: [
          { paymentStatus: 'PAID' },
          { paymentMethod: 'COD' },
        ],
      },
    },
    { $group: { _id: null, totalSpent: { $sum: '$totalAmount' }, totalOrders: { $sum: 1 } } },
  ]);

  success(res, {
    _id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    isGuest: user.isGuest,
    authProvider: user.authProvider,
    totalSpent: stats[0]?.totalSpent || 0,
    totalOrders: stats[0]?.totalOrders || 0,
  }, 'Current user fetched');
});

module.exports = {
  loginAdmin,
  createAdmin,
  signup,
  verifyOtp,
  resendOtp,
  login,
  forgotPassword,
  verifyForgotOtp,
  resetPassword,
  findOrCreateGuestUser,
  getMe,
};
