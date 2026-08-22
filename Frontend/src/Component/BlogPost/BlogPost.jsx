import React, {
  useState,
  useEffect,
} from 'react';

import './BlogPost.css';

import {
  FaSearch,
  FaLeaf,
  FaHeart,
  FaLungs,
  FaBolt,
  FaQuoteLeft,
  FaCheck,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaEnvelope,
  FaArrowRight,
  FaClock,
  FaEye,
  FaCalendarAlt
} from 'react-icons/fa';

import {
  useSearchParams,
  useNavigate
} from 'react-router-dom';

import API, {
  IMG_URL
} from '../../api/axios';


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
// COMPONENT
// =====================================================

const BlogPost = () => {

  // ===================================================
  // ROUTER
  // ===================================================

  const [
    searchParams
  ] = useSearchParams();

  const navigate =
    useNavigate();

  const blogId =
    searchParams.get(
      'id'
    );


  // ===================================================
  // STATE
  // ===================================================

  const [
    searchQuery,
    setSearchQuery
  ] = useState('');

  const [
    email,
    setEmail
  ] = useState('');

  const [
    subscribed,
    setSubscribed
  ] = useState(false);

  const [
    activeCategory,
    setActiveCategory
  ] = useState(null);

  const [
    blog,
    setBlog
  ] = useState(null);

  const [
    relatedBlogs,
    setRelatedBlogs
  ] = useState([]);

  const [
    recentBlogs,
    setRecentBlogs
  ] = useState([]);

  const [
    loading,
    setLoading
  ] = useState(true);


  // ===================================================
  // FETCH BLOG
  // ===================================================

  const fetchBlog = async () => {

    try {

      setLoading(true);

      if (!blogId) {

        setBlog(null);

        return;

      }


      // ===============================================
      // GET SELECTED BLOG
      // ===============================================

      const response =
        await API.get(
          `/blog/${blogId}`
        );

      console.log(
        'BLOG DETAILS RESPONSE:',
        response.data
      );


      if (
        response.data.success
      ) {

        const blogData =
          response.data.blog ||
          response.data.data;

        setBlog(
          blogData
        );


        // =============================================
        // FETCH RELATED BLOGS
        // =============================================

        await fetchRelatedBlogs(
          blogData
        );

      } else {

        setBlog(null);

      }

    } catch (error) {

      console.error(
        'FETCH BLOG DETAILS ERROR:',
        error
      );

      setBlog(null);

    } finally {

      setLoading(false);

    }

  };


  // ===================================================
  // FETCH RELATED BLOGS
  // ===================================================

  const fetchRelatedBlogs = async (
    currentBlog
  ) => {

    try {

      const response =
        await API.get(
          '/blog'
        );

      if (
        !response.data.success
      ) {
        return;
      }

      const blogs =
        response.data.blogs ||
        [];

      // Only published
      const publishedBlogs =
        blogs.filter(
          (item) =>
            item.status ===
            'Published'
        );


      // ===============================================
      // RECENT BLOGS
      // ===============================================

      const recent =
        publishedBlogs
          .filter(
            (item) =>
              item._id !==
              currentBlog?._id
          )
          .slice(0, 3);

      setRecentBlogs(
        recent
      );


      // ===============================================
      // RELATED BLOGS
      // ===============================================

      const related =
        publishedBlogs
          .filter(
            (item) =>
              item._id !==
                currentBlog?._id &&
              item.category ===
                currentBlog?.category
          )
          .slice(0, 3);


      // If same category doesn't
      // have 3 blogs, use other blogs
      if (
        related.length < 3
      ) {

        const additional =
          publishedBlogs
            .filter(
              (item) =>
                item._id !==
                  currentBlog?._id &&
                !related.some(
                  (r) =>
                    r._id ===
                    item._id
                )
            )
            .slice(
              0,
              3 -
                related.length
            );

        related.push(
          ...additional
        );

      }

      setRelatedBlogs(
        related
      );

    } catch (error) {

      console.error(
        'RELATED BLOG ERROR:',
        error
      );

    }

  };


  // ===================================================
  // LOAD BLOG
  // ===================================================

  useEffect(() => {

    fetchBlog();

  }, [
    blogId
  ]);


  // ===================================================
  // SEARCH
  // ===================================================

  const handleSearch = (
    e
  ) => {

    e.preventDefault();

    if (
      searchQuery.trim()
    ) {

      window.location.href =
        `/blog?search=${encodeURIComponent(
          searchQuery
        )}`;

    }

  };


  // ===================================================
  // SUBSCRIBE
  // ===================================================

  const handleSubscribe = (
    e
  ) => {

    e.preventDefault();

    if (
      email.trim()
    ) {

      setSubscribed(
        true
      );

      setEmail('');

      setTimeout(
        () =>
          setSubscribed(
            false
          ),
        4000
      );

    }

  };


  // ===================================================
  // OPEN RELATED BLOG
  // ===================================================

  const handleOpenBlog = (
    id
  ) => {

    navigate(
      `/blogDetails?id=${id}`
    );

  };


  // ===================================================
  // VIEW ALL
  // ===================================================

  const handleViewAll =
    () => {

      navigate(
        '/blog'
      );

    };


  // ===================================================
  // LOADING
  // ===================================================

  if (loading) {

    return (

      <div className="BlogPost-container">

        <div className="BlogPost-content-wrapper">

          <main className="BlogPost-main">

            <div className="BlogPost-section">

              <h2 className="BlogPost-section-title">

                <FaLeaf className="BlogPost-title-icon" />

                Loading Blog...

              </h2>

            </div>

          </main>

        </div>

      </div>

    );

  }


  // ===================================================
  // BLOG NOT FOUND
  // ===================================================

  if (!blog) {

    return (

      <div className="BlogPost-container">

        <div className="BlogPost-content-wrapper">

          <main className="BlogPost-main">

            <div className="BlogPost-section">

              <h2 className="BlogPost-section-title">

                <FaLeaf className="BlogPost-title-icon" />

                Blog Not Found

              </h2>

              <p className="BlogPost-text">

                The blog post you are looking for does not exist or has been removed.

              </p>

              <button
                className="BlogPost-view-all-btn"
                onClick={
                  handleViewAll
                }
              >
                View All Blogs
                <FaArrowRight />
              </button>

            </div>

          </main>

        </div>

      </div>

    );

  }


  // ===================================================
  // BLOG DATA
  // ===================================================

  const title =
    blog.title ||
    '';

  const description =
    blog.excerpt ||
    '';

  const image =
    getImageUrl(
      blog.featuredImage ||
      blog.image
    );

  const category =
    blog.category ||
    'Nature';

  const date =
    formatDate(
      blog.publishDate ||
      blog.createdAt
    );

  const views =
    blog.views ||
    0;

  const readTime =
    blog.readTime ||
    '4 min read';

  const author =
    blog.author ||
    'Sabriyana Team';

  const authorAvatar =
    blog.authorAvatar ||
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80';

  const content =
    blog.content ||
    '';


  // ===================================================
  // RENDER
  // ===================================================

  return (

    <div className="BlogPost-container">

      {/* Background Animated Forest Elements */}

      <div className="BlogPost-forest-bg">

        <div className="BlogPost-leaf-glow glow-1">
        </div>

        <div className="BlogPost-leaf-glow glow-2">
        </div>

      </div>


      <div className="BlogPost-content-wrapper">


        {/* ================================================= */}
        {/* MAIN */}
        {/* ================================================= */}

        <main className="BlogPost-main">


          {/* ================================================= */}
          {/* HERO IMAGE & INTRO */}
          {/* ================================================= */}

          <div className="BlogPost-hero-card">

            <div className="BlogPost-hero-image-wrapper">

              <img
                src={image}
                alt={title}
                className="BlogPost-hero-img"
              />

            </div>


            <div className="BlogPost-post-meta">

              <span>
                <FaClock />

                {" "}

                {readTime}
              </span>

              <span>
                <FaEye />

                {" "}

                {views}
              </span>

              <span>
                <FaCalendarAlt />

                {" "}

                {date}
              </span>

            </div>


            <h1 className="BlogPost-section-title">

              <FaLeaf className="BlogPost-title-icon" />

              {title}

            </h1>


            <p className="BlogPost-text">

              {description}

            </p>


            {/* ================================================= */}
            {/* FULL DYNAMIC CONTENT */}
            {/* ================================================= */}

            {content ? (

              <div
                className="BlogPost-text"
                dangerouslySetInnerHTML={{
                  __html:
                    content
                }}
              />

            ) : null}

          </div>


          {/* ================================================= */}
          {/* BENEFITS SECTION */}
          {/* ================================================= */}

          <section className="BlogPost-section">

            <h2 className="BlogPost-section-title">

              <FaLeaf className="BlogPost-title-icon" />

              Benefits of Spending Time in Nature

            </h2>

            <div className="BlogPost-benefits-grid">

              <div className="BlogPost-benefit-card">

                <div className="BlogPost-benefit-icon">
                  <FaLeaf />
                </div>

                <div className="BlogPost-benefit-info">

                  <h3>
                    Reduces Stress
                  </h3>

                  <p>
                    Natural surroundings lower cortisol levels and help you relax.
                  </p>

                </div>

              </div>


              <div className="BlogPost-benefit-card">

                <div className="BlogPost-benefit-icon">
                  <FaHeart />
                </div>

                <div className="BlogPost-benefit-info">

                  <h3>
                    Improves Mental Health
                  </h3>

                  <p>
                    Fresh air and greenery uplift mood and reduce anxiety.
                  </p>

                </div>

              </div>


              <div className="BlogPost-benefit-card">

                <div className="BlogPost-benefit-icon">
                  <FaLungs />
                </div>

                <div className="BlogPost-benefit-info">

                  <h3>
                    Better Breathing
                  </h3>

                  <p>
                    Clean, oxygen-rich air strengthens your lungs and immunity.
                  </p>

                </div>

              </div>


              <div className="BlogPost-benefit-card">

                <div className="BlogPost-benefit-icon">
                  <FaBolt />
                </div>

                <div className="BlogPost-benefit-info">

                  <h3>
                    Recharges Energy
                  </h3>

                  <p>
                    Time in nature refreshes the mind and boosts productivity.
                  </p>

                </div>

              </div>

            </div>

          </section>


          {/* ================================================= */}
          {/* QUOTE */}
          {/* ================================================= */}

          <div className="BlogPost-quote-card">

            <FaQuoteLeft className="BlogPost-quote-icon-bg" />

            <p className="BlogPost-quote-text">

              "Look deep into nature, and then you will understand everything better."

            </p>

            <span className="BlogPost-quote-author">

              — Albert Einstein

            </span>

          </div>


          {/* ================================================= */}
          {/* TIPS */}
          {/* ================================================= */}

          <section className="BlogPost-section">

            <h2 className="BlogPost-section-title">

              <FaLeaf className="BlogPost-title-icon" />

              Tips to Reconnect with Nature

            </h2>

            <ul className="BlogPost-tips-list">

              <li>
                <span className="BlogPost-check">
                  <FaCheck />
                </span>

                Take regular walks in parks or forest trails.
              </li>

              <li>
                <span className="BlogPost-check">
                  <FaCheck />
                </span>

                Spend time outdoors, away from digital screens.
              </li>

              <li>
                <span className="BlogPost-check">
                  <FaCheck />
                </span>

                Try gardening to bring more greenery into your life.
              </li>

              <li>
                <span className="BlogPost-check">
                  <FaCheck />
                </span>

                Listen to the natural sounds — birds, wind and flowing water.
              </li>

              <li>
                <span className="BlogPost-check">
                  <FaCheck />
                </span>

                Choose eco-friendly and natural products for a healthier lifestyle.
              </li>

            </ul>


            {/* TAGS */}

            <div className="BlogPost-tags">

              <span className="BlogPost-tag-label">
                Tags:
              </span>

              {(
                blog.tags
                  ? blog.tags
                      .split(',')
                      .map(
                        (tag) =>
                          tag.trim()
                      )
                  : [
                      category,
                      'Health',
                      'Wellness',
                      'Eco Life',
                      'Lifestyle'
                    ]
              ).map(
                (tag) => (

                  <button
                    key={tag}
                    className="BlogPost-tag-btn"
                    onClick={() =>
                      setActiveCategory(
                        tag
                      )
                    }
                  >
                    {tag}
                  </button>

                )
              )}

            </div>

          </section>


          {/* ================================================= */}
          {/* AUTHOR */}
          {/* ================================================= */}

          <div className="BlogPost-author-box">

            <img
              src={
                authorAvatar
              }
              alt={
                author
              }
              className="BlogPost-author-avatar"
            />

            <div className="BlogPost-author-details">

              <span className="BlogPost-written-by">
                Written by
              </span>

              <h4 className="BlogPost-author-name">

                {author}

                <FaLeaf className="BlogPost-inline-leaf" />

              </h4>

              <p className="BlogPost-author-bio">

                Passionate about nature, health and pure products for a better and greener tomorrow.

              </p>

            </div>


            <div className="BlogPost-social-icons">

              <a
                href="#facebook"
                onClick={(e) =>
                  e.preventDefault()
                }
              >
                <FaFacebookF />
              </a>

              <a
                href="#twitter"
                onClick={(e) =>
                  e.preventDefault()
                }
              >
                <FaTwitter />
              </a>

              <a
                href="#instagram"
                onClick={(e) =>
                  e.preventDefault()
                }
              >
                <FaInstagram />
              </a>

              <a
                href="#linkedin"
                onClick={(e) =>
                  e.preventDefault()
                }
              >
                <FaLinkedinIn />
              </a>

            </div>

          </div>


          {/* ================================================= */}
          {/* RELATED BLOG POSTS */}
          {/* ================================================= */}

          <section className="BlogPost-section">

            <div className="BlogPost-flex-header">

              <h2 className="BlogPost-section-title">

                <FaLeaf className="BlogPost-title-icon" />

                Related Blog Posts

              </h2>

              <button
                className="BlogPost-view-all-btn"
                onClick={
                  handleViewAll
                }
              >

                View All

                <FaArrowRight />

              </button>

            </div>


            <div className="BlogPost-related-grid">

              {relatedBlogs.length >
              0 ? (

                relatedBlogs.map(
                  (item) => (

                    <div
                      key={
                        item._id
                      }
                      className="BlogPost-related-card"
                      onClick={() =>
                        handleOpenBlog(
                          item._id
                        )
                      }
                      style={{
                        cursor:
                          'pointer'
                      }}
                    >

                      <div className="BlogPost-related-img-wrap">

                        <img
                          src={getImageUrl(
                            item.featuredImage ||
                            item.image
                          )}
                          alt={
                            item.title
                          }
                        />

                      </div>

                      <div className="BlogPost-related-content">

                        <h3>
                          {
                            item.title
                          }
                        </h3>

                        <div className="BlogPost-post-meta">

                          <span>

                            <FaClock />

                            {" "}

                            {
                              item.readTime ||
                              '4 min read'
                            }

                          </span>

                          <span>

                            <FaEye />

                            {" "}

                            {
                              item.views ||
                              0
                            }

                            {" "}
                            views

                          </span>

                        </div>

                      </div>

                    </div>

                  )
                )

              ) : (

                <p className="BlogPost-text">

                  No related blogs found.

                </p>

              )}

            </div>

          </section>

        </main>


        {/* ================================================= */}
        {/* SIDEBAR */}
        {/* ================================================= */}

        <aside className="BlogPost-sidebar">


          {/* SEARCH */}

          <div className="BlogPost-widget">

            <h3 className="BlogPost-widget-title">

              <FaSearch />

              Search Blog

            </h3>

            <form
              onSubmit={
                handleSearch
              }
              className="BlogPost-search-form"
            >

              <input
                type="text"
                placeholder="Search articles..."
                value={
                  searchQuery
                }
                onChange={(e) =>
                  setSearchQuery(
                    e.target.value
                  )
                }
              />

              <button type="submit">
                <FaSearch />
              </button>

            </form>

          </div>


          {/* CATEGORIES */}

          <div className="BlogPost-widget">

            <h3 className="BlogPost-widget-title">

              <FaLeaf />

              Categories

            </h3>

            <ul className="BlogPost-categories-list">

              {[
                'Nature',
                'Honey',
                'Chocolate',
                'Health',
                'Recipes',
                'Lifestyle'
              ].map(
                (cat) => (

                  <li
                    key={cat}
                    className={
                      activeCategory ===
                      cat
                        ? 'active'
                        : ''
                    }
                    onClick={() => {

                      navigate(
                        `/blog?category=${cat.toLowerCase()}`
                      );

                    }}
                  >

                    <span>
                      {cat}
                    </span>

                  </li>

                )
              )}

            </ul>

          </div>


          {/* RECENT POSTS */}

          <div className="BlogPost-widget">

            <h3 className="BlogPost-widget-title">

              <FaLeaf />

              Recent Posts

            </h3>

            <div className="BlogPost-recent-list">

              {recentBlogs.length >
              0 ? (

                recentBlogs.map(
                  (item) => (

                    <div
                      key={
                        item._id
                      }
                      className="BlogPost-recent-item"
                      onClick={() =>
                        handleOpenBlog(
                          item._id
                        )
                      }
                    >

                      <img
                        src={getImageUrl(
                          item.featuredImage ||
                          item.image
                        )}
                        alt={
                          item.title
                        }
                      />

                      <div>

                        <h4>
                          {
                            item.title
                          }
                        </h4>

                        <span>
                          {formatDate(
                            item.publishDate ||
                            item.createdAt
                          )}
                        </span>

                      </div>

                    </div>

                  )
                )

              ) : (

                <p className="BlogPost-text">
                  No recent posts.
                </p>

              )}

            </div>

          </div>


          {/* NEWSLETTER */}

          <div className="BlogPost-widget BlogPost-newsletter-widget">

            <div className="BlogPost-newsletter-icon-wrap">

              <FaEnvelope />

            </div>

            <h3 className="BlogPost-widget-title">

              Subscribe to Our Newsletter

            </h3>

            <p className="BlogPost-newsletter-text">

              Get the latest articles, tips and updates straight to your inbox.

            </p>

            <form
              onSubmit={
                handleSubscribe
              }
              className="BlogPost-newsletter-form"
            >

              <input
                type="email"
                placeholder="Enter your email"
                value={
                  email
                }
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
                required
              />

              <button type="submit">

                Subscribe

                <FaArrowRight />

              </button>

            </form>

            {subscribed && (

              <p className="BlogPost-success-msg">

                Thank you for subscribing to nature updates!

              </p>

            )}

          </div>

        </aside>

      </div>

    </div>

  );

};

export default BlogPost;