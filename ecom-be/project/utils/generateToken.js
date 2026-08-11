const jwt = require('jsonwebtoken');

/**
 * Sign a JWT for a user.
 * @param {import('mongoose').Types.ObjectId} userId
 * @param {'user'|'admin'} role
 * @returns {string} JWT token
 */
function generateToken(userId, role = 'user') {
  return jwt.sign({ id: userId.toString(), role }, process.env.JWT_SECRET || 'dev_secret_change_me', {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
}

module.exports = { generateToken };
