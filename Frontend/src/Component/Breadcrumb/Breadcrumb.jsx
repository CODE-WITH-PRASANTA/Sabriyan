import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa';
import './Breadcrumb.css';

import bgImage from '../../assets/breadcrumb.webp';

// SVG Bee Component
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

// SVG Flower Component
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
    <circle cx="50" cy="50" r="12" fill="#FFC107" />
  </svg>
);

const Breadcrumb = () => {
  const parallaxRef = useRef(null);
  const beesRef = useRef([]);

  // Mouse parallax
  useEffect(() => {
    const element = parallaxRef.current;

    if (!element) return;

    let frameId = null;
    let mouseX = 0;
    let mouseY = 0;

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

    window.addEventListener('mousemove', handleMouseMove, {
      passive: true,
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);

      if (frameId) {
        cancelAnimationFrame(frameId);
      }

      gsap.killTweensOf(element);
    };
  }, []);

  // Flying bees
  useEffect(() => {
    const animations = [];

    beesRef.current.forEach((bee, index) => {
      if (!bee) return;

      const animation = gsap.to(bee, {
        x: `random(-35,35,5)`,
        y: `random(-25,25,5)`,
        rotation: `random(-12,12)`,
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
      {/* Optimized LCP background image */}
      <picture className="breadcrumb-bg-picture">
        <img
          src={bgImage}
          alt=""
          aria-hidden="true"
          className="breadcrumb-bg-image"
          width="1920"
          height="1080"
          fetchPriority="high"
          decoding="async"
        />
      </picture>

      {/* Dark overlay */}
      <div className="breadcrumb-overlay" />

      {/* Fog */}
      <div className="breadcrumb-fog fog-1" />
      <div className="breadcrumb-fog fog-2" />
      <div className="breadcrumb-fog fog-3" />

      {/* Main wrapper */}
      <div
        className="breadcrumb-parallax"
        ref={parallaxRef}
      >
        {/* Floating particles */}
        <div
          className="breadcrumb-particles"
          aria-hidden="true"
        >
          {Array.from({ length: 20 }).map((_, index) => (
            <span
              key={index}
              className="breadcrumb-particle"
              style={{
                left: `${(index * 17) % 100}%`,
                animationDelay: `${(index % 8) * 0.8}s`,
                animationDuration: `${6 + (index % 5)}s`,
              }}
            />
          ))}
        </div>

        {/* Floating leaves */}
        <div
          className="breadcrumb-leaves"
          aria-hidden="true"
        >
          {Array.from({ length: 6 }).map((_, index) => (
            <span
              key={index}
              className="breadcrumb-leaf"
              style={{
                left: `${(index * 19) % 100}%`,
                animationDelay: `${(index % 5) * 1.2}s`,
                animationDuration: `${9 + (index % 4)}s`,
              }}
            />
          ))}
        </div>

        {/* Bees */}
        <div
          className="breadcrumb-bee bee-1"
          ref={(el) => {
            beesRef.current[0] = el;
          }}
        >
          <BeeSVG />
        </div>

        <div
          className="breadcrumb-bee bee-2"
          ref={(el) => {
            beesRef.current[1] = el;
          }}
        >
          <BeeSVG />
        </div>

        <div
          className="breadcrumb-bee bee-3"
          ref={(el) => {
            beesRef.current[2] = el;
          }}
        >
          <BeeSVG />
        </div>

        <div
          className="breadcrumb-bee bee-4"
          ref={(el) => {
            beesRef.current[3] = el;
          }}
        >
          <BeeSVG />
        </div>

        {/* Center content */}
        <div className="breadcrumb-content">
          {/* Honey drops */}
          <div
            className="breadcrumb-honey-drops"
            aria-hidden="true"
          >
            <span className="breadcrumb-drop drop-1" />
            <span className="breadcrumb-drop drop-2" />
            <span className="breadcrumb-drop drop-3" />
          </div>

          {/* Breadcrumb navigation */}
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

        {/* Flowers */}
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

        {/* Honeycomb */}
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