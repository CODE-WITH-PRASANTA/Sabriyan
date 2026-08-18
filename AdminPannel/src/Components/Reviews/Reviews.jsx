import React, { useState } from 'react';
import { 
  FaStar, FaRegStar, FaStarHalfAlt, FaSmile, FaThumbsUp, FaThumbsDown, 
  FaSearch, FaFilter, FaEye, FaEllipsisV, FaPlus, FaTimes, FaTrash, FaEdit 
} from 'react-icons/fa';
import './Reviews.css';

const initialReviewsData = [
  {
    id: 1,
    customer: 'Arjun Mehta',
    email: 'arjun@gmail.com',
    avatar: 'A',
    product: 'Dark Chocolate 70% Cocoa',
    productImg: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=100&auto=format&fit=crop&q=80',
    rating: 4,
    title: 'Excellent Taste!',
    review: 'Rich and smooth dark chocolate. Loved the natural taste...',
    status: 'Approved',
    date: 'May 29, 2025',
    time: '11:20 AM'
  },
  {
    id: 2,
    customer: 'Sneha Kapoor',
    email: 'sneha@gmail.com',
    avatar: 'S',
    product: 'Honey Chocolate With Almonds',
    productImg: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=100&auto=format&fit=crop&q=80',
    rating: 5,
    title: 'Totally Loved It',
    review: 'The combination of honey and almonds is just perfect...',
    status: 'Approved',
    date: 'May 29, 2025',
    time: '10:05 AM'
  },
  {
    id: 3,
    customer: 'Ravi Singh',
    email: 'ravi@gmail.com',
    avatar: 'R',
    product: 'Milk Chocolate Classic',
    productImg: 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=100&auto=format&fit=crop&q=80',
    rating: 3,
    title: 'Good But Sweet',
    review: 'Good quality but a bit too sweet for my taste.',
    status: 'Pending',
    date: 'May 28, 2025',
    time: '09:30 PM'
  },
  {
    id: 4,
    customer: 'Kavya Reddy',
    email: 'kavya@gmail.com',
    avatar: 'K',
    product: 'Chocolate Truffle Box',
    productImg: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?w=100&auto=format&fit=crop&q=80',
    rating: 5,
    title: 'Perfect Gift!',
    review: 'Beautiful packaging and amazing taste. Perfect for gifting!',
    status: 'Approved',
    date: 'May 28, 2025',
    time: '07:45 PM'
  },
  {
    id: 5,
    customer: 'Manish Gupta',
    email: 'manish@gmail.com',
    avatar: 'M',
    product: 'Hazelnut Chocolate Bar',
    productImg: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=100&auto=format&fit=crop&q=80',
    rating: 3,
    title: 'Okay Experience',
    review: 'Nice packaging but expected more in taste.',
    status: 'Rejected',
    date: 'May 28, 2025',
    time: '06:10 PM'
  }
];

const Reviews = () => {
  const [reviews, setReviews] = useState(initialReviewsData);
  const [searchQuery, setSearchQuery] = useState('');
  const [ratingFilter, setRatingFilter] = useState('All Ratings');
  const [productFilter, setProductFilter] = useState('All Products');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Modals & Popups State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [activeDropdownId, setActiveDropdownId] = useState(null);

  // Form state for Add/Edit
  const [formData, setFormData] = useState({
    customer: '',
    email: '',
    product: 'Dark Chocolate 70% Cocoa',
    rating: 5,
    title: '',
    review: '',
    status: 'Approved'
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  // Filter Logic
  const filteredReviews = reviews.filter((item) => {
    const matchesSearch = 
      item.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRating = ratingFilter === 'All Ratings' || item.rating.toString() === ratingFilter;
    const matchesProduct = productFilter === 'All Products' || item.product === productFilter;
    const matchesStatus = statusFilter === 'All Status' || item.status === statusFilter;

    return matchesSearch && matchesRating && matchesProduct && matchesStatus;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredReviews.length / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentReviews = filteredReviews.slice(indexOfFirstItem, indexOfLastItem);

  // Render Star Ratings
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} className="reviews-star-icon filled" />);
      } else {
        stars.push(<FaRegStar key={i} className="reviews-star-icon" />);
      }
    }
    return stars;
  };

  // Handlers for Add / Edit
  const handleOpenAddModal = () => {
    setIsEditing(false);
    setFormData({
      customer: '',
      email: '',
      product: 'Dark Chocolate 70% Cocoa',
      rating: 5,
      title: '',
      review: '',
      status: 'Approved'
    });
    setIsAddModalOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setReviews(reviews.map(rev => rev.id === editId ? {
        ...rev,
        customer: formData.customer,
        email: formData.email,
        product: formData.product,
        rating: Number(formData.rating),
        title: formData.title,
        review: formData.review,
        status: formData.status
      } : rev));
    } else {
      const newEntry = {
        id: Date.now(),
        customer: formData.customer,
        email: formData.email || 'customer@gmail.com',
        avatar: formData.customer.charAt(0).toUpperCase() || 'C',
        product: formData.product,
        productImg: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=100&auto=format&fit=crop&q=80',
        rating: Number(formData.rating),
        title: formData.title,
        review: formData.review,
        status: formData.status,
        date: 'May 29, 2025',
        time: '12:00 PM'
      };
      setReviews([newEntry, ...reviews]);
    }
    setIsAddModalOpen(false);
  };

  const handleDelete = (id) => {
    setReviews(reviews.filter(rev => rev.id !== id));
    setActiveDropdownId(null);
  };

  const handleEdit = (rev) => {
    setIsEditing(true);
    setEditId(rev.id);
    setFormData({
      customer: rev.customer,
      email: rev.email,
      product: rev.product,
      rating: rev.rating,
      title: rev.title,
      review: rev.review,
      status: rev.status
    });
    setIsAddModalOpen(true);
    setActiveDropdownId(null);
  };

  const handleView = (rev) => {
    setSelectedReview(rev);
    setIsViewModalOpen(true);
    setActiveDropdownId(null);
  };

  return (
    <div className="reviews-container">
      {/* Header Section */}
      <div className="reviews-header-flex">
        <div>
          <h1 className="reviews-title">Customer Reviews</h1>
          <p className="reviews-subtitle">Manage and moderate customer reviews for your chocolate products.</p>
        </div>
        <button className="reviews-add-btn" onClick={handleOpenAddModal}>
          <FaPlus /> Add Review
        </button>
      </div>

      {/* Metrics Cards */}
      <div className="reviews-metrics-grid">
        <div className="reviews-card">
          <div className="reviews-card-top">
            <span className="reviews-card-label">Total Reviews</span>
            <div className="reviews-card-icon-box gold"><FaStar /></div>
          </div>
          <div className="reviews-card-value">458</div>
          <div className="reviews-card-trend positive">↑ 18.2% vs last month</div>
        </div>

        <div className="reviews-card">
          <div className="reviews-card-top">
            <span className="reviews-card-label">Average Rating</span>
            <div className="reviews-card-icon-box yellow"><FaSmile /></div>
          </div>
          <div className="reviews-card-value">4.6 <span className="reviews-card-sub">/ 5</span></div>
          <div className="reviews-card-trend positive">↑ 0.3 vs last month</div>
        </div>

        <div className="reviews-card">
          <div className="reviews-card-top">
            <span className="reviews-card-label">Positive Reviews</span>
            <div className="reviews-card-icon-box green"><FaThumbsUp /></div>
          </div>
          <div className="reviews-card-value">392</div>
          <div className="reviews-card-trend positive">↑ 21.5% vs last month</div>
        </div>

        <div className="reviews-card">
          <div className="reviews-card-top">
            <span className="reviews-card-label">Negative Reviews</span>
            <div className="reviews-card-icon-box red"><FaThumbsDown /></div>
          </div>
          <div className="reviews-card-value">66</div>
          <div className="reviews-card-trend negative">↓ 9.7% vs last month</div>
        </div>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="reviews-toolbar">
        <div className="reviews-search-box">
          <FaSearch className="reviews-search-icon" />
          <input 
            type="text" 
            placeholder="Search by customer name, product, title..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="reviews-filters-group">
          <select 
            className="reviews-select" 
            value={ratingFilter} 
            onChange={(e) => setRatingFilter(e.target.value)}
          >
            <option>All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>

          <select 
            className="reviews-select"
            value={productFilter}
            onChange={(e) => setProductFilter(e.target.value)}
          >
            <option>All Products</option>
            <option>Dark Chocolate 70% Cocoa</option>
            <option>Honey Chocolate With Almonds</option>
            <option>Milk Chocolate Classic</option>
            <option>Chocolate Truffle Box</option>
            <option>Hazelnut Chocolate Bar</option>
          </select>

          <select 
            className="reviews-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option>All Status</option>
            <option>Approved</option>
            <option>Pending</option>
            <option>Rejected</option>
          </select>

          <button className="reviews-filter-btn" onClick={() => {
            setSearchQuery('');
            setRatingFilter('All Ratings');
            setProductFilter('All Products');
            setStatusFilter('All Status');
          }}>
            <FaFilter /> Filter
          </button>
        </div>
      </div>

      {/* Reviews Table */}
      <div className="reviews-table-container">
        <table className="reviews-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Product</th>
              <th>Rating</th>
              <th>Title</th>
              <th>Review</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentReviews.length > 0 ? (
              currentReviews.map((rev) => (
                <tr key={rev.id}>
                  <td>
                    <div className="reviews-customer-cell">
                      <div className="reviews-avatar">{rev.avatar}</div>
                      <div>
                        <div className="reviews-customer-name">{rev.customer}</div>
                        <div className="reviews-customer-email">{rev.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="reviews-product-cell">
                      <img src={rev.productImg} alt={rev.product} className="reviews-product-img" />
                      <span className="reviews-product-name">{rev.product}</span>
                    </div>
                  </td>
                  <td>
                    <div className="reviews-stars-cell">
                      {renderStars(rev.rating)}
                    </div>
                  </td>
                  <td>
                    <span className="reviews-title-text">{rev.title}</span>
                  </td>
                  <td>
                    <span className="reviews-desc-text" title={rev.review}>{rev.review}</span>
                  </td>
                  <td>
                    <span className={`reviews-status-badge ${rev.status.toLowerCase()}`}>
                      {rev.status}
                    </span>
                  </td>
                  <td>
                    <div className="reviews-date-cell">
                      <div>{rev.date}</div>
                      <div className="reviews-time-text">{rev.time}</div>
                    </div>
                  </td>
                  <td>
                    <div className="reviews-actions-cell">
                      <button className="reviews-action-icon-btn" title="View" onClick={() => handleView(rev)}>
                        <FaEye />
                      </button>
                      <div className="reviews-dropdown-wrapper">
                        <button 
                          className="reviews-action-icon-btn" 
                          title="More Options"
                          onClick={() => setActiveDropdownId(activeDropdownId === rev.id ? null : rev.id)}
                        >
                          <FaEllipsisV />
                        </button>
                        {activeDropdownId === rev.id && (
                          <div className="reviews-dropdown-menu">
                            <button onClick={() => handleEdit(rev)}><FaEdit /> Edit</button>
                            <button onClick={() => handleDelete(rev.id)} className="delete"><FaTrash /> Delete</button>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="reviews-no-data">No reviews found matching your criteria.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="reviews-footer-pagination">
        <div className="reviews-showing-text">
          Showing {filteredReviews.length > 0 ? indexOfFirstItem + 1 : 0} to {Math.min(indexOfLastItem, filteredReviews.length)} of {filteredReviews.length} reviews
        </div>
        <div className="reviews-pagination-controls">
          <button 
            className="reviews-page-btn" 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button 
              key={index + 1}
              className={`reviews-page-num ${currentPage === index + 1 ? 'active' : ''}`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button 
            className="reviews-page-btn"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages || totalPages === 0}
          >
            Next <span style={{ marginLeft: '4px' }}>&gt;</span>
          </button>
        </div>
      </div>

      {/* View Details Modal */}
      {isViewModalOpen && selectedReview && (
        <div className="reviews-modal-overlay">
          <div className="reviews-modal-content">
            <div className="reviews-modal-header">
              <h2>Review Details</h2>
              <button className="reviews-modal-close" onClick={() => setIsViewModalOpen(false)}>
                <FaTimes />
              </button>
            </div>
            <div className="reviews-modal-body">
              <div className="reviews-modal-row">
                <strong>Customer:</strong> {selectedReview.customer} ({selectedReview.email})
              </div>
              <div className="reviews-modal-row">
                <strong>Product:</strong> {selectedReview.product}
              </div>
              <div className="reviews-modal-row">
                <strong>Rating:</strong> {selectedReview.rating} / 5 Stars
              </div>
              <div className="reviews-modal-row">
                <strong>Title:</strong> {selectedReview.title}
              </div>
              <div className="reviews-modal-row">
                <strong>Review Text:</strong> {selectedReview.review}
              </div>
              <div className="reviews-modal-row">
                <strong>Status:</strong> <span className={`reviews-status-badge ${selectedReview.status.toLowerCase()}`}>{selectedReview.status}</span>
              </div>
              <div className="reviews-modal-row">
                <strong>Date & Time:</strong> {selectedReview.date} at {selectedReview.time}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Review Modal */}
      {isAddModalOpen && (
        <div className="reviews-modal-overlay">
          <div className="reviews-modal-content">
            <div className="reviews-modal-header">
              <h2>{isEditing ? 'Edit Review' : 'Add New Review'}</h2>
              <button className="reviews-modal-close" onClick={() => setIsAddModalOpen(false)}>
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleFormSubmit} className="reviews-form">
              <div className="reviews-form-group">
                <label>Customer Name</label>
                <input 
                  type="text" 
                  required 
                  value={formData.customer} 
                  onChange={(e) => setFormData({...formData, customer: e.target.value})}
                  placeholder="e.g. John Doe"
                />
              </div>
              <div className="reviews-form-group">
                <label>Customer Email</label>
                <input 
                  type="email" 
                  required 
                  value={formData.email} 
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="e.g. john@gmail.com"
                />
              </div>
              <div className="reviews-form-group">
                <label>Product</label>
                <select 
                  value={formData.product} 
                  onChange={(e) => setFormData({...formData, product: e.target.value})}
                >
                  <option>Dark Chocolate 70% Cocoa</option>
                  <option>Honey Chocolate With Almonds</option>
                  <option>Milk Chocolate Classic</option>
                  <option>Chocolate Truffle Box</option>
                  <option>Hazelnut Chocolate Bar</option>
                </select>
              </div>
              <div className="reviews-form-group">
                <label>Rating (1-5)</label>
                <select 
                  value={formData.rating} 
                  onChange={(e) => setFormData({...formData, rating: e.target.value})}
                >
                  <option value="5">5 - Excellent</option>
                  <option value="4">4 - Very Good</option>
                  <option value="3">3 - Average</option>
                  <option value="2">2 - Poor</option>
                  <option value="1">1 - Terrible</option>
                </select>
              </div>
              <div className="reviews-form-group">
                <label>Review Title</label>
                <input 
                  type="text" 
                  required 
                  value={formData.title} 
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="e.g. Absolutely loved it!"
                />
              </div>
              <div className="reviews-form-group">
                <label>Review Description</label>
                <textarea 
                  required 
                  rows="3"
                  value={formData.review} 
                  onChange={(e) => setFormData({...formData, review: e.target.value})}
                  placeholder="Write review details here..."
                />
              </div>
              <div className="reviews-form-group">
                <label>Status</label>
                <select 
                  value={formData.status} 
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                >
                  <option>Approved</option>
                  <option>Pending</option>
                  <option>Rejected</option>
                </select>
              </div>
              <div className="reviews-form-actions">
                <button type="button" className="reviews-cancel-btn" onClick={() => setIsAddModalOpen(false)}>Cancel</button>
                <button type="submit" className="reviews-submit-btn">{isEditing ? 'Update Review' : 'Save Review'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reviews;