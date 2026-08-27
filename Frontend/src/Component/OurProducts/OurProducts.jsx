import React, { useEffect, useMemo, useState } from "react";
import "./OurProducts.css";

// =====================================================
// ICONS
// =====================================================

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
  FiSquare,
} from "react-icons/fi";

import {
  FaStar,
  FaLeaf,
  FaMedal,
} from "react-icons/fa";

import {
  GiHoneyJar,
  GiChocolateBar,
  GiWheat,
} from "react-icons/gi";

// =====================================================
// LOCAL IMAGES
// =====================================================

import ChocoHero from "../../assets/ch-1.webp";
import Chocolate55 from "../../assets/ch-2.webp";
import ChocolatePurple from "../../assets/chocolate.webp";

import Honey from "../../assets/honey.webp";
import Honey2 from "../../assets/honey-2.webp";
import Honey3 from "../../assets/honey-3.webp";
import Honey4 from "../../assets/honey4.webp";

import SabriyanaChocolate from "../../assets/sabriyana-chocolate-bar.webp";
import PromoImage from "../../assets/hero.png";

// =====================================================
// BASE PRODUCTS
// IMPORTANT:
// Every product is unique.
// No duplicate batch generation.
// =====================================================

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
    attributes: [
      "Vegan",
      "Organic",
      "Gluten Free",
      "Premium Quality",
    ],
    image: Chocolate55,
  },

  {
    title: "Raw Forest Honey",
    weight: "500g",
    price: 499,
    originalPrice: 599,
    rating: 5,
    reviews: 96,
    badge: "Pure Honey",
    badgeType: "orange",
    category: "Honey",
    type: "Honey",
    attributes: [
      "No Refined Sugar",
      "Organic",
      "Premium Quality",
    ],
    image: Honey,
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
    attributes: [
      "Premium Quality",
      "Gluten Free",
    ],
    image: ChocoHero,
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
    type: "Truffles",
    attributes: [
      "Premium Quality",
    ],
    image: PromoImage,
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
    attributes: [
      "Vegan",
      "Organic",
      "No Refined Sugar",
    ],
    image: ChocolatePurple,
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
    attributes: [
      "Organic",
      "Gluten Free",
    ],
    image: Honey2,
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
    attributes: [
      "Gluten Free",
    ],
    image: SabriyanaChocolate,
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
    attributes: [
      "Premium Quality",
    ],
    image: ChocolatePurple,
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
    attributes: [
      "No Refined Sugar",
      "Organic",
    ],
    image: Honey3,
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
    attributes: [
      "Vegan",
      "Organic",
      "No Refined Sugar",
    ],
    image: Chocolate55,
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
    attributes: [
      "Premium Quality",
      "Organic",
    ],
    image: Honey4,
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
    attributes: [
      "Gluten Free",
      "Premium Quality",
    ],
    image: ChocoHero,
  },
];

// =====================================================
// UNIQUE PRODUCTS
// No duplicate / batch products
// =====================================================

const ALL_PRODUCTS = BASE_PRODUCTS.map((product, index) => ({
  ...product,
  id: index + 1,
}));

const ITEMS_PER_PAGE = 12;

// =====================================================
// COMPONENT
// =====================================================

export default function OurProducts() {
  const [selectedCategory, setSelectedCategory] =
    useState("All Products");

  const [priceRange, setPriceRange] =
    useState(2500);

  const [sortBy, setSortBy] =
    useState("Newest First");

  const [viewMode, setViewMode] =
    useState("grid");

  const [currentPage, setCurrentPage] =
    useState(1);

  const [wishlist, setWishlist] =
    useState({});

  const [cartToast, setCartToast] =
    useState(null);

  const [openSections, setOpenSections] =
    useState({
      categories: true,
      price: true,
      productType: true,
      attributes: true,
    });

  const [selectedTypes, setSelectedTypes] =
    useState({
      All: true,
      "Dark Chocolate": false,
      "Milk Chocolate": false,
      Honey: false,
      Truffles: false,
    });

  const [selectedAttributes, setSelectedAttributes] =
    useState({
      "No Refined Sugar": false,
      Vegan: false,
      Organic: false,
      "Gluten Free": false,
      "Premium Quality": false,
    });

  // ===================================================
  // CATEGORIES
  // Dynamic counts
  // ===================================================

  const categories = useMemo(
    () => [
      {
        name: "All Products",
        count: ALL_PRODUCTS.length,
      },
      {
        name: "Chocolates",
        count: ALL_PRODUCTS.filter(
          (product) =>
            product.category === "Chocolates"
        ).length,
      },
      {
        name: "Honey",
        count: ALL_PRODUCTS.filter(
          (product) =>
            product.category === "Honey"
        ).length,
      },
      {
        name: "Gift Hampers",
        count: ALL_PRODUCTS.filter(
          (product) =>
            product.category === "Gift Hampers"
        ).length,
      },
      {
        name: "Combo Offers",
        count: ALL_PRODUCTS.filter(
          (product) =>
            product.category === "Combo Offers"
        ).length,
      },
    ],
    []
  );

  const priceQuickPills = [
    {
      label: "Under ₹500",
      max: 500,
    },
    {
      label: "₹500 - ₹1,000",
      max: 1000,
    },
    {
      label: "₹1,000 - ₹2,000",
      max: 2000,
    },
    {
      label: "Above ₹2,000",
      max: 2500,
    },
  ];

  // ===================================================
  // FUNCTIONS
  // ===================================================

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const toggleWishlist = (id) => {
    setWishlist((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleAddToCart = (product) => {
    setCartToast(
      `Added "${product.title}" to your cart!`
    );

    window.setTimeout(() => {
      setCartToast(null);
    }, 2500);
  };

  const handleTypeChange = (type) => {
    if (type === "All") {
      setSelectedTypes({
        All: true,
        "Dark Chocolate": false,
        "Milk Chocolate": false,
        Honey: false,
        Truffles: false,
      });
    } else {
      setSelectedTypes((prev) => {
        const next = {
          ...prev,
          All: false,
          [type]: !prev[type],
        };

        const hasAny = Object.keys(next).some(
          (key) =>
            key !== "All" && next[key]
        );

        if (!hasAny) {
          next.All = true;
        }

        return next;
      });
    }

    setCurrentPage(1);
  };

  const handleAttributeChange = (attribute) => {
    setSelectedAttributes((prev) => ({
      ...prev,
      [attribute]: !prev[attribute],
    }));

    setCurrentPage(1);
  };

  const resetFilters = () => {
    setSelectedCategory("All Products");
    setPriceRange(2500);

    setSelectedTypes({
      All: true,
      "Dark Chocolate": false,
      "Milk Chocolate": false,
      Honey: false,
      Truffles: false,
    });

    setSelectedAttributes({
      "No Refined Sugar": false,
      Vegan: false,
      Organic: false,
      "Gluten Free": false,
      "Premium Quality": false,
    });

    setCurrentPage(1);
  };

  const handleFeatureClick = (featureName) => {
    if (featureName === "Premium Ingredients") {
      setSelectedCategory("All Products");
      setCurrentPage(1);
    }

    if (featureName === "Bean to Bar Crafted") {
      setSelectedCategory("Chocolates");
      setCurrentPage(1);
    }

    if (featureName === "No Refined Sugar") {
      handleAttributeChange("No Refined Sugar");
    }

    if (featureName === "Made in India") {
      resetFilters();
    }

    if (featureName === "Secure Packaging") {
      handleAddToCart({
        title: "Safe Gift Packaging",
      });
    }
  };

  // ===================================================
  // FILTER + SORT
  // ===================================================

  const filteredProducts = useMemo(() => {
    return ALL_PRODUCTS
      .filter((product) => {
        if (
          selectedCategory !== "All Products" &&
          product.category !== selectedCategory
        ) {
          return false;
        }

        if (product.price > priceRange) {
          return false;
        }

        if (!selectedTypes.All) {
          const activeTypes = Object.keys(
            selectedTypes
          ).filter(
            (key) =>
              key !== "All" &&
              selectedTypes[key]
          );

          if (
            !activeTypes.includes(product.type)
          ) {
            return false;
          }
        }

        const activeAttributes =
          Object.keys(
            selectedAttributes
          ).filter(
            (key) => selectedAttributes[key]
          );

        if (activeAttributes.length > 0) {
          const hasAll =
            activeAttributes.every(
              (attribute) =>
                product.attributes.includes(
                  attribute
                )
            );

          if (!hasAll) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (
          sortBy === "Price: Low to High"
        ) {
          return a.price - b.price;
        }

        if (
          sortBy === "Price: High to Low"
        ) {
          return b.price - a.price;
        }

        if (sortBy === "Popularity") {
          return b.reviews - a.reviews;
        }

        return a.id - b.id;
      });
  }, [
    selectedCategory,
    priceRange,
    selectedTypes,
    selectedAttributes,
    sortBy,
  ]);

  // ===================================================
  // PAGINATION
  // ===================================================

  const totalPages =
    Math.ceil(
      filteredProducts.length /
        ITEMS_PER_PAGE
    ) || 1;

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);

  const currentProducts = useMemo(() => {
    const start =
      (currentPage - 1) *
      ITEMS_PER_PAGE;

    return filteredProducts.slice(
      start,
      start + ITEMS_PER_PAGE
    );
  }, [
    filteredProducts,
    currentPage,
  ]);

  const startItem =
    filteredProducts.length === 0
      ? 0
      : (currentPage - 1) *
          ITEMS_PER_PAGE +
        1;

  const endItem = Math.min(
    currentPage * ITEMS_PER_PAGE,
    filteredProducts.length
  );

  // ===================================================
  // RENDER
  // ===================================================

  return (
    <div className="OurProducts">

      {/* TOAST */}

      {cartToast && (
        <div
          className="OurProducts-toast"
          role="status"
          aria-live="polite"
        >
          {cartToast}
        </div>
      )}

      {/* HERO */}

      <header className="OurProducts-header">

        <img
          src={ChocoHero}
          alt=""
          className="OurProducts-header-image"
          width="1200"
          height="400"
          fetchPriority="high"
          decoding="async"
        />

        <div
          className="OurProducts-header-overlay"
          aria-hidden="true"
        />

        <div className="OurProducts-header-content">
          <h1 className="OurProducts-title">
            Our Products
          </h1>

          <p className="OurProducts-subtitle">
            Indulge in our finest chocolates
            and pure honey crafted with love.
          </p>
        </div>
      </header>

      {/* MAIN */}

      <div className="OurProducts-container">

        {/* SIDEBAR */}

        <aside className="OurProducts-sidebar">

          {/* CATEGORIES */}

          <div className="OurProducts-card">

            <button
              type="button"
              className="OurProducts-card-header"
              onClick={() =>
                toggleSection("categories")
              }
              aria-expanded={
                openSections.categories
              }
            >
              <span className="OurProducts-card-title">
                <GiChocolateBar className="OurProducts-filter-icon" />
                Categories
              </span>

              {openSections.categories ? (
                <FiChevronUp />
              ) : (
                <FiChevronDown />
              )}
            </button>

            {openSections.categories && (
              <ul className="OurProducts-category-list">
                {categories.map((category) => (
                  <li
                    key={category.name}
                    className={`OurProducts-category-item ${
                      selectedCategory ===
                      category.name
                        ? "active"
                        : ""
                    }`}
                    onClick={() => {
                      setSelectedCategory(
                        category.name
                      );
                      setCurrentPage(1);
                    }}
                  >
                    <span>
                      {category.name}
                    </span>

                    <span className="OurProducts-cat-count">
                      {category.count}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* PRICE */}

          <div className="OurProducts-card">

            <button
              type="button"
              className="OurProducts-card-header"
              onClick={() =>
                toggleSection("price")
              }
              aria-expanded={
                openSections.price
              }
            >
              <span className="OurProducts-card-title">
                <FaMedal className="OurProducts-filter-icon" />
                Price Range
              </span>

              {openSections.price ? (
                <FiChevronUp />
              ) : (
                <FiChevronDown />
              )}
            </button>

            {openSections.price && (
              <div className="OurProducts-range-container">

                <input
                  type="range"
                  min="100"
                  max="2500"
                  step="50"
                  value={priceRange}
                  onChange={(event) => {
                    setPriceRange(
                      Number(event.target.value)
                    );
                    setCurrentPage(1);
                  }}
                  className="OurProducts-slider"
                  aria-label="Maximum product price"
                />

                <div className="OurProducts-range-labels">
                  <span>₹100</span>
                  <span>
                    ₹{priceRange.toLocaleString()}+
                  </span>
                </div>

                <div className="OurProducts-price-pills">
                  {priceQuickPills.map((pill) => (
                    <button
                      type="button"
                      key={pill.label}
                      className={`OurProducts-pill-btn ${
                        priceRange === pill.max
                          ? "active"
                          : ""
                      }`}
                      onClick={() => {
                        setPriceRange(
                          pill.max
                        );
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

          {/* PRODUCT TYPE */}

          <div className="OurProducts-card">

            <button
              type="button"
              className="OurProducts-card-header"
              onClick={() =>
                toggleSection("productType")
              }
              aria-expanded={
                openSections.productType
              }
            >
              <span className="OurProducts-card-title">
                <GiHoneyJar className="OurProducts-filter-icon" />
                Product Type
              </span>

              {openSections.productType ? (
                <FiChevronUp />
              ) : (
                <FiChevronDown />
              )}
            </button>

            {openSections.productType && (
              <div className="OurProducts-checkbox-group">

                {Object.keys(selectedTypes).map(
                  (type) => (
                    <button
                      type="button"
                      key={type}
                      className="OurProducts-checkbox-label"
                      onClick={() =>
                        handleTypeChange(type)
                      }
                      aria-pressed={
                        selectedTypes[type]
                      }
                    >
                      {selectedTypes[type] ? (
                        <FiCheckSquare className="OurProducts-check-icon checked" />
                      ) : (
                        <FiSquare className="OurProducts-check-icon" />
                      )}

                      <span>{type}</span>
                    </button>
                  )
                )}
              </div>
            )}
          </div>

          {/* ATTRIBUTES */}

          <div className="OurProducts-card">

            <button
              type="button"
              className="OurProducts-card-header"
              onClick={() =>
                toggleSection("attributes")
              }
              aria-expanded={
                openSections.attributes
              }
            >
              <span className="OurProducts-card-title">
                <FaLeaf className="OurProducts-filter-icon" />
                Attributes
              </span>

              {openSections.attributes ? (
                <FiChevronUp />
              ) : (
                <FiChevronDown />
              )}
            </button>

            {openSections.attributes && (
              <>
                <div className="OurProducts-checkbox-group">

                  {Object.keys(
                    selectedAttributes
                  ).map((attribute) => (
                    <button
                      type="button"
                      key={attribute}
                      className="OurProducts-checkbox-label"
                      onClick={() =>
                        handleAttributeChange(
                          attribute
                        )
                      }
                      aria-pressed={
                        selectedAttributes[
                          attribute
                        ]
                      }
                    >
                      {selectedAttributes[
                        attribute
                      ] ? (
                        <FiCheckSquare className="OurProducts-check-icon checked" />
                      ) : (
                        <FiSquare className="OurProducts-check-icon" />
                      )}

                      <span>
                        {attribute}
                      </span>
                    </button>
                  ))}

                </div>

                <div className="OurProducts-filter-actions">

                  <button
                    type="button"
                    className="OurProducts-btn-reset"
                    onClick={resetFilters}
                  >
                    Reset Filters
                  </button>

                  <button
                    type="button"
                    className="OurProducts-btn-apply"
                    onClick={() =>
                      setCurrentPage(1)
                    }
                  >
                    Apply Filters
                    <FiFilter />
                  </button>

                </div>
              </>
            )}
          </div>

          {/* PROMO */}

          <div className="OurProducts-promo-card">

            <div className="OurProducts-promo-content">

              <h4>Free Shipping</h4>

              <p>
                On all orders above ₹999
              </p>

             <button
                type="button"
                className="OurProducts-promo-link"
                onClick={() => {
                  window.location.href = "/ourproduct";
                }}
              >
                Shop Now
                <FiArrowRight />
              </button>

            </div>

            <img
              src={PromoImage}
              alt=""
              className="OurProducts-promo-graphic"
              width="120"
              height="120"
              loading="lazy"
              decoding="async"
            />

          </div>
        </aside>

        {/* PRODUCTS */}

        <main className="OurProducts-content">

          <div className="OurProducts-controls">

            <div className="OurProducts-results-count">
              Showing {startItem}-{endItem} of{" "}
              {filteredProducts.length} products
            </div>

            <div className="OurProducts-actions">

              <div className="OurProducts-sort-wrapper">

                <label
                  htmlFor="product-sort"
                  className="OurProducts-sort-label"
                >
                  Sort by:
                </label>

                <div className="OurProducts-select-container">

                  <select
                    id="product-sort"
                    value={sortBy}
                    onChange={(event) =>
                      setSortBy(
                        event.target.value
                      )
                    }
                    className="OurProducts-select"
                  >
                    <option>
                      Newest First
                    </option>

                    <option>
                      Price: Low to High
                    </option>

                    <option>
                      Price: High to Low
                    </option>

                    <option>
                      Popularity
                    </option>
                  </select>

                  <FiChevronDown className="OurProducts-select-arrow" />

                </div>
              </div>

              <div
                className="OurProducts-view-toggle"
                role="group"
                aria-label="Product view"
              >

                <button
                  type="button"
                  className={`OurProducts-view-btn ${
                    viewMode === "grid"
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    setViewMode("grid")
                  }
                  aria-label="Grid View"
                  aria-pressed={
                    viewMode === "grid"
                  }
                >
                  <FiGrid />
                </button>

                <button
                  type="button"
                  className={`OurProducts-view-btn ${
                    viewMode === "list"
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    setViewMode("list")
                  }
                  aria-label="List View"
                  aria-pressed={
                    viewMode === "list"
                  }
                >
                  <FiList />
                </button>

              </div>
            </div>
          </div>

          {/* PRODUCT GRID */}

          {filteredProducts.length === 0 ? (
            <div className="OurProducts-empty-state">

              <p>
                No products found matching
                your current filter selections.
              </p>

              <button
                type="button"
                className="OurProducts-btn-reset"
                onClick={resetFilters}
              >
                Clear All Filters
              </button>

            </div>
          ) : (
            <div
              className={`OurProducts-grid ${
                viewMode === "list"
                  ? "OurProducts-list-mode"
                  : ""
              }`}
            >

              {currentProducts.map(
                (product, index) => (
                  <article
                    key={product.id}
                    className="OurProducts-product-card"
                  >

                    <div className="OurProducts-image-container">

                      {product.badge && (
                        <span
                          className={`OurProducts-badge OurProducts-badge-${product.badgeType}`}
                        >
                          {product.badge}
                        </span>
                      )}

                      <button
                        type="button"
                        className={`OurProducts-wishlist-btn ${
                          wishlist[product.id]
                            ? "active"
                            : ""
                        }`}
                        onClick={() =>
                          toggleWishlist(
                            product.id
                          )
                        }
                        aria-label={
                          wishlist[product.id]
                            ? `Remove ${product.title} from wishlist`
                            : `Add ${product.title} to wishlist`
                        }
                      >
                        <FiHeart />
                      </button>

                      <img
                        src={product.image}
                        alt={product.title}
                        className="OurProducts-product-image"
                        width="600"
                        height="600"
                        loading={
                          index < 4
                            ? "eager"
                            : "lazy"
                        }
                        fetchPriority={
                          index === 0
                            ? "high"
                            : "auto"
                        }
                        decoding="async"
                      />

                    </div>

                    <div className="OurProducts-product-details">

                      <h3 className="OurProducts-product-title">
                        {product.title}
                      </h3>

                      <div className="OurProducts-product-weight">
                        {product.weight}
                      </div>

                      <div className="OurProducts-rating-row">

                        <div className="OurProducts-stars">
                          {[0, 1, 2, 3, 4].map(
                            (star) => (
                              <FaStar
                                key={star}
                                className={
                                  star <
                                  Math.floor(
                                    product.rating
                                  )
                                    ? "OurProducts-star filled"
                                    : "OurProducts-star"
                                }
                              />
                            )
                          )}
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

                          <span className="OurProducts-old-price">
                            ₹{product.originalPrice}
                          </span>

                        </div>

                        <button
                          type="button"
                          className="OurProducts-cart-btn"
                          onClick={() =>
                            handleAddToCart(
                              product
                            )
                          }
                          aria-label={`Add ${product.title} to cart`}
                        >
                          <FiShoppingCart />
                        </button>

                      </div>
                    </div>
                  </article>
                )
              )}

            </div>
          )}

          {/* PAGINATION */}

          {totalPages > 1 && (
            <nav
              className="OurProducts-pagination"
              aria-label="Product pagination"
            >

              <button
                type="button"
                className="OurProducts-page-nav"
                disabled={currentPage === 1}
                onClick={() =>
                  setCurrentPage((page) =>
                    Math.max(1, page - 1)
                  )
                }
                aria-label="Previous page"
              >
                <FiChevronLeft />
              </button>

              {Array.from(
                {
                  length: totalPages,
                },
                (_, index) => index + 1
              ).map((page) => (
                <button
                  type="button"
                  key={page}
                  className={`OurProducts-page-number ${
                    currentPage === page
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    setCurrentPage(page)
                  }
                  aria-label={`Go to page ${page}`}
                  aria-current={
                    currentPage === page
                      ? "page"
                      : undefined
                  }
                >
                  {page}
                </button>
              ))}

              <button
                type="button"
                className="OurProducts-page-nav"
                disabled={
                  currentPage === totalPages
                }
                onClick={() =>
                  setCurrentPage((page) =>
                    Math.min(
                      totalPages,
                      page + 1
                    )
                  )
                }
                aria-label="Next page"
              >
                <FiChevronRight />
              </button>

            </nav>
          )}

        </main>
      </div>

      {/* FEATURES */}

      <footer className="OurProducts-footer-features">

        <button
          type="button"
          className="OurProducts-feature-item"
          onClick={() =>
            handleFeatureClick(
              "Premium Ingredients"
            )
          }
        >
          <span className="OurProducts-feature-icon-wrapper">
            <FiAward />
          </span>

          <span>
            <strong>
              Premium Ingredients
            </strong>

            <small>
              Finest cocoa & pure honey
            </small>
          </span>
        </button>

        <button
          type="button"
          className="OurProducts-feature-item"
          onClick={() =>
            handleFeatureClick(
              "Bean to Bar Crafted"
            )
          }
        >
          <span className="OurProducts-feature-icon-wrapper">
            <GiChocolateBar />
          </span>

          <span>
            <strong>
              Bean to Bar Crafted
            </strong>

            <small>
              Crafted with love
            </small>
          </span>
        </button>

        <button
          type="button"
          className="OurProducts-feature-item"
          onClick={() =>
            handleFeatureClick(
              "No Refined Sugar"
            )
          }
        >
          <span className="OurProducts-feature-icon-wrapper">
            <GiWheat />
          </span>

          <span>
            <strong>
              No Refined Sugar
            </strong>

            <small>
              Healthier choice
            </small>
          </span>
        </button>

        <button
          type="button"
          className="OurProducts-feature-item"
          onClick={() =>
            handleFeatureClick(
              "Made in India"
            )
          }
        >
          <span className="OurProducts-feature-icon-wrapper">
            <FiCompass />
          </span>

          <span>
            <strong>Made in India</strong>

            <small>
              Proudly Indian
            </small>
          </span>
        </button>

        <button
          type="button"
          className="OurProducts-feature-item"
          onClick={() =>
            handleFeatureClick(
              "Secure Packaging"
            )
          }
        >
          <span className="OurProducts-feature-icon-wrapper">
            <FiShield />
          </span>

          <span>
            <strong>
              Secure Packaging
            </strong>

            <small>
              Safe & eco-friendly
            </small>
          </span>
        </button>

      </footer>

    </div>
  );
}