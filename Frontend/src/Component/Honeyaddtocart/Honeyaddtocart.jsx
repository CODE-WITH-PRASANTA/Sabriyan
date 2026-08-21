import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, ShieldCheck, Zap, RotateCcw, Truck, ShoppingCart, ArrowLeft, CheckCircle2 } from 'lucide-react';
import API, { IMG_URL } from "../../api/axios";
import './Honeyaddtocart.css';

const DEFAULT_HONEY_IMG = 'https://images.unsplash.com/photo-1587049352847-4a222e784d38?w=800&auto=format&fit=crop&q=80';

const Honeyaddtocart = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [quantity, setQuantity] = useState(1);
  const [cartCount, setCartCount] = useState(0);
  const [activeTab, setActiveTab] = useState('Product Details');
  const [isWishlisted, setIsWishlisted] = useState(false);

  // 360° View State
  const [is360Active, setIs360Active] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);
  const isDragging = useRef(false);
  const startX = useRef(0);

  const [selectedImg, setSelectedImg] = useState('');

  // Base URL normalization
  const SERVER_ORIGIN = (IMG_URL || 'http://localhost:5000').replace(/\/api\/?$/, '');

  const getImageUrl = (imgPath) => {
    if (!imgPath) return DEFAULT_HONEY_IMG;
    if (imgPath.startsWith('blob:') || imgPath.startsWith('http://') || imgPath.startsWith('https://')) {
      return imgPath;
    }
    const cleanPath = imgPath.replace(/^public\//, '').replace(/^\/?/, '/');
    return `${SERVER_ORIGIN}${cleanPath}`;
  };

  // Safe benefits parser (handles array or stringified JSON from HoneyProduct form)
  const parsedBenefits = useMemo(() => {
    if (!product?.benefits) return [];
    if (Array.isArray(product.benefits)) return product.benefits;
    try {
      const parsed = JSON.parse(product.benefits);
      return Array.isArray(parsed) ? parsed : [product.benefits];
    } catch {
      return [product.benefits];
    }
  }, [product?.benefits]);

  // Unified Gallery Builder: Combines main image + galleryImages
  const galleryImages = useMemo(() => {
    if (!product) return [DEFAULT_HONEY_IMG];
    
    const list = [];
    if (product.image) list.push(getImageUrl(product.image));

    const extraGallery = Array.isArray(product.galleryImages)
      ? product.galleryImages
      : product.images || [];

    extraGallery.forEach((img) => {
      if (img) list.push(getImageUrl(img));
    });

    return list.length > 0 ? [...new Set(list)] : [DEFAULT_HONEY_IMG];
  }, [product]);

  // Set default selected image when gallery updates
  useEffect(() => {
    if (galleryImages.length > 0) {
      setSelectedImg(galleryImages[0]);
    }
  }, [galleryImages]);

  // Fetch product by ID or Slug fallback
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        let res;
        try {
          res = await API.get(`/honey-products/${id}`);
        } catch (singleErr) {
          // Fallback: search by query if route is standard list endpoint
          res = await API.get(`/honey-products?search=${id}&limit=1`);
          if (res.data?.data?.length > 0) {
            setProduct(res.data.data[0]);
            return;
          }
          throw singleErr;
        }

        if (res.data?.success && res.data?.data) {
          setProduct(res.data.data);
        } else if (res.data && !res.data.data) {
          setProduct(res.data);
        } else {
          setError('Product not found.');
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError(
          err.code === 'ERR_NETWORK'
            ? 'Cannot connect to backend server.'
            : 'Unable to find or load this honey product.'
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  // 360° Drag Handler
  const handleMouseDown = (e) => {
    if (!is360Active) return;
    isDragging.current = true;
    startX.current = e.clientX || (e.touches && e.touches[0].clientX);
  };

  const handleMouseMove = (e) => {
    if (!is360Active || !isDragging.current) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const diff = clientX - startX.current;

    if (Math.abs(diff) > 15) {
      if (diff > 0) {
        setCurrentFrame((prev) => (prev + 1) % galleryImages.length);
      } else {
        setCurrentFrame((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
      }
      startX.current = clientX;
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleAddToCart = () => {
    setCartCount((prev) => prev + quantity);
    alert(`${quantity} × "${product?.name}" added to cart!`);
  };

  const handleBuyNow = () => {
    if (product?.buttonLink) {
      if (product.buttonLink.startsWith('http')) {
        window.location.href = product.buttonLink;
      } else {
        navigate(product.buttonLink);
      }
    } else {
      navigate('/checkout', { state: { product, quantity } });
    }
  };

  if (loading) {
    return (
      <div className="luxury-store honey-product-loading-screen">
        <div className="honey-product-spinner"></div>
        <p>Loading honey details...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="luxury-store honey-product-error-screen">
        <h2>{error || 'Product Not Found'}</h2>
        <button className="gold-btn cart-action" onClick={() => navigate(-1)}>
          <ArrowLeft size={16} /> Back to Products
        </button>
      </div>
    );
  }

  const name = product.name || 'Pure Honey';
  const price = product.price ?? 0;
  const rating = Number(product.rating || 5.0).toFixed(1);
  const tag = product.tag || 'Pure & Organic';
  const category = product.category || 'Honey';
  const buttonText = product.buttonText || 'BUY NOW';

  const tabs = ['Product Details', 'Benefits', 'Usage & Storage', 'Reviews', 'FAQ'];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Product Details':
        return (
          <div className="tab-pane">
            <h2 className="info-heading">About {name}</h2>
            <div
              className="info-description html-content"
              dangerouslySetInnerHTML={{
                __html: product.shortDescription || `<p>Experience the pure goodness of unprocessed, natural ${name}.</p>`
              }}
            />
            <div className="info-meta-tags">
              <span><strong>Category:</strong> {category}</span>
              {product.seoKeywords && <span><strong>Keywords:</strong> {product.seoKeywords}</span>}
            </div>
          </div>
        );

      case 'Benefits':
        return (
          <div className="tab-pane">
            <h2 className="info-heading">Key Health Benefits</h2>
            {parsedBenefits.length > 0 ? (
              <ul className="info-benefits-list">
                {parsedBenefits.map((benefit, i) => (
                  <li key={i}>
                    <CheckCircle2 size={16} className="benefit-icon-check" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="info-description">100% pure raw honey packed with antioxidants, enzymes, and natural vitality.</p>
            )}
          </div>
        );

      case 'Usage & Storage':
        return (
          <div className="tab-pane">
            <h2 className="info-heading">How to Use & Store</h2>
            <p className="info-description">
              Add 1-2 teaspoons to warm water, tea, smoothies, or breakfast bowls. Store in a cool, dry place away from direct sunlight. Do not refrigerate.
            </p>
          </div>
        );

      case 'Reviews':
        return (
          <div className="tab-pane">
            <h2 className="info-heading">Customer Reviews ({rating} / 5.0)</h2>
            <div className="review-list">
              <div className="review-item">
                <div className="review-header">
                  <strong>Verified Buyer</strong>
                  <div className="honey-product-stars-row">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={14} className={s <= Math.round(Number(rating)) ? 'gold' : 'gray'} />
                    ))}
                  </div>
                </div>
                <p className="review-text">Extremely authentic flavor, raw texture, and fast delivery!</p>
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
                <strong>Q: Is this 100% natural and raw?</strong>
                <p>A: Yes, it is unpasteurized, unheated, and free from added sugar or preservatives.</p>
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
        <span onClick={() => navigate('/')}>🏠 Home</span> &gt;{' '}
        <span>{category}</span> &gt;{' '}
        <span className="active">{name}</span>
      </div>

      <div className="product-layout">
        {/* LEFT: Dynamic Gallery & 360 View */}
        <div className="gallery-section">
          <div className="thumbnail-column">
            {galleryImages.map((img, idx) => (
              <div
                key={idx}
                className={`thumb-card ${!is360Active && selectedImg === img ? 'selected' : ''}`}
                onClick={() => {
                  setIs360Active(false);
                  setSelectedImg(img);
                }}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  onError={(e) => { e.target.onerror = null; e.target.src = DEFAULT_HONEY_IMG; }}
                />
              </div>
            ))}
          </div>

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
              src={is360Active ? galleryImages[currentFrame] : selectedImg || DEFAULT_HONEY_IMG}
              alt={name}
              className="main-featured-image no-select"
              draggable="false"
              onError={(e) => { e.target.onerror = null; e.target.src = DEFAULT_HONEY_IMG; }}
            />

            {is360Active && (
              <div className="drag-hint">
                <span>⟵ Drag left/right to view images ⟶</span>
              </div>
            )}

            {galleryImages.length > 1 && (
              <button
                className={`view-360-badge ${is360Active ? 'active-badge' : ''}`}
                onClick={() => setIs360Active((prev) => !prev)}
              >
                {is360Active ? '✕ Close 360°' : '360° View'}
              </button>
            )}
          </div>
        </div>

        {/* RIGHT: Product Details */}
        <div className="details-section">
          <div className="tag-badges">
            {tag && <span className="badge badge-green">{tag}</span>}
            {product.featured && <span className="badge badge-gold">Featured</span>}
            {product.bestSeller && <span className="badge badge-gold">Best Seller</span>}
          </div>

          <h1 className="item-title">{name}</h1>
          <p className="item-weight">{category}</p>

          <div className="rating-row">
            <div className="honey-product-stars-row">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  size={16}
                  className={`honey-product-table-star ${s <= Math.round(Number(rating)) ? 'gold' : 'gray'}`}
                />
              ))}
            </div>
            <span className="rating-text">{rating} Rating</span>
            <span className="divider">|</span>
            <span className={`status-badge-inline ${product.status === 'Active' ? 'text-green' : 'text-gray'}`}>
              {product.status || 'Active'}
            </span>
          </div>

          <div className="price-row">
            <span className="currency-price">₹{price}</span>
          </div>

          <div
            className="item-desc"
            dangerouslySetInnerHTML={{
              __html: product.shortDescription || '<p>100% natural, raw honey harvested with pristine care.</p>'
            }}
          />

          {parsedBenefits.length > 0 && (
            <div className="feature-grid">
              {parsedBenefits.slice(0, 4).map((b, idx) => (
                <div key={idx} className="feature-item">
                  <span>🍯</span> {b}
                </div>
              ))}
            </div>
          )}

          <div className="purchase-controls">
            <div className="qty-selector">
              <span className="qty-label">Qty:</span>
              <div className="qty-box">
                <button type="button" onClick={() => setQuantity((q) => Math.max(1, q - 1))}>−</button>
                <span>{quantity}</span>
                <button type="button" onClick={() => setQuantity((q) => q + 1)}>+</button>
              </div>
            </div>

            <button type="button" className="gold-btn cart-action" onClick={handleAddToCart}>
              <ShoppingCart size={16} /> Add to Cart {cartCount > 0 && `(${cartCount})`}
            </button>

            <button type="button" className="outline-gold-btn buy-action" onClick={handleBuyNow}>
              <Zap size={16} /> {buttonText}
            </button>
          </div>

          <div className="free-shipping-bar">
            <Truck size={16} className="inline-icon" /> Free Shipping on qualifying orders
          </div>

          <div className="trust-badges">
            <div className="trust-item">
              <ShieldCheck className="trust-icon" size={20} />
              <div>
                <strong>100% Pure</strong>
                <p>Lab Tested Quality</p>
              </div>
            </div>
            <div className="trust-item">
              <Zap className="trust-icon" size={20} />
              <div>
                <strong>Fast Dispatch</strong>
                <p>Direct from Farm</p>
              </div>
            </div>
            <div className="trust-item">
              <RotateCcw className="trust-icon" size={20} />
              <div>
                <strong>Easy Support</strong>
                <p>Dedicated Care</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TABS SECTION */}
      <div className="info-tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? 'tab-active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* BOTTOM DETAIL CARD */}
      <div className="bottom-grid">
        <div className="info-card">
          <div className="info-text-side">
            {renderTabContent()}
          </div>
          <div className="info-image-side">
            <img
              src={galleryImages[1] || galleryImages[0]}
              alt={name}
              onError={(e) => { e.target.onerror = null; e.target.src = DEFAULT_HONEY_IMG; }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Honeyaddtocart;