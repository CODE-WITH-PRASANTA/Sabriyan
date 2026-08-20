import React, { useState, useEffect } from 'react';
import { User, Phone, Mail, MessageSquare, Send, X, ShieldCheck, MessageCircle } from 'lucide-react';
import './Flotingcontact.css';

const Flotingcontact = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  // Check login status on component mount
  useEffect(() => {
    const token = localStorage.getItem('authToken'); // आपका टोकन या यूजर डेटा की key
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // अगर यूजर लॉगिन नहीं है तो कुछ भी रेंडर न करें
  if (!isLoggedIn) {
    return null;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
  };

  return (
    <>
      {/* Floating Action Trigger Button (When Form is Closed) */}
      {!isOpen && (
        <button 
          className="floating-trigger-btn"
          onClick={() => setIsOpen(true)}
          aria-label="Open Contact Form"
        >
          <MessageCircle size={26} />
          <span className="trigger-pulse"></span>
        </button>
      )}

      {/* Floating 3D Glassmorphic Form Modal */}
      {isOpen && (
        <div className="floating-contact-container">
          <div className="floating-card-3d">
            <div className="glow-top-left"></div>
            <div className="glow-bottom-right"></div>

            <button 
              className="floating-close-btn" 
              onClick={() => setIsOpen(false)}
              aria-label="Close form"
            >
              <X size={18} />
            </button>

            <div className="form-header">
              <span className="subtitle">Get in Touch with</span>
              <h2 className="brand-logo">SABRIYANA</h2>
              <p className="tagline">Nature's Goodness, Right at Your Home</p>
              
              <div className="leaf-divider">
                <span className="line"></span>
                <span className="leaf-icon">🍃</span>
                <span className="line"></span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="input-box">
                <User size={18} className="field-icon" />
                <input 
                  type="text" 
                  name="name" 
                  placeholder="Your Name" 
                  required 
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="input-box">
                <Phone size={18} className="field-icon" />
                <input 
                  type="tel" 
                  name="phone" 
                  placeholder="Phone Number" 
                  required 
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="input-box">
                <Mail size={18} className="field-icon" />
                <input 
                  type="email" 
                  name="email" 
                  placeholder="Email Address" 
                  required 
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="input-box textarea-box">
                <MessageSquare size={18} className="field-icon" />
                <textarea 
                  name="message" 
                  rows="3" 
                  placeholder="Your Message" 
                  required 
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>

              <button type="submit" className="submit-btn-3d">
                <Send size={18} />
                <span>Send Message</span>
              </button>
            </form>

            <div className="form-footer">
              <div className="footer-line"></div>
              <div className="trust-badge">
                <ShieldCheck size={16} className="shield-icon" />
                <span>We will contact you soon!</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Flotingcontact;