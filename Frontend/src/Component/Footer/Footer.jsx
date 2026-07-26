import React from 'react';
import { motion } from 'framer-motion';
import { 
  LuLeaf, 
  LuSend, 
  LuChevronUp, 
  LuInstagram, 
  LuFacebook, 
  LuTwitter, 
  LuLinkedin 
} from 'react-icons/lu';
import './Footer.css';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <footer className="Footer">
      <div className="Footer-container">
        {/* Glow Lighting Effects */}
        <div className="Footer-glowLeft" />
        <div className="Footer-glowRight" />

        {/* Full-Width Grid Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="Footer-grid"
        >
          {/* Brand Info Column */}
          <motion.div variants={itemVariants} className="Footer-brandColumn">
            <div className="Footer-logoWrapper" onClick={scrollToTop}>
              <LuLeaf className="Footer-logoIcon" />
              <h2 className="Footer-logoText">SABRIYANA</h2>
            </div>
            <p className="Footer-brandTagline">
              Crafting timeless, stone-milled organic chocolates sweetened with 
              desi khand. Pure indulgence inspired by heritage and nature.
            </p>
            <div className="Footer-socials">
              <a href="#instagram" className="Footer-socialIcon" aria-label="Instagram">
                <LuInstagram />
              </a>
              <a href="#facebook" className="Footer-socialIcon" aria-label="Facebook">
                <LuFacebook />
              </a>
              <a href="#twitter" className="Footer-socialIcon" aria-label="Twitter">
                <LuTwitter />
              </a>
              <a href="#linkedin" className="Footer-socialIcon" aria-label="LinkedIn">
                <LuLinkedin />
              </a>
            </div>
          </motion.div>

          {/* Quick Links Column */}
          <motion.div variants={itemVariants}>
            <h3 className="Footer-columnTitle">Quick Links</h3>
            <ul className="Footer-linksList">
              <li className="Footer-linkItem"><a href="#our-story">Our Story</a></li>
              <li className="Footer-linkItem"><a href="#crafting">Craftsmanship</a></li>
              <li className="Footer-linkItem"><a href="#ingredients">Pure Ingredients</a></li>
              <li className="Footer-linkItem"><a href="#chocolates">Our Collections</a></li>
            </ul>
          </motion.div>

          {/* Customer Care Column */}
          <motion.div variants={itemVariants}>
            <h3 className="Footer-columnTitle">Customer Care</h3>
            <ul className="Footer-linksList">
              <li className="Footer-linkItem"><a href="#faq">FAQs</a></li>
              <li className="Footer-linkItem"><a href="#shipping">Shipping Policy</a></li>
              <li className="Footer-linkItem"><a href="#track">Track Order</a></li>
              <li className="Footer-linkItem"><a href="#contact">Contact Us</a></li>
            </ul>
          </motion.div>

          {/* Newsletter Column */}
          <motion.div variants={itemVariants} className="Footer-newsletter">
            <h3 className="Footer-columnTitle">Join the Connoisseurs</h3>
            <p className="Footer-newsletterText">
              Subscribe to get exclusive access to new seasonal releases and artisanal stories.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="Footer-newsletterForm">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="Footer-input"
                required
              />
              <button type="submit" className="Footer-submitBtn" aria-label="Subscribe">
                <LuSend />
              </button>
            </form>
          </motion.div>
        </motion.div>

        {/* Bottom copyright & scroll button */}
        <div className="Footer-bottom">
          <p className="Footer-copyright">
            © {new Date().getFullYear()} Sabriyana Chocolates. All rights reserved.
          </p>

          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
            className="Footer-scrollTopBtn"
            onClick={scrollToTop}
            aria-label="Back to Top"
          >
            <LuChevronUp />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;