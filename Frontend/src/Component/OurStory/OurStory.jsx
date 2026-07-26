import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { FaArrowRight } from 'react-icons/fa';
import './OurStory.css';

// ONLY BACKGROUND IMAGE IS IMPORTED
import bgImage from '../../assets/story-bg.png';

gsap.registerPlugin(ScrollTrigger);

const OurStory = () => {
  const containerRef = useRef(null);
  const parallaxRef = useRef(null);

  // Mouse Parallax Effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const moveX = (clientX - window.innerWidth / 2) * 0.015;
      const moveY = (clientY - window.innerHeight / 2) * 0.015;

      gsap.to(parallaxRef.current, {
        x: moveX,
        y: moveY,
        ease: 'power2.out',
        duration: 1
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section 
      className="aboutHero" 
      ref={containerRef}
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Dark Forest Overlay */}
      <div className="aboutOverlay"></div>

      {/* Ambient Forest Fog */}
      <div className="aboutHero-fog fog-left"></div>
      <div className="aboutHero-fog fog-right"></div>

      {/* Parallax Wrapper */}
      <div className="aboutHero-parallax" ref={parallaxRef}>
        
        {/* Golden Particles */}
        <div className="aboutHero-particles">
          {Array.from({ length: 40 }).map((_, i) => (
            <span 
              key={i} 
              className="aboutHero-particle" 
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${5 + Math.random() * 6}s`
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
                animationDuration: `${8 + Math.random() * 10}s`
              }}
            ></span>
          ))}
        </div>

        {/* Two Column Layout */}
        <div className="aboutHero-container">
          
          {/* Left Column (60%): Text Content */}
          <div className="aboutHero-content">
            
            {/* Top Subtitle */}
            <motion.div 
              className="aboutHero-tagline"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span>ABOUT SABRIYANA</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1 
              className="aboutHero-title"
              initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Our Story
            </motion.h1>

            {/* Sub-headline */}
            <motion.p 
              className="aboutHero-motto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Rooted in Nature, Made with Pure Love
            </motion.p>

            {/* Story Paragraph */}
            <motion.div 
              className="aboutHero-description"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <p>
                Sabriyana was born from a passion for purity and a deep respect for nature. 
                Our honey is harvested from the lush green forests, where bees thrive on 
                wildflowers and biodiversity. Every drop is a promise of natural goodness 
                and sustainable beekeeping.
              </p>
            </motion.div>

            {/* Wooden & Gold CTA Button */}
            <motion.button 
              className="aboutHero-btn"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Discover Our Journey</span>
              <FaArrowRight className="btn-arrow" />
            </motion.button>

          </div>

          {/* Right Column (40%): Visual Stage */}
          <div className="aboutHero-visual">
            <div className="aboutHero-jarWrapper">
              {/* Pure background composition */}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default OurStory;