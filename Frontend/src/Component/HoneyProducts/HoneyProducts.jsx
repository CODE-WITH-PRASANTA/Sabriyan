import React, { useRef, useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { FaShoppingCart, FaArrowRight, FaChevronLeft, FaChevronRight, FaStar } from "react-icons/fa"; 
import API, { IMG_URL } from "../../api/axios"; 

// Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './HoneyProducts.css';

// Import local fallback images
import productBgImg from '../../assets/honey4.png';
import honeyBottleImg from '../../assets/honey-2.png';

const HoneyProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [swiperInstance, setSwiperInstance] = useState(null);

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  // Memoize static background particles so random positions don't regenerate on re-renders
  const particles = useMemo(() => {
    return Array.from({ length: 50 }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${3 + Math.random() * 4}s`
    }));
  }, []);

  // Extract server base origin cleanly (e.g. http://localhost:5000)
  const SERVER_ORIGIN = (IMG_URL || 'http://localhost:5000').replace(/\/api\/?$/, '');

  // Helper to format backend image paths cleanly or return fallback image
  const getImageUrl = (imgPath) => {
    if (!imgPath) return honeyBottleImg;
    if (imgPath.startsWith('blob:') || imgPath.startsWith('http://') || imgPath.startsWith('https://')) {
      return imgPath;
    }
    let cleanPath = imgPath.replace(/^public\//, '');
    cleanPath = cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`;
    return `${SERVER_ORIGIN}${cleanPath}`;
  };

  // Helper to strip HTML tags from TinyMCE/RichText descriptions
  const stripHtml = (html) => {
    if (!html) return '';
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };

  // ================= FETCH PRODUCTS FROM BACKEND =================
  useEffect(() => {
    let isMounted = true;

    const fetchHoneyProducts = async () => {
      setLoading(true);
      try {
        const response = await API.get('/honey-products?status=Active&limit=20');
        
        if (response.data && response.data.success) {
          const fetchedData = response.data.data;
          if (isMounted) {
            setProducts(Array.isArray(fetchedData) ? fetchedData : []);
          }
        }
      } catch (error) {
        if (error.code === "ERR_NETWORK") {
          console.error("❌ Network Error: Backend server is offline or unreachable at http://localhost:5000");
        } else {
          console.error("Error fetching honey products for section:", error?.response?.data || error.message);
        }
        if (isMounted) {
          setProducts([]); // Clean fallback to empty list on error
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchHoneyProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  // Bind Swiper custom navigation buttons safely after component mounts and refs exist
  useEffect(() => {
    if (swiperInstance && prevRef.current && nextRef.current) {
      swiperInstance.params.navigation.prevEl = prevRef.current;
      swiperInstance.params.navigation.nextEl = nextRef.current;
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  }, [swiperInstance, products]);

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

        {/* 50 Floating Pollen Particles */}
        <div className="HoneyProducts-particlesContainer">
          {particles.map((p, i) => (
            <div
              key={i}
              className="HoneyProducts-particle"
              style={{
                left: p.left,
                top: p.top,
                animationDelay: p.delay,
                animationDuration: p.duration
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

          {/* Conditional Rendering: Loading vs Empty vs Swiper */}
          {loading ? (
            <div className="HoneyProducts-loading">
              <p style={{ color: '#f59e0b', textAlign: 'center', padding: '40px 0' }}>
                Loading pure honey collection...
              </p>
            </div>
          ) : products.length === 0 ? (
            <div className="HoneyProducts-empty">
              <p style={{ color: '#ffffff', textAlign: 'center', padding: '40px 0' }}>
                No honey products available at the moment.
              </p>
            </div>
          ) : (
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={24}
              slidesPerView={1}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              pagination={{ clickable: true, dynamicBullets: true }}
              onSwiper={setSwiperInstance}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 4 }
              }}
              className="HoneyProducts-swiper"
            >
              {products.map((product, index) => (
                <SwiperSlide key={product._id || product.id || index}>
                  <motion.div
                    className="HoneyProducts-card"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {/* Floating Bottle Image */}
                    <div className="HoneyProducts-imageWrapper">
                      <img 
                        src={getImageUrl(product.image)} 
                        alt={product.name || 'Honey product'} 
                        className="HoneyProducts-bottleImg"
                        onError={(e) => { e.target.onerror = null; e.target.src = honeyBottleImg; }}
                      />
                      <div className="HoneyProducts-drop" />
                    </div>

                    {/* Card Content */}
                    <div className="HoneyProducts-cardContent">
                      <div className="HoneyProducts-rating">
                        {[...Array(Math.round(product.rating || 5))].map((_, i) => (
                          <FaStar key={i} className="HoneyProducts-star" />
                        ))}
                        <span className="HoneyProducts-tag">{product.tag || 'Pure & Organic'}</span>
                      </div>

                      <h3 className="HoneyProducts-productTitle">{product.name}</h3>
                      <p className="HoneyProducts-productDesc">
                        {stripHtml(product.shortDescription || product.description)}
                      </p>
                      <div className="HoneyProducts-price">₹{product.price}</div>

                      {/* Buy Button */}
                      <button 
                        className="HoneyProducts-buyBtn"
                        onClick={() => {
                          if (product.buttonLink) {
                            window.location.href = product.buttonLink;
                          }
                        }}
                      >
                        <FaShoppingCart className="HoneyProducts-btnIcon" />
                        <span>{product.buttonText || 'BUY NOW'}</span>
                      </button>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>

        {/* Bottom Explore Button */}
        <motion.div 
          className="HoneyProducts-footer"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
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