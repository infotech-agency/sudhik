const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Verify a Bearer JWT from the Authorization header.
 * Attaches req.user = { id, role }.
 */
const protect = async (req, _res, next) => {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) {
      const err = new Error('Not authorized, no token');
      err.status = 401;
      return next(err);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret_change_me');
    req.user = { id: decoded.id, role: decoded.role };

    // Optional: confirm the user still exists.
    const user = await User.findById(decoded.id).lean().select('_id role');
    if (!user) {
      const err = new Error('User no longer exists');
      err.status = 401;
      return next(err);
    }
    next();
  } catch (err) {
    err.status = 401;
    next(err);
  }
};

/**
 * Require an admin role. Must run after protect().
 */
const admin = (req, _res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    const err = new Error('Admin access required');
    err.status = 403;
    return next(err);
  }
  next();
};

/**
 * Optional auth: attach req.user if a valid token is present, but don't fail
 * if absent (used for endpoints that work for both guests and logged-in users,
 * e.g. reviews and cart).
 */
const optionalAuth = async (req, _res, next) => {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret_change_me');
      req.user = { id: decoded.id, role: decoded.role };
    }
  } catch (_e) {
    // Invalid token: ignore and treat as guest.
    req.user = null;
  }
  next();
};

module.exports = { protect, admin, optionalAuth };
