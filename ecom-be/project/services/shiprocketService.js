const axios = require('axios');
const config = require('../config/shiprocket');

let tokenCache = { token: null, expiresAt: 0 };

/**
 * Authenticate with Shiprocket and cache the token (~10 days).
 * @returns {Promise<string>} bearer token
 */
async function getToken() {
  // Refresh if no token or < 1 hour until expiry.
  if (tokenCache.token && tokenCache.expiresAt > Date.now() + 60 * 60 * 1000) {
    return tokenCache.token;
  }
  if (!config.email || !config.password) {
    throw new Error('Shiprocket credentials not configured');
  }

  const { data } = await axios.post(`${config.baseUrl}/v1/external/auth/login`, {
    email: config.email,
    password: config.password,
  });

  tokenCache = {
    token: data.token,
    // Shiprocket tokens last ~10 days; we refresh every 9 days to be safe.
    expiresAt: Date.now() + 9 * 24 * 60 * 60 * 1000,
  };
  return tokenCache.token;
}

/**
 * Build the Shiprocket order payload from our Order document (lean object).
 */
function buildOrderPayload(order) {
  const items = order.items.map((it) => ({
    name: it.name,
    sku: String(it.product),
    units: it.quantity,
    selling_price: it.price,
    discount: '',
    tax: '',
    hsn: 0,
  }));

  return {
    order_id: order.orderNumber,
    order_date: new Date(order.createdAt || Date.now()).toISOString().slice(0, 10),
    pickup_location: config.pickupLocation,
    billing_customer_name: order.shippingAddress.name,
    billing_last_name: '',
    billing_address: order.shippingAddress.address,
    billing_city: order.shippingAddress.city,
    billing_pincode: order.shippingAddress.pincode,
    billing_state: order.shippingAddress.state,
    billing_country: order.shippingAddress.country || 'India',
    billing_email: order.shippingAddress.email || 'noemail@shiprocket.in',
    billing_phone: order.shippingAddress.phone,
    shipping_is_billing: true,
    shipping_customer_name: order.shippingAddress.name,
    shipping_last_name: '',
    shipping_address: order.shippingAddress.address,
    shipping_city: order.shippingAddress.city,
    shipping_pincode: order.shippingAddress.pincode,
    shipping_state: order.shippingAddress.state,
    shipping_country: order.shippingAddress.country || 'India',
    shipping_email: order.shippingAddress.email || 'noemail@shiprocket.in',
    shipping_phone: order.shippingAddress.phone,
    order_items: items,
    payment_method: order.paymentMethod === 'COD' ? 'COD' : 'Prepaid',
    sub_total: order.totalAmount,
    length: 10,
    breadth: 10,
    height: 10,
    weight: 0.5,
  };
}

/**
 * Create a Shiprocket order. Returns the Shiprocket order id and shipment id.
 *
 * @param {object} order - a lean Order document
 * @returns {Promise<{shiprocketOrderId:number, shiprocketShipmentId:number}>}
 */
async function createOrder(order) {
  try {
    const token = await getToken();
    const payload = buildOrderPayload(order);
    const { data } = await axios.post(`${config.baseUrl}/v1/external/orders/create/adhoc`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return {
      shiprocketOrderId: data.order_id,
      shiprocketShipmentId: data.shipment_id || null,
    };
  } catch (err) {
    const msg = err.response ? JSON.stringify(err.response.data) : err.message;
    throw new Error(`Shiprocket createOrder failed: ${msg}`);
  }
}

/**
 * Generate an AWB for a shipment.
 * @param {number} shipmentId
 * @param {string} courierId - optional, uses default if omitted
 */
async function generateAWB(shipmentId, courierId = '') {
  try {
    const token = await getToken();
    const { data } = await axios.post(
      `${config.baseUrl}/v1/external/courier/assign/awb`,
      { shipment_id: [shipmentId], courier_id: courierId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return data;
  } catch (err) {
    const msg = err.response ? JSON.stringify(err.response.data) : err.message;
    throw new Error(`Shiprocket generateAWB failed: ${msg}`);
  }
}

/**
 * Track a shipment by shipment id. Returns tracking timeline.
 * @param {number} shipmentId
 */
async function trackShipment(shipmentId) {
  try {
    const token = await getToken();
    const { data } = await axios.get(
      `${config.baseUrl}/v1/external/courier/track/shipment/${shipmentId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return data;
  } catch (err) {
    const msg = err.response ? JSON.stringify(err.response.data) : err.message;
    throw new Error(`Shiprocket trackShipment failed: ${msg}`);
  }
}

/**
 * Cancel an order on Shiprocket.
 * @param {string|number} shiprocketOrderId
 */
async function cancelOrder(shiprocketOrderId) {
  try {
    const token = await getToken();
    const { data } = await axios.post(
      `${config.baseUrl}/v1/external/orders/cancel`,
      { ids: [shiprocketOrderId] },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return data;
  } catch (err) {
    const msg = err.response ? JSON.stringify(err.response.data) : err.message;
    throw new Error(`Shiprocket cancelOrder failed: ${msg}`);
  }
}

module.exports = { getToken, createOrder, generateAWB, trackShipment, cancelOrder };
