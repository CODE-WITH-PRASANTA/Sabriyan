import React from "react";
import { motion } from "framer-motion";
import {
  LuPlay,
  LuLeaf,
  LuShieldCheck,
  LuSparkles,
  LuDroplet,
  LuChevronDown,
} from "react-icons/lu";
import "./HoneySection.css";

// Local Image Assets
import BotanicalBg from "../../assets/honey.png";
import GlassHoneyBottle from "../../assets/honey-2.png";

const HoneySection = () => {
  // Stagger animation container
  const containerVariants = {
    hidden: {
      opacity: 0,
    },

    visible: {
      opacity: 1,

      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  // Fade animation
  const fadeInUp = {
    hidden: {
      opacity: 0,
      y: 30,
    },

    visible: {
      opacity: 1,
      y: 0,

      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      className="HoneySection"
      aria-labelledby="sabriyana-honey-title"
    >
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div
        className="HoneySection-bgImage"
        style={{
          backgroundImage: `url(${BotanicalBg})`,
        }}
      />

      <div className="HoneySection-overlay" />

      <div className="HoneySection-sunGlow" />

      <div className="HoneySection-sunRays" />

      <div className="HoneySection-honeyDrip" />

      {/* =====================================================
          ANIMATED BEES
      ===================================================== */}

      <div className="HoneySection-bee HoneySection-bee1">
        🐝
      </div>

      <div className="HoneySection-bee HoneySection-bee2">
        🐝
      </div>

      <div className="HoneySection-bee HoneySection-bee3">
        🐝
      </div>

      {/* =====================================================
          HERO CONTENT
      ===================================================== */}

      <div className="HoneySection-heroContent">

        {/* ===================================================
            LEFT CONTENT
        =================================================== */}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="HoneySection-leftCol"
        >

          {/* Brand Tagline */}

          <motion.span
            variants={fadeInUp}
            className="HoneySection-tagline"
          >
            🐝 NATURE'S GOLDEN TREASURE
          </motion.span>

          {/* Brand Name */}

          <motion.h1
            variants={fadeInUp}
            className="HoneySection-mainTitle"
            id="sabriyana-honey-title"
          >
            SABRIYANA
          </motion.h1>

          {/* Honey Heading */}

          <motion.h2
            variants={fadeInUp}
            className="HoneySection-scriptTitle"
          >
            Pure Honey From Nature
          </motion.h2>

          {/* SEO-Friendly Main Description */}

          <motion.p
            variants={fadeInUp}
            className="HoneySection-description"
          >
            Discover{" "}
            <strong>
              Sabriyana pure honey
            </strong>
            , thoughtfully sourced and bottled to bring
            the natural sweetness of honey from nature to
            your home.

            <br />

            Sabriyana is a growing{" "}
            <strong>
              premium honey brand in Odisha
            </strong>
            , created for people who appreciate authentic
            taste, natural goodness and quality honey.
          </motion.p>

          {/* =================================================
              SEO SUPPORTING TEXT
          ================================================= */}

          <motion.p
            variants={fadeInUp}
            className="HoneySection-seoText"
          >
            As a{" "}
            <strong>
              pure honey brand in Odisha
            </strong>
            , Sabriyana focuses on bringing you honey
            that feels simple, honest and naturally
            delicious. Our goal is to make{" "}
            <strong>
              Sabriyana honey
            </strong>{" "}
            a trusted choice for families looking for
            premium-quality honey in Odisha.
          </motion.p>

          {/* =================================================
              CTA BUTTONS
          ================================================= */}

          <motion.div
            variants={fadeInUp}
            className="HoneySection-ctaGroup"
          >

            <button className="HoneySection-primaryBtn">
              <span>🐝</span>

              <span>
                EXPLORE SABRIYANA HONEY
              </span>
            </button>

            <button className="HoneySection-secondaryBtn">
              <LuPlay className="HoneySection-playIcon" />

              <span>
                WATCH OUR STORY
              </span>
            </button>

          </motion.div>

          {/* =================================================
              FEATURE GRID
          ================================================= */}

          <motion.div
            variants={fadeInUp}
            className="HoneySection-featuresGrid"
          >

            {/* Natural */}

            <div className="HoneySection-featureCard">

              <LuLeaf
                className="HoneySection-featureIcon"
              />

              <span className="HoneySection-featureTitle">
                NATURAL
                <br />
                GOODNESS
              </span>

            </div>

            {/* Carefully Sourced */}

            <div className="HoneySection-featureCard">

              <LuShieldCheck
                className="HoneySection-featureIcon"
              />

              <span className="HoneySection-featureTitle">
                CAREFULLY
                <br />
                SOURCED
              </span>

            </div>

            {/* Rich Taste */}

            <div className="HoneySection-featureCard">

              <LuSparkles
                className="HoneySection-featureIcon"
              />

              <span className="HoneySection-featureTitle">
                RICH
                <br />
                NATURAL TASTE
              </span>

            </div>

            {/* Pure Honey */}

            <div className="HoneySection-featureCard">

              <LuDroplet
                className="HoneySection-featureIcon"
              />

              <span className="HoneySection-featureTitle">
                PURE
                <br />
                HONEY
              </span>

            </div>

          </motion.div>

        </motion.div>

        {/* ===================================================
            CENTER PRODUCT
        =================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.8,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 1,
            delay: 0.3,
          }}
          className="HoneySection-centerCol"
        >

          <div className="HoneySection-bottleContainer">

            {/* Animated Honey Dipper */}

            <div className="HoneySection-dipper" />

            {/* Product */}

            <motion.img
              animate={{
                y: [0, -12, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut",
              }}
              src={GlassHoneyBottle}
              alt="Sabriyana Pure Honey - premium honey brand in Odisha"
              className="HoneySection-bottleImg"
            />

          </div>

        </motion.div>

        {/* ===================================================
            RIGHT JOURNEY WIDGET
        =================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            x: 40,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.8,
            delay: 0.6,
          }}
          className="HoneySection-rightCol"
        >

          <div className="HoneySection-journeyWidget">

            <button
              className="HoneySection-circlePlayBtn"
              aria-label="Watch the Sabriyana honey story"
            >
              <LuPlay />
            </button>

            <span className="HoneySection-journeyText">
              DISCOVER
              <br />
              SABRIYANA HONEY
            </span>

          </div>

        </motion.div>

      </div>

      {/* =====================================================
          SEO BRAND STATEMENT
      ===================================================== */}

      <motion.div
        className="HoneySection-bottomContent"
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
          duration: 0.8,
        }}
      >

        <p>
          Looking for a{" "}
          <strong>
            premium honey brand in Odisha
          </strong>
          ? Sabriyana brings together nature, careful
          sourcing and a genuine love for quality honey.
          From everyday use to thoughtful gifting,
          <strong>
            {" "}Sabriyana honey
          </strong>{" "}
          is made to bring a naturally sweet experience
          to every home.
        </p>

      </motion.div>

      {/* =====================================================
          SCROLL INDICATOR
      ===================================================== */}

      <motion.div
        animate={{
          y: [0, 8, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 1.8,
        }}
        className="HoneySection-scrollIndicator"
      >

        <div className="HoneySection-mouseOutline">
          <div className="HoneySection-mouseDot" />
        </div>

        <span className="HoneySection-scrollText">
          SCROLL TO EXPLORE
        </span>

        <LuChevronDown
          className="HoneySection-scrollArrow"
        />

      </motion.div>

    </section>
  );
};

export default HoneySection;