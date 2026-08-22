import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./WebsiteSetthingSummary.css";

const API_URL = "http://localhost:5000/api/website-settings";
const IMAGE_BASE_URL = "http://localhost:5000";

const createDefaultSettings = () => ({
  storeProfile: {
    storeName: "Choco Bliss",
    tagline: "Premium Chocolates, Pure Happiness",
    websiteEmail: "support@chocobliss.com",
    storeDescription: "",
    logo: "",
  },

  contactDetails: {
    address: "",
    phone: "",
    whatsapp: "",
    supportEmail: "",
    workingHours: "",
  },

  features: {
    premiumCollection: true,
    honeyProducts: true,
    customerReviews: true,
    newsletter: true,
    whatsappChat: true,
  },

  socialMedia: {
    facebook: "",
    instagram: "",
    youtube: "",
    twitter: "",
  },

  seo: {
    metaTitle: "",
    metaDescription: "",
  },

  emailSettings: {
    mailProvider: "SMTP",
    smtpHost: "smtp.gmail.com",
    smtpPort: "587",
    smtpUsername: "",
    smtpPassword: "",
    encryption: "TLS",
    senderName: "Choco Bliss",
    senderEmail: "",
    orderNotification: true,
    customerRegistration: true,
    paymentNotification: true,
    newsletterNotification: false,
  },

  paymentSettings: {
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
  },

  otherSettings: {
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
  },
});

const mergeSettings = (data) => {
  const defaults = createDefaultSettings();

  return {
    storeProfile: {
      ...defaults.storeProfile,
      ...(data?.storeProfile || {}),
    },

    contactDetails: {
      ...defaults.contactDetails,
      ...(data?.contactDetails || {}),
    },

    features: {
      ...defaults.features,
      ...(data?.features || {}),
    },

    socialMedia: {
      ...defaults.socialMedia,
      ...(data?.socialMedia || {}),
    },

    seo: {
      ...defaults.seo,
      ...(data?.seo || {}),
    },

    emailSettings: {
      ...defaults.emailSettings,
      ...(data?.emailSettings || {}),
    },

    paymentSettings: {
      ...defaults.paymentSettings,
      ...(data?.paymentSettings || {}),
    },

    otherSettings: {
      ...defaults.otherSettings,
      ...(data?.otherSettings || {}),
    },
  };
};

const WebsiteSetthingSummary = () => {
  const fileInputRef = useRef(null);

  const [settings, setSettings] = useState(createDefaultSettings());
  const [backupSettings, setBackupSettings] = useState(
    createDefaultSettings()
  );

  const [isEditing, setIsEditing] = useState(false);
  const [showSecrets, setShowSecrets] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState("");
  const [lastUpdated, setLastUpdated] = useState("Not available");

  // =====================================================
  // HELPERS
  // =====================================================

  const getImageUrl = (logo) => {
    if (!logo) return "";

    if (
      logo.startsWith("http://") ||
      logo.startsWith("https://") ||
      logo.startsWith("blob:")
    ) {
      return logo;
    }

    return `${IMAGE_BASE_URL}${logo.startsWith("/") ? "" : "/"}${logo}`;
  };

  const formatDate = (date = new Date()) =>
    date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const clearMessages = () => {
    setSaveMessage("");
    setErrorMessage("");
  };

  const showSuccess = (message) => {
    setSaveMessage(message);

    window.clearTimeout(window.__websiteSettingToastTimer);

    window.__websiteSettingToastTimer = window.setTimeout(() => {
      setSaveMessage("");
    }, 3000);
  };

  const updateSectionValue = (section, field, value) => {
    setSettings((previous) => ({
      ...previous,
      [section]: {
        ...previous[section],
        [field]: value,
      },
    }));
  };

  const updateBoolean = (section, field) => {
    setSettings((previous) => ({
      ...previous,
      [section]: {
        ...previous[section],
        [field]: !previous[section][field],
      },
    }));
  };

  // =====================================================
  // FETCH FROM BACKEND
  // =====================================================

  const fetchSettings = async (showRefreshMessage = false) => {
    try {
      setLoading(true);
      setErrorMessage("");

      const response = await axios.get(API_URL);

      if (response.data?.success) {
        const normalized = mergeSettings(response.data.data);

        setSettings(normalized);
        setBackupSettings(
          JSON.parse(JSON.stringify(normalized))
        );

        const backendLogo = normalized.storeProfile.logo;
        setLogoPreview(getImageUrl(backendLogo));
        setLogoFile(null);

        if (response.data.data?.updatedAt) {
          setLastUpdated(
            formatDate(new Date(response.data.data.updatedAt))
          );
        } else {
          setLastUpdated(formatDate());
        }

        if (showRefreshMessage) {
          showSuccess("Data refreshed successfully.");
        }
      } else {
        throw new Error(
          response.data?.message ||
            "Failed to fetch website settings."
        );
      }
    } catch (error) {
      console.error("Fetch Website Settings Error:", error);

      setErrorMessage(
        error.response?.data?.message ||
          error.message ||
          "Failed to load website settings."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();

    return () => {
      if (
        logoPreview &&
        logoPreview.startsWith("blob:")
      ) {
        URL.revokeObjectURL(logoPreview);
      }

      window.clearTimeout(window.__websiteSettingToastTimer);
    };
    // Intentionally run only once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // =====================================================
  // EDIT
  // =====================================================

  const handleEditSettings = () => {
    setBackupSettings(
      JSON.parse(JSON.stringify(settings))
    );

    setIsEditing(true);
    clearMessages();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleCancelEdit = () => {
    const restored = JSON.parse(
      JSON.stringify(backupSettings)
    );

    setSettings(restored);
    setLogoFile(null);
    setLogoPreview(
      getImageUrl(restored.storeProfile.logo)
    );
    setIsEditing(false);
    clearMessages();

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =====================================================
  // LOGO
  // =====================================================

  const handleLogoClick = () => {
    fileInputRef.current?.click();
  };

  const handleLogoChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrorMessage(
        "Please select a valid image file."
      );
      event.target.value = "";
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage(
        "Image size must be less than 10MB."
      );
      event.target.value = "";
      return;
    }

    setErrorMessage("");

    if (
      logoPreview &&
      logoPreview.startsWith("blob:")
    ) {
      URL.revokeObjectURL(logoPreview);
    }

    const previewUrl = URL.createObjectURL(file);

    setLogoFile(file);
    setLogoPreview(previewUrl);
  };

  // =====================================================
  // SAVE TO BACKEND
  // =====================================================

  const handleSaveChanges = async () => {
    try {
      setSaving(true);
      clearMessages();

      const formData = new FormData();

      formData.append(
        "storeProfile",
        JSON.stringify(settings.storeProfile)
      );

      formData.append(
        "contactDetails",
        JSON.stringify(settings.contactDetails)
      );

      formData.append(
        "features",
        JSON.stringify(settings.features)
      );

      formData.append(
        "socialMedia",
        JSON.stringify(settings.socialMedia)
      );

      formData.append(
        "seo",
        JSON.stringify(settings.seo)
      );

      formData.append(
        "emailSettings",
        JSON.stringify(settings.emailSettings)
      );

      formData.append(
        "paymentSettings",
        JSON.stringify(settings.paymentSettings)
      );

      formData.append(
        "otherSettings",
        JSON.stringify(settings.otherSettings)
      );

      if (logoFile) {
        formData.append("logo", logoFile);
      }

      const response = await axios.put(
        API_URL,
        formData
      );

      if (!response.data?.success) {
        throw new Error(
          response.data?.message ||
            "Failed to save website settings."
        );
      }

      const saved = mergeSettings(
        response.data.data
      );

      setSettings(saved);
      setBackupSettings(
        JSON.parse(JSON.stringify(saved))
      );

      setLogoFile(null);
      setLogoPreview(
        getImageUrl(saved.storeProfile.logo)
      );

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      setLastUpdated(
        saved.updatedAt
          ? formatDate(new Date(saved.updatedAt))
          : formatDate()
      );

      setIsEditing(false);
      showSuccess(
        "Settings saved successfully."
      );

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
      console.error(
        "Save Website Settings Error:",
        error
      );

      setErrorMessage(
        error.response?.data?.message ||
          error.message ||
          "Failed to save website settings."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleRefresh = () => {
    fetchSettings(true);
  };

  // =====================================================
  // SOCIAL LINKS
  // =====================================================

  const handleSocialClick = (url) => {
    if (!url) return;

    let target = url.trim();

    if (
      !target.startsWith("http://") &&
      !target.startsWith("https://")
    ) {
      target = `https://${target}`;
    }

    window.open(
      target,
      "_blank",
      "noopener,noreferrer"
    );
  };

  // =====================================================
  // UI HELPERS
  // =====================================================

  const StatusBadge = ({ enabled }) => (
    <span
      className={`WebsiteSetthingSummary-status ${
        enabled
          ? "WebsiteSetthingSummary-status--enabled"
          : "WebsiteSetthingSummary-status--disabled"
      }`}
    >
      {enabled ? "Enabled" : "Disabled"}
    </span>
  );

  const FeatureRow = ({ label, enabled }) => (
    <div className="WebsiteSetthingSummary-feature-row">
      <div className="WebsiteSetthingSummary-feature-left">
        <span
          className={`WebsiteSetthingSummary-check ${
            enabled
              ? "WebsiteSetthingSummary-check--active"
              : "WebsiteSetthingSummary-check--inactive"
          }`}
        >
          {enabled ? "✓" : "×"}
        </span>

        <span className="WebsiteSetthingSummary-feature-label">
          {label}
        </span>
      </div>

      <StatusBadge enabled={enabled} />
    </div>
  );

  const EditToggle = ({ value, onChange }) => (
    <button
      type="button"
      className={`WebsiteSetthingSummary-toggle ${
        value
          ? "WebsiteSetthingSummary-toggle--active"
          : "WebsiteSetthingSummary-toggle--inactive"
      }`}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        onChange();
      }}
      aria-label={value ? "Turn off" : "Turn on"}
    >
      <span className="WebsiteSetthingSummary-toggle-circle" />
    </button>
  );

  const EditInput = ({
    label,
    value,
    onChange,
    type = "text",
    placeholder = "",
  }) => (
    <div className="WebsiteSetthingSummary-edit-field">
      <label>{label}</label>

      <input
        type={type}
        value={value ?? ""}
        placeholder={placeholder}
        onChange={(event) =>
          onChange(event.target.value)
        }
      />
    </div>
  );

  const EditTextarea = ({
    label,
    value,
    onChange,
  }) => (
    <div className="WebsiteSetthingSummary-edit-field WebsiteSetthingSummary-edit-field--full">
      <label>{label}</label>

      <textarea
        value={value ?? ""}
        rows={4}
        onChange={(event) =>
          onChange(event.target.value)
        }
      />
    </div>
  );

  const EditSelect = ({
    label,
    value,
    onChange,
    options,
  }) => (
    <div className="WebsiteSetthingSummary-edit-field">
      <label>{label}</label>

      <select
        value={value ?? ""}
        onChange={(event) =>
          onChange(event.target.value)
        }
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );

  const EditSwitchRow = ({
    label,
    value,
    onChange,
  }) => (
    <div className="WebsiteSetthingSummary-edit-switch-row">
      <span>{label}</span>

      <EditToggle
        value={Boolean(value)}
        onChange={onChange}
      />
    </div>
  );

  // =====================================================
  // EDIT PANEL
  // =====================================================

  const renderEditPanel = () => {
    const s = settings;

    return (
      <section className="WebsiteSetthingSummary-edit-panel">
        <div className="WebsiteSetthingSummary-edit-panel-header">
          <div>
            <h2>Edit Website Settings</h2>
            <p>
              Update your website configuration and
              save the changes.
            </p>
          </div>

          <div className="WebsiteSetthingSummary-edit-actions">
            <button
              type="button"
              className="WebsiteSetthingSummary-cancel-btn"
              onClick={handleCancelEdit}
              disabled={saving}
            >
              Cancel
            </button>

            <button
              type="button"
              className="WebsiteSetthingSummary-save-btn"
              onClick={handleSaveChanges}
              disabled={saving}
            >
              {saving
                ? "Saving..."
                : "✓ Save Changes"}
            </button>
          </div>
        </div>

        {/* STORE PROFILE */}
        <div className="WebsiteSetthingSummary-edit-card">
          <div className="WebsiteSetthingSummary-edit-card-title">
            <span>▣</span>
            <h3>Store Profile</h3>
          </div>

          <div className="WebsiteSetthingSummary-edit-divider" />

          <div className="WebsiteSetthingSummary-edit-grid">
            <EditInput
              label="Store Name"
              value={s.storeProfile.storeName}
              onChange={(value) =>
                updateSectionValue(
                  "storeProfile",
                  "storeName",
                  value
                )
              }
            />

            <EditInput
              label="Tagline"
              value={s.storeProfile.tagline}
              onChange={(value) =>
                updateSectionValue(
                  "storeProfile",
                  "tagline",
                  value
                )
              }
            />

            <EditInput
              label="Website Email"
              type="email"
              value={s.storeProfile.websiteEmail}
              onChange={(value) =>
                updateSectionValue(
                  "storeProfile",
                  "websiteEmail",
                  value
                )
              }
            />

            <EditTextarea
              label="Store Description"
              value={s.storeProfile.storeDescription}
              onChange={(value) =>
                updateSectionValue(
                  "storeProfile",
                  "storeDescription",
                  value
                )
              }
            />
          </div>

          <div className="WebsiteSetthingSummary-logo-edit">
            <div className="WebsiteSetthingSummary-logo">
              {logoPreview ? (
                <img
                  src={logoPreview}
                  alt="Store Logo"
                />
              ) : (
                <div className="WebsiteSetthingSummary-logo-placeholder">
                  <strong>
                    {s.storeProfile.storeName ||
                      "Choco Bliss"}
                  </strong>
                  <small>
                    {s.storeProfile.tagline ||
                      "Premium Chocolates"}
                  </small>
                </div>
              )}
            </div>

            <button
              type="button"
              className="WebsiteSetthingSummary-logo-btn"
              onClick={handleLogoClick}
            >
              ⟳ Change Logo
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp,image/avif,image/bmp,image/tiff"
              hidden
              onChange={handleLogoChange}
            />
          </div>
        </div>

        {/* CONTACT DETAILS */}
        <div className="WebsiteSetthingSummary-edit-card">
          <div className="WebsiteSetthingSummary-edit-card-title">
            <span>▤</span>
            <h3>Contact Details</h3>
          </div>

          <div className="WebsiteSetthingSummary-edit-divider" />

          <div className="WebsiteSetthingSummary-edit-grid">
            <EditInput
              label="Address"
              value={s.contactDetails.address}
              onChange={(value) =>
                updateSectionValue(
                  "contactDetails",
                  "address",
                  value
                )
              }
            />

            <EditInput
              label="Phone Number"
              value={s.contactDetails.phone}
              onChange={(value) =>
                updateSectionValue(
                  "contactDetails",
                  "phone",
                  value
                )
              }
            />

            <EditInput
              label="WhatsApp Number"
              value={s.contactDetails.whatsapp}
              onChange={(value) =>
                updateSectionValue(
                  "contactDetails",
                  "whatsapp",
                  value
                )
              }
            />

            <EditInput
              label="Support Email"
              type="email"
              value={s.contactDetails.supportEmail}
              onChange={(value) =>
                updateSectionValue(
                  "contactDetails",
                  "supportEmail",
                  value
                )
              }
            />

            <EditInput
              label="Working Hours"
              value={s.contactDetails.workingHours}
              onChange={(value) =>
                updateSectionValue(
                  "contactDetails",
                  "workingHours",
                  value
                )
              }
            />
          </div>
        </div>

        {/* FEATURES */}
        <div className="WebsiteSetthingSummary-edit-card">
          <div className="WebsiteSetthingSummary-edit-card-title">
            <span>★</span>
            <h3>Features</h3>
          </div>

          <div className="WebsiteSetthingSummary-edit-divider" />

          <div className="WebsiteSetthingSummary-edit-switch-grid">
            <EditSwitchRow
              label="Premium Collection"
              value={s.features.premiumCollection}
              onChange={() =>
                updateBoolean(
                  "features",
                  "premiumCollection"
                )
              }
            />

            <EditSwitchRow
              label="Honey Products"
              value={s.features.honeyProducts}
              onChange={() =>
                updateBoolean(
                  "features",
                  "honeyProducts"
                )
              }
            />

            <EditSwitchRow
              label="Customer Reviews"
              value={s.features.customerReviews}
              onChange={() =>
                updateBoolean(
                  "features",
                  "customerReviews"
                )
              }
            />

            <EditSwitchRow
              label="Newsletter Subscription"
              value={s.features.newsletter}
              onChange={() =>
                updateBoolean(
                  "features",
                  "newsletter"
                )
              }
            />

            <EditSwitchRow
              label="WhatsApp Chat"
              value={s.features.whatsappChat}
              onChange={() =>
                updateBoolean(
                  "features",
                  "whatsappChat"
                )
              }
            />
          </div>
        </div>

        {/* SOCIAL MEDIA */}
        <div className="WebsiteSetthingSummary-edit-card">
          <div className="WebsiteSetthingSummary-edit-card-title">
            <span>⤴</span>
            <h3>Social Media Links</h3>
          </div>

          <div className="WebsiteSetthingSummary-edit-divider" />

          <div className="WebsiteSetthingSummary-edit-grid">
            <EditInput
              label="Facebook"
              value={s.socialMedia.facebook}
              onChange={(value) =>
                updateSectionValue(
                  "socialMedia",
                  "facebook",
                  value
                )
              }
            />

            <EditInput
              label="Instagram"
              value={s.socialMedia.instagram}
              onChange={(value) =>
                updateSectionValue(
                  "socialMedia",
                  "instagram",
                  value
                )
              }
            />

            <EditInput
              label="YouTube"
              value={s.socialMedia.youtube}
              onChange={(value) =>
                updateSectionValue(
                  "socialMedia",
                  "youtube",
                  value
                )
              }
            />

            <EditInput
              label="Twitter"
              value={s.socialMedia.twitter}
              onChange={(value) =>
                updateSectionValue(
                  "socialMedia",
                  "twitter",
                  value
                )
              }
            />
          </div>
        </div>

        {/* SEO */}
        <div className="WebsiteSetthingSummary-edit-card">
          <div className="WebsiteSetthingSummary-edit-card-title">
            <span>⌕</span>
            <h3>SEO Settings</h3>
          </div>

          <div className="WebsiteSetthingSummary-edit-divider" />

          <div className="WebsiteSetthingSummary-edit-grid">
            <EditInput
              label="Meta Title"
              value={s.seo.metaTitle}
              onChange={(value) =>
                updateSectionValue(
                  "seo",
                  "metaTitle",
                  value
                )
              }
            />

            <EditInput
              label="Meta Description"
              value={s.seo.metaDescription}
              onChange={(value) =>
                updateSectionValue(
                  "seo",
                  "metaDescription",
                  value
                )
              }
            />
          </div>
        </div>

        {/* EMAIL SETTINGS */}
        <div className="WebsiteSetthingSummary-edit-card">
          <div className="WebsiteSetthingSummary-edit-card-title">
            <span>✉</span>
            <h3>Email Configuration</h3>
          </div>

          <div className="WebsiteSetthingSummary-edit-divider" />

          <div className="WebsiteSetthingSummary-edit-grid">
            <EditSelect
              label="Mail Provider"
              value={s.emailSettings.mailProvider}
              options={[
                "SMTP",
                "Gmail",
                "SendGrid",
                "Mailgun",
              ]}
              onChange={(value) =>
                updateSectionValue(
                  "emailSettings",
                  "mailProvider",
                  value
                )
              }
            />

            <EditInput
              label="SMTP Host"
              value={s.emailSettings.smtpHost}
              onChange={(value) =>
                updateSectionValue(
                  "emailSettings",
                  "smtpHost",
                  value
                )
              }
            />

            <EditInput
              label="SMTP Port"
              value={s.emailSettings.smtpPort}
              onChange={(value) =>
                updateSectionValue(
                  "emailSettings",
                  "smtpPort",
                  value
                )
              }
            />

            <EditSelect
              label="Encryption"
              value={s.emailSettings.encryption}
              options={["TLS", "SSL", "None"]}
              onChange={(value) =>
                updateSectionValue(
                  "emailSettings",
                  "encryption",
                  value
                )
              }
            />

            <EditInput
              label="SMTP Username"
              type="email"
              value={s.emailSettings.smtpUsername}
              onChange={(value) =>
                updateSectionValue(
                  "emailSettings",
                  "smtpUsername",
                  value
                )
              }
            />

            <EditInput
              label="SMTP Password"
              type="password"
              value={s.emailSettings.smtpPassword}
              placeholder="Enter SMTP password"
              onChange={(value) =>
                updateSectionValue(
                  "emailSettings",
                  "smtpPassword",
                  value
                )
              }
            />

            <EditInput
              label="Sender Name"
              value={s.emailSettings.senderName}
              onChange={(value) =>
                updateSectionValue(
                  "emailSettings",
                  "senderName",
                  value
                )
              }
            />

            <EditInput
              label="Sender Email"
              type="email"
              value={s.emailSettings.senderEmail}
              onChange={(value) =>
                updateSectionValue(
                  "emailSettings",
                  "senderEmail",
                  value
                )
              }
            />
          </div>
        </div>

        {/* EMAIL NOTIFICATIONS */}
        <div className="WebsiteSetthingSummary-edit-card">
          <div className="WebsiteSetthingSummary-edit-card-title">
            <span>♧</span>
            <h3>Email Notifications</h3>
          </div>

          <div className="WebsiteSetthingSummary-edit-divider" />

          <div className="WebsiteSetthingSummary-edit-switch-grid">
            <EditSwitchRow
              label="New Order Notification"
              value={s.emailSettings.orderNotification}
              onChange={() =>
                updateBoolean(
                  "emailSettings",
                  "orderNotification"
                )
              }
            />

            <EditSwitchRow
              label="Payment Notification"
              value={s.emailSettings.paymentNotification}
              onChange={() =>
                updateBoolean(
                  "emailSettings",
                  "paymentNotification"
                )
              }
            />

            <EditSwitchRow
              label="Customer Registration"
              value={s.emailSettings.customerRegistration}
              onChange={() =>
                updateBoolean(
                  "emailSettings",
                  "customerRegistration"
                )
              }
            />

            <EditSwitchRow
              label="Newsletter Notification"
              value={s.emailSettings.newsletterNotification}
              onChange={() =>
                updateBoolean(
                  "emailSettings",
                  "newsletterNotification"
                )
              }
            />
          </div>
        </div>

        {/* PAYMENT */}
        <div className="WebsiteSetthingSummary-edit-card">
          <div className="WebsiteSetthingSummary-edit-card-title">
            <span>▤</span>
            <h3>Payment Settings</h3>
          </div>

          <div className="WebsiteSetthingSummary-edit-divider" />

          <div className="WebsiteSetthingSummary-edit-grid">
            <EditSelect
              label="Currency"
              value={s.paymentSettings.currency}
              options={[
                "INR",
                "USD",
                "EUR",
                "GBP",
              ]}
              onChange={(value) =>
                updateSectionValue(
                  "paymentSettings",
                  "currency",
                  value
                )
              }
            />

            <EditInput
              label="Currency Symbol"
              value={s.paymentSettings.currencySymbol}
              onChange={(value) =>
                updateSectionValue(
                  "paymentSettings",
                  "currencySymbol",
                  value
                )
              }
            />
          </div>

          <div className="WebsiteSetthingSummary-edit-switch-grid">
            <EditSwitchRow
              label="Cash on Delivery"
              value={s.paymentSettings.cod}
              onChange={() =>
                updateBoolean(
                  "paymentSettings",
                  "cod"
                )
              }
            />

            <EditSwitchRow
              label="Online Payment"
              value={s.paymentSettings.onlinePayment}
              onChange={() =>
                updateBoolean(
                  "paymentSettings",
                  "onlinePayment"
                )
              }
            />

            <EditSwitchRow
              label="Razorpay"
              value={s.paymentSettings.razorpay}
              onChange={() =>
                updateBoolean(
                  "paymentSettings",
                  "razorpay"
                )
              }
            />

            <EditSwitchRow
              label="Stripe"
              value={s.paymentSettings.stripe}
              onChange={() =>
                updateBoolean(
                  "paymentSettings",
                  "stripe"
                )
              }
            />

            <EditSwitchRow
              label="PayPal"
              value={s.paymentSettings.paypal}
              onChange={() =>
                updateBoolean(
                  "paymentSettings",
                  "paypal"
                )
              }
            />
          </div>
        </div>

        {/* GATEWAY CREDENTIALS */}
        <div className="WebsiteSetthingSummary-edit-card">
          <div className="WebsiteSetthingSummary-edit-card-title">
            <span>♙</span>
            <h3>Gateway Credentials</h3>
          </div>

          <div className="WebsiteSetthingSummary-edit-divider" />

          <div className="WebsiteSetthingSummary-edit-grid">
            <EditInput
              label="Razorpay Key ID"
              value={s.paymentSettings.razorpayKey}
              placeholder="Enter Razorpay key"
              onChange={(value) =>
                updateSectionValue(
                  "paymentSettings",
                  "razorpayKey",
                  value
                )
              }
            />

            <EditInput
              label="Razorpay Secret"
              type="password"
              value={s.paymentSettings.razorpaySecret}
              placeholder="Enter Razorpay secret"
              onChange={(value) =>
                updateSectionValue(
                  "paymentSettings",
                  "razorpaySecret",
                  value
                )
              }
            />

            <EditInput
              label="Stripe Public Key"
              value={s.paymentSettings.stripePublicKey}
              placeholder="Enter Stripe public key"
              onChange={(value) =>
                updateSectionValue(
                  "paymentSettings",
                  "stripePublicKey",
                  value
                )
              }
            />

            <EditInput
              label="Stripe Secret Key"
              type="password"
              value={s.paymentSettings.stripeSecretKey}
              placeholder="Enter Stripe secret key"
              onChange={(value) =>
                updateSectionValue(
                  "paymentSettings",
                  "stripeSecretKey",
                  value
                )
              }
            />
          </div>

          <EditSwitchRow
            label="Enable Test Mode"
            value={s.paymentSettings.testMode}
            onChange={() =>
              updateBoolean(
                "paymentSettings",
                "testMode"
              )
            }
          />
        </div>

        {/* WEBSITE PREFERENCES */}
        <div className="WebsiteSetthingSummary-edit-card">
          <div className="WebsiteSetthingSummary-edit-card-title">
            <span>⚙</span>
            <h3>Website Preferences</h3>
          </div>

          <div className="WebsiteSetthingSummary-edit-divider" />

          <div className="WebsiteSetthingSummary-edit-grid">
            <EditSelect
              label="Timezone"
              value={s.otherSettings.timezone}
              options={[
                "Asia/Kolkata",
                "UTC",
                "America/New_York",
                "Europe/London",
                "Asia/Dubai",
              ]}
              onChange={(value) =>
                updateSectionValue(
                  "otherSettings",
                  "timezone",
                  value
                )
              }
            />

            <EditSelect
              label="Default Language"
              value={s.otherSettings.language}
              options={[
                "English",
                "Hindi",
                "Odia",
              ]}
              onChange={(value) =>
                updateSectionValue(
                  "otherSettings",
                  "language",
                  value
                )
              }
            />

            <EditSelect
              label="Date Format"
              value={s.otherSettings.dateFormat}
              options={[
                "DD/MM/YYYY",
                "MM/DD/YYYY",
                "YYYY-MM-DD",
              ]}
              onChange={(value) =>
                updateSectionValue(
                  "otherSettings",
                  "dateFormat",
                  value
                )
              }
            />
          </div>
        </div>

        {/* WEBSITE ACCESS */}
        <div className="WebsiteSetthingSummary-edit-card">
          <div className="WebsiteSetthingSummary-edit-card-title">
            <span>♙</span>
            <h3>Website Access</h3>
          </div>

          <div className="WebsiteSetthingSummary-edit-divider" />

          <div className="WebsiteSetthingSummary-edit-switch-grid">
            <EditSwitchRow
              label="Maintenance Mode"
              value={s.otherSettings.maintenanceMode}
              onChange={() =>
                updateBoolean(
                  "otherSettings",
                  "maintenanceMode"
                )
              }
            />

            <EditSwitchRow
              label="Allow Customer Registration"
              value={s.otherSettings.customerRegistration}
              onChange={() =>
                updateBoolean(
                  "otherSettings",
                  "customerRegistration"
                )
              }
            />

            <EditSwitchRow
              label="Allow Guest Checkout"
              value={s.otherSettings.guestCheckout}
              onChange={() =>
                updateBoolean(
                  "otherSettings",
                  "guestCheckout"
                )
              }
            />
          </div>
        </div>

        {/* PERFORMANCE */}
        <div className="WebsiteSetthingSummary-edit-card">
          <div className="WebsiteSetthingSummary-edit-card-title">
            <span>♢</span>
            <h3>Performance & Security</h3>
          </div>

          <div className="WebsiteSetthingSummary-edit-divider" />

          <div className="WebsiteSetthingSummary-edit-switch-grid">
            <EditSwitchRow
              label="Enable Website Cache"
              value={s.otherSettings.enableCache}
              onChange={() =>
                updateBoolean(
                  "otherSettings",
                  "enableCache"
                )
              }
            />

            <EditSwitchRow
              label="Enable Security Protection"
              value={s.otherSettings.enableSecurity}
              onChange={() =>
                updateBoolean(
                  "otherSettings",
                  "enableSecurity"
                )
              }
            />
          </div>
        </div>

        {/* ANALYTICS */}
        <div className="WebsiteSetthingSummary-edit-card">
          <div className="WebsiteSetthingSummary-edit-card-title">
            <span>▥</span>
            <h3>Analytics</h3>
          </div>

          <div className="WebsiteSetthingSummary-edit-divider" />

          <div className="WebsiteSetthingSummary-edit-grid">
            <EditInput
              label="Google Analytics ID"
              value={s.otherSettings.googleAnalytics}
              placeholder="G-XXXXXXXXXX"
              onChange={(value) =>
                updateSectionValue(
                  "otherSettings",
                  "googleAnalytics",
                  value
                )
              }
            />

            <EditInput
              label="Facebook Pixel ID"
              value={s.otherSettings.facebookPixel}
              placeholder="Enter Facebook Pixel ID"
              onChange={(value) =>
                updateSectionValue(
                  "otherSettings",
                  "facebookPixel",
                  value
                )
              }
            />
          </div>
        </div>

        {/* BOTTOM BUTTONS */}
        <div className="WebsiteSetthingSummary-bottom-actions">
          <button
            type="button"
            className="WebsiteSetthingSummary-cancel-btn"
            onClick={handleCancelEdit}
            disabled={saving}
          >
            Cancel
          </button>

          <button
            type="button"
            className="WebsiteSetthingSummary-save-btn"
            onClick={handleSaveChanges}
            disabled={saving}
          >
            {saving
              ? "Saving..."
              : "✓ Save All Changes"}
          </button>
        </div>
      </section>
    );
  };

  // =====================================================
  // SUMMARY MODE
  // =====================================================

  const renderSummary = () => {
    const s = settings;

    return (
      <main className="WebsiteSetthingSummary-container">
        {/* STORE PROFILE */}
        <section className="WebsiteSetthingSummary-card">
          <div className="WebsiteSetthingSummary-card-heading">
            <div className="WebsiteSetthingSummary-heading-icon">
              ▣
            </div>
            <h2>Store Profile</h2>
          </div>

          <div className="WebsiteSetthingSummary-divider" />

          <div className="WebsiteSetthingSummary-store-content">
            <div className="WebsiteSetthingSummary-logo-section">
              <div className="WebsiteSetthingSummary-logo">
                {getImageUrl(s.storeProfile.logo) ? (
                  <img
                    src={getImageUrl(
                      s.storeProfile.logo
                    )}
                    alt="Store Logo"
                  />
                ) : (
                  <div className="WebsiteSetthingSummary-logo-placeholder">
                    <strong>
                      {s.storeProfile.storeName ||
                        "Choco Bliss"}
                    </strong>
                    <small>
                      {s.storeProfile.tagline ||
                        "Premium Chocolates"}
                    </small>
                  </div>
                )}
              </div>

              <button
                type="button"
                className="WebsiteSetthingSummary-logo-btn"
                onClick={handleEditSettings}
              >
                ✎ Edit Logo
              </button>
            </div>

            <div className="WebsiteSetthingSummary-store-details">
              <div className="WebsiteSetthingSummary-info-row">
                <span>Store Name</span>
                <strong>
                  {s.storeProfile.storeName ||
                    "Not set"}
                </strong>
              </div>

              <div className="WebsiteSetthingSummary-info-row">
                <span>Tagline</span>
                <strong>
                  {s.storeProfile.tagline ||
                    "Not set"}
                </strong>
              </div>

              <div className="WebsiteSetthingSummary-info-row">
                <span>Website Email</span>
                <strong>
                  {s.storeProfile.websiteEmail ||
                    "Not set"}
                </strong>
              </div>

              <div className="WebsiteSetthingSummary-info-row">
                <span>Store Description</span>
                <strong>
                  {s.storeProfile.storeDescription ||
                    "Not set"}
                </strong>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section className="WebsiteSetthingSummary-card">
          <div className="WebsiteSetthingSummary-card-heading">
            <div className="WebsiteSetthingSummary-heading-icon">
              ▤
            </div>
            <h2>Contact Details</h2>
          </div>

          <div className="WebsiteSetthingSummary-divider" />

          <div className="WebsiteSetthingSummary-contact-list">
            <div className="WebsiteSetthingSummary-info-row">
              <span>Address</span>
              <strong>
                {s.contactDetails.address ||
                  "Not set"}
              </strong>
            </div>

            <div className="WebsiteSetthingSummary-info-row">
              <span>Phone Number</span>
              <strong>
                {s.contactDetails.phone ||
                  "Not set"}
              </strong>
            </div>

            <div className="WebsiteSetthingSummary-info-row">
              <span>WhatsApp Number</span>
              <strong>
                {s.contactDetails.whatsapp ||
                  "Not set"}
              </strong>
            </div>

            <div className="WebsiteSetthingSummary-info-row">
              <span>Support Email</span>
              <strong>
                {s.contactDetails.supportEmail ||
                  "Not set"}
              </strong>
            </div>

            <div className="WebsiteSetthingSummary-info-row">
              <span>Working Hours</span>
              <strong>
                {s.contactDetails.workingHours ||
                  "Not set"}
              </strong>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="WebsiteSetthingSummary-card">
          <div className="WebsiteSetthingSummary-card-heading">
            <div className="WebsiteSetthingSummary-heading-icon">
              ★
            </div>
            <h2>Features</h2>
          </div>

          <div className="WebsiteSetthingSummary-divider" />

          <div className="WebsiteSetthingSummary-feature-list">
            <FeatureRow
              label="Premium Collection"
              enabled={s.features.premiumCollection}
            />

            <FeatureRow
              label="Honey Products"
              enabled={s.features.honeyProducts}
            />

            <FeatureRow
              label="Customer Reviews"
              enabled={s.features.customerReviews}
            />

            <FeatureRow
              label="Newsletter Subscription"
              enabled={s.features.newsletter}
            />

            <FeatureRow
              label="WhatsApp Chat"
              enabled={s.features.whatsappChat}
            />
          </div>
        </section>

        {/* SOCIAL MEDIA */}
        <section className="WebsiteSetthingSummary-card">
          <div className="WebsiteSetthingSummary-card-heading">
            <div className="WebsiteSetthingSummary-heading-icon">
              ⤴
            </div>
            <h2>Social Media Links</h2>
          </div>

          <div className="WebsiteSetthingSummary-divider" />

          <div className="WebsiteSetthingSummary-social-list">
            {[
              [
                "f",
                "Facebook",
                s.socialMedia.facebook,
                "facebook",
              ],
              [
                "◎",
                "Instagram",
                s.socialMedia.instagram,
                "instagram",
              ],
              [
                "▶",
                "YouTube",
                s.socialMedia.youtube,
                "youtube",
              ],
              [
                "♥",
                "Twitter",
                s.socialMedia.twitter,
                "twitter",
              ],
            ].map(
              ([icon, name, url, type]) => (
                <div
                  className="WebsiteSetthingSummary-social-row"
                  key={name}
                >
                  <div
                    className={`WebsiteSetthingSummary-social-icon WebsiteSetthingSummary-${type}`}
                  >
                    {icon}
                  </div>

                  <span className="WebsiteSetthingSummary-social-name">
                    {name}
                  </span>

                  <button
                    type="button"
                    className="WebsiteSetthingSummary-social-link"
                    onClick={() =>
                      handleSocialClick(url)
                    }
                    disabled={!url}
                  >
                    {url || "Not set"}
                  </button>
                </div>
              )
            )}
          </div>
        </section>

        {/* SEO */}
        <section className="WebsiteSetthingSummary-card">
          <div className="WebsiteSetthingSummary-card-heading">
            <div className="WebsiteSetthingSummary-heading-icon">
              ⌕
            </div>
            <h2>SEO Settings</h2>
          </div>

          <div className="WebsiteSetthingSummary-divider" />

          <div className="WebsiteSetthingSummary-info-list">
            <div className="WebsiteSetthingSummary-info-row">
              <span>Meta Title</span>
              <strong>
                {s.seo.metaTitle || "Not set"}
              </strong>
            </div>

            <div className="WebsiteSetthingSummary-info-row">
              <span>Meta Description</span>
              <strong>
                {s.seo.metaDescription ||
                  "Not set"}
              </strong>
            </div>
          </div>
        </section>

        {/* EMAIL */}
        <section className="WebsiteSetthingSummary-card">
          <div className="WebsiteSetthingSummary-card-heading">
            <div className="WebsiteSetthingSummary-heading-icon">
              ✉
            </div>
            <h2>Email Configuration</h2>
          </div>

          <div className="WebsiteSetthingSummary-divider" />

          <div className="WebsiteSetthingSummary-info-list">
            <div className="WebsiteSetthingSummary-info-row">
              <span>Mail Provider</span>
              <strong>
                {s.emailSettings.mailProvider}
              </strong>
            </div>

            <div className="WebsiteSetthingSummary-info-row">
              <span>SMTP Host</span>
              <strong>
                {s.emailSettings.smtpHost}
              </strong>
            </div>

            <div className="WebsiteSetthingSummary-info-row">
              <span>SMTP Port</span>
              <strong>
                {s.emailSettings.smtpPort}
              </strong>
            </div>

            <div className="WebsiteSetthingSummary-info-row">
              <span>Encryption</span>
              <strong>
                {s.emailSettings.encryption}
              </strong>
            </div>

            <div className="WebsiteSetthingSummary-info-row">
              <span>Sender Name</span>
              <strong>
                {s.emailSettings.senderName ||
                  "Not set"}
              </strong>
            </div>

            <div className="WebsiteSetthingSummary-info-row">
              <span>Sender Email</span>
              <strong>
                {s.emailSettings.senderEmail ||
                  "Not set"}
              </strong>
            </div>
          </div>
        </section>

        {/* EMAIL NOTIFICATIONS */}
        <section className="WebsiteSetthingSummary-card">
          <div className="WebsiteSetthingSummary-card-heading">
            <div className="WebsiteSetthingSummary-heading-icon">
              ♧
            </div>
            <h2>Email Notifications</h2>
          </div>

          <div className="WebsiteSetthingSummary-divider" />

          <div className="WebsiteSetthingSummary-feature-list">
            <FeatureRow
              label="New Order Notification"
              enabled={
                s.emailSettings.orderNotification
              }
            />

            <FeatureRow
              label="Payment Notification"
              enabled={
                s.emailSettings.paymentNotification
              }
            />

            <FeatureRow
              label="Customer Registration"
              enabled={
                s.emailSettings.customerRegistration
              }
            />

            <FeatureRow
              label="Newsletter Notification"
              enabled={
                s.emailSettings.newsletterNotification
              }
            />
          </div>
        </section>

        {/* PAYMENT */}
        <section className="WebsiteSetthingSummary-card">
          <div className="WebsiteSetthingSummary-card-heading">
            <div className="WebsiteSetthingSummary-heading-icon">
              ▤
            </div>
            <h2>Payment Settings</h2>
          </div>

          <div className="WebsiteSetthingSummary-divider" />

          <div className="WebsiteSetthingSummary-payment-content">
            <div>
              <div className="WebsiteSetthingSummary-info-row">
                <span>Currency</span>
                <strong>
                  {s.paymentSettings.currency}
                </strong>
              </div>

              <div className="WebsiteSetthingSummary-info-row">
                <span>Symbol</span>
                <strong>
                  {s.paymentSettings.currencySymbol}
                </strong>
              </div>
            </div>

            <div>
              <h3 className="WebsiteSetthingSummary-small-title">
                Payment Methods
              </h3>

              <FeatureRow
                label="Cash on Delivery"
                enabled={s.paymentSettings.cod}
              />

              <FeatureRow
                label="Online Payment"
                enabled={
                  s.paymentSettings.onlinePayment
                }
              />

              <FeatureRow
                label="Razorpay"
                enabled={
                  s.paymentSettings.razorpay
                }
              />

              <FeatureRow
                label="Stripe"
                enabled={
                  s.paymentSettings.stripe
                }
              />

              <FeatureRow
                label="PayPal"
                enabled={
                  s.paymentSettings.paypal
                }
              />
            </div>
          </div>
        </section>

        {/* GATEWAY */}
        <section className="WebsiteSetthingSummary-card WebsiteSetthingSummary-full-card">
          <div className="WebsiteSetthingSummary-card-heading WebsiteSetthingSummary-heading-between">
            <div className="WebsiteSetthingSummary-card-heading">
              <div className="WebsiteSetthingSummary-heading-icon">
                ♙
              </div>
              <h2>Gateway Credentials</h2>
            </div>

            <button
              type="button"
              className="WebsiteSetthingSummary-test-mode"
            >
              {s.paymentSettings.testMode
                ? "◉ Test Mode"
                : "◉ Live Mode"}
            </button>
          </div>

          <div className="WebsiteSetthingSummary-divider" />

          <div className="WebsiteSetthingSummary-gateway-grid">
            {[
              [
                "Razorpay Key ID",
                s.paymentSettings.razorpayKey,
              ],
              [
                "Razorpay Secret",
                s.paymentSettings.razorpaySecret,
              ],
              [
                "Stripe Public Key",
                s.paymentSettings.stripePublicKey,
              ],
              [
                "Stripe Secret Key",
                s.paymentSettings.stripeSecretKey,
              ],
            ].map(([label, value]) => (
              <div
                className="WebsiteSetthingSummary-info-row"
                key={label}
              >
                <span>{label}</span>

                <strong>
                  {value
                    ? showSecrets
                      ? value
                      : "••••••••••••••"
                    : "Not set"}
                </strong>
              </div>
            ))}
          </div>

          <button
            type="button"
            className="WebsiteSetthingSummary-show-secret"
            onClick={() =>
              setShowSecrets((previous) =>
                !previous
              )
            }
          >
            {showSecrets
              ? "Hide Credentials"
              : "Show Credentials"}
          </button>
        </section>

        {/* PREFERENCES */}
        <section className="WebsiteSetthingSummary-card">
          <div className="WebsiteSetthingSummary-card-heading">
            <div className="WebsiteSetthingSummary-heading-icon">
              ⚙
            </div>
            <h2>Website Preferences</h2>
          </div>

          <div className="WebsiteSetthingSummary-divider" />

          <div className="WebsiteSetthingSummary-info-list">
            <div className="WebsiteSetthingSummary-info-row">
              <span>Timezone</span>
              <strong>
                {s.otherSettings.timezone}
              </strong>
            </div>

            <div className="WebsiteSetthingSummary-info-row">
              <span>Default Language</span>
              <strong>
                {s.otherSettings.language}
              </strong>
            </div>

            <div className="WebsiteSetthingSummary-info-row">
              <span>Date Format</span>
              <strong>
                {s.otherSettings.dateFormat}
              </strong>
            </div>
          </div>
        </section>

        {/* ACCESS */}
        <section className="WebsiteSetthingSummary-card">
          <div className="WebsiteSetthingSummary-card-heading">
            <div className="WebsiteSetthingSummary-heading-icon">
              ♙
            </div>
            <h2>Website Access</h2>
          </div>

          <div className="WebsiteSetthingSummary-divider" />

          <div className="WebsiteSetthingSummary-feature-list">
            <FeatureRow
              label="Maintenance Mode"
              enabled={
                s.otherSettings.maintenanceMode
              }
            />

            <FeatureRow
              label="Allow Customer Registration"
              enabled={
                s.otherSettings.customerRegistration
              }
            />

            <FeatureRow
              label="Allow Guest Checkout"
              enabled={
                s.otherSettings.guestCheckout
              }
            />
          </div>
        </section>

        {/* PERFORMANCE */}
        <section className="WebsiteSetthingSummary-card">
          <div className="WebsiteSetthingSummary-card-heading">
            <div className="WebsiteSetthingSummary-heading-icon">
              ♢
            </div>
            <h2>Performance & Security</h2>
          </div>

          <div className="WebsiteSetthingSummary-divider" />

          <div className="WebsiteSetthingSummary-feature-list">
            <FeatureRow
              label="Website Cache"
              enabled={s.otherSettings.enableCache}
            />

            <FeatureRow
              label="Security Protection"
              enabled={
                s.otherSettings.enableSecurity
              }
            />
          </div>
        </section>

        {/* ANALYTICS */}
        <section className="WebsiteSetthingSummary-card">
          <div className="WebsiteSetthingSummary-card-heading">
            <div className="WebsiteSetthingSummary-heading-icon">
              ▥
            </div>
            <h2>Analytics</h2>
          </div>

          <div className="WebsiteSetthingSummary-divider" />

          <div className="WebsiteSetthingSummary-info-list">
            <div className="WebsiteSetthingSummary-info-row">
              <span>Google Analytics ID</span>
              <strong>
                {s.otherSettings.googleAnalytics ||
                  "Not set"}
              </strong>
            </div>

            <div className="WebsiteSetthingSummary-info-row">
              <span>Facebook Pixel ID</span>
              <strong>
                {s.otherSettings.facebookPixel ||
                  "Not set"}
              </strong>
            </div>
          </div>
        </section>

        {/* SYSTEM STATUS */}
        <section className="WebsiteSetthingSummary-system-card">
          <div className="WebsiteSetthingSummary-system-item">
            <div className="WebsiteSetthingSummary-system-icon">
              ▣
            </div>

            <div>
              <span>Server Status</span>
              <strong>Online</strong>
            </div>
          </div>

          <div className="WebsiteSetthingSummary-system-item">
            <div className="WebsiteSetthingSummary-system-icon">
              ▤
            </div>

            <div>
              <span>Database</span>
              <strong>Connected</strong>
            </div>
          </div>

          <div className="WebsiteSetthingSummary-system-item">
            <div className="WebsiteSetthingSummary-system-icon">
              ♢
            </div>

            <div>
              <span>Security</span>
              <strong>Protected</strong>
            </div>
          </div>

          <div className="WebsiteSetthingSummary-system-item">
            <div className="WebsiteSetthingSummary-system-icon">
              ⟳
            </div>

            <div>
              <span>Last Sync</span>
              <strong>
                {lastUpdated}
              </strong>
            </div>
          </div>
        </section>

        <div className="WebsiteSetthingSummary-last-updated">
          ◷ Last Updated: {lastUpdated}
        </div>
      </main>
    );
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="WebsiteSetthingSummary">
        <div className="WebsiteSetthingSummary-loading">
          <div className="WebsiteSetthingSummary-loading-spinner">
            ⟳
          </div>

          <span>
            Loading website settings...
          </span>
        </div>
      </div>
    );
  }

  // =====================================================
  // MAIN RETURN
  // =====================================================

  return (
    <div className="WebsiteSetthingSummary">
      {/* HEADER */}
      <header className="WebsiteSetthingSummary-header">
        <div className="WebsiteSetthingSummary-header-left">
          <div className="WebsiteSetthingSummary-page-icon">
            ⚙
          </div>

          <div>
            <h1 className="WebsiteSetthingSummary-title">
              Website Settings Summary
            </h1>

            <p className="WebsiteSetthingSummary-subtitle">
              View all your website configuration
              in one place
            </p>
          </div>
        </div>

        <div className="WebsiteSetthingSummary-header-actions">
          {!isEditing ? (
            <>
              <button
                type="button"
                className="WebsiteSetthingSummary-edit-btn"
                onClick={handleEditSettings}
              >
                ✎ Edit Settings
              </button>

              <button
                type="button"
                className="WebsiteSetthingSummary-refresh-btn"
                onClick={handleRefresh}
                disabled={loading}
              >
                ⟳ Refresh Data
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                className="WebsiteSetthingSummary-cancel-btn"
                onClick={handleCancelEdit}
                disabled={saving}
              >
                Cancel
              </button>

              <button
                type="button"
                className="WebsiteSetthingSummary-save-btn"
                onClick={handleSaveChanges}
                disabled={saving}
              >
                {saving
                  ? "Saving..."
                  : "✓ Save Changes"}
              </button>
            </>
          )}
        </div>
      </header>

      {/* SUCCESS TOAST */}
      {saveMessage && (
        <div className="WebsiteSetthingSummary-toast">
          <span>✓</span>
          {saveMessage}
        </div>
      )}

      {/* ERROR */}
      {errorMessage && (
        <div className="WebsiteSetthingSummary-toast WebsiteSetthingSummary-error-toast">
          <span>!</span>
          {errorMessage}

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

      {/* EDIT MODE */}
      {isEditing && renderEditPanel()}

      {/* SUMMARY MODE */}
      {!isEditing && renderSummary()}
    </div>
  );
};

export default WebsiteSetthingSummary;
