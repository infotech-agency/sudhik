require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorHandler');
const notFound = require('./middlewares/notFound');

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const couponRoutes = require("./routes/couponRoutes");
const blogRoutes = require("./routes/blogRoutes");
const userRoutes = require('./routes/userRoutes');
const videoRoutes = require("./routes/videoRoutes");

const app = express();

// --- Core middleware ---
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// --- Health check ---
app.get('/health', (_req, res) => res.json({ success: true, message: 'OK' }));

// --- Routes ---
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/coupons',couponRoutes);
app.use("/api/blogs",blogRoutes);
app.use('/api/users', userRoutes);
app.use("/api/videos",videoRoutes)

// --- 404 + error handling ---
app.use(notFound);
app.use(errorHandler);

// --- Start ---
const PORT = process.env.PORT || 5000;

// const start = async () => {
//   await connectDB();
//   app.listen(PORT, () => {
//     console.log(`[server] E-commerce API running on port ${PORT}`);
//     console.log(`[server] Environment: ${process.env.NODE_ENV || 'development'}`);
//   });
// };

const start = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`[server] E-commerce API running on port ${PORT}`);
      console.log(
        `[server] Environment: ${process.env.NODE_ENV || 'development'}`
      );
    });
  } catch (error) {
    console.error('[server] Failed to start:', error.message);
    process.exit(1);
  }
};

start();



// // Only start if this file is run directly (not when required by tests).
// if (require.main === module) {
//   start();
// }

module.exports = app;
