import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { FaLeaf, FaShieldAlt, FaGlobeAmericas } from 'react-icons/fa';
import { GiHoneyJar } from 'react-icons/gi';
import './WhyChoose.css';

// ONLY BACKGROUND IMAGE IS IMPORTED
import bgImage from '../../assets/honey-6.png';
// IMPORT THE HONEY BOTTLE PRODUCT IMAGE
import honeyBottleImg from '../../assets/honey-2.png'; 

gsap.registerPlugin(ScrollTrigger);

// Animated SVG Bee Component
const BeeSVG = () => (
  <svg viewBox="0 0 64 64" fill="none" className="whyChoose-bee-svg">
    <g className="whyChoose-bee-wings">
      <ellipse cx="24" cy="18" rx="14" ry="7" fill="rgba(255, 255, 255, 0.85)" transform="rotate(-35 24 18)" />
      <ellipse cx="40" cy="18" rx="14" ry="7" fill="rgba(255, 255, 255, 0.85)" transform="rotate(35 40 18)" />
    </g>
    <ellipse cx="32" cy="38" rx="18" ry="22" fill="#FFC107" />
    <path d="M16 32 C 24 35, 40 35, 48 32" stroke="#1A1A1A" strokeWidth="4" strokeLinecap="round" />
    <path d="M15 40 C 24 43, 40 43, 49 40" stroke="#1A1A1A" strokeWidth="4" strokeLinecap="round" />
    <path d="M18 48 C 25 50, 39 50, 46 48" stroke="#1A1A1A" strokeWidth="4" strokeLinecap="round" />
    <circle cx="32" cy="18" r="8" fill="#1A1A1A" />
  </svg>
);

const benefitCards = [
  {
    id: 1,
    title: "100% Natural",
    description: "Pure honey, directly from nature no additives, no preservatives.",
    icon: <FaLeaf />,
    position: "left-top"
  },
  {
    id: 2,
    title: "Ethically Sourced",
    description: "Our honey is harvested with care, ensuring the well-being of bees and nature.",
    icon: <GiHoneyJar />,
    position: "left-bottom"
  },
  {
    id: 3,
    title: "Rich in Nutrients",
    description: "Packed with antioxidants, vitamins and minerals for a healthier you.",
    icon: <FaShieldAlt />,
    position: "right-top"
  },
  {
    id: 4,
    title: "Sustainable Practices",
    description: "We follow eco-friendly and sustainable methods to protect our environment.",
    icon: <FaGlobeAmericas />,
    position: "right-bottom"
  }
];

const WhyChoose = () => {
  const containerRef = useRef(null);
  const parallaxRef = useRef(null);
  const beesRef = useRef([]);

  // Mouse Parallax Effect using GSAP
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

  // Flying Bees Flight Animations
  useEffect(() => {
    beesRef.current.forEach((bee, i) => {
      if (!bee) return;
      gsap.to(bee, {
        x: 'random(-70, 70, 10)',
        y: 'random(-50, 50, 10)',
        rotation: 'random(-25, 25)',
        duration: 3 + i * 1.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    });
  }, []);

  return (
    <section 
      className="whyChoose" 
      ref={containerRef}
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Dark Forest Overlay */}
      <div className="whyChoose-overlay"></div>

      {/* Floating Fog */}
      <div className="whyChoose-fog fog-1"></div>
      <div className="whyChoose-fog fog-2"></div>
      <div className="whyChoose-fog fog-3"></div>

      {/* Top Center Sun Rays */}
      <div className="whyChoose-sunRays"></div>

      {/* Parallax Wrapper */}
      <div className="whyChoose-parallax" ref={parallaxRef}>
        
        {/* Golden Light Particles */}
        <div className="whyChoose-particles">
          {Array.from({ length: 40 }).map((_, i) => (
            <span 
              key={i} 
              className="whyChoose-particle" 
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${5 + Math.random() * 6}s`
              }}
            ></span>
          ))}
        </div>

        {/* Floating Leaves */}
        <div className="whyChoose-leaves">
          {Array.from({ length: 12 }).map((_, i) => (
            <span 
              key={i}
              className="whyChoose-leaf"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${8 + Math.random() * 10}s`
              }}
            ></span>
          ))}
        </div>

        {/* 6 Animated Flying Bees */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div 
            key={i} 
            className={`whyChoose-bee bee-${i + 1}`}
            ref={(el) => (beesRef.current[i] = el)}
          >
            <BeeSVG />
          </div>
        ))}

        {/* Top Header Section */}
        <div className="whyChoose-header">
          <motion.div 
            className="whyChoose-badge"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span>Why Choose Sabriyana?</span>
          </motion.div>

          <motion.h2 
            className="whyChoose-title"
            initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Nature's Goodness, <span className="title-highlight">Our Promise</span>
          </motion.h2>
        </div>

        {/* Main Grid Layout: Left Cards - Center Stage - Right Cards */}
        <div className="whyChoose-container">
          
          {/* Left Benefit Cards */}
          <div className="whyChoose-col left-col">
            {benefitCards.filter(c => c.position.startsWith('left')).map((card, idx) => (
              <motion.div 
                key={card.id}
                className="whyChoose-card"
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 * idx }}
                whileHover={{ scale: 1.04, y: -8, rotateY: -6 }}
              >
                <div className="whyChoose-iconWrapper">
                  {card.icon}
                </div>
                <div className="whyChoose-cardBody">
                  <h3 className="whyChoose-cardTitle">{card.title}</h3>
                  <p className="whyChoose-cardDesc">{card.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Center Stage: The Honey Bottle */}
          <div className="whyChoose-centerStage">
            <motion.div
              className="whyChoose-bottleWrapper"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }} // smooth ease-out-expo
            >
              <img src={honeyBottleImg} alt="Sabriyana Pure Honey Bottle" className="whyChoose-bottleImg" />
            </motion.div>
          </div>

          {/* Right Benefit Cards */}
          <div className="whyChoose-col right-col">
            {benefitCards.filter(c => c.position.startsWith('right')).map((card, idx) => (
              <motion.div 
                key={card.id}
                className="whyChoose-card"
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 * idx }}
                whileHover={{ scale: 1.04, y: -8, rotateY: 6 }}
              >
                <div className="whyChoose-iconWrapper">
                  {card.icon}
                </div>
                <div className="whyChoose-cardBody">
                  <h3 className="whyChoose-cardTitle">{card.title}</h3>
                  <p className="whyChoose-cardDesc">{card.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

        {/* Bottom Honey Dripping Effect */}
        <div className="whyChoose-dripsContainer">
          <span className="whyChoose-drip drip-1"></span>
          <span className="whyChoose-drip drip-2"></span>
          <span className="whyChoose-drip drip-3"></span>
        </div>

      </div>
    </section>
  );
};

export default WhyChoose;