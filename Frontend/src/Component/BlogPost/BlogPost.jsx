import React, { useState } from 'react';
import './BlogPost.css';
import { 
  FaSearch, FaLeaf, FaHeart, FaLungs, FaBolt, FaQuoteLeft, 
  FaCheck, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, 
  FaEnvelope, FaArrowRight, FaClock, FaEye 
} from 'react-icons/fa';

const BlogPost = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      alert(`Searching for: ${searchQuery}`);
    }
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <div className="BlogPost-container">
      {/* Background Animated Forest Elements */}
      <div className="BlogPost-forest-bg">
        <div className="BlogPost-leaf-glow glow-1"></div>
        <div className="BlogPost-leaf-glow glow-2"></div>
      </div>

      <div className="BlogPost-content-wrapper">
        
        {/* Main Content Area */}
        <main className="BlogPost-main">
          
          {/* Featured Image & Intro */}
          <div className="BlogPost-hero-card">
            <div className="BlogPost-hero-image-wrapper">
              <img 
                src="https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80" 
                alt="Forest stream" 
                className="BlogPost-hero-img"
              />
            </div>
            <p className="BlogPost-text">
              Nature has an incredible way of healing our minds, bodies, and souls. In today's fast-paced world, taking time to connect with the natural world is more important than ever. Research shows that spending time in green environments reduces stress, boosts mood, and improves overall well-being.
            </p>
            <p className="BlogPost-text">
              The calmness of forests, the freshness of air, and the soothing sounds of flowing water create a sense of peace that no modern technology can match. Nature doesn't just inspire us — it restores us.
            </p>
          </div>

          {/* Benefits Section */}
          <section className="BlogPost-section">
            <h2 className="BlogPost-section-title">
              <FaLeaf className="BlogPost-title-icon" /> Benefits of Spending Time in Nature
            </h2>
            <div className="BlogPost-benefits-grid">
              <div className="BlogPost-benefit-card">
                <div className="BlogPost-benefit-icon"><FaLeaf /></div>
                <div className="BlogPost-benefit-info">
                  <h3>Reduces Stress</h3>
                  <p>Natural surroundings lower cortisol levels and help you relax.</p>
                </div>
              </div>
              <div className="BlogPost-benefit-card">
                <div className="BlogPost-benefit-icon"><FaHeart /></div>
                <div className="BlogPost-benefit-info">
                  <h3>Improves Mental Health</h3>
                  <p>Fresh air and greenery uplift mood and reduce anxiety.</p>
                </div>
              </div>
              <div className="BlogPost-benefit-card">
                <div className="BlogPost-benefit-icon"><FaLungs /></div>
                <div className="BlogPost-benefit-info">
                  <h3>Better Breathing</h3>
                  <p>Clean, oxygen-rich air strengthens your lungs and immunity.</p>
                </div>
              </div>
              <div className="BlogPost-benefit-card">
                <div className="BlogPost-benefit-icon"><FaBolt /></div>
                <div className="BlogPost-benefit-info">
                  <h3>Recharges Energy</h3>
                  <p>Time in nature refreshes the mind and boosts productivity.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Quote Card */}
          <div className="BlogPost-quote-card">
            <FaQuoteLeft className="BlogPost-quote-icon-bg" />
            <p className="BlogPost-quote-text">
              "Look deep into nature, and then you will understand everything better."
            </p>
            <span className="BlogPost-quote-author">— Albert Einstein</span>
          </div>

          {/* Tips Section */}
          <section className="BlogPost-section">
            <h2 className="BlogPost-section-title">
              <FaLeaf className="BlogPost-title-icon" /> Tips to Reconnect with Nature
            </h2>
            <ul className="BlogPost-tips-list">
              <li><span className="BlogPost-check"><FaCheck /></span> Take regular walks in parks or forest trails.</li>
              <li><span className="BlogPost-check"><FaCheck /></span> Spend time outdoors, away from digital screens.</li>
              <li><span className="BlogPost-check"><FaCheck /></span> Try gardening to bring more greenery into your life.</li>
              <li><span className="BlogPost-check"><FaCheck /></span> Listen to the natural sounds — birds, wind and flowing water.</li>
              <li><span className="BlogPost-check"><FaCheck /></span> Choose eco-friendly and natural products for a healthier lifestyle.</li>
            </ul>
            <div className="BlogPost-tags">
              <span className="BlogPost-tag-label">Tags:</span>
              {['Nature', 'Health', 'Wellness', 'Eco Life', 'Lifestyle'].map((tag) => (
                <button 
                  key={tag} 
                  className="BlogPost-tag-btn"
                  onClick={() => alert(`Filtered by tag: ${tag}`)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </section>

          {/* Author Box */}
          <div className="BlogPost-author-box">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80" 
              alt="Sabriyana Team" 
              className="BlogPost-author-avatar"
            />
            <div className="BlogPost-author-details">
              <span className="BlogPost-written-by">Written by</span>
              <h4 className="BlogPost-author-name">Sabriyana Team <FaLeaf className="BlogPost-inline-leaf" /></h4>
              <p className="BlogPost-author-bio">Passionate about nature, health and pure products for a better and greener tomorrow.</p>
            </div>
            <div className="BlogPost-social-icons">
              <a href="#facebook" onClick={(e) => e.preventDefault()}><FaFacebookF /></a>
              <a href="#twitter" onClick={(e) => e.preventDefault()}><FaTwitter /></a>
              <a href="#instagram" onClick={(e) => e.preventDefault()}><FaInstagram /></a>
              <a href="#linkedin" onClick={(e) => e.preventDefault()}><FaLinkedinIn /></a>
            </div>
          </div>

          {/* Related Blog Posts */}
          <section className="BlogPost-section">
            <div className="BlogPost-flex-header">
              <h2 className="BlogPost-section-title">
                <FaLeaf className="BlogPost-title-icon" /> Related Blog Posts
              </h2>
              <button className="BlogPost-view-all-btn" onClick={() => alert('Viewing all blog posts')}>
                View All <FaArrowRight />
              </button>
            </div>
            
            <div className="BlogPost-related-grid">
              
              <div className="BlogPost-related-card">
                <div className="BlogPost-related-img-wrap">
                  <img src="https://images.unsplash.com/photo-1471943311424-646960669fbc?auto=format&fit=crop&w=600&q=80" alt="Benefits of Pure Forest Honey" />
                </div>
                <div className="BlogPost-related-content">
                  <h3>Benefits of Pure Forest Honey</h3>
                  <div className="BlogPost-post-meta">
                    <span><FaClock /> 4 min read</span>
                    <span><FaEye /> 1.2k views</span>
                  </div>
                </div>
              </div>

              <div className="BlogPost-related-card">
                <div className="BlogPost-related-img-wrap">
                  <img src="https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=600&q=80" alt="The Art of Chocolate Making" />
                </div>
                <div className="BlogPost-related-content">
                  <h3>The Art of Chocolate Making</h3>
                  <div className="BlogPost-post-meta">
                    <span><FaClock /> 5 min read</span>
                    <span><FaEye /> 950 views</span>
                  </div>
                </div>
              </div>

              <div className="BlogPost-related-card">
                <div className="BlogPost-related-img-wrap">
                  <img src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=600&q=80" alt="Why Choose Natural Products" />
                </div>
                <div className="BlogPost-related-content">
                  <h3>Why Choose Natural Products</h3>
                  <div className="BlogPost-post-meta">
                    <span><FaClock /> 3 min read</span>
                    <span><FaEye /> 2.1k views</span>
                  </div>
                </div>
              </div>

            </div>
          </section>

        </main>

        {/* Sidebar Area */}
        <aside className="BlogPost-sidebar">
          
          {/* Search Widget */}
          <div className="BlogPost-widget">
            <h3 className="BlogPost-widget-title"><FaSearch /> Search Blog</h3>
            <form onSubmit={handleSearch} className="BlogPost-search-form">
              <input 
                type="text" 
                placeholder="Search articles..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit"><FaSearch /></button>
            </form>
          </div>

          {/* Categories Widget */}
          <div className="BlogPost-widget">
            <h3 className="BlogPost-widget-title"><FaLeaf /> Categories</h3>
            <ul className="BlogPost-categories-list">
              {[
                { name: 'Nature', count: 17 },
                { name: 'Honey', count: 4 },
                { name: 'Chocolate', count: 10 },
                { name: 'Health', count: 14 },
                { name: 'Recipes', count: 6 },
                { name: 'Lifestyle', count: 7 }
              ].map((cat) => (
                <li 
                  key={cat.name} 
                  className={activeCategory === cat.name ? 'active' : ''}
                  onClick={() => setActiveCategory(cat.name)}
                >
                  <span>{cat.name}</span>
                  <span className="BlogPost-cat-count">({cat.count})</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Recent Posts Widget */}
          <div className="BlogPost-widget">
            <h3 className="BlogPost-widget-title"><FaLeaf /> Recent Posts</h3>
            <div className="BlogPost-recent-list">
              
              <div className="BlogPost-recent-item" onClick={() => alert('Opening: Benefits of Pure Forest Honey')}>
                <img src="https://images.unsplash.com/photo-1471943311424-646960669fbc?auto=format&fit=crop&w=150&q=80" alt="Honey" />
                <div>
                  <h4>Benefits of Pure Forest Honey</h4>
                  <span>20 Jul 2026</span>
                </div>
              </div>

              <div className="BlogPost-recent-item" onClick={() => alert('Opening: Daily Habits for a Better You')}>
                <img src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=150&q=80" alt="Meditation" />
                <div>
                  <h4>Daily Habits for a Better You</h4>
                  <span>18 Jul 2026</span>
                </div>
              </div>

              <div className="BlogPost-recent-item" onClick={() => alert('Opening: Healthy Recipes with Honey')}>
                <img src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=150&q=80" alt="Food" />
                <div>
                  <h4>Healthy Recipes with Honey</h4>
                  <span>15 Jul 2026</span>
                </div>
              </div>

            </div>
          </div>

          {/* Newsletter Widget */}
          <div className="BlogPost-widget BlogPost-newsletter-widget">
            <div className="BlogPost-newsletter-icon-wrap"><FaEnvelope /></div>
            <h3 className="BlogPost-widget-title">Subscribe to Our Newsletter</h3>
            <p className="BlogPost-newsletter-text">Get the latest articles, tips and updates straight to your inbox.</p>
            
            <form onSubmit={handleSubscribe} className="BlogPost-newsletter-form">
              <input 
                type="email" 
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit">
                Subscribe <FaArrowRight />
              </button>
            </form>
            {subscribed && (
              <p className="BlogPost-success-msg">Thank you for subscribing to nature updates!</p>
            )}
          </div>

        </aside>

      </div>
    </div>
  );
};

export default BlogPost;