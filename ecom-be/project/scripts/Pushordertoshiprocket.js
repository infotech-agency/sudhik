/**
 * Ek-baar ka tool: Shiprocket me push na hue orders dekho aur ek order ko manually push karo.
 * Error seedha screen par dikhta hai.
 *
 * Project folder (ecom-be\project) me chalao:
 *   node scripts/pushOrderToShiprocket.js                      -> atke orders ki list
 *   node scripts/pushOrderToShiprocket.js ORD-20261017-XXXXXXXX -> us order ko push karo
 *
 * Dhyan: ye asli database aur asli Shiprocket par kaam karta hai.
 */
require('dotenv').config();

const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Order = require('../models/Order');
const shiprocketService = require('../services/shiprocketService');

async function main() {
  const orderNumber = process.argv[2];
  await connectDB();

  if (!orderNumber) {
    const stuck = await Order.find({
      shiprocketOrderId: null,
      status: { $ne: 'Cancelled' },
      $or: [{ paymentMethod: 'COD' }, { paymentStatus: 'PAID' }],
    })
      .sort({ createdAt: -1 })
      .limit(50)
      .lean();

    console.log(`\nShiprocket me push nahi hue orders: ${stuck.length}\n`);
    for (const o of stuck) {
      console.log(
        [
          o.orderNumber,
          o.paymentMethod,
          o.paymentStatus,
          o.createdAt.toISOString(),
          `phone=${o.shippingAddress && o.shippingAddress.phone}`,
          `pin=${o.shippingAddress && o.shippingAddress.pincode}`,
          `state=${o.shippingAddress && o.shippingAddress.state}`,
        ].join(' | ')
      );
    }
    console.log('\nEk order push karne ke liye: node scripts/pushOrderToShiprocket.js <orderNumber>');
    return;
  }

  const order = await Order.findOne({ orderNumber });
  if (!order) throw new Error(`Order ${orderNumber} nahi mila`);
  if (order.shiprocketOrderId) throw new Error('Ye order pehle se Shiprocket me push hai');
  if (order.paymentMethod === 'ONLINE' && order.paymentStatus !== 'PAID') {
    throw new Error('Online order abhi PAID nahi hai, push mat karo');
  }

  console.log(`Pushing ${orderNumber} ...`);
  try {
    const result = await shiprocketService.createOrder(order.toObject());
    order.shiprocketOrderId = result.shiprocketOrderId;
    order.shiprocketShipmentId = result.shiprocketShipmentId;
    await order.save();
    console.log('SUCCESS:', result);
  } catch (err) {
    console.error('\nFAILED:', err.message);
    if (err.response) {
      console.error('Shiprocket status:', err.response.status);
      console.error('Shiprocket response:', JSON.stringify(err.response.data, null, 2));
    }
  }
}

main()
  .catch((e) => console.error('Error:', e.message))
  .finally(() => mongoose.disconnect());