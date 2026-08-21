import React from 'react';
import { motion } from 'framer-motion';
import './MainAbout.css';
// 1. Give the imported image a variable name
import bgImage from '../../assets/about-3.webp';

// Component for word-by-word animation from the right side
const AnimatedText = ({ text, className, tag: Tag = 'p' }) => {
  const words = text.split(' ');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      x: 40, // Animates in slow from the right side
      filter: 'blur(4px)',
    },
    visible: {
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        damping: 18,
        stiffness: 50,
      },
    },
  };

  return (
    <Tag className={className}>
      <motion.span
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        style={{ display: 'inline-block' }}
      >
        {words.map((word, index) => (
          <motion.span
            key={index}
            variants={wordVariants}
            style={{ display: 'inline-block', marginRight: '0.3em' }}
          >
            {word}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
};

const MainAbout = () => {
  return (
    // 2. Pass the imported image to backgroundImage style
    <section 
      className="main-about" 
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="main-about__wrapper">
        {/* Paper scroll container matching the background scroll structure */}
        <div className="main-about__paper-content">
          <AnimatedText
            tag="h3"
            className="main-about__subtitle"
            text="Welcome to Sabriyana"
          />

          <AnimatedText
            tag="h1"
            className="main-about__title"
            text="Crafting Pure Artisan Chocolate Bliss"
          />

          <div className="main-about__divider" />

          <AnimatedText
            tag="p"
            className="main-about__description"
            text="At Sabriyana, we transform premium cocoa beans into extraordinary chocolate masterpieces. Nestled in a world of rich flavors and exotic aromas, our creation café offers hand-crafted truffles, and bespoke cocoa beverages made with passion and perfection."
          />

          <AnimatedText
            tag="p"
            className="main-about__description highlight"
            text="Experience the art of artisanal chocolate making where tradition meets modern culinary innovation."
          />

          

          {/* Call to Action Button */}
          <motion.div
            className="main-about__cta-box"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <button className="main-about__button">Explore Our Creations</button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MainAbout;