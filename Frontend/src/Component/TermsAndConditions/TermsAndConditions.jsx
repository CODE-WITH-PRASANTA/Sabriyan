import React, { useState, useEffect } from "react";
import "./TermsAndConditions.css";

import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
  FaEnvelope,
  FaSearch,
  FaUser,
  FaShoppingBag,
  FaShieldAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const heroBgImage =
  "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?q=80&w=2000&auto=format&fit=crop";

const promoCardBg =
  "https://images.unsplash.com/photo-1549007994-cb92caebd54b?q=80&w=600&auto=format&fit=crop";

const sections = [
  {
    id: "intro",
    num: "1",
    title: "Introduction",
    content:
      "Welcome to Sabriyana Chocolate. These Terms & Conditions govern your access to and use of our website, services, and the purchase of our gourmet handcrafted artisan chocolate products. By browsing, accessing, or placing an order on our platform, you agree to be legally bound by these terms. Please read them thoroughly prior to completing any transaction.",
  },
  {
    id: "use",
    num: "2",
    title: "Use of Website",
    content:
      "You agree to utilize our website strictly for lawful purposes and in accordance with these terms. You must not use our site in any manner that could disable, overburden, impair, or compromise our web infrastructure, or interfere with any other user's shopping experience. Any unauthorized scraping, automated data mining, or malicious penetration attempts are strictly forbidden.",
  },
  {
    id: "products",
    num: "3",
    title: "Products & Orders",
    content:
      "We strive to display our chocolate collections, packaging, ingredients, and flavor profiles as accurately as possible. However, because our confections are hand-crafted in artisanal batches, slight variations in appearance, texture, and weight may occur. We reserve the right to refuse, limit, or cancel any order placed with us at our sole discretion.",
  },
  {
    id: "pricing",
    num: "4",
    title: "Pricing & Payment",
    content:
      "All prices are quoted in INR (₹) and include applicable statutory taxes unless expressly stated otherwise. Payments are securely processed through end-to-end encrypted payment gateways. Sabriyana Chocolate reserves the right to adjust product pricing, bundle rates, and seasonal offerings at any time without prior notification.",
  },
  {
    id: "shipping",
    num: "5",
    title: "Shipping & Delivery",
    content:
      "We ship temperature-controlled chocolate packages nationwide across India to ensure freshness and prevent melting. Delivery timelines typically range from 2 to 6 business days depending on destination and climate conditions. Sabriyana Chocolate is not liable for transit delays caused by courier partners, regional customs, or adverse weather.",
  },
  {
    id: "returns",
    num: "6",
    title: "Returns & Refunds",
    content:
      "Due to the perishable and consumable nature of gourmet food items, we cannot accept returns once packages are dispatched. However, if your order arrives melted, broken, or in a compromised condition, please send photographic proof to our customer care team within 24 hours of delivery for a prompt replacement or store credit.",
  },
  {
    id: "ip",
    num: "7",
    title: "Intellectual Property",
    content:
      "All trademarks, trade names, branding designs, package imagery, visual graphics, recipes, and website copy published on this platform are the exclusive intellectual property of Sabriyana Chocolate. Reproduction, duplication, or redistribution without prior written consent is strictly prohibited.",
  },
  {
    id: "liability",
    num: "8",
    title: "Limitation of Liability",
    content:
      "Sabriyana Chocolate, its founders, chocolatiers, and affiliates shall not be held liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use our products or services, including allergen sensitivities where full ingredient disclaimers have been provided.",
  },
  {
    id: "changes",
    num: "9",
    title: "Changes to Terms",
    content:
      "We reserve the right to review, modify, and update these Terms & Conditions periodically to align with legal mandates and operational practices. Any modifications become effective immediately upon posting to this page. Continued usage of our website signifies your acceptance of the revised terms.",
  },
  {
    id: "contact",
    num: "10",
    title: "Contact Us",
    content:
      "If you have inquiries, feedback, or require clarification regarding our Terms & Conditions or order policies, please reach out to our concierge team at support@sabriyanachocolate.com or call our customer hotline at +91 98765 43210.",
  },
];

const TermsAndConditions = () => {
  const [activeTab, setActiveTab] = useState("intro");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -110;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 160;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveTab(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="terms-and-conditions">
      {/* TOP NOTIFICATION BAR */}
      <div className="terms-and-conditions__top-bar">
        <div className="terms-and-conditions__top-bar-inner">
          <span className="terms-and-conditions__tagline">
            Welcome to Sabriyana Chocolate • Pure Handcrafted Indulgence
          </span>

          <div className="terms-and-conditions__top-links">
            <a href="#track">Track Order</a>
            <span>|</span>
            <a href="#faq">FAQ</a>
            <span>|</span>
            <a href="#contact">Contact Us</a>

            <div className="terms-and-conditions__top-socials">
              <a href="#facebook" aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href="#instagram" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="#youtube" aria-label="YouTube">
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN HEADER */}
      <header className="terms-and-conditions__header">
        <div className="terms-and-conditions__header-inner">
          {/* BRAND LOGO */}
          <div className="terms-and-conditions__logo">
            <h2>Sabriyana</h2>
            <span className="terms-and-conditions__logo-sub">CHOCOLATIER</span>
          </div>

          {/* MAIN NAV */}
          <nav
            className={`terms-and-conditions__nav ${
              mobileMenuOpen ? "active" : ""
            }`}
          >
            <a href="#home" onClick={() => setMobileMenuOpen(false)}>
              HOME
            </a>
            <a href="#shop" onClick={() => setMobileMenuOpen(false)}>
              SHOP ▾
            </a>
            <a href="#collections" onClick={() => setMobileMenuOpen(false)}>
              COLLECTIONS ▾
            </a>
            <a href="#about" onClick={() => setMobileMenuOpen(false)}>
              ABOUT US
            </a>
            <a href="#blog" onClick={() => setMobileMenuOpen(false)}>
              BLOG
            </a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)}>
              CONTACT US
            </a>
          </nav>

          {/* ACTION BUTTONS */}
          <div className="terms-and-conditions__header-actions">
            <button
              type="button"
              className="terms-and-conditions__icon-btn"
              aria-label="Search"
            >
              <FaSearch />
            </button>

            <button
              type="button"
              className="terms-and-conditions__icon-btn"
              aria-label="User Account"
            >
              <FaUser />
            </button>

            <button
              type="button"
              className="terms-and-conditions__icon-btn terms-and-conditions__cart-btn"
              aria-label="Cart"
            >
              <FaShoppingBag />
              <span className="terms-and-conditions__cart-badge">0</span>
            </button>

            <button
              type="button"
              className="terms-and-conditions__mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION WITH EMERALD GREEN & GOLD PARTICLES */}
      <section
        className="terms-and-conditions__hero"
        style={{
          backgroundImage: `url("${heroBgImage}")`,
        }}
      >
        <div className="terms-and-conditions__hero-overlay"></div>
        <div className="terms-and-conditions__hero-content">
          <h1 className="terms-and-conditions__hero-title">
            Terms <span>&amp;</span> Conditions
          </h1>
          <p className="terms-and-conditions__breadcrumbs">
            <a href="#home">Home</a>
            <span className="terms-and-conditions__breadcrumb-sep">&gt;</span>
            <span>Terms &amp; Conditions</span>
          </p>
        </div>
      </section>

      {/* MAIN TWO-COLUMN LAYOUT */}
      <main className="terms-and-conditions__main">
        <div className="terms-and-conditions__container">
          {/* STICKY SIDEBAR */}
          <aside className="terms-and-conditions__sidebar">
            <div className="terms-and-conditions__nav-card">
              <ul className="terms-and-conditions__nav-list">
                {sections.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      className={`terms-and-conditions__nav-item ${
                        activeTab === item.id ? "active" : ""
                      }`}
                      onClick={() => scrollToSection(item.id)}
                    >
                      {item.num}. {item.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* ARTISAN PROMO CARD */}
            <div
              className="terms-and-conditions__promo-card"
              style={{
                backgroundImage: `linear-gradient(
                  to top,
                  rgba(4, 15, 10, 0.95) 15%,
                  rgba(10, 31, 21, 0.6) 70%,
                  transparent 100%
                ), url("${promoCardBg}")`,
              }}
            >
              <div className="terms-and-conditions__promo-content">
                <h3>Indulge in Pure Happiness</h3>
                <p>Finest single-origin cocoa, crafted with love.</p>
                <button
                  type="button"
                  className="terms-and-conditions__gold-btn"
                >
                  SHOP NOW
                </button>
              </div>
            </div>
          </aside>

          {/* CONDITIONS DETAILS CONTENT */}
          <article className="terms-and-conditions__content">
            {sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className={`terms-and-conditions__section ${
                  activeTab === section.id ? "highlight" : ""
                }`}
              >
                <h2>
                  {section.num}. {section.title}
                </h2>
                <p>{section.content}</p>
              </section>
            ))}

            {/* ASSURANCE / NOTICE BOX */}
            <div className="terms-and-conditions__notice-box">
              <div className="terms-and-conditions__notice-icon">
                <FaShieldAlt />
              </div>
              <div className="terms-and-conditions__notice-text">
                <h4>
                  By using our website, you agree to these Terms &amp;
                  Conditions.
                </h4>
                <p>Thank you for choosing Sabriyana Chocolate.</p>
              </div>
            </div>
          </article>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="terms-and-conditions__footer">
        <div className="terms-and-conditions__footer-container">
          <div className="terms-and-conditions__footer-col">
            <div className="terms-and-conditions__logo">
              <h2>Sabriyana</h2>
              <span className="terms-and-conditions__logo-sub">CHOCOLATIER</span>
            </div>
            <p className="terms-and-conditions__footer-desc">
              Crafting happiness in every single bite. Premium dark and milk
              chocolates made with the world&apos;s finest ethically sourced cocoa.
            </p>
            <div className="terms-and-conditions__footer-socials">
              <a href="#facebook" aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href="#instagram" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="#whatsapp" aria-label="WhatsApp">
                <FaWhatsapp />
              </a>
              <a href="mailto:support@sabriyanachocolate.com" aria-label="Email">
                <FaEnvelope />
              </a>
            </div>
          </div>

          <div className="terms-and-conditions__footer-col">
            <h3>QUICK LINKS</h3>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#shop">Shop</a></li>
              <li><a href="#collections">Collections</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#blog">Blog</a></li>
              <li><a href="#contact">Contact Us</a></li>
            </ul>
          </div>

          <div className="terms-and-conditions__footer-col">
            <h3>CUSTOMER SERVICE</h3>
            <ul>
              <li><a href="#track">Track Order</a></li>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#shipping">Shipping Policy</a></li>
              <li><a href="#returns">Returns &amp; Refunds</a></li>
              <li><a href="#terms">Terms &amp; Conditions</a></li>
              <li><a href="#privacy">Privacy Policy</a></li>
            </ul>
          </div>

          <div className="terms-and-conditions__footer-col">
            <h3>NEWSLETTER</h3>
            <p>
              Subscribe to get updates on seasonal truffles and exclusive member privileges.
            </p>
            <form
              className="terms-and-conditions__newsletter-form"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Enter your email"
                required
              />
              <button
                type="submit"
                className="terms-and-conditions__gold-btn"
              >
                SUBSCRIBE
              </button>
            </form>
          </div>
        </div>

        <div className="terms-and-conditions__copyright">
          <p>© 2026 Sabriyana Chocolate. All Rights Reserved.</p>
          <p>
            Made with <span style={{ color: "var(--gold-primary)" }}>♥</span> for chocolate lovers.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default TermsAndConditions;