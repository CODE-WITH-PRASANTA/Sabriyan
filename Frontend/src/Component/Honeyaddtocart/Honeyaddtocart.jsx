import React, { useState, useRef } from 'react';
import './Honeyaddtocart.css';

import mainHoneyImg from '../../assets/chocolate.png';
import thumb1 from '../../assets/honey-2.png';
import thumb2 from '../../assets/chocolate.png';
import thumb3 from '../../assets/honey-2.png';
import thumb4 from '../../assets/chocolate.png';
import thumb5 from '../../assets/honey-2.png';

import recHoney1 from '../../assets/chocolate.png';
import recHoney2 from '../../assets/honey-2.png';
import recHoney3 from '../../assets/chocolate.png';
import recHoney4 from '../../assets/honey-2.png';

const Honeyaddtocart = () => {
  const [quantity, setQuantity] = useState(1);
  const [cartCount, setCartCount] = useState(4);
  const [activeTab, setActiveTab] = useState('Product Details');
  const [isWishlisted, setIsWishlisted] = useState(false);

  // 360° View States
  const [is360Active, setIs360Active] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);
  const isDragging = useRef(false);
  const startX = useRef(0);

  // 360 रोटेशन फ्रेम्स (इन्हीं फ्रेम्स पर इमेज रोटेट होगी)
  const rotationFrames = [
    mainHoneyImg,
    thumb1,
    thumb2,
    thumb3,
    thumb4
  ];

  const [selectedImg, setSelectedImg] = useState(mainHoneyImg);

  const thumbnails = [
    thumb1,
    thumb2,
    thumb3,
    thumb4
  ];

  // 360 Drag Handlers
  const handleMouseDown = (e) => {
    if (!is360Active) return;
    isDragging.current = true;
    startX.current = e.clientX || (e.touches && e.touches[0].clientX);
  };

  const handleMouseMove = (e) => {
    if (!is360Active || !isDragging.current) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const diff = clientX - startX.current;

    // हर 20px ड्रैग पर फ्रेम बदलेगा
    if (Math.abs(diff) > 20) {
      if (diff > 0) {
        setCurrentFrame((prev) => (prev + 1) % rotationFrames.length);
      } else {
        setCurrentFrame((prev) => (prev - 1 + rotationFrames.length) % rotationFrames.length);
      }
      startX.current = clientX;
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const toggle360 = () => {
    setIs360Active((prev) => !prev);
  };

  const handleDecrease = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleAddToCart = () => {
    setCartCount((prev) => prev + quantity);
    alert(`${quantity} Acacia Honey (500g) कार्ट में जोड़ दिया गया है!`);
  };

  const handleBuyNow = () => {
    window.location.href = '/checkout';
  };

  const recommendedProducts = [
    { title: 'Raw Forest Honey', weight: '500g', price: '₹499', old: '₹599', rating: '4.8 (96)', img: recHoney1 },
    { title: 'Wildflower Honey', weight: '500g', price: '₹450', old: '₹550', rating: '4.9 (78)', img: recHoney2 },
    { title: 'Honey with Almonds', weight: '250g', price: '₹270', old: '₹320', rating: '4.7 (42)', img: recHoney3 },
    { title: 'Tulsi Honey', weight: '500g', price: '₹475', old: '₹575', rating: '4.9 (64)', img: recHoney4 }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Product Details':
        return (
          <div className="tab-pane">
            <h2 className="info-heading">About Acacia Honey</h2>
            <p className="info-description">
              Our Acacia Honey is harvested from the nectar of acacia blossoms in pristine forests. It has a light, delicate flavor with a smooth texture, rich in antioxidants and nutrients.
            </p>
            <ul className="benefits-list">
              <li><span>✔</span> Boosts Immunity</li>
              <li><span>✔</span> Rich in Antioxidants</li>
              <li><span>✔</span> Good for Skin & Hair</li>
              <li><span>✔</span> Aids in Weight Management</li>
            </ul>
          </div>
        );

      case 'Benefits':
        return (
          <div className="tab-pane">
            <h2 className="info-heading">Health Benefits</h2>
            <p className="info-description">
              Packed with natural vitamins, minerals, and enzymes that support overall vitality and wellness.
            </p>
            <ul className="benefits-list">
              <li><span>✔</span> <strong>Natural Energy Booster:</strong> Provides clean carbohydrates without sugar crashes.</li>
              <li><span>✔</span> <strong>Soothes Cough & Throat:</strong> Natural antimicrobial properties provide instant throat relief.</li>
              <li><span>✔</span> <strong>Aids Digestion:</strong> Active enzymes improve gut health and nutrient absorption.</li>
              <li><span>✔</span> <strong>Skin Glow:</strong> Can be applied topically for hydrated, radiant skin.</li>
            </ul>
          </div>
        );

      case 'How to Use':
        return (
          <div className="tab-pane">
            <h2 className="info-heading">Suggested Usage</h2>
            <p className="info-description">
              Versatile and mild sweetness that blends effortlessly into your everyday diet.
            </p>
            <ul className="benefits-list">
              <li><span>🥄</span> Mix 1-2 teaspoons with warm lemon water every morning.</li>
              <li><span>🍵</span> Use as a healthy natural sweetener in green tea, coffee, or smoothies.</li>
              <li><span>🥞</span> Drizzle over pancakes, waffles, yogurt bowls, or oatmeal.</li>
              <li><span>🥗</span> Whisk into salad dressings and marinades for a gourmet touch.</li>
            </ul>
          </div>
        );

      case 'Ingredients':
        return (
          <div className="tab-pane">
            <h2 className="info-heading">Pure Ingredients</h2>
            <p className="info-description">
              Single-origin purity with no added chemicals, artificial preservatives, or corn syrup.
            </p>
            <ul className="benefits-list">
              <li><span>🌿</span> 100% Pure Raw Acacia Flower Honey</li>
              <li><span>🚫</span> Zero Preservatives, Colors, or Added Flavors</li>
              <li><span>🍃</span> Cold-extracted & unpasteurized to preserve active bee pollen</li>
            </ul>
          </div>
        );

      case 'Reviews (128)':
        return (
          <div className="tab-pane">
            <h2 className="info-heading">Customer Reviews (4.8 / 5)</h2>
            <div className="review-list">
              <div className="review-item">
                <div className="review-header">
                  <strong>Pooja S.</strong>
                  <span className="review-stars">★★★★★</span>
                </div>
                <p className="review-text">"Best honey I've ordered online. Very light texture and natural floral aroma."</p>
              </div>
              <div className="review-item">
                <div className="review-header">
                  <strong>Rohit K.</strong>
                  <span className="review-stars">★★★★★</span>
                </div>
                <p className="review-text">"Packaging is very premium. Perfect alternative to refined sugar in my morning tea."</p>
              </div>
            </div>
          </div>
        );

      case 'FAQ':
        return (
          <div className="tab-pane">
            <h2 className="info-heading">Frequently Asked Questions</h2>
            <div className="faq-list">
              <div className="faq-item">
                <strong>Q: Does this honey crystallize over time?</strong>
                <p>A: Acacia honey has high fructose content and crystallizes much slower than other varieties. Crystallization is a natural sign of purity.</p>
              </div>
              <div className="faq-item">
                <strong>Q: What is the shelf life?</strong>
                <p>A: 24 months from the date of packaging. Store at room temperature away from direct sunlight.</p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="luxury-store">
      <div className="breadcrumb">
        <span>🏠 Home</span> &gt; <span>Honey</span> &gt; <span>Pure & Organic Honey</span> &gt; <span className="active">Acacia Honey</span>
      </div>

      <div className="product-layout">
        {/* Gallery */}
        <div className="gallery-section">
          <div className="thumbnail-column">
            {thumbnails.map((thumb, idx) => (
              <div
                key={idx}
                className={`thumb-card ${!is360Active && selectedImg === thumb ? 'selected' : ''}`}
                onClick={() => {
                  setIs360Active(false);
                  setSelectedImg(thumb);
                }}
              >
                <img src={thumb} alt={`Thumbnail ${idx + 1}`} />
              </div>
            ))}
            <div 
              className={`thumb-card video-thumb-card ${!is360Active && selectedImg === thumb5 ? 'selected' : ''}`}
              onClick={() => {
                setIs360Active(false);
                setSelectedImg(thumb5);
              }}
            >
              <img src={thumb5} alt="Video Thumbnail" />
              <div className="play-overlay">▶</div>
            </div>
          </div>

          {/* Interactive 360 Display Card */}
          <div 
            className={`main-display-card ${is360Active ? 'drag-active' : ''}`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleMouseDown}
            onTouchMove={handleMouseMove}
            onTouchEnd={handleMouseUp}
          >
            <button
              className={`wishlist-heart ${isWishlisted ? 'liked' : ''}`}
              onClick={() => setIsWishlisted(!isWishlisted)}
              aria-label="Wishlist"
            >
              {isWishlisted ? '♥' : '♡'}
            </button>

            <img 
              src={is360Active ? rotationFrames[currentFrame] : selectedImg} 
              alt="Acacia Honey" 
              className="main-featured-image no-select" 
              draggable="false"
            />

            {is360Active && (
              <div className="drag-hint">
                <span>⟵ Drag left/right to rotate 360° ⟶</span>
              </div>
            )}

            <button 
              className={`view-360-badge ${is360Active ? 'active-badge' : ''}`}
              onClick={toggle360}
            >
              {is360Active ? '✕ Close 360°' : '360°'}
            </button>
          </div>
        </div>

        {/* Details Section */}
        <div className="details-section">
          <div className="tag-badges">
            <span className="badge badge-green">Best Seller</span>
            <span className="badge badge-gold">Pure & Organic</span>
          </div>

          <h1 className="item-title">Acacia Honey</h1>
          <p className="item-weight">500g</p>

          <div className="rating-row">
            <span className="stars">★★★★★</span>
            <span className="rating-text">4.8 (128 Reviews)</span>
            <span className="divider">|</span>
            <span className="sales-text">125+ Sold</span>
          </div>

          <div className="price-row">
            <span className="currency-price">₹573</span>
            <span className="old-price">₹699</span>
            <span className="discount-tag">18% OFF</span>
          </div>

          <p className="item-desc">
            Light, sweetest & perfect for a healthy lifestyle. Harvested from the finest acacia blossoms for natural purity and rich taste.
          </p>

          <div className="feature-grid">
            <div className="feature-item"><span>🍃</span> 100% Natural</div>
            <div className="feature-item"><span>🚫</span> No Added Sugar</div>
            <div className="feature-item"><span>🍯</span> Raw & Unheated</div>
            <div className="feature-item"><span>🧪</span> Chemical Free</div>
          </div>

          <div className="purchase-controls">
            <div className="qty-selector">
              <span className="qty-label">Quantity:</span>
              <div className="qty-box">
                <button onClick={handleDecrease}>−</button>
                <span>{quantity}</span>
                <button onClick={handleIncrease}>+</button>
              </div>
            </div>

            <button className="gold-btn cart-action" onClick={handleAddToCart}>
              Add to Cart 🛒
            </button>

            <button className="outline-gold-btn buy-action" onClick={handleBuyNow}>
              Buy Now ⚡
            </button>
          </div>

          <div className="free-shipping-bar">
            🚚 Free Shipping on orders above ₹999
          </div>

          <div className="trust-badges">
            <div className="trust-item">
              <span className="trust-icon">🛡️</span>
              <div>
                <strong>Secure Payment</strong>
                <p>100% Safe</p>
              </div>
            </div>
            <div className="trust-item">
              <span className="trust-icon">⚡</span>
              <div>
                <strong>Fast Delivery</strong>
                <p>2-5 Business Days</p>
              </div>
            </div>
            <div className="trust-item">
              <span className="trust-icon">🔄</span>
              <div>
                <strong>Easy Returns</strong>
                <p>Hassle Free</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="info-tabs">
        {['Product Details', 'Benefits', 'How to Use', 'Ingredients', 'Reviews (128)', 'FAQ'].map((tab) => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? 'tab-active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Bottom Dynamic Section */}
      <div className="bottom-grid">
        <div className="info-card">
          <div className="info-text-side">
            {renderTabContent()}
          </div>
          <div className="info-image-side">
            <img src={thumb3} alt="Honey Dipper" />
          </div>
        </div>

        <div className="recommendations-container">
          <div className="rec-header">
            <h2 className="rec-title">You May Also Like</h2>
            <div className="slider-arrows">
              <button className="arrow-btn" aria-label="Previous">‹</button>
              <button className="arrow-btn" aria-label="Next">›</button>
            </div>
          </div>

          <div className="recommendation-cards">
            {recommendedProducts.map((prod, i) => (
              <div key={i} className="mini-card">
                <div className="mini-card-img-wrap">
                  <img src={prod.img} alt={prod.title} />
                </div>
                <h3 className="mini-title">{prod.title}</h3>
                <p className="mini-weight">{prod.weight}</p>
                <div className="mini-stars">★★★★★ <span>({prod.rating.split(' ')[1] || '96'})</span></div>
                <div className="mini-price-row">
                  <div>
                    <span className="m-price">{prod.price}</span>
                    <span className="m-old">{prod.old}</span>
                  </div>
                  <button className="mini-cart-btn" onClick={() => setCartCount((c) => c + 1)}>🛒</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Honeyaddtocart;