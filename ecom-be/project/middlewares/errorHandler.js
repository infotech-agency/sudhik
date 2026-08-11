/**
 * Central error handler. Expects errors to carry a `status` (HTTP code) and
 * optional `code`. Falls back to 500.
 */
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, _req, res, _next) => {
  const status = err.status || 500;
  const response = {
    success: false,
    message: err.message || 'Internal server error',
  };
  if (err.code) response.code = err.code;

  // Log full stack for server errors; keep client errors quiet.
  if (status >= 500) {
    console.error('[error]', err);
  }

  // Mongoose duplicate-key error -> 409
  if (err.name === 'MongoServerError' && err.code === 11000) {
    return res.status(409).json({
      success: false,
      message: `Duplicate value for: ${Object.keys(err.keyValue || {}).join(', ')}`,
    });
  }

  // Mongoose validation error -> 400
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: Object.values(err.errors)
        .map((e) => e.message)
        .join('; '),
    });
  }

  // Mongoose cast error (bad ObjectId etc.) -> 400
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: `Invalid ${err.path}: ${err.value}`,
    });
  }

  res.status(status).json(response);
};

module.exports = errorHandler;
