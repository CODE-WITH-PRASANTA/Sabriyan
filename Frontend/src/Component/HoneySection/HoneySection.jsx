import React from 'react';
import { motion } from 'framer-motion';
import { 
  LuPlay, 
  LuLeaf, 
  LuShieldCheck, 
  LuZap, 
  LuDroplet, 
  LuChevronDown 
} from 'react-icons/lu';
import './HoneySection.css';

// 🌅 IMPORT LOCAL IMAGE ASSETS
import BotanicalBg from '../../assets/honey.png';
import GlassHoneyBottle from '../../assets/honey-2.png';

const HoneySection = () => {
  // Stagger animation container variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  return (
    <section className="HoneySection">
      {/* Background Image Layer with Botanical Texture */}
      <div 
        className="HoneySection-bgImage" 
        style={{ backgroundImage: `url(${BotanicalBg})` }} 
      />
      <div className="HoneySection-overlay" />
      <div className="HoneySection-sunGlow" />
      <div className="HoneySection-sunRays" />
      <div className="HoneySection-honeyDrip" />

      {/* Bees (Animated via CSS keyframes) */}
      <div className="HoneySection-bee HoneySection-bee1">🐝</div>
      <div className="HoneySection-bee HoneySection-bee2">🐝</div>
      <div className="HoneySection-bee HoneySection-bee3">🐝</div>

      {/* Hero Content Area */}
      <div className="HoneySection-heroContent">
        {/* Left Column: Copywriting & Feature Badges */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="HoneySection-leftCol"
        >
          <motion.span variants={fadeInUp} className="HoneySection-tagline">
            🐝 NATURE'S GOLDEN TREASURE
          </motion.span>
          <motion.h1 variants={fadeInUp} className="HoneySection-mainTitle">
            SABRIYANA
          </motion.h1>
          <motion.h2 variants={fadeInUp} className="HoneySection-scriptTitle">
            Pure Honey From Nature
          </motion.h2>
          <motion.p variants={fadeInUp} className="HoneySection-description">
            From the deepest forests to your home,<br />
            pure, natural and full of goodness.
          </motion.p>
          <motion.div variants={fadeInUp} className="HoneySection-ctaGroup">
            <button className="HoneySection-primaryBtn">
              <span>🐝</span> EXPLORE HONEY
            </button>
            <button className="HoneySection-secondaryBtn">
              <LuPlay className="HoneySection-playIcon" />
              <span>WATCH OUR STORY</span>
            </button>
          </motion.div>
          
          {/* Feature Badge Grid */}
          <motion.div variants={fadeInUp} className="HoneySection-featuresGrid">
            <div className="HoneySection-featureCard">
              <LuLeaf className="HoneySection-featureIcon" />
              <span className="HoneySection-featureTitle">100%<br />NATURAL</span>
            </div>
            <div className="HoneySection-featureCard">
              <LuShieldCheck className="HoneySection-featureIcon" />
              <span className="HoneySection-featureTitle">BOOSTS<br />IMMUNITY</span>
            </div>
            <div className="HoneySection-featureCard">
              <LuZap className="HoneySection-featureIcon" />
              <span className="HoneySection-featureTitle">RICH IN<br />ENERGY</span>
            </div>
            <div className="HoneySection-featureCard">
              <LuDroplet className="HoneySection-featureIcon" />
              <span className="HoneySection-featureTitle">PURE &<br />UNFILTERED</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Center Column: 🍯 Premium Glass Honey Bottle */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="HoneySection-centerCol"
        >
          <div className="HoneySection-bottleContainer">
            {/* Animated Dipper overlay */}
            <div className="HoneySection-dipper" />

            {/* Imported Glass Honey Bottle Asset */}
            <motion.img 
              animate={{ y: [0, -12, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              src={GlassHoneyBottle}
              alt="Premium Sabriyana Glass Honey Bottle" 
              className="HoneySection-bottleImg"
            />
          </div>
        </motion.div>

        {/* Right Column: Discover Journey Widget */}
        <motion.div 
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="HoneySection-rightCol"
        >
          <div className="HoneySection-journeyWidget">
            <button className="HoneySection-circlePlayBtn" aria-label="Play Story">
              <LuPlay />
            </button>
            <span className="HoneySection-journeyText">
              DISCOVER<br />THE JOURNEY
            </span>
          </div>
        </motion.div>
      </div>

      {/* Bottom Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.8 }}
        className="HoneySection-scrollIndicator"
      >
        <div className="HoneySection-mouseOutline">
          <div className="HoneySection-mouseDot" />
        </div>
        <span className="HoneySection-scrollText">SCROLL TO EXPLORE</span>
        <LuChevronDown className="HoneySection-scrollArrow" />
      </motion.div>
    </section>
  );
};

export default HoneySection;