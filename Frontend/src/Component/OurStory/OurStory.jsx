import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { FaArrowRight } from "react-icons/fa";
import "./OurStory.css";

import bgImage from "../../assets/story-bg.webp";

gsap.registerPlugin(ScrollTrigger);

const OurStory = () => {
  const parallaxRef = useRef(null);

  // Mouse Parallax Effect
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
        ease: "power2.out",
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

    window.addEventListener("mousemove", handleMouseMove, {
      passive: true,
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);

      if (frameId) {
        cancelAnimationFrame(frameId);
      }

      gsap.killTweensOf(element);
    };
  }, []);

  return (
    <section
      className="aboutHero"
      aria-labelledby="savriyana-story-title"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      {/* Background Image */}
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

      {/* Dark Overlay */}
      <div
        className="aboutOverlay"
        aria-hidden="true"
      />

      {/* Ambient Fog */}
      <div
        className="aboutHero-fog fog-left"
        aria-hidden="true"
      />

      <div
        className="aboutHero-fog fog-right"
        aria-hidden="true"
      />

      {/* Parallax Wrapper */}
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
                  animationDelay: `${
                    (index % 8) * 0.8
                  }s`,
                  animationDuration: `${
                    6 + (index % 5)
                  }s`,
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
                  animationDelay: `${
                    (index % 5) * 1.2
                  }s`,
                  animationDuration: `${
                    9 + (index % 4)
                  }s`,
                }}
              />
            )
          )}
        </div>

        {/* Two Column Layout */}
        <div className="aboutHero-container">
          {/* LEFT CONTENT */}
          <div className="aboutHero-content">
            {/* Tagline */}
            <motion.div
              className="aboutHero-tagline"
              initial={{
                opacity: 0,
                x: -30,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.6,
              }}
            >
              <span>ABOUT SAVRIYANA</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              id="savriyana-story-title"
              className="aboutHero-title"
              initial={{
                opacity: 0,
                y: 30,
                filter: "blur(8px)",
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.8,
                delay: 0.2,
              }}
            >
              Our Story
            </motion.h1>

            {/* Brand Motto */}
            <motion.p
              className="aboutHero-motto"
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.6,
                delay: 0.3,
              }}
            >
              From Nature, Crafted with Passion
            </motion.p>

            {/* Story Description */}
            <motion.div
              className="aboutHero-description"
              initial={{
                opacity: 0,
                y: 25,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.8,
                delay: 0.4,
              }}
            >
              <p>
                Savriyana is a premium chocolate brand
                from Odisha, created from a simple belief
                — great chocolate begins with thoughtful
                ingredients and genuine craftsmanship. We
                carefully bring together rich cocoa,
                traditional Indian flavours and modern
                chocolate-making to create a distinctive
                experience for chocolate lovers.
              </p>

              <p>
                Our journey is inspired by nature,
                heritage and the joy of sharing something
                truly special. Every Savriyana chocolate
                is made with attention to flavour, texture
                and detail, reflecting our ambition to
                become one of the most loved chocolate
                brands from Odisha.
              </p>

              <p>
                From our ingredients to the finished bar,
                we believe premium chocolate should feel
                authentic, indulgent and memorable. That
                is what makes Savriyana more than just
                chocolate — it is our expression of
                quality, craftsmanship and Indian
                heritage.
              </p>
            </motion.div>

            {/* SEO Supporting Text */}
            <motion.div
              className="aboutHero-seoText"
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.6,
                delay: 0.5,
              }}
            >
              <p>
                Discover Savriyana, a{" "}
                <strong>
                  premium chocolate brand in Odisha
                </strong>{" "}
                focused on quality, authentic flavour and
                thoughtfully crafted chocolate.
              </p>
            </motion.div>

            {/* CTA Button */}
            <motion.button
              className="aboutHero-btn"
              type="button"
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.6,
                delay: 0.6,
              }}
              whileHover={{
                scale: 1.08,
              }}
              whileTap={{
                scale: 0.95,
              }}
            >
              <span>Discover Our Journey</span>

              <FaArrowRight
                className="btn-arrow"
                aria-hidden="true"
              />
            </motion.button>
          </div>

          {/* RIGHT VISUAL */}
          <div className="aboutHero-visual">
            <div className="aboutHero-jarWrapper">
              {/* Visual composition can be styled using CSS */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;