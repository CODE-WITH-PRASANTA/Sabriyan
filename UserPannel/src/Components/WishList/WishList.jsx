import React, { useState } from 'react';
import './WishList.css';
import { 
  FiShoppingBag, 
  FiShoppingCart, 
  FiTrash2, 
  FiHeart 
} from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';

const INITIAL_WISHLIST = [
  {
    id: 1,
    name: 'Dark Chocolate 70%',
    price: 450,
    inStock: true,
    isFavorite: true,
    image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=200&auto=format&fit=crop&q=80'
  },
  {
    id: 2,
    name: 'Honey with Almonds',
    price: 790,
    inStock: true,
    isFavorite: false,
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=200&auto=format&fit=crop&q=80'
  },
  {
    id: 3,
    name: 'Chocolate Truffles Box',
    price: 1150,
    inStock: true,
    isFavorite: false,
    image: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?w=200&auto=format&fit=crop&q=80'
  },
  {
    id: 4,
    name: 'Raw Forest Honey',
    price: 499,
    inStock: true,
    isFavorite: false,
    image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=200&auto=format&fit=crop&q=80'
  },
  {
    id: 5,
    name: 'Chocolate Gift Hamper',
    price: 1890,
    inStock: true,
    isFavorite: false,
    image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=200&auto=format&fit=crop&q=80'
  }
];

const WishList = () => {
  const [items, setItems] = useState(INITIAL_WISHLIST);
  const [notification, setNotification] = useState('');

  const triggerToast = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification('');
    }, 2400);
  };

  const toggleFavorite = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
      )
    );
  };

  const removeFromWishlist = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    triggerToast('Item removed from wishlist');
  };

  const clearAll = () => {
    if (items.length === 0) return;
    setItems([]);
    triggerToast('All items removed from wishlist');
  };

  const addToCart = (product) => {
    triggerToast(`Added "${product.name}" to cart`);
  };

  const moveAllToCart = () => {
    if (items.length === 0) return;
    triggerToast(`Moved ${items.length} item(s) to cart`);
  };

  return (
    <div className="wishlist-wrapper">
      {notification && <div className="wishlist-toast">{notification}</div>}

      <div className="wishlist-header">
        <div className="wishlist-header-icon-box">
          <FiHeart className="wishlist-header-heart" />
        </div>
        <div className="wishlist-header-info">
          <h1 className="wishlist-title">My Wishlist</h1>
          <p className="wishlist-subtitle">
            Your favourite picks, saved for later. <span className="heart-emoji">❤️</span>
          </p>
        </div>
      </div>

      <div className="wishlist-action-bar">
        <div className="wishlist-count-badge">
          <FiShoppingBag className="wishlist-badge-icon" />
          <span>{items.length} Items</span>
        </div>

        <div className="wishlist-top-btn-group">
          <button 
            type="button" 
            className="wishlist-outline-btn" 
            onClick={moveAllToCart}
            disabled={items.length === 0}
          >
            <FiShoppingCart /> Move All to Cart
          </button>
          <button 
            type="button" 
            className="wishlist-icon-delete-btn" 
            onClick={clearAll}
            disabled={items.length === 0}
            title="Clear Wishlist"
          >
            <FiTrash2 />
          </button>
        </div>
      </div>

      <div className="wishlist-items-container">
        {items.length > 0 ? (
          items.map((item) => (
            <div key={item.id} className="wishlist-card">
              <div className="wishlist-card-left">
                <div className="wishlist-image-frame">
                  <img src={item.image} alt={item.name} className="wishlist-img" />
                </div>
                <div className="wishlist-product-info">
                  <h3 className="wishlist-product-name">{item.name}</h3>
                  <div className="wishlist-product-price">
                    ₹ {item.price.toLocaleString()}
                  </div>
                  <div className="wishlist-stock-status">
                    <span className="stock-dot"></span>
                    <span className="stock-label">In Stock</span>
                  </div>
                </div>
              </div>

              <div className="wishlist-card-right">
                <button
                  type="button"
                  className="wishlist-add-cart-btn"
                  onClick={() => addToCart(item)}
                >
                  <FiShoppingCart /> Add to Cart
                </button>
                <button
                  type="button"
                  className={`wishlist-heart-btn ${item.isFavorite ? 'filled' : ''}`}
                  onClick={() => toggleFavorite(item.id)}
                  title="Toggle favorite"
                >
                  {item.isFavorite ? (
                    <FaHeart className="heart-icon-filled" />
                  ) : (
                    <FiHeart className="heart-icon-empty" />
                  )}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="wishlist-empty-box">
            <FiHeart className="empty-icon" />
            <p className="empty-title">Your wishlist is empty</p>
            <p className="empty-subtitle">Explore products and add items you love to your wishlist.</p>
          </div>
        )}
      </div>

      {items.length > 0 && (
        <div className="wishlist-bottom-banner">
          <div className="wishlist-bottom-left">
            <div className="wishlist-bottom-icon-frame">
              <span className="bottom-bag-icon">🛍️</span>
            </div>
            <div className="wishlist-bottom-text">
              <h4>Love it? Add items to cart and make them yours.</h4>
              <p>Premium quality products, made with love. ✨</p>
            </div>
          </div>
          <button 
            type="button" 
            className="wishlist-solid-btn"
            onClick={moveAllToCart}
          >
            <FiShoppingCart /> Move All to Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default WishList;