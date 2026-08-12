// const mongoose = require('mongoose');

// /**
//  * Connect to MongoDB using the MONGODB_URI env var.
//  * Falls back to a local Mongo instance for quick local dev.
//  */
// const connectDB = async () => {
//   const uri =
//     process.env.MONGODB_URI || 'mongodb+srv://infotechagncy_db_user:DisORuMs1hAqkqF0@cluster0.ovehjph.mongodb.net/';

//   try {
//     const conn = await mongoose.connect(uri);
//     console.log(`[db] MongoDB connected: ${conn.connection.host}/${conn.connection.name}`);
//     return conn;
//   } catch (err) {
//     console.error(`[db] MongoDB connection error: ${err.message}`);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;


const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  console.log('[db] MONGODB_URI exists:', !!uri);

  if (!uri) {
    throw new Error('MONGODB_URI is missing');
  }

  try {
    console.log('[db] Connecting to MongoDB...');

    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log(
      `[db] MongoDB connected: ${conn.connection.host}/${conn.connection.name}`
    );

    console.log(
      `[db] MongoDB readyState: ${mongoose.connection.readyState}`
    );

    mongoose.connection.on('disconnected', () => {
      console.error('[db] ❌ MongoDB DISCONNECTED');
    });

    mongoose.connection.on('error', (err) => {
      console.error('[db] ❌ MongoDB ERROR:', err.message);
    });

    mongoose.connection.on('connected', () => {
      console.log('[db] ✅ MongoDB CONNECTED');
    });

    return conn;
  } catch (err) {
    console.error('[db] ❌ MongoDB connection failed:', err.message);
    throw err;
  }
};

module.exports = connectDB;