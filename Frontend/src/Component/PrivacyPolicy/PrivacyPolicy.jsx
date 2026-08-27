import React, { useState } from "react";
import "./PrivacyPolicy.css";

import {
  FaShieldHalved,
  FaBookOpen,
  FaUserShield,
  FaGear,
  FaCookieBite,
  FaUsers,
  FaLock,
  FaUserCheck,
  FaCalendarCheck,
  FaChild,
  FaPenToSquare,
  FaEnvelope,
  FaChevronRight,
  FaBookmark,
  FaHeart,
} from "react-icons/fa6";

const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState("section-1");

  const navItems = [
    { id: "section-1", label: "1. Introduction" },
    { id: "section-2", label: "2. Information We Collect" },
    { id: "section-3", label: "3. How We Use Your Information" },
    { id: "section-4", label: "4. Cookies & Tracking Technologies" },
    { id: "section-5", label: "5. Information Sharing" },
    { id: "section-6", label: "6. Data Security" },
    { id: "section-7", label: "7. Your Rights & Choices" },
    { id: "section-8", label: "8. Data Retention" },
    { id: "section-9", label: "9. Children's Privacy" },
    { id: "section-10", label: "10. Changes to This Policy" },
    { id: "section-11", label: "11. Contact Us" },
  ];

  const sections = [
    {
      id: "section-1",
      icon: <FaBookOpen />,
      title: "1. Introduction",
      content:
        "This Privacy Policy applies to all visitors, users, and customers of our platform. By accessing or using our services, you consent to the practices described in this policy.",
    },
    {
      id: "section-2",
      icon: <FaUserShield />,
      title: "2. Information We Collect",
      content:
        "We may collect personal information that you provide to us directly, such as your name, email address, phone number, shipping address, and billing details.",
    },
    {
      id: "section-3",
      icon: <FaGear />,
      title: "3. How We Use Your Information",
      content:
        "We use your information to process orders, deliver products, provide customer support, improve our services, send promotional updates if you have opted in, and conduct analytics.",
    },
    {
      id: "section-4",
      icon: <FaCookieBite />,
      title: "4. Cookies & Tracking Technologies",
      content:
        "We use cookies and similar technologies to enhance your browsing experience, analyze site traffic, and personalize content. You can manage cookie preferences through your browser settings.",
    },
    {
      id: "section-5",
      icon: <FaUsers />,
      title: "5. Information Sharing",
      content:
        "We do not sell or rent your personal data. We share information only with trusted partners when necessary to provide our services, such as payment processors and fulfillment partners.",
    },
    {
      id: "section-6",
      icon: <FaLock />,
      title: "6. Data Security",
      content:
        "We implement appropriate security safeguards to protect your personal information against unauthorized access, alteration, disclosure, or destruction.",
    },
    {
      id: "section-7",
      icon: <FaUserCheck />,
      title: "7. Your Rights & Choices",
      content:
        "You have the right to access, update, or delete your personal information. You can also opt out of direct marketing communications at any time.",
    },
    {
      id: "section-8",
      icon: <FaCalendarCheck />,
      title: "8. Data Retention",
      content:
        "We retain your information only as long as necessary to fulfill the operational purposes outlined in this policy, unless a longer retention period is required by law.",
    },
    {
      id: "section-9",
      icon: <FaChild />,
      title: "9. Children's Privacy",
      content:
        "Our platform is not intended for children under 13. We do not knowingly collect personally identifiable information from children.",
    },
    {
      id: "section-10",
      icon: <FaPenToSquare />,
      title: "10. Changes to This Policy",
      content:
        "We may update this Privacy Policy periodically. Any changes will be posted directly on this page along with the updated effective date.",
    },
    {
      id: "section-11",
      icon: <FaEnvelope />,
      title: "11. Contact Us",
      content:
        "If you have any questions or concerns regarding this policy, please contact us at privacy@example.com or call us directly at +1 (800) 123-4567.",
    },
  ];

  const handleNavClick = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="privacy-policy-wrapper">
      {/* ================= HERO WITH CHOCOLATE AESTHETIC ================= */}
      <header className="privacy-policy-hero">
        <div className="privacy-policy-hero-bg"></div>
        <div className="privacy-policy-hero-overlay"></div>

        <div className="privacy-policy-hero-content">
          <h1 className="privacy-policy-hero-title">Privacy Policy</h1>
          <div className="privacy-policy-breadcrumbs">
            <span className="breadcrumb-item">Home</span>
            <FaChevronRight className="breadcrumb-separator" />
            <span className="breadcrumb-item active">Privacy Policy</span>
          </div>
        </div>
      </header>

      {/* ================= MAIN CONTENT ================= */}
      <main className="privacy-policy-container">
        <div className="privacy-policy-grid">
          {/* ================= SIDEBAR ================= */}
          <aside className="privacy-policy-sidebar">
            {/* Table Of Contents */}
            <div className="privacy-policy-toc-card">
              <div className="toc-header">
                <span className="toc-title">On this page</span>
                <FaBookmark className="toc-icon" />
              </div>

              <ul className="toc-list">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      className={`toc-link ${
                        activeSection === item.id ? "active" : ""
                      }`}
                      onClick={() => handleNavClick(item.id)}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Premium Chocolate Promo Card */}
           <div className="privacy-policy-promo-card">
                <div className="promo-card-overlay"></div>

                <div className="promo-card-content">
                  <h3 className="promo-card-title">
                    Indulge in Pure Elegance
                  </h3>

                  <p className="promo-card-desc">
                    Crafted with artisanal single-origin cocoa, velvety smooth
                    textures, and pure botanical richness.
                  </p>

                  <button
                    type="button"
                    className="promo-card-btn"
                    onClick={() => {
                      window.location.href = "/ourproduct";
                    }}
                  >
                    SHOP NOW
                  </button>
                </div>
              </div>
          </aside>

          {/* ================= POLICY CONTENT ================= */}
          <section className="privacy-policy-content">
            {/* Notice Box */}
            <div className="privacy-policy-notice-box">
              <div className="notice-icon-wrapper">
                <FaShieldHalved className="notice-icon" />
              </div>
              <div className="notice-text">
                <h4 className="notice-title">
                  Your privacy is fundamental to our commitment.
                </h4>
                <p className="notice-description">
                  This Privacy Policy explains how we collect, use, disclose, and
                  safeguard your information when you visit our digital platform
                  or purchase our gourmet creations.
                </p>
              </div>
            </div>

            {/* Policy Sections */}
            <div className="privacy-policy-sections-list">
              {sections.map((section) => (
                <article
                  key={section.id}
                  id={section.id}
                  className="policy-section-item"
                >
                  <div className="policy-icon-wrapper">{section.icon}</div>
                  <div className="policy-details">
                    <h2 className="policy-heading">{section.title}</h2>
                    <p className="policy-body">{section.content}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>

        {/* ================= TRUST BANNER ================= */}
        <footer className="privacy-policy-trust-banner">
          <div className="trust-icon-wrapper">
            <FaHeart className="trust-icon" />
          </div>
          <div className="trust-text">
            <h4 className="trust-title">Your trust means everything to us.</h4>
            <p className="trust-subtitle">
              We are committed to safeguarding your personal data and delivering
              an exceptional artisanal experience every step of the way.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default PrivacyPolicy;