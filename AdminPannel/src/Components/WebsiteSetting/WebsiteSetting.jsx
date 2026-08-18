import React, { useState } from "react";
import "./WebsiteSetting.css";

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
  FiClock,
  FiServer,
  FiShield,
  FiGlobe,
  FiBell,
  FiDollarSign,
  FiLock,
  FiDatabase,
  FiBarChart2,
  FiCheckCircle,
  FiAlertCircle,
  FiRefreshCw,
} from "react-icons/fi";

import {
  FaWhatsapp,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaTwitter,
} from "react-icons/fa";

const WebsiteSetting = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [saveMessage, setSaveMessage] = useState("");

  // Logo
  const [logoPreview, setLogoPreview] = useState(null);

  // General Settings
  const [formData, setFormData] = useState({
    storeName: "Choco Bliss",
    tagline: "Premium Chocolates, Pure Happiness",
    websiteEmail: "support@chocobliss.com",
    storeDescription:
      "Choco Bliss brings you the finest selection of premium chocolates made with love and the best ingredients. Indulge in the richness of happiness.",

    address: "123 Chocolate Street, Sweet City, CA 90210, USA",
    phone: "+1 234 567 8900",
    whatsapp: "+1 234 567 8900",
    supportEmail: "support@chocobliss.com",
    workingHours: "Mon - Sun : 9:00 AM - 10:00 PM",

    facebook: "https://facebook.com/chocobliss",
    instagram: "https://instagram.com/chocobliss",
    youtube: "https://youtube.com/chocobliss",
    twitter: "https://twitter.com/chocobliss",

    metaTitle: "Choco Bliss - Premium Chocolates Online",
    metaDescription:
      "Discover premium chocolates crafted with love. Order online for the best chocolate gifts, hampers and treats.",
  });

  // Features
  const [features, setFeatures] = useState({
    premiumCollection: true,
    honeyProducts: true,
    customerReviews: true,
    newsletter: true,
    whatsappChat: true,
  });

  // Email Settings
  const [emailSettings, setEmailSettings] = useState({
    mailProvider: "SMTP",
    smtpHost: "smtp.gmail.com",
    smtpPort: "587",
    smtpUsername: "support@chocobliss.com",
    smtpPassword: "",
    encryption: "TLS",
    senderName: "Choco Bliss",
    senderEmail: "support@chocobliss.com",
    orderNotification: true,
    customerRegistration: true,
    paymentNotification: true,
    newsletterNotification: false,
  });

  // Payment Settings
  const [paymentSettings, setPaymentSettings] = useState({
    currency: "USD",
    currencySymbol: "$",
    razorpayKey: "",
    razorpaySecret: "",
    stripePublicKey: "",
    stripeSecretKey: "",
    cod: true,
    onlinePayment: true,
    paypal: false,
    razorpay: true,
    stripe: false,
    testMode: true,
  });

  // Other Settings
  const [otherSettings, setOtherSettings] = useState({
    timezone: "Asia/Kolkata",
    language: "English",
    dateFormat: "DD/MM/YYYY",
    maintenanceMode: false,
    customerRegistration: true,
    guestCheckout: true,
    googleAnalytics: "",
    facebookPixel: "",
    enableCache: true,
    enableSecurity: true,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEmailChange = (e) => {
    const { name, value } = e.target;

    setEmailSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;

    setPaymentSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOtherChange = (e) => {
    const { name, value } = e.target;

    setOtherSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleToggle = (key) => {
    setFeatures((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleEmailToggle = (key) => {
    setEmailSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handlePaymentToggle = (key) => {
    setPaymentSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleOtherToggle = (key) => {
    setOtherSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("Logo size must be less than 2MB.");
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    setLogoPreview(imageUrl);
  };

  const handleSave = () => {
    setSaveMessage("Changes saved successfully!");

    setTimeout(() => {
      setSaveMessage("");
    }, 3000);
  };

  const handlePreview = () => {
    window.open("https://chocobliss.com", "_blank");
  };

  const renderToggle = (label, value, onChange) => {
    return (
      <div className="WebsiteSetting-feature-row">
        <span>{label}</span>

        <label className="WebsiteSetting-switch">
          <input
            type="checkbox"
            checked={value}
            onChange={onChange}
          />

          <span className="WebsiteSetting-slider"></span>
        </label>
      </div>
    );
  };

  /* =========================================================
     GENERAL SETTINGS
  ========================================================= */

  const renderGeneralSettings = () => {
    return (
      <>
        {/* Store Profile */}
        <section className="WebsiteSetting-card">
          <h2 className="WebsiteSetting-card-title">
            Store Profile
          </h2>

          <div className="WebsiteSetting-profile-top">
            <div className="WebsiteSetting-logo-box">
              <div className="WebsiteSetting-logo-preview">
                {logoPreview ? (
                  <img
                    src={logoPreview}
                    alt="Store Logo"
                    className="WebsiteSetting-logo-image"
                  />
                ) : (
                  <FiImage className="WebsiteSetting-placeholder-icon" />
                )}
              </div>

              <label className="WebsiteSetting-upload-btn">
                <FiUploadCloud />
                <span>Change Logo</span>

                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleLogoChange}
                />
              </label>

              <span className="WebsiteSetting-file-hint">
                JPG, PNG or WEBP. Max 2MB
              </span>
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

        {/* Contact Details */}
        <section className="WebsiteSetting-card">
          <h2 className="WebsiteSetting-card-title">
            Contact Details
          </h2>

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

        {/* Features */}
        <section className="WebsiteSetting-card">
          <h2 className="WebsiteSetting-card-title">
            Features
          </h2>

          <div className="WebsiteSetting-features-list">
            {renderToggle(
              "Enable Premium Collection",
              features.premiumCollection,
              () => handleToggle("premiumCollection")
            )}

            {renderToggle(
              "Enable Honey Products",
              features.honeyProducts,
              () => handleToggle("honeyProducts")
            )}

            {renderToggle(
              "Enable Customer Reviews",
              features.customerReviews,
              () => handleToggle("customerReviews")
            )}

            {renderToggle(
              "Enable Newsletter Subscription",
              features.newsletter,
              () => handleToggle("newsletter")
            )}

            {renderToggle(
              "Enable WhatsApp Chat",
              features.whatsappChat,
              () => handleToggle("whatsappChat")
            )}
          </div>
        </section>

        {/* Social Media */}
        <section className="WebsiteSetting-card">
          <h2 className="WebsiteSetting-card-title">
            Social Media Links
          </h2>

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

        {/* SEO */}
        <section className="WebsiteSetting-card WebsiteSetting-card-full">
          <h2 className="WebsiteSetting-card-title">
            SEO Settings
          </h2>

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

            <div className="WebsiteSetting-seo-item">
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
      </>
    );
  };

  /* =========================================================
     EMAIL SETTINGS
  ========================================================= */

  const renderEmailSettings = () => {
    return (
      <>
        <section className="WebsiteSetting-card">
          <div className="WebsiteSetting-section-heading">
            <div className="WebsiteSetting-heading-icon">
              <FiMail />
            </div>

            <div>
              <h2 className="WebsiteSetting-card-title WebsiteSetting-title-no-border">
                Email Configuration
              </h2>

              <p className="WebsiteSetting-section-description">
                Configure your website email server and sender details.
              </p>
            </div>
          </div>

          <div className="WebsiteSetting-form-grid">
            <div className="WebsiteSetting-field-group">
              <label>Mail Provider</label>

              <select
                name="mailProvider"
                value={emailSettings.mailProvider}
                onChange={handleEmailChange}
              >
                <option value="SMTP">SMTP</option>
                <option value="Gmail">Gmail</option>
                <option value="SendGrid">SendGrid</option>
                <option value="Mailgun">Mailgun</option>
              </select>
            </div>

            <div className="WebsiteSetting-field-group">
              <label>SMTP Host</label>

              <input
                type="text"
                name="smtpHost"
                value={emailSettings.smtpHost}
                onChange={handleEmailChange}
              />
            </div>

            <div className="WebsiteSetting-field-group">
              <label>SMTP Port</label>

              <input
                type="text"
                name="smtpPort"
                value={emailSettings.smtpPort}
                onChange={handleEmailChange}
              />
            </div>

            <div className="WebsiteSetting-field-group">
              <label>Encryption</label>

              <select
                name="encryption"
                value={emailSettings.encryption}
                onChange={handleEmailChange}
              >
                <option value="TLS">TLS</option>
                <option value="SSL">SSL</option>
                <option value="None">None</option>
              </select>
            </div>

            <div className="WebsiteSetting-field-group">
              <label>SMTP Username</label>

              <input
                type="email"
                name="smtpUsername"
                value={emailSettings.smtpUsername}
                onChange={handleEmailChange}
              />
            </div>

            <div className="WebsiteSetting-field-group">
              <label>SMTP Password</label>

              <input
                type="password"
                name="smtpPassword"
                placeholder="Enter SMTP password"
                value={emailSettings.smtpPassword}
                onChange={handleEmailChange}
              />
            </div>
          </div>
        </section>

        <section className="WebsiteSetting-card">
          <h2 className="WebsiteSetting-card-title">
            Sender Information
          </h2>

          <div className="WebsiteSetting-form-grid">
            <div className="WebsiteSetting-field-group">
              <label>Sender Name</label>

              <input
                type="text"
                name="senderName"
                value={emailSettings.senderName}
                onChange={handleEmailChange}
              />
            </div>

            <div className="WebsiteSetting-field-group">
              <label>Sender Email</label>

              <input
                type="email"
                name="senderEmail"
                value={emailSettings.senderEmail}
                onChange={handleEmailChange}
              />
            </div>
          </div>

          <div className="WebsiteSetting-email-status">
            <FiCheckCircle />
            <span>Email service configuration is ready</span>
          </div>
        </section>

        <section className="WebsiteSetting-card WebsiteSetting-card-full">
          <h2 className="WebsiteSetting-card-title">
            Email Notifications
          </h2>

          <div className="WebsiteSetting-notification-grid">
            {renderToggle(
              "New Order Notification",
              emailSettings.orderNotification,
              () => handleEmailToggle("orderNotification")
            )}

            {renderToggle(
              "Customer Registration",
              emailSettings.customerRegistration,
              () => handleEmailToggle("customerRegistration")
            )}

            {renderToggle(
              "Payment Notification",
              emailSettings.paymentNotification,
              () => handleEmailToggle("paymentNotification")
            )}

            {renderToggle(
              "Newsletter Notification",
              emailSettings.newsletterNotification,
              () => handleEmailToggle("newsletterNotification")
            )}
          </div>
        </section>
      </>
    );
  };

  /* =========================================================
     PAYMENT SETTINGS
  ========================================================= */

  const renderPaymentSettings = () => {
    return (
      <>
        <section className="WebsiteSetting-card">
          <div className="WebsiteSetting-section-heading">
            <div className="WebsiteSetting-heading-icon">
              <FiCreditCard />
            </div>

            <div>
              <h2 className="WebsiteSetting-card-title WebsiteSetting-title-no-border">
                Payment Configuration
              </h2>

              <p className="WebsiteSetting-section-description">
                Configure currency and online payment settings.
              </p>
            </div>
          </div>

          <div className="WebsiteSetting-form-grid">
            <div className="WebsiteSetting-field-group">
              <label>Currency</label>

              <select
                name="currency"
                value={paymentSettings.currency}
                onChange={handlePaymentChange}
              >
                <option value="USD">USD - US Dollar</option>
                <option value="INR">INR - Indian Rupee</option>
                <option value="EUR">EUR - Euro</option>
                <option value="GBP">GBP - British Pound</option>
              </select>
            </div>

            <div className="WebsiteSetting-field-group">
              <label>Currency Symbol</label>

              <input
                type="text"
                name="currencySymbol"
                value={paymentSettings.currencySymbol}
                onChange={handlePaymentChange}
              />
            </div>
          </div>
        </section>

        <section className="WebsiteSetting-card">
          <h2 className="WebsiteSetting-card-title">
            Payment Methods
          </h2>

          <div className="WebsiteSetting-features-list">
            {renderToggle(
              "Cash on Delivery",
              paymentSettings.cod,
              () => handlePaymentToggle("cod")
            )}

            {renderToggle(
              "Online Payment",
              paymentSettings.onlinePayment,
              () => handlePaymentToggle("onlinePayment")
            )}

            {renderToggle(
              "Razorpay",
              paymentSettings.razorpay,
              () => handlePaymentToggle("razorpay")
            )}

            {renderToggle(
              "Stripe",
              paymentSettings.stripe,
              () => handlePaymentToggle("stripe")
            )}

            {renderToggle(
              "PayPal",
              paymentSettings.paypal,
              () => handlePaymentToggle("paypal")
            )}
          </div>
        </section>

        <section className="WebsiteSetting-card WebsiteSetting-card-full">
          <div className="WebsiteSetting-payment-header">
            <div>
              <h2 className="WebsiteSetting-card-title">
                Gateway Credentials
              </h2>

              <p className="WebsiteSetting-section-description">
                Add your payment gateway credentials securely.
              </p>
            </div>

            <div className="WebsiteSetting-test-mode">
              <FiAlertCircle />
              Test Mode
            </div>
          </div>

          <div className="WebsiteSetting-form-grid WebsiteSetting-payment-grid">
            <div className="WebsiteSetting-field-group">
              <label>Razorpay Key ID</label>

              <input
                type="text"
                name="razorpayKey"
                placeholder="Enter Razorpay key"
                value={paymentSettings.razorpayKey}
                onChange={handlePaymentChange}
              />
            </div>

            <div className="WebsiteSetting-field-group">
              <label>Razorpay Secret</label>

              <input
                type="password"
                name="razorpaySecret"
                placeholder="Enter Razorpay secret"
                value={paymentSettings.razorpaySecret}
                onChange={handlePaymentChange}
              />
            </div>

            <div className="WebsiteSetting-field-group">
              <label>Stripe Public Key</label>

              <input
                type="text"
                name="stripePublicKey"
                placeholder="Enter Stripe public key"
                value={paymentSettings.stripePublicKey}
                onChange={handlePaymentChange}
              />
            </div>

            <div className="WebsiteSetting-field-group">
              <label>Stripe Secret Key</label>

              <input
                type="password"
                name="stripeSecretKey"
                placeholder="Enter Stripe secret key"
                value={paymentSettings.stripeSecretKey}
                onChange={handlePaymentChange}
              />
            </div>
          </div>

          <div className="WebsiteSetting-test-toggle">
            {renderToggle(
              "Enable Test Mode",
              paymentSettings.testMode,
              () => handlePaymentToggle("testMode")
            )}
          </div>
        </section>
      </>
    );
  };

  /* =========================================================
     OTHER SETTINGS
  ========================================================= */

  const renderOtherSettings = () => {
    return (
      <>
        <section className="WebsiteSetting-card">
          <div className="WebsiteSetting-section-heading">
            <div className="WebsiteSetting-heading-icon">
              <FiSettings />
            </div>

            <div>
              <h2 className="WebsiteSetting-card-title WebsiteSetting-title-no-border">
                Website Preferences
              </h2>

              <p className="WebsiteSetting-section-description">
                Manage general website behavior and preferences.
              </p>
            </div>
          </div>

          <div className="WebsiteSetting-form-grid">
            <div className="WebsiteSetting-field-group">
              <label>Timezone</label>

              <select
                name="timezone"
                value={otherSettings.timezone}
                onChange={handleOtherChange}
              >
                <option value="Asia/Kolkata">
                  Asia/Kolkata
                </option>

                <option value="America/New_York">
                  America/New_York
                </option>

                <option value="Europe/London">
                  Europe/London
                </option>

                <option value="Asia/Dubai">
                  Asia/Dubai
                </option>
              </select>
            </div>

            <div className="WebsiteSetting-field-group">
              <label>Default Language</label>

              <select
                name="language"
                value={otherSettings.language}
                onChange={handleOtherChange}
              >
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
                <option value="Odia">Odia</option>
              </select>
            </div>

            <div className="WebsiteSetting-field-group">
              <label>Date Format</label>

              <select
                name="dateFormat"
                value={otherSettings.dateFormat}
                onChange={handleOtherChange}
              >
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              </select>
            </div>
          </div>
        </section>

        <section className="WebsiteSetting-card">
          <h2 className="WebsiteSetting-card-title">
            Website Access
          </h2>

          <div className="WebsiteSetting-features-list">
            {renderToggle(
              "Maintenance Mode",
              otherSettings.maintenanceMode,
              () => handleOtherToggle("maintenanceMode")
            )}

            {renderToggle(
              "Allow Customer Registration",
              otherSettings.customerRegistration,
              () => handleOtherToggle("customerRegistration")
            )}

            {renderToggle(
              "Allow Guest Checkout",
              otherSettings.guestCheckout,
              () => handleOtherToggle("guestCheckout")
            )}
          </div>
        </section>

        <section className="WebsiteSetting-card">
          <h2 className="WebsiteSetting-card-title">
            Performance & Security
          </h2>

          <div className="WebsiteSetting-features-list">
            {renderToggle(
              "Enable Website Cache",
              otherSettings.enableCache,
              () => handleOtherToggle("enableCache")
            )}

            {renderToggle(
              "Enable Security Protection",
              otherSettings.enableSecurity,
              () => handleOtherToggle("enableSecurity")
            )}
          </div>
        </section>

        <section className="WebsiteSetting-card">
          <div className="WebsiteSetting-card-title-icon">
            <FiBarChart2 />
            <h2 className="WebsiteSetting-card-title">
              Analytics
            </h2>
          </div>

          <div className="WebsiteSetting-field-group">
            <label>Google Analytics ID</label>

            <input
              type="text"
              name="googleAnalytics"
              placeholder="G-XXXXXXXXXX"
              value={otherSettings.googleAnalytics}
              onChange={handleOtherChange}
            />
          </div>

          <div className="WebsiteSetting-field-group">
            <label>Facebook Pixel ID</label>

            <input
              type="text"
              name="facebookPixel"
              placeholder="Enter Facebook Pixel ID"
              value={otherSettings.facebookPixel}
              onChange={handleOtherChange}
            />
          </div>
        </section>

        <section className="WebsiteSetting-card WebsiteSetting-card-full">
          <div className="WebsiteSetting-system-info">
            <div className="WebsiteSetting-system-info-item">
              <FiServer />
              <div>
                <span>Server Status</span>
                <strong>Online</strong>
              </div>
            </div>

            <div className="WebsiteSetting-system-info-item">
              <FiDatabase />
              <div>
                <span>Database</span>
                <strong>Connected</strong>
              </div>
            </div>

            <div className="WebsiteSetting-system-info-item">
              <FiShield />
              <div>
                <span>Security</span>
                <strong>Protected</strong>
              </div>
            </div>

            <div className="WebsiteSetting-system-info-item">
              <FiRefreshCw />
              <div>
                <span>Last Sync</span>
                <strong>Just now</strong>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  };

  /* =========================================================
     TAB CONTENT
  ========================================================= */

  const renderActiveTab = () => {
    switch (activeTab) {
      case "general":
        return renderGeneralSettings();

      case "email":
        return renderEmailSettings();

      case "payment":
        return renderPaymentSettings();

      case "other":
        return renderOtherSettings();

      default:
        return renderGeneralSettings();
    }
  };

  return (
    <div className="WebsiteSetting-container">

      {/* HEADER */}
      <header className="WebsiteSetting-header">
        <div className="WebsiteSetting-header-left">
          <h1 className="WebsiteSetting-title">
            Website Settings
          </h1>

          <p className="WebsiteSetting-subtitle">
            Manage your website details and preferences
          </p>
        </div>

        <div className="WebsiteSetting-header-actions">

          <button
            type="button"
            className="WebsiteSetting-btn-secondary"
            onClick={handlePreview}
          >
            <span>Preview Website</span>
            <FiExternalLink />
          </button>

          <button
            type="button"
            className="WebsiteSetting-btn-primary"
            onClick={handleSave}
          >
            <FiSave />
            <span>Save Changes</span>
          </button>

        </div>
      </header>

      {/* SUCCESS MESSAGE */}
      {saveMessage && (
        <div className="WebsiteSetting-save-message">
          <FiCheckCircle />
          <span>{saveMessage}</span>
        </div>
      )}

      {/* TABS */}
      <nav className="WebsiteSetting-tabs">

        <button
          type="button"
          className={`WebsiteSetting-tab-btn ${
            activeTab === "general" ? "active" : ""
          }`}
          onClick={() => setActiveTab("general")}
        >
          <FiHome />
          <span>General Settings</span>
        </button>

        <button
          type="button"
          className={`WebsiteSetting-tab-btn ${
            activeTab === "email" ? "active" : ""
          }`}
          onClick={() => setActiveTab("email")}
        >
          <FiMail />
          <span>Email Settings</span>
        </button>

        <button
          type="button"
          className={`WebsiteSetting-tab-btn ${
            activeTab === "payment" ? "active" : ""
          }`}
          onClick={() => setActiveTab("payment")}
        >
          <FiCreditCard />
          <span>Payment Settings</span>
        </button>

        <button
          type="button"
          className={`WebsiteSetting-tab-btn ${
            activeTab === "other" ? "active" : ""
          }`}
          onClick={() => setActiveTab("other")}
        >
          <FiSettings />
          <span>Other Settings</span>
        </button>

      </nav>

      {/* ACTIVE TAB CONTENT */}
      <main className="WebsiteSetting-grid">
        {renderActiveTab()}
      </main>

    </div>
  );
};

export default WebsiteSetting;