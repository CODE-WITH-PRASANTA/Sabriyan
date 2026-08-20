import React, { useState } from 'react';
import { 
  FaStar, 
  FaLeaf, 
  FaSeedling, 
  FaHeart, 
  FaRegHeart, 
  FaTruck, 
  FaShieldAlt, 
  FaUndo, 
  FaShoppingCart, 
  FaCheckCircle, 
  FaAward, 
  FaGlobeAmericas, 
  FaSmile, 
  FaPlay, 
  FaSearchPlus, 
  FaArrowRight, 
  FaMinus, 
  FaPlus, 
  FaHome, 
  FaChevronRight,
  FaWeightHanging,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaBoxOpen,
  FaPercent
} from 'react-icons/fa';
import './PremiumCollectionDetails.css';

const productImages = [
  'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&q=80&w=800'
];

const PremiumCollectionDetails = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState('details');
  const [animatingImg, setAnimatingImg] = useState(false);

  const handleThumbnailClick = (idx) => {
    if (selectedImage !== idx) {
      setAnimatingImg(true);
      setSelectedImage(idx);
      setTimeout(() => setAnimatingImg(false), 400);
    }
  };

  const handleQuantity = (type) => {
    if (type === 'inc') setQuantity(prev => prev + 1);
    if (type === 'dec' && quantity > 1) setQuantity(prev => prev - 1);
  };

  return (
    <div className="PremiumCollectionDetails">
      {/* Ambient background glows */}
      <div className="pcd-glow-orb pcd-glow-top-left"></div>
      <div className="pcd-glow-orb pcd-glow-bottom-right"></div>

      {/* Breadcrumb Header */}
      <div className="pcd-breadcrumb">
        <FaHome className="pcd-home-icon" />
        <span className="pcd-crumb">Home</span>
        <FaChevronRight className="pcd-crumb-sep" />
        <span className="pcd-crumb">Premium Collection</span>
        <FaChevronRight className="pcd-crumb-sep" />
        <span className="pcd-crumb active">Dark Chocolate 55%</span>
      </div>

      {/* Main Top Grid */}
      <div className="pcd-main-grid">
        {/* Gallery Section */}
        <div className="pcd-gallery-container">
          <div className="pcd-thumbnails">
            {productImages.map((img, idx) => (
              <div 
                key={idx} 
                className={`pcd-thumb-card ${selectedImage === idx ? 'active' : ''}`}
                onClick={() => handleThumbnailClick(idx)}
              >
                <img src={img} alt={`Thumbnail ${idx + 1}`} />
                {idx === 3 && (
                  <div className="pcd-thumb-overlay">
                    <FaPlay className="pcd-play-icon" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="pcd-main-image-wrapper">
            <span className="pcd-bestseller-badge">
              <FaStar className="pcd-badge-star" /> Bestseller
            </span>
            <div className="pcd-image-zoom-box">
              <img 
                src={productImages[selectedImage]} 
                alt="Main Product" 
                className={`pcd-main-image ${animatingImg ? 'fade-switch' : ''}`}
              />
            </div>
            <div className="pcd-zoom-hint">
              <FaSearchPlus /> Hover to zoom
            </div>
          </div>
        </div>

        {/* Product Details Section */}
        <div className="pcd-info-container">
          <div className="pcd-rating-row">
            <div className="pcd-rating-stars">
              <FaStar className="pcd-star-gold" />
              <span>4.8 (124 Reviews)</span>
            </div>
            <span className="pcd-chip-bestseller">Bestseller</span>
          </div>

          <h1 className="pcd-title">Dark Chocolate 55%</h1>
          <p className="pcd-subtitle">Rich Cocoa. Pure Indulgence.</p>
          <p className="pcd-description-top">
            Experience the perfect balance of rich cocoa and smooth texture with our Dark Chocolate 55%. Crafted from the finest cocoa beans, this premium chocolate delivers a deep, intense flavor with a naturally rich finish.
          </p>

          {/* Highlights Grid */}
          <div className="pcd-highlights-grid">
            <div className="pcd-highlight-item">
              <div className="pcd-hl-icon-wrap"><FaLeaf className="pcd-hl-icon" /></div>
              <span>100% Natural Ingredients</span>
            </div>
            <div className="pcd-highlight-item">
              <div className="pcd-hl-icon-wrap"><FaSeedling className="pcd-hl-icon" /></div>
              <span>Rich Cocoa Content</span>
            </div>
            <div className="pcd-highlight-item">
              <div className="pcd-hl-icon-wrap"><FaHeart className="pcd-hl-icon" /></div>
              <span>No Artificial Colors</span>
            </div>
            <div className="pcd-highlight-item">
              <div className="pcd-hl-icon-wrap"><FaSeedling className="pcd-hl-icon" /></div>
              <span>Vegan Friendly</span>
            </div>
          </div>

          {/* Pricing */}
          <div className="pcd-price-row">
            <span className="pcd-current-price">₹1,250</span>
            <span className="pcd-original-price">₹1,500</span>
            <span className="pcd-discount-badge">17% OFF</span>
          </div>
          <span className="pcd-tax-note">Inclusive of all taxes</span>

          {/* Action CTA Bar */}
          <div className="pcd-cta-row">
            <div className="pcd-qty-counter">
              <button onClick={() => handleQuantity('dec')} aria-label="Decrease quantity"><FaMinus /></button>
              <span>{quantity}</span>
              <button onClick={() => handleQuantity('inc')} aria-label="Increase quantity"><FaPlus /></button>
            </div>
            <button className="pcd-btn-primary">
              <FaShoppingCart /> Add to Cart
              <div className="pcd-btn-shine"></div>
            </button>
            <button 
              className={`pcd-btn-wishlist ${isWishlisted ? 'active' : ''}`}
              onClick={() => setIsWishlisted(!isWishlisted)}
            >
              <span className={`pcd-heart-anim ${isWishlisted ? 'pop' : ''}`}>
                {isWishlisted ? <FaHeart color="#e74c3c" /> : <FaRegHeart />}
              </span>
              Add to Wishlist
            </button>
          </div>

          {/* Trust Guarantees */}
          <div className="pcd-trust-row">
            <div className="pcd-trust-box">
              <FaTruck className="pcd-trust-icon" />
              <div>
                <h4>Free Delivery</h4>
                <p>On orders above ₹999</p>
              </div>
            </div>
            <div className="pcd-trust-box">
              <FaShieldAlt className="pcd-trust-icon" />
              <div>
                <h4>Secure Payment</h4>
                <p>100% secure checkout</p>
              </div>
            </div>
            <div className="pcd-trust-box">
              <FaUndo className="pcd-trust-icon" />
              <div>
                <h4>Easy Returns</h4>
                <p>Within 7 days</p>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Brand Card */}
        <div className="pcd-brand-card">
          <div className="pcd-card-border-glow"></div>
          <h3>Why Choose Sabriyana?</h3>
          <div className="pcd-brand-perks">
            <div className="pcd-perk-item">
              <div className="pcd-perk-icon-wrap"><FaAward className="pcd-perk-icon" /></div>
              <div>
                <h4>Premium Quality</h4>
                <p>Crafted with finest ingredients</p>
              </div>
            </div>
            <div className="pcd-perk-item">
              <div className="pcd-perk-icon-wrap"><FaCheckCircle className="pcd-perk-icon" /></div>
              <div>
                <h4>Authentic Taste</h4>
                <p>Traditional & artisanal recipe</p>
              </div>
            </div>
            <div className="pcd-perk-item">
              <div className="pcd-perk-icon-wrap"><FaGlobeAmericas className="pcd-perk-icon" /></div>
              <div>
                <h4>Sustainable Sourcing</h4>
                <p>Ethical & eco-friendly</p>
              </div>
            </div>
            <div className="pcd-perk-item">
              <div className="pcd-perk-icon-wrap"><FaSmile className="pcd-perk-icon" /></div>
              <div>
                <h4>Loved by Thousands</h4>
                <p>4.8/5 from 10K+ customers</p>
              </div>
            </div>
          </div>
          
          <div className="pcd-quote-banner">
            <p className="pcd-cursive-text">More than Chocolate, It's an Experience</p>
            <div className="pcd-banner-img-wrap">
              <img 
                src="https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&q=80&w=400" 
                alt="Artisanal chocolate assortment" 
                className="pcd-floating-choc"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="pcd-tabs-nav">
        <button 
          className={`pcd-tab-btn ${activeTab === 'details' ? 'active' : ''}`}
          onClick={() => setActiveTab('details')}
        >
          Product Details
        </button>
        <button 
          className={`pcd-tab-btn ${activeTab === 'nutrition' ? 'active' : ''}`}
          onClick={() => setActiveTab('nutrition')}
        >
          Nutritional Information
        </button>
        <button 
          className={`pcd-tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
          onClick={() => setActiveTab('reviews')}
        >
          Reviews (124)
        </button>
        <button 
          className={`pcd-tab-btn ${activeTab === 'shipping' ? 'active' : ''}`}
          onClick={() => setActiveTab('shipping')}
        >
          Shipping & Returns
        </button>
      </div>

      {/* Tab Panels */}
      <div className="pcd-tab-content">
        {activeTab === 'details' && (
          <div className="pcd-details-grid pcd-fade-in">
            <div className="pcd-desc-col pcd-glass-card">
              <h3>Product Description</h3>
              <p>
                Our Dark Chocolate 55% is a celebration of pure cocoa goodness. Made with carefully selected cocoa beans, it offers a deep, rich flavor with a silky smooth texture. Perfect for those who appreciate the true essence of chocolate.
              </p>
              <ul className="pcd-checklist">
                <li><FaCheckCircle className="pcd-check" /> Rich 55% cocoa content</li>
                <li><FaCheckCircle className="pcd-check" /> Smooth and velvety texture</li>
                <li><FaCheckCircle className="pcd-check" /> No artificial flavors or colors</li>
                <li><FaCheckCircle className="pcd-check" /> Crafted in small batches in India</li>
              </ul>
            </div>

            <div className="pcd-features-col pcd-glass-card">
              <h3>Key Features</h3>
              <div className="pcd-spec-list">
                <div className="pcd-spec-item">
                  <div className="pcd-spec-left"><FaPercent /> Cocoa Percentage</div>
                  <div className="pcd-spec-right">55%</div>
                </div>
                <div className="pcd-spec-item">
                  <div className="pcd-spec-left"><FaWeightHanging /> Weight</div>
                  <div className="pcd-spec-right">80g</div>
                </div>
                <div className="pcd-spec-item">
                  <div className="pcd-spec-left"><FaCalendarAlt /> Shelf Life</div>
                  <div className="pcd-spec-right">12 Months</div>
                </div>
                <div className="pcd-spec-item">
                  <div className="pcd-spec-left"><FaMapMarkerAlt /> Origin</div>
                  <div className="pcd-spec-right">India</div>
                </div>
                <div className="pcd-spec-item">
                  <div className="pcd-spec-left"><FaBoxOpen /> Storage</div>
                  <div className="pcd-spec-right">Store in a cool, dry place</div>
                </div>
              </div>
            </div>

            <div className="pcd-nutrition-col pcd-glass-card">
              <h3>Nutritional Information</h3>
              <table className="pcd-nutri-table">
                <thead>
                  <tr>
                    <th>Nutrient</th>
                    <th>Per 100g</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Energy</td><td>540 kcal</td></tr>
                  <tr><td>Protein</td><td>7.8 g</td></tr>
                  <tr><td>Total Fat</td><td>42 g</td></tr>
                  <tr><td>Carbohydrate</td><td>44 g</td></tr>
                  <tr><td>Sugar</td><td>24 g</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'nutrition' && (
          <div className="pcd-full-tab-pane pcd-fade-in">
            <h3>Detailed Nutritional Breakdown</h3>
            <p>Calculated values per serving size of 20g (Approx 4 servings per pack):</p>
            <table className="pcd-nutri-table wide">
              <thead>
                <tr>
                  <th>Nutrient Parameter</th>
                  <th>Per Serving (20g)</th>
                  <th>% Daily Value</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Calories</td><td>108 kcal</td><td>5%</td></tr>
                <tr><td>Total Fat</td><td>8.4 g</td><td>11%</td></tr>
                <tr><td>Saturated Fat</td><td>5.1 g</td><td>25%</td></tr>
                <tr><td>Sodium</td><td>2 mg</td><td>0.1%</td></tr>
                <tr><td>Dietary Fiber</td><td>2.2 g</td><td>8%</td></tr>
                <tr><td>Iron</td><td>2.4 mg</td><td>13%</td></tr>
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="pcd-full-tab-pane pcd-fade-in">
            <div className="pcd-reviews-header">
              <h3>Customer Feedback & Ratings</h3>
              <span className="pcd-badge-gold">4.8 ★ | 124 Verified Reviews</span>
            </div>
            <div className="pcd-reviews-list">
              <div className="pcd-review-card">
                <div className="pcd-rev-meta">
                  <strong>Aarav Sharma</strong> <span>★★★★★</span> <em>2 days ago</em>
                </div>
                <p>Absolutely exquisite taste! The 55% cocoa hits the perfect balance between dark richness and sweet smooth undertones.</p>
              </div>
              <div className="pcd-review-card">
                <div className="pcd-rev-meta">
                  <strong>Priya Verma</strong> <span>★★★★★</span> <em>1 week ago</em>
                </div>
                <p>Pure luxury packaging and the quality of beans really shines through. Will definitely buy regularly!</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'shipping' && (
          <div className="pcd-full-tab-pane pcd-fade-in">
            <h3>Shipping & Returns Policy</h3>
            <div className="pcd-shipping-info">
              <p><strong>Standard Dispatch:</strong> Dispatched in insulated, temperature-controlled eco-packaging within 24-48 hours.</p>
              <p><strong>Delivery Time:</strong> Metro cities: 2-3 business days. Rest of India: 4-6 business days.</p>
              <p><strong>Temperature Guarantee:</strong> Melt-free delivery guaranteed or free replacement provided immediately.</p>
            </div>
          </div>
        )}
      </div>

      {/* You May Also Like Section */}
      <div className="pcd-recommendations-section">
        <div className="pcd-rec-header">
          <h3>You May Also Like</h3>
          <button className="pcd-view-all">View All <FaArrowRight className="pcd-arrow-icon" /></button>
        </div>

        <div className="pcd-rec-grid">
          {/* Card 1 */}
          <div className="pcd-product-card">
            <div className="pcd-card-img-wrap">
              <img src="https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&q=80&w=400" alt="Milk Chocolate 40%" />
              <button className="pcd-card-fav"><FaRegHeart /></button>
            </div>
            <div className="pcd-card-body">
              <div className="pcd-card-rating">
                <FaStar className="pcd-star-gold" /> <span>4.7 (89)</span>
              </div>
              <h4>Milk Chocolate 40%</h4>
              <div className="pcd-card-price">
                <strong>₹1,150</strong> <span>₹1,400</span>
              </div>
              <button className="pcd-btn-card-cta"><FaShoppingCart /> Add to Cart</button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="pcd-product-card">
            <div className="pcd-card-img-wrap">
              <img src="https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=400" alt="Organic Wildflower Honey" />
              <button className="pcd-card-fav"><FaRegHeart /></button>
            </div>
            <div className="pcd-card-body">
              <div className="pcd-card-rating">
                <FaStar className="pcd-star-gold" /> <span>4.9 (156)</span>
              </div>
              <h4>Organic Wildflower Honey</h4>
              <div className="pcd-card-price">
                <strong>₹1,499</strong> <span>₹1,899</span>
              </div>
              <button className="pcd-btn-card-cta"><FaShoppingCart /> Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumCollectionDetails;