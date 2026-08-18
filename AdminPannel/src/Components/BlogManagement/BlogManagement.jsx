import React, { useState, useEffect, useCallback } from 'react';
import API, { IMG_URL } from '../../api/axios';
import {
  FaThList,
  FaThLarge,
  FaFilter,
  FaCalendarAlt,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaEye,
  FaEdit,
  FaTrash,
  FaBookmark,
  FaTimes,
  FaChevronDown
} from 'react-icons/fa';
import './BlogManagement.css';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop';

const BlogManagement = ({ onNavigateToEdit }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [viewMode, setViewMode] = useState('list');

  // Filters
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [selectedAuthor, setSelectedAuthor] = useState('All Authors');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Modals
  const [viewModalData, setViewModalData] = useState(null);
  const [editModalData, setEditModalData] = useState(null);

  // Dynamic Image Resolver
  const getImageUrl = (item) => {
    const rawImage = item?.featuredImage || item?.thumbnailImage || item?.image;
    if (!rawImage) return FALLBACK_IMAGE;

    if (rawImage.startsWith('http://') || rawImage.startsWith('https://') || rawImage.startsWith('data:')) {
      return rawImage;
    }

    const baseUrl = IMG_URL || 'http://localhost:5000';
    const cleanPath = rawImage.startsWith('/') ? rawImage : `/${rawImage}`;
    return `${baseUrl}${cleanPath}`;
  };

  // Fetch blogs from API
  const fetchBlogs = useCallback(async () => {
    try {
      setLoading(true);
      const res = await API.get('/blogs');
      if (res.data?.success) {
        setBlogs(res.data.data || []);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;

    try {
      const res = await API.delete(`/blogs/${id}`);
      if (res.data?.success) {
        setBlogs((prev) => prev.filter((blog) => (blog._id || blog.id) !== id));
        alert('Blog deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
      alert(error.response?.data?.message || 'Failed to delete blog.');
    }
  };

  const handleEditSave = async (e) => {
    e.preventDefault();
    const blogId = editModalData._id || editModalData.id;

    try {
      setSaving(true);
      const res = await API.put(`/blogs/${blogId}`, {
        title: editModalData.title,
        excerpt: editModalData.description || editModalData.excerpt,
        category: editModalData.category,
        status: editModalData.status
      });

      if (res.data?.success) {
        setBlogs((prev) =>
          prev.map((item) => ((item._id || item.id) === blogId ? res.data.data : item))
        );
        setEditModalData(null);
        alert('Blog updated successfully!');
      }
    } catch (error) {
      console.error('Error saving edited blog:', error);
      alert(error.response?.data?.message || 'Failed to update blog.');
    } finally {
      setSaving(false);
    }
  };

  const handleFilterReset = () => {
    setSelectedCategory('All Categories');
    setSelectedStatus('All Status');
    setSelectedAuthor('All Authors');
    setCurrentPage(1);
  };

  const filteredBlogs = blogs.filter((blog) => {
    const matchesCategory =
      selectedCategory === 'All Categories' || blog.category === selectedCategory;
    const matchesStatus =
      selectedStatus === 'All Status' || blog.status === selectedStatus;
    const matchesAuthor =
      selectedAuthor === 'All Authors' || (blog.author || 'Admin User') === selectedAuthor;

    return matchesCategory && matchesStatus && matchesAuthor;
  });

  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage) || 1;
  const indexOfLastBlog = currentPage * itemsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - itemsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="BlogManagement dark-forest-theme">
      {/* Top Controls */}
      <div className="BlogManagement-header">
        <div className="BlogManagement-viewToggle">
          <button
            type="button"
            className={`BlogManagement-toggleBtn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
          >
            <FaThList className="btn-icon" /> List View
          </button>
          <button
            type="button"
            className={`BlogManagement-toggleBtn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
          >
            <FaThLarge className="btn-icon" /> Grid View
          </button>
        </div>

        <div className="BlogManagement-controls">
          <div className="BlogManagement-selectWrapper">
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="All Categories">All Categories</option>
              <option value="Nature">Nature</option>
              <option value="Honey">Honey</option>
              <option value="Health">Health</option>
              <option value="Chocolate">Chocolate</option>
              <option value="Recipes">Recipes</option>
            </select>
            <FaChevronDown className="select-arrow" />
          </div>

          <div className="BlogManagement-selectWrapper">
            <select
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="All Status">All Status</option>
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
            </select>
            <FaChevronDown className="select-arrow" />
          </div>

          <div className="BlogManagement-selectWrapper">
            <select
              value={selectedAuthor}
              onChange={(e) => {
                setSelectedAuthor(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="All Authors">All Authors</option>
              <option value="Admin User">Admin User</option>
            </select>
            <FaChevronDown className="select-arrow" />
          </div>

          <button
            type="button"
            className="BlogManagement-filterBtn"
            onClick={handleFilterReset}
            title="Reset All Filters"
          >
            <FaFilter /> Reset Filter
          </button>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#e2f1e8' }}>
          Loading blog data...
        </div>
      ) : viewMode === 'list' ? (
        /* LIST VIEW */
        <div className="BlogManagement-tableContainer">
          <table className="BlogManagement-table">
            <thead>
              <tr>
                <th>#</th>
                <th>IMAGE</th>
                <th>TITLE</th>
                <th>CATEGORY</th>
                <th>AUTHOR</th>
                <th>DATE</th>
                <th>READ TIME</th>
                <th>STATUS</th>
                <th>FEATURED</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {currentBlogs.length > 0 ? (
                currentBlogs.map((blog, index) => {
                  const blogId = blog._id || blog.id;
                  const displayImage = getImageUrl(blog);

                  return (
                    <tr key={blogId}>
                      <td>{indexOfFirstBlog + index + 1}</td>
                      <td>
                        <img
                          src={displayImage}
                          alt={blog.title}
                          className="BlogManagement-thumb"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = FALLBACK_IMAGE;
                          }}
                        />
                      </td>
                      <td className="title-cell">
                        <div className="title-text">{blog.title}</div>
                        <div className="desc-text">{blog.excerpt || blog.description}</div>
                      </td>
                      <td>
                        <span className={`category-badge cat-${(blog.category || 'general').toLowerCase()}`}>
                          {blog.category}
                        </span>
                      </td>
                      <td>
                        <div className="author-cell">
                          <img
                            src={
                              blog.authorAvatar ||
                              'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'
                            }
                            alt={blog.author || 'Admin'}
                          />
                          <span>{blog.author || 'Admin User'}</span>
                        </div>
                      </td>
                      <td>
                        <div className="meta-item">
                          <FaCalendarAlt />{' '}
                          {blog.publishDate
                            ? new Date(blog.publishDate).toLocaleDateString('en-GB', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric'
                              })
                            : 'N/A'}
                        </div>
                      </td>
                      <td>
                        <div className="meta-item">
                          <FaClock /> {blog.readTime || '5 min read'}
                        </div>
                      </td>
                      <td>
                        <span className={`status-pill ${(blog.status || 'published').toLowerCase()}`}>
                          {blog.status}
                        </span>
                      </td>
                      <td>
                        {blog.featured ? (
                          <FaCheckCircle className="feat-icon active" />
                        ) : (
                          <FaTimesCircle className="feat-icon inactive" />
                        )}
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button
                            type="button"
                            className="act-btn view"
                            onClick={() =>
                              setViewModalData({
                                ...blog,
                                image: displayImage,
                                description: blog.excerpt || blog.description,
                                categoryClass: `cat-${(blog.category || 'general').toLowerCase()}`,
                                date: blog.publishDate || 'N/A'
                              })
                            }
                            title="View Details"
                          >
                            <FaEye />
                          </button>
                          <button
                            type="button"
                            className="act-btn edit"
                            onClick={() => {
                              if (onNavigateToEdit) {
                                onNavigateToEdit(blog);
                              } else {
                                setEditModalData({
                                  ...blog,
                                  description: blog.excerpt || blog.description
                                });
                              }
                            }}
                            title="Edit Blog"
                          >
                            <FaEdit />
                          </button>
                          <button
                            type="button"
                            className="act-btn delete"
                            onClick={() => handleDelete(blogId)}
                            title="Delete Blog"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="10" className="no-data">
                    No blog posts found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="BlogManagement-pagination">
            <span className="pagination-info">
              Showing {filteredBlogs.length > 0 ? indexOfFirstBlog + 1 : 0} to{' '}
              {Math.min(indexOfLastBlog, filteredBlogs.length)} of {filteredBlogs.length} blogs
            </span>
            <div className="pagination-controls">
              <button
                type="button"
                className="page-btn text"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                <button
                  key={num}
                  type="button"
                  className={`page-btn num ${currentPage === num ? 'active' : ''}`}
                  onClick={() => handlePageChange(num)}
                >
                  {num}
                </button>
              ))}
              <button
                type="button"
                className="page-btn text"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages || totalPages === 0}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* GRID VIEW */
        <div className="BlogManagement-gridContainer">
          <div className="BlogManagement-grid">
            {currentBlogs.map((blog) => {
              const blogId = blog._id || blog.id;
              const displayImage = getImageUrl(blog);

              return (
                <div key={blogId} className="BlogManagement-card">
                  <div className="card-top">
                    <img
                      src={displayImage}
                      alt={blog.title}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = FALLBACK_IMAGE;
                      }}
                    />
                    <span className={`category-badge cat-${(blog.category || 'general').toLowerCase()}`}>
                      {blog.category}
                    </span>
                    <button type="button" className="card-bookmark">
                      <FaBookmark />
                    </button>
                  </div>

                  <div className="card-content">
                    <div className="card-meta">
                      <span>
                        <FaCalendarAlt />{' '}
                        {blog.publishDate
                          ? new Date(blog.publishDate).toLocaleDateString('en-GB', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric'
                            })
                          : 'N/A'}
                      </span>
                      <span>
                        <FaClock /> {blog.readTime || '5 min read'}
                      </span>
                    </div>
                    <h3 className="card-title">{blog.title}</h3>
                    <p className="card-desc">{blog.excerpt || blog.description}</p>
                  </div>

                  <div className="card-footer">
                    <div className="author-cell">
                      <img
                        src={
                          blog.authorAvatar ||
                          'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'
                        }
                        alt={blog.author || 'Admin'}
                      />
                      <span>{blog.author || 'Admin User'}</span>
                    </div>
                    <div className="action-buttons">
                      <button
                        type="button"
                        className="act-btn view"
                        onClick={() =>
                          setViewModalData({
                            ...blog,
                            image: displayImage,
                            description: blog.excerpt || blog.description,
                            categoryClass: `cat-${(blog.category || 'general').toLowerCase()}`,
                            date: blog.publishDate || 'N/A'
                          })
                        }
                      >
                        <FaEye />
                      </button>
                      <button
                        type="button"
                        className="act-btn edit"
                        onClick={() => {
                          if (onNavigateToEdit) {
                            onNavigateToEdit(blog);
                          } else {
                            setEditModalData({
                              ...blog,
                              description: blog.excerpt || blog.description
                            });
                          }
                        }}
                      >
                        <FaEdit />
                      </button>
                      <button
                        type="button"
                        className="act-btn delete"
                        onClick={() => handleDelete(blogId)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="BlogManagement-pagination">
            <span className="pagination-info">
              Showing {filteredBlogs.length > 0 ? indexOfFirstBlog + 1 : 0} to{' '}
              {Math.min(indexOfLastBlog, filteredBlogs.length)} of {filteredBlogs.length} blogs
            </span>
            <div className="pagination-controls">
              <button
                type="button"
                className="page-btn text"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                <button
                  key={num}
                  type="button"
                  className={`page-btn num ${currentPage === num ? 'active' : ''}`}
                  onClick={() => handlePageChange(num)}
                >
                  {num}
                </button>
              ))}
              <button
                type="button"
                className="page-btn text"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages || totalPages === 0}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIEW DETAIL MODAL */}
      {viewModalData && (
        <div className="BlogManagement-modalOverlay">
          <div className="BlogManagement-modal detail-modal">
            <button
              type="button"
              className="close-modal-btn"
              onClick={() => setViewModalData(null)}
              aria-label="Close modal"
            >
              <FaTimes />
            </button>
            <div className="modal-banner-wrap">
              <img
                src={viewModalData.image}
                alt={viewModalData.title}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = FALLBACK_IMAGE;
                }}
              />
              <span className={`category-badge ${viewModalData.categoryClass}`}>
                {viewModalData.category}
              </span>
            </div>
            <div className="modal-body">
              <h2>{viewModalData.title}</h2>
              <div className="modal-meta-row">
                <span>
                  <FaCalendarAlt /> {viewModalData.date}
                </span>
                <span>
                  <FaClock /> {viewModalData.readTime || '5 min read'}
                </span>
                <span className={`status-pill ${(viewModalData.status || 'published').toLowerCase()}`}>
                  {viewModalData.status}
                </span>
              </div>
              <p className="modal-full-text">{viewModalData.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {editModalData && (
        <div className="BlogManagement-modalOverlay">
          <div className="BlogManagement-modal edit-modal">
            <button
              type="button"
              className="close-modal-btn"
              onClick={() => setEditModalData(null)}
              aria-label="Close modal"
            >
              <FaTimes />
            </button>
            <h3>Edit Blog Post</h3>
            <form onSubmit={handleEditSave} className="edit-form">
              <div className="form-group">
                <label>Blog Title</label>
                <input
                  type="text"
                  value={editModalData.title || ''}
                  onChange={(e) =>
                    setEditModalData({ ...editModalData, title: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  rows="4"
                  value={editModalData.description || ''}
                  onChange={(e) =>
                    setEditModalData({ ...editModalData, description: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Category</label>
                  <select
                    value={editModalData.category || 'Nature'}
                    onChange={(e) =>
                      setEditModalData({ ...editModalData, category: e.target.value })
                    }
                  >
                    <option value="Nature">Nature</option>
                    <option value="Honey">Honey</option>
                    <option value="Health">Health</option>
                    <option value="Chocolate">Chocolate</option>
                    <option value="Recipes">Recipes</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Status</label>
                  <select
                    value={editModalData.status || 'Published'}
                    onChange={(e) =>
                      setEditModalData({ ...editModalData, status: e.target.value })
                    }
                  >
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
              </div>

              <div className="modal-actions">
                <button type="submit" className="save-btn" disabled={saving}>
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setEditModalData(null)}
                  disabled={saving}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogManagement;