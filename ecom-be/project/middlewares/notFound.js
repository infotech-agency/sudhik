/**
 * Tiny "not found" handler for unmatched routes. Placed before errorHandler.
 */
const notFound = (req, _res, next) => {
  const err = new Error(`Route not found: ${req.method} ${req.originalUrl}`);
  err.status = 404;
  next(err);
};

module.exports = notFound;
