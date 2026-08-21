import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import {
  FiHeart,
  FiUser,
  FiShoppingCart,
} from "react-icons/fi";

import "./Navbar.css";
import Logo from "../../assets/logo.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Cart item count
  const cartItemCount = 4;

  // Close mobile menu
  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="Navbar">
      <div className="Navbar-container">

        {/* ================= LOGO ================= */}
        <NavLink
          to="/"
          className="Navbar-logo"
          onClick={closeMenu}
        >
          <img src={Logo} alt="Logo" />
        </NavLink>

        {/* ================= DESKTOP NAVIGATION ================= */}
        <nav className="Navbar-links">

          <NavLink to="/" onClick={closeMenu}>
            Home
          </NavLink>

          <NavLink to="/about" onClick={closeMenu}>
            About
          </NavLink>

          <NavLink to="/honey" onClick={closeMenu}>
            Honey
          </NavLink>

          <NavLink to="/blog" onClick={closeMenu}>
            Blog
          </NavLink>

          <NavLink to="/faq" onClick={closeMenu}>
            FAQ
          </NavLink>

          <NavLink to="/contact" onClick={closeMenu}>
            Contact
          </NavLink>

        </nav>

        {/* ================= RIGHT ACTIONS ================= */}
        <div className="Navbar-actions">

          {/* Wishlist */}
          <NavLink
            to="/wishlist"
            className="Navbar-action-item"
            onClick={closeMenu}
          >
            <div className="Navbar-action-icon-wrap">
              <FiHeart className="Navbar-action-icon" />
            </div>

            <span>Wishlist</span>
          </NavLink>

          {/* Account */}
          <NavLink
            to="/account"
            className="Navbar-action-item"
            onClick={closeMenu}
          >
            <div className="Navbar-action-icon-wrap">
              <FiUser className="Navbar-action-icon" />
            </div>

            <span>Account</span>
          </NavLink>

          {/* ================= CART ================= */}
          <NavLink
            to="/cart"
            className="Navbar-action-item Navbar-cart-button"
            onClick={closeMenu}
            aria-label="Open shopping cart"
          >
            <div className="Navbar-action-icon-wrap">

              <FiShoppingCart className="Navbar-action-icon" />

              {cartItemCount > 0 && (
                <span className="Navbar-badge">
                  {cartItemCount}
                </span>
              )}

            </div>

            <span>Cart</span>
          </NavLink>

        </div>

        {/* ================= CONTACT BUTTON ================= */}
        <NavLink
          to="/contact"
          className="Navbar-btn"
          onClick={closeMenu}
        >
          Contact Us
        </NavLink>

        {/* ================= MOBILE TOGGLE ================= */}
        <button
          type="button"
          className="Navbar-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? <IoClose /> : <HiOutlineMenuAlt3 />}
        </button>

      </div>

      {/* ================= MOBILE MENU ================= */}
      <div
        className={`Navbar-mobile ${
          menuOpen ? "Navbar-mobile-show" : ""
        }`}
      >

        {/* Mobile Navigation */}
        <NavLink to="/" onClick={closeMenu}>
          Home
        </NavLink>

        <NavLink to="/about" onClick={closeMenu}>
          About
        </NavLink>

        <NavLink to="/honey" onClick={closeMenu}>
          Honey
        </NavLink>

        <NavLink to="/blog" onClick={closeMenu}>
          Blog
        </NavLink>

        <NavLink to="/faq" onClick={closeMenu}>
          FAQ
        </NavLink>

        <NavLink to="/contact" onClick={closeMenu}>
          Contact
        </NavLink>

        {/* ================= MOBILE ACTIONS ================= */}
        <div className="Navbar-mobile-actions">

          {/* Mobile Wishlist */}
          <NavLink
            to="/wishlist"
            className="Navbar-action-item"
            onClick={closeMenu}
          >
            <div className="Navbar-action-icon-wrap">
              <FiHeart className="Navbar-action-icon" />
            </div>

            <span>Wishlist</span>
          </NavLink>

          {/* Mobile Account */}
          <NavLink
            to="/account"
            className="Navbar-action-item"
            onClick={closeMenu}
          >
            <div className="Navbar-action-icon-wrap">
              <FiUser className="Navbar-action-icon" />
            </div>

            <span>Account</span>
          </NavLink>

          {/* ================= MOBILE CART ================= */}
          <NavLink
            to="/cart"
            className="Navbar-action-item Navbar-cart-button"
            onClick={closeMenu}
            aria-label="Open shopping cart"
          >
            <div className="Navbar-action-icon-wrap">

              <FiShoppingCart className="Navbar-action-icon" />

              {cartItemCount > 0 && (
                <span className="Navbar-badge">
                  {cartItemCount}
                </span>
              )}

            </div>

            <span>Cart</span>
          </NavLink>

        </div>

        {/* ================= MOBILE CONTACT ================= */}
        <NavLink
          to="/contact"
          className="Navbar-mobile-btn"
          onClick={closeMenu}
        >
          Contact Us
        </NavLink>

      </div>
    </header>
  );
};

export default Navbar;