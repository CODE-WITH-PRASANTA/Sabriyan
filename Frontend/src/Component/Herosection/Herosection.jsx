import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Herosection.css";

import {
  FaArrowRight,
  FaLeaf,
  FaStar,
  FaPlay,
} from "react-icons/fa";

import Chocolate from "../../assets/ch-2.webp"; // Your Chocolate Image

const Herosection = () => {
  const heroRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    const image = imageRef.current;

    const move = (e) => {
      const x = (window.innerWidth / 2 - e.clientX) / 35;
      const y = (window.innerHeight / 2 - e.clientY) / 35;

      image.style.transform = `
        rotateY(${x}deg)
        rotateX(${-y}deg)
        translateX(${-x * 1.5}px)
        translateY(${y * 1.5}px)
      `;
    };

    hero.addEventListener("mousemove", move);

    return () => hero.removeEventListener("mousemove", move);
  }, []);

  return (
    <section
      className="Herosection"
      ref={heroRef}
      aria-label="Savriyana Premium Chocolate Brand"
    >
      {/* Background Light */}
      <div className="Herosection-lightTwo"></div>
      <div className="Herosection-lightThree"></div>

      {/* Floating Leaves */}
      <div className="Herosection-leaf leaf1">
        <FaLeaf />
      </div>

      <div className="Herosection-leaf leaf2">
        <FaLeaf />
      </div>

      <div className="Herosection-leaf leaf3">
        <FaLeaf />
      </div>

      <div className="Herosection-leaf leaf4">
        <FaLeaf />
      </div>

      {/* Floating Glow */}
      <span className="Herosection-circle c1"></span>
      <span className="Herosection-circle c2"></span>
      <span className="Herosection-circle c3"></span>
      <span className="Herosection-circle c4"></span>

      {/* Main Container */}
      <div className="Herosection-container">

        {/* ================= LEFT CONTENT ================= */}
        <div className="Herosection-left">

          {/* SEO Badge */}
          <span className="Herosection-tag">
            <FaLeaf />
            Premium Chocolate Brand from Odisha
          </span>

          {/* SEO Main Heading */}
          <h1>
            Best Chocolate Brand
            <br />
            <span>in Odisha</span>
          </h1>

          {/* SEO-Friendly Description */}
          <p>
            Discover Savriyana, a premium chocolate brand from Odisha,
            crafting rich and indulgent chocolates with carefully selected
            cocoa, traditional Indian ingredients and thoughtful
            craftsmanship. Every bar is created to deliver authentic
            flavour, smooth texture and a memorable chocolate experience.
          </p>

          {/* Buttons */}
         
          <div className="Herosection-buttons">

            <button
              className="Herosection-btnPrimary"
              type="button"
              onClick={() => window.location.href = "/ourproduct"}
            >
              Shop Now
              <FaArrowRight />
            </button>

            <button
              className="Herosection-btnSecondary"
              type="button"
            >
              <FaPlay />
              Watch Our Story
            </button>

          </div>

          {/* Rating */}
          <div className="Herosection-rating">

            <div className="Herosection-stars">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>

            <span>
              4.9/5 — Loved by Chocolate Lovers
            </span>

          </div>

          {/* Stats */}
          <div className="Herosection-stats">

            <div className="Herosection-stat">
              <h2>55%</h2>
              <p>Rich Cocoa</p>
            </div>

            <div className="Herosection-stat">
              <h2>0%</h2>
              <p>Refined Sugar</p>
            </div>

            <div className="Herosection-stat">
              <h2>80g</h2>
              <p>Premium Chocolate Bar</p>
            </div>

          </div>

        </div>

        {/* ================= RIGHT CONTENT ================= */}
        <div className="Herosection-right">

          {/* Decorative Ring */}
          <div className="Herosection-ring"></div>
          <div className="Herosection-ring ring2"></div>
          <div className="Herosection-ring ring3"></div>

          {/* Glow */}
          <div className="Herosection-imageGlow"></div>

          {/* Floating Badge */}
          <div className="Herosection-badge">

            <span>★★★★★</span>

            <p>Premium Taste</p>

          </div>

          {/* Chocolate Product */}
          <div
            className="Herosection-imageBox"
            ref={imageRef}
          >

            <img
              src={Chocolate}
              alt="Savriyana premium chocolate bar - premium chocolate brand from Odisha"
              className="Herosection-image"
            />

            {/* Floating Cocoa Beans */}
            <span className="bean bean1"></span>
            <span className="bean bean2"></span>
            <span className="bean bean3"></span>
            <span className="bean bean4"></span>
            <span className="bean bean5"></span>

            {/* Shadow */}
            <div className="Herosection-shadow"></div>

          </div>

        </div>

      </div>

      {/* Scroll */}
      <div className="Herosection-scroll">
        <span></span>
        <p>Scroll</p>
      </div>

    </section>
  );
};

export default Herosection;