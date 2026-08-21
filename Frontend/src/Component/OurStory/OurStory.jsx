import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FaArrowRight } from 'react-icons/fa';
import './OurStory.css';

import bgImage from '../../assets/story-bg.webp';

const OurStory = () => {
  const parallaxRef = useRef(null);

  /* =========================================
     OPTIMIZED MOUSE PARALLAX
  ========================================= */

  useEffect(() => {
    const element = parallaxRef.current;

    if (!element) return;

    let frameId = null;
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    const updateParallax = () => {
      frameId = null;

      const moveX =
        (mouseX - window.innerWidth / 2) * 0.005;

      const moveY =
        (mouseY - window.innerHeight / 2) * 0.005;

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

  return (
    <section
      className="aboutHero"
      aria-labelledby="ourStoryTitle"
    >
      {/* =====================================
          LAZY BACKGROUND IMAGE
      ===================================== */}

      <img
        src={bgImage}
        alt=""
        aria-hidden="true"
        className="aboutHero-bgImage"
        width="1600"
        height="900"
        loading="lazy"
        decoding="async"
      />

      {/* Dark Forest Overlay */}
      <div
        className="aboutOverlay"
        aria-hidden="true"
      />

      {/* Ambient Forest Fog */}
      <div
        className="aboutHero-fog fog-left"
        aria-hidden="true"
      />

      <div
        className="aboutHero-fog fog-right"
        aria-hidden="true"
      />

      {/* =====================================
          PARALLAX WRAPPER
      ===================================== */}

      <div
        className="aboutHero-parallax"
        ref={parallaxRef}
      >
        {/* Golden Particles */}
        <div
          className="aboutHero-particles"
          aria-hidden="true"
        >
          {Array.from({ length: 18 }).map(
            (_, index) => (
              <span
                key={index}
                className="aboutHero-particle"
                style={{
                  left: `${(index * 19) % 100}%`,
                  animationDelay: `${(index % 8) * 0.8}s`,
                  animationDuration: `${6 + (index % 5)}s`,
                }}
              />
            )
          )}
        </div>

        {/* Floating Leaves */}
        <div
          className="aboutHero-leaves"
          aria-hidden="true"
        >
          {Array.from({ length: 6 }).map(
            (_, index) => (
              <span
                key={index}
                className="aboutHero-leaf"
                style={{
                  left: `${(index * 21) % 100}%`,
                  animationDelay: `${(index % 5) * 1.2}s`,
                  animationDuration: `${9 + (index % 4)}s`,
                }}
              />
            )
          )}
        </div>

        {/* =====================================
            TWO COLUMN LAYOUT
        ===================================== */}

        <div className="aboutHero-container">

          {/* LEFT CONTENT */}
          <div className="aboutHero-content">

            <div className="aboutHero-tagline">
              <span>ABOUT SABRIYANA</span>
            </div>

            <h2
              id="ourStoryTitle"
              className="aboutHero-title"
            >
              Our Story
            </h2>

            <p className="aboutHero-motto">
              Rooted in Nature, Made with Pure Love
            </p>

            <div className="aboutHero-description">
              <p>
                Sabriyana was born from a passion for
                purity and a deep respect for nature.
                Our honey is harvested from the lush
                green forests, where bees thrive on
                wildflowers and biodiversity. Every drop
                is a promise of natural goodness and
                sustainable beekeeping.
              </p>
            </div>

            <button
              type="button"
              className="aboutHero-btn"
            >
              <span>Discover Our Journey</span>

              <FaArrowRight
                className="btn-arrow"
                aria-hidden="true"
              />
            </button>
          </div>

          {/* RIGHT VISUAL */}
          <div className="aboutHero-visual">
            <div className="aboutHero-jarWrapper">
              {/* Pure CSS visual composition */}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default OurStory;