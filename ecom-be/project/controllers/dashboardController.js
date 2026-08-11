const Order = require('../models/Order');
const User = require('../models/User');
const Product = require('../models/Product');
const { success, asyncHandler } = require('../utils/apiResponse');

/**
 * Dashboard summary: total orders, total revenue, total products, total users.
 */
const summary = asyncHandler(async (_req, res) => {
  const [orderAgg, productCount, userCount] = await Promise.all([
    Order.aggregate([
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          totalRevenue: {
            $sum: {
              $cond: [
                { $in: ['$paymentStatus', ['PAID']] },
                '$totalAmount',
                {
                  $cond: [
                    { $eq: ['$paymentMethod', 'COD'] },
                    '$totalAmount',
                    0,
                  ],
                },
              ],
            },
          },
          codOrders: { $sum: { $cond: [{ $eq: ['$paymentMethod', 'COD'] }, 1, 0] } },
          onlineOrders: { $sum: { $cond: [{ $eq: ['$paymentMethod', 'ONLINE'] }, 1, 0] } },
        },
      },
    ]),
    Product.countDocuments(),
    User.countDocuments(),
  ]);

  const s = orderAgg[0] || {};
  success(res, {
    totalOrders: s.totalOrders || 0,
    totalRevenue: s.totalRevenue || 0,
    codOrders: s.codOrders || 0,
    onlineOrders: s.onlineOrders || 0,
    totalProducts: productCount,
    totalUsers: userCount,
  }, 'Dashboard summary');
});

/**
 * Monthly sales report: units sold and revenue per month.
 * Optional ?year=2024 filter (defaults to current year).
 */
const monthlySales = asyncHandler(async (req, res) => {
  const year = parseInt(req.query.year, 10) || new Date().getFullYear();
  const start = new Date(year, 0, 1);
  const end = new Date(year + 1, 0, 1);

  const rows = await Order.aggregate([
    { $match: { createdAt: { $gte: start, $lt: end }, status: { $ne: 'Cancelled' } } },
    { $unwind: '$items' },
    {
      $group: {
        _id: { month: { $month: '$createdAt' } },
        unitsSold: { $sum: '$items.quantity' },
        revenue: { $sum: { $multiply: ['$items.quantity', '$items.price'] } },
        orders: { $addToSet: '$_id' },
      },
    },
    { $sort: { '_id.month': 1 } },
    {
      $project: {
        _id: 0,
        month: '$_id.month',
        unitsSold: 1,
        revenue: 1,
        orderCount: { $size: '$orders' },
      },
    },
  ]);

  success(res, rows, 'Monthly sales report');
});

/**
 * Per-user spend report: which user ordered how much and how many orders.
 */
const userSpend = asyncHandler(async (_req, res) => {
  const rows = await Order.aggregate([
    { $match: { user: { $ne: null }, status: { $ne: 'Cancelled' } } },
    {
      $group: {
        _id: '$user',
        totalSpend: { $sum: '$totalAmount' },
        orderCount: { $sum: 1 },
      },
    },
    { $sort: { totalSpend: -1 } },
    {
      $lookup: {
        from: 'users',
        localField: '_id',
        foreignField: '_id',
        as: 'user',
      },
    },
    { $unwind: '$user' },
    {
      $project: {
        _id: 0,
        userId: '$_id',
        name: '$user.name',
        email: '$user.email',
        phone: '$user.phone',
        isGuest: '$user.isGuest',
        totalSpend: 1,
        orderCount: 1,
      },
    },
  ]);
  success(res, rows, 'Per-user spend report');
});

/**
 * List all users (admin).
 */
const listUsers = asyncHandler(async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page, 10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(req.query.limit, 10) || 20));
  const skip = (page - 1) * limit;
  const [users, total] = await Promise.all([
    User.find().select('-password').sort({ createdAt: -1 }).skip(skip).limit(limit),
    User.countDocuments(),
  ]);
  success(res, users, 'Users fetched', 200, {
    pagination: { page, limit, total, pages: Math.ceil(total / limit) },
  });
});

/**
 * Low-stock products (stock <= threshold, default 5).
 */
const lowStock = asyncHandler(async (req, res) => {
  const threshold = parseInt(req.query.threshold, 10) || 5;
  const products = await Product.find({ stock: { $lte: threshold }, isActive: true }).sort({ stock: 1 });
  success(res, products, 'Low-stock products');
});

module.exports = { summary, monthlySales, userSpend, listUsers, lowStock };
