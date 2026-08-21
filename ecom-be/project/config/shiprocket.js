/**
 * Shiprocket API configuration.
 *
 * Shiprocket uses an email/password login that returns a bearer token
 * (valid ~10 days). We cache the token in-process and refresh on 401.
 *
 * Env vars:
 *  SHIPROCKET_EMAIL     - Your Shiprocket account email
 *  SHIPROCKET_PASSWORD  - Your Shiprocket account password
 *  SHIPROCKET_BASE_URL  - https://apiv2.shiprocket.in (production)
 *  SHIPROCKET_PICKUP_LOCATION - The pickup location name registered in Shiprocket
 */
// module.exports = {
//   email: process.env.SHIPROCKET_EMAIL || '',
//   password: process.env.SHIPROCKET_PASSWORD || '',
//   baseUrl: process.env.SHIPROCKET_BASE_URL || 'https://apiv2.shiprocket.in',
//   pickupLocation: process.env.SHIPROCKET_PICKUP_LOCATION || 'Primary',
// };

module.exports = {
  email: 'shuddhik.shiprocket.api@gmail.com',
  password:  'ysyqxxMpjEGQUR&2iF8&!cTPPZeS5txv',
  baseUrl: process.env.SHIPROCKET_BASE_URL || 'https://apiv2.shiprocket.in',
  pickupLocation: process.env.SHIPROCKET_PICKUP_LOCATION || 'Primary',
};

