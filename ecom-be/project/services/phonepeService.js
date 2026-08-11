const crypto = require('crypto');
const axios = require('axios');
const config = require('../config/phonepe');

/**
 * Create the X-VERIFY signature for PhonePe.
 * Formula: sha256(base64(payload) + '/pg/v1/pay' + saltKey) + '###' + saltIndex
 */
function signPayload(base64Payload, endpoint) {
  const data = base64Payload + endpoint + config.saltKey;
  const hash = crypto.createHash('sha256').update(data).digest('hex');
  return `${hash}###${config.saltIndex}`;
}

function base64Encode(obj) {
  return Buffer.from(JSON.stringify(obj)).toString('base64');
}

/**
 * Initiate a PhonePe payment.
 *
 * @param {object} params
 * @param {string} params.merchantTransactionId - our unique txn reference
 * @param {number} params.amount - amount in PAISA (1 INR = 100)
 * @param {string} params.redirectUrl - frontend redirect after payment
 * @param {string} [params.mobileNumber]
 * @returns {Promise<{merchantTransactionId:string, paymentUrl:string}>}
 */
async function initiatePayment({ merchantTransactionId, amount, redirectUrl, mobileNumber }) {
  const payload = {
    merchantId: config.merchantId,
    merchantTransactionId,
    merchantUserId: config.merchantUserId,
    amount: Math.round(amount),
    redirectUrl: redirectUrl || config.redirectUrl,
    redirectMode: 'POST',
    callbackUrl: config.webhookUrl || redirectUrl || config.redirectUrl,
    mobileNumber: mobileNumber || '9999999999',
    paymentInstrument: { type: 'PAY_PAGE' },
  };

  const base64 = base64Encode(payload);
  const verify = signPayload(base64, '/pg/v1/pay');
  const body = { request: base64 };

  const url = `${config.baseUrl}/pg/v1/pay`;
  const { data } = await axios.post(url, body, {
    headers: { 'X-VERIFY': verify, 'Content-Type': 'application/json' },
  });

  if (!data.success) {
    throw new Error(`PhonePe initiate failed: ${data.message || 'unknown error'}`);
  }

  const paymentUrl =
    data.data && data.data.instrumentResponse
      ? data.data.instrumentResponse.redirectInfo.url
      : null;

  if (!paymentUrl) {
    throw new Error('PhonePe did not return a payment URL');
  }

  return { merchantTransactionId, paymentUrl };
}

/**
 * Verify/Check payment status by merchantTransactionId.
 *
 * @param {string} merchantTransactionId
 * @returns {Promise<{paid:boolean, status:string, raw:object}>}
 */
async function checkStatus(merchantTransactionId) {
  const endpoint = `/pg/v1/status/${config.merchantId}/${merchantTransactionId}`;
  const verify = signPayload('', endpoint);
  const url = `${config.baseUrl}${endpoint}`;

  const { data } = await axios.get(url, {
    headers: {
      'X-VERIFY': verify,
      'X-MERCHANT-ID': config.merchantId,
      'Content-Type': 'application/json',
    },
  });

  const state =
    data.data && data.data.state ? data.data.state : 'UNKNOWN';
  const paid = state === 'COMPLETED';

  return { paid, status: state, raw: data };
}

/**
 * Refund a payment (optional). Amount in paisa.
 */
async function refund({ merchantTransactionId, amount, originalTransactionId }) {
  const payload = {
    merchantId: config.merchantId,
    merchantTransactionId,
    originalTransactionId,
    amount: Math.round(amount),
    callbackUrl: config.webhookUrl || config.redirectUrl,
  };

  const base64 = base64Encode(payload);
  const verify = signPayload(base64, '/pg/v1/refund');
  const body = { request: base64 };

  const url = `${config.baseUrl}/pg/v1/refund`;
  const { data } = await axios.post(url, body, {
    headers: { 'X-VERIFY': verify, 'Content-Type': 'application/json' },
  });

  if (!data.success) {
    throw new Error(`PhonePe refund failed: ${data.message || 'unknown error'}`);
  }

  return data.data;
}

module.exports = { initiatePayment, checkStatus, refund };
