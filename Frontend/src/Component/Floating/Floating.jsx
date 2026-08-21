import React, { useState } from 'react';
import './Floating.css';

// React Icons
import { IoClose, IoPaperPlane } from 'react-icons/io5';
import { FaLeaf } from 'react-icons/fa6';
import { FiUser, FiMail, FiPhone, FiHeart } from 'react-icons/fi';
import { RiLeafLine, RiAwardLine } from 'react-icons/ri';

// Image paths
import chocolateBarImg from "../../assets/sabriyana-chocolate-bar.webp";
import brandLogoImg from "../../assets/sabriyana-brand-logo.webp";

const Floating = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 400);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleClose();
  };

  if (!isVisible) return null;

  return (
    <div className={`floating-backdrop ${isClosing ? 'floating-fade-out' : ''}`}>
      <div className={`floating-container ${isClosing ? 'floating-scale-down' : ''}`}>
        
        {/* Close Button */}
        <button 
          className="floating-close-btn" 
          onClick={handleClose}
          aria-label="Close form"
        >
          <IoClose />
        </button>

        {/* Left Side: Product Showcase */}
        <div className="floating-visual-pane">
          <div className="floating-product-wrapper">
            <img 
              src={chocolateBarImg || 'https://images.unsplash.com/photo-1548907040-4baa42d10919?w=600&auto=format&fit=crop&q=80'} 
              alt="Sabriyana 55% Cocoa Chocolate" 
              className="floating-product-img" 
            />
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="floating-form-pane">
          <div className="floating-badge">
            <FaLeaf className="floating-badge-icon" />
            <span>Get In Touch</span>
          </div>

          {/* Brand Logo below Get In Touch */}
          <div className="floating-brand-header">
            {brandLogoImg ? (
              <img src={brandLogoImg} alt="Sabriyana Logo" className="floating-brand-logo" />
            ) : (
              <div className="floating-brand-text">
                <span className="floating-brand-title">SABRIYANA</span>
                <span className="floating-brand-subtitle">— CRAFT CHOCOLATE —</span>
              </div>
            )}
          </div>

          <form className="floating-form" onSubmit={handleSubmit}>
            <div className="floating-input-group">
              <FiUser className="floating-input-icon" />
              <input 
                type="text" 
                placeholder="Your Name" 
                className="floating-input" 
                required 
              />
            </div>

            <div className="floating-input-group">
              <FiMail className="floating-input-icon" />
              <input 
                type="email" 
                placeholder="Your Email" 
                className="floating-input" 
                required 
              />
            </div>

            <div className="floating-input-group">
              <FiPhone className="floating-input-icon" />
              <input 
                type="tel" 
                placeholder="Your Phone" 
                className="floating-input" 
              />
            </div>

            <div className="floating-textarea-group">
              <textarea 
                placeholder="Your Message" 
                className="floating-textarea" 
                rows="3" 
                required 
              />
              <FaLeaf className="floating-watermark-leaf" />
            </div>

            <button type="submit" className="floating-submit-btn">
              <IoPaperPlane className="floating-send-icon" />
              <span>Send Message</span>
            </button>
          </form>

          {/* Bottom Highlight Badges */}
          <div className="floating-features-footer">
            <div className="floating-feature-item">
              <RiLeafLine className="floating-feature-icon" />
              <span className="floating-feature-title">Organic</span>
              <span className="floating-feature-sub">Ingredients</span>
            </div>

            <div className="floating-feature-item">
              <FiHeart className="floating-feature-icon" />
              <span className="floating-feature-title">Luxury</span>
              <span className="floating-feature-sub">Taste</span>
            </div>

            <div className="floating-feature-item">
              <RiAwardLine className="floating-feature-icon" />
              <span className="floating-feature-title">Made with</span>
              <span className="floating-feature-sub">Heritage</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Floating;