const crypto = require('crypto');

/**
 * Generate a short unique id (used for order numbers, cart tokens, etc.)
 */
const shortId = (prefix = '') =>
  prefix + crypto.randomBytes(6).toString('hex').toUpperCase();

/**
 * Build a human-readable order number: ORD-YYYYMMDD-XXXXXX
 */
const orderNumber = () => {
  const d = new Date();
  const ymd =
    d.getUTCFullYear().toString() +
    String(d.getUTCMonth() + 1).padStart(2, '0') +
    String(d.getUTCDate()).padStart(2, '0');
  return `ORD-${ymd}-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;
};

module.exports = { shortId, orderNumber };
