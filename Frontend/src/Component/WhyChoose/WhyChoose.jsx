import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import {
  FaLeaf,
  FaShieldAlt,
  FaGlobeAmericas,
} from "react-icons/fa";
import { GiHoneyJar } from "react-icons/gi";
import "./WhyChoose.css";

import bgImage from "../../assets/honey-6.png";
import honeyBottleImg from "../../assets/honey-2.png";

gsap.registerPlugin(ScrollTrigger);

// =========================================================
// Animated Bee
// =========================================================

const BeeSVG = () => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    className="whyChoose-bee-svg"
  >
    <g className="whyChoose-bee-wings">
      <ellipse
        cx="24"
        cy="18"
        rx="14"
        ry="7"
        fill="rgba(255, 255, 255, 0.85)"
        transform="rotate(-35 24 18)"
      />

      <ellipse
        cx="40"
        cy="18"
        rx="14"
        ry="7"
        fill="rgba(255, 255, 255, 0.85)"
        transform="rotate(35 40 18)"
      />
    </g>

    <ellipse
      cx="32"
      cy="38"
      rx="18"
      ry="22"
      fill="#FFC107"
    />

    <path
      d="M16 32 C24 35, 40 35, 48 32"
      stroke="#1A1A1A"
      strokeWidth="4"
      strokeLinecap="round"
    />

    <path
      d="M15 40 C24 43, 40 43, 49 40"
      stroke="#1A1A1A"
      strokeWidth="4"
      strokeLinecap="round"
    />

    <path
      d="M18 48 C25 50, 39 50, 46 48"
      stroke="#1A1A1A"
      strokeWidth="4"
      strokeLinecap="round"
    />

    <circle
      cx="32"
      cy="18"
      r="8"
      fill="#1A1A1A"
    />
  </svg>
);

// =========================================================
// Sabriyana Benefits
// =========================================================

const benefitCards = [
  {
    id: 1,
    title: "Premium Quality",
    description:
      "Sabriyana carefully selects quality ingredients to create premium chocolates and pure honey with a distinctive taste.",
    icon: <FaLeaf />,
    position: "left-top",
  },

  {
    id: 2,
    title: "Natural Goodness",
    description:
      "From Sabriyana pure honey to thoughtfully crafted chocolate, we celebrate simple ingredients and authentic flavours.",
    icon: <GiHoneyJar />,
    position: "left-bottom",
  },

  {
    id: 3,
    title: "Crafted with Care",
    description:
      "Every Sabriyana product is created with attention to flavour, texture and quality, bringing together nature and craftsmanship.",
    icon: <FaShieldAlt />,
    position: "right-top",
  },

  {
    id: 4,
    title: "Inspired by Nature",
    description:
      "Sabriyana draws inspiration from nature to create premium chocolate and honey products that feel authentic and memorable.",
    icon: <FaGlobeAmericas />,
    position: "right-bottom",
  },
];

// =========================================================
// Component
// =========================================================

const WhyChoose = () => {
  const containerRef = useRef(null);
  const parallaxRef = useRef(null);
  const beesRef = useRef([]);

  // =========================================================
  // Mouse Parallax
  // =========================================================

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;

      const moveX =
        (clientX - window.innerWidth / 2) * 0.015;

      const moveY =
        (clientY - window.innerHeight / 2) * 0.015;

      gsap.to(parallaxRef.current, {
        x: moveX,
        y: moveY,
        ease: "power2.out",
        duration: 1,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );
    };
  }, []);

  // =========================================================
  // Flying Bees
  // =========================================================

  useEffect(() => {
    beesRef.current.forEach((bee, i) => {
      if (!bee) return;

      gsap.to(bee, {
        x: "random(-70, 70, 10)",
        y: "random(-50, 50, 10)",
        rotation: "random(-25, 25)",
        duration: 3 + i * 1.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });
  }, []);

  return (
    <section
      className="whyChoose"
      ref={containerRef}
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
      aria-labelledby="why-choose-sabriyana"
    >
      {/* Background */}

      <div className="whyChoose-overlay"></div>

      <div className="whyChoose-fog fog-1"></div>
      <div className="whyChoose-fog fog-2"></div>
      <div className="whyChoose-fog fog-3"></div>

      <div className="whyChoose-sunRays"></div>

      {/* Parallax */}

      <div
        className="whyChoose-parallax"
        ref={parallaxRef}
      >
        {/* Particles */}

        <div className="whyChoose-particles">
          {Array.from({ length: 40 }).map((_, i) => (
            <span
              key={i}
              className="whyChoose-particle"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${
                  Math.random() * 10
                }s`,
                animationDuration: `${
                  5 + Math.random() * 6
                }s`,
              }}
            />
          ))}
        </div>

        {/* Leaves */}

        <div className="whyChoose-leaves">
          {Array.from({ length: 12 }).map((_, i) => (
            <span
              key={i}
              className="whyChoose-leaf"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${
                  Math.random() * 8
                }s`,
                animationDuration: `${
                  8 + Math.random() * 10
                }s`,
              }}
            />
          ))}
        </div>

        {/* Bees */}

        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className={`whyChoose-bee bee-${i + 1}`}
            ref={(el) => {
              beesRef.current[i] = el;
            }}
          >
            <BeeSVG />
          </div>
        ))}

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="whyChoose-header">
          <motion.div
            className="whyChoose-badge"
            initial={{
              opacity: 0,
              y: -20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
            }}
          >
            <span>
              Why Choose Sabriyana?
            </span>
          </motion.div>

          <motion.h2
            id="why-choose-sabriyana"
            className="whyChoose-title"
            initial={{
              opacity: 0,
              y: 30,
              filter: "blur(8px)",
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.8,
              delay: 0.2,
            }}
          >
            Nature's Goodness,{" "}
            <span className="title-highlight">
              Sabriyana's Promise
            </span>
          </motion.h2>

          {/* SEO Introduction */}

          <motion.p
            className="whyChoose-intro"
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.7,
              delay: 0.3,
            }}
          >
            Sabriyana is a{" "}
            <strong>
              premium chocolate and honey brand in Odisha
            </strong>
            , bringing together thoughtfully crafted
            chocolates and naturally inspired honey products.
            From{" "}
            <strong>Sabriyana chocolate</strong>{" "}
            to{" "}
            <strong>Sabriyana pure honey</strong>
            , every product reflects our focus on quality,
            flavour and authentic craftsmanship.
          </motion.p>
        </div>

        {/* =================================================
            BENEFITS + PRODUCT
        ================================================= */}

        <div className="whyChoose-container">

          {/* LEFT */}

          <div className="whyChoose-col left-col">
            {benefitCards
              .filter((card) =>
                card.position.startsWith("left")
              )
              .map((card, idx) => (
                <motion.div
                  key={card.id}
                  className="whyChoose-card"
                  initial={{
                    opacity: 0,
                    x: -60,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 0.7,
                    delay: 0.2 * idx,
                  }}
                  whileHover={{
                    scale: 1.04,
                    y: -8,
                    rotateY: -6,
                  }}
                >
                  <div className="whyChoose-iconWrapper">
                    {card.icon}
                  </div>

                  <div className="whyChoose-cardBody">
                    <h3 className="whyChoose-cardTitle">
                      {card.title}
                    </h3>

                    <p className="whyChoose-cardDesc">
                      {card.description}
                    </p>
                  </div>
                </motion.div>
              ))}
          </div>

          {/* CENTER */}

          <div className="whyChoose-centerStage">
            <motion.div
              className="whyChoose-bottleWrapper"
              initial={{
                opacity: 0,
                scale: 0.8,
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 1,
                delay: 0.4,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <img
                src={honeyBottleImg}
                alt="Sabriyana premium honey product from Odisha"
                className="whyChoose-bottleImg"
              />
            </motion.div>
          </div>

          {/* RIGHT */}

          <div className="whyChoose-col right-col">
            {benefitCards
              .filter((card) =>
                card.position.startsWith("right")
              )
              .map((card, idx) => (
                <motion.div
                  key={card.id}
                  className="whyChoose-card"
                  initial={{
                    opacity: 0,
                    x: 60,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 0.7,
                    delay: 0.2 * idx,
                  }}
                  whileHover={{
                    scale: 1.04,
                    y: -8,
                    rotateY: 6,
                  }}
                >
                  <div className="whyChoose-iconWrapper">
                    {card.icon}
                  </div>

                  <div className="whyChoose-cardBody">
                    <h3 className="whyChoose-cardTitle">
                      {card.title}
                    </h3>

                    <p className="whyChoose-cardDesc">
                      {card.description}
                    </p>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>

        {/* =================================================
            SEO SUPPORTING CONTENT
        ================================================= */}

        <motion.div
          className="whyChoose-seoText"
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.7,
            delay: 0.3,
          }}
        >
          <p>
            At <strong>Sabriyana</strong>, we believe that
            good food should feel honest, thoughtful and
            enjoyable. As a growing{" "}
            <strong>
              chocolate and honey brand from Odisha
            </strong>
            , Sabriyana creates products that bring together
            natural inspiration and careful craftsmanship.

            <br />
            <br />

            Our chocolate range is made for people who enjoy
            rich and memorable flavours, while our honey range
            celebrates the natural sweetness and character of
            carefully sourced honey. Whether you are looking
            for{" "}
            <strong>
              premium chocolates in Odisha
            </strong>{" "}
            or{" "}
            <strong>
              pure honey from Odisha
            </strong>
            , Sabriyana aims to make every experience special.

            <br />
            <br />

            From <strong>Sabriyana chocolate</strong> to{" "}
            <strong>Sabriyana honey</strong>, our goal is to
            build a trusted Indian brand known for quality,
            thoughtful ingredients and products people love
            to share.
          </p>
        </motion.div>

        {/* Honey Drips */}

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