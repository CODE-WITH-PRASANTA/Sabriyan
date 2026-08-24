import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import {
  FaLeaf,
  FaShieldAlt,
  FaGlobeAmericas,
} from "react-icons/fa";
import { GiHoneyJar } from "react-icons/gi";
import "./WhyChoose.css";

import bgImage from "../../assets/honey-6.webp";
import honeyBottleImg from "../../assets/honey-2.webp";

/* =========================================================
   ANIMATED BEE
========================================================= */

const BeeSVG = () => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    className="whyChoose-bee-svg"
    aria-hidden="true"
  >
    <g className="whyChoose-bee-wings">
      <ellipse
        cx="24"
        cy="18"
        rx="14"
        ry="7"
        fill="rgba(255,255,255,0.85)"
        transform="rotate(-35 24 18)"
      />

      <ellipse
        cx="40"
        cy="18"
        rx="14"
        ry="7"
        fill="rgba(255,255,255,0.85)"
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

/* =========================================================
   BENEFIT DATA
========================================================= */

const benefitCards = [
  {
    id: 1,
    title: "Premium Quality",
    description:
      "Sabriyana carefully selects quality ingredients to create premium chocolates and pure honey with a distinctive taste.",
    icon: <FaLeaf aria-hidden="true" />,
    position: "left-top",
  },
  {
    id: 2,
    title: "Natural Goodness",
    description:
      "From Sabriyana pure honey to thoughtfully crafted chocolate, we celebrate simple ingredients and authentic flavours.",
    icon: <GiHoneyJar aria-hidden="true" />,
    position: "left-bottom",
  },
  {
    id: 3,
    title: "Crafted with Care",
    description:
      "Every Sabriyana product is created with attention to flavour, texture and quality, bringing together nature and craftsmanship.",
    icon: <FaShieldAlt aria-hidden="true" />,
    position: "right-top",
  },
  {
    id: 4,
    title: "Inspired by Nature",
    description:
      "Sabriyana draws inspiration from nature to create premium chocolate and honey products that feel authentic and memorable.",
    icon: <FaGlobeAmericas aria-hidden="true" />,
    position: "right-bottom",
  },
];

/* =========================================================
   WHY CHOOSE COMPONENT
========================================================= */

const WhyChoose = () => {
  const parallaxRef = useRef(null);
  const beesRef = useRef([]);

  /* =======================================================
     OPTIMIZED MOUSE PARALLAX
  ======================================================= */

  useEffect(() => {
    const element = parallaxRef.current;

    if (!element) return;

    /*
      No mouse parallax on mobile/touch devices.
      This avoids unnecessary event handling and animation.
    */
    if (
      window.matchMedia("(pointer: coarse)").matches
    ) {
      return;
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let frameId = null;

    /*
      quickTo reuses the same GSAP animation instead
      of creating a new tween on every mouse movement.
    */
    const moveX = gsap.quickTo(element, "x", {
      duration: 0.6,
      ease: "power2.out",
    });

    const moveY = gsap.quickTo(element, "y", {
      duration: 0.6,
      ease: "power2.out",
    });

    const updateParallax = () => {
      frameId = null;

      const x =
        (mouseX - window.innerWidth / 2) * 0.005;

      const y =
        (mouseY - window.innerHeight / 2) * 0.005;

      moveX(x);
      moveY(y);
    };

    const handleMouseMove = (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;

      if (frameId === null) {
        frameId =
          requestAnimationFrame(updateParallax);
      }
    };

    window.addEventListener(
      "mousemove",
      handleMouseMove,
      {
        passive: true,
      }
    );

    return () => {
      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      if (frameId !== null) {
        cancelAnimationFrame(frameId);
      }

      gsap.killTweensOf(element);
    };
  }, []);

  /* =======================================================
     FLYING BEE ANIMATIONS
  ======================================================= */

  useEffect(() => {
    const animations = [];

    beesRef.current.forEach((bee, index) => {
      if (!bee) return;

      const animation = gsap.to(bee, {
        x: "random(-70, 70, 10)",
        y: "random(-50, 50, 10)",
        rotation: "random(-25, 25)",
        duration: 3 + index * 0.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      animations.push(animation);
    });

    return () => {
      animations.forEach((animation) => {
        animation.kill();
      });
    };
  }, []);

  return (
    <section
      className="whyChoose"
      aria-labelledby="why-choose-sabriyana"
    >
      {/* ===================================================
          BACKGROUND
      =================================================== */}

      <img
        src={bgImage}
        alt=""
        aria-hidden="true"
        className="whyChoose-bgImage"
        width="1600"
        height="900"
        loading="lazy"
        decoding="async"
      />

      {/* ===================================================
          DARK OVERLAY
      =================================================== */}

      <div
        className="whyChoose-overlay"
        aria-hidden="true"
      />

      {/* ===================================================
          FLOATING FOG
      =================================================== */}

      <div
        className="whyChoose-fog fog-1"
        aria-hidden="true"
      />

      <div
        className="whyChoose-fog fog-2"
        aria-hidden="true"
      />

      <div
        className="whyChoose-fog fog-3"
        aria-hidden="true"
      />

      {/* ===================================================
          SUN RAYS
      =================================================== */}

      <div
        className="whyChoose-sunRays"
        aria-hidden="true"
      />

      {/* ===================================================
          PARALLAX WRAPPER
      =================================================== */}

      <div
        className="whyChoose-parallax"
        ref={parallaxRef}
      >
        {/* =================================================
            LIGHT PARTICLES
        ================================================= */}

        <div
          className="whyChoose-particles"
          aria-hidden="true"
        >
          {Array.from({ length: 18 }).map(
            (_, index) => (
              <span
                key={index}
                className="whyChoose-particle"
                style={{
                  left: `${(index * 19) % 100}%`,
                  animationDelay: `${
                    (index % 7) * 0.8
                  }s`,
                  animationDuration: `${
                    6 + (index % 5)
                  }s`,
                }}
              />
            )
          )}
        </div>

        {/* =================================================
            FLOATING LEAVES
        ================================================= */}

        <div
          className="whyChoose-leaves"
          aria-hidden="true"
        >
          {Array.from({ length: 6 }).map(
            (_, index) => (
              <span
                key={index}
                className="whyChoose-leaf"
                style={{
                  left: `${(index * 21) % 100}%`,
                  animationDelay: `${
                    (index % 5) * 1.2
                  }s`,
                  animationDuration: `${
                    9 + (index % 4)
                  }s`,
                }}
              />
            )
          )}
        </div>

        {/* =================================================
            FLYING BEES
        ================================================= */}

        {Array.from({ length: 6 }).map(
          (_, index) => (
            <div
              key={index}
              className={`whyChoose-bee bee-${
                index + 1
              }`}
              ref={(element) => {
                beesRef.current[index] = element;
              }}
            >
              <BeeSVG />
            </div>
          )
        )}

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
            chocolates and naturally inspired honey
            products. From{" "}
            <strong>Sabriyana chocolate</strong> to{" "}
            <strong>Sabriyana pure honey</strong>, every
            product reflects our focus on quality, flavour
            and authentic craftsmanship.
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
              .map((card, index) => (
                <motion.article
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
                    delay: 0.2 * index,
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
                </motion.article>
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
                width="400"
                height="600"
                loading="lazy"
                decoding="async"
              />
            </motion.div>
          </div>

          {/* RIGHT */}

          <div className="whyChoose-col right-col">
            {benefitCards
              .filter((card) =>
                card.position.startsWith("right")
              )
              .map((card, index) => (
                <motion.article
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
                    delay: 0.2 * index,
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
                </motion.article>
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
            , Sabriyana creates products that bring
            together natural inspiration and careful
            craftsmanship.
          </p>

          <p>
            Our chocolate range is made for people who enjoy
            rich and memorable flavours, while our honey
            range celebrates the natural sweetness and
            character of carefully sourced honey. Whether
            you are looking for{" "}
            <strong>
              premium chocolates in Odisha
            </strong>{" "}
            or{" "}
            <strong>
              pure honey from Odisha
            </strong>
            , Sabriyana aims to make every experience
            special.
          </p>

          <p>
            From <strong>Sabriyana chocolate</strong> to{" "}
            <strong>Sabriyana honey</strong>, our goal is to
            build a trusted Indian brand known for quality,
            thoughtful ingredients and products people love
            to share.
          </p>
        </motion.div>

        {/* =================================================
            HONEY DRIPS
        ================================================= */}

        <div
          className="whyChoose-dripsContainer"
          aria-hidden="true"
        >
          <span className="whyChoose-drip drip-1" />
          <span className="whyChoose-drip drip-2" />
          <span className="whyChoose-drip drip-3" />
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;