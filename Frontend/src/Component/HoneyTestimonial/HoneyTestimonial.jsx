import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// Swiper Styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './HoneyTestimonial.css';

// ONLY BACKGROUND IMAGE IS IMPORTED HERE
import bgImage from '../../assets/honey-6.png';

gsap.registerPlugin(ScrollTrigger);

const testimonialsData = [
  {
    id: 1,
    name: "Priya Sharma",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
    rating: 5,
    review: "Sabriyana honey is absolutely pure and has an amazing taste. I can feel the difference!"
  },
  {
    id: 2,
    name: "Rahul Verma",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    rating: 5,
    review: "I use it every morning, and it has improved my energy and immunity a lot."
  },
  {
    id: 3,
    name: "Anjali Mehta",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
    rating: 5,
    review: "The best honey I've ever tried. 100% natural and worth every penny!"
  },
  {
    id: 4,
    name: "Vikram Malhotra",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
    rating: 5,
    review: "Rich texture and authentic wild aroma. Truly premium quality!"
  }
];

// Pure SVG Bee Icon Component
const BeeSVG = () => (
  <svg viewBox="0 0 64 64" fill="none" className="honey-testimonial-bee-svg">
    <ellipse cx="26" cy="18" rx="14" ry="8" fill="rgba(255, 255, 255, 0.7)" transform="rotate(-30 26 18)" />
    <ellipse cx="38" cy="18" rx="14" ry="8" fill="rgba(255, 255, 255, 0.7)" transform="rotate(30 38 18)" />
    <ellipse cx="32" cy="38" rx="18" ry="22" fill="#FFC107" />
    <path d="M16 32 C 24 35, 40 35, 48 32" stroke="#212121" strokeWidth="4" strokeLinecap="round" />
    <path d="M15 40 C 24 43, 40 43, 49 40" stroke="#212121" strokeWidth="4" strokeLinecap="round" />
    <path d="M18 48 C 25 50, 39 50, 46 48" stroke="#212121" strokeWidth="4" strokeLinecap="round" />
    <circle cx="32" cy="18" r="8" fill="#212121" />
  </svg>
);

// Pure SVG Flower Element
const FlowerSVG = () => (
  <svg viewBox="0 0 100 100" fill="none" className="honey-testimonial-flower-svg">
    <circle cx="50" cy="30" r="14" fill="rgba(255, 255, 255, 0.85)" />
    <circle cx="70" cy="50" r="14" fill="rgba(255, 255, 255, 0.85)" />
    <circle cx="50" cy="70" r="14" fill="rgba(255, 255, 255, 0.85)" />
    <circle cx="30" cy="50" r="14" fill="rgba(255, 255, 255, 0.85)" />
    <circle cx="36" cy="36" r="14" fill="rgba(255, 255, 255, 0.85)" />
    <circle cx="64" cy="36" r="14" fill="rgba(255, 255, 255, 0.85)" />
    <circle cx="64" cy="64" r="14" fill="rgba(255, 255, 255, 0.85)" />
    <circle cx="36" cy="64" r="14" fill="rgba(255, 255, 255, 0.85)" />
    <circle cx="50" cy="50" r="12" fill="#FFC107" />
  </svg>
);

const HoneyTestimonial = () => {
  const containerRef = useRef(null);
  const beesRef = useRef([]);
  const parallaxRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  // Mouse Parallax Effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const moveX = (clientX - window.innerWidth / 2) * 0.015;
      const moveY = (clientY - window.innerHeight / 2) * 0.015;

      gsap.to(parallaxRef.current, {
        x: moveX,
        y: moveY,
        ease: "power2.out",
        duration: 1
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // GSAP Flying Bee Animations
  useEffect(() => {
    beesRef.current.forEach((bee, i) => {
      if (!bee) return;
      gsap.to(bee, {
        x: 'random(-40, 40, 10)',
        y: 'random(-30, 30, 10)',
        rotation: 'random(-15, 15)',
        duration: 3 + i * 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    });
  }, []);

  return (
    <section 
      className="honey-testimonial" 
      ref={containerRef}
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Dark Overlay */}
      <div className="honey-testimonial-overlay"></div>

      {/* Parallax Wrapper */}
      <div className="honey-testimonial-parallax" ref={parallaxRef}>
        
        {/* Floating Golden Light Particles */}
        <div className="honey-testimonial-particles">
          {Array.from({ length: 20 }).map((_, i) => (
            <span 
              key={i} 
              className="honey-testimonial-particle" 
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${5 + Math.random() * 5}s`
              }}
            ></span>
          ))}
        </div>

        {/* Floating CSS Leaves */}
        <div className="honey-testimonial-leaves">
          {Array.from({ length: 6 }).map((_, i) => (
            <span 
              key={i}
              className="honey-testimonial-leaf-shape"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${10 + Math.random() * 10}s`
              }}
            ></span>
          ))}
        </div>

        {/* Flying Bees */}
        <div className="honey-testimonial-bee bee-1" ref={(el) => (beesRef.current[0] = el)}>
          <BeeSVG />
        </div>
        <div className="honey-testimonial-bee bee-2" ref={(el) => (beesRef.current[1] = el)}>
          <BeeSVG />
        </div>

        {/* Heading Section */}
        <div className="honey-testimonial-heading">
          <motion.span 
            className="honey-testimonial-subheading"
            initial={{ opacity: 0, y: -15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            CUSTOMER LOVE
          </motion.span>
          <motion.h2 
            className="honey-testimonial-mainhead"
            initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            What Our Customers Say
          </motion.h2>
        </div>

        {/* Swiper Testimonial Slider Wrapper with Side Buttons */}
        <div className="honey-testimonial-slider-container">
          
          {/* Custom Navigation Arrow Buttons */}
          <button ref={prevRef} className="honey-nav-btn honey-nav-prev" aria-label="Previous slide">
            <FaChevronLeft />
          </button>
          <button ref={nextRef} className="honey-nav-btn honey-nav-next" aria-label="Next slide">
            <FaChevronRight />
          </button>

          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{ clickable: true }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            speed={800}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="honey-testimonial-swiper"
          >
            {testimonialsData.map((item, index) => (
              <SwiperSlide key={item.id}>
                <motion.div 
                  className="honey-testimonial-card"
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.15 * index }}
                >
                  <div className="honey-testimonial-card-header">
                    <div className="honey-testimonial-avatar-wrapper">
                      <img src={item.avatar} alt={item.name} className="honey-testimonial-avatar" />
                    </div>
                    <div className="honey-testimonial-user-info">
                      <h3 className="honey-testimonial-user-name">{item.name}</h3>
                      <div className="honey-testimonial-stars">
                        {[...Array(item.rating)].map((_, starIndex) => (
                          <motion.span
                            key={starIndex}
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.25, delay: 0.2 + starIndex * 0.08 }}
                          >
                            <FaStar className="honey-testimonial-star" />
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <p className="honey-testimonial-review">{item.review}</p>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Decorative CSS Honeycomb & SVG Flowers */}
        <div className="honey-testimonial-flower left">
          <FlowerSVG />
        </div>
        <div className="honey-testimonial-flower right">
          <FlowerSVG />
        </div>

        <div className="honey-testimonial-honeycomb-pattern">
          <div className="hex"></div>
          <div className="hex"></div>
          <div className="hex"></div>
          <div className="hex"></div>
        </div>

      </div>
    </section>
  );
};

export default HoneyTestimonial;