import React, { useState } from 'react';
import './Review.css';
import { 
  FiEdit3, 
  FiCalendar, 
  FiCheck, 
  FiClock, 
  FiStar, 
  FiX, 
  FiMessageSquare,
  FiShoppingBag
} from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';

const INITIAL_REVIEWS = [
  {
    id: 1,
    productName: 'Dark Chocolate 55%',
    date: 'May 25, 2025',
    status: 'Published',
    comment: 'Excellent taste and premium quality chocolate!',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=200&auto=format&fit=crop&q=80'
  },
  {
    id: 2,
    productName: 'Honey with Almonds',
    date: 'May 18, 2025',
    status: 'Published',
    comment: 'Very pure honey and almonds are so good.',
    rating: 4,
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=200&auto=format&fit=crop&q=80'
  },
  {
    id: 3,
    productName: 'Nut Fusion Box',
    date: 'May 11, 2025',
    status: 'Published',
    comment: 'Amazing combination of nuts and chocolate.',
    rating: 4,
    image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=200&auto=format&fit=crop&q=80'
  },
  {
    id: 4,
    productName: 'Milk Chocolate Box',
    date: 'May 7, 2025',
    status: 'Published',
    comment: 'Smooth and delicious chocolate.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=200&auto=format&fit=crop&q=80'
  }
];

const TABS = ['All Reviews', 'Published', 'Pending'];

const Review = () => {
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [activeTab, setActiveTab] = useState('All Reviews');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  // Form states for modal
  const [formComment, setFormComment] = useState('');
  const [formRating, setFormRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 2500);
  };

  const handleOpenEdit = (review) => {
    setEditingReview(review);
    setFormComment(review.comment);
    setFormRating(review.rating);
    setIsEditModalOpen(true);
  };

  const handleSaveReview = (e) => {
    e.preventDefault();
    if (!formComment.trim()) return;

    setReviews((prev) =>
      prev.map((item) =>
        item.id === editingReview.id
          ? { ...item, comment: formComment, rating: formRating }
          : item
      )
    );

    setIsEditModalOpen(false);
    showToast('Review updated successfully!');
  };

  const filteredReviews = reviews.filter((rev) => {
    if (activeTab === 'All Reviews') return true;
    return rev.status.toLowerCase() === activeTab.toLowerCase();
  });

  return (
    <div className="reviews-wrapper">
      {/* Toast Notification */}
      {toastMessage && <div className="reviews-toast">{toastMessage}</div>}

      {/* Main Header */}
      <div className="reviews-header">
        <div className="reviews-header-icon-box">
          <FaStar className="reviews-header-star" />
        </div>
        <div className="reviews-header-info">
          <h1 className="reviews-main-title">My Reviews</h1>
          <p className="reviews-subtitle">
            Share your experience and help others. <span className="heart-emoji">❤️</span>
          </p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="reviews-tabs-bar">
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            className={`reviews-tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Reviews Cards List */}
      <div className="reviews-list">
        {filteredReviews.length > 0 ? (
          filteredReviews.map((rev) => (
            <div key={rev.id} className="reviews-card">
              {/* Product Image Frame */}
              <div className="reviews-img-frame">
                <img src={rev.image} alt={rev.productName} className="reviews-img" />
              </div>

              {/* Review Info Details */}
              <div className="reviews-details-box">
                <h3 className="reviews-product-title">{rev.productName}</h3>
                
                <div className="reviews-meta-row">
                  <FiCalendar className="calendar-icon" />
                  <span>Reviewed on {rev.date}</span>
                </div>

                <div className={`reviews-status-badge ${rev.status.toLowerCase()}`}>
                  {rev.status === 'Published' ? (
                    <FiCheck className="status-badge-icon" />
                  ) : (
                    <FiClock className="status-badge-icon" />
                  )}
                  <span>{rev.status}</span>
                </div>

                <p className="reviews-comment-text">{rev.comment}</p>
              </div>

              {/* Rating and Edit Action */}
              <div className="reviews-action-box">
                <div className="reviews-star-rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="star-unit">
                      {star <= rev.rating ? (
                        <FaStar className="star-icon filled" />
                      ) : (
                        <FiStar className="star-icon empty" />
                      )}
                    </span>
                  ))}
                </div>

                <button
                  type="button"
                  className="reviews-edit-btn"
                  onClick={() => handleOpenEdit(rev)}
                >
                  <FiEdit3 className="btn-edit-icon" /> Edit
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="reviews-empty-box">
            <FiMessageSquare className="empty-icon" />
            <p className="empty-title">No reviews found</p>
            <p className="empty-sub">You don&apos;t have any reviews under &quot;{activeTab}&quot;.</p>
          </div>
        )}
      </div>

      {/* Bottom Information Banner */}
      <div className="reviews-bottom-banner">
        <div className="reviews-bottom-left">
          <div className="reviews-bottom-icon-box">
            <FiMessageSquare className="bottom-chat-icon" />
          </div>
          <div className="reviews-bottom-text">
            <h4>Your opinion matters!</h4>
            <p>Keep reviewing and help us serve you better.</p>
          </div>
        </div>

        <div className="reviews-bottom-graphic">
          <div className="decorative-bag">
            <FiShoppingBag className="bag-icon" />
            <span className="bag-heart">❤️</span>
          </div>
        </div>
      </div>

      {/* Edit Review Modal */}
      {isEditModalOpen && editingReview && (
        <div className="reviews-modal-overlay" onClick={() => setIsEditModalOpen(false)}>
          <div className="reviews-modal" onClick={(e) => e.stopPropagation()}>
            <div className="reviews-modal-header">
              <div className="modal-title-group">
                <span className="modal-badge">Feedback</span>
                <h3>Edit Your Review</h3>
              </div>
              <button className="reviews-modal-close" onClick={() => setIsEditModalOpen(false)}>
                <FiX />
              </button>
            </div>

            <form onSubmit={handleSaveReview} className="reviews-modal-form">
              <div className="modal-product-summary">
                <img src={editingReview.image} alt={editingReview.productName} />
                <div>
                  <h4>{editingReview.productName}</h4>
                  <p>Reviewed on {editingReview.date}</p>
                </div>
              </div>

              {/* Interactive Star Selection */}
              <div className="reviews-form-group">
                <label className="form-label">Update Rating</label>
                <div className="interactive-stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      className="star-pick-btn"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setFormRating(star)}
                    >
                      {star <= (hoverRating || formRating) ? (
                        <FaStar className="star-icon filled large" />
                      ) : (
                        <FiStar className="star-icon empty large" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Review Text */}
              <div className="reviews-form-group">
                <label className="form-label">Review Comment</label>
                <textarea
                  rows="4"
                  required
                  className="reviews-textarea"
                  value={formComment}
                  onChange={(e) => setFormComment(e.target.value)}
                  placeholder="Share details of your experience with this product..."
                />
              </div>

              <div className="reviews-modal-actions">
                <button
                  type="button"
                  className="reviews-modal-btn cancel"
                  onClick={() => setIsEditModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="reviews-modal-btn submit">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Review;