const mongoose = require('mongoose');

/**
 * Connect to MongoDB using the MONGODB_URI env var.
 * Falls back to a local Mongo instance for quick local dev.
 */
const connectDB = async () => {
  const uri =
    process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ecommerce';

  try {
    const conn = await mongoose.connect(uri);
    console.log(`[db] MongoDB connected: ${conn.connection.host}/${conn.connection.name}`);
    return conn;
  } catch (err) {
    console.error(`[db] MongoDB connection error: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
