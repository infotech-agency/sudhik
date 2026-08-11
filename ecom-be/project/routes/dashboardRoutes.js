const express = require('express');
const dashboardController = require('../controllers/dashboardController');
const { protect, admin } = require('../middlewares/auth');

const router = express.Router();

router.use(protect, admin);

router.get('/summary', dashboardController.summary);
router.get('/monthly-sales', dashboardController.monthlySales);
router.get('/user-spend', dashboardController.userSpend);
router.get('/users', dashboardController.listUsers);
router.get('/low-stock', dashboardController.lowStock);

module.exports = router;
