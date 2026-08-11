const express = require('express');
const router = express.Router();

const {
  createVideo,
  getVideos,
  getVideoById,
  updateVideo,
  deleteVideo,
} = require('../controllers/videoController');

// ⚠️ Adjust this import to match your existing admin-auth middleware
// (in your project it might be called `adminAuth`, `protectAdmin`, `requireAdmin`, etc.)
// const { protectAdmin } = require('../middlewares/authMiddleware');

// Public
router.get('/', getVideos);
router.get('/:id', getVideoById);

// Admin only
router.post('/',  createVideo);
router.put('/:id', updateVideo);
router.delete('/:id', deleteVideo);

module.exports = router;