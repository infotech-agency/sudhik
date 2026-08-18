const Product = require('../models/Product');
const Category = require('../models/Category');
const { success, asyncHandler } = require('../utils/apiResponse');
const { deleteImages } = require('../services/cloudinaryService');
const mongoose = require('mongoose');
const slugify = (s) =>
  s
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

// ---- Categories ----

const createCategory = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const category = await Category.create({ name, slug: slugify(name), description });
  success(res, category, 'Category created', 201);
});

const listCategories = asyncHandler(async (_req, res) => {
  const categories = await Category.find().sort({ name: 1 });
  success(res, categories, 'Categories fetched');
});

const deleteCategory = asyncHandler(async (req, res) => {
  const cat = await Category.findByIdAndDelete(req.params.id);
  if (!cat) {
    const err = new Error('Category not found');
    err.status = 404;
    throw err;
  }
  // Unset category on linked products.
  await Product.updateMany({ category: cat._id }, { $unset: { category: '' } });
  success(res, null, 'Category deleted');
});

// ---- Products ----

/**
 * List products with optional filters: ?category=&search=&minPrice=&maxPrice=&page=&limit=
 */
const listProducts = asyncHandler(async (req, res) => {
  const { category, search, minPrice, maxPrice } = req.query;
  const page = Math.max(1, parseInt(req.query.page, 10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(req.query.limit, 10) || 20));

  const filter = { isActive: true };
  if (category) filter.category = category;
  if (search) filter.$text = { $search: search };
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  const skip = (page - 1) * limit;
  const [items, total] = await Promise.all([
    Product.find(filter).populate('category', 'name slug').sort({ createdAt: -1 }).skip(skip).limit(limit),
    Product.countDocuments(filter),
  ]);

  success(res, items, 'Products fetched', 200, {
    pagination: { page, limit, total, pages: Math.ceil(total / limit) },
  });
});

/**
 * Admin list (includes inactive products).
 */
const listProductsAdmin = asyncHandler(async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page, 10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(req.query.limit, 10) || 20));
  const skip = (page - 1) * limit;
  const filter = {};
  if (req.query.category) filter.category = req.query.category;
  if (req.query.search) filter.$text = { $search: req.query.search };

  const [items, total] = await Promise.all([
    Product.find(filter).populate('category', 'name slug').sort({ createdAt: -1 }).skip(skip).limit(limit),
    Product.countDocuments(filter),
  ]);
  success(res, items, 'Products fetched', 200, {
    pagination: { page, limit, total, pages: Math.ceil(total / limit) },
  });
});

// const getProduct = asyncHandler(async (req, res) => {
//   const product = await Product.findOne({
//     $or: [{ _id: req.params.id }, { slug: req.params.id }],
//   }).populate('category', 'name slug');
//   if (!product) {
//     const err = new Error('Product not found');
//     err.status = 404;
//     throw err;
//   }
//   success(res, product, 'Product fetched');
// });



const getProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const isValidId = mongoose.Types.ObjectId.isValid(id);

  const product = await Product.findOne({
    $or: [
      ...(isValidId ? [{ _id: id }] : []),
      { slug: id },
    ],
  }).populate('category', 'name slug');

  if (!product) {
    const err = new Error('Product not found');
    err.status = 404;
    throw err;
  }
  success(res, product, 'Product fetched');
});

// const createProduct = asyncHandler(async (req, res) => {
//   const {
//     title, description, price, discountPrice, stock, sku,
//     category, benefits, ingredients, howToUse, specifications,
//     shippingInfo, productInformation, faqs, variants, isActive,
//   } = req.body;

//   const images = (req.files || []).map((f) => f.path);
//   if (images.length > 5) {
//     await deleteImages(images);
//     const err = new Error('Maximum 5 images per product');
//     err.status = 400;
//     throw err;
//   }

//   const product = await Product.create({
//     title,
//     slug: slugify(`${title}-${Date.now().toString(36)}`),
//     description, price, discountPrice, stock, sku,
//     category: category || undefined,
//     images,
//     benefits, ingredients, howToUse, specifications,
//     shippingInfo, productInformation,
//     faqs: Array.isArray(faqs) ? faqs : faqs ? JSON.parse(faqs) : [],
//     variants: Array.isArray(variants) ? variants : variants ? JSON.parse(variants) : [], // 👈
//     isActive: isActive !== undefined ? isActive === 'true' || isActive === true : true,
//   });

//   success(res, product, 'Product created', 201);
// });


const createProduct = asyncHandler(async (req, res) => {
  const {
    title, slug, description, price, discountPrice, stock, sku,
    category, benefits, ingredients, howToUse, specifications,
    shippingInfo, productInformation, faqs, variants, isActive,
  } = req.body;

  const images = (req.files || []).map((f) => f.path);
  if (images.length > 5) {
    await deleteImages(images);
    const err = new Error('Maximum 5 images per product');
    err.status = 400;
    throw err;
  }

  const product = await Product.create({
    title,
    slug: slug
      ? slugify(slug)
      : slugify(`${title}-${Date.now().toString(36)}`),
    description, price, discountPrice, stock, sku,
    category: category || undefined,
    images,
    benefits, ingredients, howToUse, specifications,
    shippingInfo, productInformation,
    faqs: Array.isArray(faqs) ? faqs : faqs ? JSON.parse(faqs) : [],
    variants: Array.isArray(variants) ? variants : variants ? JSON.parse(variants) : [],
    isActive: isActive !== undefined ? isActive === 'true' || isActive === true : true,
  });

  success(res, product, 'Product created', 201);
});

// const updateProduct = asyncHandler(async (req, res) => {
//   const product = await Product.findById(req.params.id);
//   if (!product) {
//     const err = new Error('Product not found');
//     err.status = 404;
//     throw err;
//   }

//   // Merge scalar fields.
//   const fields = [
//     'title', 'description', 'price', 'discountPrice', 'stock', 'sku',
//     'category', 'benefits', 'ingredients', 'howToUse', 'specifications',
//     'shippingInfo', 'productInformation', 'isActive',
//   ];
//   fields.forEach((f) => {
//     if (req.body[f] !== undefined) {
//       if (f === 'isActive') {
//         product.isActive = req.body[f] === 'true' || req.body[f] === true;
//       } else if (f === 'category' && (req.body[f] === '' || req.body[f] === null)) {
//         product.category = undefined;
//       } else {
//         product[f] = req.body[f];
//       }
//     }
//   });

//   if (req.body.faqs !== undefined) {
//     product.faqs = Array.isArray(req.body.faqs) ? req.body.faqs : JSON.parse(req.body.faqs);
//   }
//   if (req.body.variants !== undefined) {  // 👈 add karo
//   product.variants = Array.isArray(req.body.variants)
//     ? req.body.variants
//     : JSON.parse(req.body.variants);
// }
//   // Handle image replacement: if new files uploaded, replace all images
//   // (delete the old Cloudinary assets first).
//   if (req.files && req.files.length > 0) {
//     const newImages = req.files.map((f) => f.path);
//     if (product.images && product.images.length) {
//       await deleteImages(product.images);
//     }
//     product.images = newImages;
//   }

//   // Enforce max 5 images.
//   if (product.images.length > 5) {
//     const err = new Error('Maximum 5 images per product');
//     err.status = 400;
//     throw err;
//   }

//   if (req.body.title) product.slug = slugify(`${req.body.title}-${Date.now().toString(36)}`);

//   await product.save();
//   success(res, product, 'Product updated');
// });

const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    const err = new Error('Product not found');
    err.status = 404;
    throw err;
  }

  const fields = [
    'title', 'description', 'price', 'discountPrice', 'stock', 'sku',
    'category', 'benefits', 'ingredients', 'howToUse', 'specifications',
    'shippingInfo', 'productInformation', 'isActive',
  ];
  fields.forEach((f) => {
    if (req.body[f] !== undefined) {
      if (f === 'isActive') {
        product.isActive = req.body[f] === 'true' || req.body[f] === true;
      } else if (f === 'category' && (req.body[f] === '' || req.body[f] === null)) {
        product.category = undefined;
      } else {
        product[f] = req.body[f];
      }
    }
  });

  if (req.body.faqs !== undefined) {
    product.faqs = Array.isArray(req.body.faqs) ? req.body.faqs : JSON.parse(req.body.faqs);
  }
  if (req.body.variants !== undefined) {
    product.variants = Array.isArray(req.body.variants)
      ? req.body.variants
      : JSON.parse(req.body.variants);
  }

  // 👇 SLUG FIX: title change se slug apne aap update NAHI hoga.
  // Sirf tab update hoga jab user khud naya slug bhejega.
  if (req.body.slug !== undefined && req.body.slug.trim() !== '') {
    product.slug = slugify(req.body.slug);
  }

  // 👇 IMAGES FIX: ab "replace all" ki jagah partial update hota hai.
  // Frontend `existingImages` (jo images rakhni hain unke URLs) bhejega,
  // baaki purani images (jo list me nahi hain) delete ho jayengi,
  // aur naye uploaded files unme add ho jayenge.
  const newFiles = req.files || [];
  const newImages = newFiles.map((f) => f.path);

  let keepImages = product.images || [];
  if (req.body.existingImages !== undefined) {
    let keep;
    try {
      keep = Array.isArray(req.body.existingImages)
        ? req.body.existingImages
        : JSON.parse(req.body.existingImages);
    } catch {
      keep = req.body.existingImages ? [req.body.existingImages] : [];
    }
    const toDelete = (product.images || []).filter((img) => !keep.includes(img));
    if (toDelete.length) {
      await deleteImages(toDelete);
    }
    keepImages = keep;
  }

  const finalImages = [...keepImages, ...newImages];
  if (finalImages.length > 5) {
    if (newImages.length) await deleteImages(newImages);
    const err = new Error('Maximum 5 images per product');
    err.status = 400;
    throw err;
  }
  product.images = finalImages;

  await product.save();
  success(res, product, 'Product updated');
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    const err = new Error('Product not found');
    err.status = 404;
    throw err;
  }
  if (product.images && product.images.length) {
    await deleteImages(product.images);
  }
  await product.deleteOne();
  success(res, null, 'Product deleted');
});

module.exports = {
  // categories
  createCategory, listCategories, deleteCategory,
  // products
  listProducts, listProductsAdmin, getProduct, createProduct, updateProduct, deleteProduct,
};
