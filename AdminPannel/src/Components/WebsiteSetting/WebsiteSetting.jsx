import React, { useRef, useState } from "react";
import "./WebsiteSetting.css";

const WebsiteSetting = () => {
  const [activeTab, setActiveTab] = useState("General Settings");
  const [saved, setSaved] = useState(false);

  const logoInputRef = useRef(null);
  const bannerInputRef = useRef(null);
  const faviconInputRef = useRef(null);

  const [formData, setFormData] = useState({
    storeName: "Choco Bliss",
    tagline: "Premium Chocolates, Pure Happiness",
    websiteEmail: "support@chocobliss.com",
    description:
      "Choco Bliss brings you the finest selection of premium chocolates made with love and the best ingredients. Indulge in the richness of happiness.",

    address: "123 Chocolate Street, Sweet City, CA 90210, USA",
    phone: "+1 234 567 8900",
    whatsapp: "+1 234 567 8900",
    supportEmail: "support@chocobliss.com",
    workingHours: "Mon - Sun: 9:00 AM - 10:00 PM",

    facebook: "https://facebook.com/chocobliss",
    instagram: "https://instagram.com/chocobliss",
    youtube: "https://youtube.com/chocobliss",
    twitter: "https://twitter.com/chocobliss",

    primaryColor: "#B84513",
    secondaryColor: "#D4AF37",
    accentColor: "#FFD700",
    themeStyle: "Dark",

    metaTitle: "Choco Bliss - Premium Chocolates Online",
    metaDescription:
      "Shop the best premium chocolates online at Choco Bliss. High quality, handcrafted chocolates for every occasion.",

    logo: null,
    banner: null,
    favicon: null,

    enablePremium: true,
    enableHoney: true,
    enableReviews: true,
    enableNewsletter: true,
    enableWhatsapp: true,
  });

  const [logoPreview, setLogoPreview] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(null);
  const [faviconPreview, setFaviconPreview] = useState(null);

  const tabs = [
    { name: "General Settings", icon: "home" },
    { name: "Appearance", icon: "palette" },
    { name: "Email Settings", icon: "mail" },
    { name: "Payment Settings", icon: "card" },
    { name: "Other Settings", icon: "settings" },
  ];

  const updateField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    setSaved(false);
  };

  const handleFileChange = (event, type) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    if (type === "logo") {
      setLogoPreview(imageUrl);
      updateField("logo", file);
    }

    if (type === "banner") {
      setBannerPreview(imageUrl);
      updateField("banner", file);
    }

    if (type === "favicon") {
      setFaviconPreview(imageUrl);
      updateField("favicon", file);
    }
  };

  const removeImage = (type) => {
    if (type === "logo") {
      setLogoPreview(null);
      updateField("logo", null);
      if (logoInputRef.current) logoInputRef.current.value = "";
    }

    if (type === "banner") {
      setBannerPreview(null);
      updateField("banner", null);
      if (bannerInputRef.current) bannerInputRef.current.value = "";
    }

    if (type === "favicon") {
      setFaviconPreview(null);
      updateField("favicon", null);
      if (faviconInputRef.current) faviconInputRef.current.value = "";
    }
  };

  const handleSave = () => {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  const handlePreview = () => {
    window.open("/", "_blank");
  };

  const toggleFeature = (field) => {
    updateField(field, !formData[field]);
  };

  const Icon = ({ type, size = 16 }) => {
    const paths = {
      home: (
        <>
          <path d="M3 10.5 12 3l9 7.5" />
          <path d="M5.5 9.5V21h13V9.5" />
          <path d="M9 21v-6h6v6" />
        </>
      ),

      palette: (
        <>
          <path d="M12 3a9 9 0 1 0 0 18h1.2a2 2 0 0 0 0-4H12a2 2 0 0 1 0-4h4.5A4.5 4.5 0 0 0 21 8.5C21 5.46 17 3 12 3Z" />
          <circle cx="7.5" cy="10" r="1" />
          <circle cx="10" cy="7" r="1" />
          <circle cx="14" cy="6.5" r="1" />
        </>
      ),

      mail: (
        <>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m4 7 8 6 8-6" />
        </>
      ),

      card: (
        <>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M3 10h18" />
          <path d="M7 15h4" />
        </>
      ),

      settings: (
        <>
          <path d="M12 15.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Z" />
          <path d="M19.4 15a1.8 1.8 0 0 0 .36 1.98l.06.06-1.7 1.7-.06-.06a1.8 1.8 0 0 0-1.98-.36 1.8 1.8 0 0 0-1.08 1.65V20h-2.4v-.09a1.8 1.8 0 0 0-1.08-1.65 1.8 1.8 0 0 0-1.98.36l-.06.06-1.7-1.7.06-.06A1.8 1.8 0 0 0 8.2 15a1.8 1.8 0 0 0-1.65-1.08H6.5v-2.4h.05A1.8 1.8 0 0 0 8.2 10a1.8 1.8 0 0 0-.36-1.98l-.06-.06 1.7-1.7.06.06a1.8 1.8 0 0 0 1.98.36 1.8 1.8 0 0 0 1.08-1.65V5h2.4v.03a1.8 1.8 0 0 0 1.08 1.65 1.8 1.8 0 0 0 1.98-.36l.06-.06 1.7 1.7-.06.06A1.8 1.8 0 0 0 19.4 10a1.8 1.8 0 0 0 1.65 1.08h.05v2.4H21A1.8 1.8 0 0 0 19.4 15Z" />
        </>
      ),

      location: (
        <>
          <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
          <circle cx="12" cy="10" r="2.5" />
        </>
      ),

      phone: (
        <>
          <path d="M6.5 3.5 9 3l2 4-2 1.5a13 13 0 0 0 4.5 4.5L15 11l4 2-.5 2.5C18.1 17.3 16.7 18 15 18 9.5 18 6 14.5 6 9c0-1.7.7-3.1.5-5.5Z" />
        </>
      ),

      whatsapp: (
        <>
          <path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.5-4A8 8 0 1 1 20 11.5Z" />
          <path d="M9 8.5c.3-.3.6-.3.8-.1l.9 1.3c.2.3.2.5 0 .7l-.5.6c.7 1.2 1.5 2 2.7 2.7l.6-.5c.2-.2.4-.2.7 0l1.3.9c.2.2.2.5-.1.8-.5.6-1.2.8-1.9.6-2.5-.7-4.6-2.8-5.3-5.3-.2-.7 0-1.4.8-1.7Z" />
        </>
      ),

      clock: (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </>
      ),

      facebook: (
        <>
          <path d="M14 8h3V4h-3c-3 0-5 2-5 5v3H6v4h3v4h4v-4h3l1-4h-4V9c0-.7.3-1 1-1Z" />
        </>
      ),

      instagram: (
        <>
          <rect x="4" y="4" width="16" height="16" rx="4" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
        </>
      ),

      youtube: (
        <>
          <path d="M20 8.5c-.2-1.2-1.1-2-2.3-2.1C16 6.2 14 6 12 6s-4 .2-5.7.4C5.1 6.5 4.2 7.3 4 8.5c-.2 1.2-.3 2.3-.3 3.5s.1 2.3.3 3.5c.2 1.2 1.1 2 2.3 2.1 1.7.2 3.7.4 5.7.4s4-.2 5.7-.4c1.2-.1 2.1-.9 2.3-2.1.2-1.2.3-2.3.3-3.5s-.1-2.3-.3-3.5Z" />
          <path d="m10 9 5 3-5 3V9Z" fill="currentColor" stroke="none" />
        </>
      ),

      twitter: (
        <>
          <path d="M19.5 7.2c.01.17.01.35.01.52 0 5.3-4.04 11.4-11.4 11.4-2.26 0-4.37-.66-6.14-1.8.31.04.63.06.96.06 1.87 0 3.59-.64 4.96-1.72a4.01 4.01 0 0 1-3.74-2.78c.25.04.51.07.77.07.37 0 .74-.05 1.08-.14A4.01 4.01 0 0 1 2.8 8.88v-.05c.54.3 1.17.48 1.83.5a4.01 4.01 0 0 1-1.24-5.35 11.39 11.39 0 0 0 8.27 4.2 4.52 4.52 0 0 1-.1-.91 4.01 4.01 0 0 1 6.94-2.74 7.88 7.88 0 0 0 2.55-.97 4 4 0 0 1-1.76 2.2 7.9 7.9 0 0 0 2.3-.62 8.6 8.6 0 0 1-2.09 2.16Z" />
        </>
      ),

      trash: (
        <>
          <path d="M5 7h14" />
          <path d="M10 11v6M14 11v6" />
          <path d="M7 7l1 13h8l1-13" />
          <path d="M9 7V4h6v3" />
        </>
      ),

      upload: (
        <>
          <path d="M12 15V3" />
          <path d="m8 7 4-4 4 4" />
          <path d="M5 12v7h14v-7" />
        </>
      ),

      external: (
        <>
          <path d="M14 4h6v6" />
          <path d="m20 4-9 9" />
          <path d="M18 13v6H5V6h6" />
        </>
      ),

      save: (
        <>
          <path d="M5 3h12l3 3v15H4V3h1Z" />
          <path d="M8 3v6h8V3M8 21v-7h8v7" />
        </>
      ),
    };

    return (
      <svg
        className="WebsiteSetting-icon"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {paths[type]}
      </svg>
    );
  };

  const renderUploadBox = ({
    type,
    title,
    preview,
    inputRef,
    defaultContent,
    recommended,
  }) => {
    return (
      <div className="WebsiteSetting-uploadArea">
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/x-icon"
          className="WebsiteSetting-hiddenInput"
          onChange={(e) => handleFileChange(e, type)}
        />

        <div className="WebsiteSetting-uploadPreview">
          {preview ? (
            <img
              src={preview}
              alt={title}
              className={`WebsiteSetting-uploadImage WebsiteSetting-uploadImage-${type}`}
            />
          ) : (
            defaultContent
          )}

          <div className="WebsiteSetting-uploadInfo">
            <div className="WebsiteSetting-uploadFileName">
              {preview ? "New image selected" : title}
            </div>

            <div className="WebsiteSetting-uploadActions">
              <button
                type="button"
                className="WebsiteSetting-uploadButton"
                onClick={() => inputRef.current?.click()}
              >
                <Icon type="upload" size={13} />
                {preview ? "Change" : "Upload"}
              </button>

              {preview && (
                <button
                  type="button"
                  className="WebsiteSetting-deleteButton"
                  onClick={() => removeImage(type)}
                  aria-label={`Remove ${type}`}
                >
                  <Icon type="trash" size={14} />
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="WebsiteSetting-recommended">{recommended}</div>
      </div>
    );
  };

  const Toggle = ({ field }) => {
    return (
      <button
        type="button"
        className={`WebsiteSetting-toggle ${
          formData[field] ? "WebsiteSetting-toggleActive" : ""
        }`}
        onClick={() => toggleFeature(field)}
        aria-pressed={formData[field]}
      >
        <span className="WebsiteSetting-toggleKnob" />
      </button>
    );
  };

  return (
    <div className="WebsiteSetting">
      <div className="WebsiteSetting-wrapper">
        {/* HEADER */}
        <header className="WebsiteSetting-header">
          <div className="WebsiteSetting-headerLeft">
            <h1 className="WebsiteSetting-title">Website Settings</h1>
            <p className="WebsiteSetting-subtitle">
              Manage your website details, appearance and preferences
            </p>
          </div>

          <div className="WebsiteSetting-headerActions">
            <button
              type="button"
              className="WebsiteSetting-previewButton"
              onClick={handlePreview}
            >
              Preview Website
              <Icon type="external" size={13} />
            </button>

            <button
              type="button"
              className={`WebsiteSetting-saveButton ${
                saved ? "WebsiteSetting-saveButtonSaved" : ""
              }`}
              onClick={handleSave}
            >
              <Icon type="save" size={14} />
              {saved ? "Saved!" : "Save Changes"}
            </button>
          </div>
        </header>

        {/* TABS */}
        <nav className="WebsiteSetting-tabs">
          {tabs.map((tab) => (
            <button
              type="button"
              key={tab.name}
              className={`WebsiteSetting-tab ${
                activeTab === tab.name ? "WebsiteSetting-tabActive" : ""
              }`}
              onClick={() => setActiveTab(tab.name)}
            >
              <Icon type={tab.icon} size={14} />
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>

        {/* GENERAL SETTINGS */}
        {activeTab === "General Settings" && (
          <main className="WebsiteSetting-content">
            <div className="WebsiteSetting-grid">
              {/* LEFT COLUMN */}
              <div className="WebsiteSetting-leftColumn">
                {/* STORE PROFILE */}
                <section className="WebsiteSetting-card WebsiteSetting-storeProfile">
                  <h2 className="WebsiteSetting-cardTitle">Store Profile</h2>

                  <div className="WebsiteSetting-storeProfileContent">
                    <div className="WebsiteSetting-logoColumn">
                      <div className="WebsiteSetting-logoBox">
                        {logoPreview ? (
                          <img
                            src={logoPreview}
                            alt="Store logo"
                            className="WebsiteSetting-logoImage"
                          />
                        ) : (
                          <div className="WebsiteSetting-defaultLogo">
                            <div className="WebsiteSetting-chocolateIcon">
                              <span>🍫</span>
                            </div>

                            <div className="WebsiteSetting-logoText">
                              Choco Bliss
                            </div>

                            <div className="WebsiteSetting-logoSubText">
                              PREMIUM CHOCOLATES
                            </div>
                          </div>
                        )}
                      </div>

                      <button
                        type="button"
                        className="WebsiteSetting-changeLogoButton"
                        onClick={() => logoInputRef.current?.click()}
                      >
                        <Icon type="upload" size={13} />
                        Change Logo
                      </button>

                      <input
                        ref={logoInputRef}
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        className="WebsiteSetting-hiddenInput"
                        onChange={(e) => handleFileChange(e, "logo")}
                      />

                      <span className="WebsiteSetting-logoHint">
                        PNG, JPG or WEBP, Max 2MB
                      </span>
                    </div>

                    <div className="WebsiteSetting-profileFields">
                      <div className="WebsiteSetting-field">
                        <label>Store Name</label>
                        <input
                          type="text"
                          value={formData.storeName}
                          onChange={(e) =>
                            updateField("storeName", e.target.value)
                          }
                        />
                      </div>

                      <div className="WebsiteSetting-field">
                        <label>Tagline</label>
                        <input
                          type="text"
                          value={formData.tagline}
                          onChange={(e) =>
                            updateField("tagline", e.target.value)
                          }
                        />
                      </div>

                      <div className="WebsiteSetting-field">
                        <label>Website Email</label>
                        <input
                          type="email"
                          value={formData.websiteEmail}
                          onChange={(e) =>
                            updateField("websiteEmail", e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="WebsiteSetting-field WebsiteSetting-descriptionField">
                    <label>Store Description</label>

                    <div className="WebsiteSetting-textareaWrapper">
                      <textarea
                        value={formData.description}
                        maxLength={250}
                        onChange={(e) =>
                          updateField("description", e.target.value)
                        }
                      />

                      <span className="WebsiteSetting-characterCount">
                        {formData.description.length} / 250
                      </span>
                    </div>
                  </div>
                </section>

                {/* BOTTOM LEFT */}
                <div className="WebsiteSetting-bottomGrid">
                  {/* APPEARANCE */}
                  <section className="WebsiteSetting-card WebsiteSetting-appearanceCard">
                    <h2 className="WebsiteSetting-cardTitle">
                      Appearance Settings
                    </h2>

                    <div className="WebsiteSetting-colorRow">
                      <label>Primary Color</label>

                      <div className="WebsiteSetting-selectColor">
                        <span
                          className="WebsiteSetting-colorPreview"
                          style={{
                            backgroundColor: formData.primaryColor,
                          }}
                        />

                        <select
                          value={formData.primaryColor}
                          onChange={(e) =>
                            updateField("primaryColor", e.target.value)
                          }
                        >
                          <option value="#B84513">#B84513</option>
                          <option value="#8B4513">#8B4513</option>
                          <option value="#7B341E">#7B341E</option>
                        </select>
                      </div>
                    </div>

                    <div className="WebsiteSetting-colorRow">
                      <label>Secondary Color</label>

                      <div className="WebsiteSetting-selectColor">
                        <span
                          className="WebsiteSetting-colorPreview"
                          style={{
                            backgroundColor: formData.secondaryColor,
                          }}
                        />

                        <select
                          value={formData.secondaryColor}
                          onChange={(e) =>
                            updateField("secondaryColor", e.target.value)
                          }
                        >
                          <option value="#D4AF37">#D4AF37</option>
                          <option value="#C99A00">#C99A00</option>
                          <option value="#E7C65C">#E7C65C</option>
                        </select>
                      </div>
                    </div>

                    <div className="WebsiteSetting-colorRow">
                      <label>Accent Color</label>

                      <div className="WebsiteSetting-selectColor">
                        <span
                          className="WebsiteSetting-colorPreview"
                          style={{
                            backgroundColor: formData.accentColor,
                          }}
                        />

                        <select
                          value={formData.accentColor}
                          onChange={(e) =>
                            updateField("accentColor", e.target.value)
                          }
                        >
                          <option value="#FFD700">#FFD700</option>
                          <option value="#F5C400">#F5C400</option>
                          <option value="#FFE680">#FFE680</option>
                        </select>
                      </div>
                    </div>

                    <div className="WebsiteSetting-colorRow">
                      <label>Theme Style</label>

                      <select
                        className="WebsiteSetting-normalSelect"
                        value={formData.themeStyle}
                        onChange={(e) =>
                          updateField("themeStyle", e.target.value)
                        }
                      >
                        <option>Dark</option>
                        <option>Light</option>
                        <option>System</option>
                      </select>
                    </div>

                    <div className="WebsiteSetting-bannerHeading">
                      Homepage Banner
                    </div>

                    {renderUploadBox({
                      type: "banner",
                      title: "banner-home.jpg",
                      preview: bannerPreview,
                      inputRef: bannerInputRef,
                      recommended: "Recommended size: 1920x700px",
                      defaultContent: (
                        <div className="WebsiteSetting-defaultBanner">
                          <div className="WebsiteSetting-bannerChocolate">
                            🍫
                          </div>
                          <div>
                            <strong>CHOCO BLISS</strong>
                            <small>PREMIUM CHOCOLATES</small>
                          </div>
                        </div>
                      ),
                    })}
                  </section>

                  {/* FEATURES */}
                  <section className="WebsiteSetting-card WebsiteSetting-featuresCard">
                    <h2 className="WebsiteSetting-cardTitle">Features</h2>

                    <div className="WebsiteSetting-featureList">
                      <div className="WebsiteSetting-featureRow">
                        <span>Enable Premium Collection</span>
                        <Toggle field="enablePremium" />
                      </div>

                      <div className="WebsiteSetting-featureRow">
                        <span>Enable Honey Products</span>
                        <Toggle field="enableHoney" />
                      </div>

                      <div className="WebsiteSetting-featureRow">
                        <span>Enable Customer Reviews</span>
                        <Toggle field="enableReviews" />
                      </div>

                      <div className="WebsiteSetting-featureRow">
                        <span>Enable Newsletter Subscription</span>
                        <Toggle field="enableNewsletter" />
                      </div>

                      <div className="WebsiteSetting-featureRow">
                        <span>Enable WhatsApp Chat</span>
                        <Toggle field="enableWhatsapp" />
                      </div>
                    </div>
                  </section>
                </div>
              </div>

              {/* RIGHT COLUMN */}
              <div className="WebsiteSetting-rightColumn">
                {/* CONTACT DETAILS */}
                <section className="WebsiteSetting-card WebsiteSetting-contactCard">
                  <h2 className="WebsiteSetting-cardTitle">
                    Contact Details
                  </h2>

                  <div className="WebsiteSetting-contactList">
                    <div className="WebsiteSetting-contactRow">
                      <div className="WebsiteSetting-contactLabel">
                        <Icon type="location" size={14} />
                        <span>Address</span>
                      </div>

                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) =>
                          updateField("address", e.target.value)
                        }
                      />
                    </div>

                    <div className="WebsiteSetting-contactRow">
                      <div className="WebsiteSetting-contactLabel">
                        <Icon type="phone" size={14} />
                        <span>Phone Number</span>
                      </div>

                      <input
                        type="text"
                        value={formData.phone}
                        onChange={(e) =>
                          updateField("phone", e.target.value)
                        }
                      />
                    </div>

                    <div className="WebsiteSetting-contactRow">
                      <div className="WebsiteSetting-contactLabel WebsiteSetting-whatsappLabel">
                        <Icon type="whatsapp" size={14} />
                        <span>WhatsApp Number</span>
                      </div>

                      <input
                        type="text"
                        value={formData.whatsapp}
                        onChange={(e) =>
                          updateField("whatsapp", e.target.value)
                        }
                      />
                    </div>

                    <div className="WebsiteSetting-contactRow">
                      <div className="WebsiteSetting-contactLabel">
                        <Icon type="mail" size={14} />
                        <span>Support Email</span>
                      </div>

                      <input
                        type="email"
                        value={formData.supportEmail}
                        onChange={(e) =>
                          updateField("supportEmail", e.target.value)
                        }
                      />
                    </div>

                    <div className="WebsiteSetting-contactRow">
                      <div className="WebsiteSetting-contactLabel">
                        <Icon type="clock" size={14} />
                        <span>Working Hours</span>
                      </div>

                      <input
                        type="text"
                        value={formData.workingHours}
                        onChange={(e) =>
                          updateField("workingHours", e.target.value)
                        }
                      />
                    </div>
                  </div>
                </section>

                {/* SOCIAL MEDIA */}
                <section className="WebsiteSetting-card WebsiteSetting-socialCard">
                  <h2 className="WebsiteSetting-cardTitle">
                    Social Media Links
                  </h2>

                  <div className="WebsiteSetting-socialList">
                    <div className="WebsiteSetting-socialRow">
                      <div className="WebsiteSetting-socialLabel WebsiteSetting-facebookLabel">
                        <span className="WebsiteSetting-socialIcon">
                          <Icon type="facebook" size={14} />
                        </span>
                        <span>Facebook</span>
                      </div>

                      <input
                        type="url"
                        value={formData.facebook}
                        onChange={(e) =>
                          updateField("facebook", e.target.value)
                        }
                      />
                    </div>

                    <div className="WebsiteSetting-socialRow">
                      <div className="WebsiteSetting-socialLabel WebsiteSetting-instagramLabel">
                        <span className="WebsiteSetting-socialIcon">
                          <Icon type="instagram" size={14} />
                        </span>
                        <span>Instagram</span>
                      </div>

                      <input
                        type="url"
                        value={formData.instagram}
                        onChange={(e) =>
                          updateField("instagram", e.target.value)
                        }
                      />
                    </div>

                    <div className="WebsiteSetting-socialRow">
                      <div className="WebsiteSetting-socialLabel WebsiteSetting-youtubeLabel">
                        <span className="WebsiteSetting-socialIcon">
                          <Icon type="youtube" size={14} />
                        </span>
                        <span>YouTube</span>
                      </div>

                      <input
                        type="url"
                        value={formData.youtube}
                        onChange={(e) =>
                          updateField("youtube", e.target.value)
                        }
                      />
                    </div>

                    <div className="WebsiteSetting-socialRow">
                      <div className="WebsiteSetting-socialLabel WebsiteSetting-twitterLabel">
                        <span className="WebsiteSetting-socialIcon">
                          <Icon type="twitter" size={14} />
                        </span>
                        <span>Twitter</span>
                      </div>

                      <input
                        type="url"
                        value={formData.twitter}
                        onChange={(e) =>
                          updateField("twitter", e.target.value)
                        }
                      />
                    </div>
                  </div>
                </section>

                {/* SEO */}
                <section className="WebsiteSetting-card WebsiteSetting-seoCard">
                  <h2 className="WebsiteSetting-cardTitle">SEO Settings</h2>

                  <div className="WebsiteSetting-seoList">
                    <div className="WebsiteSetting-seoRow">
                      <label>Meta Title</label>

                      <input
                        type="text"
                        value={formData.metaTitle}
                        onChange={(e) =>
                          updateField("metaTitle", e.target.value)
                        }
                      />
                    </div>

                    <div className="WebsiteSetting-seoRow WebsiteSetting-metaDescriptionRow">
                      <label>Meta Description</label>

                      <div className="WebsiteSetting-textareaWrapper">
                        <textarea
                          maxLength={160}
                          value={formData.metaDescription}
                          onChange={(e) =>
                            updateField("metaDescription", e.target.value)
                          }
                        />

                        <span className="WebsiteSetting-characterCount">
                          {formData.metaDescription.length} / 160
                        </span>
                      </div>
                    </div>

                    <div className="WebsiteSetting-seoRow">
                      <label>Favicon</label>

                      <div className="WebsiteSetting-faviconArea">
                        <input
                          ref={faviconInputRef}
                          type="file"
                          accept="image/png,image/jpeg,image/x-icon"
                          className="WebsiteSetting-hiddenInput"
                          onChange={(e) =>
                            handleFileChange(e, "favicon")
                          }
                        />

                        <div className="WebsiteSetting-faviconPreview">
                          {faviconPreview ? (
                            <img
                              src={faviconPreview}
                              alt="Favicon"
                              className="WebsiteSetting-faviconImage"
                            />
                          ) : (
                            <div className="WebsiteSetting-faviconDefault">
                              🍫
                            </div>
                          )}
                        </div>

                        <div className="WebsiteSetting-faviconFile">
                          <span>
                            {faviconPreview
                              ? "new-favicon.png"
                              : "favicon.ico"}
                          </span>

                          <button
                            type="button"
                            className="WebsiteSetting-faviconUpload"
                            onClick={() =>
                              faviconInputRef.current?.click()
                            }
                          >
                            <Icon type="upload" size={13} />
                            Change
                          </button>
                        </div>

                        {faviconPreview && (
                          <button
                            type="button"
                            className="WebsiteSetting-deleteButton WebsiteSetting-faviconDelete"
                            onClick={() => removeImage("favicon")}
                          >
                            <Icon type="trash" size={14} />
                          </button>
                        )}
                      </div>

                      <small className="WebsiteSetting-recommended">
                        ICO, PNG. Recommended 32x32px
                      </small>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </main>
        )}

        {/* OTHER TABS */}
        {activeTab !== "General Settings" && (
          <div className="WebsiteSetting-placeholderTab">
            <div className="WebsiteSetting-placeholderIcon">
              <Icon
                type={
                  tabs.find((item) => item.name === activeTab)?.icon ||
                  "settings"
                }
                size={28}
              />
            </div>

            <h2>{activeTab}</h2>

            <p>
              {activeTab} configuration can be managed from this section.
            </p>

            <button
              type="button"
              className="WebsiteSetting-backButton"
              onClick={() => setActiveTab("General Settings")}
            >
              Back to General Settings
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WebsiteSetting;