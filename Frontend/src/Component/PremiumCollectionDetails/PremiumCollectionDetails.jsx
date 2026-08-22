import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

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
  FaPercent,
  FaInfoCircle,
  FaThermometerHalf,
  FaClock,
  FaExchangeAlt
} from 'react-icons/fa';
import API, { IMG_URL } from '../../api/axios';
import './PremiumCollectionDetails.css';

// Fallback assets matching ChocolateCard
import FallbackBg from '../../assets/card.webp';
import FallbackChoc from '../../assets/ch-2.webp';

// Universal URL Resolver matching ChocolateCard logic
const resolveImgUrl = (imagePath, fallback = FallbackChoc) => {
  if (!imagePath) return fallback;

  let normalizedPath = String(imagePath).replace(/\\/g, '/');

  if (normalizedPath.startsWith('http://') || normalizedPath.startsWith('https://') || normalizedPath.startsWith('blob:')) {
    return normalizedPath;
  }

  if (normalizedPath.startsWith('/public/')) {
    normalizedPath = normalizedPath.replace('/public/', '/');
  } else if (normalizedPath.startsWith('public/')) {
    normalizedPath = normalizedPath.replace('public/', '');
  }

  const base = (IMG_URL || 'http://localhost:5000').replace(/\/+$/, '');
  const cleanPath = normalizedPath.startsWith('/') ? normalizedPath : `/${normalizedPath}`;

  return `${base}${cleanPath}`;
};

const PremiumCollectionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState('details');
  const [animatingImg, setAnimatingImg] = useState(false);
  const [activePerkIndex, setActivePerkIndex] = useState(0);
  const [addedToCartToast, setAddedToCartToast] = useState(false);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        setError(null);

        let currentItem = null;

        // 1. Try fetching directly by ID
        try {
          const res = await API.get(`/premium-collection/${id}`);
          if (res.data?.success && res.data?.data) {
            currentItem = res.data.data;
          }
        } catch {
          // 2. Fallback to list search if single item endpoint fails or ID is a slug
          const listRes = await API.get('/premium-collection', { params: { limit: 100 } });
          const items = listRes.data?.data || [];
          currentItem = items.find(
            (p) => String(p._id || p.id) === String(id) || p.slug === id
          );
        }

        if (currentItem) {
          setProduct(currentItem);
          setSelectedImage(0);

          // Fetch related recommendations
          const recRes = await API.get('/premium-collection', {
            params: { status: 'Active', limit: 8 }
          });
          const allItems = recRes.data?.data || [];
          const recs = allItems.filter(
            (p) => String(p._id || p.id) !== String(currentItem._id || currentItem.id)
          );
          setRecommendations(recs.slice(0, 3));
        } else {
          setError('Product not found.');
        }
      } catch (err) {
        console.error('Error loading product details:', err);
        setError(
          err.code === 'ERR_NETWORK'
            ? 'Cannot connect to server. Please verify backend is active.'
            : 'Failed to load product details.'
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProductData();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [id]);

  const handleThumbnailClick = (idx) => {
    if (selectedImage !== idx) {
      setAnimatingImg(true);
      setSelectedImage(idx);
      setTimeout(() => setAnimatingImg(false), 300);
    }
  };

  const handleQuantity = (type) => {
    if (type === 'inc') setQuantity((prev) => prev + 1);
    if (type === 'dec' && quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleAddToCart = () => {
    setAddedToCartToast(true);
    setTimeout(() => setAddedToCartToast(false), 3000);
  };

  if (loading) {
    return (
      <div className="PremiumCollectionDetails">
        <div className="pcd-state-message loading">
          <div className="pcd-spinner"></div>
          <p>Loading exquisite flavours...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="PremiumCollectionDetails">
        <div className="pcd-state-message error">
          <p>{error || 'Product not found.'}</p>
          <button className="pcd-btn-primary" onClick={() => navigate('/premiumcollection')}>
            Back to Collection
          </button>
        </div>
      </div>
    );
  }

  // Aggregate and format all image sources
  const rawImages = [
    product.image,
    ...(Array.isArray(product.galleryImages) ? product.galleryImages : []),
    ...(Array.isArray(product.images) ? product.images : []),
    product.bgImage
  ].filter(Boolean);

  const displayGallery =
    rawImages.length > 0
      ? Array.from(new Set(rawImages.map((img) => resolveImgUrl(img, FallbackChoc))))
      : [FallbackChoc];

  const name = product.name || 'Artisanal Chocolate';
  const rating = product.rating ? Number(product.rating).toFixed(1) : '5.0';
  const sellingPrice = product.sellingPrice ?? product.price ?? '—';
  const mrp = product.mrp;
  const discount =
    product.discount ||
    (mrp && sellingPrice && !isNaN(mrp) && !isNaN(sellingPrice) && Number(mrp) > Number(sellingPrice)
      ? Math.round(((mrp - sellingPrice) / mrp) * 100)
      : 0);

  const artisanPerks = [
    {
      icon: <FaAward className="pcd-perk-icon" />,
      title: 'Grand Cru Cocoa',
      desc: product.cocoa ? `Made with ${product.cocoa} selected cocoa` : 'Selected single-origin plantations',
      detail: 'Pure, sustainably-sourced cacao roasted in micro-batches to unlock deep aromatic notes.'
    },
    {
      icon: <FaCheckCircle className="pcd-perk-icon" />,
      title: 'Stone Ground & Conched',
      desc: 'Conched for up to 72 hours',
      detail: 'Traditional slow-conching creates a silky texture that melts evenly across the palate.'
    },
    {
      icon: <FaGlobeAmericas className="pcd-perk-icon" />,
      title: 'Sustainable Sourcing',
      desc: 'Zero palm oil & eco-friendly',
      detail: 'Direct trade partnerships ensure farmer prosperity and zero deforestation impact.'
    },
    {
      icon: <FaSmile className="pcd-perk-icon" />,
      title: 'Loved by Connoisseurs',
      desc: `${rating}/5 from ${(product.reviewCount || 48) + 100}+ foodies`,
      detail: 'Customer ratings endorsing rich tasting notes, pure ingredients, and zero additives.'
    }
  ];

  return (
    <div className="PremiumCollectionDetails">
      <div className="pcd-glow-orb pcd-glow-top-left"></div>
      <div className="pcd-glow-orb pcd-glow-bottom-right"></div>

      {addedToCartToast && (
        <div className="pcd-toast-notification">
          <FaCheckCircle /> {quantity}x {name} added to cart!
        </div>
      )}

      {/* Breadcrumb Navigation */}
      <div className="pcd-breadcrumb">
        <FaHome className="pcd-home-icon" />
        <span className="pcd-crumb" onClick={() => navigate('/')}>Home</span>
        <FaChevronRight className="pcd-crumb-sep" />
        <span className="pcd-crumb" onClick={() => navigate('/premiumcollection')}>Premium Collection</span>
        <FaChevronRight className="pcd-crumb-sep" />
        <span className="pcd-crumb active">{name}</span>
      </div>

      <div className="pcd-main-grid">
        {/* Gallery Section */}
        <div className="pcd-gallery-container">
          <div className="pcd-thumbnails">
            {displayGallery.map((img, idx) => (
              <div
                key={idx}
                className={`pcd-thumb-card ${selectedImage === idx ? 'active' : ''}`}
                onClick={() => handleThumbnailClick(idx)}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = FallbackChoc;
                  }}
                />
              </div>
            ))}
          </div>

          <div className="pcd-main-image-wrapper">
            {(product.featured === 'Yes' || product.featured === true) && (
              <span className="pcd-bestseller-badge">
                <FaStar className="pcd-badge-star" /> Featured
              </span>
            )}
            <div className="pcd-image-zoom-box">
              <img
                src={displayGallery[selectedImage] || displayGallery[0]}
                alt={name}
                className={`pcd-main-image ${animatingImg ? 'fade-switch' : ''}`}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = FallbackChoc;
                }}
              />
            </div>
            <div className="pcd-zoom-hint">
              <FaSearchPlus /> Click thumbnail to view
            </div>
          </div>
        </div>

        {/* Product Information */}
        <div className="pcd-info-container">
          <div className="pcd-rating-row">
            <div className="pcd-rating-stars">
              <FaStar className="pcd-star-gold" />
              <span>{rating} ({product.reviewCount || 48} Reviews)</span>
            </div>
            <span className="pcd-chip-bestseller">{product.category || 'Premium Selection'}</span>
          </div>

          <h1 className="pcd-title">{name}</h1>
          <p className="pcd-subtitle">{product.shortTitle || 'Artisanal Perfection'}</p>

          <div
            className="pcd-description-top"
            dangerouslySetInnerHTML={{
              __html: product.description || 'Indulge in our mastercrafted single-origin blend.'
            }}
          />

          <div className="pcd-highlights-grid">
            <div className="pcd-highlight-item">
              <div className="pcd-hl-icon-wrap"><FaLeaf className="pcd-hl-icon" /></div>
              <span>100% Natural</span>
            </div>
            <div className="pcd-highlight-item">
              <div className="pcd-hl-icon-wrap"><FaSeedling className="pcd-hl-icon" /></div>
              <span>{product.cocoa || 'Pure Cocoa Butter'}</span>
            </div>
            <div className="pcd-highlight-item">
              <div className="pcd-hl-icon-wrap"><FaHeart className="pcd-hl-icon" /></div>
              <span>{product.sweetness ? `${product.sweetness} Sweetness` : 'Balanced Sweetness'}</span>
            </div>
            <div className="pcd-highlight-item">
              <div className="pcd-hl-icon-wrap"><FaAward className="pcd-hl-icon" /></div>
              <span>{product.weight || 'Fine Batch'}</span>
            </div>
          </div>

          {/* Pricing Block */}
          <div className="pcd-price-row">
            <span className="pcd-current-price">₹{sellingPrice}</span>
            {mrp && Number(mrp) > Number(sellingPrice) && (
              <span className="pcd-original-price">₹{mrp}</span>
            )}
            {Number(discount) > 0 && <span className="pcd-discount-badge">{discount}% OFF</span>}
          </div>
          <span className="pcd-tax-note">Inclusive of all taxes & temperature-safe packaging</span>

          {/* Action Row */}
          <div className="pcd-cta-row">
            <div className="pcd-qty-counter">
              <button onClick={() => handleQuantity('dec')} aria-label="Decrease quantity"><FaMinus /></button>
              <span>{quantity}</span>
              <button onClick={() => handleQuantity('inc')} aria-label="Increase quantity"><FaPlus /></button>
            </div>
            <button className="pcd-btn-primary" onClick={handleAddToCart}>
              <FaShoppingCart /> Add to Cart
              <div className="pcd-btn-shine"></div>
            </button>
            <button
              className={`pcd-btn-wishlist ${isWishlisted ? 'active' : ''}`}
              onClick={() => setIsWishlisted(!isWishlisted)}
              aria-label="Wishlist toggle"
            >
              {isWishlisted ? <FaHeart color="#e74c3c" /> : <FaRegHeart />}
              <span>{isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}</span>
            </button>
          </div>

          {/* Trust Highlights */}
          <div className="pcd-trust-row">
            <div className="pcd-trust-box">
              <FaTruck className="pcd-trust-icon" />
              <div>
                <h4>Free Shipping</h4>
                <p>On orders above ₹999</p>
              </div>
            </div>
            <div className="pcd-trust-box">
              <FaShieldAlt className="pcd-trust-icon" />
              <div>
                <h4>Insulated Pack</h4>
                <p>Melt-free guarantee</p>
              </div>
            </div>
            <div className="pcd-trust-box">
              <FaUndo className="pcd-trust-icon" />
              <div>
                <h4>Easy Support</h4>
                <p>Quick replacements</p>
              </div>
            </div>
          </div>
        </div>

        {/* Brand Perks Card */}
        <div className="pcd-brand-card">
          <div className="pcd-brand-header">
            <h3>The Artisan Difference</h3>
            <span className="pcd-brand-tag">Pure Craft</span>
          </div>

          <div className="pcd-brand-perks">
            {artisanPerks.map((perk, index) => (
              <div
                key={index}
                className={`pcd-perk-item ${activePerkIndex === index ? 'pcd-perk-active' : ''}`}
                onClick={() => setActivePerkIndex(index)}
              >
                <div className="pcd-perk-icon-wrap">{perk.icon}</div>
                <div className="pcd-perk-text-wrap">
                  <h4>{perk.title}</h4>
                  <p>{perk.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="pcd-perk-detail-box">
            <div className="pcd-detail-header">
              <FaInfoCircle className="pcd-info-icon" />
              <span>{artisanPerks[activePerkIndex].title}</span>
            </div>
            <p className="pcd-detail-text">
              {artisanPerks[activePerkIndex].detail}
            </p>
          </div>

          <div className="pcd-quote-banner">
            <p className="pcd-cursive-text">
              {product.shortTitle ? `"${product.shortTitle}"` : "More than Chocolate, It's an Experience"}
            </p>
            <div className="pcd-banner-img-wrap">
              <img
                src={product.bgImage ? resolveImgUrl(product.bgImage, FallbackBg) : displayGallery[0]}
                alt={name}
                className="pcd-floating-choc"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = FallbackBg;
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="pcd-tabs-nav">
        <button
          className={`pcd-tab-btn ${activeTab === 'details' ? 'active' : ''}`}
          onClick={() => setActiveTab('details')}
        >
          Product Specifications
        </button>
        <button
          className={`pcd-tab-btn ${activeTab === 'nutrition' ? 'active' : ''}`}
          onClick={() => setActiveTab('nutrition')}
        >
          Nutritional Facts
        </button>
        <button
          className={`pcd-tab-btn ${activeTab === 'shipping' ? 'active' : ''}`}
          onClick={() => setActiveTab('shipping')}
        >
          Shipping & Guarantee
        </button>
      </div>

      <div className="pcd-tab-content">
        {activeTab === 'details' && (
          <div className="pcd-details-grid pcd-fade-in">
            <div className="pcd-desc-col pcd-glass-card">
              <h3>Detailed Overview</h3>
              <div
                className="pcd-tab-html"
                dangerouslySetInnerHTML={{
                  __html: product.description || 'Handcrafted to deliver an uncompromising chocolate journey.'
                }}
              />
            </div>

            <div className="pcd-features-col pcd-glass-card">
              <h3>Key Specifications</h3>
              <div className="pcd-spec-list">
                <div className="pcd-spec-item">
                  <div className="pcd-spec-left"><FaPercent /> Cocoa Percentage</div>
                  <div className="pcd-spec-right">{product.cocoa || '70%'}</div>
                </div>
                <div className="pcd-spec-item">
                  <div className="pcd-spec-left"><FaWeightHanging /> Weight</div>
                  <div className="pcd-spec-right">{product.weight || '80g'}</div>
                </div>
                <div className="pcd-spec-item">
                  <div className="pcd-spec-left"><FaCalendarAlt /> Shelf Life</div>
                  <div className="pcd-spec-right">{product.shelfLife || '9 Months'}</div>
                </div>
                <div className="pcd-spec-item">
                  <div className="pcd-spec-left"><FaMapMarkerAlt /> Origin</div>
                  <div className="pcd-spec-right">{product.origin || 'Single Estate India'}</div>
                </div>
                <div className="pcd-spec-item">
                  <div className="pcd-spec-left"><FaBoxOpen /> Storage</div>
                  <div className="pcd-spec-right">{product.storage || 'Store at 15°C – 20°C'}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'nutrition' && (
          <div className="pcd-full-tab-pane pcd-fade-in">
            <h3>Nutritional Values (Approx per 100g)</h3>
            <table className="pcd-nutri-table">
              <thead>
                <tr>
                  <th>Parameter</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Energy</td><td>{product.nutrition?.energy || '548 kcal'}</td></tr>
                <tr><td>Total Cocoa Solids</td><td>{product.cocoa || '65%'}</td></tr>
                <tr><td>Protein</td><td>{product.nutrition?.protein || '8.2 g'}</td></tr>
                <tr><td>Total Carbohydrates</td><td>{product.nutrition?.carbs || '42.0 g'}</td></tr>
                <tr><td>Of which Sugars</td><td>{product.nutrition?.sugar || '28.5 g'}</td></tr>
                <tr><td>Total Fat</td><td>{product.nutrition?.fat || '38.4 g'}</td></tr>
                <tr><td>Dietary Fiber</td><td>{product.nutrition?.fiber || '7.1 g'}</td></tr>
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'shipping' && (
          <div className="pcd-full-tab-pane pcd-fade-in pcd-shipping-pane">
            <div className="pcd-shipping-grid">
              <div className="pcd-ship-card">
                <div className="pcd-ship-card-icon"><FaThermometerHalf /></div>
                <h4>Melt-Free Cold Chain Guarantee</h4>
                <p>
                  Every chocolate order is packed inside food-grade insulated thermocool pouches with reusable ice gel packs to withstand ambient temperatures up to 42°C.
                </p>
              </div>

              <div className="pcd-ship-card">
                <div className="pcd-ship-card-icon"><FaClock /></div>
                <h4>Expedited Dispatch Timelines</h4>
                <p>
                  Orders placed before 2:00 PM are dispatched same-day via express air courier. Standard metro transit takes 24–48 hours; all other locations take 2–4 business days.
                </p>
              </div>

              <div className="pcd-ship-card">
                <div className="pcd-ship-card-icon"><FaExchangeAlt /></div>
                <h4>Hassle-Free Replacement Policy</h4>
                <p>
                  In the rare event of transit damage or melting, share a photo within 24 hours of delivery. We will issue an immediate replacement or full refund with no return required.
                </p>
              </div>
            </div>

            <div className="pcd-shipping-footer-note">
              <FaShieldAlt className="pcd-footer-shield" />
              <span>We do not ship on Saturday evenings or public holidays to prevent packages from lingering in unconditioned transit warehouses.</span>
            </div>
          </div>
        )}
      </div>

      {/* Dynamic Recommendations */}
      {recommendations.length > 0 && (
        <div className="pcd-recommendations-section">
          <div className="pcd-rec-header">
            <h3>Complete Your Experience</h3>
            <button className="pcd-view-all" onClick={() => navigate('/premiumcollection')}>
              View All <FaArrowRight className="pcd-arrow-icon" />
            </button>
          </div>

          <div className="pcd-rec-grid">
            {recommendations.map((rec) => {
              const recId = rec._id || rec.id;
              const recImg = resolveImgUrl(rec.image, FallbackChoc);

              return (
                <div
                  key={recId}
                  className="pcd-product-card"
                  onClick={() => navigate(`/premiumcollection/${recId}`)}
                >
                  <div className="pcd-card-img-wrap">
                    <img
                      src={recImg}
                      alt={rec.name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = FallbackChoc;
                      }}
                    />
                  </div>
                  <div className="pcd-card-body">
                    <div className="pcd-card-rating">
                      <FaStar className="pcd-star-gold" /> <span>{rec.rating ? Number(rec.rating).toFixed(1) : '5.0'}</span>
                    </div>
                    <h4>{rec.name}</h4>
                    <div className="pcd-card-price">
                      <strong>₹{rec.sellingPrice || rec.price}</strong>
                      {rec.mrp && Number(rec.mrp) > Number(rec.sellingPrice || rec.price) && (
                        <span>₹{rec.mrp}</span>
                      )}
                    </div>
                    <button className="pcd-btn-card-cta">
                      <FaShoppingCart /> View Chocolate
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default PremiumCollectionDetails;