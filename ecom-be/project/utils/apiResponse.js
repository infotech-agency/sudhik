/**
 * Centralized API response helpers.
 * All controllers return these via res.json() so the response shape is consistent:
 * { success: boolean, message?: string, data?: any, ...extra }
 */

const success = (res, data = null, message = 'Success', status = 200, extra = {}) => {
  return res.status(status).json({ success: true, message, data, ...extra });
};

const error = (res, message = 'Something went wrong', status = 500, extra = {}) => {
  return res.status(status).json({ success: false, message, ...extra });
};

/**
 * Wrap an async controller so rejected promises are forwarded to next(),
 * i.e. to the central error handler.
 */
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = { success, error, asyncHandler };
