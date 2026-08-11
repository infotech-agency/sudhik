const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

/**
 * Multer storage that streams files directly to Cloudinary under the
 * "ecommerce/products" folder. Returns Cloudinary URLs in req.files.
 */
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: 'ecommerce/products',
    resource_type: 'image',
    public_id: `prod_${Date.now()}_${file.fieldname}`,
    transformation: [{ width: 1000, height: 1000, crop: 'limit' }],
  }),
});

/**
 * Accept up to `n` images. Throws a 400 if more are uploaded.
 * Usage: upload.array('images', 5)
 */
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB per file
  fileFilter: (_req, file, cb) => {
    const ok = /image\/(jpe?g|png|webp|gif)/.test(file.mimetype);
    cb(ok ? null : new Error('Only image files (jpg, png, webp, gif) are allowed'), ok);
  },
});

module.exports = upload;
