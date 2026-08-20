import React from "react";
import {
  LuAward,
  LuBan,
  LuSprout,
  LuArrowRight,
  LuLeaf,
} from "react-icons/lu";
import "./Crafted.css";

const Crafted = () => {
  const heroImage =
    "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?q=80&w=1200&auto=format&fit=crop";

  return (
    <section className="Crafted" id="our-story">
      <div
        className="Crafted-card"
        itemScope
        itemType="https://schema.org/AboutPage"
      >
        {/* ================= LEFT IMAGE ================= */}
        <div className="Crafted-imageWrapper">
          <img
            src={heroImage}
            alt="Savriyana premium chocolate crafted with rich cocoa and traditional Indian-inspired techniques"
            className="Crafted-image"
            itemProp="image"
          />
        </div>

        {/* ================= RIGHT CONTENT ================= */}
        <div className="Crafted-content">

          <span className="Crafted-subtitle">
            A LEGACY OF ARTISANAL CRAFT
          </span>

          <h2
            className="Crafted-mainTitle"
            itemProp="name"
          >
            AUTHENTIC CHOCOLATE:
            <br />
            <span className="Crafted-titleHighlight">
              HERITAGE MEETS NATURE
            </span>
          </h2>

          {/* SEO Friendly Brand Story */}
          <p
            className="Crafted-description"
            itemProp="description"
          >
            Savriyana is a premium chocolate brand from Odisha,
            created for people who appreciate the beauty of
            thoughtfully crafted chocolate. We bring together
            carefully selected cocoa, traditional Indian
            ingredients and a mindful approach to chocolate making
            to create rich, balanced and memorable flavours.
          </p>

          <p className="Crafted-description Crafted-descriptionSecond">
            Our philosophy is simple: start with quality ingredients,
            respect the character of cocoa and take the time to
            create chocolate with a smooth texture and authentic
            taste. From everyday indulgence to special moments,
            Savriyana aims to bring a distinctive Indian touch to
            the world of premium chocolate.
          </p>

          {/* ================= FEATURES ================= */}
          <div className="Crafted-features">

            <div className="Crafted-featureItem">
              <LuLeaf className="Crafted-featureIcon" />

              <div className="Crafted-featureTextContainer">
                <span className="Crafted-featureTitle">
                  Carefully Selected Cocoa
                </span>

                <span className="Crafted-featureSubtext">
                  Rich & Balanced Flavour
                </span>
              </div>
            </div>

            <div className="Crafted-featureItem">
              <LuBan className="Crafted-featureIcon" />

              <div className="Crafted-featureTextContainer">
                <span className="Crafted-featureTitle">
                  Desi Khand Sweetness
                </span>

                <span className="Crafted-featureSubtext">
                  Traditional Indian Touch
                </span>
              </div>
            </div>

            <div className="Crafted-featureItem">
              <LuAward className="Crafted-featureIcon" />

              <div className="Crafted-featureTextContainer">
                <span className="Crafted-featureTitle">
                  Traditional Craftsmanship
                </span>

                <span className="Crafted-featureSubtext">
                  Thoughtfully Crafted
                </span>
              </div>
            </div>

            <div className="Crafted-featureItem">
              <LuSprout className="Crafted-featureIcon" />

              <div className="Crafted-featureTextContainer">
                <span className="Crafted-featureTitle">
                  Thoughtful Sourcing
                </span>

                <span className="Crafted-featureSubtext">
                  Quality at Every Step
                </span>
              </div>
            </div>

            <div className="Crafted-featureItem">
              <LuAward className="Crafted-featureIcon" />

              <div className="Crafted-featureTextContainer">
                <span className="Crafted-featureTitle">
                  Premium Quality
                </span>

                <span className="Crafted-featureSubtext">
                  Crafted for Chocolate Lovers
                </span>
              </div>
            </div>

          </div>

          {/* ================= SEO SUPPORTING CONTENT ================= */}
          <div className="Crafted-seoText">
            <p>
              As a{" "}
              <strong>premium chocolate brand in Odisha</strong>,
              Savriyana combines quality cocoa with Indian-inspired
              craftsmanship to create chocolates that feel refined,
              authentic and distinctly our own.
            </p>
          </div>

          {/* ================= CTA ================= */}
          <button
            className="Crafted-ctaButton"
            type="button"
          >
            <span>
              DISCOVER OUR CHOCOLATE JOURNEY
            </span>

            <LuArrowRight className="Crafted-arrowIcon" />
          </button>

        </div>
      </div>
    </section>
  );
};

export default Crafted;