require('dotenv').config();
const connectDB = require('../config/db');
const { recoverOldOnlineOrders } = require('../controllers/orderController');

(async () => {
  await connectDB();
  await recoverOldOnlineOrders(30); // last 30 din
  process.exit(0);
})();