const express = require('express');
const cartController = require('../controllers/cartController');
const { optionalAuth } = require('../middlewares/auth');
const { rules, validate } = require('../utils/validators');

const router = express.Router();

// All cart routes work for both guests (x-cart-token header) and logged-in users.
router.use(optionalAuth);

router.get('/', cartController.getCart);
router.post('/', rules.cartItem, validate, cartController.addToCart);
router.put('/', rules.cartItem, validate, cartController.updateCartItem);
router.delete('/', rules.cartItem, validate, cartController.removeFromCart);
router.delete('/clear', cartController.clearCart);

module.exports = router;
