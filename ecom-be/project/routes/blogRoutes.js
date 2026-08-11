const express = require('express');
const multer = require('multer');
const router = express.Router();

const {
  createBlog,
  getBlogs,
  getBlogBySlug,
  getBlogById,
  updateBlog,
  deleteBlog,
} = require('../controllers/blogController');

// ⚠️ Adjust this import to match your existing admin-auth middleware name
// const { protectAdmin } = require('../middlewares/authMiddleware');

// Multer — memory storage, image goes straight to Cloudinary (no local disk write)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed'));
    }
    cb(null, true);
  },
});

// Public
router.get('/', getBlogs);
router.get('/slug/:slug', getBlogBySlug);

// Admin only
router.get('/admin/:id', getBlogById);
router.post('/', upload.single('featuredImage'), createBlog);
router.put('/:id', upload.single('featuredImage'), updateBlog);
router.delete('/:id', deleteBlog);

module.exports = router;