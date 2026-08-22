import React from "react";
import { motion } from "framer-motion";
import {
  LuLeaf,
  LuBan,
  LuSprout,
  LuAward,
} from "react-icons/lu";
import "./Ingrident.css";

// Custom Mortar & Pestle SVG
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
    <path d="M416 224c-17.7 0-32 14.3-32 32v16H128v-16c0-17.7-14.3-32-32-32S64 238.3 64 256v32c0 70.7 57.3 128 128 128h128c70.7 0 128-57.3 128-128v-32c0-17.7-14.3-32-32-32zM280.9 84.9c-8.9-15.4-28.5-20.7-43.9-11.8s-20.7 28.5-11.8 43.9l32.2 55.8H128c-17.7 0-32 14.3-32 32s14.3 32 32 32h256c17.7 0 32-14.3 32-32s-14.3-32-32-32h-85.3l-17.8-30.9z" />
  </svg>
);

// SEO-friendly ingredient content
const ingredientData = [
  {
    id: 1,
    icon: LuLeaf,
    title: "Carefully Selected Ingredients",
    description:
      "Savriyana uses thoughtfully selected cocoa and natural ingredients to create rich, smooth and memorable chocolate flavours.",
  },
  {
    id: 2,
    icon: LuBan,
    title: "Sweetened with Desi Khand",
    description:
      "Our chocolate recipes use desi khand as a traditional sweetener, bringing a distinctive Indian touch to every indulgent bite.",
  },
  {
    id: 3,
    icon: MortarPestleIcon,
    title: "Traditional Stone Crafted",
    description:
      "Traditional stone grinding helps us develop a smooth texture and deeper flavour while preserving the character of the cocoa.",
  },
  {
    id: 4,
    icon: LuSprout,
    title: "Thoughtfully Sourced Cocoa",
    description:
      "We focus on carefully sourced cocoa and responsible ingredient selection to create chocolate with quality at its heart.",
  },
  {
    id: 5,
    icon: LuAward,
    title: "Premium Chocolate Quality",
    description:
      "Every Savriyana bar is crafted with attention to flavour, texture and detail, reflecting our passion for premium chocolate.",
  },
];

const Ingrident = () => {
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

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 35,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      className="Ingrident"
      aria-labelledby="savriyana-quality-heading"
    >
      {/* ================= HEADER ================= */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="Ingrident-header"
      >
        <span className="Ingrident-subtitle">
          WHY CHOOSE SAVRIYANA
        </span>

        <h2
          id="savriyana-quality-heading"
          className="Ingrident-title"
        >
          Pure Ingredients,{" "}
          <span className="Ingrident-titleHighlight">
            Pure Indulgence
          </span>
        </h2>

        <p className="Ingrident-intro">
          Savriyana is a premium chocolate brand from Odisha,
          bringing together carefully selected cocoa, traditional
          Indian ingredients and thoughtful craftsmanship. Our
          chocolates are made for people who appreciate authentic
          flavour, refined texture and a truly enjoyable chocolate
          experience.
        </p>
      </motion.div>

      {/* ================= INGREDIENT GRID ================= */}
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
                <h3 className="Ingrident-cardTitle">
                  {item.title}
                </h3>

                <p className="Ingrident-cardDescription">
                  {item.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* ================= SEO SUPPORTING CONTENT ================= */}
      <motion.div
        className="Ingrident-seoText"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        <p>
          As a <strong>premium chocolate brand in Odisha</strong>,
          Savriyana combines traditional inspiration with a modern
          approach to chocolate making. From rich cocoa flavours to
          carefully crafted textures, each chocolate reflects our
          commitment to creating a{" "}
          <strong>best quality chocolate experience</strong> for
          chocolate lovers.
        </p>
      </motion.div>
    </section>
  );
};

export default Ingrident;