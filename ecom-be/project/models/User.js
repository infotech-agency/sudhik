const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const addressSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    pincode: { type: String, required: true, trim: true },
    country: { type: String, default: 'India', trim: true },
    isDefault: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    password: {
      // Hashed. Null for Google-only or guest users (who have no password).
      type: String,
      default: null,
      select: false,
    },
    phone: { type: String, default: null, trim: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    isGuest: { type: Boolean, default: false },
    // 'local' | 'google'. Guest users are 'local' but never get a password.
    authProvider: { type: String, enum: ['local', 'google'], default: 'local' },
    googleId: { type: String, default: null, index: true, sparse: true },
    avatar: { type: String, default: null },
    isEmailVerified: { type: Boolean, default: false },
    
    // OTP Fields
    otpHash: { type: String, default: null },
    otpExpiresAt: { type: Date, default: null },
    otpAttempts: { type: Number, default: 0 },
    lastOtpSentAt: { type: Date, default: null },
    otpResendCount: { type: Number, default: 0 },
    otpWindowStart: { type: Date, default: null },

    // Addresses
    addresses: [addressSchema],
  },
  { timestamps: true }
);

// Hash password before save when it's modified.
userSchema.pre('save', async function (next) {
  if (!this.isModified('password') || !this.password) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.matchPassword = function (entered) {
  if (!this.password) return false;
  return bcrypt.compare(entered, this.password);
};

module.exports = mongoose.model('User', userSchema);
