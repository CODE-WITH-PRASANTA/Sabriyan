import React, { useState, useEffect } from 'react';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';
import { FaStar } from 'react-icons/fa';
import './Testimonial.css';
import API, { IMG_URL } from "../../api/axios";

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(4);

  // 1. Fetch Testimonials from Express API
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        // Fetch active testimonials dynamically
        const response = await API.get('/testimonials', {
          params: { status: 'Active', limit: 20 }
        });

        if (response.data && response.data.success) {
          setTestimonials(response.data.data);
        }
      } catch (err) {
        console.error('Failed to fetch testimonials:', err);
        setError('Unable to load customer reviews.');
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  // 2. Dynamic helper to resolve media assets without hardcoded host URLs
  const getImageUrl = (imagePath) => {
    if (!imagePath) return "https://via.placeholder.com/150";
    
    // Return direct absolute URLs (e.g. S3 or external hosting) as-is
    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
      return imagePath;
    }
    
    const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;

    // Dynamically derive host from IMG_URL or fallback to relative server origin
    if (IMG_URL) {
      return `${IMG_URL}${cleanPath}`;
    }

    // Fallback to extracting root URL from configured Axios baseURL if available
    if (API.defaults?.baseURL) {
      try {
        const urlObj = new URL(API.defaults.baseURL);
        return `${urlObj.origin}${cleanPath}`;
      } catch (e) {
        // Ignored
      }
    }

    // Default relative path resolution
    return cleanPath;
  };

  // 3. Calculate visible cards for responsive shifting
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardsToShow(1);
      } else if (window.innerWidth < 1024) {
        setCardsToShow(2);
      } else {
        setCardsToShow(4);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate sliding bounds based on fetched items length
  const maxIndex = Math.max(0, testimonials.length - cardsToShow);

  // Keep index within valid range on screen resize
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [maxIndex, currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  // Calculate offset percentage
  const translateOffset = currentIndex * (100 / cardsToShow);

  return (
    <section className="Testimonial">
      {/* Header */}
      <div className="Testimonial-header">
        <span className="Testimonial-subtitle">CUSTOMER LOVE</span>
        <h2 className="Testimonial-title">
          Loved By Chocolate <span className="Testimonial-titleHighlight">Connoisseurs</span>
        </h2>
      </div>

      {/* Loading / Error / Empty States */}
      {loading ? (
        <div className="Testimonial-statusState" style={{ textAlign: 'center', padding: '40px 0', color: '#666' }}>
          <p>Loading chocolate reviews...</p>
        </div>
      ) : error ? (
        <div className="Testimonial-statusState" style={{ textAlign: 'center', padding: '40px 0', color: '#e74c3c' }}>
          <p>{error}</p>
        </div>
      ) : testimonials.length === 0 ? (
        <div className="Testimonial-statusState" style={{ textAlign: 'center', padding: '40px 0', color: '#666' }}>
          <p>No customer reviews available yet.</p>
        </div>
      ) : (
        <>
          {/* Main Slider Area */}
          <div className="Testimonial-sliderContainer">
            {/* Left Arrow */}
            <button 
              className="Testimonial-arrowBtn" 
              onClick={handlePrev}
              aria-label="Previous Testimonials"
              disabled={testimonials.length <= cardsToShow}
            >
              <LuChevronLeft className="Testimonial-arrowIcon" />
            </button>

            {/* Viewport Track */}
            <div className="Testimonial-carouselViewport">
              <div 
                className="Testimonial-carouselTrack"
                style={{
                  transform: `translateX(calc(-${translateOffset}% - ${currentIndex * 1}rem / ${cardsToShow}))`,
                }}
              >
                {testimonials.map((item) => (
                  <div key={item._id || item.id} className="Testimonial-card">
                    {/* Profile Meta */}
                    <div className="Testimonial-profile">
                      <img 
                        src={getImageUrl(item.image)} 
                        alt={item.customerName} 
                        className="Testimonial-avatar" 
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://via.placeholder.com/150";
                        }}
                      />
                      <div className="Testimonial-profileMeta">
                        <h3 className="Testimonial-authorName">{item.customerName}</h3>
                        <span className="Testimonial-badge">
                          {item.designation || 'Verified Buyer'}
                        </span>
                      </div>
                    </div>

                    {/* Review Quote */}
                    <p className="Testimonial-quote">"{item.review}"</p>

                    {/* Dynamic Rating Stars */}
                    <div className="Testimonial-stars">
                      {[...Array(item.rating || 5)].map((_, i) => (
                        <FaStar key={i} className="Testimonial-starIcon" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Arrow */}
            <button 
              className="Testimonial-arrowBtn" 
              onClick={handleNext}
              aria-label="Next Testimonials"
              disabled={testimonials.length <= cardsToShow}
            >
              <LuChevronRight className="Testimonial-arrowIcon" />
            </button>
          </div>

          {/* Pagination Dots */}
          {maxIndex > 0 && (
            <div className="Testimonial-pagination">
              {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                <button
                  key={index}
                  className={`Testimonial-dot ${index === currentIndex ? 'Testimonial-dotActive' : ''}`}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Go to slide group ${index + 1}`}
                />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default Testimonial;