import React, { useState } from 'react';
import './MyWishlist.css';
import { 
  FiHome, 
  FiChevronRight, 
  FiHeart, 
  FiShoppingCart, 
  FiShare2, 
  FiShield, 
  FiTruck, 
  FiRefreshCw, 
  FiGrid, 
  FiList, 
  FiArrowRight, 
  FiChevronDown 
} from 'react-icons/fi';
import { FaHeart, FaStar } from 'react-icons/fa';
import { GiHoneycomb, GiChocolateBar, GiCoffeeBeans, GiIndiaGate } from 'react-icons/gi';

const initialItems = [
  {
    id: 1,
    title: 'Acacia Honey',
    weight: '500g',
    rating: 4.8,
    reviews: 128,
    price: 573,
    originalPrice: 699,
    discount: '18% OFF',
    tag: 'Best Seller',
    tagType: 'green',
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=600&q=80',
    selected: false,
    isLiked: true
  },
  {
    id: 2,
    title: 'Dark Chocolate 55%',
    weight: '200g',
    rating: 4.9,
    reviews: 98,
    price: 199,
    originalPrice: 249,
    tag: 'Pure & Organic',
    tagType: 'gold',
    image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=600&q=80',
    selected: false,
    isLiked: true
  },
  {
    id: 3,
    title: 'Chocolate Truffles Box',
    weight: '9 Pieces',
    rating: 4.8,
    reviews: 78,
    price: 350,
    originalPrice: 450,
    tag: 'Premium',
    tagType: 'purple',
    image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=600&q=80',
    selected: false,
    isLiked: true
  },
  {
    id: 4,
    title: 'Wildflower Honey',
    weight: '500g',
    rating: 4.7,
    reviews: 96,
    price: 450,
    originalPrice: 650,
    tag: 'Best Seller',
    tagType: 'green',
    image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=600&q=80',
    selected: false,
    isLiked: true
  },
  {
    id: 5,
    title: 'Honey with Almonds',
    weight: '250g',
    rating: 4.6,
    reviews: 42,
    price: 270,
    originalPrice: 320,
    tag: 'Pure & Organic',
    tagType: 'gold',
    image: 'https://images.unsplash.com/photo-1587049352851-8d4e8913a0e6?auto=format&fit=crop&w=600&q=80',
    selected: false,
    isLiked: true
  },
  {
    id: 6,
    title: 'Chocolate Gift Hamper',
    weight: '1 Unit',
    rating: 4.9,
    reviews: 64,
    price: 1800,
    originalPrice: 2200,
    tag: 'Premium',
    tagType: 'purple',
    image: 'https://images.unsplash.com/photo-1526081347589-7fa3cb41b4b2?auto=format&fit=crop&w=600&q=80',
    selected: false,
    isLiked: true
  },
  {
    id: 7,
    title: 'Organic Raw Honey',
    weight: '500g',
    rating: 4.8,
    reviews: 112,
    price: 499,
    originalPrice: 599,
    tag: 'Organic',
    tagType: 'green-outline',
    image: 'https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&w=600&q=80',
    selected: false,
    isLiked: true
  },
  {
    id: 8,
    title: 'Milk Chocolate 40%',
    weight: '200g',
    rating: 4.6,
    reviews: 35,
    price: 179,
    originalPrice: 220,
    tag: 'New',
    tagType: 'blue',
    image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&w=600&q=80',
    selected: false,
    isLiked: true
  }
];

export default function MyWishlist() {
  const [items, setItems] = useState(initialItems);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('Recently Added');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const isAllSelected = items.length > 0 && items.every((item) => item.selected);

  const toggleSelectAll = () => {
    const nextState = !isAllSelected;
    setItems(items.map((item) => ({ ...item, selected: nextState })));
  };

  const toggleItemSelect = (id) => {
    setItems(items.map((item) => (item.id === id ? { ...item, selected: !item.selected } : item)));
  };

  const toggleLike = (id, title) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          const nextLike = !item.isLiked;
          showToast(nextLike ? `Added ${title} to wishlist` : `Removed ${title} from wishlist`);
          return { ...item, isLiked: nextLike };
        }
        return item;
      })
    );
  };

  const handleAddToCart = (title) => {
    showToast(`Added "${title}" to cart!`);
  };

  const handleAddAllToCart = () => {
    const selected = items.filter((i) => i.selected);
    const count = selected.length > 0 ? selected.length : items.length;
    showToast(`Added ${count} items to your cart!`);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Wishlist link copied to clipboard!');
  };

  const handleSort = (option) => {
    setSortBy(option);
    setIsSortOpen(false);
    let sorted = [...items];
    if (option === 'Price: Low to High') sorted.sort((a, b) => a.price - b.price);
    if (option === 'Price: High to Low') sorted.sort((a, b) => b.price - a.price);
    if (option === 'Highest Rated') sorted.sort((a, b) => b.rating - a.rating);
    if (option === 'Recently Added') sorted = [...initialItems];
    setItems(sorted);
  };

  const totalCalculated = items.reduce((acc, curr) => acc + curr.price, 0);

  return (
    <div className="my-wishlist">
      {/* Toast Notification */}
      {toastMessage && <div className="my-wishlist-toast">{toastMessage}</div>}

      {/* Top Ambience Hero Banner with Honey Jar & Flowers */}
      <div className="my-wishlist-hero-banner">
        <img 
          src="https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=1600&q=85" 
          alt="Honey with Jasmine Flowers Banner" 
          className="my-wishlist-hero-image"
        />
        <div className="my-wishlist-hero-gradient-overlay" />
      </div>

      <div className="my-wishlist-container">
        {/* Breadcrumb Navigation */}
        <nav className="my-wishlist-breadcrumb">
          <FiHome className="my-wishlist-crumb-icon" />
          <span>Home</span>
          <FiChevronRight className="my-wishlist-crumb-separator" />
          <span className="my-wishlist-crumb-current">Wishlist</span>
        </nav>

        {/* Title Header */}
        <div className="my-wishlist-header">
          <div className="my-wishlist-header-left">
            <h1 className="my-wishlist-title">
              My Wishlist <FiHeart className="my-wishlist-title-heart" />
            </h1>
            <p className="my-wishlist-subtitle">You have {items.length} items in your wishlist</p>
          </div>
        </div>

        {/* Top Control Bar */}
        <div className="my-wishlist-controls">
          <label className="my-wishlist-checkbox-label">
            <input
              type="checkbox"
              checked={isAllSelected}
              onChange={toggleSelectAll}
              className="my-wishlist-custom-checkbox"
            />
            <span className="my-wishlist-checkbox-text">Select All</span>
          </label>

          <div className="my-wishlist-controls-right">
            {/* Sort Dropdown */}
            <div className="my-wishlist-sort-wrapper">
              <span className="my-wishlist-sort-label">Sort by:</span>
              <button 
                className="my-wishlist-sort-btn" 
                onClick={() => setIsSortOpen(!isSortOpen)}
                aria-expanded={isSortOpen}
              >
                <span>{sortBy}</span>
                <FiChevronDown className={`my-wishlist-sort-chevron ${isSortOpen ? 'open' : ''}`} />
              </button>

              {isSortOpen && (
                <div className="my-wishlist-sort-menu">
                  {['Recently Added', 'Price: Low to High', 'Price: High to Low', 'Highest Rated'].map((option) => (
                    <button
                      key={option}
                      className={`my-wishlist-sort-option ${sortBy === option ? 'active' : ''}`}
                      onClick={() => handleSort(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Grid/List Switcher */}
            <div className="my-wishlist-view-toggles">
              <button
                className={`my-wishlist-view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
                aria-label="Grid View"
              >
                <FiGrid />
              </button>
              <button
                className={`my-wishlist-view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
                aria-label="List View"
              >
                <FiList />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="my-wishlist-content-grid">
          {/* Products Grid */}
          <div className={`my-wishlist-products-wrapper ${viewMode === 'list' ? 'list-layout' : ''}`}>
            {items.map((item) => (
              <div 
                key={item.id} 
                className={`my-wishlist-card ${item.selected ? 'selected-card' : ''}`}
              >
                {/* Checkbox & Favorite Heart */}
                <div className="my-wishlist-card-topbar">
                  <input
                    type="checkbox"
                    checked={item.selected}
                    onChange={() => toggleItemSelect(item.id)}
                    className="my-wishlist-custom-checkbox"
                  />
                  <button
                    className="my-wishlist-heart-btn"
                    onClick={() => toggleLike(item.id, item.title)}
                    aria-label="Toggle favorite"
                  >
                    {item.isLiked ? (
                      <FaHeart className="my-wishlist-heart-icon filled" />
                    ) : (
                      <FiHeart className="my-wishlist-heart-icon" />
                    )}
                  </button>
                </div>

                {/* Card Image */}
                <div className="my-wishlist-image-container">
                  <img src={item.image} alt={item.title} className="my-wishlist-product-img" />
                </div>

                {/* Tag Badge */}
                {item.tag && (
                  <div className="my-wishlist-badge-row">
                    <span className={`my-wishlist-tag tag-${item.tagType}`}>{item.tag}</span>
                  </div>
                )}

                {/* Details */}
                <div className="my-wishlist-info">
                  <h3 className="my-wishlist-product-name">{item.title}</h3>
                  <p className="my-wishlist-product-weight">{item.weight}</p>

                  <div className="my-wishlist-rating-row">
                    <div className="my-wishlist-stars">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={i < Math.floor(item.rating) ? 'star-filled' : 'star-empty'}
                        />
                      ))}
                    </div>
                    <span className="my-wishlist-rating-text">
                      {item.rating} ({item.reviews})
                    </span>
                  </div>

                  <div className="my-wishlist-price-row">
                    <span className="my-wishlist-current-price">₹{item.price.toLocaleString('en-IN')}</span>
                    {item.originalPrice && (
                      <span className="my-wishlist-old-price">₹{item.originalPrice.toLocaleString('en-IN')}</span>
                    )}
                    {item.discount && <span className="my-wishlist-discount-pill">{item.discount}</span>}
                  </div>

                  <button
                    className="my-wishlist-add-btn"
                    onClick={() => handleAddToCart(item.title)}
                  >
                    Add to Cart <FiShoppingCart className="my-wishlist-cart-icon" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right Summary Sidebar */}
          <aside className="my-wishlist-sidebar">
            <div className="my-wishlist-summary-card">
              <div className="my-wishlist-summary-header">
                <FiHeart className="my-wishlist-gold-icon" />
                <h3>Wishlist Summary</h3>
              </div>

              <div className="my-wishlist-summary-row">
                <span>Total Items ({items.length})</span>
                <span className="my-wishlist-bold-val">{items.length}</span>
              </div>

              <div className="my-wishlist-summary-row">
                <span>Estimated Total</span>
                <span className="my-wishlist-bold-val">₹{totalCalculated.toLocaleString('en-IN')}</span>
              </div>

              <button className="my-wishlist-primary-btn" onClick={handleAddAllToCart}>
                Add All To Cart <FiShoppingCart />
              </button>

              <button className="my-wishlist-secondary-btn" onClick={handleShare}>
                <FiShare2 /> Share Wishlist
              </button>

              <div className="my-wishlist-perks">
                <div className="my-wishlist-perk-item">
                  <FiShield className="my-wishlist-perk-icon" />
                  <div>
                    <h4>100% Secure</h4>
                    <p>Your data is protected</p>
                  </div>
                </div>
                <div className="my-wishlist-perk-item">
                  <FiTruck className="my-wishlist-perk-icon" />
                  <div>
                    <h4>Free Shipping</h4>
                    <p>On orders above ₹999</p>
                  </div>
                </div>
                <div className="my-wishlist-perk-item">
                  <FiRefreshCw className="my-wishlist-perk-icon" />
                  <div>
                    <h4>Easy Returns</h4>
                    <p>Hassle free returns</p>
                  </div>
                </div>
              </div>

              {/* Share Gift Card */}
              <div className="my-wishlist-share-card">
                <div className="my-wishlist-gift-icon-box">🎁</div>
                <div className="my-wishlist-share-text">
                  <h4>Good things are better when shared!</h4>
                  <p>Share your wishlist with your loved ones.</p>
                </div>
                <button className="my-wishlist-share-action" onClick={handleShare}>
                  <span>Share Now</span>
                  <FiArrowRight />
                </button>
              </div>
            </div>
          </aside>
        </div>

        {/* Bottom Feature Badges */}
        <div className="my-wishlist-footer-features">
          <div className="my-wishlist-feature-box">
            <GiHoneycomb className="my-wishlist-feature-icon" />
            <div>
              <h5>Premium Ingredients</h5>
              <p>Finest quality sourced</p>
            </div>
          </div>
          <div className="my-wishlist-feature-box">
            <GiChocolateBar className="my-wishlist-feature-icon" />
            <div>
              <h5>No Refined Sugar</h5>
              <p>Healthier choice</p>
            </div>
          </div>
          <div className="my-wishlist-feature-box">
            <GiCoffeeBeans className="my-wishlist-feature-icon" />
            <div>
              <h5>Bean to Bar Crafted</h5>
              <p>Crafted with passion</p>
            </div>
          </div>
          <div className="my-wishlist-feature-box">
            <GiIndiaGate className="my-wishlist-feature-icon" />
            <div>
              <h5>Made in India</h5>
              <p>Proudly Indian</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}