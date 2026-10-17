// const express = require('express');
// const cartController = require('../controllers/cartController');
// const { optionalAuth } = require('../middlewares/auth');
// const { rules, validate } = require('../utils/validators');

// const router = express.Router();

// // All cart routes work for both guests (x-cart-token header) and logged-in users.
// router.use(optionalAuth);

// router.get('/', cartController.getCart);
// router.post('/', rules.cartItem, validate, cartController.addToCart);
// router.put('/', rules.cartItem, validate, cartController.updateCartItem);
// router.delete('/', rules.cartItem, validate, cartController.removeFromCart);
// router.delete('/clear', cartController.clearCart);

// module.exports = router;

const express = require('express');
const cartController = require('../controllers/cartController');
const { optionalAuth, protect } = require('../middlewares/auth');
const { rules, validate } = require('../utils/validators');

const router = express.Router();

router.get('/', optionalAuth, cartController.getCart);
router.post('/', optionalAuth, rules.cartAdd, validate, cartController.addToCart);
router.put('/', optionalAuth, rules.cartUpdate, validate, cartController.updateCartItem);
router.delete('/clear', optionalAuth, cartController.clearCart);
router.delete('/', optionalAuth, rules.cartRemove, validate, cartController.removeFromCart);
router.post('/merge', protect, rules.cartMerge, validate, cartController.mergeCart);

module.exports = router;