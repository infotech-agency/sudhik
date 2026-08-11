const Blog = require('../models/Blog');
const cloudinary = require('../config/cloudinary'); // ⚠️ adjust path to match your existing cloudinary config
const streamifier = require('streamifier'); // npm install streamifier

// ---- helpers ----

const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

const generateUniqueSlug = async (title, excludeId = null) => {
  let base = slugify(title);
  let slug = base;
  let counter = 1;

  while (true) {
    const query = { slug };
    if (excludeId) query._id = { $ne: excludeId };
    const existing = await Blog.findOne(query);
    if (!existing) return slug;
    slug = `${base}-${counter++}`;
  }
};

const uploadToCloudinary = (fileBuffer) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'blog', resource_type: 'image' },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(stream);
  });

// ---- controllers ----

// @desc    Create a blog post
// @route   POST /api/blogs
// @access  Admin
exports.createBlog = async (req, res) => {
  try {
    const {
      title,
      excerpt,
      content,
      author,
      tags,
      category,
      status,
      metaTitle,
      metaDescription,
    } = req.body;

    if (!title || !content) {
      return res.status(400).json({ success: false, message: 'Title and content are required' });
    }

    const slug = await generateUniqueSlug(title);

    let featuredImage = { url: null, publicId: null };
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      featuredImage = { url: result.secure_url, publicId: result.public_id };
    }

    const blog = await Blog.create({
      title,
      slug,
      excerpt,
      content,
      author,
      tags: tags ? JSON.parse(tags) : [],
      category,
      status: status || 'draft',
      metaTitle,
      metaDescription,
      featuredImage,
    });

    res.status(201).json({ success: true, message: 'Blog created', data: blog });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Get all blogs (public - published only, admin - all with filters)
// @route   GET /api/blogs?search=&tag=&category=&status=&page=&limit=
// @access  Public / Admin (admin route returns drafts too)
exports.getBlogs = async (req, res) => {
  try {
    const { search, tag, category, status, page = 1, limit = 10 } = req.query;
    const filter = {};

    // Public listing only shows published posts unless explicitly an admin call
    if (req.isAdminRequest) {
      if (status) filter.status = status;
    } else {
      filter.status = 'published';
    }

    if (search) filter.title = { $regex: search, $options: 'i' };
    if (tag) filter.tags = tag;
    if (category) filter.category = category;

    const skip = (Number(page) - 1) * Number(limit);

    const [blogs, total] = await Promise.all([
      Blog.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
      Blog.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: blogs,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)) || 1,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Get single blog by slug (increments view count) — public
// @route   GET /api/blogs/:slug
// @access  Public
exports.getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOneAndUpdate(
      { slug: req.params.slug },
      { $inc: { views: 1 } },
      { new: true }
    );
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }
    res.json({ success: true, data: blog });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Get single blog by id — admin (for editing, no view-count increment)
// @route   GET /api/blogs/admin/:id
// @access  Admin
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }
    res.json({ success: true, data: blog });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Update a blog post
// @route   PUT /api/blogs/:id
// @access  Admin
exports.updateBlog = async (req, res) => {
  try {
    const {
      title,
      excerpt,
      content,
      author,
      tags,
      category,
      status,
      metaTitle,
      metaDescription,
    } = req.body;

    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    if (title && title !== blog.title) {
      blog.slug = await generateUniqueSlug(title, blog._id);
      blog.title = title;
    }

    if (excerpt !== undefined) blog.excerpt = excerpt;
    if (content !== undefined) blog.content = content;
    if (author !== undefined) blog.author = author;
    if (tags !== undefined) blog.tags = JSON.parse(tags);
    if (category !== undefined) blog.category = category;
    if (status !== undefined) blog.status = status;
    if (metaTitle !== undefined) blog.metaTitle = metaTitle;
    if (metaDescription !== undefined) blog.metaDescription = metaDescription;

    // Replace featured image if a new file is uploaded
    if (req.file) {
      if (blog.featuredImage?.publicId) {
        await cloudinary.uploader.destroy(blog.featuredImage.publicId).catch(() => {});
      }
      const result = await uploadToCloudinary(req.file.buffer);
      blog.featuredImage = { url: result.secure_url, publicId: result.public_id };
    }

    await blog.save();

    res.json({ success: true, message: 'Blog updated', data: blog });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Delete a blog post (also removes image from Cloudinary)
// @route   DELETE /api/blogs/:id
// @access  Admin
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    if (blog.featuredImage?.publicId) {
      await cloudinary.uploader.destroy(blog.featuredImage.publicId).catch(() => {});
    }

    await blog.deleteOne();

    res.json({ success: true, message: 'Blog deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};