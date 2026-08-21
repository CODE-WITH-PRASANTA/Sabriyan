import React, { useState, useEffect } from "react";
import API, { IMG_URL } from "../../api/axios";
import {
  FaCloudUploadAlt,
  FaTimes,
  FaCheckCircle,
  FaArrowLeft,
  FaTags,
  FaBookOpen,
} from "react-icons/fa";
import "./BlogPost.css";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop";

const BlogPost = ({ editData, onBack }) => {
  // =========================================================
  // FORM STATE
  // =========================================================
  const [formData, setFormData] = useState({
    title: "",
    category: "Nature",
    excerpt: "",
    content: "",
    author: "Admin User",
    readTime: "4 min read",
    status: "Draft",
    featured: false,
    tags: "",
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
    publishDate: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // =========================================================
  // POPULATE FOR EDIT MODE
  // =========================================================
  useEffect(() => {
    if (editData) {
      setFormData({
        title: editData.title || "",
        category: editData.category || "Nature",
        excerpt: editData.excerpt || editData.description || "",
        content: editData.content || "",
        author: editData.author || "Admin User",
        readTime: editData.readTime || "4 min read",
        status: editData.status || "Draft",
        featured: Boolean(editData.featured),
        tags: Array.isArray(editData.tags)
          ? editData.tags.join(", ")
          : editData.tags || "",
        metaTitle: editData.metaTitle || "",
        metaDescription: editData.metaDescription || "",
        metaKeywords: editData.metaKeywords || "",
        publishDate: editData.publishDate
          ? new Date(editData.publishDate).toISOString().split("T")[0]
          : "",
      });

      const rawImg =
        editData.featuredImage || editData.image || editData.thumbnailImage;
      if (rawImg) {
        if (
          rawImg.startsWith("http://") ||
          rawImg.startsWith("https://") ||
          rawImg.startsWith("data:")
        ) {
          setImagePreview(rawImg);
        } else {
          const baseUrl = IMG_URL || "http://localhost:5000";
          const cleanPath = rawImg.startsWith("/") ? rawImg : `/${rawImg}`;
          setImagePreview(`${baseUrl}${cleanPath}`);
        }
      }
    }
  }, [editData]);

  // =========================================================
  // INPUT HANDLERS
  // =========================================================
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  // =========================================================
  // SUBMIT FORM
  // =========================================================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      if (imageFile) {
        data.append("featuredImage", imageFile);
      }

      let response;
      if (editData && (editData._id || editData.id)) {
        const blogId = editData._id || editData.id;
        response = await API.put(`/blog/${blogId}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        response = await API.post("/blog", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      if (response.data?.success) {
        setMessage({
          type: "success",
          text: editData
            ? "Blog post updated successfully!"
            : "Blog post created successfully!",
        });

        if (!editData) {
          setFormData({
            title: "",
            category: "Nature",
            excerpt: "",
            content: "",
            author: "Admin User",
            readTime: "4 min read",
            status: "Draft",
            featured: false,
            tags: "",
            metaTitle: "",
            metaDescription: "",
            metaKeywords: "",
            publishDate: "",
          });
          setImageFile(null);
          setImagePreview(null);
        }
      } else {
        throw new Error(response.data?.message || "Operation failed.");
      }
    } catch (error) {
      console.error("BLOG SAVE ERROR:", error);
      setMessage({
        type: "error",
        text:
          error.response?.data?.message ||
          error.message ||
          "Failed to save blog post.",
      });
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // RENDER
  // =========================================================
  return (
    <div className="BlogPost dark-forest-theme">
      {/* HEADER */}
      <div className="BlogPost-header">
        <div className="header-left">
          {onBack && (
            <button type="button" className="back-btn" onClick={onBack}>
              <FaArrowLeft /> Back
            </button>
          )}
          <h2>{editData ? "Edit Blog Post" : "Create New Blog Post"}</h2>
        </div>
      </div>

      {/* ALERT MESSAGE */}
      {message.text && (
        <div className={`alert-box ${message.type}`}>
          {message.type === "success" && <FaCheckCircle />}
          <span>{message.text}</span>
        </div>
      )}

      {/* FORM */}
      <form onSubmit={handleSubmit} className="BlogPost-form">
        <div className="form-grid">
          {/* MAIN CONTENT SECTION */}
          <div className="form-main">
            {/* TITLE */}
            <div className="form-group">
              <label htmlFor="title">Blog Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter blog title..."
                required
              />
            </div>

            {/* EXCERPT / DESCRIPTION */}
            <div className="form-group">
              <label htmlFor="excerpt">Short Description / Excerpt *</label>
              <textarea
                id="excerpt"
                name="excerpt"
                rows="3"
                value={formData.excerpt}
                onChange={handleChange}
                placeholder="Brief summary of the blog post..."
                required
              />
            </div>

            {/* FULL CONTENT */}
            <div className="form-group">
              <label htmlFor="content">Blog Content *</label>
              <textarea
                id="content"
                name="content"
                rows="10"
                value={formData.content}
                onChange={handleChange}
                placeholder="Write your blog post content here (HTML supported)..."
                required
              />
            </div>

            {/* SEO SETTINGS */}
            <div className="seo-section">
              <h3>
                <FaBookOpen /> SEO Metadata
              </h3>
              <div className="form-group">
                <label htmlFor="metaTitle">Meta Title</label>
                <input
                  type="text"
                  id="metaTitle"
                  name="metaTitle"
                  value={formData.metaTitle}
                  onChange={handleChange}
                  placeholder="SEO Title..."
                />
              </div>

              <div className="form-group">
                <label htmlFor="metaDescription">Meta Description</label>
                <textarea
                  id="metaDescription"
                  name="metaDescription"
                  rows="2"
                  value={formData.metaDescription}
                  onChange={handleChange}
                  placeholder="SEO Description..."
                />
              </div>

              <div className="form-group">
                <label htmlFor="metaKeywords">Meta Keywords</label>
                <input
                  type="text"
                  id="metaKeywords"
                  name="metaKeywords"
                  value={formData.metaKeywords}
                  onChange={handleChange}
                  placeholder="nature, honey, health..."
                />
              </div>
            </div>
          </div>

          {/* SIDEBAR SETTINGS */}
          <div className="form-sidebar">
            {/* IMAGE UPLOAD */}
            <div className="sidebar-card">
              <label className="card-label">Featured Image</label>
              <div className="image-upload-wrapper">
                {imagePreview ? (
                  <div className="image-preview-box">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = FALLBACK_IMAGE;
                      }}
                    />
                    <button
                      type="button"
                      className="remove-img-btn"
                      onClick={handleRemoveImage}
                    >
                      <FaTimes />
                    </button>
                  </div>
                ) : (
                  <label className="upload-dropzone">
                    <FaCloudUploadAlt className="upload-icon" />
                    <span>Click to upload image</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      hidden
                    />
                  </label>
                )}
              </div>
            </div>

            {/* CATEGORY & STATUS */}
            <div className="sidebar-card">
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="Nature">Nature</option>
                  <option value="Honey">Honey</option>
                  <option value="Health">Health</option>
                  <option value="Chocolate">Chocolate</option>
                  <option value="Recipes">Recipes</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="status">Status</label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="Draft">Draft</option>
                  <option value="Published">Published</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="publishDate">Publish Date</label>
                <input
                  type="date"
                  id="publishDate"
                  name="publishDate"
                  value={formData.publishDate}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="readTime">Read Time</label>
                <input
                  type="text"
                  id="readTime"
                  name="readTime"
                  value={formData.readTime}
                  onChange={handleChange}
                  placeholder="e.g. 4 min read"
                />
              </div>

              <div className="form-group">
                <label htmlFor="tags">
                  <FaTags /> Tags (comma separated)
                </label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="organic, pure, healthy"
                />
              </div>

              {/* FEATURED CHECKBOX */}
              <div className="form-group-checkbox">
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleChange}
                  />
                  <span>Mark as Featured Post</span>
                </label>
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              className="submit-btn"
              disabled={loading}
            >
              {loading
                ? "Saving..."
                : editData
                ? "Update Blog"
                : "Publish Blog"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BlogPost;