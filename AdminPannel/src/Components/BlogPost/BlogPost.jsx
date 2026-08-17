import React, { useState, useRef, useEffect } from 'react';
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

const initialBlogs = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=150&auto=format&fit=crop&q=60',
    title: 'The Healing Power of Nature',
    excerpt: 'Discover how spending time in deep forests can improve mental health and overall well-being...',
    category: 'Nature',
    tags: 'Nature, Healing',
    date: '23 May 2025',
    publishDate: '2025-05-23',
    readTime: '5 min read',
    status: 'Published',
    featured: true,
    content: '<p>Discover how spending time in deep forests can improve mental health and overall well-being...</p>',
    metaTitle: 'The Healing Power of Nature',
    metaDescription: 'Forest healing and well-being',
    metaKeywords: 'nature, forest, health'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=150&auto=format&fit=crop&q=60',
    title: 'Benefits of Pure Forest Honey',
    excerpt: 'Unfiltered raw honey contains powerful antioxidants, enzymes, and natural healing properties...',
    category: 'Honey',
    tags: 'Honey, Organic',
    date: '23 May 2025',
    publishDate: '2025-05-23',
    readTime: '3 min read',
    status: 'Published',
    featured: true,
    content: '<p>Unfiltered raw honey contains powerful antioxidants...</p>',
    metaTitle: 'Benefits of Pure Forest Honey',
    metaDescription: 'Raw honey health benefits',
    metaKeywords: 'honey, organic'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=150&auto=format&fit=crop&q=60',
    title: 'Daily Habits for a Better You',
    excerpt: 'Simple morning rituals, proper hydration, and herbal intake to elevate your energy levels...',
    category: 'Health',
    tags: 'Habits, Health',
    date: '22 May 2025',
    publishDate: '2025-05-22',
    readTime: '5 min read',
    status: 'Published',
    featured: true,
    content: '<p>Simple morning rituals...</p>',
    metaTitle: 'Daily Habits for a Better You',
    metaDescription: 'Morning routines and health tips',
    metaKeywords: 'habits, fitness'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=150&auto=format&fit=crop&q=60',
    title: 'The Art of Chocolate Making',
    excerpt: 'From bean to bar – the detailed journey of craft chocolate production and roasting...',
    category: 'Chocolate',
    tags: 'Chocolate, Craft',
    date: '21 May 2025',
    publishDate: '2025-05-21',
    readTime: '7 min read',
    status: 'Draft',
    featured: false,
    content: '<p>From bean to bar...</p>',
    metaTitle: 'The Art of Chocolate Making',
    metaDescription: 'Craft chocolate production',
    metaKeywords: 'chocolate, craft'
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=150&auto=format&fit=crop&q=60',
    title: 'Healthy Recipes with Honey',
    excerpt: 'Easy and delicious breakfast and dessert recipes made with organic natural honey...',
    category: 'Recipes',
    tags: 'Food, Honey',
    date: '20 May 2025',
    publishDate: '2025-05-20',
    readTime: '4 min read',
    status: 'Published',
    featured: true,
    content: '<p>Easy and delicious recipes...</p>',
    metaTitle: 'Healthy Recipes with Honey',
    metaDescription: 'Honey breakfast recipes',
    metaKeywords: 'recipes, honey'
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=150&auto=format&fit=crop&q=60',
    title: 'Exploring Alpine Ecosystems',
    excerpt: 'A comprehensive study on high-altitude flora and fauna resilience...',
    category: 'Nature',
    tags: 'Nature, Alpine',
    date: '19 May 2025',
    publishDate: '2025-05-19',
    readTime: '6 min read',
    status: 'Published',
    featured: false,
    content: '<p>High-altitude flora and fauna resilience...</p>',
    metaTitle: 'Exploring Alpine Ecosystems',
    metaDescription: 'Alpine nature study',
    metaKeywords: 'alpine, nature'
  },
  {
    id: 7,
    image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=150&auto=format&fit=crop&q=60',
    title: 'Organic Diet Fundamentals',
    excerpt: 'Transitioning to clean whole foods without overcomplicating meal preps...',
    category: 'Health',
    tags: 'Health, Diet',
    date: '18 May 2025',
    publishDate: '2025-05-18',
    readTime: '4 min read',
    status: 'Draft',
    featured: true,
    content: '<p>Transitioning to clean whole foods...</p>',
    metaTitle: 'Organic Diet Fundamentals',
    metaDescription: 'Organic diet tips',
    metaKeywords: 'diet, organic'
  }
];

const BlogPost = () => {
  const [formData, setFormData] = useState({
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
    publishDate: '2025-05-23',
    metaTitle: '',
    metaDescription: '',
    metaKeywords: ''
  });

  const [blogs, setBlogs] = useState(initialBlogs);
  const [editingId, setEditingId] = useState(null);
  
  // Filtering states
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('All Categories');
  const [filterStatus, setFilterStatus] = useState('All Status');
  const [filterFeatured, setFilterFeatured] = useState('All');
  const [showFilterOptions, setShowFilterOptions] = useState(true);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const featuredInputRef = useRef(null);
  const thumbnailInputRef = useRef(null);
  const editorRef = useRef(null);

  const handleTitleChange = (e) => {
    const val = e.target.value;
    if (val.length <= 100) {
      setFormData((prev) => ({
        ...prev,
        title: val
      }));
    }
  };

  const handleImageUpload = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      if (type === 'featured') {
        setFormData((prev) => ({ ...prev, featuredImage: file, featuredImagePreview: imageUrl }));
      } else {
        setFormData((prev) => ({ ...prev, thumbnailImage: file, thumbnailPreview: imageUrl }));
      }
    }
  };

  const handleReset = () => {
    setEditingId(null);
    setFormData({
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
      publishDate: '2025-05-23',
      metaTitle: '',
      metaDescription: '',
      metaKeywords: ''
    });
    if (editorRef.current) {
      editorRef.current.setContent('<p>Write full blog content here...</p>');
    }
  };

  const handleEdit = (blog) => {
    setEditingId(blog.id);
    setFormData({
      title: blog.title || '',
      category: blog.category || '',
      tags: blog.tags || '',
      featuredImage: null,
      featuredImagePreview: blog.image || '',
      thumbnailImage: null,
      thumbnailPreview: blog.image || '',
      excerpt: blog.excerpt || '',
      content: blog.content || '',
      status: blog.status === 'Published',
      featured: Boolean(blog.featured),
      publishDate: blog.publishDate || '2025-05-23',
      metaTitle: blog.metaTitle || '',
      metaDescription: blog.metaDescription || '',
      metaKeywords: blog.metaKeywords || ''
    });

    if (editorRef.current) {
      editorRef.current.setContent(blog.content || '<p>Write full blog content here...</p>');
    }
  };

  const handlePublish = (statusType = 'Published') => {
    if (!formData.title.trim()) {
      alert('Please enter a Blog Title');
      return;
    }

    const editorContent = editorRef.current ? editorRef.current.getContent() : formData.content;

    if (editingId) {
      setBlogs((prevBlogs) =>
        prevBlogs.map((b) =>
          b.id === editingId
            ? {
                ...b,
                title: formData.title,
                category: formData.category || 'General',
                tags: formData.tags,
                image: formData.featuredImagePreview || b.image,
                excerpt: formData.excerpt || 'No description provided.',
                content: editorContent,
                status: statusType,
                featured: formData.featured,
                publishDate: formData.publishDate,
                date: formData.publishDate
                  ? new Date(formData.publishDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
                  : b.date,
                metaTitle: formData.metaTitle,
                metaDescription: formData.metaDescription,
                metaKeywords: formData.metaKeywords
              }
            : b
        )
      );
    } else {
      const newBlog = {
        id: Date.now(),
        image: formData.featuredImagePreview || 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=150&auto=format&fit=crop&q=60',
        title: formData.title,
        excerpt: formData.excerpt || 'No description provided.',
        category: formData.category || 'General',
        tags: formData.tags,
        date: formData.publishDate ? new Date(formData.publishDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '23 May 2025',
        publishDate: formData.publishDate,
        readTime: '4 min read',
        status: statusType,
        featured: formData.featured,
        content: editorContent,
        metaTitle: formData.metaTitle,
        metaDescription: formData.metaDescription,
        metaKeywords: formData.metaKeywords
      };

      setBlogs([newBlog, ...blogs]);
    }

    handleReset();
  };

  const handleDelete = (id) => {
    setBlogs(blogs.filter((b) => b.id !== id));
    if (editingId === id) {
      handleReset();
    }
  };

  const handleToggleFilter = () => {
    setShowFilterOptions(!showFilterOptions);
  };

  // Filter Logic
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'All Categories' || blog.category === filterCategory;
    const matchesStatus = filterStatus === 'All Status' || blog.status === filterStatus;
    const matchesFeatured = 
      filterFeatured === 'All' || 
      (filterFeatured === 'Yes' && blog.featured) || 
      (filterFeatured === 'No' && !blog.featured);

    return matchesSearch && matchesCategory && matchesStatus && matchesFeatured;
  });

  // Reset page to 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filterCategory, filterStatus, filterFeatured]);

  // Pagination Calculations
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
      {/* LEFT COLUMN: FORM (50%) */}
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
                <label>Blog Title <span className="BlogPost-required">*</span></label>
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
                <label>Category <span className="BlogPost-required">*</span></label>
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
                  placeholder="Enter tags"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                />
              </div>
            </div>

            <div className="BlogPost-grid2">
              <div className="BlogPost-field">
                <label>Featured Image <span className="BlogPost-required">*</span></label>
                <div
                  className="BlogPost-uploadBox"
                  onClick={() => featuredInputRef.current.click()}
                >
                  <input
                    type="file"
                    ref={featuredInputRef}
                    hidden
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'featured')}
                  />
                  {formData.featuredImagePreview ? (
                    <img src={formData.featuredImagePreview} alt="Preview" className="BlogPost-imgPreview" />
                  ) : (
                    <>
                      <FaCloudUploadAlt className="BlogPost-uploadIcon" />
                      <span>Upload Image</span>
                      <small>Max 2MB</small>
                    </>
                  )}
                </div>
              </div>

              <div className="BlogPost-field">
                <label>Thumbnail Image</label>
                <div
                  className="BlogPost-uploadBox"
                  onClick={() => thumbnailInputRef.current.click()}
                >
                  <input
                    type="file"
                    ref={thumbnailInputRef}
                    hidden
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'thumbnail')}
                  />
                  {formData.thumbnailPreview ? (
                    <img src={formData.thumbnailPreview} alt="Preview" className="BlogPost-imgPreview" />
                  ) : (
                    <>
                      <FaCloudUploadAlt className="BlogPost-uploadIcon" />
                      <span>Upload Thumbnail</span>
                      <small>Max 2MB</small>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="BlogPost-field">
              <div className="BlogPost-labelRow">
                <label>Excerpt / Short Description <span className="BlogPost-required">*</span></label>
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
              <label>Content / Description <span className="BlogPost-required">*</span></label>
              <div className="BlogPost-tinymceWrapper">
                <Editor
                  apiKey="no-api-key"
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  initialValue="<p>Write full blog content here...</p>"
                  init={{
                    height: 180,
                    menubar: false,
                    skin: 'oxide-dark',
                    content_css: 'dark',
                    plugins: ['advlist', 'autolink', 'lists', 'link', 'image', 'code'],
                    toolbar: 'undo redo | blocks | bold italic | bullist numlist | link image code',
                    content_style: 'body { font-family:Inter,sans-serif; font-size:13px; color:#e2f1e8; background-color:#09130d; }'
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
                <label>Publish Date <span className="BlogPost-required">*</span></label>
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
              <button
                type="button"
                className="BlogPost-btn BlogPost-btnPrimary"
                onClick={() => handlePublish('Published')}
              >
                <FaPaperPlane /> {editingId ? 'Update' : 'Publish'}
              </button>
              <button
                type="button"
                className="BlogPost-btn BlogPost-btnOutline"
                onClick={() => handlePublish('Draft')}
              >
                <FaSave /> Save Draft
              </button>
              <button
                type="button"
                className="BlogPost-btn BlogPost-btnReset"
                onClick={handleReset}
              >
                <FaRedo /> Reset
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* RIGHT COLUMN: TABLE (50%) */}
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
                onClick={handleToggleFilter}
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

          {/* Table Container with Horizontal Custom Scrollbar */}
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
                    <tr key={blog.id} className={editingId === blog.id ? 'editingRow' : ''}>
                      <td>{startIndex + index + 1}</td>
                      <td>
                        <img src={blog.image} alt={blog.title} className="BlogPost-tableImg" />
                      </td>
                      <td className="BlogPost-titleCell">
                        <div className="BlogPost-titleBlock">
                          <strong className="BlogPost-fullTitle">{blog.title}</strong>
                          <p className="BlogPost-fullSubtitle">{blog.excerpt}</p>
                        </div>
                      </td>
                      <td>
                        <span className={`BlogPost-tag BlogPost-tag-${blog.category.toLowerCase()}`}>
                          {blog.category}
                        </span>
                      </td>
                      <td className="BlogPost-dateCell">
                        <div><FaCalendarAlt /> {blog.date}</div>
                        <small><FaClock /> {blog.readTime}</small>
                      </td>
                      <td>
                        <span className={`BlogPost-badge BlogPost-badge-${blog.status.toLowerCase()}`}>
                          {blog.status}
                        </span>
                      </td>
                      <td>
                        {blog.featured ? (
                          <span className="BlogPost-featuredIcon active"><FaCheck /></span>
                        ) : (
                          <span className="BlogPost-featuredIcon">—</span>
                        )}
                      </td>
                      <td>
                        <div className="BlogPost-tableActions">
                          <button 
                            className="BlogPost-actionBtn BlogPost-editBtn" 
                            title="Edit"
                            onClick={() => handleEdit(blog)}
                          >
                            <FaEdit />
                          </button>
                          <button
                            className="BlogPost-actionBtn BlogPost-deleteBtn"
                            title="Delete"
                            onClick={() => handleDelete(blog.id)}
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
                className="BlogPost-pageBtn"
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  className={`BlogPost-pageBtn ${currentPage === pageNum ? 'active' : ''}`}
                  onClick={() => handlePageChange(pageNum)}
                >
                  {pageNum}
                </button>
              ))}
              <button
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