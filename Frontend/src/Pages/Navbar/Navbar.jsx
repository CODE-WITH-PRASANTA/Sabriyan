import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { FiHeart, FiUser, FiShoppingCart } from "react-icons/fi";

import Logo from "../../assets/logo.webp";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Example Cart item count
  const cartItemCount = 4;

  const closeMenu = () => setMenuOpen(false);
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  // Lock background scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeMenu();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  return (
    <>
      <header className="Navbar">
        <div className="Navbar-container">
          {/* ================= LOGO ================= */}
          <NavLink to="/" className="Navbar-logo" onClick={closeMenu}>
            <img src={Logo} alt="Brand Logo" />
          </NavLink>

          {/* ================= DESKTOP NAVIGATION ================= */}
          <nav className="Navbar-links" aria-label="Main Navigation">
            <NavLink to="/" onClick={closeMenu}>Home</NavLink>
            <NavLink to="/about" onClick={closeMenu}>About</NavLink>
            <NavLink to="/ourproduct" onClick={closeMenu}>Our Products</NavLink>
            <NavLink to="/honey" onClick={closeMenu}>Honey</NavLink>
            <NavLink to="/blog" onClick={closeMenu}>Blog</NavLink>
            <NavLink to="/faq" onClick={closeMenu}>FAQ</NavLink>
            <NavLink to="/contact" onClick={closeMenu}>Contact</NavLink>
          </nav>

          {/* ================= DESKTOP ACTIONS ================= */}
          <div className="Navbar-actions">
            {/* Wishlist */}
            <NavLink to="/wishlist" className="Navbar-action-item" onClick={closeMenu}>
              <div className="Navbar-action-icon-wrap">
                <FiHeart className="Navbar-action-icon" />
              </div>
              <span>Wishlist</span>
            </NavLink>

            {/* Account */}
            <NavLink to="/account" className="Navbar-action-item" onClick={closeMenu}>
              <div className="Navbar-action-icon-wrap">
                <FiUser className="Navbar-action-icon" />
              </div>
              <span>Account</span>
            </NavLink>

            {/* Cart */}
            <NavLink
              to="/cart"
              className="Navbar-action-item Navbar-cart-button"
              onClick={closeMenu}
              aria-label="Open shopping cart"
            >
              <div className="Navbar-action-icon-wrap">
                <FiShoppingCart className="Navbar-action-icon" />
                {cartItemCount > 0 && (
                  <span className="Navbar-badge">{cartItemCount}</span>
                )}
              </div>
              <span>Cart</span>
            </NavLink>
          </div>

          {/* ================= DESKTOP CTA ================= */}
          <NavLink to="/contact" className="Navbar-btn" onClick={closeMenu}>
            Contact Us
          </NavLink>

          {/* ================= MOBILE TOGGLE ================= */}
          <button
            type="button"
            className="Navbar-toggle"
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <IoClose /> : <HiOutlineMenuAlt3 />}
          </button>
        </div>

        {/* ================= MOBILE MENU DRAWER ================= */}
        <div className={`Navbar-mobile ${menuOpen ? "Navbar-mobile-show" : ""}`}>
          <div className="Navbar-mobile-scroll">
            <nav className="Navbar-mobile-links" aria-label="Mobile Navigation">
              <NavLink to="/" onClick={closeMenu}>Home</NavLink>
              <NavLink to="/about" onClick={closeMenu}>About</NavLink>
              <NavLink to="/ourproduct" onClick={closeMenu}>Our Products</NavLink>
              <NavLink to="/honey" onClick={closeMenu}>Honey</NavLink>
              <NavLink to="/blog" onClick={closeMenu}>Blog</NavLink>
              <NavLink to="/faq" onClick={closeMenu}>FAQ</NavLink>
              <NavLink to="/contact" onClick={closeMenu}>Contact</NavLink>
            </nav>

            <div className="Navbar-mobile-actions">
              <NavLink to="/wishlist" className="Navbar-action-item" onClick={closeMenu}>
                <div className="Navbar-action-icon-wrap">
                  <FiHeart className="Navbar-action-icon" />
                </div>
                <span>Wishlist</span>
              </NavLink>

              <NavLink to="/account" className="Navbar-action-item" onClick={closeMenu}>
                <div className="Navbar-action-icon-wrap">
                  <FiUser className="Navbar-action-icon" />
                </div>
                <span>Account</span>
              </NavLink>

              <NavLink to="/cart" className="Navbar-action-item" onClick={closeMenu}>
                <div className="Navbar-action-icon-wrap">
                  <FiShoppingCart className="Navbar-action-icon" />
                  {cartItemCount > 0 && (
                    <span className="Navbar-badge">{cartItemCount}</span>
                  )}
                </div>
                <span>Cart</span>
              </NavLink>
            </div>

            <NavLink to="/contact" className="Navbar-mobile-btn" onClick={closeMenu}>
              Contact Us
            </NavLink>
          </div>
        </div>
      </header>

      {/* Dimmed Background Overlay */}
      <div
        className={`Navbar-backdrop ${menuOpen ? "Navbar-backdrop-active" : ""}`}
        onClick={closeMenu}
        aria-hidden="true"
      />
    </>
  );
};

export default Navbar;