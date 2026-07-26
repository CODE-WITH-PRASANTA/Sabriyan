import React, { useState, useEffect } from 'react';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';
import { FaStar } from 'react-icons/fa';
import './Testimonial.css';

const testimonialData = [
  {
    id: 1,
    name: 'Ananya Sharma',
    status: 'Verified Buyer',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
    quote: '"The rich taste and smooth texture of Sabriyana chocolates are absolutely divine!"',
  },
  {
    id: 2,
    name: 'Rahul Verma',
    status: 'Verified Buyer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    quote: '"Finally, a chocolate that\'s healthy, premium, and tastes incredible!"',
  },
  {
    id: 3,
    name: 'Meera Kapoor',
    status: 'Verified Buyer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    quote: '"I love that it\'s made with desi khaand and zero refined sugar."',
  },
  {
    id: 4,
    name: 'Vikram Singh',
    status: 'Verified Buyer',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
    quote: '"The stone-crafted texture brings out the real essence of chocolate!"',
  },
  {
    id: 5,
    name: 'Priya Nair',
    status: 'Verified Buyer',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop',
    quote: '"Pure ingredients and guilt-free sweetness! Truly an artisanal experience."',
  },
  {
    id: 6,
    name: 'Aarav Patel',
    status: 'Verified Buyer',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&auto=format&fit=crop',
    quote: '"The authentic single-origin cocoa flavor profile is completely unmatched."',
  }
];

const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(4);

  // Dynamically calculate visible cards for smooth responsive shifting
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

  const maxIndex = Math.max(0, testimonialData.length - cardsToShow);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  // Calculates percentage offset based on card width + gap proportion
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

      {/* Main Slider Area */}
      <div className="Testimonial-sliderContainer">
        {/* Left Arrow */}
        <button 
          className="Testimonial-arrowBtn" 
          onClick={handlePrev}
          aria-label="Previous Testimonials"
        >
          <LuChevronLeft className="Testimonial-arrowIcon" />
        </button>

        {/* Masked Viewport */}
        <div className="Testimonial-carouselViewport">
          <div 
            className="Testimonial-carouselTrack"
            style={{
              transform: `translateX(calc(-${translateOffset}% - ${currentIndex * 1}rem / ${cardsToShow}))`,
            }}
          >
            {testimonialData.map((item) => (
              <div key={item.id} className="Testimonial-card">
                {/* Profile Meta */}
                <div className="Testimonial-profile">
                  <img src={item.avatar} alt={item.name} className="Testimonial-avatar" />
                  <div className="Testimonial-profileMeta">
                    <h3 className="Testimonial-authorName">{item.name}</h3>
                    <span className="Testimonial-badge">{item.status}</span>
                  </div>
                </div>

                {/* Review Quote */}
                <p className="Testimonial-quote">{item.quote}</p>

                {/* Stars */}
                <div className="Testimonial-stars">
                  {[...Array(5)].map((_, i) => (
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
        >
          <LuChevronRight className="Testimonial-arrowIcon" />
        </button>
      </div>

      {/* Pagination Dots */}
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
    </section>
  );
};

export default Testimonial;