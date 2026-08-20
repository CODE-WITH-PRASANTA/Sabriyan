import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { FaArrowRight } from "react-icons/fa";
import "./OurStory.css";

// Background Image
import bgImage from "../../assets/story-bg.png";

gsap.registerPlugin(ScrollTrigger);

const OurStory = () => {
  const containerRef = useRef(null);
  const parallaxRef = useRef(null);

  // Mouse Parallax Effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;

      const moveX =
        (clientX - window.innerWidth / 2) * 0.015;

      const moveY =
        (clientY - window.innerHeight / 2) * 0.015;

      gsap.to(parallaxRef.current, {
        x: moveX,
        y: moveY,
        ease: "power2.out",
        duration: 1,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () =>
      window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      className="aboutHero"
      ref={containerRef}
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
      aria-labelledby="savriyana-story-title"
    >
      {/* Dark Forest Overlay */}
      <div className="aboutOverlay"></div>

      {/* Ambient Forest Fog */}
      <div className="aboutHero-fog fog-left"></div>
      <div className="aboutHero-fog fog-right"></div>

      {/* Parallax Wrapper */}
      <div
        className="aboutHero-parallax"
        ref={parallaxRef}
      >

        {/* Golden Particles */}
        <div className="aboutHero-particles">
          {Array.from({ length: 40 }).map((_, i) => (
            <span
              key={i}
              className="aboutHero-particle"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${
                  5 + Math.random() * 6
                }s`,
              }}
            ></span>
          ))}
        </div>

        {/* Floating Leaves */}
        <div className="aboutHero-leaves">
          {Array.from({ length: 12 }).map((_, i) => (
            <span
              key={i}
              className="aboutHero-leaf"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${
                  8 + Math.random() * 10
                }s`,
              }}
            ></span>
          ))}
        </div>

        {/* Two Column Layout */}
        <div className="aboutHero-container">

          {/* ================= LEFT CONTENT ================= */}
          <div className="aboutHero-content">

            {/* Subtitle */}
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
              <span>
                ABOUT SAVRIYANA
              </span>
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

            {/* SEO-Friendly Story */}
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
                Savriyana is a premium chocolate brand from
                Odisha, created from a simple belief — great
                chocolate begins with thoughtful ingredients
                and genuine craftsmanship. We carefully bring
                together rich cocoa, traditional Indian
                flavours and modern chocolate-making to create
                a distinctive experience for chocolate lovers.
              </p>

              <p>
                Our journey is inspired by nature, heritage and
                the joy of sharing something truly special.
                Every Savriyana chocolate is made with attention
                to flavour, texture and detail, reflecting our
                ambition to become one of the most loved
                chocolate brands from Odisha.
              </p>

              <p>
                From our ingredients to the finished bar, we
                believe premium chocolate should feel authentic,
                indulgent and memorable. That is what makes
                Savriyana more than just chocolate — it is our
                expression of quality, craftsmanship and Indian
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
              type="button"
            >
              <span>
                Discover Our Journey
              </span>

              <FaArrowRight className="btn-arrow" />
            </motion.button>

          </div>

          {/* ================= RIGHT VISUAL ================= */}
          <div className="aboutHero-visual">

            <div className="aboutHero-jarWrapper">
              {/* Background composition */}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default OurStory;