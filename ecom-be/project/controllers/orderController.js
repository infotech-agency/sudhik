const Order = require('../models/Order');
const Product = require('../models/Product');
const Cart = require('../models/Cart');
const { success, asyncHandler } = require('../utils/apiResponse');
const { orderNumber, shortId } = require('../utils/id');
const { findOrCreateGuestUser } = require('./authController');
const phonepeService = require('../services/phonepeService');
const shiprocketService = require('../services/shiprocketService');
const Coupon = require('../models/Coupon');
const { generateToken } = require('../utils/generateToken');
/**
 * Validate line items against current product records, compute the total, and
 * decrement stock atomically. Throws on any invalid item / insufficient stock.
 */
async function validateAndPriceItems(items) {
  let total = 0;
  const priced = [];
  
  for (const it of items) {
    const product = await Product.findById(it.productId);
    if (!product || !product.isActive) {
      const err = new Error(`Product ${it.productId} not available`);
      err.status = 400;
      throw err;
    }
    const qty = Number(it.quantity);
    if (product.stock < qty) {
      const err = new Error(`Insufficient stock for ${product.title} (have ${product.stock}, need ${qty})`);
      err.status = 400;
      throw err;
    }
    const lineTotal = product.price * qty;
    total += lineTotal;
    priced.push({
      product: product._id,
      name: product.title,
      quantity: qty,
      price: product.price,
    });
  }

  return { priced, total };
}

/**
 * Decrement stock for all items in an order. Used after the order is persisted.
 */
async function decrementStock(items) {
  await Promise.all(
    items.map((it) =>
      Product.findByIdAndUpdate(
        it.product,
        { $inc: { stock: -it.quantity } },
        { new: true }
      )
    )
  );
}

/**
 * Push the order to Shiprocket. Best-effort: failures are logged but do NOT
 * fail the order creation — the admin can retry from the dashboard.
 */
async function pushToShiprocket(orderId) {
  const order = await Order.findById(orderId).lean();
  if (!order) return;
  try {
    const result = await shiprocketService.createOrder(order);
    await Order.findByIdAndUpdate(orderId, {
      shiprocketOrderId: result.shiprocketOrderId,
      shiprocketShipmentId: result.shiprocketShipmentId,
    });
    console.log(`[shiprocket] Order ${order.orderNumber} pushed (SR id ${result.shiprocketOrderId})`);
  } catch (err) {
    console.error(`[shiprocket] push failed for ${order.orderNumber}: ${err.message}`);
  }
}



const createOrder = asyncHandler(async (req, res) => {
  const { items, paymentMethod, shippingAddress, couponCode } = req.body;
  const { priced, total } = await validateAndPriceItems(items);

  // ---- Coupon apply ----
  let discount = 0;
  let appliedCouponCode = null;

  if (couponCode) {
    const coupon = await Coupon.findOne({ code: couponCode.trim().toUpperCase() });

    if (!coupon || !coupon.isActive) {
      const err = new Error('Invalid or inactive coupon');
      err.status = 400;
      throw err;
    }
    if (coupon.expiryDate && new Date() > new Date(coupon.expiryDate)) {
      const err = new Error('Coupon has expired');
      err.status = 400;
      throw err;
    }
    if (coupon.usageLimit !== null && coupon.usedCount >= coupon.usageLimit) {
      const err = new Error('Coupon usage limit reached');
      err.status = 400;
      throw err;
    }
    if (total < coupon.minOrderAmount) {
      const err = new Error(`Minimum order amount for this coupon is ₹${coupon.minOrderAmount}`);
      err.status = 400;
      throw err;
    }

    discount = coupon.discountType === 'PERCENTAGE'
      ? Math.round((total * coupon.amount) / 100)
      : coupon.amount;
    discount = Math.min(discount, total); // discount total se zyada na ho jaye

    appliedCouponCode = coupon.code;
    await Coupon.findByIdAndUpdate(coupon._id, { $inc: { usedCount: 1 } });
  }

  const finalTotal = Math.max(total - discount, 0);

  // Resolve a user account...
  // let userId = req.user ? req.user.id : null;
  // if (!userId && shippingAddress.email) {
  //   const guest = await findOrCreateGuestUser({
  //     name: shippingAddress.name,
  //     email: shippingAddress.email,
  //     phone: shippingAddress.phone,
  //   });
  //   userId = guest ? guest._id : null;
  // }
// top pe import add karo agar nahi hai

// ...

let userId = req.user ? req.user.id : null;
let newAuthToken = null;

if (!userId && shippingAddress.email) {
  const guest = await findOrCreateGuestUser({
    name: shippingAddress.name,
    email: shippingAddress.email,
    phone: shippingAddress.phone,
  });
  if (guest) {
    userId = guest._id;
    newAuthToken = generateToken(guest._id);
  }
}

  const baseOrder = {
    orderNumber: orderNumber(),
    user: userId,
    items: priced,
    shippingAddress,
    subtotal: total,
    couponCode: appliedCouponCode,
    discountAmount: discount,
    totalAmount: finalTotal,
    paymentMethod,
  };

  // if (paymentMethod === 'COD') {
  //   const order = await Order.create({ ...baseOrder, paymentStatus: 'PENDING' });
  //   await decrementStock(priced);
  //   pushToShiprocket(order._id);
  //   await clearSourceCart(req, userId);
  //   success(res, order, 'Order placed (COD)', 201);
  //   return;
  // }

  if (paymentMethod === 'COD') {
  const order = await Order.create({ ...baseOrder, paymentStatus: 'PENDING' });
  await decrementStock(priced);
  pushToShiprocket(order._id);
  await clearSourceCart(req, userId);

  success(res, { order, authToken: newAuthToken }, 'Order placed (COD)', 201);
  return;
}


  // ONLINE
  const merchantTransactionId = shortId('MTX_');
  const redirectUrl = `${process.env.PHONEPE_REDIRECT_URL || 'http://localhost:3000/payment/status'}?mtx=${merchantTransactionId}`;

  const order = await Order.create({
    ...baseOrder,
    paymentStatus: 'PENDING',
    merchantTransactionId,
  });

  const result = await phonepeService.initiatePayment({
    merchantTransactionId,
    amount: finalTotal * 100, // discounted amount hi PhonePe ko bhejna hai
    redirectUrl,
    mobileNumber: shippingAddress.phone,
  });

  success(res, { order, paymentUrl: result.paymentUrl }, 'Payment initiated', 201);
});

/**
 * Verify an online payment by merchantTransactionId. Called by the frontend
 * after the user returns from the PhonePe payment page, or by the webhook.
 *
 * On success: mark PAID, decrement stock, push to Shiprocket, clear cart.
 */
const verifyPayment = asyncHandler(async (req, res) => {
  const { merchantTransactionId } = req.body;
  if (!merchantTransactionId) {
    const err = new Error('merchantTransactionId required');
    err.status = 400;
    throw err;
  }

  const order = await Order.findOne({ merchantTransactionId });
  if (!order) {
    const err = new Error('Order not found for that transaction id');
    err.status = 404;
    throw err;
  }

  const status = await phonepeService.checkStatus(merchantTransactionId);
  if (status.paid) {
    order.paymentStatus = 'PAID';
    if (order.status === 'Processing') order.status = 'Processing';
    await order.save();
    await decrementStock(order.items);
    pushToShiprocket(order._id);
    await clearSourceCart(req, order.user);
    success(res, order, 'Payment verified and order confirmed');
  } else {
    order.paymentStatus = 'FAILED';
    await order.save();
    const err = new Error(`Payment not completed (status: ${status.status})`);
    err.status = 402;
    throw err;
  }
});

/**
 * PhonePe webhook. PhonePe posts the payment response here.
 * Payload shape: { response: "<base64 json>" }
 */
const phonepeWebhook = asyncHandler(async (req, res) => {
  const { response } = req.body || {};
  if (!response) {
    return res.status(400).json({ success: false, message: 'Missing response field' });
  }
  let decoded;
  try {
    decoded = JSON.parse(Buffer.from(response, 'base64').toString('utf8'));
  } catch (_e) {
    return res.status(400).json({ success: false, message: 'Invalid base64 payload' });
  }

  const merchantTransactionId = decoded.data && decoded.data.merchantTransactionId;
  if (!merchantTransactionId) {
    return res.status(400).json({ success: false, message: 'No merchantTransactionId' });
  }

  const order = await Order.findOne({ merchantTransactionId });
  if (!order) {
    return res.status(404).json({ success: false, message: 'Order not found' });
  }

  const code = decoded.code;
  if (code === 'PAYMENT_SUCCESS' || (decoded.data && decoded.data.state === 'COMPLETED')) {
    if (order.paymentStatus !== 'PAID') {
      order.paymentStatus = 'PAID';
      await order.save();
      await decrementStock(order.items);
      pushToShiprocket(order._id);
    }
  } else {
    order.paymentStatus = 'FAILED';
    await order.save();
  }

  res.status(200).json({ success: true });
});

/**
 * List the current user's orders (logged-in only).
 */
const myOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user.id })
    .populate('items.product', 'title images')
    .sort({ createdAt: -1 });
  success(res, orders, 'Your orders');
});

/**
 * Get a single order by id (owner or admin).
 */
const getOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('items.product', 'title images');
  if (!order) {
    const err = new Error('Order not found');
    err.status = 404;
    throw err;
  }
  if (req.user.role !== 'admin' && (!order.user || order.user.toString() !== req.user.id)) {
    const err = new Error('Not authorized to view this order');
    err.status = 403;
    throw err;
  }
  success(res, order, 'Order fetched');
});

/**
 * Admin: list all orders with filters.
 */
const listOrders = asyncHandler(async (req, res) => {
  const { status, paymentStatus } = req.query;
  const page = Math.max(1, parseInt(req.query.page, 10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(req.query.limit, 10) || 20));
  const filter = {};
  if (status) filter.status = status;
  if (paymentStatus) filter.paymentStatus = paymentStatus;

  const skip = (page - 1) * limit;
  const [orders, total] = await Promise.all([
    Order.find(filter)
      .populate('user', 'name email phone')
      .populate('items.product', 'title images')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Order.countDocuments(filter),
  ]);
  success(res, orders, 'Orders fetched', 200, {
    pagination: { page, limit, total, pages: Math.ceil(total / limit) },
  });
});

/**
 * Admin: update order status. Also reflects on Shiprocket when relevant.
 */
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const order = await Order.findById(req.params.id);
  if (!order) {
    const err = new Error('Order not found');
    err.status = 404;
    throw err;
  }
  order.status = status;
  await order.save();
  success(res, order, 'Order status updated');
});

/**
 * Admin: generate AWB for an order's Shiprocket shipment.
 */
const generateAWB = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    const err = new Error('Order not found');
    err.status = 404;
    throw err;
  }
  if (!order.shiprocketShipmentId) {
    const err = new Error('Order has no Shiprocket shipment');
    err.status = 400;
    throw err;
  }
  const result = await shiprocketService.generateAWB(order.shiprocketShipmentId);
  // Try to capture AWB code from the response.
  const awb =
    result && result.payload && result.payload.awb_code
      ? result.payload.awb_code
      : (result && result.awb_code) || null;
  if (awb) {
    order.awbCode = awb;
    await order.save();
  }
  success(res, { result, awbCode: awb }, 'AWB generated');
});

/**
 * Admin: track an order's shipment via Shiprocket.
 */
const trackOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    const err = new Error('Order not found');
    err.status = 404;
    throw err;
  }
  if (!order.shiprocketShipmentId) {
    const err = new Error('Order has no Shiprocket shipment');
    err.status = 400;
    throw err;
  }
  const tracking = await shiprocketService.trackShipment(order.shiprocketShipmentId);
  success(res, tracking, 'Tracking fetched');
});

/**
 * Admin: cancel an order. Cancels on Shiprocket too and restores stock.
 */
const cancelOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    const err = new Error('Order not found');
    err.status = 404;
    throw err;
  }
  if (order.status === 'Delivered') {
    const err = new Error('Delivered orders cannot be cancelled');
    err.status = 400;
    throw err;
  }
  order.status = 'Cancelled';
  await order.save();

  // Restore stock.
  await Promise.all(
    order.items.map((it) =>
      Product.findByIdAndUpdate(it.product, { $inc: { stock: it.quantity } })
    )
  );

  if (order.shiprocketOrderId) {
    shiprocketService.cancelOrder(order.shiprocketOrderId).catch((e) =>
      console.error('[shiprocket] cancel failed:', e.message)
    );
  }
  success(res, order, 'Order cancelled');
});

/**
 * Helper: clear the source cart after a successful order.
 */
async function clearSourceCart(req, userId) {
  try {
    const cartToken = req.headers['x-cart-token'] || req.body.cartToken;
    if (userId) {
      await Cart.findOneAndUpdate({ user: userId }, { items: [] });
    } else if (cartToken) {
      await Cart.findOneAndUpdate({ cartToken }, { items: [] });
    }
  } catch (e) {
    // non-fatal
  }
}

module.exports = {
  createOrder,
  verifyPayment,
  phonepeWebhook,
  myOrders,
  getOrder,
  listOrders,
  updateOrderStatus,
  generateAWB,
  trackOrder,
  cancelOrder,
};
