import React, { useRef, useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import {
  FaShoppingCart,
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight,
  FaStar
} from 'react-icons/fa';

import API, { IMG_URL } from "../../api/axios";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './HoneyProducts.css';

// Local fallback images
import productBgImg from '../../assets/honey4.png';
import honeyBottleImg from '../../assets/honey-2.png';


const HoneyProducts = () => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [swiperInstance, setSwiperInstance] = useState(null);

  const prevRef = useRef(null);
  const nextRef = useRef(null);


  /* =========================================================
     BACKGROUND PARTICLES
  ========================================================= */

  const particles = useMemo(() => {
    return Array.from({ length: 50 }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${3 + Math.random() * 4}s`
    }));
  }, []);


  /* =========================================================
     SERVER IMAGE URL
  ========================================================= */

  const SERVER_ORIGIN = (
    IMG_URL || 'http://localhost:5000'
  ).replace(/\/api\/?$/, '');


  /* =========================================================
     IMAGE URL HELPER
  ========================================================= */

  const getImageUrl = (imgPath) => {

    if (!imgPath) {
      return honeyBottleImg;
    }

    if (
      imgPath.startsWith('blob:') ||
      imgPath.startsWith('http://') ||
      imgPath.startsWith('https://')
    ) {
      return imgPath;
    }

    let cleanPath = imgPath.replace(/^public\//, '');

    cleanPath = cleanPath.startsWith('/')
      ? cleanPath
      : `/${cleanPath}`;

    return `${SERVER_ORIGIN}${cleanPath}`;
  };


  /* =========================================================
     REMOVE HTML FROM PRODUCT DESCRIPTION
  ========================================================= */

  const stripHtml = (html) => {

    if (!html) return '';

    const doc = new DOMParser().parseFromString(
      html,
      'text/html'
    );

    return doc.body.textContent || '';
  };


  /* =========================================================
     FETCH SABRIYANA HONEY PRODUCTS
  ========================================================= */

  useEffect(() => {

    let isMounted = true;

    const fetchHoneyProducts = async () => {

      setLoading(true);

      try {

        const response = await API.get(
          '/honey-products?status=Active&limit=20'
        );

        if (
          response.data &&
          response.data.success
        ) {

          const fetchedData = response.data.data;

          if (isMounted) {

            setProducts(
              Array.isArray(fetchedData)
                ? fetchedData
                : []
            );

          }

        }

      } catch (error) {

        if (error.code === "ERR_NETWORK") {

          console.error(
            "❌ Network Error: Backend server is offline or unreachable at http://localhost:5000"
          );

        } else {

          console.error(
            "Error fetching Sabriyana honey products:",
            error?.response?.data ||
            error.message
          );

        }

        if (isMounted) {
          setProducts([]);
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


  /* =========================================================
     SWIPER NAVIGATION
  ========================================================= */

  useEffect(() => {

    if (
      swiperInstance &&
      prevRef.current &&
      nextRef.current
    ) {

      swiperInstance.params.navigation.prevEl =
        prevRef.current;

      swiperInstance.params.navigation.nextEl =
        nextRef.current;

      swiperInstance.navigation.init();
      swiperInstance.navigation.update();

    }

  }, [swiperInstance, products]);


  return (

    <section
      className="HoneyProducts"
      aria-labelledby="sabriyana-honey-products-title"
      style={{
        backgroundImage: `
          linear-gradient(
            rgba(10, 10, 10, 0.75),
            rgba(10, 10, 10, 0.85)
          ),
          url(${productBgImg})
        `
      }}
    >

      {/* =====================================================
          BACKGROUND ANIMATIONS
      ===================================================== */}

      <div className="HoneyProducts-bgOverlay">

        <div className="HoneyProducts-honeycomb" />

        <div className="HoneyProducts-lightRay HoneyProducts-lightRay--1" />

        <div className="HoneyProducts-lightRay HoneyProducts-lightRay--2" />

        <div className="HoneyProducts-blurCircle HoneyProducts-blurCircle--top" />

        <div className="HoneyProducts-blurCircle HoneyProducts-blurCircle--bottom" />


        {/* Floating Pollen Particles */}

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


        {/* Flying Bees */}

        <div className="HoneyProducts-bee HoneyProducts-bee--1">
          🐝
        </div>

        <div className="HoneyProducts-bee HoneyProducts-bee--2">
          🐝
        </div>

        <div className="HoneyProducts-bee HoneyProducts-bee--3">
          🐝
        </div>

      </div>


      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div className="HoneyProducts-container">


        {/* ===================================================
            SEO FRIENDLY SECTION HEADER
        =================================================== */}

        <motion.header
          className="HoneyProducts-header"

          initial={{
            opacity: 0,
            y: -30
          }}

          whileInView={{
            opacity: 1,
            y: 0
          }}

          transition={{
            duration: 0.8
          }}

          viewport={{
            once: true
          }}
        >

          <span className="HoneyProducts-subheading">
            ✦ SABRIYANA HONEY COLLECTION ✦
          </span>


          <h2
            id="sabriyana-honey-products-title"
            className="HoneyProducts-title"
          >
            Pure Honey by Sabriyana
          </h2>


          <p className="HoneyProducts-subtitle">
            Discover Sabriyana's carefully selected honey,
            created for people who appreciate the natural
            sweetness and authentic taste of quality honey.
          </p>


          {/* SEO SUPPORTING CONTENT */}

          <p className="HoneyProducts-seoText">

            At <strong>Sabriyana</strong>, we believe good food
            should feel simple, honest and enjoyable.
            Our <strong>Sabriyana honey</strong> collection brings
            the natural sweetness of honey to your everyday
            moments, from breakfast and beverages to desserts
            and homemade recipes.

            Each <strong>Sabriyana honey</strong> product is
            presented with care so you can choose the honey
            that best suits your taste and lifestyle.

            Along with honey, <strong>Sabriyana</strong> is also
            building a collection of thoughtfully created
            <strong> chocolate and honey products</strong>,
            bringing two naturally loved flavours together
            under one brand.
          </p>

        </motion.header>


        {/* ===================================================
            CAROUSEL
        =================================================== */}

        <div className="HoneyProducts-carouselWrapper">


          {/* Previous */}

          <button
            ref={prevRef}
            className="HoneyProducts-navBtn HoneyProducts-navBtn--prev"
            aria-label="View previous Sabriyana honey products"
            type="button"
          >
            <FaChevronLeft />
          </button>


          {/* Next */}

          <button
            ref={nextRef}
            className="HoneyProducts-navBtn HoneyProducts-navBtn--next"
            aria-label="View more Sabriyana honey products"
            type="button"
          >
            <FaChevronRight />
          </button>


          {/* =================================================
              LOADING
          ================================================= */}

          {loading ? (

            <div className="HoneyProducts-loading">

              <p>
                Discovering Sabriyana's honey collection...
              </p>

            </div>


          ) : products.length === 0 ? (

            /* ===============================================
               EMPTY STATE
            =============================================== */

            <div className="HoneyProducts-empty">

              <p>
                Our Sabriyana honey collection is being
                prepared. Please check back soon for our
                latest honey products.
              </p>

            </div>


          ) : (

            /* ===============================================
               SWIPER
            =============================================== */

            <Swiper

              modules={[
                Navigation,
                Pagination,
                Autoplay
              ]}

              spaceBetween={24}

              slidesPerView={1}

              autoplay={{
                delay: 4000,
                disableOnInteraction: false
              }}

              pagination={{
                clickable: true,
                dynamicBullets: true
              }}

              onSwiper={setSwiperInstance}

              breakpoints={{
                640: {
                  slidesPerView: 2
                },

                1024: {
                  slidesPerView: 4
                }
              }}

              className="HoneyProducts-swiper"
            >


              {/* ===========================================
                  HONEY PRODUCTS
              =========================================== */}

              {products.map((product, index) => (

                <SwiperSlide
                  key={
                    product._id ||
                    product.id ||
                    index
                  }
                >

                  <motion.article

                    className="HoneyProducts-card"

                    initial={{
                      opacity: 0,
                      y: 50
                    }}

                    whileInView={{
                      opacity: 1,
                      y: 0
                    }}

                    transition={{
                      duration: 0.5,
                      delay: index * 0.1
                    }}

                    viewport={{
                      once: true
                    }}
                  >


                    {/* =====================================
                        PRODUCT IMAGE
                    ===================================== */}

                    <div className="HoneyProducts-imageWrapper">

                      <img
                        src={getImageUrl(product.image)}

                        alt={
                          product.name
                            ? `${product.name} - Sabriyana honey`
                            : 'Sabriyana pure honey product'
                        }

                        title={
                          product.name
                            ? `${product.name} | Sabriyana Honey`
                            : 'Sabriyana Honey'
                        }

                        className="HoneyProducts-bottleImg"

                        loading={
                          index < 2
                            ? "eager"
                            : "lazy"
                        }

                        onError={(e) => {

                          e.target.onerror = null;

                          e.target.src =
                            honeyBottleImg;

                        }}
                      />


                      <div className="HoneyProducts-drop" />

                    </div>


                    {/* =====================================
                        PRODUCT CONTENT
                    ===================================== */}

                    <div className="HoneyProducts-cardContent">


                      {/* Rating + Tag */}

                      <div className="HoneyProducts-rating">

                        {[
                          ...Array(
                            Math.round(
                              product.rating || 5
                            )
                          )
                        ].map((_, i) => (

                          <FaStar
                            key={i}
                            className="HoneyProducts-star"
                          />

                        ))}


                        <span className="HoneyProducts-tag">

                          {product.tag ||
                            'Sabriyana Honey'}

                        </span>

                      </div>


                      {/* Product Name */}

                      <h3 className="HoneyProducts-productTitle">

                        {product.name}

                      </h3>


                      {/* Product Description */}

                      <p className="HoneyProducts-productDesc">

                        {stripHtml(
                          product.shortDescription ||
                          product.description
                        )}

                      </p>


                      {/* Price */}

                      <div className="HoneyProducts-price">

                        ₹{product.price}

                      </div>


                      {/* Buy Button */}

                      <button

                        className="HoneyProducts-buyBtn"

                        type="button"

                        aria-label={`Buy ${product.name || 'Sabriyana honey'}`}

                        onClick={() => {

                          if (product.buttonLink) {

                            window.location.href =
                              product.buttonLink;

                          }

                        }}
                      >

                        <FaShoppingCart
                          className="HoneyProducts-btnIcon"
                        />

                        <span>

                          {product.buttonText ||
                            'BUY SABRIYANA HONEY'}

                        </span>

                      </button>

                    </div>

                  </motion.article>

                </SwiperSlide>

              ))}

            </Swiper>

          )}

        </div>


        {/* ===================================================
            BOTTOM SEO CONTENT + CTA
        =================================================== */}

        <motion.div

          className="HoneyProducts-footer"

          initial={{
            opacity: 0,
            y: 30
          }}

          whileInView={{
            opacity: 1,
            y: 0
          }}

          transition={{
            duration: 0.8,
            delay: 0.3
          }}

          viewport={{
            once: true
          }}
        >

          <p className="HoneyProducts-footerText">

            Looking for quality <strong>honey in India</strong>?
            Explore the <strong>Sabriyana honey collection</strong>
            and discover naturally inspired flavours made with
            care. Sabriyana brings together its passion for
            <strong> honey and chocolate</strong> to create a
            distinctive food brand focused on taste, quality
            and memorable everyday experiences.

          </p>


          <button
            className="HoneyProducts-exploreBtn"
            type="button"
            aria-label="Explore more Sabriyana honey products"
          >

            <span>
              Explore Sabriyana Honey
            </span>

            <FaArrowRight
              className="HoneyProducts-exploreIcon"
            />

          </button>

        </motion.div>

      </div>

    </section>
  );
};


export default HoneyProducts;