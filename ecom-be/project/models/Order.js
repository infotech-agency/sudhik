const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    name: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true, min: 0 },
  },
  { _id: false }
);

const shippingAddressSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, default: null },
    address: { type: String, required: true },
    landmark: { type: String, default: null }, 
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    country: { type: String, default: 'India' },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    // Human-readable order number (e.g. ORD-20240101-ABC123).
    orderNumber: { type: String, required: true, unique: true, index: true },
    user: {
      // Null for pure guest orders.
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
      index: true,
      sparse: true,
    },
    items: [orderItemSchema],
    shippingAddress: { type: shippingAddressSchema, required: true },

    // Original amount before discount

    subtotal: { type: Number, required: true, min: 0 },

    // Coupon applied (if any)

    couponCode: { type: String, default: null },

    discountAmount: { type: Number, default: 0 },

    // Final payable amount after discount

    totalAmount: { type: Number, required: true, min: 0 },

    totalAmount: { type: Number, required: true, min: 0 },
    paymentMethod: { type: String, enum: ['COD', 'ONLINE'], required: true },
    paymentStatus: {
      type: String,
      enum: ['PENDING', 'PAID', 'FAILED', 'REFUNDED'],
      default: 'PENDING',
    },
    // PhonePe merchant transaction id (our reference, used in /status checks).
    merchantTransactionId: { type: String, default: null, index: true, sparse: true },
    // Shiprocket linkage.
    shiprocketOrderId: { type: Number, default: null },
    shiprocketShipmentId: { type: Number, default: null },
    awbCode: { type: String, default: null },
    shipmentStatus: { type: String, default: null },
    // Internal order lifecycle.
    status: {
      type: String,
      enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Processing',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
