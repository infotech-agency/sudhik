const cloudinary = require('cloudinary').v2;

/**
 * Configure the Cloudinary SDK from env vars.
 * Used by services/cloudinaryService and the multer storage engine.
 */
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = cloudinary;
