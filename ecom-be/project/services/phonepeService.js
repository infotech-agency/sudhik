// // const crypto = require('crypto');
// // const axios = require('axios');
// // const config = require('../config/phonepe');

// // /**
// //  * Create the X-VERIFY signature for PhonePe.
// //  * Formula: sha256(base64(payload) + '/pg/v1/pay' + saltKey) + '###' + saltIndex
// //  */
// // function signPayload(base64Payload, endpoint) {
// //   const data = base64Payload + endpoint + config.saltKey;
// //   const hash = crypto.createHash('sha256').update(data).digest('hex');
// //   return `${hash}###${config.saltIndex}`;
// // }

// // function base64Encode(obj) {
// //   return Buffer.from(JSON.stringify(obj)).toString('base64');
// // }

// // /**
// //  * Initiate a PhonePe payment.
// //  *
// //  * @param {object} params
// //  * @param {string} params.merchantTransactionId - our unique txn reference
// //  * @param {number} params.amount - amount in PAISA (1 INR = 100)
// //  * @param {string} params.redirectUrl - frontend redirect after payment
// //  * @param {string} [params.mobileNumber]
// //  * @returns {Promise<{merchantTransactionId:string, paymentUrl:string}>}
// //  */
// // async function initiatePayment({ merchantTransactionId, amount, redirectUrl, mobileNumber }) {
// //   const payload = {
// //     merchantId: config.merchantId,
// //     merchantTransactionId,
// //     merchantUserId: config.merchantUserId,
// //     amount: Math.round(amount),
// //     redirectUrl: redirectUrl || config.redirectUrl,
// //     redirectMode: 'POST',
// //     callbackUrl: config.webhookUrl || redirectUrl || config.redirectUrl,
// //     mobileNumber: mobileNumber || '9999999999',
// //     paymentInstrument: { type: 'PAY_PAGE' },
// //   };

// //   const base64 = base64Encode(payload);
// //   const verify = signPayload(base64, '/pg/v1/pay');
// //   const body = { request: base64 };

// //   const url = `${config.baseUrl}/pg/v1/pay`;
// //   // const { data } = await axios.post(url, body, {
// //   //   headers: { 'X-VERIFY': verify, 'Content-Type': 'application/json' },
// //   // });
// //   const { data } = await axios.post(url, body, {
// //   headers: { 'X-VERIFY': verify, 'Content-Type': 'application/json' },
// // }).catch(err => {
// //   console.error('[PhonePe REAL ERROR]', err.response?.status, err.response?.data);
// //   throw err;
// // });

// //   if (!data.success) {
// //     throw new Error(`PhonePe initiate failed: ${data.message || 'unknown error'}`);
// //   }

// //   const paymentUrl =
// //     data.data && data.data.instrumentResponse
// //       ? data.data.instrumentResponse.redirectInfo.url
// //       : null;

// //   if (!paymentUrl) {
// //     throw new Error('PhonePe did not return a payment URL');
// //   }

// //   return { merchantTransactionId, paymentUrl };
// // }

// // /**
// //  * Verify/Check payment status by merchantTransactionId.
// //  *
// //  * @param {string} merchantTransactionId
// //  * @returns {Promise<{paid:boolean, status:string, raw:object}>}
// //  */
// // async function checkStatus(merchantTransactionId) {
// //   const endpoint = `/pg/v1/status/${config.merchantId}/${merchantTransactionId}`;
// //   const verify = signPayload('', endpoint);
// //   const url = `${config.baseUrl}${endpoint}`;

// //   const { data } = await axios.get(url, {
// //     headers: {
// //       'X-VERIFY': verify,
// //       'X-MERCHANT-ID': config.merchantId,
// //       'Content-Type': 'application/json',
// //     },
// //   });

// //   const state =
// //     data.data && data.data.state ? data.data.state : 'UNKNOWN';
// //   const paid = state === 'COMPLETED';

// //   return { paid, status: state, raw: data };
// // }

// // /**
// //  * Refund a payment (optional). Amount in paisa.
// //  */
// // async function refund({ merchantTransactionId, amount, originalTransactionId }) {
// //   const payload = {
// //     merchantId: config.merchantId,
// //     merchantTransactionId,
// //     originalTransactionId,
// //     amount: Math.round(amount),
// //     callbackUrl: config.webhookUrl || config.redirectUrl,
// //   };

// //   const base64 = base64Encode(payload);
// //   const verify = signPayload(base64, '/pg/v1/refund');
// //   const body = { request: base64 };

// //   const url = `${config.baseUrl}/pg/v1/refund`;
// //   const { data } = await axios.post(url, body, {
// //     headers: { 'X-VERIFY': verify, 'Content-Type': 'application/json' },
// //   });

// //   if (!data.success) {
// //     throw new Error(`PhonePe refund failed: ${data.message || 'unknown error'}`);
// //   }

// //   return data.data;
// // }

// // module.exports = { initiatePayment, checkStatus, refund };


// const crypto = require('crypto');
// const axios = require('axios');
// const config = require('../config/phonepe');

// /**
//  * PhonePe v2 (OAuth / Checkout API) integration.
//  *
//  * Flow:
//  *  1. Get an OAuth access token using client_id + client_secret (cached
//  *     in-memory until it expires, refreshed automatically).
//  *  2. Use the token as a Bearer token to call /checkout/v2/pay.
//  *  3. Check status via /checkout/v2/order/{merchantOrderId}/status.
//  *  4. Verify inbound webhooks using the Basic Auth username/password you
//  *     configured in the PhonePe dashboard (NOT the salt-key scheme).
//  *
//  * NOTE: PhonePe's v2 API has been changing rapidly. If any call below
//  * returns 404/401 unexpectedly, double check the current endpoint paths
//  * and payload shape against the PhonePe dashboard's own API reference
//  * for your account, since exact paths can differ by onboarding batch.
//  */

// // ---- In-memory token cache ----
// let cachedToken = null;
// let tokenExpiresAt = 0; // epoch ms

// /**
//  * Fetch (or reuse cached) OAuth access token.
//  */
// async function getAccessToken() {
//   const now = Date.now();
//   if (cachedToken && now < tokenExpiresAt - 30_000) {
//     // reuse cached token if still valid for >30s
//     return cachedToken;
//   }

//   if (!config.clientId || !config.clientSecret) {
//     const err = new Error('PhonePe clientId/clientSecret not configured in env');
//     err.status = 500;
//     throw err;
//   }

//   const url = `${config.authBaseUrl}/v1/oauth/token`;

//   const body = new URLSearchParams({
//     client_id: config.clientId,
//     client_version: config.clientVersion,
//     client_secret: config.clientSecret,
//     grant_type: 'client_credentials',
//   });

//   const { data } = await axios.post(url, body.toString(), {
//     headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//   });

//   cachedToken = data.access_token;
//   // PhonePe returns expires_at as epoch seconds; fall back to 55 min if absent.
//   tokenExpiresAt = data.expires_at
//     ? data.expires_at * 1000
//     : Date.now() + 55 * 60 * 1000;

//   return cachedToken;
// }

// /**
//  * Initiate a PhonePe payment (v2).
//  *
//  * @param {object} params
//  * @param {string} params.merchantTransactionId - our unique order/txn reference
//  * @param {number} params.amount - amount in PAISA (1 INR = 100)
//  * @param {string} [params.redirectUrl]
//  * @returns {Promise<{merchantTransactionId:string, paymentUrl:string, raw:object}>}
//  */
// async function initiatePayment({ merchantTransactionId, amount, redirectUrl }) {
//   const token = await getAccessToken();

//   const payload = {
//     merchantOrderId: merchantTransactionId,
//     amount: Math.round(amount),
//     expireAfter: 1200, // seconds, order link validity
//     metaInfo: {
//       udf1: 'order',
//     },
//     paymentFlow: {
//       type: 'PG_CHECKOUT',
//       message: 'Payment for order',
//       merchantUrls: {
//         redirectUrl: redirectUrl || config.redirectUrl,
//       },
//     },
//   };

//   const url = `${config.payBaseUrl}/checkout/v2/pay`;

//   const { data } = await axios.post(url, payload, {
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `O-Bearer ${token}`,
//     },
//   });

//   const paymentUrl = data.redirectUrl || null;

//   if (!paymentUrl) {
//     const err = new Error('PhonePe did not return a redirect/payment URL');
//     err.status = 502;
//     err.raw = data;
//     throw err;
//   }

//   return { merchantTransactionId, paymentUrl, raw: data };
// }

// /**
//  * Check payment status by merchantOrderId (our merchantTransactionId).
//  *
//  * @param {string} merchantTransactionId
//  * @returns {Promise<{paid:boolean, status:string, raw:object}>}
//  */
// async function checkStatus(merchantTransactionId) {
//   const token = await getAccessToken();

//   const url = `${config.payBaseUrl}/checkout/v2/order/${merchantTransactionId}/status`;

//   const { data } = await axios.get(url, {
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `O-Bearer ${token}`,
//     },
//   });

//   const state = data.state || 'UNKNOWN'; // e.g. COMPLETED, FAILED, PENDING
//   const paid = state === 'COMPLETED';

//   return { paid, status: state, raw: data };
// }

// /**
//  * Verify an inbound PhonePe webhook using the Basic Auth credentials you
//  * configured in the PhonePe dashboard (Webhook Settings -> username/password).
//  * PhonePe sends: Authorization: SHA256(username:password) as a hex string
//  * in the request header.
//  *
//  * @param {string} authorizationHeader - value of req.headers['authorization']
//  * @returns {boolean}
//  */
// function verifyWebhookSignature(authorizationHeader) {
//   const username = process.env.PHONEPE_WEBHOOK_USERNAME || '';
//   const password = process.env.PHONEPE_WEBHOOK_PASSWORD || '';

//   if (!username || !password) {
//     console.error('[phonepe] PHONEPE_WEBHOOK_USERNAME/PASSWORD not configured');
//     return false;
//   }
//   if (!authorizationHeader) return false;

//   const expected = crypto
//     .createHash('sha256')
//     .update(`${username}:${password}`)
//     .digest('hex');

//   // timing-safe compare
//   const a = Buffer.from(expected);
//   const b = Buffer.from(authorizationHeader);
//   if (a.length !== b.length) return false;
//   return crypto.timingSafeEqual(a, b);
// }

// module.exports = {
//   getAccessToken,
//   initiatePayment,
//   checkStatus,
//   verifyWebhookSignature,
// };

const crypto = require('crypto');
const axios = require('axios');
const config = require('../config/phonepe');

/**
 * PhonePe v2 (OAuth / Checkout API) integration.
 *
 * Flow:
 *  1. Get an OAuth access token using client_id + client_secret (cached
 *     in-memory until it expires, refreshed automatically).
 *  2. Use the token as a Bearer token to call /checkout/v2/pay.
 *  3. Check status via /checkout/v2/order/{merchantOrderId}/status.
 *  4. Verify inbound webhooks using the Basic Auth username/password you
 *     configured in the PhonePe dashboard (NOT the salt-key scheme).
 *
 * NOTE: PhonePe's v2 API has been changing rapidly. If any call below
 * returns 404/401 unexpectedly, double check the current endpoint paths
 * and payload shape against the PhonePe dashboard's own API reference
 * for your account, since exact paths can differ by onboarding batch.
 */

// ---- In-memory token cache ----
let cachedToken = null;
let tokenExpiresAt = 0; // epoch ms

/**
 * Fetch (or reuse cached) OAuth access token.
 */
async function getAccessToken() {
  const now = Date.now();
  console.log('[PhonePe DEBUG]', {
  env: process.env.PHONEPE_ENV,
  clientId: process.env.PHONEPE_CLIENT_ID,
  clientVersion: process.env.PHONEPE_CLIENT_VERSION,
  clientSecretLen: (process.env.PHONEPE_CLIENT_SECRET || '').length,
  authBaseUrl: config.authBaseUrl,
});
  if (cachedToken && now < tokenExpiresAt - 30_000) {
    // reuse cached token if still valid for >30s
    return cachedToken;
  }

  if (!config.clientId || !config.clientSecret) {
    const err = new Error('PhonePe clientId/clientSecret not configured in env');
    err.status = 500;
    throw err;
  }

  const url = `${config.authBaseUrl}/v1/oauth/token`;

  const body = new URLSearchParams({
    client_id: config.clientId || "SU2608141543518572180192",
    client_version: config.clientVersion || "1",
    client_secret: config.clientSecret || "8f64c593-b415-4121-ac37-5a0b064ef3f3",
    grant_type: 'client_credentials',
  });

  const { data } = await axios.post(url, body.toString(), {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  }).catch((err) => {
    console.error('[PhonePe AUTH REAL ERROR]', err.response?.status, err.response?.data);
    throw err;
  });

  cachedToken = data.access_token;
  // PhonePe returns expires_at as epoch seconds; fall back to 55 min if absent.
  tokenExpiresAt = data.expires_at
    ? data.expires_at * 1000
    : Date.now() + 55 * 60 * 1000;

  return cachedToken;
}

/**
 * Initiate a PhonePe payment (v2).
 *
 * @param {object} params
 * @param {string} params.merchantTransactionId - our unique order/txn reference
 * @param {number} params.amount - amount in PAISA (1 INR = 100)
 * @param {string} [params.redirectUrl]
 * @returns {Promise<{merchantTransactionId:string, paymentUrl:string, raw:object}>}
 */
async function initiatePayment({ merchantTransactionId, amount, redirectUrl }) {
  const token = await getAccessToken();

  const payload = {
    merchantOrderId: merchantTransactionId,
    amount: Math.round(amount),
    expireAfter: 1200, // seconds, order link validity
    metaInfo: {
      udf1: 'order',
    },
    paymentFlow: {
      type: 'PG_CHECKOUT',
      message: 'Payment for order',
      merchantUrls: {
        redirectUrl: redirectUrl || config.redirectUrl,
      },
    },
  };

  const url = `${config.payBaseUrl}/checkout/v2/pay`;

  const { data } = await axios.post(url, payload, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `O-Bearer ${token}`,
    },
  });

  const paymentUrl = data.redirectUrl || null;

  if (!paymentUrl) {
    const err = new Error('PhonePe did not return a redirect/payment URL');
    err.status = 502;
    err.raw = data;
    throw err;
  }

  return { merchantTransactionId, paymentUrl, raw: data };
}

/**
 * Check payment status by merchantOrderId (our merchantTransactionId).
 *
 * @param {string} merchantTransactionId
 * @returns {Promise<{paid:boolean, status:string, raw:object}>}
 */
async function checkStatus(merchantTransactionId) {
  const token = await getAccessToken();

  const url = `${config.payBaseUrl}/checkout/v2/order/${merchantTransactionId}/status`;

  const { data } = await axios.get(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `O-Bearer ${token}`,
    },
  });

  const state = data.state || 'UNKNOWN'; // e.g. COMPLETED, FAILED, PENDING
  const paid = state === 'COMPLETED';

  return { paid, status: state, raw: data };
}

/**
 * Verify an inbound PhonePe webhook using the Basic Auth credentials you
 * configured in the PhonePe dashboard (Webhook Settings -> username/password).
 * PhonePe sends: Authorization: SHA256(username:password) as a hex string
 * in the request header.
 *
 * @param {string} authorizationHeader - value of req.headers['authorization']
 * @returns {boolean}
 */
function verifyWebhookSignature(authorizationHeader) {
  const username = process.env.PHONEPE_WEBHOOK_USERNAME || '';
  const password = process.env.PHONEPE_WEBHOOK_PASSWORD || '';

  if (!username || !password) {
    console.error('[phonepe] PHONEPE_WEBHOOK_USERNAME/PASSWORD not configured');
    return false;
  }
  if (!authorizationHeader) return false;

  const expected = crypto
    .createHash('sha256')
    .update(`${username}:${password}`)
    .digest('hex');

  // timing-safe compare
  const a = Buffer.from(expected);
  const b = Buffer.from(authorizationHeader);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

module.exports = {
  getAccessToken,
  initiatePayment,
  checkStatus,
  verifyWebhookSignature,
};