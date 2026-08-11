const { body, validationResult } = require('express-validator');

/**
 * Run express-validator chains and convert errors into an Error that the
 * central error handler can format.
 */
const validate = (req, _res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();
  const message = errors
    .array()
    .map((e) => `${e.param}: ${e.msg}`)
    .join('; ');
  const err = new Error(message);
  err.status = 400;
  err.code = 'VALIDATION_ERROR';
  next(err);
};

const rules = {
  // Auth
  adminLogin: [
    body('email').isEmail().withMessage('Valid email required'),
    body('password').isString().isLength({ min: 6 }).withMessage('Password min 6 chars'),
  ],
  googleLogin: [
    body('idToken').isString().withMessage('idToken required'),
  ],
  userSignup: [
    body('name').isString().trim().isLength({ min: 1 }).withMessage('Name required'),
    body('email').isEmail().withMessage('Valid email required'),
    body('password').isString().isLength({ min: 6 }).withMessage('Password min 6 chars'),
  ],
  userLogin: [
    body('email').isEmail().withMessage('Valid email required'),
    body('password').isString().isLength({ min: 1 }).withMessage('Password required'),
  ],

  // Category
  category: [
    body('name').isString().trim().isLength({ min: 1 }).withMessage('Name required'),
  ],

  // Product
  product: [
    body('title').isString().trim().isLength({ min: 1 }).withMessage('Title required'),
    body('price').isFloat({ min: 0 }).withMessage('Price must be a non-negative number'),
    body('stock').isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),
  ],

  // Review
  review: [
    body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be 1-5'),
    body('comment').isString().trim().isLength({ min: 1 }).withMessage('Comment required'),
  ],

  // Cart
  cartItem: [
    body('productId').isMongoId().withMessage('Valid productId required'),
    body('quantity').isInt({ min: 1 }).withMessage('Quantity must be >= 1'),
  ],

  // Order / checkout
  checkout: [
    body('items').isArray({ min: 1 }).withMessage('At least one item required'),
    body('items.*.productId').isMongoId().withMessage('Valid productId required'),
    body('items.*.quantity').isInt({ min: 1 }).withMessage('Quantity >= 1'),
    body('paymentMethod').isIn(['COD', 'ONLINE']).withMessage('paymentMethod must be COD or ONLINE'),
    body('shippingAddress.name').isString().trim().isLength({ min: 1 }).withMessage('Name required'),
    body('shippingAddress.phone')
      .isString()
      .trim()
      .matches(/^[0-9+\-\s]{7,15}$/)
      .withMessage('Valid phone required'),
    body('shippingAddress.address').isString().trim().isLength({ min: 1 }).withMessage('Address required'),
    body('shippingAddress.city').isString().trim().isLength({ min: 1 }).withMessage('City required'),
    body('shippingAddress.state').isString().trim().isLength({ min: 1 }).withMessage('State required'),
    body('shippingAddress.pincode')
      .isString()
      .trim()
      .matches(/^[0-9]{6}$/)
      .withMessage('Valid 6-digit pincode required'),
  ],
  address: [
    body('name').isString().trim().isLength({ min: 1 }).withMessage('Name required'),
    body('phone')
      .isString()
      .trim()
      .matches(/^[0-9+\-\s]{7,15}$/)
      .withMessage('Valid phone required'),
    body('address').isString().trim().isLength({ min: 1 }).withMessage('Address required'),
    body('city').isString().trim().isLength({ min: 1 }).withMessage('City required'),
    body('state').isString().trim().isLength({ min: 1 }).withMessage('State required'),
    body('pincode')
      .isString()
      .trim()
      .matches(/^[0-9]{6}$/)
      .withMessage('Valid 6-digit pincode required'),
    body('country').optional().isString().trim(),
    body('isDefault').optional().isBoolean(),
  ],
};

module.exports = { validate, rules };
