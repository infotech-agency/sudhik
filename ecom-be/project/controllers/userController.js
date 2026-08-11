const Order = require("../models/Order");
const User = require("../models/User");
const { success, asyncHandler } = require('../utils/apiResponse');

/**
 * Get current user profile and order stats.
 */
const getMyProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    const err = new Error('User not found');
    err.status = 404;
    throw err;
  }

  const stats = await Order.aggregate([
    { $match: { user: user._id, paymentStatus: 'PAID' } },
    { $group: { _id: null, totalSpent: { $sum: '$totalAmount' }, totalOrders: { $sum: 1 } } },
  ]);

  const codCount = await Order.countDocuments({ user: user._id, paymentMethod: 'COD' });

  success(res, {
    user,
    totalSpent: stats[0]?.totalSpent || 0,
    totalOrdersPaid: stats[0]?.totalOrders || 0,
    codOrders: codCount,
  }, 'Profile fetched');
});

/**
 * Get all addresses for the authenticated user.
 */
const getAddresses = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    const err = new Error('User not found');
    err.status = 404;
    throw err;
  }
  success(res, user.addresses || [], 'Addresses fetched successfully');
});

/**
 * Add a new address.
 */
const addAddress = asyncHandler(async (req, res) => {
  const { name, phone, address, city, state, pincode, country, isDefault } = req.body;
  const user = await User.findById(req.user.id);
  if (!user) {
    const err = new Error('User not found');
    err.status = 404;
    throw err;
  }

  // Prevent duplicate addresses
  const isDuplicate = user.addresses.some(
    (addr) =>
      addr.name.toLowerCase() === name.trim().toLowerCase() &&
      addr.phone.trim() === phone.trim() &&
      addr.address.toLowerCase() === address.trim().toLowerCase() &&
      addr.city.toLowerCase() === city.trim().toLowerCase() &&
      addr.state.toLowerCase() === state.trim().toLowerCase() &&
      addr.pincode.trim() === pincode.trim()
  );

  if (isDuplicate) {
    const err = new Error('This address already exists in your profile.');
    err.status = 400;
    throw err;
  }

  const shouldBeDefault = user.addresses.length === 0 || isDefault === true;

  if (shouldBeDefault) {
    // Set all other addresses to not default
    user.addresses.forEach((addr) => {
      addr.isDefault = false;
    });
  }

  const newAddress = {
    name: name.trim(),
    phone: phone.trim(),
    address: address.trim(),
    city: city.trim(),
    state: state.trim(),
    pincode: pincode.trim(),
    country: country ? country.trim() : 'India',
    isDefault: shouldBeDefault,
  };

  user.addresses.push(newAddress);
  await user.save();

  // Return the newly created address (last item in the array)
  const createdAddress = user.addresses[user.addresses.length - 1];
  success(res, createdAddress, 'Address added successfully', 201);
});

/**
 * Update an existing address.
 */
const updateAddress = asyncHandler(async (req, res) => {
  const { name, phone, address, city, state, pincode, country, isDefault } = req.body;
  const user = await User.findById(req.user.id);
  if (!user) {
    const err = new Error('User not found');
    err.status = 404;
    throw err;
  }

  const addressId = req.params.id;
  const addrDoc = user.addresses.id(addressId);
  if (!addrDoc) {
    const err = new Error('Address not found');
    err.status = 404;
    throw err;
  }

  // Check for duplicates (excluding the current address being updated)
  const isDuplicate = user.addresses.some(
    (addr) =>
      addr._id.toString() !== addressId &&
      addr.name.toLowerCase() === (name || addr.name).trim().toLowerCase() &&
      addr.phone.trim() === (phone || addr.phone).trim() &&
      addr.address.toLowerCase() === (address || addr.address).trim().toLowerCase() &&
      addr.city.toLowerCase() === (city || addr.city).trim().toLowerCase() &&
      addr.state.toLowerCase() === (state || addr.state).trim().toLowerCase() &&
      addr.pincode.trim() === (pincode || addr.pincode).trim()
  );

  if (isDuplicate) {
    const err = new Error('Another address with these details already exists.');
    err.status = 400;
    throw err;
  }

  const shouldBeDefault = isDefault === true || user.addresses.length === 1;

  if (shouldBeDefault) {
    user.addresses.forEach((addr) => {
      addr.isDefault = false;
    });
  }

  addrDoc.name = name !== undefined ? name.trim() : addrDoc.name;
  addrDoc.phone = phone !== undefined ? phone.trim() : addrDoc.phone;
  addrDoc.address = address !== undefined ? address.trim() : addrDoc.address;
  addrDoc.city = city !== undefined ? city.trim() : addrDoc.city;
  addrDoc.state = state !== undefined ? state.trim() : addrDoc.state;
  addrDoc.pincode = pincode !== undefined ? pincode.trim() : addrDoc.pincode;
  addrDoc.country = country !== undefined ? country.trim() : addrDoc.country;
  addrDoc.isDefault = shouldBeDefault;

  await user.save();
  success(res, addrDoc, 'Address updated successfully');
});

/**
 * Delete an address.
 */
const deleteAddress = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    const err = new Error('User not found');
    err.status = 404;
    throw err;
  }

  const addressId = req.params.id;
  const addrDoc = user.addresses.id(addressId);
  if (!addrDoc) {
    const err = new Error('Address not found');
    err.status = 404;
    throw err;
  }

  const wasDefault = addrDoc.isDefault;

  // Remove the address
  user.addresses.pull(addressId);

  // If the deleted address was the default, set another address as default
  if (wasDefault && user.addresses.length > 0) {
    user.addresses[0].isDefault = true;
  }

  await user.save();
  success(res, {}, 'Address deleted successfully');
});

/**
 * Set an address as default.
 */
const setDefaultAddress = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    const err = new Error('User not found');
    err.status = 404;
    throw err;
  }

  const addressId = req.params.id;
  const addrDoc = user.addresses.id(addressId);
  if (!addrDoc) {
    const err = new Error('Address not found');
    err.status = 404;
    throw err;
  }

  user.addresses.forEach((addr) => {
    addr.isDefault = addr._id.toString() === addressId;
  });

  await user.save();
  success(res, user.addresses, 'Default address set successfully');
});

module.exports = {
  getMyProfile,
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
};