const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { success, asyncHandler } = require('../utils/apiResponse');
const { shortId } = require('../utils/id');

/**
 * Resolve the cart for the current request. Logged-in users use their user id;
 * guests use a cart token (issued on first cart creation and expected in the
 * x-cart-token header on subsequent calls).
 */
async function resolveCart(req, { createIfMissing = false } = {}) {
  const userId = req.user ? req.user.id : null;
  const cartToken = req.headers['x-cart-token'] || req.body.cartToken;

  let cart;
  if (userId) {
    cart = await Cart.findOne({ user: userId });
  } else if (cartToken) {
    cart = await Cart.findOne({ cartToken });
  }

  if (!cart && createIfMissing) {
    cart = await Cart.create({
      cartToken: userId ? null : shortId('cart_'),
      user: userId,
      items: [],
    });
  }
  return cart;
}

/**
 * Get the current cart.
 */
const getCart = asyncHandler(async (req, res) => {
  const cart = await resolveCart(req, { createIfMissing: true });
  await cart.populate('items.product', 'title price stock images isActive');
  success(res, cart, 'Cart fetched');
});

/**
 * Add an item to the cart. If the product already exists in the cart, bump the
 * quantity (capped at product stock).
 */
const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity = 1 } = req.body;
  const product = await Product.findById(productId);
  if (!product || !product.isActive) {
    const err = new Error('Product not available');
    err.status = 404;
    throw err;
  }
  if (quantity > product.stock) {
    const err = new Error(`Only ${product.stock} unit(s) in stock`);
    err.status = 400;
    throw err;
  }

  const cart = await resolveCart(req, { createIfMissing: true });

  const existing = cart.items.find((it) => it.product.toString() === productId);
  if (existing) {
    existing.quantity = Math.min(existing.quantity + quantity, product.stock);
    existing.price = product.price;
  } else {
    cart.items.push({ product: product._id, quantity, price: product.price });
  }
  await cart.save();
  await cart.populate('items.product', 'title price stock images isActive');

  success(res, cart, 'Item added to cart');
});

/**
 * Update the quantity of an item in the cart.
 */
const updateCartItem = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;
  const cart = await resolveCart(req);
  if (!cart) {
    const err = new Error('Cart not found');
    err.status = 404;
    throw err;
  }

  const item = cart.items.find((it) => it.product.toString() === productId);
  if (!item) {
    const err = new Error('Item not in cart');
    err.status = 404;
    throw err;
  }

  const product = await Product.findById(productId);
  if (!product) {
    const err = new Error('Product not found');
    err.status = 404;
    throw err;
  }
  if (quantity > product.stock) {
    const err = new Error(`Only ${product.stock} unit(s) in stock`);
    err.status = 400;
    throw err;
  }
  item.quantity = quantity;
  item.price = product.price;
  await cart.save();
  await cart.populate('items.product', 'title price stock images isActive');

  success(res, cart, 'Cart item updated');
});

/**
 * Remove an item from the cart.
 */
const removeFromCart = asyncHandler(async (req, res) => {
  const { productId } = req.body;
  const cart = await resolveCart(req);
  if (!cart) {
    const err = new Error('Cart not found');
    err.status = 404;
    throw err;
  }
  cart.items = cart.items.filter((it) => it.product.toString() !== productId);
  await cart.save();
  await cart.populate('items.product', 'title price stock images isActive');
  success(res, cart, 'Item removed from cart');
});

/**
 * Clear the cart entirely.
 */
const clearCart = asyncHandler(async (req, res) => {
  const cart = await resolveCart(req);
  if (cart) {
    cart.items = [];
    await cart.save();
  }
  success(res, cart || { items: [] }, 'Cart cleared');
});

module.exports = { getCart, addToCart, updateCartItem, removeFromCart, clearCart };
