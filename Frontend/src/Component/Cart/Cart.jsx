import React, { useState } from 'react';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingCart,
  Tag,
  ShieldCheck,
  Truck,
  RotateCcw,
  Lock,
} from 'lucide-react';
import './Cart.css';

const INITIAL_CART = [
  {
    id: 1,
    name: 'Dark Chocolate 55%',
    weight: '200g',
    price: 199,
    originalPrice: 249,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 2,
    name: 'Raw Forest Honey',
    weight: '500g',
    price: 499,
    originalPrice: 599,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 3,
    name: 'Chocolate Truffles Box',
    weight: '9 Pieces',
    price: 350,
    originalPrice: 450,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 4,
    name: 'Chocolate Gift Hamper',
    weight: '1 Unit',
    price: 1800,
    originalPrice: 2200,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=150&auto=format&fit=crop&q=80',
  },
];

const Cart = ({ isOpen, onClose }) => {
  const [cartItems, setCartItems] = useState(INITIAL_CART);
  const [couponCode, setCouponCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(200);

  const handleQuantityChange = (id, delta) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const totalItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalPayable = Math.max(0, subtotal - discountAmount);

  return (
    <>
      {/* Backdrop for click outside to close */}
      <div
        className={`cart-backdrop ${isOpen ? 'open' : ''}`}
        onClick={onClose}
      />

      {/* Slide Drawer from Right */}
      <aside className={`cart-panel ${isOpen ? 'open' : ''}`}>
        {/* Header */}
        <div className="cart-header">
          <div className="cart-header-title-group">
            <ShoppingCart className="cart-header-icon" size={22} />
            <div>
              <h2 className="cart-header-title">My Cart ({totalItemCount})</h2>
              <p className="cart-header-subtitle">{totalItemCount} items in your cart</p>
            </div>
          </div>
          <button onClick={onClose} className="cart-close-btn" aria-label="Close cart">
            <X size={20} />
          </button>
        </div>

        {/* Product Items List */}
        <div className="cart-items-container">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item-row">
              <img src={item.image} alt={item.name} className="cart-item-thumbnail" />

              <div className="cart-item-info">
                <div>
                  <h3 className="cart-item-heading">{item.name}</h3>
                  <p className="cart-item-unit">{item.weight}</p>
                </div>

                <div className="cart-item-actions">
                  <div className="cart-item-price-wrap">
                    <span className="cart-item-price-active">₹{item.price}</span>
                    <span className="cart-item-price-strike">₹{item.originalPrice}</span>
                  </div>

                  <div className="cart-qty-counter">
                    <button
                      onClick={() => handleQuantityChange(item.id, -1)}
                      className="cart-qty-btn"
                    >
                      <Minus size={11} />
                    </button>
                    <span className="cart-qty-value">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, 1)}
                      className="cart-qty-btn"
                    >
                      <Plus size={11} />
                    </button>
                  </div>

                  <span className="cart-item-subtotal">
                    ₹{item.price * item.quantity}
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleRemoveItem(item.id)}
                className="cart-item-remove-btn"
                aria-label="Remove item"
              >
                <Trash2 size={15} />
              </button>
            </div>
          ))}
        </div>

        {/* Footer & Checkout Panel */}
        <div className="cart-footer-panel">
          <div className="cart-coupon-form">
            <Tag className="cart-coupon-badge-icon" size={15} />
            <input
              type="text"
              placeholder="Apply Coupon Code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="cart-coupon-textfield"
            />
            <button className="cart-coupon-submit-btn">Apply</button>
          </div>

          {discountAmount > 0 && (
            <div className="cart-coupon-alert">
              <span className="cart-coupon-alert-text">
                🎉 <b>SABRIYANA10</b> applied successfully!
              </span>
              <button
                onClick={() => setDiscountAmount(0)}
                className="cart-coupon-remove"
              >
                Remove
              </button>
            </div>
          )}

          <div className="cart-bill-summary">
            <div className="cart-bill-row">
              <span>Subtotal ({totalItemCount} Items)</span>
              <span>₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            {discountAmount > 0 && (
              <div className="cart-bill-row promo">
                <span>Discount (SABRIYANA10)</span>
                <span>- ₹{discountAmount}</span>
              </div>
            )}
            <div className="cart-bill-row free-tag">
              <span>Shipping</span>
              <span>FREE</span>
            </div>
            <div className="cart-bill-row final-total">
              <span>Total Amount</span>
              <span className="cart-grand-amount">₹{totalPayable.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <button className="cart-checkout-action-btn">
            <Lock size={15} />
            Proceed to Checkout
          </button>

          <p className="cart-shipping-notice">
            🚚 Free shipping on orders above ₹999
          </p>

          <div className="cart-badges-grid">
            <div className="cart-badge-cell">
              <ShieldCheck className="cart-badge-symbol" size={16} />
              <span className="cart-badge-lbl">Secure Payment</span>
              <span className="cart-badge-sublbl">100% Safe</span>
            </div>
            <div className="cart-badge-cell divider">
              <Truck className="cart-badge-symbol" size={16} />
              <span className="cart-badge-lbl">Fast Delivery</span>
              <span className="cart-badge-sublbl">Across India</span>
            </div>
            <div className="cart-badge-cell">
              <RotateCcw className="cart-badge-symbol" size={16} />
              <span className="cart-badge-lbl">Easy Returns</span>
              <span className="cart-badge-sublbl">Hassle Free</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Cart;