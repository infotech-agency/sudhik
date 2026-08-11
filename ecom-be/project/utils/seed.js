/**
 * One-off seed script: creates an admin account, a category, and a couple of
 * sample products so the API can be tried out immediately.
 *
 * Usage: node utils/seed.js
 */
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const User = require('../models/User');
const Product = require('../models/Product');
const Category = require('../models/Category');

const run = async () => {
  await connectDB();

  // Admin
  let admin = await User.findOne({ role: 'admin' });
  if (!admin) {
    admin = await User.create({
      name: 'Store Admin',
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin',
    });
    console.log('[seed] Admin created -> admin@example.com / admin123');
  } else {
    console.log('[seed] Admin already exists:', admin.email);
  }

  // Category
  const cat = await Category.findOneAndUpdate(
    { name: 'Skincare' },
    { name: 'Skincare', slug: 'skincare', description: 'Skincare products' },
    { upsert: true, new: true }
  );

  // Products
  const samples = [
    {
      title: 'Vitamin C Serum',
      description: 'Brightening vitamin C serum for daily use.',
      price: 499,
      stock: 50,
      benefits: 'Brightens skin, reduces dark spots.',
      ingredients: 'Vitamin C, Hyaluronic Acid, Glycerin.',
      howToUse: 'Apply 2-3 drops to clean skin before moisturizer.',
      specifications: '30ml bottle',
      shippingInfo: 'Ships in 1-2 business days.',
      productInformation: 'For external use only.',
    },
    {
      title: 'Hydrating Face Wash',
      description: 'Gentle daily cleanser for all skin types.',
      price: 249,
      stock: 100,
      benefits: 'Cleanses without stripping moisture.',
      ingredients: 'Aloe Vera, Glycerin, Coco-betaine.',
      howToUse: 'Massage onto wet face, rinse off.',
      specifications: '100ml tube',
      shippingInfo: 'Ships in 1-2 business days.',
      productInformation: 'For external use only.',
    },
  ];

  for (const s of samples) {
    const slug = s.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    await Product.findOneAndUpdate(
      { slug },
      { ...s, slug, category: cat._id, faqs: [{ question: 'Is it cruelty-free?', answer: 'Yes.' }] },
      { upsert: true, new: true }
    );
  }
  console.log('[seed] Sample products ensured.');

  await mongoose.connection.close();
  process.exit(0);
};

run().catch((err) => {
  console.error('[seed] failed:', err);
  process.exit(1);
});
