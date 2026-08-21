import React from 'react';
import './AboutHoney.css';
import bgImage from '../../assets/honey-3.webp'; // Make sure your background image path is correct

const AboutHoney = () => {
  return (
    <section className="AboutHoney">
      {/* Full Hero Container */}
      <div 
        className="AboutHoney-bg" 
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        {/* Subtle Ambient Floating Particles */}
        <div className="AboutHoney-particles">
          <span className="AboutHoney-sparkle" style={{ top: '25%', left: '55%', animationDelay: '0s' }} />
          <span className="AboutHoney-sparkle" style={{ top: '65%', left: '50%', animationDelay: '1.5s' }} />
          <span className="AboutHoney-sparkle" style={{ top: '35%', left: '90%', animationDelay: '2.8s' }} />
        </div>

        {/* Translucent Golden Glass Box on the Right */}
        <div className="AboutHoney-card">
          
          {/* Subheading / Tagline */}
          <div className="AboutHoney-tagline">
            <span className="AboutHoney-star">✦</span>
            <span>ABOUT SABRIYANA</span>
          </div>

          {/* Heading */}
          <h1 className="AboutHoney-heading">
            Bringing <span className="AboutHoney-highlight">Nature’s</span><br />
            Goodness To You
          </h1>

          {/* Description */}
          <p className="AboutHoney-description">
            At Sabriyana, we believe the best honey comes straight from nature. 
            Our honey is carefully collected from wild forests, ensuring it remains 
            pure, raw and packed with nutrients.
          </p>

          {/* Feature Badges */}
          <div className="AboutHoney-features">
            
            <div className="AboutHoney-featureItem">
              <div className="AboutHoney-iconWrapper">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                  <polyline points="2 17 12 22 22 17"></polyline>
                  <polyline points="2 12 12 17 22 12"></polyline>
                </svg>
              </div>
              <span className="AboutHoney-featureLabel">Sustainably<br />Sourced</span>
            </div>

            <div className="AboutHoney-divider" />

            <div className="AboutHoney-featureItem">
              <div className="AboutHoney-iconWrapper">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <span className="AboutHoney-featureLabel">Ethically<br />Harvested</span>
            </div>

            <div className="AboutHoney-divider" />

            <div className="AboutHoney-featureItem">
              <div className="AboutHoney-iconWrapper">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                  <line x1="12" y1="22.08" x2="12" y2="12"></line>
                </svg>
              </div>
              <span className="AboutHoney-featureLabel">Packed with<br />Care</span>
            </div>

          </div>

          {/* Golden CTA Button */}
          <button className="AboutHoney-button">
            LEARN MORE ABOUT US
          </button>

        </div>
      </div>
    </section>
  );
};

export default AboutHoney;