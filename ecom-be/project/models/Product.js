const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema(
  {
    question: { type: String, required: true, trim: true },
    answer: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, index: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, default: '' },
    price: { type: Number, required: true, min: 0 },
    discountPrice: { type: Number, default: 0, min: 0 },
    stock: { type: Number, required: true, min: 0, default: 0 },
    sku: { type: String, default: null, trim: true, sparse: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      default: null,
    },
    images: {
      // Up to 5 Cloudinary URLs per product.
      type: [String],
      validate: [(arr) => arr.length <= 5, 'Max 5 images per product'],
      default: [],
    },
    // Detailed sections stored on the product itself.
    benefits: { type: String, default: '' },
    ingredients: { type: String, default: '' },
    howToUse: { type: String, default: '' },
    specifications: { type: String, default: '' },
    shippingInfo: { type: String, default: '' },
    productInformation: { type: String, default: '' },
    faqs: { type: [faqSchema], default: [] },
    // Denormalized review summary, updated by reviewService.
    averageRating: { type: Number, default: 0, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0, min: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Simple text index for basic search.
productSchema.index({ title: 'text', description: 'text' });

module.exports = mongoose.model('Product', productSchema);
