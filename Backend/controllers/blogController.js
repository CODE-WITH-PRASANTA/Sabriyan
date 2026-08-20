const Blog = require("../models/Blog");
const fs = require("fs");

// CREATE BLOG
exports.createBlog = async (req, res) => {
  try {
    const {
      title,
      category,
      tags,
      excerpt,
      content,
      status,
      featured,
      publishDate,
      metaTitle,
      metaDescription,
      metaKeywords,
    } = req.body;

    // Validation
    if (!title || !category || !excerpt || !content) {
      return res.status(400).json({
        success: false,
        message: "Title, category, excerpt and content are required",
      });
    }

    // Featured image
    const featuredImage = req.files?.featuredImage?.[0];

    if (!featuredImage) {
      return res.status(400).json({
        success: false,
        message: "Featured image is required",
      });
    }

    // Thumbnail image
    const thumbnailImage = req.files?.thumbnailImage?.[0];

    const blog = await Blog.create({
      title,
      category,
      tags: tags || "",
      featuredImage: featuredImage.url,

      thumbnailImage: thumbnailImage ? thumbnailImage.url : "",

      excerpt,
      content,

      status: status || "Draft",

      featured: featured === true || featured === "true",

      publishDate: publishDate || null,

      metaTitle: metaTitle || "",
      metaDescription: metaDescription || "",
      metaKeywords: metaKeywords || "",
    });

    return res.status(201).json({
      success: true,
      message: "Blog created successfully",
      blog,
    });
  } catch (error) {
    console.error("CREATE BLOG ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL BLOGS
exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: blogs.length,
      blogs,
    });
  } catch (error) {
    console.error("GET BLOGS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET SINGLE BLOG
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    return res.status(200).json({
      success: true,
      blog,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE BLOG
exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    const {
      title,
      category,
      tags,
      excerpt,
      content,
      status,
      featured,
      publishDate,
      metaTitle,
      metaDescription,
      metaKeywords,
    } = req.body;

    // New featured image
    const newFeaturedImage = req.files?.featuredImage?.[0];

    // New thumbnail
    const newThumbnailImage = req.files?.thumbnailImage?.[0];

    if (newFeaturedImage) {
      blog.featuredImage = newFeaturedImage.url;
    }

    if (newThumbnailImage) {
      blog.thumbnailImage = newThumbnailImage.url;
    }

    blog.title = title ?? blog.title;

    blog.category = category ?? blog.category;

    blog.tags = tags ?? blog.tags;

    blog.excerpt = excerpt ?? blog.excerpt;

    blog.content = content ?? blog.content;

    blog.status = status ?? blog.status;

    if (featured !== undefined) {
      blog.featured = featured === true || featured === "true";
    }

    blog.publishDate = publishDate ?? blog.publishDate;

    blog.metaTitle = metaTitle ?? blog.metaTitle;

    blog.metaDescription = metaDescription ?? blog.metaDescription;

    blog.metaKeywords = metaKeywords ?? blog.metaKeywords;

    await blog.save();

    return res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      blog,
    });
  } catch (error) {
    console.error("UPDATE BLOG ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE BLOG
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    await Blog.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    console.error("DELETE BLOG ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
