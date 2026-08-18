const Blog = require("../models/Blog");
const fs = require("fs");
const path = require("path");

// Physical file cleanup helper
const removePhysicalFile = (fileUrl) => {
  if (fileUrl && fileUrl.includes("/uploads/")) {
    const filename = fileUrl.split("/uploads/")[1];
    if (filename) {
      const fullPath = path.join(__dirname, "../uploads", filename);
      if (fs.existsSync(fullPath)) {
        try {
          fs.unlinkSync(fullPath);
        } catch (e) {
          console.error(`Failed to delete file: ${fullPath}`, e.message);
        }
      }
    }
  }
};

// Calculate read time
const calculateReadTime = (content = "", excerpt = "") => {
  const cleanText = (content + " " + excerpt).replace(/<[^>]*>?/gm, "");
  const words = cleanText.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes > 0 ? minutes : 1} min read`;
};

// GET all blogs
exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: blogs });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET single blog by ID
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog post not found." });
    }
    return res.status(200).json({ success: true, data: blog });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// CREATE blog post
exports.createBlog = async (req, res) => {
  try {
    const {
      title,
      category,
      tags,
      excerpt,
      content,
      author,
      status,
      featured,
      publishDate,
      metaTitle,
      metaDescription,
      metaKeywords
    } = req.body;

    // Distinct relative path storage for each image
    const featuredImage = req.files?.featuredImage?.[0]
      ? `/uploads/${req.files.featuredImage[0].filename}`
      : "";

    const thumbnailImage = req.files?.thumbnailImage?.[0]
      ? `/uploads/${req.files.thumbnailImage[0].filename}`
      : "";

    const finalExcerpt = excerpt?.trim() || "";

    const newBlog = new Blog({
      title: title?.trim(),
      category: category || "General",
      tags: tags || "",
      excerpt: finalExcerpt,
      content: content || finalExcerpt,
      author: author || "Admin User",
      readTime: calculateReadTime(content, finalExcerpt),
      status: status || "Published",
      featured: featured === "true" || featured === true,
      publishDate: publishDate || new Date().toISOString().split("T")[0],
      metaTitle: metaTitle || "",
      metaDescription: metaDescription || "",
      metaKeywords: metaKeywords || "",
      featuredImage,
      thumbnailImage
    });

    const savedBlog = await newBlog.save();
    return res.status(201).json({ success: true, data: savedBlog });
  } catch (error) {
    console.error("Error creating blog:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE blog post
exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog post not found." });
    }

    let featuredImage = blog.featuredImage;
    if (req.files?.featuredImage?.[0]) {
      removePhysicalFile(blog.featuredImage);
      featuredImage = `/uploads/${req.files.featuredImage[0].filename}`;
    }

    let thumbnailImage = blog.thumbnailImage;
    if (req.files?.thumbnailImage?.[0]) {
      removePhysicalFile(blog.thumbnailImage);
      thumbnailImage = `/uploads/${req.files.thumbnailImage[0].filename}`;
    }

    const {
      title,
      category,
      tags,
      excerpt,
      content,
      author,
      status,
      featured,
      publishDate,
      metaTitle,
      metaDescription,
      metaKeywords
    } = req.body;

    const finalExcerpt = excerpt !== undefined ? excerpt : blog.excerpt;
    const finalContent = content !== undefined ? content : blog.content;

    blog.title = title !== undefined ? title : blog.title;
    blog.category = category !== undefined ? category : blog.category;
    blog.tags = tags !== undefined ? tags : blog.tags;
    blog.excerpt = finalExcerpt;
    blog.content = finalContent;
    blog.author = author !== undefined ? author : blog.author;
    blog.readTime = calculateReadTime(finalContent, finalExcerpt);
    blog.status = status !== undefined ? status : blog.status;
    if (featured !== undefined) {
      blog.featured = featured === "true" || featured === true;
    }
    blog.publishDate = publishDate !== undefined ? publishDate : blog.publishDate;
    blog.metaTitle = metaTitle !== undefined ? metaTitle : blog.metaTitle;
    blog.metaDescription = metaDescription !== undefined ? metaDescription : blog.metaDescription;
    blog.metaKeywords = metaKeywords !== undefined ? metaKeywords : blog.metaKeywords;
    blog.featuredImage = featuredImage;
    blog.thumbnailImage = thumbnailImage;

    const updatedBlog = await blog.save();
    return res.status(200).json({ success: true, data: updatedBlog });
  } catch (error) {
    console.error("Error updating blog:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE blog post
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog post not found." });
    }

    removePhysicalFile(blog.featuredImage);
    removePhysicalFile(blog.thumbnailImage);

    await Blog.findByIdAndDelete(req.params.id);
    return res.status(200).json({ success: true, message: "Blog post deleted successfully." });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};