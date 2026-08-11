const express = require('express');
const orderController = require('../controllers/orderController');
const { protect, admin } = require('../middlewares/auth');
const { rules, validate } = require('../utils/validators');

const router = express.Router();

// --- Public / user ---
// Checkout (guest or logged-in). Creates the order and either persists (COD)
// or initiates a PhonePe payment (ONLINE).
router.post('/', rules.checkout, validate, orderController.createOrder);

// Verify an online payment after the user returns from PhonePe.
router.post('/verify-payment', orderController.verifyPayment);

// PhonePe webhook (server-to-server). No auth — verified by signature/state.
router.post('/phonepe/webhook', orderController.phonepeWebhook);

// Logged-in user: their orders + single order detail.
router.get('/me', protect, orderController.myOrders);
router.get('/me/:id', protect, orderController.getOrder);

// --- Admin ---
router.get('/', protect, admin, orderController.listOrders);
router.get('/:id', protect, admin, orderController.getOrder);
router.put('/:id/status', protect, admin, orderController.updateOrderStatus);
router.post('/:id/awb', protect, admin, orderController.generateAWB);
router.get('/:id/track', protect, admin, orderController.trackOrder);
router.put('/:id/cancel', protect, admin, orderController.cancelOrder);

module.exports = router;
