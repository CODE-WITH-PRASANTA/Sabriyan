import React, { useState, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import './BlogPost.css';
import {
  FaEdit,
  FaCloudUploadAlt,
  FaSearch,
  FaFilter,
  FaCalendarAlt,
  FaClock,
  FaCheck,
  FaTrash,
  FaPaperPlane,
  FaSave,
  FaRedo
} from 'react-icons/fa';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop';

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

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('All Categories');
  const [filterStatus, setFilterStatus] = useState('All Status');
  const [filterFeatured, setFilterFeatured] = useState('All');
  const [showFilterOptions, setShowFilterOptions] = useState(true);

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
    }
  };

  return (
    <div className="BlogPost-container">
      {/* FORM COLUMN */}
      <div className="BlogPost-column BlogPost-formColumn">
        <div className="BlogPost-card BlogPost-scrollableForm">
          <div className="BlogPost-header">
            <div className="BlogPost-headerBadge">
              <FaEdit className="BlogPost-headerIcon" />
            </div>
            <h2>{editingId ? 'Edit Blog Post' : 'Add / Edit Blog Post'}</h2>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="BlogPost-form">
            <div className="BlogPost-field">
              <div className="BlogPost-labelRow">
                <label>
                  Blog Title <span className="BlogPost-required">*</span>
                </label>
                <span className="BlogPost-charCount">{formData.title.length}/100</span>
              </div>
              <input
                type="text"
                placeholder="e.g. The Healing Power of Nature"
                value={formData.title}
                onChange={handleTitleChange}
              />
            </div>

            <div className="BlogPost-grid2">
              <div className="BlogPost-field">
                <label>
                  Category <span className="BlogPost-required">*</span>
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="">Select Category</option>
                  <option value="Nature">Nature</option>
                  <option value="Honey">Honey</option>
                  <option value="Health">Health</option>
                  <option value="Chocolate">Chocolate</option>
                  <option value="Recipes">Recipes</option>
                </select>
              </div>
              <div className="BlogPost-field">
                <label>Tags</label>
                <input
                  type="text"
                  placeholder="e.g. Nature, Healing"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                />
              </div>
            </div>

            {/* FEATURED & THUMBNAIL UPLOAD FIELDS */}
            <div className="BlogPost-grid2">
              <div className="BlogPost-field">
                <label>Featured Image</label>
                <div
                  className="BlogPost-uploadBox"
                  onClick={() => featuredInputRef.current && featuredInputRef.current.click()}
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
                <input
                  type="date"
                  value={formData.publishDate}
                  onChange={(e) => setFormData({ ...formData, publishDate: e.target.value })}
                />
              </div>
            </div>

            <div className="BlogPost-field">
              <label>Meta Title (SEO)</label>
              <input
                type="text"
                placeholder="Enter meta title"
                value={formData.metaTitle}
                onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
              />
            </div>

            <div className="BlogPost-grid2">
              <div className="BlogPost-field">
                <label>Meta Description (SEO)</label>
                <input
                  type="text"
                  placeholder="Enter meta description"
                  value={formData.metaDescription}
                  onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                />
              </div>
              <div className="BlogPost-field">
                <label>Meta Keywords (SEO)</label>
                <input
                  type="text"
                  placeholder="Enter meta keywords"
                  value={formData.metaKeywords}
                  onChange={(e) => setFormData({ ...formData, metaKeywords: e.target.value })}
                />
              </div>
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
              </div>
            </div>
          )}

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
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;