import React from 'react';
import { 
  LuAward, // Replaces LuHourglass for quality certification focus
  LuBan,   // Add for sugar-free focus
  LuBoxes, 
  LuSprout, 
  LuHeart, 
  LuArrowRight,
  LuLeaf    // Added for cocoa sourcing
} from 'react-icons/lu';
import './Crafted.css';

const Crafted = () => {
  const heroImage = "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?q=80&w=1200&auto=format&fit=crop";

  return (
    <section className="Crafted" id="our-story">
      <div className="Crafted-card" itemscope itemtype="https://schema.org/AboutPage">
        {/* Left Side Image (Play button removed) */}
        <div className="Crafted-imageWrapper">
          <img 
            src={heroImage} 
            alt="Authentic traditional stone crafted chocolate being milled at Sabriyana" 
            className="Crafted-image"
            itemprop="image"
          />
        </div>

        {/* Right Side Content */}
        <div className="Crafted-content">
          <span className="Crafted-subtitle">A LEGACY OF ARTISANAL CRAFT</span>
          
          <h1 className="Crafted-mainTitle" itemprop="name">
            AUTHENTIC CHOCOLATE: <br />
            <span className="Crafted-titleHighlight">HERITAGE MEETS NATURE</span>
          </h1>

          <p className="Crafted-description" itemprop="description">
            At Sabriyana, our story is a commitment to purity and perfection, 
            blending centuries-old, traditional Indian stone-crafting techniques 
            with the world's finest globally sourced organic cocoa. Our 
            artisanal process is a labor of love, meticulous and slow, 
            designed to capture the deep, authentic flavors that have defined our 
            legacy since 1952. We believe true luxury is found in clean, ethical 
            chocolate that’s as rich in story as it is in taste.
          </p>

          {/* 5 Refined Feature Highlights for enhanced detail */}
          <div className="Crafted-features">
            <div className="Crafted-featureItem">
              <LuLeaf className="Crafted-featureIcon" />
              <div className="Crafted-featureTextContainer">
                <span className="Crafted-featureTitle">Single-Origin Cocoa</span>
                <span className="Crafted-featureSubtext">Globally Sourced</span>
              </div>
            </div>

            <div className="Crafted-featureItem">
              <LuBan className="Crafted-featureIcon" />
              <div className="Crafted-featureTextContainer">
                <span className="Crafted-featureTitle">0% Refined Sugars</span>
                <span className="Crafted-featureSubtext">Natural Sweetness</span>
              </div>
            </div>

            <div className="Crafted-featureItem">
              <LuAward className="Crafted-featureIcon" />
              <div className="Crafted-featureTextContainer">
                <span className="Crafted-featureTitle">Traditional Stone Milling</span>
                <span className="Crafted-featureSubtext">Authentic Process</span>
              </div>
            </div>

            <div className="Crafted-featureItem">
              <LuSprout className="Crafted-featureIcon" />
              <div className="Crafted-featureTextContainer">
                <span className="Crafted-featureTitle">Fair Trade Partnerships</span>
                <span className="Crafted-featureSubtext">Sustainably Sourced</span>
              </div>
            </div>

            <div className="Crafted-featureItem">
              <LuAward className="Crafted-featureIcon" />
              <div className="Crafted-featureTextContainer">
                <span className="Crafted-featureTitle">Certified Organic Ingredients</span>
                <span className="Crafted-featureSubtext">Non-GMO Verified</span>
              </div>
            </div>
          </div>

          {/* CTA Action Button */}
          <button className="Crafted-ctaButton">
            <span>DISCOVER OUR ARTISANAL JOURNEY</span>
            <LuArrowRight className="Crafted-arrowIcon" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Crafted;