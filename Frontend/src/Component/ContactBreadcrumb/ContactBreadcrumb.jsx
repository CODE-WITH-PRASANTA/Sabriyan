import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { Link } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa';
import './ContactBreadcrumb.css';

// ONLY BACKGROUND IMAGE IMPORTED HERE
import bgImage from '../../assets/breadcrumb.png';

gsap.registerPlugin(ScrollTrigger);

// SVG Bee Component
const BeeSVG = () => (
  <svg viewBox="0 0 64 64" fill="none" className="contact-breadcrumb-bee-svg">
    <ellipse cx="26" cy="18" rx="14" ry="8" fill="rgba(255, 255, 255, 0.75)" transform="rotate(-30 26 18)" />
    <ellipse cx="38" cy="18" rx="14" ry="8" fill="rgba(255, 255, 255, 0.75)" transform="rotate(30 38 18)" />
    <ellipse cx="32" cy="38" rx="18" ry="22" fill="#FFC107" />
    <path d="M16 32 C 24 35, 40 35, 48 32" stroke="#1A1A1A" strokeWidth="4" strokeLinecap="round" />
    <path d="M15 40 C 24 43, 40 43, 49 40" stroke="#1A1A1A" strokeWidth="4" strokeLinecap="round" />
    <path d="M18 48 C 25 50, 39 50, 46 48" stroke="#1A1A1A" strokeWidth="4" strokeLinecap="round" />
    <circle cx="32" cy="18" r="8" fill="#1A1A1A" />
  </svg>
);

// SVG Flower Element
const FlowerSVG = () => (
  <svg viewBox="0 0 100 100" fill="none" className="contact-breadcrumb-flower-svg">
    <circle cx="50" cy="28" r="14" fill="#FFFFFF" />
    <circle cx="72" cy="50" r="14" fill="#FFFFFF" />
    <circle cx="50" cy="72" r="14" fill="#FFFFFF" />
    <circle cx="28" cy="50" r="14" fill="#FFFFFF" />
    <circle cx="34" cy="34" r="14" fill="#FFFFFF" />
    <circle cx="66" cy="34" r="14" fill="#FFFFFF" />
    <circle cx="66" cy="66" r="14" fill="#FFFFFF" />
    <circle cx="34" cy="66" r="14" fill="#FFFFFF" />
    <circle cx="50" cy="50" r="12" fill="#FFC107" />
  </svg>
);

const ContactBreadcrumb = () => {
  const containerRef = useRef(null);
  const parallaxRef = useRef(null);
  const beesRef = useRef([]);

  // Mouse Parallax Effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const moveX = (clientX - window.innerWidth / 2) * 0.012;
      const moveY = (clientY - window.innerHeight / 2) * 0.012;

      gsap.to(parallaxRef.current, {
        x: moveX,
        y: moveY,
        ease: "power2.out",
        duration: 1
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Flying Bees Animation
  useEffect(() => {
    beesRef.current.forEach((bee, i) => {
      if (!bee) return;
      gsap.to(bee, {
        x: 'random(-50, 50, 10)',
        y: 'random(-35, 35, 10)',
        rotation: 'random(-20, 20)',
        duration: 3 + i * 1.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    });
  }, []);

  return (
    <section 
      className="contact-breadcrumb" 
      ref={containerRef}
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Dark Forest Overlay */}
      <div className="contact-breadcrumb-overlay"></div>

      {/* Floating Fog Effect */}
      <div className="contact-breadcrumb-fog fog-1"></div>
      <div className="contact-breadcrumb-fog fog-2"></div>
      <div className="contact-breadcrumb-fog fog-3"></div>

      {/* Parallax Content Wrapper */}
      <div className="contact-breadcrumb-parallax" ref={parallaxRef}>
        
        {/* Floating Golden Light Particles */}
        <div className="contact-breadcrumb-particles">
          {Array.from({ length: 35 }).map((_, i) => (
            <span 
              key={i} 
              className="contact-breadcrumb-particle" 
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${5 + Math.random() * 6}s`
              }}
            ></span>
          ))}
        </div>

        {/* Floating Leaves */}
        <div className="contact-breadcrumb-leaves">
          {Array.from({ length: 10 }).map((_, i) => (
            <span 
              key={i}
              className="contact-breadcrumb-leaf"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${8 + Math.random() * 10}s`
              }}
            ></span>
          ))}
        </div>

        {/* Flying Bees */}
        <div className="contact-breadcrumb-bee bee-1" ref={(el) => (beesRef.current[0] = el)}>
          <BeeSVG />
        </div>
        <div className="contact-breadcrumb-bee bee-2" ref={(el) => (beesRef.current[1] = el)}>
          <BeeSVG />
        </div>
        <div className="contact-breadcrumb-bee bee-3" ref={(el) => (beesRef.current[2] = el)}>
          <BeeSVG />
        </div>
        <div className="contact-breadcrumb-bee bee-4" ref={(el) => (beesRef.current[3] = el)}>
          <BeeSVG />
        </div>

        {/* Center Hero Content */}
        <div className="contact-breadcrumb-content">
          
          {/* Dripping Honey Drops */}
          <div className="contact-breadcrumb-honey-drops">
            <span className="contact-breadcrumb-drop drop-1"></span>
            <span className="contact-breadcrumb-drop drop-2"></span>
            <span className="contact-breadcrumb-drop drop-3"></span>
          </div>

          {/* Glassmorphic Breadcrumb Navigation Bar */}
          <motion.nav 
            className="contact-breadcrumb-nav"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <Link to="/" className="contact-breadcrumb-link">Home</Link>
            <FaChevronRight className="contact-breadcrumb-arrow" />
            <Link to="/products" className="contact-breadcrumb-link">Products</Link>
            <FaChevronRight className="contact-breadcrumb-arrow" />
            <span className="contact-breadcrumb-current">Contact</span>
          </motion.nav>

        </div>

        {/* Decorative Flowers & Honeycomb Elements */}
        <div className="contact-breadcrumb-flower left">
          <FlowerSVG />
        </div>
        <div className="contact-breadcrumb-flower right">
          <FlowerSVG />
        </div>

        <div className="contact-breadcrumb-honeycomb">
          <div className="hex"></div>
          <div className="hex"></div>
          <div className="hex"></div>
          <div className="hex"></div>
          <div className="hex"></div>
        </div>

      </div>
    </section>
  );
};

export default ContactBreadcrumb;