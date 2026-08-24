import React, { useState, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import './BlogPost.css';
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

const MOCK_BLOGS = [
  {
    _id: '1',
    title: 'The Healing Power of Nature',
    excerpt: 'Explore how spending time in nature improves mental health and overall well-being.',
    category: 'Nature',
    publishDate: '2026-06-01',
    readTime: '5 min read',
    status: 'Published',
    featured: true,
    thumbnailImage: FALLBACK_IMAGE
  },
  {
    _id: '2',
    title: 'Benefits of Raw Honey',
    excerpt: 'Discover why raw honey is a powerful superfood loaded with antioxidants.',
    category: 'Honey',
    publishDate: '2026-06-05',
    readTime: '4 min read',
    status: 'Draft',
    featured: false,
    thumbnailImage: FALLBACK_IMAGE
  }
];

const BlogPost = () => {
  const initialFormState = {
    title: '',
    category: '',
    tags: '',
    featuredImage: null,
    featuredImagePreview: '',
    thumbnailImage: null,
    thumbnailPreview: '',
    excerpt: '',
    content: '',
    status: true,
    featured: true,
    publishDate: new Date().toISOString().split('T')[0],
    metaTitle: '',
    metaDescription: '',
    metaKeywords: ''
  };

  const [formData, setFormData] = useState(initialFormState);
  const [blogs] = useState(MOCK_BLOGS);
  const [editingId, setEditingId] = useState(null);
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

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const featuredInputRef = useRef(null);
  const thumbnailInputRef = useRef(null);
  const editorRef = useRef(null);

  const handleTitleChange = (e) => {
    const val = e.target.value;
    if (val.length <= 100) {
      setFormData((prev) => ({ ...prev, title: val }));
    }
  };

  const handleImageUpload = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      if (type === 'featured') {
        setFormData((prev) => ({
          ...prev,
          featuredImage: file,
          featuredImagePreview: previewUrl
        }));
      } else if (type === 'thumbnail') {
        setFormData((prev) => ({
          ...prev,
          thumbnailImage: file,
          thumbnailPreview: previewUrl
        }));
      }
    }
  };

  const handleReset = () => {
    setEditingId(null);
    setFormData(initialFormState);
    if (editorRef.current) {
      editorRef.current.setContent('<p>Write full blog content here...</p>');
    }
    if (featuredInputRef.current) featuredInputRef.current.value = '';
    if (thumbnailInputRef.current) thumbnailInputRef.current.value = '';
  };

  const handleEdit = (blog) => {
    setEditingId(blog._id);
    setFormData({
      title: blog.title || '',
      category: blog.category || '',
      tags: blog.tags || '',
      featuredImage: null,
      featuredImagePreview: blog.thumbnailImage || '',
      thumbnailImage: null,
      thumbnailPreview: blog.thumbnailImage || '',
      excerpt: blog.excerpt || '',
      content: blog.content || '<p>Write full blog content here...</p>',
      status: blog.status === 'Published',
      featured: Boolean(blog.featured),
      publishDate: blog.publishDate || new Date().toISOString().split('T')[0],
      metaTitle: blog.metaTitle || '',
      metaDescription: blog.metaDescription || '',
      metaKeywords: blog.metaKeywords || ''
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      (blog.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (blog.excerpt || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'All Categories' || blog.category === filterCategory;
    const matchesStatus = filterStatus === 'All Status' || blog.status === filterStatus;
    const matchesFeatured =
      filterFeatured === 'All' ||
      (filterFeatured === 'Yes' && blog.featured) ||
      (filterFeatured === 'No' && !blog.featured);

    return matchesSearch && matchesCategory && matchesStatus && matchesFeatured;
  });

  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBlogs = filteredBlogs.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
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
                  <input
                    type="file"
                    ref={featuredInputRef}
                    hidden
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'featured')}
                  />
                  {formData.featuredImagePreview ? (
                    <img
                      src={formData.featuredImagePreview}
                      alt="Featured Preview"
                      className="BlogPost-imgPreview"
                    />
                  ) : (
                    <>
                      <FaCloudUploadAlt className="BlogPost-uploadIcon" />
                      <span>Upload Featured</span>
                      <small>Max 5MB</small>
                    </>
                  )}
                </div>
              </div>

              <div className="BlogPost-field">
                <label>Thumbnail Image</label>
                <div
                  className="BlogPost-uploadBox"
                  onClick={() => thumbnailInputRef.current && thumbnailInputRef.current.click()}
                >
                  <input
                    type="file"
                    ref={thumbnailInputRef}
                    hidden
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'thumbnail')}
                  />
                  {formData.thumbnailPreview ? (
                    <img
                      src={formData.thumbnailPreview}
                      alt="Thumbnail Preview"
                      className="BlogPost-imgPreview"
                    />
                  ) : (
                    <>
                      <FaCloudUploadAlt className="BlogPost-uploadIcon" />
                      <span>Upload Thumbnail</span>
                      <small>Max 5MB</small>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="BlogPost-field">
              <div className="BlogPost-labelRow">
                <label>
                  Excerpt / Short Description <span className="BlogPost-required">*</span>
                </label>
                <span className="BlogPost-charCount">{formData.excerpt.length}/160</span>
              </div>
              <textarea
                rows="2"
                maxLength="160"
                placeholder="Write a short description..."
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              ></textarea>
            </div>

            <div className="BlogPost-field">
              <label>
                Content / Description <span className="BlogPost-required">*</span>
              </label>
              <div className="BlogPost-tinymceWrapper">
                <Editor
                  apiKey="8hswbe7bfeeneui9eb9gjgsym8ku30nx5gwre9808ajdzniu"
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  initialValue="<p>Write full blog content here...</p>"
                  init={{
                    height: 180,
                    menubar: false,
                    skin: 'oxide-dark',
                    content_css: 'dark',
                    plugins: ['advlist', 'autolink', 'lists', 'link', 'image', 'code'],
                    toolbar: 'undo redo | blocks | bold italic | bullist numlist | link image code',
                    content_style:
                      'body { font-family:Inter,sans-serif; font-size:13px; color:#e2f1e8; background-color:#09130d; }'
                  }}
                />
              </div>
            </div>

            <div className="BlogPost-grid3">
              <div className="BlogPost-field">
                <label>Status</label>
                <div className="BlogPost-toggleGroup">
                  <label className="BlogPost-switch">
                    <input
                      type="checkbox"
                      checked={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.checked })}
                    />
                    <span className="BlogPost-slider"></span>
                  </label>
                  <span className="BlogPost-toggleText">{formData.status ? 'Active' : 'Inactive'}</span>
                </div>
              </div>

              <div className="BlogPost-field">
                <label>Featured</label>
                <div className="BlogPost-toggleGroup">
                  <label className="BlogPost-switch">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    />
                    <span className="BlogPost-slider"></span>
                  </label>
                  <span className="BlogPost-toggleText">{formData.featured ? 'Yes' : 'No'}</span>
                </div>
              </div>

              <div className="BlogPost-field">
                <label>
                  Publish Date <span className="BlogPost-required">*</span>
                </label>
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

            <div className="BlogPost-actions">
              <button type="button" className="BlogPost-btn BlogPost-btnPrimary">
                <FaPaperPlane /> {editingId ? 'Update' : 'Publish'}
              </button>
              <button type="button" className="BlogPost-btn BlogPost-btnOutline">
                <FaSave /> Save Draft
              </button>
              <button type="button" className="BlogPost-btn BlogPost-btnReset" onClick={handleReset}>
                <FaRedo /> Reset
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* TABLE COLUMN */}
      <div className="BlogPost-column BlogPost-listColumn">
        <div className="BlogPost-card BlogPost-listCard">
          <div className="BlogPost-listHeader">
            <div className="BlogPost-header">
              <div className="BlogPost-headerBadge">
                <FaEdit className="BlogPost-headerIcon" />
              </div>
              <h2>Blog Posts List</h2>
            </div>

            <div className="BlogPost-searchFilter">
              <div className="BlogPost-searchBox">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <FaSearch className="BlogPost-searchIcon" />
              </div>
              <button
                className={`BlogPost-btnFilter ${showFilterOptions ? 'active' : ''}`}
                onClick={() => setShowFilterOptions(!showFilterOptions)}
                type="button"
              >
                <FaFilter />
              </button>
            </div>
          </div>

          {showFilterOptions && (
            <div className="BlogPost-filterRow">
              <div className="BlogPost-filterGroup">
                <label>Category</label>
                <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
                  <option value="All Categories">All</option>
                  <option value="Nature">Nature</option>
                  <option value="Honey">Honey</option>
                  <option value="Health">Health</option>
                  <option value="Chocolate">Chocolate</option>
                  <option value="Recipes">Recipes</option>
                </select>
              </div>

              <div className="BlogPost-filterGroup">
                <label>Status</label>
                <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                  <option value="All Status">All</option>
                  <option value="Published">Published</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>

              <div className="BlogPost-filterGroup">
                <label>Featured</label>
                <select value={filterFeatured} onChange={(e) => setFilterFeatured(e.target.value)}>
                  <option value="All">All</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
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

          <div className="BlogPost-tableWrapper BlogPost-horizontalScroll">
            <table className="BlogPost-table">
              <thead>
                <tr>
                  <th style={{ width: '30px' }}>#</th>
                  <th style={{ width: '50px' }}>Image</th>
                  <th style={{ minWidth: '220px' }}>Title & Details</th>
                  <th style={{ minWidth: '90px' }}>Category</th>
                  <th style={{ minWidth: '110px' }}>Date</th>
                  <th style={{ minWidth: '80px' }}>Status</th>
                  <th style={{ minWidth: '60px' }}>Featured</th>
                  <th style={{ minWidth: '80px' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedBlogs.length > 0 ? (
                  paginatedBlogs.map((blog, index) => (
                    <tr key={blog._id} className={editingId === blog._id ? 'editingRow' : ''}>
                      <td>{startIndex + index + 1}</td>
                      <td>
                        <img
                          src={blog.thumbnailImage}
                          alt={blog.title}
                          className="BlogPost-tableImg"
                        />
                      </td>
                      <td className="BlogPost-titleCell">
                        <div className="BlogPost-titleBlock">
                          <strong className="BlogPost-fullTitle">{blog.title}</strong>
                          <p className="BlogPost-fullSubtitle">{blog.excerpt}</p>
                        </div>
                      </td>
                      <td>
                        <span className={`BlogPost-tag BlogPost-tag-${(blog.category || 'default').toLowerCase()}`}>
                          {blog.category}
                        </span>
                      </td>
                      <td className="BlogPost-dateCell">
                        <div>
                          <FaCalendarAlt /> {blog.publishDate}
                        </div>
                        <small>
                          <FaClock /> {blog.readTime}
                        </small>
                      </td>
                      <td>
                        <span className={`BlogPost-badge BlogPost-badge-${(blog.status || 'published').toLowerCase()}`}>
                          {blog.status}
                        </span>
                      </td>
                      <td>
                        {blog.featured ? (
                          <span className="BlogPost-featuredIcon active">
                            <FaCheck />
                          </span>
                        ) : (
                          <span className="BlogPost-featuredIcon">—</span>
                        )}
                      </td>
                      <td>
                        <div className="BlogPost-tableActions">
                          <button
                            type="button"
                            className="BlogPost-actionBtn BlogPost-editBtn"
                            title="Edit"
                            onClick={() => handleEdit(blog)}
                          >
                            <FaEdit />
                          </button>
                          <button
                            type="button"
                            className="BlogPost-actionBtn BlogPost-deleteBtn"
                            title="Delete"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" style={{ textAlign: 'center', padding: '24px' }}>
                      No blog posts found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="BlogPost-pagination">
            <span>
              Showing {filteredBlogs.length === 0 ? 0 : startIndex + 1} to{' '}
              {Math.min(startIndex + itemsPerPage, filteredBlogs.length)} of {filteredBlogs.length} entries
            </span>
            <div className="BlogPost-pageButtons">
              <button
                type="button"
                className="BlogPost-pageBtn"
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  type="button"
                  className={`BlogPost-pageBtn ${currentPage === pageNum ? 'active' : ''}`}
                  onClick={() => handlePageChange(pageNum)}
                >
                  {pageNum}
                </button>
              ))}
              <button
                type="button"
                className="BlogPost-pageBtn"
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next
              </button>
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