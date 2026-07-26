import React from 'react';
import { motion } from 'framer-motion';
import { 
  LuLeaf, 
  LuBan, 
  LuSprout, 
  LuAward 
} from 'react-icons/lu';
import './Ingrident.css';

// Custom Mortar & Pestle SVG to avoid react-icons bundle errors
const MortarPestleIcon = ({ className }) => (
  <svg 
    className={className} 
    stroke="currentColor" 
    fill="currentColor" 
    strokeWidth="0" 
    viewBox="0 0 512 512" 
    height="1em" 
    width="1em" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M416 224c-17.7 0-32 14.3-32 32v16H128v-16c0-17.7-14.3-32-32-32S64 238.3 64 256v32c0 70.7 57.3 128 128 128h128c70.7 0 128-57.3 128-128v-32c0-17.7-14.3-32-32-32zM280.9 84.9c-8.9-15.4-28.5-20.7-43.9-11.8s-20.7 28.5-11.8 43.9l32.2 55.8H128c-17.7 0-32 14.3-32 32s14.3 32 32 32h256c17.7 0 32-14.3 32-32s-14.3-32-32-32h-85.3l-17.8-30.9z"/>
  </svg>
);

const ingredientData = [
  {
    id: 1,
    icon: LuLeaf,
    title: 'Organic Ingredients',
    description: 'Only the finest organic cocoa & natural ingredients.',
  },
  {
    id: 2,
    icon: LuBan,
    title: '0% Refined Sugar',
    description: 'Sweetened with desi khand for a healthier indulgence.',
  },
  {
    id: 3,
    icon: MortarPestleIcon,
    title: 'Stone Crafted',
    description: 'Traditional stone grinding for rich texture & flavor.',
  },
  {
    id: 4,
    icon: LuSprout,
    title: 'Sustainably Sourced',
    description: 'Ethically sourced cocoa supporting farmers.',
  },
  {
    id: 5,
    icon: LuAward,
    title: 'Premium Quality',
    description: 'Luxury chocolates crafted with perfection.',
  },
];

const Ingrident = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <section className="Ingrident">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="Ingrident-header"
      >
        <span className="Ingrident-subtitle">WHY CHOOSE SABRIYANA</span>
        <h2 className="Ingrident-title">
          Pure Ingredients, <span className="Ingrident-titleHighlight">Pure Indulgence</span>
        </h2>
      </motion.div>

      {/* Grid Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="Ingrident-grid"
      >
        {ingredientData.map((item) => {
          const IconComponent = item.icon;
          return (
            <motion.div
              key={item.id}
              variants={cardVariants}
              className="Ingrident-card"
            >
              <div className="Ingrident-iconContainer">
                <IconComponent className="Ingrident-icon" />
              </div>

              <div className="Ingrident-content">
                <h3 className="Ingrident-cardTitle">{item.title}</h3>
                <p className="Ingrident-cardDescription">{item.description}</p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};

export default Ingrident;