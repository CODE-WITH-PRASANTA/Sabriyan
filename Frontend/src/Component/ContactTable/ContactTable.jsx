import React, { useState, useEffect, useRef } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Mail as MailIcon,
  Leaf
} from 'lucide-react';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import bgImage from '../../assets/faq.webp'; // Your background image path
import './ContactTable.css';

const ContactTable = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [tiltCard, setTiltCard] = useState({ id: null, x: 0, y: 0 });
  const [isMailboxOpen, setIsMailboxOpen] = useState(false);
  const containerRef = useRef(null);

  // Mouse Parallax Effect for the scene
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  // 3D Card Parallax Tilt (Step 14)
  const handleCardMouseMove = (e, cardId) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = (y / (rect.height / 2)) * -6;
    const rotateY = (x / (rect.width / 2)) * 6;
    setTiltCard({ id: cardId, x: rotateY, y: rotateX });
  };

  const handleCardMouseLeave = () => {
    setTiltCard({ id: null, x: 0, y: 0 });
  };

  const contactData = [
    {
      id: 'phone',
      icon: <Phone size={28} />,
      title: 'Phone',
      value: '+91 98765 43210',
      delay: '0.2s'
    },
    {
      id: 'email',
      icon: <Mail size={28} />,
      title: 'Email',
      value: 'hello@sabriyana.com',
      delay: '0.4s'
    },
    {
      id: 'address',
      icon: <MapPin size={28} />,
      title: 'Address',
      value: 'Sabriyana Naturals\nGreen Valley, Forest Road\nCuttack, Odisha – 753001',
      delay: '0.6s'
    },
    {
      id: 'working_hours',
      icon: <Clock size={28} />,
      title: 'Working Hours',
      value: 'Mon – Sat: 9:00 AM – 7:00 PM\nSunday: Closed',
      delay: '0.8s'
    }
  ];

  return (
    <div 
      className="contact-table" 
      ref={containerRef}
      onMouseMove={handleMouseMove}
    >
      {/* Background Image Layer with Parallax */}
      <div 
        className="contact-table-bg-wrapper"
        style={{
          transform: `scale(1.02) translate(${mousePos.x * -12}px, ${mousePos.y * -12}px)`
        }}
      >
        <img 
          src={bgImage} 
          alt="Forest Contact Scene" 
          className="contact-table-bg-img"
        />
        <div className="contact-table-fog-overlay" />
      </div>

      {/* Floating Fireflies Layer (Step 17) */}
      <div className="contact-table-fireflies">
        {[...Array(20)].map((_, i) => (
          <span 
            key={i} 
            className="contact-table-firefly"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 6}s`
            }}
          />
        ))}
      </div>

      {/* Floating Gold Dust Particles (Step 18) */}
      <div className="contact-table-dust">
        {[...Array(15)].map((_, i) => (
          <span 
            key={i} 
            className="contact-table-particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${4 + Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      {/* Main Content Container */}
      <div className="contact-table-container">
        
        {/* Hanging Ropes (Step 2) */}
        <div className="contact-table-ropes">
          <div className="contact-table-rope contact-table-rope-left" />
          <div className="contact-table-rope contact-table-rope-right" />
        </div>

        {/* 3D Wooden Main Board Container (Steps 1 & 3) */}
        <div 
          className="contact-table-board-wrapper"
          style={{
            transform: `translate(${mousePos.x * 15}px, ${mousePos.y * 15}px)`
          }}
        >
          {/* Layer 1: Board Ambient Shadow */}
          <div className="contact-table-layer-shadow" />

          {/* Layer 2: Wooden Frame Outer */}
          <div className="contact-table-wood-frame">
            
            {/* 3D Corner Leaves (Step 4) */}
            <Leaf className="contact-table-3d-leaf leaf-top-left" />
            <Leaf className="contact-table-3d-leaf leaf-top-right" />
            <Leaf className="contact-table-3d-leaf leaf-bottom-left" />
            <Leaf className="contact-table-3d-leaf leaf-bottom-right" />

            {/* Layer 3: Inner Green Glass Panel */}
            <div className="contact-table-green-panel">
              <div className="contact-table-glass-shine" />

              {/* Title Header (Step 5 & 6) */}
              <div className="contact-table-header">
                <h1 className="contact-table-title">Contact Us</h1>
                <p className="contact-table-subtitle">
                  We'd love to hear from you! Reach out to us for any queries, feedback or support.
                </p>
              </div>

              {/* 2x2 Contact Card Grid (Step 7) */}
              <div className="contact-table-grid">
                {contactData.map((card) => {
                  const isTilting = tiltCard.id === card.id;
                  return (
                    <div 
                      key={card.id}
                      className="contact-table-card"
                      style={{
                        animationDelay: card.delay,
                        transform: isTilting 
                          ? `perspective(1000px) rotateX(${tiltCard.y}deg) rotateY(${tiltCard.x}deg) translateZ(15px) translateY(-12px) scale(1.03)`
                          : 'none'
                      }}
                      onMouseMove={(e) => handleCardMouseMove(e, card.id)}
                      onMouseLeave={handleCardMouseLeave}
                    >
                      <div className="contact-table-card-glass-shine" />
                      
                      {/* Gold Icon Circle (Step 11 & 12) */}
                      <div className="contact-table-icon-circle">
                        {card.icon}
                      </div>

                      {/* Card Content */}
                      <div className="contact-table-card-body">
                        <h3 className="contact-table-card-title">{card.title}</h3>
                        <p className="contact-table-card-value">{card.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Interactive Widgets (Social Board & Interactive Mailbox) */}
        <div 
          className="contact-table-bottom-widgets"
          style={{
            transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)`
          }}
        >
          {/* Social Media Board (Step 15) */}
          <div className="contact-table-social-board">
            <h4 className="contact-table-social-title">Follow Us</h4>
            <div className="contact-table-social-icons">
              <a href="#facebook" aria-label="Facebook" className="contact-table-social-btn">
                <FaFacebookF size={20} />
              </a>
              <a href="#instagram" aria-label="Instagram" className="contact-table-social-btn">
                <FaInstagram size={20} />
              </a>
              <a href="#twitter" aria-label="Twitter" className="contact-table-social-btn">
                <FaTwitter size={20} />
              </a>
            </div>
          </div>

          {/* Interactive Mailbox (Step 16) */}
          <div 
            className={`contact-table-mailbox ${isMailboxOpen ? 'is-open' : ''}`}
            onMouseEnter={() => setIsMailboxOpen(true)}
            onMouseLeave={() => setIsMailboxOpen(false)}
          >
            <div className="contact-table-mailbox-door">
              <span className="contact-table-mailbox-knob" />
            </div>
            <div className="contact-table-mailbox-interior">
              <div className="contact-table-envelope">
                <MailIcon size={24} color="#314927" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ContactTable;