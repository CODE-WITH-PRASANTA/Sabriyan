import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import "./Navbar.css";

import Logo from "../../assets/logo.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="Navbar">
      <div className="Navbar-container">
        {/* Logo */}
        <NavLink to="/" className="Navbar-logo" onClick={closeMenu}>
          <img src={Logo} alt="Logo" />
        </NavLink>

        {/* Desktop Menu */}
        <nav className="Navbar-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/honey">Honey</NavLink>
          <NavLink to="/blog">Blog</NavLink>
          <NavLink to="/faq">FAQ</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>

        {/* Button */}
        <NavLink to="/contact" className="Navbar-btn">
          Contact Us
        </NavLink>

        {/* Mobile Button */}
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