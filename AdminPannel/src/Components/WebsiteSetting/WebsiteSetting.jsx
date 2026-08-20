import React, { useState } from 'react';
import './WebsiteSetting.css';

// React Icons
import { 
  FiHome, 
  FiMail, 
  FiCreditCard, 
  FiSettings, 
  FiExternalLink, 
  FiSave, 
  FiUploadCloud, 
  FiImage, 
  FiMapPin, 
  FiPhone, 
  FiClock 
} from 'react-icons/fi';
import { 
  FaWhatsapp, 
  FaFacebookF, 
  FaInstagram, 
  FaYoutube, 
  FaTwitter 
} from 'react-icons/fa';

const WebsiteSetting = () => {
  const [activeTab, setActiveTab] = useState('general');

  // Form State
  const [formData, setFormData] = useState({
    storeName: 'Choco Bliss',
    tagline: 'Premium Chocolates, Pure Happiness',
    websiteEmail: 'support@chocobliss.com',
    storeDescription:
      'Choco Bliss brings you the finest selection of premium chocolates made with love and the best ingredients. Indulge in the richness of happiness.',
    address: '123 Chocolate Street, Sweet City, CA 90210, USA',
    phone: '+1 234 567 8900',
    whatsapp: '+1 234 567 8900',
    supportEmail: 'support@chocobliss.com',
    workingHours: 'Mon - Sun : 9:00 AM - 10:00 PM',
    facebook: 'https://facebook.com/chocobliss',
    instagram: 'https://instagram.com/chocobliss',
    youtube: 'https://youtube.com/chocobliss',
    twitter: 'https://twitter.com/chocobliss',
    metaTitle: 'Choco Bliss - Premium Chocolates Online',
    metaDescription:
      'Discover premium chocolates crafted with love. Order online for the best chocolate gifts, hampers and treats.'
  });

  // Toggles State
  const [features, setFeatures] = useState({
    premiumCollection: true,
    honeyProducts: true,
    customerReviews: true,
    newsletter: true,
    whatsappChat: true
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggle = (key) => {
    setFeatures((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="WebsiteSetting-container">
      {/* Top Header */}
      <header className="WebsiteSetting-header">
        <div className="WebsiteSetting-header-left">
          <h1 className="WebsiteSetting-title">Website Settings</h1>
          <p className="WebsiteSetting-subtitle">Manage your website details and preferences</p>
        </div>
        <div className="WebsiteSetting-header-actions">
          <button type="button" className="WebsiteSetting-btn-secondary">
            <span>Preview Website</span>
            <FiExternalLink />
          </button>
          <button type="button" className="WebsiteSetting-btn-primary">
            <FiSave />
            <span>Save Changes</span>
          </button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="WebsiteSetting-tabs">
        <button
          type="button"
          className={`WebsiteSetting-tab-btn ${activeTab === 'general' ? 'active' : ''}`}
          onClick={() => setActiveTab('general')}
        >
          <FiHome />
          <span>General Settings</span>
        </button>
        <button
          type="button"
          className={`WebsiteSetting-tab-btn ${activeTab === 'email' ? 'active' : ''}`}
          onClick={() => setActiveTab('email')}
        >
          <FiMail />
          <span>Email Settings</span>
        </button>
        <button
          type="button"
          className={`WebsiteSetting-tab-btn ${activeTab === 'payment' ? 'active' : ''}`}
          onClick={() => setActiveTab('payment')}
        >
          <FiCreditCard />
          <span>Payment Settings</span>
        </button>
        <button
          type="button"
          className={`WebsiteSetting-tab-btn ${activeTab === 'other' ? 'active' : ''}`}
          onClick={() => setActiveTab('other')}
        >
          <FiSettings />
          <span>Other Settings</span>
        </button>
      </nav>

      {/* Main Grid Content */}
      <main className="WebsiteSetting-grid">
        {/* Card 1: Store Profile */}
        <section className="WebsiteSetting-card">
          <h2 className="WebsiteSetting-card-title">Store Profile</h2>
          
          <div className="WebsiteSetting-profile-top">
            <div className="WebsiteSetting-logo-box">
              <div className="WebsiteSetting-logo-preview">
                <FiImage className="WebsiteSetting-placeholder-icon" />
              </div>
              <label className="WebsiteSetting-upload-btn">
                <FiUploadCloud />
                <span>Change Logo</span>
                <input type="file" accept="image/*" hidden />
              </label>
              <span className="WebsiteSetting-file-hint">JPG, PNG or WEBP. Max 2MB</span>
            </div>

            <div className="WebsiteSetting-profile-inputs">
              <div className="WebsiteSetting-field-group">
                <label>Store Name</label>
                <input
                  type="text"
                  name="storeName"
                  value={formData.storeName}
                  onChange={handleInputChange}
                />
              </div>

              <div className="WebsiteSetting-field-group">
                <label>Tagline</label>
                <input
                  type="text"
                  name="tagline"
                  value={formData.tagline}
                  onChange={handleInputChange}
                />
              </div>

              <div className="WebsiteSetting-field-group">
                <label>Website Email</label>
                <input
                  type="email"
                  name="websiteEmail"
                  value={formData.websiteEmail}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <div className="WebsiteSetting-field-group WebsiteSetting-desc-group">
            <label>Store Description</label>
            <textarea
              name="storeDescription"
              rows={3}
              value={formData.storeDescription}
              onChange={handleInputChange}
            />
          </div>
        </section>

        {/* Card 2: Contact Details */}
        <section className="WebsiteSetting-card">
          <h2 className="WebsiteSetting-card-title">Contact Details</h2>
          
          <div className="WebsiteSetting-contact-list">
            <div className="WebsiteSetting-contact-row">
              <div className="WebsiteSetting-contact-label">
                <FiMapPin className="WebsiteSetting-icon-muted" />
                <span>Address</span>
              </div>
              <input
                type="text"
                name="address"
                className="WebsiteSetting-input-flex"
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>

            <div className="WebsiteSetting-contact-row">
              <div className="WebsiteSetting-contact-label">
                <FiPhone className="WebsiteSetting-icon-muted" />
                <span>Phone Number</span>
              </div>
              <input
                type="text"
                name="phone"
                className="WebsiteSetting-input-flex"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>

            <div className="WebsiteSetting-contact-row">
              <div className="WebsiteSetting-contact-label">
                <FaWhatsapp className="WebsiteSetting-icon-muted" />
                <span>WhatsApp Number</span>
              </div>
              <input
                type="text"
                name="whatsapp"
                className="WebsiteSetting-input-flex"
                value={formData.whatsapp}
                onChange={handleInputChange}
              />
            </div>

            <div className="WebsiteSetting-contact-row">
              <div className="WebsiteSetting-contact-label">
                <FiMail className="WebsiteSetting-icon-muted" />
                <span>Support Email</span>
              </div>
              <input
                type="email"
                name="supportEmail"
                className="WebsiteSetting-input-flex"
                value={formData.supportEmail}
                onChange={handleInputChange}
              />
            </div>

            <div className="WebsiteSetting-contact-row">
              <div className="WebsiteSetting-contact-label">
                <FiClock className="WebsiteSetting-icon-muted" />
                <span>Working Hours</span>
              </div>
              <input
                type="text"
                name="workingHours"
                className="WebsiteSetting-input-flex"
                value={formData.workingHours}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </section>

        {/* Card 3: Features */}
        <section className="WebsiteSetting-card">
          <h2 className="WebsiteSetting-card-title">Features</h2>
          
          <div className="WebsiteSetting-features-list">
            {[
              { id: 'premiumCollection', label: 'Enable Premium Collection' },
              { id: 'honeyProducts', label: 'Enable Honey Products' },
              { id: 'customerReviews', label: 'Enable Customer Reviews' },
              { id: 'newsletter', label: 'Enable Newsletter Subscription' },
              { id: 'whatsappChat', label: 'Enable WhatsApp Chat' }
            ].map((feature) => (
              <div className="WebsiteSetting-feature-row" key={feature.id}>
                <span>{feature.label}</span>
                <label className="WebsiteSetting-switch">
                  <input
                    type="checkbox"
                    checked={features[feature.id]}
                    onChange={() => handleToggle(feature.id)}
                  />
                  <span className="WebsiteSetting-slider"></span>
                </label>
              </div>
            ))}
          </div>
        </section>

        {/* Card 4: Social Media Links */}
        <section className="WebsiteSetting-card">
          <h2 className="WebsiteSetting-card-title">Social Media Links</h2>
          
          <div className="WebsiteSetting-social-list">
            <div className="WebsiteSetting-social-row">
              <div className="WebsiteSetting-social-brand">
                <div className="WebsiteSetting-brand-icon fb">
                  <FaFacebookF />
                </div>
                <span>Facebook</span>
              </div>
              <input
                type="text"
                name="facebook"
                className="WebsiteSetting-input-flex"
                value={formData.facebook}
                onChange={handleInputChange}
              />
            </div>

            <div className="WebsiteSetting-social-row">
              <div className="WebsiteSetting-social-brand">
                <div className="WebsiteSetting-brand-icon insta">
                  <FaInstagram />
                </div>
                <span>Instagram</span>
              </div>
              <input
                type="text"
                name="instagram"
                className="WebsiteSetting-input-flex"
                value={formData.instagram}
                onChange={handleInputChange}
              />
            </div>

            <div className="WebsiteSetting-social-row">
              <div className="WebsiteSetting-social-brand">
                <div className="WebsiteSetting-brand-icon yt">
                  <FaYoutube />
                </div>
                <span>YouTube</span>
              </div>
              <input
                type="text"
                name="youtube"
                className="WebsiteSetting-input-flex"
                value={formData.youtube}
                onChange={handleInputChange}
              />
            </div>

            <div className="WebsiteSetting-social-row">
              <div className="WebsiteSetting-social-brand">
                <div className="WebsiteSetting-brand-icon tw">
                  <FaTwitter />
                </div>
                <span>Twitter</span>
              </div>
              <input
                type="text"
                name="twitter"
                className="WebsiteSetting-input-flex"
                value={formData.twitter}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </section>

        {/* Card 5: SEO Settings (Full Width) */}
        <section className="WebsiteSetting-card WebsiteSetting-card-full">
          <h2 className="WebsiteSetting-card-title">SEO Settings</h2>
          
          <div className="WebsiteSetting-seo-row">
            <div className="WebsiteSetting-seo-item">
              <label>Meta Title</label>
              <input
                type="text"
                name="metaTitle"
                value={formData.metaTitle}
                onChange={handleInputChange}
              />
            </div>

            <div className="WebsiteSetting-seo-item WebsiteSetting-seo-desc">
              <label>Meta Description</label>
              <input
                type="text"
                name="metaDescription"
                value={formData.metaDescription}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default WebsiteSetting;