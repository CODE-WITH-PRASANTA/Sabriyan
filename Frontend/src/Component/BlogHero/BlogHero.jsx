import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { 
  FiCalendar, 
  FiEye, 
  FiClock, 
  FiUser, 
  FiArrowRight, 
  FiChevronDown 
} from 'react-icons/fi';
import { GiOakLeaf, GiSprout } from 'react-icons/gi';

// Importing local background image as requested
import bgForest from '../../assets/blog-bg.jpeg';

import './BlogHero.css';

// Pre-defined random coordinates for floating elements
const FLOATING_LEAVES = Array.from({ length: 15 }).map((_, i) => ({
  id: i,
  size: Math.floor(Math.random() * 20) + 16,
  left: `${Math.floor(Math.random() * 95)}%`,
  top: `${Math.floor(Math.random() * 90)}%`,
  duration: Math.floor(Math.random() * 6) + 6,
  delay: Math.random() * 3,
  rotate: Math.floor(Math.random() * 360),
}));

const PARTICLES = Array.from({ length: 18 }).map((_, i) => ({
  id: i,
  size: Math.floor(Math.random() * 5) + 3,
  left: `${Math.floor(Math.random() * 95)}%`,
  top: `${Math.floor(Math.random() * 90)}%`,
  duration: Math.floor(Math.random() * 5) + 4,
  delay: Math.random() * 2,
}));

const BlogHero = () => {
  // Cursor tracking for lighting & mouse parallax
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [normMouse, setNormMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      setNormMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Scroll animations
  const { scrollY } = useScroll();
  const imageScale = useTransform(scrollY, [0, 400], [1, 0.9]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const bgParallax = useTransform(scrollY, [0, 500], [0, 120]);

  // Mouse Parallax Springs
  const leafX = useSpring(normMouse.x * 10, { stiffness: 40, damping: 20 });
  const leafY = useSpring(normMouse.y * 10, { stiffness: 40, damping: 20 });
  const particleX = useSpring(normMouse.x * 15, { stiffness: 30, damping: 20 });
  const particleY = useSpring(normMouse.y * 15, { stiffness: 30, damping: 20 });
  const imgX = useSpring(normMouse.x * 5, { stiffness: 50, damping: 20 });
  const imgY = useSpring(normMouse.y * 5, { stiffness: 50, damping: 20 });

  // Timeline Stagger Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  };

  const bgVariants = {
    hidden: { scale: 1.1, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 1.2, ease: 'easeOut' } },
  };

  const imgVariants = {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  const titleVariants = {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const btnVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { type: 'spring', stiffness: 200, damping: 15 } 
    },
  };

  return (
    <motion.section 
      style={{ opacity: heroOpacity }}
      className="BlogHero"
    >
      {/* LAYER 1 & 2: Background Layers */}
      <motion.div 
        variants={bgVariants}
        initial="hidden"
        animate="visible"
        style={{ y: bgParallax }}
        className="BlogHero-bgWrapper"
      >
        <div className="BlogHero-gradientBase" />
        <img 
          src={bgForest} 
          alt="Forest Background" 
          className="BlogHero-bgImage"
        />
        <div className="BlogHero-lightRays" />
        <div className="BlogHero-glassOverlay" />
      </motion.div>

      {/* LIGHT EFFECT: Dynamic Cursor Glow */}
      <div 
        className="BlogHero-cursorGlow"
        style={{
          background: `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, rgba(121, 255, 75, 0.15), transparent 50%)`,
        }}
      />

      {/* LAYER 3: Floating Leaves */}
      <motion.div 
        style={{ x: leafX, y: leafY }}
        className="BlogHero-floatingLeavesLayer"
      >
        {FLOATING_LEAVES.map((leaf) => (
          <motion.div
            key={`leaf-${leaf.id}`}
            className="BlogHero-leafItem"
            style={{
              left: leaf.left,
              top: leaf.top,
              fontSize: `${leaf.size}px`,
            }}
            animate={{
              y: [0, -25, 0],
              rotate: [leaf.rotate, leaf.rotate + 180, leaf.rotate + 360],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: leaf.duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: leaf.delay,
            }}
          >
            <GiOakLeaf />
          </motion.div>
        ))}
      </motion.div>

      {/* LAYER 4: Particles */}
      <motion.div 
        style={{ x: particleX, y: particleY }}
        className="BlogHero-particlesLayer"
      >
        {PARTICLES.map((particle) => (
          <motion.div
            key={`particle-${particle.id}`}
            className="BlogHero-particleItem"
            style={{
              left: particle.left,
              top: particle.top,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
            animate={{
              y: [0, -35, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: particle.delay,
            }}
          />
        ))}
      </motion.div>

      {/* MAIN CONTAINER */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="BlogHero-container"
      >
        
        {/* LEFT SIDE: 3D Floating Image */}
        <motion.div 
          variants={imgVariants} 
          style={{ x: imgX, y: imgY, scale: imageScale }}
          className="BlogHero-leftContent"
        >
          <div className="BlogHero-imageWrapper">
            {/* Glow Behind Image */}
            <div className="BlogHero-imageGlowBack" />

            {/* Decorative Floating Elements */}
            <motion.div 
              animate={{ y: [0, -12, 0], rotate: [0, 8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="BlogHero-decorLeaf"
            >
              🌿
            </motion.div>
            <motion.div 
              animate={{ y: [0, 15, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="BlogHero-decorSparkle"
            >
              ✨
            </motion.div>

            {/* 3D Parallax Tilt Card */}
            <Tilt
              tiltMaxAngleX={10}
              tiltMaxAngleY={10}
              perspective={1000}
              transitionSpeed={800}
              scale={1.02}
              gyroscope={true}
              className="BlogHero-tiltCard"
            >
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="BlogHero-glassCardInner"
              >
                <div className="BlogHero-imageFrame">
                  <img 
                    src="https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80" 
                    alt="Blog Cover" 
                    className="BlogHero-cardImage"
                  />
                  <div className="BlogHero-cardReflection" />
                </div>
              </motion.div>
            </Tilt>
          </div>
        </motion.div>

        {/* RIGHT SIDE: Typography & CTA */}
        <div className="BlogHero-rightContent">
          
          {/* Category Badge */}
          <motion.div variants={fadeUpVariants}>
            <div className="BlogHero-categoryBadge">
              <GiSprout className="BlogHero-badgeIcon" />
              <span>Nature & Health</span>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.div variants={titleVariants}>
            <h1 className="BlogHero-heading">
              Healing Power <br />
              <span className="BlogHero-headingItalic">
                of Nature
              </span>
            </h1>
          </motion.div>

          {/* Description */}
          <motion.p 
            variants={fadeUpVariants}
            className="BlogHero-description"
          >
            Discover how forests, fresh air, and natural ingredients improve your health naturally.
          </motion.p>

          {/* Meta Data */}
          <motion.div 
            variants={fadeUpVariants}
            className="BlogHero-metaCard"
          >
            <div className="BlogHero-metaItem">
              <FiCalendar className="BlogHero-metaIcon" />
              <span>23 Jul 2026</span>
            </div>
            <div className="BlogHero-metaItem">
              <FiEye className="BlogHero-metaIcon" />
              <span>1.2K Views</span>
            </div>
            <div className="BlogHero-metaItem">
              <FiClock className="BlogHero-metaIcon" />
              <span>4 Min Read</span>
            </div>
            <div className="BlogHero-metaItem BlogHero-metaAuthor">
              <FiUser className="BlogHero-metaIcon" />
              <span>Sabriyana Team</span>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div variants={btnVariants} className="BlogHero-ctaWrapper">
            <button className="BlogHero-readButton">
              <span className="BlogHero-buttonRipple" />
              <span className="BlogHero-buttonText">Read Article</span>
              <FiArrowRight className="BlogHero-buttonIcon" />
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Down Indicator */}
      <motion.div 
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="BlogHero-scrollIndicator"
      >
        <span>Scroll Down</span>
        <FiChevronDown className="BlogHero-scrollIcon" />
      </motion.div>
    </motion.section>
  );
};

export default BlogHero;