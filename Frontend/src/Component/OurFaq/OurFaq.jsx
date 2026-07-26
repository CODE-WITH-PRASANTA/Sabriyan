import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { 
  FaLeaf, 
  FaShieldAlt, 
  FaGlobeAmericas, 
  FaPlus, 
  FaMinus, 
  FaTruck, 
  FaCookieBite, 
  FaSeedling, 
  FaHandshake,
  FaBoxOpen,
  FaTemperatureLow,
  FaCertificate,
  FaStore
} from 'react-icons/fa';
import { GiHoneyJar, GiHoneycomb } from 'react-icons/gi';
import './OurFaq.css';

// ONLY BACKGROUND IMAGE IS IMPORTED
import faqBg from '../../assets/faq.png';

// Animated SVG Bee Component
const BeeSVG = ({ className }) => (
  <svg viewBox="0 0 64 64" fill="none" className={`ourFaq-bee-svg ${className}`}>
    <g className="ourFaq-bee-wings">
      <ellipse cx="24" cy="18" rx="14" ry="7" fill="rgba(255, 255, 255, 0.85)" transform="rotate(-35 24 18)" />
      <ellipse cx="40" cy="18" rx="14" ry="7" fill="rgba(255, 255, 255, 0.85)" transform="rotate(35 40 18)" />
    </g>
    <ellipse cx="32" cy="38" rx="18" ry="22" fill="#D8B15B" />
    <path d="M16 32 C 24 35, 40 35, 48 32" stroke="#10281A" strokeWidth="4" strokeLinecap="round" />
    <path d="M15 40 C 24 43, 40 43, 49 40" stroke="#10281A" strokeWidth="4" strokeLinecap="round" />
    <path d="M18 48 C 25 50, 39 50, 46 48" stroke="#10281A" strokeWidth="4" strokeLinecap="round" />
    <circle cx="32" cy="18" r="8" fill="#10281A" />
  </svg>
);

// 10 Comprehensive FAQ Items
const faqItems = [
  {
    id: 1,
    question: "What makes Sabriyana products natural and pure?",
    answer: "Our honey is sourced from untouched forests and our chocolates are made from the finest cocoa beans. We follow 100% natural and sustainable processes with no artificial additives.",
    icon: <FaLeaf />
  },
  {
    id: 2,
    question: "Do you use preservatives in your chocolate or honey?",
    answer: "No, all of our products are 100% free from chemical preservatives, artificial colorings, or synthetic flavors. Nature provides all the preservation needed.",
    icon: <FaCookieBite />
  },
  {
    id: 3,
    question: "Where is your honey sourced from?",
    answer: "Our raw honey is ethically harvested directly from wild forest hives located in protected natural reserves, ensuring untouched purity and biodiversity preservation.",
    icon: <GiHoneyJar />
  },
  {
    id: 4,
    question: "Are your chocolates suitable for vegetarians?",
    answer: "Yes! All of our dark and artisan craft chocolates are 100% plant-based, vegetarian-friendly, and crafted with organic cocoa butter.",
    icon: <FaSeedling />
  },
  {
    id: 5,
    question: "Do you offer international shipping?",
    answer: "Yes, we ship our fresh products worldwide in eco-friendly temperature-controlled packaging to ensure optimal quality upon arrival.",
    icon: <FaTruck />
  },
  {
    id: 6,
    question: "Are your products certified organic?",
    answer: "Yes, all our honey harvests and cacao beans are certified organic by international standards, strictly audited to guarantee zero pesticide contamination.",
    icon: <FaCertificate />
  },
  {
    id: 7,
    question: "Why does pure honey sometimes crystallize?",
    answer: "Crystallization is a natural sign of raw, unprocessed honey rich in beneficial pollen and enzymes. You can gently warm the jar in warm water to reliquefy it.",
    icon: <GiHoneycomb />
  },
  {
    id: 8,
    question: "How should I store craft dark chocolates?",
    answer: "Store your chocolates in a cool, dry place between 15°C to 18°C away from direct sunlight. Avoid refrigeration as humidity can alter the smooth texture.",
    icon: <FaTemperatureLow />
  },
  {
    id: 9,
    question: "Is your packaging eco-friendly and recyclable?",
    answer: "Absolutely! We use 100% biodegradable glass jars, recycled cardboard boxes, and vegetable-based inks to keep our carbon footprint minimal.",
    icon: <FaBoxOpen />
  },
  {
    id: 10,
    question: "Do you offer wholesale or bulk purchasing options?",
    answer: "Yes, we provide wholesale pricing for gourmet retailers, boutique cafes, and corporate gift hampers. Feel free to reach out via our contact page.",
    icon: <FaStore />
  }
];

const bottomFeatures = [
  {
    id: 1,
    title: "100% Natural",
    desc: "Pure honey & chocolates from nature.",
    icon: <FaLeaf />
  },
  {
    id: 2,
    title: "No Preservatives",
    desc: "We never use any artificial additives.",
    icon: <FaShieldAlt />
  },
  {
    id: 3,
    title: "Sustainable",
    desc: "Eco-friendly practices for a better tomorrow.",
    icon: <FaGlobeAmericas />
  },
  {
    id: 4,
    title: "Trusted by Thousands",
    desc: "Loved by customers worldwide.",
    icon: <FaHandshake />
  }
];

const OurFaq = () => {
  const [openAccordion, setOpenAccordion] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const containerRef = useRef(null);
  const parallaxRef = useRef(null);
  const bottleStageRef = useRef(null);

  // Pagination Variables (5 items per page)
  const itemsPerPage = 5;
  const totalPages = Math.ceil(faqItems.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFaqItems = faqItems.slice(indexOfFirstItem, indexOfLastItem);

  const toggleAccordion = (id) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
    setOpenAccordion(null); // Reset open accordion on page change
  };

  // Mouse Parallax Effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const moveX = (clientX - window.innerWidth / 2) * 0.012;
      const moveY = (clientY - window.innerHeight / 2) * 0.012;

      gsap.to(parallaxRef.current, {
        x: moveX,
        y: moveY,
        ease: 'power2.out',
        duration: 1
      });

      gsap.to(bottleStageRef.current, {
        rotateY: moveX * 0.4,
        rotateX: -moveY * 0.4,
        ease: 'power1.out',
        duration: 0.8
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="ourFaq" ref={containerRef}>
      {/* Background Layers */}
      <div className="ourFaq-bg-layer1"></div>
      <div 
        className="ourFaq-bg-layer2" 
        style={{ backgroundImage: `url(${faqBg})` }}
      ></div>
      <div className="ourFaq-bg-layer3-topRight"></div>
      <div className="ourFaq-bg-layer3-bottomLeft"></div>
      <div className="ourFaq-bg-layer4-darkOverlay"></div>

      {/* Fog Layers */}
      <div className="ourFaq-fog fog-1"></div>
      <div className="ourFaq-fog fog-2"></div>

      {/* Fireflies & Bees */}
      <div className="ourFaq-fireflies">
        {Array.from({ length: 15 }).map((_, i) => (
          <span key={i} className={`ourFaq-firefly fly-${i + 1}`}></span>
        ))}
      </div>

      <BeeSVG className="bee-1" />
      <BeeSVG className="bee-2" />
      <BeeSVG className="bee-3" />

      {/* Parallax Content Wrapper */}
      <div className="ourFaq-parallax" ref={parallaxRef}>
        
        <div className="ourFaq-container">
          
          {/* Main Grid: Left Stage + Right FAQ Content */}
          <div className="ourFaq-mainGrid">
            
            {/* Left Side Stage */}
            <div className="ourFaq-leftStage" ref={bottleStageRef}>
              <div className="ourFaq-productHotspot">
                <div className="ourFaq-honeyDrip-wrapper">
                  <span className="ourFaq-drip drip-1"></span>
                  <span className="ourFaq-drip drip-2"></span>
                </div>
              </div>
            </div>

            {/* Right Side Content */}
            <div className="ourFaq-rightContent">
              
              {/* Header Section */}
              <div className="ourFaq-headerSection">
                <motion.div 
                  className="ourFaq-topBadge"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <FaLeaf className="badge-icon" />
                  <span>FAQ</span>
                </motion.div>

                <motion.h2 
                  className="ourFaq-title"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  Frequently Asked <span className="title-highlight">Questions</span>
                </motion.h2>

                <motion.p 
                  className="ourFaq-description"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Find answers to the most common questions about our honey, chocolates and our natural processes.
                </motion.p>

                <motion.div 
                  className="ourFaq-ctaWrapper"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <button className="ourFaq-ctaBtn">
                    <FaLeaf className="cta-icon" />
                    <span>Have more questions? <strong className="cta-link">Contact us</strong></span>
                  </button>
                </motion.div>
              </div>

              {/* Accordion List (Displaying 5 Items Per Page) */}
              <div className="ourFaq-accordionList">
                {currentFaqItems.map((item) => {
                  const isOpen = openAccordion === item.id;
                  return (
                    <div 
                      key={item.id} 
                      className={`ourFaq-accordion-item ${isOpen ? 'open' : ''}`}
                    >
                      <button 
                        className="ourFaq-accordion-header"
                        onClick={() => toggleAccordion(item.id)}
                        aria-expanded={isOpen}
                      >
                        <div className="ourFaq-header-left">
                          <div className="ourFaq-iconCircle">
                            {item.icon}
                          </div>
                          <span className="ourFaq-questionText">{item.question}</span>
                        </div>
                        <div className="ourFaq-toggleIcon">
                          {isOpen ? <FaMinus /> : <FaPlus />}
                        </div>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            key="content"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                            className="ourFaq-accordion-body"
                          >
                            <p className="ourFaq-answerText">{item.answer}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              {/* Pagination Controls */}
              <div className="ourFaq-pagination">
                <button 
                  className="ourFaq-page-btn prev"
                  onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>

                {Array.from({ length: totalPages }).map((_, index) => {
                  const pageNum = index + 1;
                  return (
                    <button
                      key={pageNum}
                      className={`ourFaq-page-btn ${currentPage === pageNum ? 'active' : ''}`}
                      onClick={() => handlePageChange(pageNum)}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button 
                  className="ourFaq-page-btn next"
                  onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>

            </div>

          </div>

          {/* Bottom Features Bar */}
          <motion.div 
            className="ourFaq-bottomFeatures"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {bottomFeatures.map((feat) => (
              <div key={feat.id} className="ourFaq-featureCard">
                <div className="ourFaq-featureIconWrapper">
                  {feat.icon}
                </div>
                <div className="ourFaq-featureText">
                  <h4 className="ourFaq-featureTitle">{feat.title}</h4>
                  <p className="ourFaq-featureDesc">{feat.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default OurFaq;