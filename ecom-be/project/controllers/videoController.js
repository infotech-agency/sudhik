const Video = require('../models/Video');
const parseVideoUrl = require('../utils/videoUrlParser');

// @desc    Add a video (YouTube or Instagram Reel)
// @route   POST /api/videos
// @access  Admin
exports.createVideo = async (req, res) => {
  try {
    const { title, url } = req.body;

    if (!url) {
      return res.status(400).json({ success: false, message: 'Video URL is required' });
    }

    const parsed = parseVideoUrl(url);
    if (!parsed) {
      return res.status(400).json({
        success: false,
        message: 'Invalid URL. Only YouTube and Instagram links are supported.',
      });
    }

    const video = await Video.create({
      title,
      url,
      platform: parsed.platform,
      embedId: parsed.embedId,
    });

    res.status(201).json({ success: true, message: 'Video added', data: video });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Get all videos (optionally filter by platform)
// @route   GET /api/videos?platform=youtube|instagram
// @access  Public
exports.getVideos = async (req, res) => {
  try {
    const filter = { isActive: true };
    if (req.query.platform) filter.platform = req.query.platform;

    const videos = await Video.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, count: videos.length, data: videos });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Get a single video by id
// @route   GET /api/videos/:id
// @access  Public
exports.getVideoById = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ success: false, message: 'Video not found' });
    }
    res.json({ success: true, data: video });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Update a video
// @route   PUT /api/videos/:id
// @access  Admin
exports.updateVideo = async (req, res) => {
  try {
    const { title, url, isActive } = req.body;
    const updateData = {};

    if (title !== undefined) updateData.title = title;
    if (isActive !== undefined) updateData.isActive = isActive;

    if (url) {
      const parsed = parseVideoUrl(url);
      if (!parsed) {
        return res.status(400).json({
          success: false,
          message: 'Invalid URL. Only YouTube and Instagram links are supported.',
        });
      }
      updateData.url = url;
      updateData.platform = parsed.platform;
      updateData.embedId = parsed.embedId;
    }

    const video = await Video.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!video) {
      return res.status(404).json({ success: false, message: 'Video not found' });
    }

    res.json({ success: true, message: 'Video updated', data: video });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Delete a video
// @route   DELETE /api/videos/:id
// @access  Admin
exports.deleteVideo = async (req, res) => {
  try {
    const video = await Video.findByIdAndDelete(req.params.id);
    if (!video) {
      return res.status(404).json({ success: false, message: 'Video not found' });
    }
    res.json({ success: true, message: 'Video deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};