// /**
//  * PhonePe Payment Gateway configuration.
//  * PhonePe uses a salt-based HMAC SHA256 signature on every request.
//  *
//  * Env vars:
//  *  PHONEPE_MERCHANT_ID        - Merchant ID from PhonePe dashboard
//  *  PHONEPE_MERCHANT_USER_ID   - A unique user id for your merchant account
//  *  PHONEPE_SALT_KEY           - Salt key used for signature generation
//  *  PHONEPE_SALT_INDEX         - Salt index (usually 1)
//  *  PHONEPE_BASE_URL           - Standard Host: https://api.phonepe.com/apis/hermes
//  *  PHONEPE_REDIRECT_URL       - Frontend URL to redirect after payment
//  *  PHONEPE_WEBHOOK_URL        - Your public webhook endpoint (optional, for async status)
//  *  PHONEPE_MODE               - "PROD" or "UAT"
//  */
// module.exports = {
//   merchantId: process.env.PHONEPE_MERCHANT_ID || 'PGTESTPAYUAT',
//   merchantUserId: process.env.PHONEPE_MERCHANT_USER_ID || 'MUID123',
//   saltKey: process.env.PHONEPE_SALT_KEY || '099eb0cd-02cf-4e2a-8aca-482a31a1f414',
//   saltIndex: process.env.PHONEPE_SALT_INDEX || '1',
//   baseUrl: process.env.PHONEPE_BASE_URL || 'https://api-preprod.phonepe.com/apis/pg-sandbox',
//   redirectUrl: process.env.PHONEPE_REDIRECT_URL || 'http://localhost:3000/payment/status',
//   webhookUrl: process.env.PHONEPE_WEBHOOK_URL || '',
//   mode: process.env.PHONEPE_MODE || 'UAT',
// };



/**
 * PhonePe Payment Gateway configuration (v2 - OAuth / Client Credentials).
 *
 * PhonePe's v2 Checkout API uses OAuth2 client-credentials auth instead of
 * the old salt-key/checksum scheme. You get these values from the PhonePe
 * Business Dashboard -> Developer Settings.
 *
 * Env vars:
 *  PHONEPE_CLIENT_ID       - Client ID from PhonePe dashboard
 *  PHONEPE_CLIENT_SECRET   - Client Secret from PhonePe dashboard
 *  PHONEPE_CLIENT_VERSION  - Client Version from PhonePe dashboard (usually 1)
 *  PHONEPE_ENV             - "UAT" or "PROD"
 *  PHONEPE_REDIRECT_URL    - Frontend URL to redirect after payment
 *  PHONEPE_CALLBACK_URL    - Your public webhook endpoint (server-to-server)
 */

const env = process.env.PHONEPE_ENV || 'UAT';
const isProd = env === 'PROD';

module.exports = {
  clientId: process.env.PHONEPE_CLIENT_ID || 'SU2608141543518572180192',
  clientSecret: process.env.PHONEPE_CLIENT_SECRET || '8f64c593-b415-4121-ac37-5a0b064ef3f3',
  clientVersion: process.env.PHONEPE_CLIENT_VERSION || '1',

  env,

  // OAuth token endpoint
  authBaseUrl: isProd
    ? 'https://api.phonepe.com/apis/identity-manager'
    : 'https://api-preprod.phonepe.com/apis/pg-sandbox',

  // Payment / order endpoint
  payBaseUrl: isProd
    ? 'https://api.phonepe.com/apis/pg'
    : 'https://api-preprod.phonepe.com/apis/pg-sandbox',

  redirectUrl: process.env.PHONEPE_REDIRECT_URL || 'http://localhost:3000/payment/result',
  callbackUrl: process.env.PHONEPE_CALLBACK_URL || '',
};