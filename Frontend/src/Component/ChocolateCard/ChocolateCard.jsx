import React from "react";
import "./ChocolateCard.css";

import {
  FaArrowRight,
  FaPlus,
  FaStar,
} from "react-icons/fa";

import CardBg from "../../assets/card.jpeg";      // 2nd reference image
import Chocolate from "../../assets/ch-2.jpeg"; // Chocolate PNG

const chocolates = [
  {
    id: 1,
    title: "Dark Classic",
    subtitle: "70% Cocoa Rich",
    tag: "Rich & Intense",
    rating: "4.9",
  },
  {
    id: 2,
    title: "Milk Delight",
    subtitle: "Smooth & Creamy",
    tag: "Creamy Bliss",
    rating: "4.8",
  },
  {
    id: 3,
    title: "Nut Fusion",
    subtitle: "Almond & Pistachio",
    tag: "Premium Nuts",
    rating: "4.9",
  },
  {
    id: 4,
    title: "Orange Zest",
    subtitle: "Citrus Blend",
    tag: "Fresh Taste",
    rating: "4.7",
  },
  {
    id: 5,
    title: "Caramel Touch",
    subtitle: "Soft Caramel",
    tag: "Sweet Delight",
    rating: "4.8",
  },
  {
    id: 6,
    title: "Sea Salt",
    subtitle: "Luxury Collection",
    tag: "Best Seller",
    rating: "5.0",
  },
];

const ChocolateCard = () => {
  return (
    <section className="ChocolateCard">
      {/* Floating Background */}

      <div className="ChocolateCard-glow glow1"></div>
      <div className="ChocolateCard-glow glow2"></div>
      <div className="ChocolateCard-glow glow3"></div>

      {/* Heading */}

      <div className="ChocolateCard-heading">

        <span className="ChocolateCard-tag">
          Premium Collection
        </span>

        <h2>
          Crafted Luxury
          <span> Chocolates</span>
        </h2>

        <p>
          Discover handcrafted premium chocolates prepared
          with natural ingredients and traditional recipes.
        </p>

      </div>

      {/* Grid */}

      <div className="ChocolateCard-grid">

        {chocolates.map((item) => (

          <div
            className="ChocolateCard-card"
            key={item.id}
          >

            {/* Card Background */}

            <img
              src={CardBg}
              alt=""
              className="ChocolateCard-cardBg"
            />

            <div className="ChocolateCard-overlay"></div>

            {/* Add */}

           

            {/* Spotlight */}

            <div className="ChocolateCard-light"></div>

            {/* Chocolate */}

            <div className="ChocolateCard-imageArea">

              {/* Glass Ring */}

              <div className="ChocolateCard-ring"></div>

              {/* Platform */}

              <div className="ChocolateCard-platform"></div>

              {/* Chocolate */}

              <img
                src={Chocolate}
                alt=""
                className="ChocolateCard-image"
              />

              {/* Floating Cocoa */}

              <span className="ChocolateCard-bean bean1"></span>
              <span className="ChocolateCard-bean bean2"></span>
              <span className="ChocolateCard-bean bean3"></span>
              <span className="ChocolateCard-bean bean4"></span>

              {/* Sparkles */}

              <span className="ChocolateCard-particle p1"></span>
              <span className="ChocolateCard-particle p2"></span>
              <span className="ChocolateCard-particle p3"></span>
              <span className="ChocolateCard-particle p4"></span>

            </div>

            {/* Content */}

            <div className="ChocolateCard-content">

              <div className="ChocolateCard-rating">

                <FaStar />

                <span>{item.rating}</span>

              </div>

              <h3>{item.title}</h3>

              <p>{item.subtitle}</p>

              <div className="ChocolateCard-footer">

                <span>{item.tag}</span>

                <button>

                  Explore

                  <FaArrowRight />

                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

      {/* Bottom Button */}

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