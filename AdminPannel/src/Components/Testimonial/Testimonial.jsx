import React, { useState, useMemo, useRef } from 'react';
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
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  RefreshCw,
  Send,
  UserCheck
} from 'lucide-react';
import './Testimonial.css';

// Default Mock Data matching reference image
const INITIAL_TESTIMONIALS = [
  {
    id: 1,
    customerName: 'Saurav Sharma',
    designation: 'Mumbai, India',
    image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    review: 'The best dark chocolate I have ever had! Pure, rich and absolutely delicious.',
    rating: 5,
    status: 'Active',
    displayOrder: 1,
    featured: true
  },
  {
    id: 2,
    customerName: 'Priya Verma',
    designation: 'Bangalore, India',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    review: 'Truly exceptional chocolates. You can taste the premium quality!',
    rating: 5,
    status: 'Active',
    displayOrder: 2,
    featured: true
  },
  {
    id: 3,
    customerName: 'Rahul Kapoor',
    designation: 'Delhi, India',
    image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80',
    review: 'I love the smooth texture and deep flavor. Perfect for every occasion.',
    rating: 5,
    status: 'Active',
    displayOrder: 3,
    featured: true
  },
  {
    id: 4,
    customerName: 'Vikram Singh',
    designation: 'Pune, India',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    review: 'The taste is out of this world. Definitely my favourite chocolate brand!',
    rating: 5,
    status: 'Active',
    displayOrder: 4,
    featured: true
  }
];

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

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState(INITIAL_TESTIMONIALS);
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [isEditing, setIsEditing] = useState(false);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  // Hidden File Input Ref
  const fileInputRef = useRef(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle Image Upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('File size exceeds 2MB limits');
        return;
      }
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, image: imageUrl }));
    }
  };

  // Submit / Publish Testimonial
  const handlePublish = (e) => {
    e.preventDefault();
    if (!formData.customerName.trim()) return alert('Please enter customer name');
    if (!formData.review.trim()) return alert('Please enter review message');

    if (isEditing) {
      setTestimonials((prev) =>
        prev.map((t) => (t.id === formData.id ? { ...formData } : t))
      );
      setIsEditing(false);
      alert('Testimonial updated successfully!');
    } else {
      const newTestimonial = {
        ...formData,
        id: Date.now(),
        image: formData.image || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        displayOrder: Number(formData.displayOrder) || testimonials.length + 1
      };
      setTestimonials([newTestimonial, ...testimonials]);
      alert('Testimonial published successfully!');
    }
    handleReset();
  };

  // Reset Form
  const handleReset = () => {
    setFormData(INITIAL_FORM_STATE);
    setIsEditing(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Edit action
  const handleEdit = (item) => {
    setFormData({ ...item });
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Delete action
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      setTestimonials((prev) => prev.filter((t) => t.id !== id));
    }
  };

  // Render Star Rating Picker or Static Display
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

  // Filtered Testimonials
  const filteredTestimonials = useMemo(() => {
    return testimonials.filter((item) => {
      const matchesSearch =
        item.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.review.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === 'All' || item.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [testimonials, searchQuery, statusFilter]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredTestimonials.length / itemsPerPage) || 1;
  const paginatedTestimonials = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredTestimonials.slice(start, start + itemsPerPage);
  }, [filteredTestimonials, currentPage]);

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
                      <img src={formData.image} alt="Customer Preview" />
                      <span>Change Image</span>
                    </div>
                  ) : (
                    <div className="upload-placeholder">
                      <Upload size={22} className="upload-icon" />
                      <p><strong>Click to upload image</strong></p>
                      <span>JPG, PNG (Max 2MB)</span>
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
                maxLength={250}
                placeholder="Enter customer review or message..."
                value={formData.review}
                onChange={handleChange}
                required
              ></textarea>
              <span className="char-count">Maximum 250 characters</span>
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
              <button type="submit" className="btn-action btn-publish">
                <Send size={15} /> {isEditing ? 'Update Testimonial' : 'Publish Testimonial'}
              </button>
              <button
                type="button"
                className="btn-action btn-update"
                onClick={() => alert('Draft updated!')}
              >
                <RefreshCw size={15} /> Update
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
                  onChange={(e) => setSearchQuery(e.target.value)}
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
                      onClick={() => { setStatusFilter('All'); setShowFilterDropdown(false); }}
                    >
                      All Status
                    </div>
                    <div
                      className={`filter-option ${statusFilter === 'Active' ? 'active' : ''}`}
                      onClick={() => { setStatusFilter('Active'); setShowFilterDropdown(false); }}
                    >
                      Active Only
                    </div>
                    <div
                      className={`filter-option ${statusFilter === 'Inactive' ? 'active' : ''}`}
                      onClick={() => { setStatusFilter('Inactive'); setShowFilterDropdown(false); }}
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
                {paginatedTestimonials.length > 0 ? (
                  paginatedTestimonials.map((item, idx) => (
                    <tr key={item.id}>
                      <td className="row-num">
                        {(currentPage - 1) * itemsPerPage + idx + 1}
                      </td>
                      <td className="row-customer">
                        <div className="customer-cell">
                          <img
                            src={item.image}
                            alt={item.customerName}
                            className="avatar-img"
                          />
                          <div className="customer-info">
                            <span className="c-name">{item.customerName}</span>
                            <span className="c-location">{item.designation}</span>
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
                            onClick={() => handleDelete(item.id)}
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
              Showing {paginatedTestimonials.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to{' '}
              {Math.min(currentPage * itemsPerPage, filteredTestimonials.length)} of{' '}
              {filteredTestimonials.length} testimonials
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
                disabled={currentPage === totalPages}
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