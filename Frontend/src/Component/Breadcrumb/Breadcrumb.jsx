import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa';
import './Breadcrumb.css';

import bgImage from '../../assets/breadcrumb.webp';

// =========================================
// SVG BEE COMPONENT
// =========================================

const BeeSVG = () => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    className="breadcrumb-bee-svg"
    aria-hidden="true"
  >
    <ellipse
      cx="26"
      cy="18"
      rx="14"
      ry="8"
      fill="rgba(255,255,255,0.75)"
      transform="rotate(-30 26 18)"
    />

    <ellipse
      cx="38"
      cy="18"
      rx="14"
      ry="8"
      fill="rgba(255,255,255,0.75)"
      transform="rotate(30 38 18)"
    />

    <ellipse
      cx="32"
      cy="38"
      rx="18"
      ry="22"
      fill="#FFC107"
    />

    <path
      d="M16 32 C24 35,40 35,48 32"
      stroke="#1A1A1A"
      strokeWidth="4"
      strokeLinecap="round"
    />

    <path
      d="M15 40 C24 43,40 43,49 40"
      stroke="#1A1A1A"
      strokeWidth="4"
      strokeLinecap="round"
    />

    <path
      d="M18 48 C25 50,39 50,46 48"
      stroke="#1A1A1A"
      strokeWidth="4"
      strokeLinecap="round"
    />

    <circle
      cx="32"
      cy="18"
      r="8"
      fill="#1A1A1A"
    />
  </svg>
);

// =========================================
// SVG FLOWER COMPONENT
// =========================================

const FlowerSVG = () => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    className="breadcrumb-flower-svg"
    aria-hidden="true"
  >
    <circle cx="50" cy="28" r="14" fill="#FFFFFF" />
    <circle cx="72" cy="50" r="14" fill="#FFFFFF" />
    <circle cx="50" cy="72" r="14" fill="#FFFFFF" />
    <circle cx="28" cy="50" r="14" fill="#FFFFFF" />
    <circle cx="34" cy="34" r="14" fill="#FFFFFF" />
    <circle cx="66" cy="34" r="14" fill="#FFFFFF" />
    <circle cx="66" cy="66" r="14" fill="#FFFFFF" />
    <circle cx="34" cy="66" r="14" fill="#FFFFFF" />

    <circle
      cx="50"
      cy="50"
      r="12"
      fill="#FFC107"
    />
  </svg>
);

// =========================================
// BREADCRUMB COMPONENT
// =========================================

const Breadcrumb = () => {
  const parallaxRef = useRef(null);
  const beesRef = useRef([]);

  // =========================================
  // OPTIMIZED MOUSE PARALLAX
  // =========================================

  useEffect(() => {
    const element = parallaxRef.current;

    if (!element) return;

    let frameId = null;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    const updateParallax = () => {
      frameId = null;

      const moveX =
        (mouseX - window.innerWidth / 2) * 0.006;

      const moveY =
        (mouseY - window.innerHeight / 2) * 0.006;

      gsap.to(element, {
        x: moveX,
        y: moveY,
        duration: 0.6,
        ease: 'power2.out',
        overwrite: true,
      });
    };

    const handleMouseMove = (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;

      if (!frameId) {
        frameId = requestAnimationFrame(updateParallax);
      }
    };

    window.addEventListener(
      'mousemove',
      handleMouseMove,
      { passive: true }
    );

    return () => {
      window.removeEventListener(
        'mousemove',
        handleMouseMove
      );

      if (frameId) {
        cancelAnimationFrame(frameId);
      }

      gsap.killTweensOf(element);
    };
  }, []);

  // =========================================
  // FLYING BEES
  // =========================================

  useEffect(() => {
    const animations = [];

    beesRef.current.forEach((bee, index) => {
      if (!bee) return;

      const animation = gsap.to(bee, {
        x: 'random(-35,35,5)',
        y: 'random(-25,25,5)',
        rotation: 'random(-12,12)',
        duration: 4 + index,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      animations.push(animation);
    });

    return () => {
      animations.forEach((animation) => {
        animation.kill();
      });
    };
  }, []);

  return (
    <section className="breadcrumb">

      {/* =====================================
          OPTIMIZED BACKGROUND IMAGE
      ===================================== */}

      <picture className="breadcrumb-bg-picture">
        <img
          src={bgImage}
          alt=""
          aria-hidden="true"
          className="breadcrumb-bg-image"
          width="1056"
          height="887"
          fetchPriority="high"
          decoding="async"
        />
      </picture>

      {/* =====================================
          DARK OVERLAY
      ===================================== */}

      <div
        className="breadcrumb-overlay"
        aria-hidden="true"
      />

      {/* =====================================
          FOG
      ===================================== */}

      <div
        className="breadcrumb-fog fog-1"
        aria-hidden="true"
      />

      <div
        className="breadcrumb-fog fog-2"
        aria-hidden="true"
      />

      <div
        className="breadcrumb-fog fog-3"
        aria-hidden="true"
      />

      {/* =====================================
          PARALLAX WRAPPER
      ===================================== */}

      <div
        className="breadcrumb-parallax"
        ref={parallaxRef}
      >

        {/* =====================================
            PARTICLES
        ===================================== */}

        <div
          className="breadcrumb-particles"
          aria-hidden="true"
        >
          {Array.from({ length: 20 }).map(
            (_, index) => (
              <span
                key={index}
                className="breadcrumb-particle"
                style={{
                  left:
                    `${(index * 17) % 100}%`,
                  animationDelay:
                    `${(index % 8) * 0.8}s`,
                  animationDuration:
                    `${6 + (index % 5)}s`,
                }}
              />
            )
          )}
        </div>

        {/* =====================================
            FLOATING LEAVES
        ===================================== */}

        <div
          className="breadcrumb-leaves"
          aria-hidden="true"
        >
          {Array.from({ length: 6 }).map(
            (_, index) => (
              <span
                key={index}
                className="breadcrumb-leaf"
                style={{
                  left:
                    `${(index * 19) % 100}%`,
                  animationDelay:
                    `${(index % 5) * 1.2}s`,
                  animationDuration:
                    `${9 + (index % 4)}s`,
                }}
              />
            )
          )}
        </div>

        {/* =====================================
            FLYING BEES
        ===================================== */}

        {[0, 1, 2, 3].map((index) => (
          <div
            key={index}
            className={`breadcrumb-bee bee-${index + 1}`}
            ref={(el) => {
              beesRef.current[index] = el;
            }}
          >
            <BeeSVG />
          </div>
        ))}

        {/* =====================================
            CENTER CONTENT
        ===================================== */}

        <div className="breadcrumb-content">

          {/* Honey Drops */}
          <div
            className="breadcrumb-honey-drops"
            aria-hidden="true"
          >
            <span className="breadcrumb-drop drop-1" />
            <span className="breadcrumb-drop drop-2" />
            <span className="breadcrumb-drop drop-3" />
          </div>

          {/* Breadcrumb Navigation */}
          <nav
            className="breadcrumb-nav"
            aria-label="Breadcrumb"
          >

            <Link
              to="/"
              className="breadcrumb-link"
            >
              Home
            </Link>

            <FaChevronRight
              className="breadcrumb-arrow"
              aria-hidden="true"
            />

            <Link
              to="/products"
              className="breadcrumb-link"
            >
              Products
            </Link>

            <FaChevronRight
              className="breadcrumb-arrow"
              aria-hidden="true"
            />

            <span
              className="breadcrumb-current"
              aria-current="page"
            >
              About
            </span>

          </nav>

        </div>

        {/* =====================================
            FLOWERS
        ===================================== */}

        <div
          className="breadcrumb-flower left"
          aria-hidden="true"
        >
          <FlowerSVG />
        </div>

        <div
          className="breadcrumb-flower right"
          aria-hidden="true"
        >
          <FlowerSVG />
        </div>

        {/* =====================================
            HONEYCOMB
        ===================================== */}

        <div
          className="breadcrumb-honeycomb"
          aria-hidden="true"
        >
          <div className="hex" />
          <div className="hex" />
          <div className="hex" />
          <div className="hex" />
          <div className="hex" />
        </div>

      </div>
    </section>
  );
};

export default Breadcrumb;