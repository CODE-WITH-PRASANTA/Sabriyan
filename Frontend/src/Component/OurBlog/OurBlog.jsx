import React, {
  useState,
  useEffect,
} from 'react';

import {
  FaCalendarAlt,
  FaEye,
  FaClock,
  FaBookmark,
  FaRegBookmark,
  FaArrowRight,
  FaLeaf,
  FaBreadSlice,
  FaCookieBite,
  FaHeart,
  FaCoffee
} from 'react-icons/fa';

import { GiHoneyJar } from 'react-icons/gi';

import './OurBlog.css';

import jungleBg from '../../assets/blog.png';
import featuredStoryImg from '../../assets/honey-6.png';

import API, {
  IMG_URL,
} from '../../api/axios';


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
// CATEGORIES
// =====================================================

const categories = [
  {
    id: 'all',
    label: 'All',
    icon: <FaLeaf />
  },
  {
    id: 'honey',
    label: 'Honey',
    icon: <GiHoneyJar />
  },
  {
    id: 'chocolate',
    label: 'Chocolate',
    icon: <FaCookieBite />
  },
  {
    id: 'recipes',
    label: 'Recipes',
    icon: <FaBreadSlice />
  },
  {
    id: 'health',
    label: 'Health',
    icon: <FaHeart />
  },
  {
    id: 'nature',
    label: 'Nature',
    icon: <FaLeaf />
  },
  {
    id: 'lifestyle',
    label: 'Lifestyle',
    icon: <FaCoffee />
  }
];


// =====================================================
// IMAGE URL
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
// DATE FORMAT
// =====================================================

const formatDate = (
  date
) => {

  if (!date) {
    return '-';
  }

  const parsedDate =
    new Date(date);

  if (
    Number.isNaN(
      parsedDate.getTime()
    )
  ) {
    return date;
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
// CATEGORY NORMALIZE
// =====================================================

const normalizeCategory = (
  category
) => {

  if (!category) {
    return '';
  }

  return category
    .toString()
    .trim()
    .toLowerCase();
};


// =====================================================
// BLOG DATA FORMAT
// =====================================================

const formatBlog = (
  blog
) => {

  return {

    ...blog,

    id:
      blog._id ||
      blog.id,

    category:
      normalizeCategory(
        blog.category
      ),

    title:
      blog.title || '',

    description:
      blog.excerpt ||
      blog.description ||
      '',

    image:
      getImageUrl(
        blog.featuredImage ||
        blog.image
      ),

    badge:
      blog.category ||
      'Blog',

    date:
      formatDate(
        blog.publishDate ||
        blog.createdAt
      ),

    views:
      blog.views || 0,

    readTime:
      blog.readTime ||
      '4 min read'

  };
};


// =====================================================
// COMPONENT
// =====================================================

const OurBlog = () => {

  // ===================================================
  // STATE
  // ===================================================

  const [
    activeCategory,
    setActiveCategory
  ] = useState('all');

  const [
    bookmarked,
    setBookmarked
  ] = useState({});

  const [
    currentPage,
    setCurrentPage
  ] = useState(1);

  const [
    blogPostsData,
    setBlogPostsData
  ] = useState([]);

  const [
    loading,
    setLoading
  ] = useState(true);

  // Display 3 posts per page
  const postsPerPage = 3;


  // ===================================================
  // FETCH BLOGS
  // ===================================================

  const fetchBlogs = async () => {

    try {

      setLoading(true);

      const response =
        await API.get(
          '/blog'
        );

      console.log(
        'PUBLIC BLOG RESPONSE:',
        response.data
      );

      if (
        response.data.success
      ) {

        const blogs =
          response.data.blogs ||
          [];

        // Only published blogs
        const publishedBlogs =
          blogs.filter(
            (blog) =>
              blog.status ===
              'Published'
          );

        const formattedBlogs =
          publishedBlogs.map(
            formatBlog
          );

        setBlogPostsData(
          formattedBlogs
        );

      } else {

        setBlogPostsData([]);

      }

    } catch (error) {

      console.error(
        'FETCH PUBLIC BLOG ERROR:',
        error
      );

      setBlogPostsData([]);

    } finally {

      setLoading(false);

    }

  };


  // ===================================================
  // LOAD BLOGS
  // ===================================================

  useEffect(() => {

    fetchBlogs();

  }, []);


  // ===================================================
  // BOOKMARK
  // ===================================================

  const toggleBookmark = (
    id
  ) => {

    setBookmarked(
      (prev) => ({
        ...prev,
        [id]:
          !prev[id]
      })
    );

  };


  // ===================================================
  // FILTER
  // ===================================================

  const filteredPosts =
    activeCategory === 'all'
      ? blogPostsData
      : blogPostsData.filter(
          (post) =>
            post.category ===
            activeCategory
        );


  // ===================================================
  // PAGINATION
  // ===================================================

  const totalPages =
    Math.ceil(
      filteredPosts.length /
      postsPerPage
    ) || 1;

  const indexOfLastPost =
    currentPage *
    postsPerPage;

  const indexOfFirstPost =
    indexOfLastPost -
    postsPerPage;

  const currentPosts =
    filteredPosts.slice(
      indexOfFirstPost,
      indexOfLastPost
    );


  // ===================================================
  // CATEGORY CHANGE
  // ===================================================

  const handleCategoryChange =
    (catId) => {

      setActiveCategory(
        catId
      );

      setCurrentPage(1);

    };


  // ===================================================
  // OPEN BLOG DETAILS
  // ===================================================

  const handleReadMore = (
    blogId
  ) => {

    if (!blogId) {
      return;
    }

    window.location.href =
      `/blogDetails?id=${blogId}`;

  };


  // ===================================================
  // RENDER
  // ===================================================

  return (

    <section className="ourBlog">

      {/* Background Layers */}

      <div className="ourBlog-bg-layer1">
      </div>

      <div
        className="ourBlog-bg-layer2"
        style={{
          backgroundImage:
            `url(${jungleBg})`
        }}
      >
      </div>

      <div className="ourBlog-bg-layer3">
      </div>

      <div className="ourBlog-bg-layer4">
      </div>


      {/* Decorative Fireflies */}

      <div className="ourBlog-fireflies">

        {Array.from({
          length: 15
        }).map(
          (_, i) => (

            <span
              key={i}
              className={`ourBlog-firefly fly-${i + 1}`}
            >
            </span>

          )
        )}

      </div>


      {/* Flying SVG Bees */}

      <AnimatedBee
        className="bee-1"
      />

      <AnimatedBee
        className="bee-2"
      />


      {/* Main Content */}

      <div className="ourBlog-container">


        {/* Hero */}

        <header className="ourBlog-hero">

          <div className="ourBlog-hero-left">

            <h1 className="ourBlog-hero-title">

              Our{" "}

              <span className="title-green">
                Blog
              </span>

            </h1>

            <p className="ourBlog-hero-desc">

              Explore stories, tips, and insights about nature, honey, wellness and a better life.

            </p>

            <div className="ourBlog-hero-decoration">
            </div>

          </div>


          <div className="ourBlog-hero-right">

            <div className="ourBlog-featured-frame">

              <img
                src={
                  featuredStoryImg
                }
                alt="Featured Story"
                className="ourBlog-featured-img"
              />

              <div className="ourBlog-featured-overlay">
              </div>

              <div className="ourBlog-featured-badge">
                Featured Story
              </div>

            </div>

          </div>

        </header>


        {/* Category Filter */}

        <nav className="ourBlog-categories">

          {categories.map(
            (cat) => (

              <button
                key={cat.id}
                className={`ourBlog-category-btn ${
                  activeCategory ===
                  cat.id
                    ? 'active'
                    : ''
                }`}
                onClick={() =>
                  handleCategoryChange(
                    cat.id
                  )
                }
              >

                <span className="ourBlog-cat-icon">
                  {cat.icon}
                </span>

                <span>
                  {cat.label}
                </span>

              </button>

            )
          )}

        </nav>


        {/* Blog Grid */}

        <main className="ourBlog-grid">

          {loading ? (

            <div className="ourBlog-no-posts">

              <h3>
                Loading articles...
              </h3>

              <p>
                Please wait...
              </p>

            </div>

          ) : currentPosts.length > 0 ? (

            currentPosts.map(
              (post) => (

                <article
                  key={post.id}
                  className="ourBlog-card"
                >

                  {/* Card Image */}

                  <div className="ourBlog-card-imageWrapper">

                    <img
                      src={post.image}
                      alt={post.title}
                      className="ourBlog-card-img"
                      loading="lazy"
                    />


                    {/* Category Badge */}

                    <div className="ourBlog-card-badge">

                      <FaLeaf className="badge-icon" />

                      <span>
                        {post.badge}
                      </span>

                    </div>


                    {/* Bookmark */}

                    <button
                      className={`ourBlog-card-bookmark ${
                        bookmarked[
                          post.id
                        ]
                          ? 'active'
                          : ''
                      }`}
                      onClick={() =>
                        toggleBookmark(
                          post.id
                        )
                      }
                      aria-label="Bookmark post"
                    >

                      {bookmarked[
                        post.id
                      ] ? (
                        <FaBookmark />
                      ) : (
                        <FaRegBookmark />
                      )}

                    </button>

                  </div>


                  {/* Card Body */}

                  <div className="ourBlog-card-body">


                    {/* Meta */}

                    <div className="ourBlog-card-meta">

                      <span className="meta-item">

                        <FaCalendarAlt />

                        {" "}

                        {post.date}

                      </span>

                      <span className="meta-item">

                        <FaEye />

                        {" "}

                        {post.views}

                      </span>

                      <span className="meta-item">

                        <FaClock />

                        {" "}

                        {post.readTime}

                      </span>

                    </div>


                    {/* Title */}

                    <h3 className="ourBlog-card-title">

                      {post.title}

                    </h3>


                    {/* Description */}

                    <p className="ourBlog-card-desc">

                      {post.description}

                    </p>


                    {/* Footer */}

                    <div className="ourBlog-card-footer">

                      <button
                        className="ourBlog-card-btn"
                        onClick={() =>
                          handleReadMore(
                            post.id
                          )
                        }
                      >

                        <span>
                          Read More
                        </span>

                        <FaArrowRight className="btn-arrow" />

                      </button>

                    </div>

                  </div>

                </article>

              )
            )

          ) : (

            <div className="ourBlog-no-posts">

              <h3>
                No articles found in this category.
              </h3>

              <p>
                Check back soon for new articles!
              </p>

            </div>

          )}

        </main>


        {/* Pagination */}

        {filteredPosts.length > 0 && (

          <div className="ourBlog-pagination">

            <button
              className="ourBlog-page-btn prev"
              onClick={() =>
                setCurrentPage(
                  (prev) =>
                    Math.max(
                      prev - 1,
                      1
                    )
                )
              }
              disabled={
                currentPage === 1
              }
            >
              Previous
            </button>


            {Array.from({
              length: totalPages
            }).map(
              (_, index) => {

                const pageNum =
                  index + 1;

                return (

                  <button
                    key={pageNum}
                    className={`ourBlog-page-btn ${
                      currentPage ===
                      pageNum
                        ? 'active'
                        : ''
                    }`}
                    onClick={() =>
                      setCurrentPage(
                        pageNum
                      )
                    }
                  >
                    {pageNum}
                  </button>

                );

              }
            )}


            <button
              className="ourBlog-page-btn next"
              onClick={() =>
                setCurrentPage(
                  (prev) =>
                    Math.min(
                      prev + 1,
                      totalPages
                    )
                )
              }
              disabled={
                currentPage ===
                totalPages
              }
            >
              Next
            </button>

          </div>

        )}

      </div>

    </section>

  );

};

export default OurBlog;