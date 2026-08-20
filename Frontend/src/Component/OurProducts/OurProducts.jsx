import React, { useState, useMemo, useEffect } from "react";
import "./OurProducts.css";

// React Icons
import {
  FiChevronDown,
  FiChevronUp,
  FiGrid,
  FiList,
  FiHeart,
  FiShoppingCart,
  FiChevronLeft,
  FiChevronRight,
  FiFilter,
  FiArrowRight,
  FiAward,
  FiShield,
  FiCompass,
  FiCheckSquare,
  FiSquare
} from "react-icons/fi";
import { FaStar, FaLeaf, FaMedal } from "react-icons/fa";
import { GiHoneyJar, GiChocolateBar, GiWheat } from "react-icons/gi";

// Header reference banner image (chocolates, truffles bowl, and honey jar with dipper)
const HEADER_BG_IMAGE =
  "https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&w=1600&q=85";

// Promo gift box image
const PROMO_BOX_IMAGE =
  "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=150&q=80";

// Base product template to generate 48 items
const BASE_PRODUCTS = [
  {
    title: "Dark Chocolate 55%",
    weight: "200g",
    price: 199,
    originalPrice: 249,
    rating: 4.5,
    reviews: 120,
    badge: "Best Seller",
    badgeType: "green",
    category: "Chocolates",
    type: "Dark Chocolate",
    attributes: ["Vegan", "Organic", "Gluten Free", "Premium Quality"],
    image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Raw Forest Honey",
    weight: "500g",
    price: 499,
    originalPrice: 599,
    rating: 5.0,
    reviews: 96,
    badge: "Pure Honey",
    badgeType: "orange",
    category: "Honey",
    type: "Honey",
    attributes: ["No Refined Sugar", "Organic", "Premium Quality"],
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Chocolate Truffles Box",
    weight: "9 Pieces",
    price: 350,
    originalPrice: 450,
    rating: 4.8,
    reviews: 78,
    badge: "New Arrival",
    badgeType: "lime",
    category: "Chocolates",
    type: "Truffles",
    attributes: ["Premium Quality", "Gluten Free"],
    image: "https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Chocolate Gift Hamper",
    weight: "1 Unit",
    price: 1800,
    originalPrice: 2200,
    rating: 4.9,
    reviews: 54,
    badge: "Premium",
    badgeType: "purple",
    category: "Gift Hampers",
    type: "Combo Offers",
    attributes: ["Premium Quality"],
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Dark Chocolate 85%",
    weight: "200g",
    price: 229,
    originalPrice: 279,
    rating: 4.6,
    reviews: 50,
    badge: "",
    badgeType: "",
    category: "Chocolates",
    type: "Dark Chocolate",
    attributes: ["Vegan", "Organic", "No Refined Sugar"],
    image: "https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Honey with Almonds",
    weight: "250g",
    price: 270,
    originalPrice: 320,
    rating: 4.7,
    reviews: 42,
    badge: "Bestseller",
    badgeType: "amber",
    category: "Honey",
    type: "Honey",
    attributes: ["Organic", "Gluten Free"],
    image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Milk Chocolate 40%",
    weight: "200g",
    price: 179,
    originalPrice: 219,
    rating: 4.4,
    reviews: 38,
    badge: "",
    badgeType: "",
    category: "Chocolates",
    type: "Milk Chocolate",
    attributes: ["Gluten Free"],
    image: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Chocolate Assorted Box",
    weight: "16 Pieces",
    price: 650,
    originalPrice: 799,
    rating: 4.9,
    reviews: 51,
    badge: "New",
    badgeType: "lime",
    category: "Gift Hampers",
    type: "Truffles",
    attributes: ["Premium Quality"],
    image: "https://images.unsplash.com/photo-1582293041079-7814c2f12063?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Wildflower Honey",
    weight: "500g",
    price: 450,
    originalPrice: 550,
    rating: 4.8,
    reviews: 29,
    badge: "",
    badgeType: "",
    category: "Honey",
    type: "Honey",
    attributes: ["No Refined Sugar", "Organic"],
    image: "https://images.unsplash.com/photo-1471943311424-646960669fbc?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Organic Dark 70%",
    weight: "200g",
    price: 210,
    originalPrice: 260,
    rating: 4.7,
    reviews: 34,
    badge: "Organic",
    badgeType: "green",
    category: "Chocolates",
    type: "Dark Chocolate",
    attributes: ["Vegan", "Organic", "No Refined Sugar"],
    image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Honey Gift Hamper",
    weight: "1 Unit",
    price: 1250,
    originalPrice: 1550,
    rating: 4.9,
    reviews: 22,
    badge: "",
    badgeType: "",
    category: "Gift Hampers",
    type: "Honey",
    attributes: ["Premium Quality", "Organic"],
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Cocoa Truffles",
    weight: "12 Pieces",
    price: 399,
    originalPrice: 499,
    rating: 4.6,
    reviews: 19,
    badge: "",
    badgeType: "",
    category: "Chocolates",
    type: "Truffles",
    attributes: ["Gluten Free", "Premium Quality"],
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80"
  }
];

// Generate 48 items for realistic multi-page pagination
const ALL_PRODUCTS = Array.from({ length: 48 }, (_, index) => {
  const base = BASE_PRODUCTS[index % BASE_PRODUCTS.length];
  return {
    ...base,
    id: index + 1,
    title: `${base.title} ${index >= 12 ? `(Batch ${Math.floor(index / 12) + 1})` : ""}`
  };
});

const ITEMS_PER_PAGE = 12;

export default function OurProducts() {
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [priceRange, setPriceRange] = useState(2500);
  const [sortBy, setSortBy] = useState("Newest First");
  const [viewMode, setViewMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [wishlist, setWishlist] = useState({});
  const [cartToast, setCartToast] = useState(null);

  // Accordion Sections
  const [openSections, setOpenSections] = useState({
    categories: true,
    price: true,
    productType: true,
    attributes: true
  });

  const [selectedTypes, setSelectedTypes] = useState({
    All: true,
    "Dark Chocolate": false,
    "Milk Chocolate": false,
    "White Chocolate": false,
    Honey: false,
    Truffles: false
  });

  const [selectedAttributes, setSelectedAttributes] = useState({
    "No Refined Sugar": false,
    Vegan: false,
    Organic: false,
    "Gluten Free": false,
    "Premium Quality": false
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const categories = [
    { name: "All Products", count: 48 },
    { name: "Chocolates", count: 24 },
    { name: "Honey", count: 12 },
    { name: "Gift Hampers", count: 8 },
    { name: "Combo Offers", count: 4 }
  ];

  const priceQuickPills = [
    { label: "Under ₹500", max: 500 },
    { label: "₹500 - ₹1,000", max: 1000 },
    { label: "₹1,000 - ₹2,000", max: 2000 },
    { label: "Above ₹2,000", max: 2500 }
  ];

  const toggleWishlist = (id) => {
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddToCart = (product) => {
    setCartToast(`Added "${product.title}" to your cart!`);
    setTimeout(() => setCartToast(null), 2500);
  };

  const handleTypeChange = (type) => {
    if (type === "All") {
      setSelectedTypes({
        All: true,
        "Dark Chocolate": false,
        "Milk Chocolate": false,
        "White Chocolate": false,
        Honey: false,
        Truffles: false
      });
    } else {
      setSelectedTypes((prev) => {
        const next = { ...prev, All: false, [type]: !prev[type] };
        const hasAny = Object.keys(next).some((k) => k !== "All" && next[k]);
        if (!hasAny) next.All = true;
        return next;
      });
    }
    setCurrentPage(1);
  };

  const handleAttributeChange = (attr) => {
    setSelectedAttributes((prev) => ({
      ...prev,
      [attr]: !prev[attr]
    }));
    setCurrentPage(1);
  };

  const handleFeatureClick = (featureName) => {
    if (featureName === "Premium Ingredients") setSelectedCategory("All Products");
    if (featureName === "Bean to Bar Crafted") setSelectedCategory("Chocolates");
    if (featureName === "No Refined Sugar") handleAttributeChange("No Refined Sugar");
    if (featureName === "Made in India") resetFilters();
    if (featureName === "Secure Packaging") handleAddToCart({ title: "Safe Gift Packaging" });
  };

  const resetFilters = () => {
    setSelectedCategory("All Products");
    setPriceRange(2500);
    setSelectedTypes({
      All: true,
      "Dark Chocolate": false,
      "Milk Chocolate": false,
      "White Chocolate": false,
      Honey: false,
      Truffles: false
    });
    setSelectedAttributes({
      "No Refined Sugar": false,
      Vegan: false,
      Organic: false,
      "Gluten Free": false,
      "Premium Quality": false
    });
    setCurrentPage(1);
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return ALL_PRODUCTS.filter((product) => {
      if (selectedCategory !== "All Products" && product.category !== selectedCategory) {
        return false;
      }
      if (product.price > priceRange) {
        return false;
      }
      if (!selectedTypes.All) {
        const activeTypes = Object.keys(selectedTypes).filter((k) => selectedTypes[k]);
        if (!activeTypes.includes(product.type)) return false;
      }
      const activeAttributes = Object.keys(selectedAttributes).filter((k) => selectedAttributes[k]);
      if (activeAttributes.length > 0) {
        const hasAll = activeAttributes.every((a) => product.attributes.includes(a));
        if (!hasAll) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === "Price: Low to High") return a.price - b.price;
      if (sortBy === "Price: High to Low") return b.price - a.price;
      if (sortBy === "Popularity") return b.reviews - a.reviews;
      return a.id - b.id;
    });
  }, [selectedCategory, priceRange, selectedTypes, selectedAttributes, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE) || 1;

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  const currentProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const startItem = filteredProducts.length === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const endItem = Math.min(currentPage * ITEMS_PER_PAGE, filteredProducts.length);

  return (
    <div className="OurProducts">
      {/* Toast Notification */}
      {cartToast && <div className="OurProducts-toast">{cartToast}</div>}

      {/* Header Banner - Matches Reference Image Background */}
      <header
        className="OurProducts-header"
        style={{ backgroundImage: `url(${HEADER_BG_IMAGE})` }}
      >
        <div className="OurProducts-header-overlay" />
        <div className="OurProducts-header-content">
          <h1 className="OurProducts-title">Our Products</h1>
          <p className="OurProducts-subtitle">
            Indulge in our finest chocolates and pure honey crafted with love.
          </p>
        </div>
      </header>

      {/* Main Layout */}
      <div className="OurProducts-container">
        {/* Sidebar Filters */}
        <aside className="OurProducts-sidebar">
          {/* Categories Card */}
          <div className="OurProducts-card">
            <div
              className="OurProducts-card-header"
              onClick={() => toggleSection("categories")}
            >
              <span className="OurProducts-card-title">
                <GiChocolateBar className="OurProducts-filter-icon" /> Categories
              </span>
              {openSections.categories ? <FiChevronUp /> : <FiChevronDown />}
            </div>
            {openSections.categories && (
              <ul className="OurProducts-category-list">
                {categories.map((cat) => (
                  <li
                    key={cat.name}
                    className={`OurProducts-category-item ${
                      selectedCategory === cat.name ? "active" : ""
                    }`}
                    onClick={() => {
                      setSelectedCategory(cat.name);
                      setCurrentPage(1);
                    }}
                  >
                    <span className="OurProducts-cat-name">{cat.name}</span>
                    <span className="OurProducts-cat-count">{cat.count}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Price Range Card */}
          <div className="OurProducts-card">
            <div
              className="OurProducts-card-header"
              onClick={() => toggleSection("price")}
            >
              <span className="OurProducts-card-title">
                <FaMedal className="OurProducts-filter-icon" /> Price Range
              </span>
              {openSections.price ? <FiChevronUp /> : <FiChevronDown />}
            </div>
            {openSections.price && (
              <div className="OurProducts-range-container">
                <input
                  type="range"
                  min="100"
                  max="2500"
                  step="50"
                  value={priceRange}
                  onChange={(e) => {
                    setPriceRange(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="OurProducts-slider"
                />
                <div className="OurProducts-range-labels">
                  <span>₹0</span>
                  <span>₹{priceRange.toLocaleString()}+</span>
                </div>
                <div className="OurProducts-price-pills">
                  {priceQuickPills.map((pill) => (
                    <button
                      key={pill.label}
                      className={`OurProducts-pill-btn ${
                        priceRange === pill.max ? "active" : ""
                      }`}
                      onClick={() => {
                        setPriceRange(pill.max);
                        setCurrentPage(1);
                      }}
                    >
                      {pill.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Product Type Card */}
          <div className="OurProducts-card">
            <div
              className="OurProducts-card-header"
              onClick={() => toggleSection("productType")}
            >
              <span className="OurProducts-card-title">
                <GiHoneyJar className="OurProducts-filter-icon" /> Product Type
              </span>
              {openSections.productType ? <FiChevronUp /> : <FiChevronDown />}
            </div>
            {openSections.productType && (
              <div className="OurProducts-checkbox-group">
                {Object.keys(selectedTypes).map((type) => (
                  <label
                    key={type}
                    className="OurProducts-checkbox-label"
                    onClick={() => handleTypeChange(type)}
                  >
                    {selectedTypes[type] ? (
                      <FiCheckSquare className="OurProducts-check-icon checked" />
                    ) : (
                      <FiSquare className="OurProducts-check-icon" />
                    )}
                    <span>{type}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Attributes Card */}
          <div className="OurProducts-card">
            <div
              className="OurProducts-card-header"
              onClick={() => toggleSection("attributes")}
            >
              <span className="OurProducts-card-title">
                <FaLeaf className="OurProducts-filter-icon" /> Attributes
              </span>
              {openSections.attributes ? <FiChevronUp /> : <FiChevronDown />}
            </div>
            {openSections.attributes && (
              <>
                <div className="OurProducts-checkbox-group">
                  {Object.keys(selectedAttributes).map((attr) => (
                    <label
                      key={attr}
                      className="OurProducts-checkbox-label"
                      onClick={() => handleAttributeChange(attr)}
                    >
                      {selectedAttributes[attr] ? (
                        <FiCheckSquare className="OurProducts-check-icon checked" />
                      ) : (
                        <FiSquare className="OurProducts-check-icon" />
                      )}
                      <span>{attr}</span>
                    </label>
                  ))}
                </div>
                <div className="OurProducts-filter-actions">
                  <button className="OurProducts-btn-reset" onClick={resetFilters}>
                    Reset Filters
                  </button>
                  <button
                    className="OurProducts-btn-apply"
                    onClick={() => setCurrentPage(1)}
                  >
                    Apply Filters <FiFilter />
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Free Shipping Card */}
          <div className="OurProducts-promo-card">
            <div className="OurProducts-promo-content">
              <h4>Free Shipping</h4>
              <p>On all orders above ₹999</p>
              <button
                className="OurProducts-promo-link"
                onClick={() => {
                  setPriceRange(2500);
                  setSelectedCategory("All Products");
                }}
              >
                Shop Now <FiArrowRight />
              </button>
            </div>
            <div
              className="OurProducts-promo-graphic"
              style={{ backgroundImage: `url(${PROMO_BOX_IMAGE})` }}
            />
          </div>
        </aside>

        {/* Product Catalog Section */}
        <main className="OurProducts-content">
          {/* Controls Bar */}
          <div className="OurProducts-controls">
            <div className="OurProducts-results-count">
              Showing {startItem}-{endItem} of {filteredProducts.length} products
            </div>
            <div className="OurProducts-actions">
              <div className="OurProducts-sort-wrapper">
                <span className="OurProducts-sort-label">Sort by:</span>
                <div className="OurProducts-select-container">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="OurProducts-select"
                  >
                    <option value="Newest First">Newest First</option>
                    <option value="Price: Low to High">Price: Low to High</option>
                    <option value="Price: High to Low">Price: High to Low</option>
                    <option value="Popularity">Popularity</option>
                  </select>
                  <FiChevronDown className="OurProducts-select-arrow" />
                </div>
              </div>
              <div className="OurProducts-view-toggle">
                <button
                  className={`OurProducts-view-btn ${
                    viewMode === "grid" ? "active" : ""
                  }`}
                  onClick={() => setViewMode("grid")}
                  aria-label="Grid View"
                >
                  <FiGrid />
                </button>
                <button
                  className={`OurProducts-view-btn ${
                    viewMode === "list" ? "active" : ""
                  }`}
                  onClick={() => setViewMode("list")}
                  aria-label="List View"
                >
                  <FiList />
                </button>
              </div>
            </div>
          </div>

          {/* Product Items */}
          {filteredProducts.length === 0 ? (
            <div className="OurProducts-empty-state">
              <p>No products found matching your current filter selections.</p>
              <button className="OurProducts-btn-reset" onClick={resetFilters}>
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className={`OurProducts-grid OurProducts-${viewMode}-mode`}>
              {currentProducts.map((product) => (
                <div key={product.id} className="OurProducts-product-card">
                  <div className="OurProducts-image-container">
                    {product.badge && (
                      <span
                        className={`OurProducts-badge OurProducts-badge-${product.badgeType}`}
                      >
                        {product.badge}
                      </span>
                    )}
                    <button
                      className={`OurProducts-wishlist-btn ${
                        wishlist[product.id] ? "active" : ""
                      }`}
                      onClick={() => toggleWishlist(product.id)}
                      aria-label="Add to wishlist"
                    >
                      <FiHeart />
                    </button>
                    <img
                      src={product.image}
                      alt={product.title}
                      className="OurProducts-product-image"
                      loading="lazy"
                    />
                  </div>

                  <div className="OurProducts-product-details">
                    <h3 className="OurProducts-product-title">{product.title}</h3>
                    <div className="OurProducts-product-weight">{product.weight}</div>

                    <div className="OurProducts-rating-row">
                      <div className="OurProducts-stars">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={
                              i < Math.floor(product.rating)
                                ? "OurProducts-star filled"
                                : "OurProducts-star"
                            }
                          />
                        ))}
                      </div>
                      <span className="OurProducts-reviews-count">
                        ({product.reviews})
                      </span>
                    </div>

                    <div className="OurProducts-price-row">
                      <div className="OurProducts-prices">
                        <span className="OurProducts-current-price">
                          ₹{product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="OurProducts-old-price">
                            ₹{product.originalPrice}
                          </span>
                        )}
                      </div>
                      <button
                        className="OurProducts-cart-btn"
                        onClick={() => handleAddToCart(product)}
                        aria-label="Add to cart"
                      >
                        <FiShoppingCart />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="OurProducts-pagination">
              <button
                className="OurProducts-page-nav"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              >
                <FiChevronLeft />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  className={`OurProducts-page-number ${
                    currentPage === pageNum ? "active" : ""
                  }`}
                  onClick={() => setCurrentPage(pageNum)}
                >
                  {pageNum}
                </button>
              ))}

              {totalPages > 4 && <span className="OurProducts-page-dots">...</span>}

              <button
                className="OurProducts-page-nav"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              >
                <FiChevronRight />
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Feature Badges Footer */}
      <footer className="OurProducts-footer-features">
        <div
          className="OurProducts-feature-item"
          onClick={() => handleFeatureClick("Premium Ingredients")}
        >
          <div className="OurProducts-feature-icon-wrapper">
            <FiAward />
          </div>
          <div>
            <h4>Premium Ingredients</h4>
            <p>Finest cocoa & pure honey</p>
          </div>
        </div>

        <div
          className="OurProducts-feature-item"
          onClick={() => handleFeatureClick("Bean to Bar Crafted")}
        >
          <div className="OurProducts-feature-icon-wrapper">
            <GiChocolateBar />
          </div>
          <div>
            <h4>Bean to Bar Crafted</h4>
            <p>Crafted with love</p>
          </div>
        </div>

        <div
          className="OurProducts-feature-item"
          onClick={() => handleFeatureClick("No Refined Sugar")}
        >
          <div className="OurProducts-feature-icon-wrapper">
            <GiWheat />
          </div>
          <div>
            <h4>No Refined Sugar</h4>
            <p>Healthier choice</p>
          </div>
        </div>

        <div
          className="OurProducts-feature-item"
          onClick={() => handleFeatureClick("Made in India")}
        >
          <div className="OurProducts-feature-icon-wrapper">
            <FiCompass />
          </div>
          <div>
            <h4>Made in India</h4>
            <p>Proudly Indian</p>
          </div>
        </div>

        <div
          className="OurProducts-feature-item"
          onClick={() => handleFeatureClick("Secure Packaging")}
        >
          <div className="OurProducts-feature-icon-wrapper">
            <FiShield />
          </div>
          <div>
            <h4>Secure Packaging</h4>
            <p>Safe & eco-friendly</p>
          </div>
        </div>
      </footer>
    </div>
  );
}