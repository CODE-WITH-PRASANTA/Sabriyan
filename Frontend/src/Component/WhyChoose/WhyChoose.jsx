import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import {
  FaLeaf,
  FaShieldAlt,
  FaGlobeAmericas,
} from 'react-icons/fa';
import { GiHoneyJar } from 'react-icons/gi';
import './WhyChoose.css';

import bgImage from '../../assets/honey-6.webp';
import honeyBottleImg from '../../assets/honey-2.webp';

/* =========================================
   BEE SVG
========================================= */

const BeeSVG = () => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    className="whyChoose-bee-svg"
    aria-hidden="true"
  >
    <g className="whyChoose-bee-wings">
      <ellipse
        cx="24"
        cy="18"
        rx="14"
        ry="7"
        fill="rgba(255,255,255,0.85)"
        transform="rotate(-35 24 18)"
      />

      <ellipse
        cx="40"
        cy="18"
        rx="14"
        ry="7"
        fill="rgba(255,255,255,0.85)"
        transform="rotate(35 40 18)"
      />
    </g>

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

/* =========================================
   BENEFIT DATA
========================================= */

const benefitCards = [
  {
    id: 1,
    title: '100% Natural',
    description:
      'Pure honey, directly from nature no additives, no preservatives.',
    icon: <FaLeaf aria-hidden="true" />,
    position: 'left-top',
  },
  {
    id: 2,
    title: 'Ethically Sourced',
    description:
      'Our honey is harvested with care, ensuring the well-being of bees and nature.',
    icon: <GiHoneyJar aria-hidden="true" />,
    position: 'left-bottom',
  },
  {
    id: 3,
    title: 'Rich in Nutrients',
    description:
      'Packed with antioxidants, vitamins and minerals for a healthier you.',
    icon: <FaShieldAlt aria-hidden="true" />,
    position: 'right-top',
  },
  {
    id: 4,
    title: 'Sustainable Practices',
    description:
      'We follow eco-friendly and sustainable methods to protect our environment.',
    icon: <FaGlobeAmericas aria-hidden="true" />,
    position: 'right-bottom',
  },
];

/* =========================================
   WHY CHOOSE
========================================= */

const WhyChoose = () => {
  const parallaxRef = useRef(null);
  const beesRef = useRef([]);

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

  /* =========================================
     BEE ANIMATIONS
  ========================================= */

  useEffect(() => {
    const animations = [];

    beesRef.current.forEach((bee, index) => {
      if (!bee) return;

      const animation = gsap.to(bee, {
        x: `random(-50,50,10)`,
        y: `random(-35,35,5)`,
        rotation: `random(-15,15)`,
        duration: 4 + index * 0.7,
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

  /* =========================================
     RENDER
  ========================================= */

  return (
    <section
      className="whyChoose"
      aria-labelledby="whyChooseTitle"
    >
      {/* =====================================
          LAZY BACKGROUND IMAGE
      ===================================== */}

      <img
        src={bgImage}
        alt=""
        aria-hidden="true"
        className="whyChoose-bgImage"
        width="1600"
        height="900"
        loading="lazy"
        decoding="async"
      />

      {/* Dark Overlay */}
      <div
        className="whyChoose-overlay"
        aria-hidden="true"
      />

      {/* Floating Fog */}
      <div
        className="whyChoose-fog fog-1"
        aria-hidden="true"
      />

      <div
        className="whyChoose-fog fog-2"
        aria-hidden="true"
      />

      <div
        className="whyChoose-fog fog-3"
        aria-hidden="true"
      />

      {/* Sun Rays */}
      <div
        className="whyChoose-sunRays"
        aria-hidden="true"
      />

      {/* Main Parallax */}
      <div
        className="whyChoose-parallax"
        ref={parallaxRef}
      >
        {/* ===================================
            LIGHT PARTICLES
        =================================== */}

        <div
          className="whyChoose-particles"
          aria-hidden="true"
        >
          {Array.from({ length: 18 }).map((_, index) => (
            <span
              key={index}
              className="whyChoose-particle"
              style={{
                left: `${(index * 19) % 100}%`,
                animationDelay: `${(index % 7) * 0.8}s`,
                animationDuration: `${6 + (index % 5)}s`,
              }}
            />
          ))}
        </div>

        {/* ===================================
            FLOATING LEAVES
        =================================== */}

        <div
          className="whyChoose-leaves"
          aria-hidden="true"
        >
          {Array.from({ length: 6 }).map((_, index) => (
            <span
              key={index}
              className="whyChoose-leaf"
              style={{
                left: `${(index * 21) % 100}%`,
                animationDelay: `${(index % 5) * 1.2}s`,
                animationDuration: `${9 + (index % 4)}s`,
              }}
            />
          ))}
        </div>

        {/* ===================================
            FLYING BEES
        =================================== */}

        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className={`whyChoose-bee bee-${index + 1}`}
            ref={(element) => {
              beesRef.current[index] = element;
            }}
          >
            <BeeSVG />
          </div>
        ))}

        {/* ===================================
            HEADER
        =================================== */}

        <div className="whyChoose-header">
          <div className="whyChoose-badge">
            <span>Why Choose Sabriyana?</span>
          </div>

          <h2
            id="whyChooseTitle"
            className="whyChoose-title"
          >
            Nature's Goodness,{' '}
            <span className="title-highlight">
              Our Promise
            </span>
          </h2>
        </div>

        {/* ===================================
            MAIN GRID
        =================================== */}

        <div className="whyChoose-container">
          {/* LEFT CARDS */}

          <div className="whyChoose-col left-col">
            {benefitCards
              .filter((card) =>
                card.position.startsWith('left')
              )
              .map((card) => (
                <article
                  key={card.id}
                  className="whyChoose-card"
                >
                  <div className="whyChoose-iconWrapper">
                    {card.icon}
                  </div>

                  <div className="whyChoose-cardBody">
                    <h3 className="whyChoose-cardTitle">
                      {card.title}
                    </h3>

                    <p className="whyChoose-cardDesc">
                      {card.description}
                    </p>
                  </div>
                </article>
              ))}
          </div>

          {/* ===================================
              CENTER BOTTLE
          =================================== */}

          <div className="whyChoose-centerStage">
            <div className="whyChoose-bottleWrapper">
              <img
                src={honeyBottleImg}
                alt="Sabriyana Pure Honey Bottle"
                className="whyChoose-bottleImg"
                width="400"
                height="600"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>

          {/* RIGHT CARDS */}

          <div className="whyChoose-col right-col">
            {benefitCards
              .filter((card) =>
                card.position.startsWith('right')
              )
              .map((card) => (
                <article
                  key={card.id}
                  className="whyChoose-card"
                >
                  <div className="whyChoose-iconWrapper">
                    {card.icon}
                  </div>

                  <div className="whyChoose-cardBody">
                    <h3 className="whyChoose-cardTitle">
                      {card.title}
                    </h3>

                    <p className="whyChoose-cardDesc">
                      {card.description}
                    </p>
                  </div>
                </article>
              ))}
          </div>
        </div>

        {/* ===================================
            HONEY DRIPS
        =================================== */}

        <div
          className="whyChoose-dripsContainer"
          aria-hidden="true"
        >
          <span className="whyChoose-drip drip-1" />
          <span className="whyChoose-drip drip-2" />
          <span className="whyChoose-drip drip-3" />
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;