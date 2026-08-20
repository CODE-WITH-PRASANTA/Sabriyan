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

  const handleQuantity = (id, delta) => {
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

  const handleRemove = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalPayable = Math.max(0, subtotal - discountAmount);

  return (
    <>
      {/* Semi-transparent dark overlay for background visibility */}
      <div
        className={`cart-sidebar-overlay ${isOpen ? 'active' : ''}`}
        onClick={onClose}
      />

      {/* Right Side Cart Sidebar */}
      <aside className={`cart-sidebar ${isOpen ? 'active' : ''}`}>
        {/* Header */}
        <div className="cart-sidebar-header">
          <div className="cart-sidebar-title-group">
            <ShoppingCart className="cart-sidebar-header-icon" size={22} />
            <div>
              <h2 className="cart-sidebar-title">My Cart ({totalItems})</h2>
              <p className="cart-sidebar-subtitle">{totalItems} items in your cart</p>
            </div>
          </div>
          <button onClick={onClose} className="cart-sidebar-close-btn" aria-label="Close">
            <X size={20} />
          </button>
        </div>

        {/* Products Scroll Area */}
        <div className="cart-sidebar-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-sidebar-item">
              <img src={item.image} alt={item.name} className="cart-sidebar-item-img" />

              <div className="cart-sidebar-item-info">
                <div>
                  <h3 className="cart-sidebar-item-name">{item.name}</h3>
                  <p className="cart-sidebar-item-weight">{item.weight}</p>
                </div>

                <div className="cart-sidebar-item-actions">
                  <div className="cart-sidebar-price-group">
                    <span className="cart-sidebar-price-current">₹{item.price}</span>
                    <span className="cart-sidebar-price-old">₹{item.originalPrice}</span>
                  </div>

                  <div className="cart-sidebar-qty">
                    <button
                      onClick={() => handleQuantity(item.id, -1)}
                      className="cart-sidebar-qty-btn"
                    >
                      <Minus size={11} />
                    </button>
                    <span className="cart-sidebar-qty-count">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantity(item.id, 1)}
                      className="cart-sidebar-qty-btn"
                    >
                      <Plus size={11} />
                    </button>
                  </div>

                  <span className="cart-sidebar-item-total">
                    ₹{item.price * item.quantity}
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleRemove(item.id)}
                className="cart-sidebar-item-remove"
                aria-label="Delete item"
              >
                <Trash2 size={15} />
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="cart-sidebar-footer">
          <div className="cart-sidebar-coupon">
            <Tag className="cart-sidebar-coupon-icon" size={15} />
            <input
              type="text"
              placeholder="Apply Coupon Code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="cart-sidebar-coupon-input"
            />
            <button className="cart-sidebar-coupon-btn">Apply</button>
          </div>

          {discountAmount > 0 && (
            <div className="cart-sidebar-coupon-applied">
              <span>🎉 <b>SABRIYANA10</b> applied successfully!</span>
              <button
                onClick={() => setDiscountAmount(0)}
                className="cart-sidebar-coupon-remove"
              >
                Remove
              </button>
            </div>
          )}

          <div className="cart-sidebar-bill">
            <div className="cart-sidebar-bill-row">
              <span>Subtotal ({totalItems} Items)</span>
              <span>₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            {discountAmount > 0 && (
              <div className="cart-sidebar-bill-row highlight">
                <span>Discount (SABRIYANA10)</span>
                <span>- ₹{discountAmount}</span>
              </div>
            )}
            <div className="cart-sidebar-bill-row highlight">
              <span>Shipping</span>
              <span>FREE</span>
            </div>
            <div className="cart-sidebar-bill-row total-row">
              <span>Total Amount</span>
              <span className="cart-sidebar-grand-total">₹{totalPayable.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <button className="cart-sidebar-checkout-btn">
            <Lock size={15} />
            Proceed to Checkout
          </button>

          <p className="cart-sidebar-shipping-tag">
            🚚 Free shipping on orders above ₹999
          </p>

          <div className="cart-sidebar-badges">
            <div className="cart-sidebar-badge">
              <ShieldCheck className="cart-sidebar-badge-icon" size={16} />
              <span className="cart-sidebar-badge-label">Secure Payment</span>
              <span className="cart-sidebar-badge-sublabel">100% Safe</span>
            </div>
            <div className="cart-sidebar-badge bordered">
              <Truck className="cart-sidebar-badge-icon" size={16} />
              <span className="cart-sidebar-badge-label">Fast Delivery</span>
              <span className="cart-sidebar-badge-sublabel">Across India</span>
            </div>
            <div className="cart-sidebar-badge">
              <RotateCcw className="cart-sidebar-badge-icon" size={16} />
              <span className="cart-sidebar-badge-label">Easy Returns</span>
              <span className="cart-sidebar-badge-sublabel">Hassle Free</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Cart;