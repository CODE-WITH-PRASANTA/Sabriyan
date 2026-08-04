import React, { useState, useEffect, useRef } from 'react';
import API, { IMG_URL } from "../../api/axios";
import {
  MessageSquareQuote,
  Star,
  Upload,
  Search,
  Filter,
  Edit,
  Trash2,
  Check,
  X,
  RotateCcw,
  Send
} from 'lucide-react';
import './Testimonial.css';

const INITIAL_FORM_STATE = {
  id: null,
  customerName: '',
  designation: '',
  image: '',
  review: '',
  rating: 5,
  status: 'Active',
  displayOrder: 1,
  featured: true
};

const DEFAULT_AVATAR = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80';

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  // Pagination State (Managed by Backend)
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const itemsPerPage = 4;

  // Ref for File Input
  const fileInputRef = useRef(null);

  // Helper to resolve clean backend server origin (e.g., http://localhost:5000)
  const SERVER_ORIGIN = (IMG_URL || 'http://localhost:5000').replace(/\/api\/?$/, '');

  // ================= ENHANCED WEBP & IMAGE RESOLVER =================
  const getImageUrl = (imgPath) => {
    if (!imgPath) return DEFAULT_AVATAR;
    
    // Return direct blob previews or external HTTP/HTTPS URLs as-is
    if (imgPath.startsWith('blob:') || imgPath.startsWith('http://') || imgPath.startsWith('https://')) {
      return imgPath;
    }

    // Clean up backend upload directory prefixes cleanly
    let cleanPath = imgPath.replace(/^public\//, '');
    cleanPath = cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`;

    return `${SERVER_ORIGIN}${cleanPath}`;
  };

  // ================= 1. FETCH TESTIMONIALS (API) =================
  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage,
        limit: itemsPerPage,
      });

      if (searchQuery.trim()) params.append('search', searchQuery.trim());
      if (statusFilter !== 'All') params.append('status', statusFilter);

      const response = await API.get(`/testimonials?${params.toString()}`);

      if (response.data && response.data.success) {
        setTestimonials(response.data.data || []);
        setTotalPages(response.data.totalPages || 1);
        setTotalCount(response.data.total || 0);
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error?.response?.data || error.message);
      setTestimonials([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, [currentPage, searchQuery, statusFilter]);

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle File Selection
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert('File size exceeds 10MB limit');
        return;
      }
      setSelectedFile(file);
      const previewUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, image: previewUrl }));
    }
  };

  // Reset Form
  const handleReset = () => {
    setFormData(INITIAL_FORM_STATE);
    setSelectedFile(null);
    setIsEditing(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // ================= 2. CREATE / UPDATE TESTIMONIAL =================
  const handlePublish = async (e) => {
    e.preventDefault();
    if (!formData.customerName.trim()) return alert('Please enter customer name');
    if (!formData.review.trim()) return alert('Please enter review message');

    if (!isEditing && !selectedFile && !formData.image) {
      return alert('Please select a customer image');
    }

    setSubmitting(true);
    try {
      const payload = new FormData();
      payload.append('customerName', formData.customerName);
      payload.append('designation', formData.designation || '');
      payload.append('review', formData.review);
      payload.append('rating', formData.rating);
      payload.append('status', formData.status);
      payload.append('displayOrder', formData.displayOrder || 1);
      payload.append('featured', formData.featured);

      // Append binary file if selected, or existing image path string
      if (selectedFile) {
        payload.append('image', selectedFile);
      } else if (formData.image && !formData.image.startsWith('blob:')) {
        payload.append('image', formData.image);
      }

      if (isEditing) {
        const targetId = formData._id || formData.id;
        const response = await API.put(`/testimonials/${targetId}`, payload, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });

        if (response.data && response.data.success) {
          alert('Testimonial updated successfully!');
          fetchTestimonials();
          handleReset();
        }
      } else {
        const response = await API.post('/testimonials', payload, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });

        if (response.data && response.data.success) {
          alert('Testimonial published successfully!');
          fetchTestimonials();
          handleReset();
        }
      }
    } catch (error) {
      console.error('Error saving testimonial:', error?.response?.data || error.message);
      alert(error?.response?.data?.message || 'Failed to save testimonial');
    } finally {
      setSubmitting(false);
    }
  };

  // Edit Action
  const handleEdit = (item) => {
    setFormData({
      ...item,
      id: item._id || item.id,
      image: item.image || ''
    });
    setSelectedFile(null);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ================= 3. DELETE TESTIMONIAL =================
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      try {
        const response = await API.delete(`/testimonials/${id}`);
        if (response.data && response.data.success) {
          alert('Testimonial deleted successfully!');
          fetchTestimonials();
        }
      } catch (error) {
        console.error('Error deleting testimonial:', error?.response?.data || error.message);
        alert(error?.response?.data?.message || 'Failed to delete testimonial');
      }
    }
  };

  // Render Star Rating
  const renderStars = (rating, interactive = false) => {
    return (
      <div className="star-rating-box">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={interactive ? 20 : 16}
            className={`star-icon ${star <= rating ? 'filled' : 'empty'}`}
            onClick={() => {
              if (interactive) {
                setFormData((prev) => ({ ...prev, rating: star }));
              }
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="testimonial-container">
      <div className="testimonial-grid">
        {/* ================= LEFT FORM PANEL ================= */}
        <div className="panel-card form-panel">
          <div className="panel-header">
            <MessageSquareQuote className="header-icon" size={20} />
            <h2>{isEditing ? 'Edit Testimonial' : 'Add / Edit Testimonial'}</h2>
          </div>

          <form onSubmit={handlePublish} className="form-body">
            {/* Customer Name */}
            <div className="form-group">
              <label>Customer Name <span className="req">*</span></label>
              <input
                type="text"
                name="customerName"
                placeholder="Enter customer name"
                value={formData.customerName}
                onChange={handleChange}
                required
              />
            </div>

            {/* Customer Image & Designation */}
            <div className="form-row gap-12 mt-12">
              <div className="form-group flex-1">
                <label>Customer Image <span className="req">*</span></label>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  style={{ display: 'none' }}
                />
                <div
                  className="upload-dropzone"
                  onClick={() => fileInputRef.current.click()}
                >
                  {formData.image ? (
                    <div className="upload-preview">
                      <img 
                        src={getImageUrl(formData.image)} 
                        alt="Customer Preview" 
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = DEFAULT_AVATAR;
                        }}
                      />
                      <span>Change Image</span>
                    </div>
                  ) : (
                    <div className="upload-placeholder">
                      <Upload size={22} className="upload-icon" />
                      <p><strong>Click to upload image</strong></p>
                      <span>JPG, PNG, WebP (Max 10MB)</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="form-group flex-1">
                <label>Designation / Location</label>
                <input
                  type="text"
                  name="designation"
                  placeholder="e.g. Mumbai, India"
                  value={formData.designation}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Review / Message */}
            <div className="form-group mt-12">
              <label>Review / Message <span className="req">*</span></label>
              <textarea
                name="review"
                rows="4"
                maxLength={500}
                placeholder="Enter customer review or message..."
                value={formData.review}
                onChange={handleChange}
                required
              ></textarea>
              <span className="char-count">Maximum 500 characters</span>
            </div>

            {/* Rating */}
            <div className="form-group mt-12">
              <label>Rating <span className="req">*</span></label>
              <div className="interactive-stars-wrap">
                {renderStars(formData.rating, true)}
                <span className="hint-text">(Select rating)</span>
              </div>
            </div>

            {/* Status Switch */}
            <div className="form-group mt-12">
              <label>Status</label>
              <div className="toggle-switch-wrap mt-4">
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={formData.status === 'Active'}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        status: e.target.checked ? 'Active' : 'Inactive'
                      }))
                    }
                  />
                  <span className="slider round"></span>
                </label>
                <span className="status-label-text">{formData.status}</span>
              </div>
            </div>

            {/* Display Order */}
            <div className="form-group mt-12">
              <label>Display Order</label>
              <input
                type="number"
                name="displayOrder"
                placeholder="Enter display order"
                value={formData.displayOrder}
                onChange={handleChange}
              />
              <span className="hint-text">Lower number will display first</span>
            </div>

            {/* Featured Switch */}
            <div className="form-group mt-12">
              <label>Featured</label>
              <div className="toggle-switch-wrap mt-4">
                <label className="switch">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleChange}
                  />
                  <span className="slider round"></span>
                </label>
                <span className="status-label-text">Show on homepage</span>
              </div>
            </div>

            {/* Form Buttons */}
            <div className="form-actions-row mt-20">
              <button 
                type="submit" 
                className="btn-action btn-publish"
                disabled={submitting}
              >
                <Send size={15} /> {submitting ? 'Saving...' : isEditing ? 'Update Testimonial' : 'Publish Testimonial'}
              </button>
              <button
                type="button"
                className="btn-action btn-reset"
                onClick={handleReset}
              >
                <RotateCcw size={15} /> Reset
              </button>
            </div>
          </form>
        </div>

        {/* ================= RIGHT LIST PANEL ================= */}
        <div className="panel-card list-panel">
          <div className="list-top-bar">
            <div className="panel-header border-0 p-0">
              <Star className="header-icon" size={20} />
              <h2>Testimonials List</h2>
            </div>

            <div className="search-filter-controls">
              <div className="search-box">
                <input
                  type="text"
                  placeholder="Search testimonials..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                />
                <Search size={15} className="search-icon" />
              </div>

              <div className="filter-dropdown-wrapper">
                <button
                  className="btn-filter"
                  onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                >
                  <Filter size={14} /> Filter
                </button>
                {showFilterDropdown && (
                  <div className="filter-menu">
                    <div
                      className={`filter-option ${statusFilter === 'All' ? 'active' : ''}`}
                      onClick={() => { setStatusFilter('All'); setCurrentPage(1); setShowFilterDropdown(false); }}
                    >
                      All Status
                    </div>
                    <div
                      className={`filter-option ${statusFilter === 'Active' ? 'active' : ''}`}
                      onClick={() => { setStatusFilter('Active'); setCurrentPage(1); setShowFilterDropdown(false); }}
                    >
                      Active Only
                    </div>
                    <div
                      className={`filter-option ${statusFilter === 'Inactive' ? 'active' : ''}`}
                      onClick={() => { setStatusFilter('Inactive'); setCurrentPage(1); setShowFilterDropdown(false); }}
                    >
                      Inactive Only
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="table-wrapper mt-16">
            <table className="testimonial-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Customer</th>
                  <th>Review</th>
                  <th>Rating</th>
                  <th>Status</th>
                  <th>Featured</th>
                  <th>Order</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="8" className="no-data" style={{ padding: '30px 0', color: '#f59e0b' }}>
                      Loading testimonials...
                    </td>
                  </tr>
                ) : testimonials.length > 0 ? (
                  testimonials.map((item, idx) => (
                    <tr key={item._id || item.id || idx}>
                      <td className="row-num">
                        {(currentPage - 1) * itemsPerPage + idx + 1}
                      </td>
                      <td className="row-customer">
                        <div className="customer-cell">
                          <img
                            src={getImageUrl(item.image)}
                            alt={item.customerName || 'Customer'}
                            className="avatar-img"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = DEFAULT_AVATAR;
                            }}
                          />
                          <div className="customer-info">
                            <span className="c-name">{item.customerName}</span>
                            <span className="c-location">{item.designation || '—'}</span>
                          </div>
                        </div>
                      </td>
                      <td className="row-review">
                        <div className="review-quote-box">
                          <span className="quote-mark">“</span>
                          <p>{item.review}</p>
                          <span className="quote-mark">”</span>
                        </div>
                      </td>
                      <td className="row-rating">
                        {renderStars(item.rating)}
                      </td>
                      <td className="row-status">
                        <span
                          className={`status-badge ${
                            item.status === 'Active' ? 'active' : 'inactive'
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="row-featured">
                        {item.featured ? (
                          <span className="icon-circle check">
                            <Check size={13} />
                          </span>
                        ) : (
                          <span className="icon-circle cross">
                            <X size={13} />
                          </span>
                        )}
                      </td>
                      <td className="row-order">{item.displayOrder}</td>
                      <td className="row-actions">
                        <div className="action-buttons">
                          <button
                            className="btn-icon btn-edit"
                            title="Edit Testimonial"
                            onClick={() => handleEdit(item)}
                          >
                            <Edit size={14} />
                          </button>
                          <button
                            className="btn-icon btn-delete"
                            title="Delete Testimonial"
                            onClick={() => handleDelete(item._id || item.id)}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="no-data">
                      No testimonials found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer & Pagination */}
          <div className="pagination-wrapper mt-20">
            <span className="showing-text">
              Showing {testimonials.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to{' '}
              {Math.min(currentPage * itemsPerPage, totalCount)} of{' '}
              {totalCount} testimonials
            </span>

            <div className="pagination-controls">
              <button
                className="btn-page"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              >
                Previous
              </button>

              <div className="page-numbers">
                {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                  (pageNum) => (
                    <button
                      key={pageNum}
                      className={`page-num ${
                        currentPage === pageNum ? 'active' : ''
                      }`}
                      onClick={() => setCurrentPage(pageNum)}
                    >
                      {pageNum}
                    </button>
                  )
                )}
              </div>

              <button
                className="btn-page"
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
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

export default Testimonial;