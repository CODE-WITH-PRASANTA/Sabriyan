import React, {
  useState,
  useEffect,
} from 'react';

import {
  motion,
  useScroll,
  useTransform,
  useSpring
} from 'framer-motion';

import Tilt from 'react-parallax-tilt';

import {
  FiCalendar,
  FiEye,
  FiClock,
  FiUser,
  FiArrowRight,
  FiChevronDown
} from 'react-icons/fi';

import {
  GiOakLeaf,
  GiSprout
} from 'react-icons/gi';

import {
  useNavigate
} from 'react-router-dom';

// Importing local background image as requested
import bgForest from '../../assets/blog-bg.webp';

import './BlogHero.css';

import API, {
  IMG_URL
} from '../../api/axios';


// =====================================================
// PRE-DEFINED RANDOM COORDINATES
// =====================================================

const FLOATING_LEAVES =
  Array.from({
    length: 15
  }).map((_, i) => ({
    id: i,

    size:
      Math.floor(
        Math.random() * 20
      ) + 16,

    left:
      `${Math.floor(
        Math.random() * 95
      )}%`,

    top:
      `${Math.floor(
        Math.random() * 90
      )}%`,

    duration:
      Math.floor(
        Math.random() * 6
      ) + 6,

    delay:
      Math.random() * 3,

    rotate:
      Math.floor(
        Math.random() * 360
      ),
  }));


// =====================================================
// PARTICLES
// =====================================================

const PARTICLES =
  Array.from({
    length: 18
  }).map((_, i) => ({
    id: i,

    size:
      Math.floor(
        Math.random() * 5
      ) + 3,

    left:
      `${Math.floor(
        Math.random() * 95
      )}%`,

    top:
      `${Math.floor(
        Math.random() * 90
      )}%`,

    duration:
      Math.floor(
        Math.random() * 5
      ) + 4,

    delay:
      Math.random() * 2,
  }));


// =====================================================
// IMAGE URL HELPER
// =====================================================

const getImageUrl = (
  image
) => {

  if (!image) {
    return '';
  }

  if (
    image.startsWith(
      'http://'
    ) ||
    image.startsWith(
      'https://'
    )
  ) {
    return image;
  }

  return `${IMG_URL}${image}`;
};


// =====================================================
// DATE FORMATTER
// =====================================================

const formatDate = (
  date
) => {

  if (!date) {
    return '';
  }

  const parsedDate =
    new Date(date);

  if (
    Number.isNaN(
      parsedDate.getTime()
    )
  ) {
    return '';
  }

  return parsedDate.toLocaleDateString(
    'en-GB',
    {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }
  );
};


// =====================================================
// FORMAT VIEWS
// =====================================================

const formatViews = (
  views
) => {

  const number =
    Number(views) || 0;

  if (
    number >= 1000000
  ) {
    return `${(
      number / 1000000
    ).toFixed(1)}M Views`;
  }

  if (
    number >= 1000
  ) {
    return `${(
      number / 1000
    ).toFixed(1)}K Views`;
  }

  return `${number} Views`;
};


// =====================================================
// ANIMATED BEE
// =====================================================

const AnimatedBee = ({
  className
}) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    className={`ourBlog-bee-svg ${className}`}
  >

    <g className="ourBlog-bee-wings">

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
      fill="#D8B15B"
    />

    <path
      d="M16 32 C 24 35, 40 35, 48 32"
      stroke="#10281A"
      strokeWidth="4"
      strokeLinecap="round"
    />

    <path
      d="M15 40 C 24 43, 40 43, 49 40"
      stroke="#10281A"
      strokeWidth="4"
      strokeLinecap="round"
    />

    <path
      d="M18 48 C 25 50, 39 50, 46 48"
      stroke="#10281A"
      strokeWidth="4"
      strokeLinecap="round"
    />

    <circle
      cx="32"
      cy="18"
      r="8"
      fill="#10281A"
    />

  </svg>
);


// =====================================================
// COMPONENT
// =====================================================

const BlogHero = () => {

  // ===================================================
  // NAVIGATION
  // ===================================================

  const navigate =
    useNavigate();


  // ===================================================
  // BLOG STATE
  // ===================================================

  const [
    featuredBlog,
    setFeaturedBlog
  ] = useState(null);

  const [
    blogLoading,
    setBlogLoading
  ] = useState(true);


  // ===================================================
  // CURSOR TRACKING
  // ===================================================

  const [
    mousePos,
    setMousePos
  ] = useState({
    x: 0,
    y: 0
  });

  const [
    normMouse,
    setNormMouse
  ] = useState({
    x: 0,
    y: 0
  });


  // ===================================================
  // MOUSE MOVE
  // ===================================================

  useEffect(() => {

    const handleMouseMove =
      (e) => {

        setMousePos({
          x: e.clientX,
          y: e.clientY
        });

        setNormMouse({
          x:
            (e.clientX /
              window.innerWidth) *
              2 -
            1,

          y:
            (e.clientY /
              window.innerHeight) *
              2 -
            1
        });

      };


    window.addEventListener(
      'mousemove',
      handleMouseMove
    );


    return () =>
      window.removeEventListener(
        'mousemove',
        handleMouseMove
      );

  }, []);


  // ===================================================
  // FETCH FEATURED BLOG
  // ===================================================

  useEffect(() => {

    const fetchFeaturedBlog =
      async () => {

        try {

          setBlogLoading(
            true
          );


          const response =
            await API.get(
              '/blog'
            );


          console.log(
            'BLOG HERO RESPONSE:',
            response.data
          );


          if (
            !response.data.success
          ) {

            setFeaturedBlog(
              null
            );

            return;

          }


          const blogs =
            response.data.blogs ||
            [];


          // -------------------------------------------
          // ONLY PUBLISHED BLOGS
          // -------------------------------------------

          const publishedBlogs =
            blogs.filter(
              (blog) =>
                blog.status ===
                'Published'
            );


          if (
            publishedBlogs.length ===
            0
          ) {

            setFeaturedBlog(
              null
            );

            return;

          }


          // -------------------------------------------
          // FIRST PRIORITY:
          // FEATURED BLOG
          // -------------------------------------------

          const featured =
            publishedBlogs.find(
              (blog) =>
                blog.featured ===
                true
            );


          // -------------------------------------------
          // SECOND PRIORITY:
          // LATEST PUBLISHED BLOG
          // -------------------------------------------

          const latest =
            [...publishedBlogs].sort(
              (a, b) => {

                const dateA =
                  new Date(
                    a.publishDate ||
                    a.createdAt ||
                    0
                  );

                const dateB =
                  new Date(
                    b.publishDate ||
                    b.createdAt ||
                    0
                  );

                return (
                  dateB -
                  dateA
                );

              }
            )[0];


          setFeaturedBlog(
            featured ||
            latest ||
            null
          );

        } catch (error) {

          console.error(
            'BLOG HERO ERROR:',
            error
          );

          setFeaturedBlog(
            null
          );

        } finally {

          setBlogLoading(
            false
          );

        }

      };


    fetchFeaturedBlog();

  }, []);


  // ===================================================
  // SCROLL ANIMATIONS
  // ===================================================

  const {
    scrollY
  } = useScroll();


  const imageScale =
    useTransform(
      scrollY,
      [0, 400],
      [1, 0.9]
    );


  const heroOpacity =
    useTransform(
      scrollY,
      [0, 300],
      [1, 0]
    );


  const bgParallax =
    useTransform(
      scrollY,
      [0, 500],
      [0, 120]
    );


  // ===================================================
  // MOUSE PARALLAX SPRINGS
  // ===================================================

  const leafX =
    useSpring(
      normMouse.x * 10,
      {
        stiffness: 40,
        damping: 20
      }
    );


  const leafY =
    useSpring(
      normMouse.y * 10,
      {
        stiffness: 40,
        damping: 20
      }
    );


  const particleX =
    useSpring(
      normMouse.x * 15,
      {
        stiffness: 30,
        damping: 20
      }
    );


  const particleY =
    useSpring(
      normMouse.y * 15,
      {
        stiffness: 30,
        damping: 20
      }
    );


  const imgX =
    useSpring(
      normMouse.x * 5,
      {
        stiffness: 50,
        damping: 20
      }
    );


  const imgY =
    useSpring(
      normMouse.y * 5,
      {
        stiffness: 50,
        damping: 20
      }
    );


  // ===================================================
  // TIMELINE VARIANTS
  // ===================================================

  const containerVariants = {

    hidden: {
      opacity: 0
    },

    visible: {

      opacity: 1,

      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2
      }

    }

  };


  const bgVariants = {

    hidden: {
      scale: 1.1,
      opacity: 0
    },

    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: 'easeOut'
      }
    }

  };


  const imgVariants = {

    hidden: {
      opacity: 0,
      x: -60
    },

    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut'
      }
    }

  };


  const titleVariants = {

    hidden: {
      opacity: 0,
      x: 60
    },

    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut'
      }
    }

  };


  const fadeUpVariants = {

    hidden: {
      opacity: 0,
      y: 25
    },

    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }

  };


  const btnVariants = {

    hidden: {
      opacity: 0,
      scale: 0.8
    },

    visible: {

      opacity: 1,

      scale: 1,

      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 15
      }

    }

  };


  // ===================================================
  // DYNAMIC BLOG VALUES
  // ===================================================

  const blogTitle =
    featuredBlog?.title ||
    'Healing Power';


  const blogTitleParts =
    blogTitle.trim().split(
      ' '
    );


  const dynamicFirstTitle =
    featuredBlog
      ? blogTitleParts
          .slice(
            0,
            Math.max(
              1,
              Math.ceil(
                blogTitleParts.length /
                  2
              )
            )
          )
          .join(' ')
      : 'Healing Power';


  const dynamicSecondTitle =
    featuredBlog
      ? blogTitleParts
          .slice(
            Math.max(
              1,
              Math.ceil(
                blogTitleParts.length /
                  2
              )
            )
          )
          .join(' ')
      : 'of Nature';


  const category =
    featuredBlog?.category ||
    'Nature & Health';


  const description =
    featuredBlog?.excerpt ||
    'Discover how forests, fresh air, and natural ingredients improve your health naturally.';


  const publishDate =
    formatDate(
      featuredBlog?.publishDate ||
      featuredBlog?.createdAt
    ) ||
    '23 Jul 2026';


  const views =
    formatViews(
      featuredBlog?.views ||
      0
    );


  const readTime =
    featuredBlog?.readTime ||
    '4 Min Read';


  const author =
    featuredBlog?.author ||
    'Sabriyana Team';


  const heroImage =
    getImageUrl(
      featuredBlog?.featuredImage
    ) ||
    'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80';


  // ===================================================
  // READ ARTICLE
  // ===================================================

  const handleReadArticle =
    () => {

      if (
        featuredBlog?._id
      ) {

        navigate(
          `/blogDetails?id=${featuredBlog._id}`
        );

      }

    };


  // ===================================================
  // RENDER
  // ===================================================

  return (

    <motion.section

      style={{
        opacity:
          heroOpacity
      }}

      className="BlogHero"
    >


      {/* ============================================= */}
      {/* LAYER 1 & 2: BACKGROUND */}
      {/* ============================================= */}

      <motion.div

        variants={
          bgVariants
        }

        initial="hidden"

        animate="visible"

        style={{
          y: bgParallax
        }}

        className="BlogHero-bgWrapper"
      >

        <div className="BlogHero-gradientBase" />

        <img
          src={bgForest}
          alt="Forest Background"
          className="BlogHero-bgImage"
        />

        <div className="BlogHero-lightRays" />

        <div className="BlogHero-glassOverlay" />

      </motion.div>


      {/* ============================================= */}
      {/* DYNAMIC CURSOR GLOW */}
      {/* ============================================= */}

      <div

        className="BlogHero-cursorGlow"

        style={{
          background:
            `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, rgba(121, 255, 75, 0.15), transparent 50%)`
        }}

      />


      {/* ============================================= */}
      {/* FLOATING LEAVES */}
      {/* ============================================= */}

      <motion.div

        style={{
          x: leafX,
          y: leafY
        }}

        className="BlogHero-floatingLeavesLayer"
      >

        {FLOATING_LEAVES.map(
          (leaf) => (

            <motion.div

              key={
                `leaf-${leaf.id}`
              }

              className="BlogHero-leafItem"

              style={{
                left:
                  leaf.left,

                top:
                  leaf.top,

                fontSize:
                  `${leaf.size}px`
              }}

              animate={{

                y: [
                  0,
                  -25,
                  0
                ],

                rotate: [
                  leaf.rotate,
                  leaf.rotate +
                    180,
                  leaf.rotate +
                    360
                ],

                opacity: [
                  0.3,
                  0.7,
                  0.3
                ]

              }}

              transition={{

                duration:
                  leaf.duration,

                repeat:
                  Infinity,

                ease:
                  'easeInOut',

                delay:
                  leaf.delay

              }}

            >

              <GiOakLeaf />

            </motion.div>

          )
        )}

      </motion.div>


      {/* ============================================= */}
      {/* PARTICLES */}
      {/* ============================================= */}

      <motion.div

        style={{
          x: particleX,
          y: particleY
        }}

        className="BlogHero-particlesLayer"
      >

        {PARTICLES.map(
          (particle) => (

            <motion.div

              key={
                `particle-${particle.id}`
              }

              className="BlogHero-particleItem"

              style={{

                left:
                  particle.left,

                top:
                  particle.top,

                width:
                  `${particle.size}px`,

                height:
                  `${particle.size}px`

              }}

              animate={{

                y: [
                  0,
                  -35,
                  0
                ],

                opacity: [
                  0.2,
                  0.8,
                  0.2
                ],

                scale: [
                  1,
                  1.3,
                  1
                ]

              }}

              transition={{

                duration:
                  particle.duration,

                repeat:
                  Infinity,

                ease:
                  'easeInOut',

                delay:
                  particle.delay

              }}

            />

          )
        )}

      </motion.div>


      {/* ============================================= */}
      {/* MAIN CONTAINER */}
      {/* ============================================= */}

      <motion.div

        variants={
          containerVariants
        }

        initial="hidden"

        animate="visible"

        className="BlogHero-container"
      >


        {/* =========================================== */}
        {/* LEFT SIDE */}
        {/* =========================================== */}

        <motion.div

          variants={
            imgVariants
          }

          style={{
            x: imgX,
            y: imgY,
            scale: imageScale
          }}

          className="BlogHero-leftContent"
        >

          <div className="BlogHero-imageWrapper">


            {/* Glow */}

            <div className="BlogHero-imageGlowBack" />


            {/* Decorative Leaf */}

            <motion.div

              animate={{
                y: [
                  0,
                  -12,
                  0
                ],

                rotate: [
                  0,
                  8,
                  0
                ]
              }}

              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}

              className="BlogHero-decorLeaf"

            >
              🌿

            </motion.div>


            {/* Decorative Sparkle */}

            <motion.div

              animate={{
                y: [
                  0,
                  15,
                  0
                ],

                scale: [
                  1,
                  1.2,
                  1
                ]
              }}

              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}

              className="BlogHero-decorSparkle"

            >
              ✨

            </motion.div>


            {/* ===================================== */}
            {/* 3D PARALLAX TILT */}
            {/* ===================================== */}

            <Tilt

              tiltMaxAngleX={10}

              tiltMaxAngleY={10}

              perspective={1000}

              transitionSpeed={800}

              scale={1.02}

              gyroscope={true}

              className="BlogHero-tiltCard"
            >

              <motion.div

                animate={{
                  y: [
                    0,
                    -20,
                    0
                  ]
                }}

                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}

                className="BlogHero-glassCardInner"
              >

                <div className="BlogHero-imageFrame">

                  <img

                    src={
                      heroImage
                    }

                    alt={
                      featuredBlog?.title ||
                      "Blog Cover"
                    }

                    className="BlogHero-cardImage"

                  />

                  <div className="BlogHero-cardReflection" />

                </div>

              </motion.div>

            </Tilt>

          </div>

        </motion.div>


        {/* =========================================== */}
        {/* RIGHT SIDE */}
        {/* =========================================== */}

        <div className="BlogHero-rightContent">


          {/* ========================================= */}
          {/* CATEGORY */}
          {/* ========================================= */}

          <motion.div
            variants={
              fadeUpVariants
            }
          >

            <div className="BlogHero-categoryBadge">

              <GiSprout className="BlogHero-badgeIcon" />

              <span>
                {category}
              </span>

            </div>

          </motion.div>


          {/* ========================================= */}
          {/* HEADING */}
          {/* ========================================= */}

          <motion.div
            variants={
              titleVariants
            }
          >

            <h1 className="BlogHero-heading">

              {blogLoading ? (

                <>
                  Healing Power
                  <br />

                  <span className="BlogHero-headingItalic">
                    of Nature
                  </span>
                </>

              ) : (

                <>
                  {dynamicFirstTitle}

                  {dynamicSecondTitle && (
                    <>
                      <br />

                      <span className="BlogHero-headingItalic">
                        {dynamicSecondTitle}
                      </span>
                    </>
                  )}

                </>

              )}

            </h1>

          </motion.div>


          {/* ========================================= */}
          {/* DESCRIPTION */}
          {/* ========================================= */}

          <motion.p

            variants={
              fadeUpVariants
            }

            className="BlogHero-description"

          >

            {description}

          </motion.p>


          {/* ========================================= */}
          {/* META DATA */}
          {/* ========================================= */}

          <motion.div

            variants={
              fadeUpVariants
            }

            className="BlogHero-metaCard"
          >

            <div className="BlogHero-metaItem">

              <FiCalendar className="BlogHero-metaIcon" />

              <span>
                {publishDate}
              </span>

            </div>


            <div className="BlogHero-metaItem">

              <FiEye className="BlogHero-metaIcon" />

              <span>
                {views}
              </span>

            </div>


            <div className="BlogHero-metaItem">

              <FiClock className="BlogHero-metaIcon" />

              <span>
                {readTime}
              </span>

            </div>


            <div className="BlogHero-metaItem BlogHero-metaAuthor">

              <FiUser className="BlogHero-metaIcon" />

              <span>
                {author}
              </span>

            </div>

          </motion.div>


          {/* ========================================= */}
          {/* CTA BUTTON */}
          {/* ========================================= */}

          <motion.div

            variants={
              btnVariants
            }

            className="BlogHero-ctaWrapper"
          >

            <button

              className="BlogHero-readButton"

              onClick={
                handleReadArticle
              }

              disabled={
                !featuredBlog
              }

            >

              <span className="BlogHero-buttonRipple" />

              <span className="BlogHero-buttonText">

                Read Article

              </span>

              <FiArrowRight className="BlogHero-buttonIcon" />

            </button>

          </motion.div>

        </div>

      </motion.div>


      {/* ============================================= */}
      {/* SCROLL DOWN */}
      {/* ============================================= */}

      <motion.div

        animate={{
          y: [
            0,
            8,
            0
          ]
        }}

        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}

        className="BlogHero-scrollIndicator"
      >

        <span>
          Scroll Down
        </span>

        <FiChevronDown className="BlogHero-scrollIcon" />

      </motion.div>


    </motion.section>

  );

};


export default BlogHero;