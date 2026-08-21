import React, { useState } from 'react';
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

// LOCAL IMAGE IMPORTS
import jungleBg from '../../assets/blog.webp';
import featuredStoryImg from '../../assets/honey-6.webp'; // Adjust filename/path as needed

// Animated SVG Bee Component
const AnimatedBee = ({ className }) => (
  <svg viewBox="0 0 64 64" fill="none" className={`ourBlog-bee-svg ${className}`}>
    <g className="ourBlog-bee-wings">
      <ellipse cx="24" cy="18" rx="14" ry="7" fill="rgba(255, 255, 255, 0.85)" transform="rotate(-35 24 18)" />
      <ellipse cx="40" cy="18" rx="14" ry="7" fill="rgba(255, 255, 255, 0.85)" transform="rotate(35 40 18)" />
    </g>
    <ellipse cx="32" cy="38" rx="18" ry="22" fill="#D8B15B" />
    <path d="M16 32 C 24 35, 40 35, 48 32" stroke="#10281A" strokeWidth="4" strokeLinecap="round" />
    <path d="M15 40 C 24 43, 40 43, 49 40" stroke="#10281A" strokeWidth="4" strokeLinecap="round" />
    <path d="M18 48 C 25 50, 39 50, 46 48" stroke="#10281A" strokeWidth="4" strokeLinecap="round" />
    <circle cx="32" cy="18" r="8" fill="#10281A" />
  </svg>
);

const categories = [
  { id: 'all', label: 'All', icon: <FaLeaf /> },
  { id: 'honey', label: 'Honey', icon: <GiHoneyJar /> },
  { id: 'chocolate', label: 'Chocolate', icon: <FaCookieBite /> },
  { id: 'recipes', label: 'Recipes', icon: <FaBreadSlice /> },
  { id: 'health', label: 'Health', icon: <FaHeart /> },
  { id: 'nature', label: 'Nature', icon: <FaLeaf /> },
  { id: 'lifestyle', label: 'Lifestyle', icon: <FaCoffee /> }
];

const blogPostsData = [
  {
    id: 1,
    category: 'nature',
    title: 'The Healing Power of Nature',
    description: 'Discover how spending time in deep forest trails can improve mood, reduce stress, and bring total balance to your mind.',
    image: 'https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800',
    badge: 'Nature',
    date: '25 Jul 2026',
    views: '1.2k',
    readTime: '4 min read'
  },
  {
    id: 2,
    category: 'honey',
    title: 'Benefits of Pure Forest Honey',
    description: 'Unfiltered, raw honey contains powerful antioxidants and enzymes. Here is how organic liquid gold boosts your immunity.',
    image: 'https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg?auto=compress&cs=tinysrgb&w=800',
    badge: 'Honey',
    date: '23 Jul 2026',
    views: '980',
    readTime: '3 min read'
  },
  {
    id: 3,
    category: 'health',
    title: 'Daily Habits for a Better You',
    description: 'Simple morning rituals, proper hydration, and herbal nutrition habits to elevate physical vitality and mental peace.',
    image: 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=800',
    badge: 'Health',
    date: '21 Jul 2026',
    views: '860',
    readTime: '5 min read'
  },
  {
    id: 4,
    category: 'chocolate',
    title: 'Artisanal Craft Dark Chocolate',
    description: 'From single-origin cocoa bean sourcing to dark cocoa roasting. Explore the rich heritage of handcrafted chocolates.',
    image: 'https://images.pexels.com/photos/65882/chocolate-dark-coffee-confiserie-65882.jpeg?auto=compress&cs=tinysrgb&w=800',
    badge: 'Chocolate',
    date: '19 Jul 2026',
    views: '2.4k',
    readTime: '6 min read'
  },
  {
    id: 5,
    category: 'recipes',
    title: 'Honey Glazed Artisan Treats',
    description: 'Learn how to bake mouth-watering desserts using raw forest honey instead of refined sugar for a wholesome sweet bite.',
    image: 'https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg?auto=compress&cs=tinysrgb&w=800',
    badge: 'Recipes',
    date: '17 Jul 2026',
    views: '1.5k',
    readTime: '7 min read'
  },
  {
    id: 6,
    category: 'lifestyle',
    title: 'Mindful Morning Ceremonies',
    description: 'Slow down your day with a warm botanical infusion, dark chocolate nibs, and quiet reflection in a natural space.',
    image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800',
    badge: 'Lifestyle',
    date: '15 Jul 2026',
    views: '1.1k',
    readTime: '4 min read'
  },
  {
    id: 7,
    category: 'honey',
    title: 'Sustainable Beekeeping Secrets',
    description: 'How ethical forest apiaries protect honeybee colonies while harvesting pure, natural honey without harming hives.',
    image: 'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&w=800',
    badge: 'Honey',
    date: '12 Jul 2026',
    views: '1.8k',
    readTime: '5 min read'
  },
  {
    id: 8,
    category: 'chocolate',
    title: 'Dark Cocoa & Health Benefits',
    description: 'Why 85% dark cacao is loaded with flavonoids, lowers blood pressure, and improves cognitive brain function.',
    image: 'https://images.pexels.com/photos/918327/pexels-photo-918327.jpeg?auto=compress&cs=tinysrgb&w=800',
    badge: 'Chocolate',
    date: '10 Jul 2026',
    views: '3.1k',
    readTime: '4 min read'
  },
  {
    id: 9,
    category: 'recipes',
    title: 'Rich Honey-Chocolate Mousse',
    description: 'A 4-ingredient decadent recipe blending velvety dark chocolate ganache with fragrant wildflower honey.',
    image: 'https://images.pexels.com/photos/3026808/pexels-photo-3026808.jpeg?auto=compress&cs=tinysrgb&w=800',
    badge: 'Recipes',
    date: '08 Jul 2026',
    views: '2.7k',
    readTime: '6 min read'
  }
];

const OurBlog = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [bookmarked, setBookmarked] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  // Display 3 posts per page
  const postsPerPage = 3;

  const toggleBookmark = (id) => {
    setBookmarked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Filter posts based on category selection
  const filteredPosts = activeCategory === 'all' 
    ? blogPostsData 
    : blogPostsData.filter((post) => post.category === activeCategory);

  // Pagination calculation logic
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage) || 1;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Reset pagination to Page 1 on category switch
  const handleCategoryChange = (catId) => {
    setActiveCategory(catId);
    setCurrentPage(1);
  };

  return (
    <section className="ourBlog">
      {/* Background Layers */}
      <div className="ourBlog-bg-layer1"></div>
      <div 
        className="ourBlog-bg-layer2" 
        style={{ backgroundImage: `url(${jungleBg})` }}
      ></div>
      <div className="ourBlog-bg-layer3"></div>
      <div className="ourBlog-bg-layer4"></div>

      {/* Decorative Fireflies */}
      <div className="ourBlog-fireflies">
        {Array.from({ length: 15 }).map((_, i) => (
          <span key={i} className={`ourBlog-firefly fly-${i + 1}`}></span>
        ))}
      </div>

      {/* Flying SVG Bees */}
      <AnimatedBee className="bee-1" />
      <AnimatedBee className="bee-2" />

      {/* Main Content Container */}
      <div className="ourBlog-container">
        
        {/* STEP 2 — Hero Section */}
        <header className="ourBlog-hero">
          <div className="ourBlog-hero-left">
            <h1 className="ourBlog-hero-title">
              Our <span className="title-green">Blog</span>
            </h1>
            <p className="ourBlog-hero-desc">
              Explore stories, tips, and insights about nature, honey, wellness and a better life.
            </p>
            <div className="ourBlog-hero-decoration"></div>
          </div>

          {/* STEP 3 — Featured Top-Right Hero Image */}
          <div className="ourBlog-hero-right">
            <div className="ourBlog-featured-frame">
              <img 
                src={featuredStoryImg} 
                alt="Featured Story" 
                className="ourBlog-featured-img" 
              />
              <div className="ourBlog-featured-overlay"></div>
              <div className="ourBlog-featured-badge">Featured Story</div>
            </div>
          </div>
        </header>

        {/* STEP 5 — Category Filter Tabs */}
        <nav className="ourBlog-categories">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`ourBlog-category-btn ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => handleCategoryChange(cat.id)}
            >
              <span className="ourBlog-cat-icon">{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </nav>

        {/* STEP 6 — Blog Grid (3 Cards Per Page) */}
        <main className="ourBlog-grid">
          {currentPosts.length > 0 ? (
            currentPosts.map((post) => (
              <article key={post.id} className="ourBlog-card">
                
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
                    <span>{post.badge}</span>
                  </div>

                  {/* Bookmark Button */}
                  <button 
                    className={`ourBlog-card-bookmark ${bookmarked[post.id] ? 'active' : ''}`}
                    onClick={() => toggleBookmark(post.id)}
                    aria-label="Bookmark post"
                  >
                    {bookmarked[post.id] ? <FaBookmark /> : <FaRegBookmark />}
                  </button>
                </div>

                {/* Card Body */}
                <div className="ourBlog-card-body">
                  
                  {/* Meta Information */}
                  <div className="ourBlog-card-meta">
                    <span className="meta-item">
                      <FaCalendarAlt /> {post.date}
                    </span>
                    <span className="meta-item">
                      <FaEye /> {post.views}
                    </span>
                    <span className="meta-item">
                      <FaClock /> {post.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="ourBlog-card-title">{post.title}</h3>

                  {/* Description */}
                  <p className="ourBlog-card-desc">{post.description}</p>

                  {/* Action Footer */}
                  <div className="ourBlog-card-footer">
                    <button className="ourBlog-card-btn">
                      <span>Read More</span>
                      <FaArrowRight className="btn-arrow" />
                    </button>
                  </div>

                </div>
              </article>
            ))
          ) : (
            <div className="ourBlog-no-posts">
              <h3>No articles found in this category.</h3>
              <p>Check back soon for new articles!</p>
            </div>
          )}
        </main>

        {/* STEP 16 — Working Pagination */}
        {filteredPosts.length > 0 && (
          <div className="ourBlog-pagination">
            <button 
              className="ourBlog-page-btn prev" 
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>

            {Array.from({ length: totalPages }).map((_, index) => {
              const pageNum = index + 1;
              return (
                <button
                  key={pageNum}
                  className={`ourBlog-page-btn ${currentPage === pageNum ? 'active' : ''}`}
                  onClick={() => setCurrentPage(pageNum)}
                >
                  {pageNum}
                </button>
              );
            })}

            <button 
              className="ourBlog-page-btn next" 
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
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