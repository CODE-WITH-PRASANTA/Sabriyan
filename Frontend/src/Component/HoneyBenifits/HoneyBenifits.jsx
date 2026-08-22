import React from 'react';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaBolt, FaLeaf, FaArrowRight } from 'react-icons/fa';
import { GiStomach } from 'react-icons/gi';

import './HoneyBenifits.css';

// Import background image
import benefitsBgImg from '../../assets/honey-5.webp';

const BENEFITS_DATA = [
  {
    id: 1,
    icon: <FaShieldAlt />,
    title: 'Boosts\nImmunity',
    duration: '4s'
  },
  {
    id: 2,
    icon: <FaBolt />,
    title: 'Natural\nEnergy',
    duration: '5s'
  },
  {
    id: 3,
    icon: <GiStomach />,
    title: 'Improves\nDigestion',
    duration: '4.5s'
  },
  {
    id: 4,
    icon: <FaLeaf />,
    title: 'Rich in\nAntioxidants',
    duration: '5.5s'
  }
];

const HoneyBenifits = () => {
  const particles = Array.from({ length: 30 });

  return (
    <section 
      className="HoneyBenifits"
      style={{
        backgroundImage: `url(${benefitsBgImg})`
      }}
    >
      {/* ---------------- BACKGROUND EFFECTS (NO BRIGHT OVERLAY) ---------------- */}
      <div className="HoneyBenifits-bgOverlay">
        
        {/* Floating Particles */}
        <div className="HoneyBenifits-particlesContainer">
          {particles.map((_, i) => (
            <div
              key={i}
              className="HoneyBenifits-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${3 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>

        {/* Flying Bees */}
        <div className="HoneyBenifits-bee HoneyBenifits-bee--1">🐝</div>
        <div className="HoneyBenifits-bee HoneyBenifits-bee--2">🐝</div>
        <div className="HoneyBenifits-bee HoneyBenifits-bee--3">🐝</div>

        {/* Dripping Honey Drops */}
        <div className="HoneyBenifits-honeyDrop HoneyBenifits-honeyDrop--1" />
        <div className="HoneyBenifits-honeyDrop HoneyBenifits-honeyDrop--2" />
      </div>

      {/* ---------------- MAIN CONTAINER ---------------- */}
      <div className="HoneyBenifits-container">
        
        {/* Left Content Column */}
        <motion.div 
          className="HoneyBenifits-leftContent"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="HoneyBenifits-subheading">
            <span className="HoneyBenifits-subIcon">✦</span>
            <span>BENEFITS OF HONEY</span>
          </div>

          <h2 className="HoneyBenifits-title">
            Goodness In <br />
            Every <span className="HoneyBenifits-titleHighlight">Drop</span>
          </h2>

          <p className="HoneyBenifits-description">
            Honey is more than just a sweetener, it's a natural way to a healthier life.
          </p>

          <button className="HoneyBenifits-exploreBtn">
            <span>EXPLORE BENEFITS</span>
            <FaArrowRight className="HoneyBenifits-btnArrow" />
          </button>
        </motion.div>

        {/* Right Side - Benefit Cards */}
        <div className="HoneyBenifits-rightCards">
          {BENEFITS_DATA.map((item, index) => (
            <motion.div
              key={item.id}
              className="HoneyBenifits-card"
              style={{ animationDuration: item.duration }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
            >
              <div className="HoneyBenifits-iconWrapper">
                {item.icon}
              </div>
              <h3 className="HoneyBenifits-cardTitle">
                {item.title.split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    {i === 0 && <br />}
                  </React.Fragment>
                ))}
              </h3>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HoneyBenifits;