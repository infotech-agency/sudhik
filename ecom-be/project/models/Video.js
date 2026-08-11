const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    url: {
      type: String,
      required: [true, 'Video URL is required'],
      trim: true,
    },
    platform: {
      type: String,
      enum: ['youtube', 'instagram'],
      required: true,
    },
    embedId: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Video', videoSchema);