// const Cart = require('../models/Cart');
// const Product = require('../models/Product');
// const { success, asyncHandler } = require('../utils/apiResponse');
// const { shortId } = require('../utils/id');

// /**
//  * Resolve the cart for the current request. Logged-in users use their user id;
//  * guests use a cart token (issued on first cart creation and expected in the
//  * x-cart-token header on subsequent calls).
//  */
// async function resolveCart(req, { createIfMissing = false } = {}) {
//   const userId = req.user ? req.user.id : null;
//   const cartToken = req.headers['x-cart-token'] || req.body.cartToken;

//   let cart;
//   if (userId) {
//     cart = await Cart.findOne({ user: userId });
//   } else if (cartToken) {
//     cart = await Cart.findOne({ cartToken });
//   }

//   if (!cart && createIfMissing) {
//     cart = await Cart.create({
//       cartToken: userId ? null : shortId('cart_'),
//       user: userId,
//       items: [],
//     });
//   }
//   return cart;
// }

// /**
//  * Get the current cart.
//  */
// const getCart = asyncHandler(async (req, res) => {
//   const cart = await resolveCart(req, { createIfMissing: true });
//   await cart.populate('items.product', 'title price stock images isActive');
//   success(res, cart, 'Cart fetched');
// });

// /**
//  * Add an item to the cart. If the product already exists in the cart, bump the
//  * quantity (capped at product stock).
//  */
// const addToCart = asyncHandler(async (req, res) => {
//   const { productId, quantity = 1 } = req.body;
//   const product = await Product.findById(productId);
//   if (!product || !product.isActive) {
//     const err = new Error('Product not available');
//     err.status = 404;
//     throw err;
//   }
//   if (quantity > product.stock) {
//     const err = new Error(`Only ${product.stock} unit(s) in stock`);
//     err.status = 400;
//     throw err;
//   }

//   const cart = await resolveCart(req, { createIfMissing: true });

//   const existing = cart.items.find((it) => it.product.toString() === productId);
//   if (existing) {
//     existing.quantity = Math.min(existing.quantity + quantity, product.stock);
//     existing.price = product.price;
//   } else {
//     cart.items.push({ product: product._id, quantity, price: product.price });
//   }
//   await cart.save();
//   await cart.populate('items.product', 'title price stock images isActive');

//   success(res, cart, 'Item added to cart');
// });

// /**
//  * Update the quantity of an item in the cart.
//  */
// const updateCartItem = asyncHandler(async (req, res) => {
//   const { productId, quantity } = req.body;
//   const cart = await resolveCart(req);
//   if (!cart) {
//     const err = new Error('Cart not found');
//     err.status = 404;
//     throw err;
//   }

//   const item = cart.items.find((it) => it.product.toString() === productId);
//   if (!item) {
//     const err = new Error('Item not in cart');
//     err.status = 404;
//     throw err;
//   }

//   const product = await Product.findById(productId);
//   if (!product) {
//     const err = new Error('Product not found');
//     err.status = 404;
//     throw err;
//   }
//   if (quantity > product.stock) {
//     const err = new Error(`Only ${product.stock} unit(s) in stock`);
//     err.status = 400;
//     throw err;
//   }
//   item.quantity = quantity;
//   item.price = product.price;
//   await cart.save();
//   await cart.populate('items.product', 'title price stock images isActive');

//   success(res, cart, 'Cart item updated');
// });

// /**
//  * Remove an item from the cart.
//  */
// const removeFromCart = asyncHandler(async (req, res) => {
//   const { productId } = req.body;
//   const cart = await resolveCart(req);
//   if (!cart) {
//     const err = new Error('Cart not found');
//     err.status = 404;
//     throw err;
//   }
//   cart.items = cart.items.filter((it) => it.product.toString() !== productId);
//   await cart.save();
//   await cart.populate('items.product', 'title price stock images isActive');
//   success(res, cart, 'Item removed from cart');
// });

// /**
//  * Clear the cart entirely.
//  */
// const clearCart = asyncHandler(async (req, res) => {
//   const cart = await resolveCart(req);
//   if (cart) {
//     cart.items = [];
//     await cart.save();
//   }
//   success(res, cart || { items: [] }, 'Cart cleared');
// });

// module.exports = { getCart, addToCart, updateCartItem, removeFromCart, clearCart };

const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { success, asyncHandler } = require('../utils/apiResponse');
const { shortId } = require('../utils/id');

const MAX_QTY_PER_ITEM = 10;

function httpError(status, message) {
  const err = new Error(message);
  err.status = status;
  return err;
}

/** Final unit price: discountPrice (agar valid) warna price. */
function effectivePrice(price, discountPrice) {
  return discountPrice > 0 && discountPrice < price ? discountPrice : price;
}

/**
 * Product + variantLabel se live price aur stock nikalo.
 * Variants wale product me valid variantLabel zaroori hai.
 * Checkout controller me bhi isi function ko use karo.
 */
// function resolveVariant(product, variantLabel) {
//   const label = variantLabel || null;

//   if (product.variants && product.variants.length > 0) {
//     const variant = product.variants.find((v) => v.label === label);
//     if (!variant) throw httpError(400, 'Please select a valid variant');
//     return {
//       label,
//       price: effectivePrice(variant.price, variant.discountPrice),
//       stock: variant.stock,
//     };
//   }

//   return {
//     label: null,
//     price: effectivePrice(product.price, product.discountPrice),
//     stock: product.stock,
//   };
// }

function resolveVariant(product, variantLabel) {
  const label = variantLabel || null;

  // Label diya hai to variant me se dhundo
  if (label) {
    const variant = (product.variants || []).find((v) => v.label === label);
    if (!variant) throw httpError(400, 'Selected pack is not available');
    return {
      label,
      price: effectivePrice(variant.price, variant.discountPrice),
      originalPrice: variant.price,
      stock: variant.stock,
    };
  }

  // Label null = base product (Single Pack)
  return {
    label: null,
    price: effectivePrice(product.price, product.discountPrice),
    originalPrice: product.price,
    stock: product.stock,
  };
}

function isSameItem(item, productId, variantLabel) {
  return (
    item.product.toString() === String(productId) &&
    (item.variantLabel || null) === (variantLabel || null)
  );
}

function parseQuantity(value, { defaultValue = 1 } = {}) {
  const q = value === undefined ? defaultValue : Number(value);
  if (!Number.isInteger(q) || q < 1) throw httpError(400, 'Quantity must be a whole number, at least 1');
  if (q > MAX_QTY_PER_ITEM) throw httpError(400, `Max ${MAX_QTY_PER_ITEM} units per item`);
  return q;
}

async function loadAvailableProduct(productId) {
  const product = productId ? await Product.findById(productId) : null;
  if (!product || !product.isActive) throw httpError(404, 'Product not available');
  return product;
}

/**
 * Cart resolve karo: logged-in user -> user id, guest -> cartToken
 * (x-cart-token header, body ya query me).
 */
async function resolveCart(req, { createIfMissing = false } = {}) {
  const userId = req.user ? req.user.id : null;
  const cartToken =
    req.headers['x-cart-token'] || (req.body && req.body.cartToken) || req.query.cartToken;

  let cart = null;
  if (userId) {
    cart = await Cart.findOne({ user: userId });
  } else if (cartToken) {
    cart = await Cart.findOne({ cartToken });
  }

  if (!cart && createIfMissing) {
    const data = { items: [] };
    if (userId) data.user = userId;
    else data.cartToken = shortId('cart_'); // user cart me cartToken set nahi karte
    cart = await Cart.create(data);
  }
  return cart;
}

/**
 * Frontend ke liye cart ka response: live price, stock, line total, subtotal.
 * Deleted products silently skip hote hain; unavailable items flag ke saath aate hain.
 */
async function formatCart(cart) {
  const ids = cart.items.map((it) => it.product);
  const products = await Product.find({ _id: { $in: ids } });
  const productMap = new Map(products.map((p) => [p._id.toString(), p]));

  let subtotal = 0;
  let itemCount = 0;
  const items = [];

  for (const it of cart.items) {
    const product = productMap.get(it.product.toString());
    if (!product) continue;

    let info = null;
    try {
      info = resolveVariant(product, it.variantLabel);
    } catch (e) {
      info = null; // variant ab exist nahi karta
    }

    const unitPrice = info ? info.price : 0;
    const stock = info ? info.stock : 0;
    const available = Boolean(product.isActive && info && stock >= it.quantity);
    const lineTotal = available ? unitPrice * it.quantity : 0;

    if (available) {
      subtotal += lineTotal;
      itemCount += it.quantity;
    }

    items.push({
      productId: product._id,
      slug: product.slug,
      title: product.title,
      image: product.images && product.images[0] ? product.images[0] : null,
      variantLabel: it.variantLabel || null,
      quantity: it.quantity,
      unitPrice,
      // originalPrice: info ? (product.variants.length ? product.variants.find((v) => v.label === info.label).price : product.price) : 0,
      originalPrice: info ? info.originalPrice : 0,
      lineTotal,
      stock,
      available,
    });
  }

  return {
    cartToken: cart.cartToken || null,
    items,
    itemCount,
    subtotal,
  };
}

/** GET /cart */
const getCart = asyncHandler(async (req, res) => {
  const cart = await resolveCart(req, { createIfMissing: true });
  success(res, await formatCart(cart), 'Cart fetched');
});

/** POST /cart/add  body: { productId, variantLabel?, quantity? } */
const addToCart = asyncHandler(async (req, res) => {
  const { productId, variantLabel = null } = req.body;
  const quantity = parseQuantity(req.body.quantity);

  const product = await loadAvailableProduct(productId);
  const variant = resolveVariant(product, variantLabel);

  const cart = await resolveCart(req, { createIfMissing: true });
  const existing = cart.items.find((it) => isSameItem(it, product._id, variant.label));

  const newQty = (existing ? existing.quantity : 0) + quantity;
  if (newQty > variant.stock) {
    throw httpError(400, `Only ${variant.stock} unit(s) in stock`);
  }
  if (newQty > MAX_QTY_PER_ITEM) {
    throw httpError(400, `Max ${MAX_QTY_PER_ITEM} units per item`);
  }

  if (existing) {
    existing.quantity = newQty;
    existing.price = variant.price;
  } else {
    cart.items.push({
      product: product._id,
      variantLabel: variant.label,
      quantity,
      price: variant.price,
    });
  }

  await cart.save();
  success(res, await formatCart(cart), 'Item added to cart');
});

/** PUT /cart/update  body: { productId, variantLabel?, quantity } (quantity = final value) */
const updateCartItem = asyncHandler(async (req, res) => {
  const { productId, variantLabel = null } = req.body;
  const quantity = parseQuantity(req.body.quantity, { defaultValue: undefined });

  const cart = await resolveCart(req);
  if (!cart) throw httpError(404, 'Cart not found');

  const item = cart.items.find((it) => isSameItem(it, productId, variantLabel));
  if (!item) throw httpError(404, 'Item not in cart');

  const product = await loadAvailableProduct(productId);
  const variant = resolveVariant(product, variantLabel);

  if (quantity > variant.stock) {
    throw httpError(400, `Only ${variant.stock} unit(s) in stock`);
  }

  item.quantity = quantity;
  item.price = variant.price;
  await cart.save();
  success(res, await formatCart(cart), 'Cart item updated');
});

/** DELETE /cart/remove  body: { productId, variantLabel? } */
const removeFromCart = asyncHandler(async (req, res) => {
  const { productId, variantLabel = null } = req.body;
  const cart = await resolveCart(req);
  if (!cart) throw httpError(404, 'Cart not found');

  cart.items = cart.items.filter((it) => !isSameItem(it, productId, variantLabel));
  await cart.save();
  success(res, await formatCart(cart), 'Item removed from cart');
});

/** DELETE /cart/clear */
const clearCart = asyncHandler(async (req, res) => {
  const cart = await resolveCart(req);
  if (cart) {
    cart.items = [];
    await cart.save();
    return success(res, await formatCart(cart), 'Cart cleared');
  }
  success(res, { cartToken: null, items: [], itemCount: 0, subtotal: 0 }, 'Cart cleared');
});

/**
 * POST /cart/merge  (login required)  body: { cartToken }
 * Login ke baad guest cart ko user cart me merge karo, phir guest cart delete.
 * Frontend: login success hote hi ye call karo, phir localStorage se cartToken hata do.
 */
const mergeCart = asyncHandler(async (req, res) => {
  if (!req.user) throw httpError(401, 'Login required');

  const guestToken = req.headers['x-cart-token'] || req.body.cartToken;
  const userCart = await resolveCart(req, { createIfMissing: true });

  if (guestToken) {
    const guestCart = await Cart.findOne({ cartToken: guestToken });

    if (guestCart && guestCart.items.length > 0) {
      for (const gItem of guestCart.items) {
        const product = await Product.findById(gItem.product);
        if (!product || !product.isActive) continue;

        let variant;
        try {
          variant = resolveVariant(product, gItem.variantLabel);
        } catch (e) {
          continue; // variant ab exist nahi karta
        }
        if (variant.stock < 1) continue;

        const existing = userCart.items.find((it) =>
          isSameItem(it, product._id, variant.label)
        );
        const wanted = (existing ? existing.quantity : 0) + gItem.quantity;
        // Merge me error nahi, stock/max tak cap kar do
        const finalQty = Math.min(wanted, variant.stock, MAX_QTY_PER_ITEM);

        if (existing) {
          existing.quantity = finalQty;
          existing.price = variant.price;
        } else {
          userCart.items.push({
            product: product._id,
            variantLabel: variant.label,
            quantity: finalQty,
            price: variant.price,
          });
        }
      }
      await userCart.save();
    }

    if (guestCart) await Cart.deleteOne({ _id: guestCart._id });
  }

  success(res, await formatCart(userCart), 'Cart merged');
});

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  mergeCart,
  // checkout controller ke liye
  resolveCart,
  resolveVariant,
  formatCart,
};