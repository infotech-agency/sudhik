const cloudinary = require('../config/cloudinary');

/**
 * Delete a Cloudinary image by its URL. Safe to call with null/undefined.
 * Extracts the public_id from the URL (assumes standard Cloudinary URL shape).
 *
 * @param {string|null|undefined} url
 */
async function deleteImage(url) {
  if (!url || typeof url !== 'string') return;
  try {
    // https://res.cloudinary.com/<cloud>/image/upload/v123/ecommerce/products/prod_x.jpg
    const match = url.match(/\/upload\/(?:v\d+\/)?(.+)\.([a-z]+)$/i);
    if (!match) return;
    const publicId = match[1];
    await cloudinary.uploader.destroy(publicId, { resource_type: 'image' });
  } catch (err) {
    // Non-fatal: log and continue. We don't want a failed image cleanup to
    // break a product update.
    console.warn('[cloudinary] deleteImage failed:', err.message);
  }
}

/**
 * Delete multiple images. Best-effort, never throws.
 * @param {string[]} urls
 */
async function deleteImages(urls = []) {
  await Promise.all((urls || []).map((u) => deleteImage(u)));
}

module.exports = { deleteImage, deleteImages };
