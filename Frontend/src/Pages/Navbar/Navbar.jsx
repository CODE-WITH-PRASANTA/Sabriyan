import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { FiHeart, FiUser, FiShoppingCart } from "react-icons/fi";
import "./Navbar.css";

import Logo from "../../assets/logo.webp";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const cartItemCount = 4; // Dynamic cart count badge

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="Navbar">
      <div className="Navbar-container">
        {/* Logo */}
        <NavLink to="/" className="Navbar-logo" onClick={closeMenu}>
          <img src={Logo} alt="Logo" />
        </NavLink>

        {/* Desktop Navigation Links */}
        <nav className="Navbar-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/honey">Honey</NavLink>
          <NavLink to="/blog">Blog</NavLink>
          <NavLink to="/faq">FAQ</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>

        {/* Right Action Icons (Wishlist, Account, Cart) */}
        <div className="Navbar-actions">
          <NavLink to="/wishlist" className="Navbar-action-item">
            <div className="Navbar-action-icon-wrap">
              <FiHeart className="Navbar-action-icon" />
            </div>
            <span>Wishlist</span>
          </NavLink>

          <NavLink to="/account" className="Navbar-action-item">
            <div className="Navbar-action-icon-wrap">
              <FiUser className="Navbar-action-icon" />
            </div>
            <span>Account</span>
          </NavLink>

          <NavLink to="/cart" className="Navbar-action-item">
            <div className="Navbar-action-icon-wrap">
              <FiShoppingCart className="Navbar-action-icon" />
              {cartItemCount > 0 && (
                <span className="Navbar-badge">{cartItemCount}</span>
              )}
            </div>
            <span>Cart</span>
          </NavLink>
        </div>

        {/* Contact CTA Button */}
        <NavLink to="/contact" className="Navbar-btn">
          Contact Us
        </NavLink>

        {/* Mobile Toggle Button */}
        <button
          type="button"
          className="Navbar-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? <IoClose /> : <HiOutlineMenuAlt3 />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`Navbar-mobile ${
          menuOpen ? "Navbar-mobile-show" : ""
        }`}
      >
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

        {/* Mobile Actions */}
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