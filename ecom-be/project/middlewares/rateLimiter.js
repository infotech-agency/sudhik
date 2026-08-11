const rateLimit = require('express-rate-limit');

/**
 * Throttles auth-related requests to prevent brute force attacks.
 * Limit: 20 requests per 15 minutes per IP address.
 */
const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // Limit each IP to 20 requests per window
  message: {
    success: false,
    message: 'Too many authentication attempts from this IP. Please try again after 15 minutes.',
  },
  standardHeaders: true, // standard headers RateLimit-*
  legacyHeaders: false,  // legacy headers X-RateLimit-*
});

module.exports = {
  authRateLimiter,
};
