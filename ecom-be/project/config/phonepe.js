/**
 * PhonePe Payment Gateway configuration.
 * PhonePe uses a salt-based HMAC SHA256 signature on every request.
 *
 * Env vars:
 *  PHONEPE_MERCHANT_ID        - Merchant ID from PhonePe dashboard
 *  PHONEPE_MERCHANT_USER_ID   - A unique user id for your merchant account
 *  PHONEPE_SALT_KEY           - Salt key used for signature generation
 *  PHONEPE_SALT_INDEX         - Salt index (usually 1)
 *  PHONEPE_BASE_URL           - Standard Host: https://api.phonepe.com/apis/hermes
 *  PHONEPE_REDIRECT_URL       - Frontend URL to redirect after payment
 *  PHONEPE_WEBHOOK_URL        - Your public webhook endpoint (optional, for async status)
 *  PHONEPE_MODE               - "PROD" or "UAT"
 */
module.exports = {
  merchantId: process.env.PHONEPE_MERCHANT_ID || 'PGTESTPAYUAT',
  merchantUserId: process.env.PHONEPE_MERCHANT_USER_ID || 'MUID123',
  saltKey: process.env.PHONEPE_SALT_KEY || '099eb0cd-02cf-4e2a-8aca-482a31a1f414',
  saltIndex: process.env.PHONEPE_SALT_INDEX || '1',
  baseUrl: process.env.PHONEPE_BASE_URL || 'https://api-preprod.phonepe.com/apis/pg-sandbox',
  redirectUrl: process.env.PHONEPE_REDIRECT_URL || 'http://localhost:3000/payment/status',
  webhookUrl: process.env.PHONEPE_WEBHOOK_URL || '',
  mode: process.env.PHONEPE_MODE || 'UAT',
};
