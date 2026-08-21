import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ChocolateCard.css";
import API, { IMG_URL } from "../../api/axios"; // now using IMG_URL for consistency with detail page
import { FaArrowRight, FaStar } from "react-icons/fa";

import CardBg from "../../assets/card.webp";     // Background asset reference
import Chocolate from "../../assets/ch-2.webp"; // Fallback Chocolate image
  // Fallback Background image

const ChocolateCard = () => {
  const navigate = useNavigate();
  const [chocolates, setChocolates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch active products from the Premium Collection API
  useEffect(() => {
    let isMounted = true;

    const fetchChocolates = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await API.get("/premium-collection", {
          params: { status: "Active", limit: 12 },
        });

        if (!isMounted) return;

        if (response.data && response.data.success) {
          setChocolates(response.data.data || []);
        } else {
          setChocolates([]);
        }
      } catch (err) {
        if (!isMounted) return;
        console.error("Error fetching chocolate collection:", err);
        setError(
          err.code === "ERR_NETWORK"
            ? "Cannot connect to server. Please verify the backend is running."
            : "Failed to load chocolate collection."
        );
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchChocolates();

    return () => {
      isMounted = false;
    };
  }, []);

  // Bulletproof image formatter — now uses the same IMG_URL base as the detail page,
  // so images resolve consistently whether you're on the card grid or the details view.
  const getImageUrl = (imagePath, fallbackImage) => {
    if (!imagePath) return fallbackImage;

    let normalizedPath = imagePath.replace(/\\/g, "/");

    if (
      normalizedPath.startsWith("http://") ||
      normalizedPath.startsWith("https://") ||
      normalizedPath.startsWith("blob:")
    ) {
      return normalizedPath;
    }

    // Strip a leading "public/" or "/public/" segment however it appears
    normalizedPath = normalizedPath.replace(/^\/?public\/?/, "/");

    // Use the shared IMG_URL from api/axios (falls back to localhost only if unset)
    const baseUrl = (IMG_URL || "http://localhost:5000").replace(/\/$/, "");

    const cleanPath = normalizedPath.startsWith("/") ? normalizedPath : `/${normalizedPath}`;

    return `${baseUrl}${cleanPath}`;
  };

  const handleExplore = (item) => {
    const id = item._id || item.id;
    if (!id) {
      console.error("❌ Cannot navigate: item has no _id or id", item);
      return;
    }
    navigate(`/premiumcollection/${id}`);
  };

  return (
    <section className="ChocolateCard">
      {/* Floating Background Glows */}
      <div className="ChocolateCard-glow glow1"></div>
      <div className="ChocolateCard-glow glow2"></div>
      <div className="ChocolateCard-glow glow3"></div>

      {/* Heading Section */}
      <div className="ChocolateCard-heading">
        <span className="ChocolateCard-tag">Premium Collection</span>

        <h2>
          Crafted Luxury
          <span> Chocolates</span>
        </h2>

        <p>
          Discover handcrafted premium chocolates prepared with natural
          ingredients and traditional recipes.
        </p>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="ChocolateCard-state-message loading">
          <div className="spinner"></div>
          <p>Crafting luxury chocolates...</p>
        </div>
      )}

      {/* Error State */}
      {!loading && error && (
        <div className="ChocolateCard-state-message error">
          <p>{error}</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && chocolates.length === 0 && (
        <div className="ChocolateCard-state-message empty">
          <p>No premium chocolates available at the moment.</p>
        </div>
      )}

      {/* Grid Display */}
      {!loading && !error && chocolates.length > 0 && (
        <div className="ChocolateCard-grid">
          {chocolates.map((item) => {
            const bgImageSrc = getImageUrl(item.bgImage, CardBg);
            const mainImageSrc = getImageUrl(item.image, Chocolate);

            return (
              <div
                className="ChocolateCard-card"
                key={item._id || item.id}
                onClick={() => handleExplore(item)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") handleExplore(item);
                }}
              >
                {/* Card Background Banner */}
                <img
                  src={bgImageSrc}
                  alt={`${item.name} Background`}
                  className="ChocolateCard-cardBg"
                  onError={(e) => {
                    console.error(`❌ Background Image Failed to Load: ${bgImageSrc}`);
                    e.target.onerror = null;
                    e.target.src = CardBg;
                  }}
                />

                <div className="ChocolateCard-overlay"></div>
                <div className="ChocolateCard-light"></div>

                {/* Product Visual Area */}
                <div className="ChocolateCard-imageArea">
                  <div className="ChocolateCard-ring"></div>
                  <div className="ChocolateCard-platform"></div>

                  {/* Main Product Image */}
                  <img
                    src={mainImageSrc}
                    alt={item.name}
                    className="ChocolateCard-image"
                    onError={(e) => {
                      console.error(`❌ Main Image Failed to Load: ${mainImageSrc}`);
                      e.target.onerror = null;
                      e.target.src = Chocolate;
                    }}
                  />

                  {/* Floating Cocoa Beans Animation Elements */}
                  <span className="ChocolateCard-bean bean1"></span>
                  <span className="ChocolateCard-bean bean2"></span>
                  <span className="ChocolateCard-bean bean3"></span>
                  <span className="ChocolateCard-bean bean4"></span>

                  {/* Sparkle Particles */}
                  <span className="ChocolateCard-particle p1"></span>
                  <span className="ChocolateCard-particle p2"></span>
                  <span className="ChocolateCard-particle p3"></span>
                  <span className="ChocolateCard-particle p4"></span>
                </div>

                {/* Card Content Details */}
                <div className="ChocolateCard-content">
                  <div className="ChocolateCard-rating">
                    <FaStar className="star-icon" color="#f39c12" />
                    <span>{item.rating ? Number(item.rating).toFixed(1) : "5.0"}</span>
                  </div>

                  <h3>{item.name}</h3>

                  <p className="ChocolateCard-shortTitle">
                    {item.shortTitle || item.category || "70% Cocoa Rich"}
                    {item.weight && ` • ${item.weight}`}
                  </p>

                  {/* Pricing Block */}
                  <div className="ChocolateCard-pricing">
                    {item.sellingPrice !== undefined && (
                      <span className="price-selling">₹{item.sellingPrice}</span>
                    )}
                    {item.discount > 0 && item.mrp && (
                      <>
                        <span
                          className="price-mrp"
                          style={{
                            textDecoration: "line-through",
                            color: "#888",
                            fontSize: "0.85em",
                            marginLeft: "8px",
                          }}
                        >
                          ₹{item.mrp}
                        </span>
                        <span
                          className="price-discount"
                          style={{ color: "#27ae60", fontSize: "0.85em", marginLeft: "8px" }}
                        >
                          ({item.discount}% OFF)
                        </span>
                      </>
                    )}
                  </div>

                  {/* Footer / CTA */}
                  <div className="ChocolateCard-footer">
                    <span className="ChocolateCard-sweetness">
                      {item.sweetness ? `${item.sweetness} Sweetness` : "Rich & Intense"}
                    </span>

                    <button
                      className="ChocolateCard-btn"
                      onClick={(e) => {
                        e.stopPropagation(); // prevent double-trigger from the card's own onClick
                        handleExplore(item);
                      }}
                    >
                      Explore
                      <FaArrowRight />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Bottom CTA */}
      <div className="ChocolateCard-bottom">
        <button
          className="ChocolateCard-mainBtn"
          onClick={() => navigate("/premiumcollection")}
        >
          Explore All Chocolates
          <FaArrowRight />
        </button>
      </div>
    </section>
  );
};

export default ChocolateCard;