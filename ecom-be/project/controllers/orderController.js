// const Order = require('../models/Order');
// const Product = require('../models/Product');
// const Cart = require('../models/Cart');
// const { success, asyncHandler } = require('../utils/apiResponse');
// const { orderNumber, shortId } = require('../utils/id');
// const { findOrCreateGuestUser } = require('./authController');
// const phonepeService = require('../services/phonepeService');
// const shiprocketService = require('../services/shiprocketService');
// const Coupon = require('../models/Coupon');
// const { generateToken } = require('../utils/generateToken');
// /**
//  * Validate line items against current product records, compute the total, and
//  * decrement stock atomically. Throws on any invalid item / insufficient stock.
//  */
// // async function validateAndPriceItems(items) {
// //   let total = 0;
// //   const priced = [];
  
// //   for (const it of items) {
// //     const product = await Product.findById(it.productId);
// //     if (!product || !product.isActive) {
// //       const err = new Error(`Product ${it.productId} not available`);
// //       err.status = 400;
// //       throw err;
// //     }
// //     const qty = Number(it.quantity);
// //     if (product.stock < qty) {
// //       const err = new Error(`Insufficient stock for ${product.title} (have ${product.stock}, need ${qty})`);
// //       err.status = 400;
// //       throw err;
// //     }
// //     const lineTotal = product.price * qty;
// //     total += lineTotal;
// //     priced.push({
// //       product: product._id,
// //       name: product.title,
// //       quantity: qty,
// //       price: product.price,
// //     });
// //   }

// //   return { priced, total };
// // }

// async function validateAndPriceItems(items) {
//   let total = 0;
//   const priced = [];

//   for (const it of items) {
//     const product = await Product.findById(it.productId);
//     if (!product || !product.isActive) {
//       const err = new Error(`Product ${it.productId} not available`);
//       err.status = 400;
//       throw err;
//     }

//     const qty = Number(it.quantity);

//     // ---- Resolve price + stock: variant-aware ----
//     let unitPrice = product.discountPrice || product.price;
//     let availableStock = product.stock;
//     let matchedVariant = null;

//     if (it.variantLabel) {
//       matchedVariant = (product.variants || []).find((v) => v.label === it.variantLabel);
//       if (!matchedVariant) {
//         const err = new Error(`Variant "${it.variantLabel}" not found for ${product.title}`);
//         err.status = 400;
//         throw err;
//       }
//       unitPrice = matchedVariant.discountPrice || matchedVariant.price;
//       availableStock = matchedVariant.stock;
//     }

//     if (availableStock < qty) {
//       const err = new Error(
//         `Insufficient stock for ${product.title}${matchedVariant ? ` (${matchedVariant.label})` : ''} (have ${availableStock}, need ${qty})`
//       );
//       err.status = 400;
//       throw err;
//     }

//     const lineTotal = unitPrice * qty;
//     total += lineTotal;
//     priced.push({
//       product: product._id,
//       name: product.title,
//       quantity: qty,
//       price: unitPrice,               // 👈 ab sahi variant price
//       variantLabel: matchedVariant ? matchedVariant.label : undefined,
//       variantSku: matchedVariant ? matchedVariant.sku : undefined,
//     });
//   }

//   return { priced, total };
// }

// /**
//  * Decrement stock for all items in an order. Used after the order is persisted.
//  */
// async function decrementStock(items) {
//   await Promise.all(
//     items.map((it) =>
//       Product.findByIdAndUpdate(
//         it.product,
//         { $inc: { stock: -it.quantity } },
//         { new: true }
//       )
//     )
//   );
// }

// /**
//  * Push the order to Shiprocket. Best-effort: failures are logged but do NOT
//  * fail the order creation — the admin can retry from the dashboard.
//  */
// async function pushToShiprocket(orderId) {
//   const order = await Order.findById(orderId).lean();
//   if (!order) return;
//   try {
//     const result = await shiprocketService.createOrder(order);
//     await Order.findByIdAndUpdate(orderId, {
//       shiprocketOrderId: result.shiprocketOrderId,
//       shiprocketShipmentId: result.shiprocketShipmentId,
//     });
//     console.log(`[shiprocket] Order ${order.orderNumber} pushed (SR id ${result.shiprocketOrderId})`);
//   } catch (err) {
//     console.error(`[shiprocket] push failed for ${order.orderNumber}: ${err.message}`);
//   }
// }



// const createOrder = asyncHandler(async (req, res) => {
//   const { items, paymentMethod, shippingAddress, couponCode } = req.body;
//   const { priced, total } = await validateAndPriceItems(items);

//   // ---- Coupon apply ----
//   let discount = 0;
//   let appliedCouponCode = null;

//   if (couponCode) {
//     const coupon = await Coupon.findOne({ code: couponCode.trim().toUpperCase() });

//     if (!coupon || !coupon.isActive) {
//       const err = new Error('Invalid or inactive coupon');
//       err.status = 400;
//       throw err;
//     }
//     if (coupon.expiryDate && new Date() > new Date(coupon.expiryDate)) {
//       const err = new Error('Coupon has expired');
//       err.status = 400;
//       throw err;
//     }
//     if (coupon.usageLimit !== null && coupon.usedCount >= coupon.usageLimit) {
//       const err = new Error('Coupon usage limit reached');
//       err.status = 400;
//       throw err;
//     }
//     if (total < coupon.minOrderAmount) {
//       const err = new Error(`Minimum order amount for this coupon is ₹${coupon.minOrderAmount}`);
//       err.status = 400;
//       throw err;
//     }

//     discount = coupon.discountType === 'PERCENTAGE'
//       ? Math.round((total * coupon.amount) / 100)
//       : coupon.amount;
//     discount = Math.min(discount, total); // discount total se zyada na ho jaye

//     appliedCouponCode = coupon.code;
//     await Coupon.findByIdAndUpdate(coupon._id, { $inc: { usedCount: 1 } });
//   }

//   // const finalTotal = Math.max(total - discount, 0);
//   const COD_CHARGE = 49;
// const codCharge = paymentMethod === 'COD' ? COD_CHARGE : 0;
// const finalTotal = Math.max(total - discount, 0) + codCharge;

//   // Resolve a user account...
//   // let userId = req.user ? req.user.id : null;
//   // if (!userId && shippingAddress.email) {
//   //   const guest = await findOrCreateGuestUser({
//   //     name: shippingAddress.name,
//   //     email: shippingAddress.email,
//   //     phone: shippingAddress.phone,
//   //   });
//   //   userId = guest ? guest._id : null;
//   // }
// // top pe import add karo agar nahi hai

// // ...

// let userId = req.user ? req.user.id : null;
// let newAuthToken = null;

// if (!userId && shippingAddress.email) {
//   const guest = await findOrCreateGuestUser({
//     name: shippingAddress.name,
//     email: shippingAddress.email,
//     phone: shippingAddress.phone,
//   });
//   if (guest) {
//     userId = guest._id;
//     newAuthToken = generateToken(guest._id);
//   }
// }

//   const baseOrder = {
//     orderNumber: orderNumber(),
//     user: userId,
//     items: priced,
//     shippingAddress,
//     subtotal: total,
//     couponCode: appliedCouponCode,
//     discountAmount: discount,
//      codCharge, 
//     totalAmount: finalTotal,
//     paymentMethod,
//   };

//   // if (paymentMethod === 'COD') {
//   //   const order = await Order.create({ ...baseOrder, paymentStatus: 'PENDING' });
//   //   await decrementStock(priced);
//   //   pushToShiprocket(order._id);
//   //   await clearSourceCart(req, userId);
//   //   success(res, order, 'Order placed (COD)', 201);
//   //   return;
//   // }

//   if (paymentMethod === 'COD') {
//   const order = await Order.create({ ...baseOrder, paymentStatus: 'PENDING' });
//   await decrementStock(priced);
//   pushToShiprocket(order._id);
//   await clearSourceCart(req, userId);

//   success(res, { order, authToken: newAuthToken }, 'Order placed (COD)', 201);
//   return;
// }


//   // ONLINE
//   const merchantTransactionId = shortId('MTX_');
//   // const redirectUrl = `${process.env.PHONEPE_REDIRECT_URL || 'http://localhost:3000/payment/status'}?mtx=${merchantTransactionId}`;
//   // const redirectUrl = `${process.env.PHONEPE_REDIRECT_URL}?merchantTransactionId=${merchantTransactionId}`;
//     const redirectUrl = `https://shuddhik.com/payment/callback?merchantTransactionId=${merchantTransactionId}`;
  

//   const order = await Order.create({
//     ...baseOrder,
//     paymentStatus: 'PENDING',
//     merchantTransactionId,
//   });

//   const result = await phonepeService.initiatePayment({
//     merchantTransactionId,
//     amount: finalTotal * 100, // discounted amount hi PhonePe ko bhejna hai
//     redirectUrl,
//     mobileNumber: shippingAddress.phone,
//   });

//   // success(res, { order, paymentUrl: result.paymentUrl }, 'Payment initiated', 201);
//   success(res, { 
//   order, 
//   paymentUrl: result.paymentUrl, 
//   merchantTransactionId  // ye line add karo
// }, 'Payment initiated', 201);
  

// });

// /**
//  * Verify an online payment by merchantTransactionId. Called by the frontend
//  * after the user returns from the PhonePe payment page, or by the webhook.
//  *
//  * On success: mark PAID, decrement stock, push to Shiprocket, clear cart.
//  */
// const verifyPayment = asyncHandler(async (req, res) => {
//   const { merchantTransactionId } = req.body;
//   if (!merchantTransactionId) {
//     const err = new Error('merchantTransactionId required');
//     err.status = 400;
//     throw err;
//   }

//   const order = await Order.findOne({ merchantTransactionId });
//   if (!order) {
//     const err = new Error('Order not found for that transaction id');
//     err.status = 404;
//     throw err;
//   }

//   const status = await phonepeService.checkStatus(merchantTransactionId);
//   if (status.paid) {
//     order.paymentStatus = 'PAID';
//     if (order.status === 'Processing') order.status = 'Processing';
//     await order.save();
//     await decrementStock(order.items);
//     pushToShiprocket(order._id);
//     await clearSourceCart(req, order.user);
//     success(res, order, 'Payment verified and order confirmed');
//   } else {
//     order.paymentStatus = 'FAILED';
//     await order.save();
//     const err = new Error(`Payment not completed (status: ${status.status})`);
//     err.status = 402;
//     throw err;
//   }
// });

// /**
//  * PhonePe webhook. PhonePe posts the payment response here.
//  * Payload shape: { response: "<base64 json>" }
//  */
// const phonepeWebhook = asyncHandler(async (req, res) => {
//   const { response } = req.body || {};
//   if (!response) {
//     return res.status(400).json({ success: false, message: 'Missing response field' });
//   }
//   let decoded;
//   try {
//     decoded = JSON.parse(Buffer.from(response, 'base64').toString('utf8'));
//   } catch (_e) {
//     return res.status(400).json({ success: false, message: 'Invalid base64 payload' });
//   }

//   const merchantTransactionId = decoded.data && decoded.data.merchantTransactionId;
//   if (!merchantTransactionId) {
//     return res.status(400).json({ success: false, message: 'No merchantTransactionId' });
//   }

//   const order = await Order.findOne({ merchantTransactionId });
//   if (!order) {
//     return res.status(404).json({ success: false, message: 'Order not found' });
//   }

//   const code = decoded.code;
//   if (code === 'PAYMENT_SUCCESS' || (decoded.data && decoded.data.state === 'COMPLETED')) {
//     if (order.paymentStatus !== 'PAID') {
//       order.paymentStatus = 'PAID';
//       await order.save();
//       await decrementStock(order.items);
//       pushToShiprocket(order._id);
//     }
//   } else {
//     order.paymentStatus = 'FAILED';
//     await order.save();
//   }

//   res.status(200).json({ success: true });
// });

// /**
//  * List the current user's orders (logged-in only).
//  */
// const myOrders = asyncHandler(async (req, res) => {
//   const orders = await Order.find({ user: req.user.id })
//     .populate('items.product', 'title images')
//     .sort({ createdAt: -1 });
//   success(res, orders, 'Your orders');
// });

// /**
//  * Get a single order by id (owner or admin).
//  */
// const getOrder = asyncHandler(async (req, res) => {
//   const order = await Order.findById(req.params.id).populate('items.product', 'title images');
//   if (!order) {
//     const err = new Error('Order not found');
//     err.status = 404;
//     throw err;
//   }
//   if (req.user.role !== 'admin' && (!order.user || order.user.toString() !== req.user.id)) {
//     const err = new Error('Not authorized to view this order');
//     err.status = 403;
//     throw err;
//   }
//   success(res, order, 'Order fetched');
// });

// /**
//  * Admin: list all orders with filters.
//  */
// const listOrders = asyncHandler(async (req, res) => {
//   const { status, paymentStatus } = req.query;
//   const page = Math.max(1, parseInt(req.query.page, 10) || 1);
//   const limit = Math.min(100, Math.max(1, parseInt(req.query.limit, 10) || 20));
//   const filter = {};
//   if (status) filter.status = status;
//   if (paymentStatus) filter.paymentStatus = paymentStatus;

//   const skip = (page - 1) * limit;
//   const [orders, total] = await Promise.all([
//     Order.find(filter)
//       .populate('user', 'name email phone')
//       .populate('items.product', 'title images')
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit),
//     Order.countDocuments(filter),
//   ]);
//   success(res, orders, 'Orders fetched', 200, {
//     pagination: { page, limit, total, pages: Math.ceil(total / limit) },
//   });
// });

// /**
//  * Admin: update order status. Also reflects on Shiprocket when relevant.
//  */
// const updateOrderStatus = asyncHandler(async (req, res) => {
//   const { status } = req.body;
//   const order = await Order.findById(req.params.id);
//   if (!order) {
//     const err = new Error('Order not found');
//     err.status = 404;
//     throw err;
//   }
//   order.status = status;
//   await order.save();
//   success(res, order, 'Order status updated');
// });

// /**
//  * Admin: generate AWB for an order's Shiprocket shipment.
//  */
// const generateAWB = asyncHandler(async (req, res) => {
//   const order = await Order.findById(req.params.id);
//   if (!order) {
//     const err = new Error('Order not found');
//     err.status = 404;
//     throw err;
//   }
//   if (!order.shiprocketShipmentId) {
//     const err = new Error('Order has no Shiprocket shipment');
//     err.status = 400;
//     throw err;
//   }
//   const result = await shiprocketService.generateAWB(order.shiprocketShipmentId);
//   // Try to capture AWB code from the response.
//   const awb =
//     result && result.payload && result.payload.awb_code
//       ? result.payload.awb_code
//       : (result && result.awb_code) || null;
//   if (awb) {
//     order.awbCode = awb;
//     await order.save();
//   }
//   success(res, { result, awbCode: awb }, 'AWB generated');
// });

// /**
//  * Admin: track an order's shipment via Shiprocket.
//  */
// const trackOrder = asyncHandler(async (req, res) => {
//   const order = await Order.findById(req.params.id);
//   if (!order) {
//     const err = new Error('Order not found');
//     err.status = 404;
//     throw err;
//   }
//   if (!order.shiprocketShipmentId) {
//     const err = new Error('Order has no Shiprocket shipment');
//     err.status = 400;
//     throw err;
//   }
//   const tracking = await shiprocketService.trackShipment(order.shiprocketShipmentId);
//   success(res, tracking, 'Tracking fetched');
// });

// /**
//  * Admin: cancel an order. Cancels on Shiprocket too and restores stock.
//  */
// const cancelOrder = asyncHandler(async (req, res) => {
//   const order = await Order.findById(req.params.id);
//   if (!order) {
//     const err = new Error('Order not found');
//     err.status = 404;
//     throw err;
//   }
//   if (order.status === 'Delivered') {
//     const err = new Error('Delivered orders cannot be cancelled');
//     err.status = 400;
//     throw err;
//   }
//   order.status = 'Cancelled';
//   await order.save();

//   // Restore stock.
//   await Promise.all(
//     order.items.map((it) =>
//       Product.findByIdAndUpdate(it.product, { $inc: { stock: it.quantity } })
//     )
//   );

//   if (order.shiprocketOrderId) {
//     shiprocketService.cancelOrder(order.shiprocketOrderId).catch((e) =>
//       console.error('[shiprocket] cancel failed:', e.message)
//     );
//   }
//   success(res, order, 'Order cancelled');
// });

// /**
//  * Helper: clear the source cart after a successful order.
//  */
// async function clearSourceCart(req, userId) {
//   try {
//     const cartToken = req.headers['x-cart-token'] || req.body.cartToken;
//     if (userId) {
//       await Cart.findOneAndUpdate({ user: userId }, { items: [] });
//     } else if (cartToken) {
//       await Cart.findOneAndUpdate({ cartToken }, { items: [] });
//     }
//   } catch (e) {
//     // non-fatal
//   }
// }

// module.exports = {
//   createOrder,
//   verifyPayment,
//   phonepeWebhook,
//   myOrders,
//   getOrder,
//   listOrders,
//   updateOrderStatus,
//   generateAWB,
//   trackOrder,
//   cancelOrder,
// };

const Order = require('../models/Order');
const Product = require('../models/Product');
const Cart = require('../models/Cart');
const { success, asyncHandler } = require('../utils/apiResponse');
const { orderNumber, shortId } = require('../utils/id');
const { findOrCreateGuestUser } = require('./authController');
const { resolveCart } = require('./cartController');
const phonepeService = require('../services/phonepeService');
const shiprocketService = require('../services/shiprocketService');
const Coupon = require('../models/Coupon');
const { generateToken } = require('../utils/generateToken');

function httpError(status, message) {
  const err = new Error(message);
  err.status = status;
  return err;
}

/**
 * Validate line items against current product records and compute the total.
 * Price aur stock hamesha DB se (client ka price kabhi nahi), variant-aware.
 */
async function validateAndPriceItems(items) {
  let total = 0;
  const priced = [];

  for (const it of items) {
    const product = await Product.findById(it.productId);
    if (!product || !product.isActive) {
      throw httpError(400, `Product ${it.productId} not available`);
    }

    const qty = Number(it.quantity);
    if (!Number.isInteger(qty) || qty < 1) {
      throw httpError(400, 'Invalid quantity');
    }

    // ---- Resolve price + stock: variant-aware ----
    let unitPrice = product.discountPrice || product.price;
    let availableStock = product.stock;
    let matchedVariant = null;

    if (it.variantLabel) {
      matchedVariant = (product.variants || []).find((v) => v.label === it.variantLabel);
      if (!matchedVariant) {
        throw httpError(400, `Variant "${it.variantLabel}" not found for ${product.title}`);
      }
      unitPrice = matchedVariant.discountPrice || matchedVariant.price;
      availableStock = matchedVariant.stock;
    }

    if (availableStock < qty) {
      throw httpError(
        400,
        `Insufficient stock for ${product.title}${matchedVariant ? ` (${matchedVariant.label})` : ''} (have ${availableStock}, need ${qty})`
      );
    }

    total += unitPrice * qty;
    priced.push({
      product: product._id,
      name: product.title,
      quantity: qty,
      price: unitPrice,
      variantLabel: matchedVariant ? matchedVariant.label : null,
      variantSku: matchedVariant ? matchedVariant.sku || null : null,
      image: product.images && product.images[0] ? product.images[0] : null,
    });
  }

  return { priced, total };
}

/**
 * Stock ghatao (variant ho to variant ka stock, warna product ka).
 */
async function decrementStock(items) {
  await Promise.all(
    items.map((it) => {
      if (it.variantLabel) {
        return Product.updateOne(
          { _id: it.product, 'variants.label': it.variantLabel },
          { $inc: { 'variants.$.stock': -it.quantity } }
        );
      }
      return Product.updateOne({ _id: it.product }, { $inc: { stock: -it.quantity } });
    })
  );
}

/**
 * Stock wapas jodo (cancel par).
 */
async function restoreStock(items) {
  await Promise.all(
    items.map((it) => {
      if (it.variantLabel) {
        return Product.updateOne(
          { _id: it.product, 'variants.label': it.variantLabel },
          { $inc: { 'variants.$.stock': it.quantity } }
        );
      }
      return Product.updateOne({ _id: it.product }, { $inc: { stock: it.quantity } });
    })
  );
}

/**
 * Jis cart se order bana tha use khali karo (sirf cart checkout me sourceCart set hota hai,
 * Buy Now order se cart nahi chhedta).
 */
async function clearOrderCart(order) {
  try {
    if (order.sourceCart) {
      await Cart.findByIdAndUpdate(order.sourceCart, { items: [] });
    }
  } catch (e) {
    // non-fatal
  }
}

/**
 * ONLINE payment confirm hone par ek hi baar: PAID mark, stock ghatao, Shiprocket, cart clear.
 * Webhook aur verifyPayment dono aa jayein to bhi stock do baar nahi ghatega.
 */
async function markPaidOnce(orderId) {
  const order = await Order.findOneAndUpdate(
    { _id: orderId, paymentStatus: { $ne: 'PAID' } },
    { paymentStatus: 'PAID' },
    { new: true }
  );
  if (!order) return null; // pehle se PAID tha
  await decrementStock(order.items);
  pushToShiprocket(order._id);
  await clearOrderCart(order);
  return order;
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
  const { source, paymentMethod, shippingAddress, couponCode } = req.body;
  console.log('[order] start', { source, paymentMethod, hasUser: !!req.user });
  let { items } = req.body;

  // ---- Items: cart checkout me server cart se, Buy Now me request se ----
  let sourceCart = null;
  if (source === 'cart') {
    sourceCart = await resolveCart(req);
    console.log('[order] cart', !!sourceCart, sourceCart && sourceCart.items.length);

    if (!sourceCart || sourceCart.items.length === 0) {
      throw httpError(400, 'Your cart is empty');
    }
    items = sourceCart.items.map((it) => ({
      productId: it.product,
      variantLabel: it.variantLabel || null,
      quantity: it.quantity,
    }));
  }
  if (!Array.isArray(items) || items.length === 0) {
    throw httpError(400, 'At least one item required');
  }

  const { priced, total } = await validateAndPriceItems(items);
  console.log('[order] priced', total);

  // ---- Coupon apply ----
  let discount = 0;
  let appliedCouponCode = null;

  if (couponCode) {
    const coupon = await Coupon.findOne({ code: couponCode.trim().toUpperCase() });

    if (!coupon || !coupon.isActive) {
      throw httpError(400, 'Invalid or inactive coupon');
    }
    if (coupon.expiryDate && new Date() > new Date(coupon.expiryDate)) {
      throw httpError(400, 'Coupon has expired');
    }
    if (coupon.usageLimit !== null && coupon.usedCount >= coupon.usageLimit) {
      throw httpError(400, 'Coupon usage limit reached');
    }
    if (total < coupon.minOrderAmount) {
      throw httpError(400, `Minimum order amount for this coupon is ₹${coupon.minOrderAmount}`);
    }

    discount =
      coupon.discountType === 'PERCENTAGE'
        ? Math.round((total * coupon.amount) / 100)
        : coupon.amount;
    discount = Math.min(discount, total); // discount total se zyada na ho jaye

    appliedCouponCode = coupon.code;
    await Coupon.findByIdAndUpdate(coupon._id, { $inc: { usedCount: 1 } });
  }

  const COD_CHARGE = 49;
  const codCharge = paymentMethod === 'COD' ? COD_CHARGE : 0;
  const finalTotal = Math.max(total - discount, 0) + codCharge;

  // ---- User: logged-in ya guest account ----
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
console.log('[order] user resolved', userId);
  const baseOrder = {
    orderNumber: orderNumber(),
    user: userId,
    items: priced,
    shippingAddress,
    subtotal: total,
    couponCode: appliedCouponCode,
    discountAmount: discount,
    codCharge,
    totalAmount: finalTotal,
    paymentMethod,
    sourceCart: sourceCart ? sourceCart._id : null,
  };

  if (paymentMethod === 'COD') {
    const order = await Order.create({ ...baseOrder, paymentStatus: 'PENDING' });
    console.log('[order] created');
    await decrementStock(priced);
    pushToShiprocket(order._id);
    await clearOrderCart(order);
    console.log('[order] responding');
    success(res, { order, authToken: newAuthToken }, 'Order placed (COD)', 201);
    return;
  }

  // ONLINE: cart yahan clear nahi hota, payment confirm hone par (markPaidOnce) hota hai.
  const merchantTransactionId = shortId('MTX_');
  const redirectUrl = `https://shuddhik.com/payment/callback?merchantTransactionId=${merchantTransactionId}`;

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

  success(
    res,
    {
      order,
      paymentUrl: result.paymentUrl,
      merchantTransactionId,
    },
    'Payment initiated',
    201
  );
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
    throw httpError(400, 'merchantTransactionId required');
  }

  const order = await Order.findOne({ merchantTransactionId });
  if (!order) {
    throw httpError(404, 'Order not found for that transaction id');
  }

  const status = await phonepeService.checkStatus(merchantTransactionId);
  if (status.paid) {
    await markPaidOnce(order._id);
    const fresh = await Order.findById(order._id);
    success(res, fresh, 'Payment verified and order confirmed');
  } else {
    if (order.paymentStatus !== 'PAID') {
      order.paymentStatus = 'FAILED';
      await order.save();
    }
    throw httpError(402, `Payment not completed (status: ${status.status})`);
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
    await markPaidOnce(order._id);
  } else if (order.paymentStatus !== 'PAID') {
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
    throw httpError(404, 'Order not found');
  }
  if (req.user.role !== 'admin' && (!order.user || order.user.toString() !== req.user.id)) {
    throw httpError(403, 'Not authorized to view this order');
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
    throw httpError(404, 'Order not found');
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
    throw httpError(404, 'Order not found');
  }
  if (!order.shiprocketShipmentId) {
    throw httpError(400, 'Order has no Shiprocket shipment');
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
    throw httpError(404, 'Order not found');
  }
  if (!order.shiprocketShipmentId) {
    throw httpError(400, 'Order has no Shiprocket shipment');
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
    throw httpError(404, 'Order not found');
  }
  if (order.status === 'Delivered') {
    throw httpError(400, 'Delivered orders cannot be cancelled');
  }
  if (order.status === 'Cancelled') {
    throw httpError(400, 'Order is already cancelled');
  }
  order.status = 'Cancelled';
  await order.save();

  // Stock sirf tab wapas jodo jab pehle ghataya gaya tha:
  // COD me order banate hi ghatta hai, ONLINE me payment PAID hone par.
  const stockWasDeducted = order.paymentMethod === 'COD' || order.paymentStatus === 'PAID';
  if (stockWasDeducted) {
    await restoreStock(order.items);
  }

  if (order.shiprocketOrderId) {
    shiprocketService.cancelOrder(order.shiprocketOrderId).catch((e) =>
      console.error('[shiprocket] cancel failed:', e.message)
    );
  }
  success(res, order, 'Order cancelled');
});

function startPendingPoller() {
  if (global.__pendingPollerStarted) return; // double start se bachao
  global.__pendingPollerStarted = true;
  let running = false;

  setInterval(async () => {
    if (running) return;
    running = true;
    try {
      const now = Date.now();
      const pending = await Order.find({
        paymentMethod: 'ONLINE',
        paymentStatus: { $in: ['PENDING', 'FAILED'] }, // FAILED bhi, kyunki verifyPayment PENDING pe bhi FAILED kar deta tha
        merchantTransactionId: { $ne: null },
        status: { $ne: 'Cancelled' },
        createdAt: {
          $gte: new Date(now - 24 * 3600 * 1000), // last 24 ghante
          $lte: new Date(now - 60 * 1000),        // 1 min se purane
        },
      }).select('_id orderNumber merchantTransactionId').limit(50);

      for (const o of pending) {
        try {
          const status = await phonepeService.checkStatus(o.merchantTransactionId);
          if (status.paid) {
            await markPaidOnce(o._id);
            console.log('[poller] recovered', o.orderNumber);
          }
        } catch (e) {
          console.error('[poller] check failed', o.orderNumber, e.message);
        }
      }
    } catch (e) {
      console.error('[poller] error', e.message);
    } finally {
      running = false;
    }
  }, 2 * 60 * 1000);

  console.log('[poller] started');
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
  startPendingPoller
};