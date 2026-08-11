const express = require('express');
const userController = require('../controllers/userController');
const { protect } = require('../middlewares/auth');
const { rules, validate } = require('../utils/validators');

const router = express.Router();

// Profile Route
router.get('/profile', protect, userController.getMyProfile);

// Address CRUD Routes (Protected)
router.get('/addresses', protect, userController.getAddresses);
router.post('/addresses', protect, rules.address, validate, userController.addAddress);
router.put('/addresses/:id', protect, rules.address, validate, userController.updateAddress);
router.delete('/addresses/:id', protect, userController.deleteAddress);
router.patch('/addresses/:id/default', protect, userController.setDefaultAddress);

module.exports = router;
