import React, { useState, useEffect } from "react";
import "./ChocolateCard.css";
import API, { IMG_URL } from "../../api/axios";
import { FaArrowRight, FaStar } from "react-icons/fa";

import CardBg from "../../assets/card.jpeg";     // Background asset reference
import Chocolate from "../../assets/ch-2.jpeg"; // Fallback Chocolate image

const ChocolateCard = () => {
  const [chocolates, setChocolates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch active products from the Premium Collection API
  useEffect(() => {
    const fetchChocolates = async () => {
      try {
        setLoading(true);
        // Fetch active products limit to top items
        const response = await API.get("/premium-collection", {
          params: { status: "Active", limit: 12 },
        });

        if (response.data && response.data.success) {
          setChocolates(response.data.data);
        }
      } catch (err) {
        console.error("Error fetching chocolate collection:", err);
        setError("Failed to load chocolate collection.");
      } finally {
        setLoading(false);
      }
    };

    fetchChocolates();
  }, []);

  // Helper to format backend relative image URLs dynamically
  const getImageUrl = (imagePath) => {
    if (!imagePath) return Chocolate;
    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
      return imagePath;
    }
    const cleanPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
    return `${IMG_URL || "http://localhost:5000"}${cleanPath}`;
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

      {/* Loading / Error States */}
      {loading ? (
        <div
          className="ChocolateCard-loading"
          style={{ textAlign: "center", color: "#e2b866", padding: "40px 0" }}
        >
          <p>Crafting luxury chocolates...</p>
        </div>
      ) : error ? (
        <div
          className="ChocolateCard-error"
          style={{ textAlign: "center", color: "#e74c3c", padding: "40px 0" }}
        >
          <p>{error}</p>
        </div>
      ) : chocolates.length === 0 ? (
        <div
          className="ChocolateCard-empty"
          style={{ textAlign: "center", color: "#ccc", padding: "40px 0" }}
        >
          <p>No premium chocolates available at the moment.</p>
        </div>
      ) : (
        /* Grid Display */
        <div className="ChocolateCard-grid">
          {chocolates.map((item) => (
            <div className="ChocolateCard-card" key={item._id || item.id}>
              {/* Card Background Banner */}
              <img
                src={item.bgImage ? getImageUrl(item.bgImage) : CardBg}
                alt={item.name}
                className="ChocolateCard-cardBg"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = CardBg;
                }}
              />

              <div className="ChocolateCard-overlay"></div>

              {/* Spotlight Effect */}
              <div className="ChocolateCard-light"></div>

              {/* Product Visual Area */}
              <div className="ChocolateCard-imageArea">
                {/* Glass Ring Effect */}
                <div className="ChocolateCard-ring"></div>

                {/* Platform */}
                <div className="ChocolateCard-platform"></div>

                {/* Main Product Image */}
                <img
                  src={getImageUrl(item.image)}
                  alt={item.name}
                  className="ChocolateCard-image"
                  onError={(e) => {
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
                  <FaStar />
                  <span>{item.rating ? Number(item.rating).toFixed(1) : "5.0"}</span>
                </div>

                <h3>{item.name}</h3>

                <p>{item.shortTitle || item.category || "70% Cocoa Rich"}</p>

                <div className="ChocolateCard-footer">
                  <span>
                    {item.weight
                      ? `${item.weight}`
                      : item.sellingPrice
                      ? `₹${item.sellingPrice}`
                      : "Rich & Intense"}
                  </span>

                  <button>
                    Explore
                    <FaArrowRight />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bottom CTA Button */}
      <div className="ChocolateCard-bottom">
        <button>
          Explore All Chocolates
          <FaArrowRight />
        </button>
      </div>
    </section>
  );
};

export default ChocolateCard;