import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
// Change this:
// import { FaShoppingCart, FaArrowRight, FaChevronLeft, FaChevronRight, FaStar } from "react_icons/fa";

// To this:
import { FaShoppingCart, FaArrowRight, FaChevronLeft, FaChevronRight, FaStar } from "react-icons/fa";

// Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './HoneyProducts.css';

// Import local images (Update filenames according to your folder structure)
import productBgImg from '../../assets/honey4.png';
import honeyBottleImg from '../../assets/honey-2.png';

const PRODUCTS = [
  {
    id: 1,
    title: 'Wild Forest Honey',
    desc: 'Rich in antioxidants & perfect for daily health.',
    price: '₹499',
    rating: 5,
    tag: '100% Natural'
  },
  {
    id: 2,
    title: 'Acacia Honey',
    desc: 'Light, sweet & perfect for a healthy lifestyle.',
    price: '₹599',
    rating: 5,
    tag: 'Pure & Organic'
  },
  {
    id: 3,
    title: 'Multiflora Honey',
    desc: 'A blend of natural floral goodness.',
    price: '₹549',
    rating: 5,
    tag: 'Raw Harvest'
  },

  {
    id: 4,
    title: 'Multiflora Honey',
    desc: 'A blend of natural floral goodness.',
    price: '₹549',
    rating: 5,
    tag: 'Raw Harvest'
  },

  {
    id: 5,
    title: 'Multiflora Honey',
    desc: 'A blend of natural floral goodness.',
    price: '₹549',
    rating: 5,
    tag: 'Raw Harvest'
  },
  {
    id: 6,
    title: 'Multiflora Honey',
    desc: 'A blend of natural floral goodness.',
    price: '₹549',
    rating: 5,
    tag: 'Raw Harvest'
  },
  {
    id: 7,
    title: 'Organic Honey',
    desc: '100% organic & chemical free.',
    price: '₹699',
    rating: 5,
    tag: 'Pesticide Free'
  }
];

const HoneyProducts = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  // Generate 50 particles with random positions
  const particles = Array.from({ length: 50 });

  return (
    <section 
      className="HoneyProducts"
      style={{
        backgroundImage: `linear-gradient(rgba(10, 10, 10, 0.75), rgba(10, 10, 10, 0.85)), url(${productBgImg})`
      }}
    >
      {/* ---------------- BACKGROUND ANIMATIONS ---------------- */}
      <div className="HoneyProducts-bgOverlay">
        
        {/* Honeycomb Pattern */}
        <div className="HoneyProducts-honeycomb" />

        {/* Moving Light Rays */}
        <div className="HoneyProducts-lightRay HoneyProducts-lightRay--1" />
        <div className="HoneyProducts-lightRay HoneyProducts-lightRay--2" />

        {/* Blur Circles */}
        <div className="HoneyProducts-blurCircle HoneyProducts-blurCircle--top" />
        <div className="HoneyProducts-blurCircle HoneyProducts-blurCircle--bottom" />

        {/* 50+ Floating Pollen Particles */}
        <div className="HoneyProducts-particlesContainer">
          {particles.map((_, i) => (
            <div
              key={i}
              className="HoneyProducts-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>

        {/* Animated Flying Bees */}
        <div className="HoneyProducts-bee HoneyProducts-bee--1">🐝</div>
        <div className="HoneyProducts-bee HoneyProducts-bee--2">🐝</div>
        <div className="HoneyProducts-bee HoneyProducts-bee--3">🐝</div>
      </div>

      {/* ---------------- MAIN CONTENT SECTION ---------------- */}
      <div className="HoneyProducts-container">
        
        {/* Section Header */}
        <motion.div 
          className="HoneyProducts-header"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="HoneyProducts-subheading">✦ OUR PRODUCTS ✦</span>
          <h2 className="HoneyProducts-title">Pure Honey, Pure You</h2>
          <p className="HoneyProducts-subtitle">Carefully harvested, naturally delicious.</p>
        </motion.div>

        {/* Carousel & Controls Wrapper */}
        <div className="HoneyProducts-carouselWrapper">
          
          {/* Custom Navigation Buttons */}
          <button ref={prevRef} className="HoneyProducts-navBtn HoneyProducts-navBtn--prev" aria-label="Previous">
            <FaChevronLeft />
          </button>
          
          <button ref={nextRef} className="HoneyProducts-navBtn HoneyProducts-navBtn--next" aria-label="Next">
            <FaChevronRight />
          </button>

          {/* Swiper Slider */}
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            pagination={{ clickable: true, dynamicBullets: true }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 4 }
            }}
            className="HoneyProducts-swiper"
          >
            {PRODUCTS.map((product, index) => (
              <SwiperSlide key={product.id}>
                {/* Framer Motion Card Entrance Animation */}
                <motion.div
                  className="HoneyProducts-card"
                  initial={{ opacity: 0, y: 100 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  viewport={{ once: true }}
                >
                  {/* Floating Bottle Image */}
                  <div className="HoneyProducts-imageWrapper">
                    <img 
                      src={honeyBottleImg} 
                      alt={product.title} 
                      className="HoneyProducts-bottleImg"
                    />
                    {/* Animated Dripping Honey Drop */}
                    <div className="HoneyProducts-drop" />
                  </div>

                  {/* Card Content */}
                  <div className="HoneyProducts-cardContent">
                    <div className="HoneyProducts-rating">
                      {[...Array(product.rating)].map((_, i) => (
                        <FaStar key={i} className="HoneyProducts-star" />
                      ))}
                      <span className="HoneyProducts-tag">{product.tag}</span>
                    </div>

                    <h3 className="HoneyProducts-productTitle">{product.title}</h3>
                    <p className="HoneyProducts-productDesc">{product.desc}</p>
                    <div className="HoneyProducts-price">{product.price}</div>

                    {/* Interactive Glass CTA Button */}
                    <button className="HoneyProducts-buyBtn">
                      <FaShoppingCart className="HoneyProducts-btnIcon" />
                      <span>BUY NOW</span>
                    </button>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Bottom Explore Button */}
        <motion.div 
          className="HoneyProducts-footer"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <button className="HoneyProducts-exploreBtn">
            <span>Explore More Products</span>
            <FaArrowRight className="HoneyProducts-exploreIcon" />
          </button>
        </motion.div>

      </div>
    </section>
  );
};

export default HoneyProducts;