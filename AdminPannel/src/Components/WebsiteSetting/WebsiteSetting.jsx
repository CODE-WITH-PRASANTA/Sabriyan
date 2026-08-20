import React, { useEffect, useState } from "react";
import axios from "axios";
import "./WebsiteSetting.css";

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

const API_URL =
  "http://localhost:5000/api/website-settings";

const IMAGE_BASE_URL =
  "http://localhost:5000";

const WebsiteSetting = () => {
  const [activeTab, setActiveTab] =
    useState("general");

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [saveMessage, setSaveMessage] =
    useState("");

  const [errorMessage, setErrorMessage] =
    useState("");

  const [logoPreview, setLogoPreview] =
    useState(null);

  const [logoFile, setLogoFile] =
    useState(null);

  // =====================================================
  // GENERAL FORM DATA
  // =====================================================

  const [formData, setFormData] = useState({
    storeName: "Choco Bliss",
    tagline:
      "Premium Chocolates, Pure Happiness",
    websiteEmail:
      "support@chocobliss.com",

    storeDescription:
      "Choco Bliss brings you the finest selection of premium chocolates made with love and the best ingredients. Indulge in the richness of happiness.",

    address:
      "123 Chocolate Street, Sweet City, CA 90210, USA",

    phone: "+1 234 567 8900",

    whatsapp: "+1 234 567 8900",

    supportEmail:
      "support@chocobliss.com",

    workingHours:
      "Mon - Sun : 9:00 AM - 10:00 PM",

    facebook:
      "https://facebook.com/chocobliss",

    instagram:
      "https://instagram.com/chocobliss",

    youtube:
      "https://youtube.com/chocobliss",

    twitter:
      "https://twitter.com/chocobliss",

    metaTitle:
      "Choco Bliss - Premium Chocolates Online",

    metaDescription:
      "Discover premium chocolates crafted with love. Order online for the best chocolate gifts, hampers and treats.",
  });

  // =====================================================
  // FEATURES
  // =====================================================

  const [features, setFeatures] =
    useState({
      premiumCollection: true,
      honeyProducts: true,
      customerReviews: true,
      newsletter: true,
      whatsappChat: true,
    });

  // =====================================================
  // EMAIL SETTINGS
  // =====================================================

  const [emailSettings, setEmailSettings] =
    useState({
      mailProvider: "SMTP",
      smtpHost: "smtp.gmail.com",
      smtpPort: "587",
      smtpUsername:
        "support@chocobliss.com",
      smtpPassword: "",
      encryption: "TLS",
      senderName: "Choco Bliss",
      senderEmail:
        "support@chocobliss.com",
      orderNotification: true,
      customerRegistration: true,
      paymentNotification: true,
      newsletterNotification: false,
    });

  // =====================================================
  // PAYMENT SETTINGS
  // =====================================================

  const [paymentSettings, setPaymentSettings] =
    useState({
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

  // =====================================================
  // OTHER SETTINGS
  // =====================================================

  const [otherSettings, setOtherSettings] =
    useState({
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

  // =====================================================
  // LOAD SETTINGS
  // =====================================================

  useEffect(() => {
    fetchSettings();

    return () => {
      if (
        logoPreview &&
        logoPreview.startsWith("blob:")
      ) {
        URL.revokeObjectURL(
          logoPreview
        );
      }
    };
  }, []);

  // =====================================================
  // FETCH SETTINGS
  // =====================================================

  const fetchSettings = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const response =
        await axios.get(API_URL);

      if (
        response.data?.success &&
        response.data?.data
      ) {
        const data =
          response.data.data;

        // -------------------------------------------------
        // Store Profile
        // -------------------------------------------------

        setFormData((prev) => ({
          ...prev,

          storeName:
            data.storeProfile?.storeName ??
            prev.storeName,

          tagline:
            data.storeProfile?.tagline ??
            prev.tagline,

          websiteEmail:
            data.storeProfile?.websiteEmail ??
            prev.websiteEmail,

          storeDescription:
            data.storeProfile?.storeDescription ??
            prev.storeDescription,

          // Contact
          address:
            data.contactDetails?.address ??
            prev.address,

          phone:
            data.contactDetails?.phone ??
            prev.phone,

          whatsapp:
            data.contactDetails?.whatsapp ??
            prev.whatsapp,

          supportEmail:
            data.contactDetails?.supportEmail ??
            prev.supportEmail,

          workingHours:
            data.contactDetails?.workingHours ??
            prev.workingHours,

          // Social
          facebook:
            data.socialMedia?.facebook ??
            prev.facebook,

          instagram:
            data.socialMedia?.instagram ??
            prev.instagram,

          youtube:
            data.socialMedia?.youtube ??
            prev.youtube,

          twitter:
            data.socialMedia?.twitter ??
            prev.twitter,

          // SEO
          metaTitle:
            data.seo?.metaTitle ??
            prev.metaTitle,

          metaDescription:
            data.seo?.metaDescription ??
            prev.metaDescription,
        }));

        // -------------------------------------------------
        // Features
        // -------------------------------------------------

        if (data.features) {
          setFeatures((prev) => ({
            ...prev,
            ...data.features,
          }));
        }

        // -------------------------------------------------
        // Email
        // -------------------------------------------------

        if (data.emailSettings) {
          setEmailSettings((prev) => ({
            ...prev,
            ...data.emailSettings,
          }));
        }

        // -------------------------------------------------
        // Payment
        // -------------------------------------------------

        if (data.paymentSettings) {
          setPaymentSettings((prev) => ({
            ...prev,
            ...data.paymentSettings,
          }));
        }

        // -------------------------------------------------
        // Other
        // -------------------------------------------------

        if (data.otherSettings) {
          setOtherSettings((prev) => ({
            ...prev,
            ...data.otherSettings,
          }));
        }

        // -------------------------------------------------
        // Logo
        // -------------------------------------------------

        if (
          data.storeProfile?.logo
        ) {
          setLogoPreview(
            `${IMAGE_BASE_URL}${data.storeProfile.logo}`
          );
        } else {
          setLogoPreview(null);
        }

        // Existing DB logo means no new file selected
        setLogoFile(null);
      }
    } catch (error) {
      console.error(
        "Fetch Settings Error:",
        error
      );

      setErrorMessage(
        error.response?.data?.message ||
          "Failed to load website settings."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // GENERAL INPUT
  // =====================================================

  const handleInputChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =====================================================
  // EMAIL INPUT
  // =====================================================

  const handleEmailChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setEmailSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =====================================================
  // PAYMENT INPUT
  // =====================================================

  const handlePaymentChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setPaymentSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =====================================================
  // OTHER INPUT
  // =====================================================

  const handleOtherChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setOtherSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =====================================================
  // FEATURE TOGGLE
  // =====================================================

  const handleToggle = (key) => {
    setFeatures((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // =====================================================
  // EMAIL TOGGLE
  // =====================================================

  const handleEmailToggle = (key) => {
    setEmailSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // =====================================================
  // PAYMENT TOGGLE
  // =====================================================

  const handlePaymentToggle = (key) => {
    setPaymentSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // =====================================================
  // OTHER TOGGLE
  // =====================================================

  const handleOtherToggle = (key) => {
    setOtherSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // =====================================================
  // LOGO UPLOAD
  // NO DELETE BUTTON
  // =====================================================

  const handleLogoChange = (e) => {
    const file =
      e.target.files?.[0];

    if (!file) {
      return;
    }

    // Validate image
    if (
      !file.type ||
      !file.type.startsWith("image/")
    ) {
      setErrorMessage(
        "Please select a valid image file."
      );

      e.target.value = "";
      return;
    }

    // Validate size
    if (
      file.size >
      10 * 1024 * 1024
    ) {
      setErrorMessage(
        "Image size must be less than 10MB."
      );

      e.target.value = "";
      return;
    }

    // Clear old error
    setErrorMessage("");

    // Revoke previous temporary preview
    if (
      logoPreview &&
      logoPreview.startsWith("blob:")
    ) {
      URL.revokeObjectURL(
        logoPreview
      );
    }

    setLogoFile(file);

    const previewUrl =
      URL.createObjectURL(file);

    setLogoPreview(previewUrl);
  };

  // =====================================================
  // SAVE SETTINGS
  // =====================================================

  const handleSave = async () => {
    try {
      setSaving(true);
      setSaveMessage("");
      setErrorMessage("");

      const data =
        new FormData();

      // -------------------------------------------------
      // Store Profile
      // -------------------------------------------------

      data.append(
        "storeProfile",
        JSON.stringify({
          storeName:
            formData.storeName,

          tagline:
            formData.tagline,

          websiteEmail:
            formData.websiteEmail,

          storeDescription:
            formData.storeDescription,
        })
      );

      // -------------------------------------------------
      // Contact Details
      // -------------------------------------------------

      data.append(
        "contactDetails",
        JSON.stringify({
          address:
            formData.address,

          phone:
            formData.phone,

          whatsapp:
            formData.whatsapp,

          supportEmail:
            formData.supportEmail,

          workingHours:
            formData.workingHours,
        })
      );

      // -------------------------------------------------
      // Features
      // -------------------------------------------------

      data.append(
        "features",
        JSON.stringify(
          features
        )
      );

      // -------------------------------------------------
      // Social Media
      // -------------------------------------------------

      data.append(
        "socialMedia",
        JSON.stringify({
          facebook:
            formData.facebook,

          instagram:
            formData.instagram,

          youtube:
            formData.youtube,

          twitter:
            formData.twitter,
        })
      );

      // -------------------------------------------------
      // SEO
      // -------------------------------------------------

      data.append(
        "seo",
        JSON.stringify({
          metaTitle:
            formData.metaTitle,

          metaDescription:
            formData.metaDescription,
        })
      );

      // -------------------------------------------------
      // Email
      // -------------------------------------------------

      data.append(
        "emailSettings",
        JSON.stringify(
          emailSettings
        )
      );

      // -------------------------------------------------
      // Payment
      // -------------------------------------------------

      data.append(
        "paymentSettings",
        JSON.stringify(
          paymentSettings
        )
      );

      // -------------------------------------------------
      // Other
      // -------------------------------------------------

      data.append(
        "otherSettings",
        JSON.stringify(
          otherSettings
        )
      );

      // -------------------------------------------------
      // Logo
      // -------------------------------------------------

      if (logoFile) {
        data.append(
          "logo",
          logoFile
        );
      }

      // IMPORTANT:
      // Do NOT manually set Content-Type.
      // Browser/Axios will automatically add
      // multipart boundary.
      const response =
        await axios.put(
          API_URL,
          data
        );

      // -------------------------------------------------
      // Success
      // -------------------------------------------------

      if (
        response.data?.success
      ) {
        const savedData =
          response.data.data;

        // Update logo from backend
        if (
          savedData?.storeProfile?.logo
        ) {
          setLogoPreview(
            `${IMAGE_BASE_URL}${savedData.storeProfile.logo}`
          );
        }

        // New file is now saved
        setLogoFile(null);

        setSaveMessage(
          "Changes saved successfully!"
        );

        // Refresh actual settings from backend
        await fetchSettings();

        setTimeout(() => {
          setSaveMessage("");
        }, 3000);
      }
    } catch (error) {
      console.error(
        "Save Settings Error:",
        error
      );

      setErrorMessage(
        error.response?.data?.message ||
          "Failed to save website settings."
      );
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // PREVIEW
  // =====================================================

  const handlePreview = () => {
    window.open(
      "https://chocobliss.com",
      "_blank",
      "noopener,noreferrer"
    );
  };

  // =====================================================
  // TOGGLE COMPONENT
  // =====================================================

  const renderToggle = (
    label,
    value,
    onChange
  ) => {
    return (
      <div className="WebsiteSetting-feature-row">
        <span>{label}</span>

        <label className="WebsiteSetting-switch">
          <input
            type="checkbox"
            checked={Boolean(value)}
            onChange={onChange}
          />

          <span className="WebsiteSetting-slider"></span>
        </label>
      </div>
    );
  };

  // =====================================================
  // GENERAL SETTINGS
  // =====================================================

  const renderGeneralSettings = () => {
    return (
      <>
        {/* STORE PROFILE */}

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

              {/* NO DELETE BUTTON */}

              <label className="WebsiteSetting-upload-btn">
                <FiUploadCloud />

                <span>
                  Change Logo
                </span>

                <input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp,image/avif,image/bmp,image/tiff"
                  hidden
                  onChange={
                    handleLogoChange
                  }
                />
              </label>

              <span className="WebsiteSetting-file-hint">
                Maximum 10MB. Backend converts image to WEBP.
              </span>
            </div>

            <div className="WebsiteSetting-profile-inputs">
              <div className="WebsiteSetting-field-group">
                <label>
                  Store Name
                </label>

                <input
                  type="text"
                  name="storeName"
                  value={
                    formData.storeName
                  }
                  onChange={
                    handleInputChange
                  }
                />
              </div>

              <div className="WebsiteSetting-field-group">
                <label>
                  Tagline
                </label>

                <input
                  type="text"
                  name="tagline"
                  value={
                    formData.tagline
                  }
                  onChange={
                    handleInputChange
                  }
                />
              </div>

              <div className="WebsiteSetting-field-group">
                <label>
                  Website Email
                </label>

                <input
                  type="email"
                  name="websiteEmail"
                  value={
                    formData.websiteEmail
                  }
                  onChange={
                    handleInputChange
                  }
                />
              </div>
            </div>
          </div>

          <div className="WebsiteSetting-field-group WebsiteSetting-desc-group">
            <label>
              Store Description
            </label>

            <textarea
              name="storeDescription"
              rows={3}
              value={
                formData.storeDescription
              }
              onChange={
                handleInputChange
              }
            />
          </div>
        </section>

        {/* CONTACT DETAILS */}

        <section className="WebsiteSetting-card">
          <h2 className="WebsiteSetting-card-title">
            Contact Details
          </h2>

          <div className="WebsiteSetting-contact-list">
            <div className="WebsiteSetting-contact-row">
              <div className="WebsiteSetting-contact-label">
                <FiMapPin />
                <span>
                  Address
                </span>
              </div>

              <input
                type="text"
                name="address"
                className="WebsiteSetting-input-flex"
                value={
                  formData.address
                }
                onChange={
                  handleInputChange
                }
              />
            </div>

            <div className="WebsiteSetting-contact-row">
              <div className="WebsiteSetting-contact-label">
                <FiPhone />
                <span>
                  Phone Number
                </span>
              </div>

              <input
                type="text"
                name="phone"
                className="WebsiteSetting-input-flex"
                value={
                  formData.phone
                }
                onChange={
                  handleInputChange
                }
              />
            </div>

            <div className="WebsiteSetting-contact-row">
              <div className="WebsiteSetting-contact-label">
                <FaWhatsapp />
                <span>
                  WhatsApp Number
                </span>
              </div>

              <input
                type="text"
                name="whatsapp"
                className="WebsiteSetting-input-flex"
                value={
                  formData.whatsapp
                }
                onChange={
                  handleInputChange
                }
              />
            </div>

            <div className="WebsiteSetting-contact-row">
              <div className="WebsiteSetting-contact-label">
                <FiMail />
                <span>
                  Support Email
                </span>
              </div>

              <input
                type="email"
                name="supportEmail"
                className="WebsiteSetting-input-flex"
                value={
                  formData.supportEmail
                }
                onChange={
                  handleInputChange
                }
              />
            </div>

            <div className="WebsiteSetting-contact-row">
              <div className="WebsiteSetting-contact-label">
                <FiClock />
                <span>
                  Working Hours
                </span>
              </div>

              <input
                type="text"
                name="workingHours"
                className="WebsiteSetting-input-flex"
                value={
                  formData.workingHours
                }
                onChange={
                  handleInputChange
                }
              />
            </div>
          </div>
        </section>

        {/* FEATURES */}

        <section className="WebsiteSetting-card">
          <h2 className="WebsiteSetting-card-title">
            Features
          </h2>

          <div className="WebsiteSetting-features-list">
            {renderToggle(
              "Enable Premium Collection",
              features.premiumCollection,
              () =>
                handleToggle(
                  "premiumCollection"
                )
            )}

            {renderToggle(
              "Enable Honey Products",
              features.honeyProducts,
              () =>
                handleToggle(
                  "honeyProducts"
                )
            )}

            {renderToggle(
              "Enable Customer Reviews",
              features.customerReviews,
              () =>
                handleToggle(
                  "customerReviews"
                )
            )}

            {renderToggle(
              "Enable Newsletter Subscription",
              features.newsletter,
              () =>
                handleToggle(
                  "newsletter"
                )
            )}

            {renderToggle(
              "Enable WhatsApp Chat",
              features.whatsappChat,
              () =>
                handleToggle(
                  "whatsappChat"
                )
            )}
          </div>
        </section>

        {/* SOCIAL MEDIA */}

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

                <span>
                  Facebook
                </span>
              </div>

              <input
                type="url"
                name="facebook"
                className="WebsiteSetting-input-flex"
                value={
                  formData.facebook
                }
                onChange={
                  handleInputChange
                }
              />
            </div>

            <div className="WebsiteSetting-social-row">
              <div className="WebsiteSetting-social-brand">
                <div className="WebsiteSetting-brand-icon insta">
                  <FaInstagram />
                </div>

                <span>
                  Instagram
                </span>
              </div>

              <input
                type="url"
                name="instagram"
                className="WebsiteSetting-input-flex"
                value={
                  formData.instagram
                }
                onChange={
                  handleInputChange
                }
              />
            </div>

            <div className="WebsiteSetting-social-row">
              <div className="WebsiteSetting-social-brand">
                <div className="WebsiteSetting-brand-icon yt">
                  <FaYoutube />
                </div>

                <span>
                  YouTube
                </span>
              </div>

              <input
                type="url"
                name="youtube"
                className="WebsiteSetting-input-flex"
                value={
                  formData.youtube
                }
                onChange={
                  handleInputChange
                }
              />
            </div>

            <div className="WebsiteSetting-social-row">
              <div className="WebsiteSetting-social-brand">
                <div className="WebsiteSetting-brand-icon tw">
                  <FaTwitter />
                </div>

                <span>
                  Twitter
                </span>
              </div>

              <input
                type="url"
                name="twitter"
                className="WebsiteSetting-input-flex"
                value={
                  formData.twitter
                }
                onChange={
                  handleInputChange
                }
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
              <label>
                Meta Title
              </label>

              <input
                type="text"
                name="metaTitle"
                value={
                  formData.metaTitle
                }
                onChange={
                  handleInputChange
                }
              />
            </div>

            <div className="WebsiteSetting-seo-item">
              <label>
                Meta Description
              </label>

              <input
                type="text"
                name="metaDescription"
                value={
                  formData.metaDescription
                }
                onChange={
                  handleInputChange
                }
              />
            </div>
          </div>
        </section>
      </>
    );
  };

  // =====================================================
  // EMAIL SETTINGS
  // =====================================================

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
              <label>
                Mail Provider
              </label>

              <select
                name="mailProvider"
                value={
                  emailSettings.mailProvider
                }
                onChange={
                  handleEmailChange
                }
              >
                <option value="SMTP">
                  SMTP
                </option>

                <option value="Gmail">
                  Gmail
                </option>

                <option value="SendGrid">
                  SendGrid
                </option>

                <option value="Mailgun">
                  Mailgun
                </option>
              </select>
            </div>

            <div className="WebsiteSetting-field-group">
              <label>
                SMTP Host
              </label>

              <input
                type="text"
                name="smtpHost"
                value={
                  emailSettings.smtpHost
                }
                onChange={
                  handleEmailChange
                }
              />
            </div>

            <div className="WebsiteSetting-field-group">
              <label>
                SMTP Port
              </label>

              <input
                type="text"
                name="smtpPort"
                value={
                  emailSettings.smtpPort
                }
                onChange={
                  handleEmailChange
                }
              />
            </div>

            <div className="WebsiteSetting-field-group">
              <label>
                Encryption
              </label>

              <select
                name="encryption"
                value={
                  emailSettings.encryption
                }
                onChange={
                  handleEmailChange
                }
              >
                <option value="TLS">
                  TLS
                </option>

                <option value="SSL">
                  SSL
                </option>

                <option value="None">
                  None
                </option>
              </select>
            </div>

            <div className="WebsiteSetting-field-group">
              <label>
                SMTP Username
              </label>

              <input
                type="email"
                name="smtpUsername"
                value={
                  emailSettings.smtpUsername
                }
                onChange={
                  handleEmailChange
                }
              />
            </div>

            <div className="WebsiteSetting-field-group">
              <label>
                SMTP Password
              </label>

              <input
                type="password"
                name="smtpPassword"
                placeholder="Enter SMTP password"
                value={
                  emailSettings.smtpPassword
                }
                onChange={
                  handleEmailChange
                }
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
              <label>
                Sender Name
              </label>

              <input
                type="text"
                name="senderName"
                value={
                  emailSettings.senderName
                }
                onChange={
                  handleEmailChange
                }
              />
            </div>

            <div className="WebsiteSetting-field-group">
              <label>
                Sender Email
              </label>

              <input
                type="email"
                name="senderEmail"
                value={
                  emailSettings.senderEmail
                }
                onChange={
                  handleEmailChange
                }
              />
            </div>
          </div>

          <div className="WebsiteSetting-email-status">
            <FiCheckCircle />

            <span>
              Email service configuration is ready
            </span>
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
              () =>
                handleEmailToggle(
                  "orderNotification"
                )
            )}

            {renderToggle(
              "Customer Registration",
              emailSettings.customerRegistration,
              () =>
                handleEmailToggle(
                  "customerRegistration"
                )
            )}

            {renderToggle(
              "Payment Notification",
              emailSettings.paymentNotification,
              () =>
                handleEmailToggle(
                  "paymentNotification"
                )
            )}

            {renderToggle(
              "Newsletter Notification",
              emailSettings.newsletterNotification,
              () =>
                handleEmailToggle(
                  "newsletterNotification"
                )
            )}
          </div>
        </section>
      </>
    );
  };

  // =====================================================
  // PAYMENT SETTINGS
  // =====================================================

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
              <label>
                Currency
              </label>

              <select
                name="currency"
                value={
                  paymentSettings.currency
                }
                onChange={
                  handlePaymentChange
                }
              >
                <option value="USD">
                  USD - US Dollar
                </option>

                <option value="INR">
                  INR - Indian Rupee
                </option>

                <option value="EUR">
                  EUR - Euro
                </option>

                <option value="GBP">
                  GBP - British Pound
                </option>
              </select>
            </div>

            <div className="WebsiteSetting-field-group">
              <label>
                Currency Symbol
              </label>

              <input
                type="text"
                name="currencySymbol"
                value={
                  paymentSettings.currencySymbol
                }
                onChange={
                  handlePaymentChange
                }
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
              () =>
                handlePaymentToggle(
                  "cod"
                )
            )}

            {renderToggle(
              "Online Payment",
              paymentSettings.onlinePayment,
              () =>
                handlePaymentToggle(
                  "onlinePayment"
                )
            )}

            {renderToggle(
              "Razorpay",
              paymentSettings.razorpay,
              () =>
                handlePaymentToggle(
                  "razorpay"
                )
            )}

            {renderToggle(
              "Stripe",
              paymentSettings.stripe,
              () =>
                handlePaymentToggle(
                  "stripe"
                )
            )}

            {renderToggle(
              "PayPal",
              paymentSettings.paypal,
              () =>
                handlePaymentToggle(
                  "paypal"
                )
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
              <label>
                Razorpay Key ID
              </label>

              <input
                type="text"
                name="razorpayKey"
                placeholder="Enter Razorpay key"
                value={
                  paymentSettings.razorpayKey
                }
                onChange={
                  handlePaymentChange
                }
              />
            </div>

            <div className="WebsiteSetting-field-group">
              <label>
                Razorpay Secret
              </label>

              <input
                type="password"
                name="razorpaySecret"
                placeholder="Enter Razorpay secret"
                value={
                  paymentSettings.razorpaySecret
                }
                onChange={
                  handlePaymentChange
                }
              />
            </div>

            <div className="WebsiteSetting-field-group">
              <label>
                Stripe Public Key
              </label>

              <input
                type="text"
                name="stripePublicKey"
                placeholder="Enter Stripe public key"
                value={
                  paymentSettings.stripePublicKey
                }
                onChange={
                  handlePaymentChange
                }
              />
            </div>

            <div className="WebsiteSetting-field-group">
              <label>
                Stripe Secret Key
              </label>

              <input
                type="password"
                name="stripeSecretKey"
                placeholder="Enter Stripe secret key"
                value={
                  paymentSettings.stripeSecretKey
                }
                onChange={
                  handlePaymentChange
                }
              />
            </div>
          </div>

          <div className="WebsiteSetting-test-toggle">
            {renderToggle(
              "Enable Test Mode",
              paymentSettings.testMode,
              () =>
                handlePaymentToggle(
                  "testMode"
                )
            )}
          </div>
        </section>
      </>
    );
  };

  // =====================================================
  // OTHER SETTINGS
  // =====================================================

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
              <label>
                Timezone
              </label>

              <select
                name="timezone"
                value={
                  otherSettings.timezone
                }
                onChange={
                  handleOtherChange
                }
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
              <label>
                Default Language
              </label>

              <select
                name="language"
                value={
                  otherSettings.language
                }
                onChange={
                  handleOtherChange
                }
              >
                <option value="English">
                  English
                </option>

                <option value="Hindi">
                  Hindi
                </option>

                <option value="Odia">
                  Odia
                </option>
              </select>
            </div>

            <div className="WebsiteSetting-field-group">
              <label>
                Date Format
              </label>

              <select
                name="dateFormat"
                value={
                  otherSettings.dateFormat
                }
                onChange={
                  handleOtherChange
                }
              >
                <option value="DD/MM/YYYY">
                  DD/MM/YYYY
                </option>

                <option value="MM/DD/YYYY">
                  MM/DD/YYYY
                </option>

                <option value="YYYY-MM-DD">
                  YYYY-MM-DD
                </option>
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
              () =>
                handleOtherToggle(
                  "maintenanceMode"
                )
            )}

            {renderToggle(
              "Allow Customer Registration",
              otherSettings.customerRegistration,
              () =>
                handleOtherToggle(
                  "customerRegistration"
                )
            )}

            {renderToggle(
              "Allow Guest Checkout",
              otherSettings.guestCheckout,
              () =>
                handleOtherToggle(
                  "guestCheckout"
                )
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
              () =>
                handleOtherToggle(
                  "enableCache"
                )
            )}

            {renderToggle(
              "Enable Security Protection",
              otherSettings.enableSecurity,
              () =>
                handleOtherToggle(
                  "enableSecurity"
                )
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
            <label>
              Google Analytics ID
            </label>

            <input
              type="text"
              name="googleAnalytics"
              placeholder="G-XXXXXXXXXX"
              value={
                otherSettings.googleAnalytics
              }
              onChange={
                handleOtherChange
              }
            />
          </div>

          <div className="WebsiteSetting-field-group">
            <label>
              Facebook Pixel ID
            </label>

            <input
              type="text"
              name="facebookPixel"
              placeholder="Enter Facebook Pixel ID"
              value={
                otherSettings.facebookPixel
              }
              onChange={
                handleOtherChange
              }
            />
          </div>
        </section>

        <section className="WebsiteSetting-card WebsiteSetting-card-full">
          <div className="WebsiteSetting-system-info">
            <div className="WebsiteSetting-system-info-item">
              <FiServer />

              <div>
                <span>
                  Server Status
                </span>

                <strong>
                  Online
                </strong>
              </div>
            </div>

            <div className="WebsiteSetting-system-info-item">
              <FiDatabase />

              <div>
                <span>
                  Database
                </span>

                <strong>
                  Connected
                </strong>
              </div>
            </div>

            <div className="WebsiteSetting-system-info-item">
              <FiShield />

              <div>
                <span>
                  Security
                </span>

                <strong>
                  Protected
                </strong>
              </div>
            </div>

            <div className="WebsiteSetting-system-info-item">
              <FiRefreshCw />

              <div>
                <span>
                  Last Sync
                </span>

                <strong>
                  Just now
                </strong>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  };

  // =====================================================
  // ACTIVE TAB
  // =====================================================

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

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="WebsiteSetting-loading">
        <FiRefreshCw className="WebsiteSetting-loading-icon" />

        <span>
          Loading website settings...
        </span>
      </div>
    );
  }

  // =====================================================
  // MAIN UI
  // =====================================================

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
          {/* PREVIEW */}

          <button
            type="button"
            className="WebsiteSetting-btn-secondary"
            onClick={
              handlePreview
            }
          >
            <span>
              Preview Website
            </span>

            <FiExternalLink />
          </button>

          {/* SAVE */}

          <button
            type="button"
            className="WebsiteSetting-btn-primary"
            onClick={
              handleSave
            }
            disabled={saving}
          >
            <FiSave />

            <span>
              {saving
                ? "Saving..."
                : "Save Changes"}
            </span>
          </button>
        </div>
      </header>

      {/* SUCCESS MESSAGE */}

      {saveMessage && (
        <div className="WebsiteSetting-save-message">
          <FiCheckCircle />

          <span>
            {saveMessage}
          </span>
        </div>
      )}

      {/* ERROR MESSAGE */}

      {errorMessage && (
        <div className="WebsiteSetting-error-message">
          <FiAlertCircle />

          <span>
            {errorMessage}
          </span>

          <button
            type="button"
            onClick={() =>
              setErrorMessage("")
            }
          >
            ×
          </button>
        </div>
      )}

      {/* TABS */}

      <nav className="WebsiteSetting-tabs">
        <button
          type="button"
          className={`WebsiteSetting-tab-btn ${
            activeTab === "general"
              ? "active"
              : ""
          }`}
          onClick={() =>
            setActiveTab(
              "general"
            )
          }
        >
          <FiHome />

          <span>
            General Settings
          </span>
        </button>

        <button
          type="button"
          className={`WebsiteSetting-tab-btn ${
            activeTab === "email"
              ? "active"
              : ""
          }`}
          onClick={() =>
            setActiveTab(
              "email"
            )
          }
        >
          <FiMail />

          <span>
            Email Settings
          </span>
        </button>

        <button
          type="button"
          className={`WebsiteSetting-tab-btn ${
            activeTab === "payment"
              ? "active"
              : ""
          }`}
          onClick={() =>
            setActiveTab(
              "payment"
            )
          }
        >
          <FiCreditCard />

          <span>
            Payment Settings
          </span>
        </button>

        <button
          type="button"
          className={`WebsiteSetting-tab-btn ${
            activeTab === "other"
              ? "active"
              : ""
          }`}
          onClick={() =>
            setActiveTab(
              "other"
            )
          }
        >
          <FiSettings />

          <span>
            Other Settings
          </span>
        </button>
      </nav>

      {/* CONTENT */}

      <main className="WebsiteSetting-grid">
        {renderActiveTab()}
      </main>
    </div>
  );
};

export default WebsiteSetting;