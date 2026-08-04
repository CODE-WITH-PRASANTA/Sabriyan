import React, { useState, useRef } from 'react'
import API from '../../api/axios'
import { 
  User, 
  Mail, 
  Phone, 
  MessageSquare, 
  Send, 
  Leaf, 
  ShieldCheck, 
  Sparkles,
  Loader2
} from 'lucide-react'
import bgImage from '../../assets/faq.png'
import './MainContact.css'

const MainContact = () => {
  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  // Submit Feedback & Loading States
  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState({ type: null, message: '' })

  const [focusedInput, setFocusedInput] = useState(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const containerRef = useRef(null)

  // Mouse Parallax Handler
  const handleMouseMove = (e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setMousePos({ x, y })
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // Email validation regex helper
  const isValidEmail = (email) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
  }

  // Handle API Submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setFeedback({ type: null, message: '' })

    const sanitizedData = {
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      subject: formData.subject.trim() || 'General Inquiry',
      message: formData.message.trim()
    }

    // Client-side validations
    if (!sanitizedData.fullName || !sanitizedData.email || !sanitizedData.message) {
      setLoading(false)
      setFeedback({
        type: 'error',
        message: 'Please fill in all required fields (Name, Email, Message).'
      })
      return
    }

    if (!isValidEmail(sanitizedData.email)) {
      setLoading(false)
      setFeedback({
        type: 'error',
        message: 'Please enter a valid email address (e.g. name@example.com).'
      })
      return
    }

    try {
      const response = await API.post('/contact', sanitizedData)

      if (response.data && response.data.success) {
        setFeedback({
          type: 'success',
          message: response.data.message || 'Thank you! Your message has been submitted successfully.'
        })
        
        // Reset Form Fields
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        })
      }
    } catch (error) {
      console.error('Error submitting contact form:', error.response?.data || error)
      
      const serverMessage = error.response?.data?.message || 'Failed to submit your message. Please verify your inputs.'
      
      setFeedback({
        type: 'error',
        message: serverMessage
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="main-contact-container"
      itemScope
      itemType="https://schema.org/ContactPage"
    >
      {/* 1. Background Layer with Parallax */}
      <div 
        className="main-contact-bg-wrapper"
        style={{
          transform: `scale(1.02) translate(${mousePos.x * -10}px, ${mousePos.y * -10}px)`
        }}
      >
        <img 
          src={bgImage} 
          alt="Jungle Honey Background" 
          className="main-contact-bg-img" 
        />
        <div className="main-contact-sun-rays" />
        <div className="main-contact-waterfall-overlay" />
        <div className="main-contact-fog" />
      </div>

      {/* 2. Dynamic Floating Fireflies Layer */}
      <div className="main-contact-fireflies-layer">
        {[...Array(30)].map((_, i) => (
          <span 
            key={i} 
            className="main-contact-firefly"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      {/* 3. Floating Animated Leaves Layer */}
      <div 
        className="main-contact-leaves-layer"
        style={{ transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)` }}
      >
        <Leaf className="main-contact-leaf main-contact-leaf-tl" />
        <Leaf className="main-contact-leaf main-contact-leaf-tr" />
        <Leaf className="main-contact-leaf main-contact-leaf-bl" />
        <Leaf className="main-contact-leaf main-contact-leaf-br" />
      </div>

      {/* 4. Honey Dipper Animated Drop */}
      <div className="main-contact-dipper-glow">
        <div className="main-contact-honey-drop" />
      </div>

      {/* 5. Main Glass & Wood Contact Card */}
      <div 
        className="main-contact-card-wrapper"
        style={{ transform: `translate(${mousePos.x * 12}px, ${mousePos.y * 12}px)` }}
      >
        <div className="main-contact-glass-reflection" />
        
        {/* Header */}
        <div className="main-contact-header">
          <h2 className="main-contact-title">Contact Us</h2>
          <p className="main-contact-subtitle">
            We'd love to hear from you! Fill out the form below and we'll get back to you as soon as possible.
          </p>
        </div>

        {/* Feedback Banner */}
        {feedback.message && (
          <div 
            className={`main-contact-alert ${feedback.type}`}
            style={{
              padding: '12px 16px',
              borderRadius: '8px',
              marginBottom: '20px',
              textAlign: 'center',
              fontSize: '0.95rem',
              fontWeight: '500',
              backgroundColor: feedback.type === 'success' ? 'rgba(46, 204, 113, 0.15)' : 'rgba(231, 76, 60, 0.15)',
              color: feedback.type === 'success' ? '#2ecc71' : '#e74c3c',
              border: `1px solid ${feedback.type === 'success' ? '#2ecc71' : '#e74c3c'}`
            }}
          >
            {feedback.message}
          </div>
        )}

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="main-contact-form">
          <div className="main-contact-grid">
            {/* Full Name */}
            <div className={`main-contact-field ${focusedInput === 'fullName' ? 'is-focused' : ''}`}>
              <div className="main-contact-icon-box">
                <User size={20} />
              </div>
              <div className="main-contact-input-wrapper">
                <label className={`main-contact-label ${formData.fullName ? 'has-value' : ''}`}>
                  Your Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  placeholder={focusedInput === 'fullName' ? '' : 'Enter your full name'}
                  value={formData.fullName}
                  onChange={handleChange}
                  onFocus={() => setFocusedInput('fullName')}
                  onBlur={() => setFocusedInput(null)}
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className={`main-contact-field ${focusedInput === 'email' ? 'is-focused' : ''}`}>
              <div className="main-contact-icon-box">
                <Mail size={20} />
              </div>
              <div className="main-contact-input-wrapper">
                <label className={`main-contact-label ${formData.email ? 'has-value' : ''}`}>
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder={focusedInput === 'email' ? '' : 'Enter your email address'}
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedInput('email')}
                  onBlur={() => setFocusedInput(null)}
                  required
                />
              </div>
            </div>

            {/* Phone */}
            <div className={`main-contact-field ${focusedInput === 'phone' ? 'is-focused' : ''}`}>
              <div className="main-contact-icon-box">
                <Phone size={20} />
              </div>
              <div className="main-contact-input-wrapper">
                <label className={`main-contact-label ${formData.phone ? 'has-value' : ''}`}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder={focusedInput === 'phone' ? '' : 'Enter your phone number'}
                  value={formData.phone}
                  onChange={handleChange}
                  onFocus={() => setFocusedInput('phone')}
                  onBlur={() => setFocusedInput(null)}
                />
              </div>
            </div>

            {/* Subject */}
            <div className={`main-contact-field ${focusedInput === 'subject' ? 'is-focused' : ''}`}>
              <div className="main-contact-icon-box">
                <Sparkles size={20} />
              </div>
              <div className="main-contact-input-wrapper">
                <label className={`main-contact-label ${formData.subject ? 'has-value' : ''}`}>
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  placeholder={focusedInput === 'subject' ? '' : 'How can we help you?'}
                  value={formData.subject}
                  onChange={handleChange}
                  onFocus={() => setFocusedInput('subject')}
                  onBlur={() => setFocusedInput(null)}
                />
              </div>
            </div>
          </div>

          {/* Message Area */}
          <div className={`main-contact-field main-contact-textarea-field ${focusedInput === 'message' ? 'is-focused' : ''}`}>
            <div className="main-contact-icon-box">
              <MessageSquare size={20} />
            </div>
            <div className="main-contact-input-wrapper">
              <label className={`main-contact-label ${formData.message ? 'has-value' : ''}`}>
                Message
              </label>
              <textarea
                name="message"
                rows="3"
                placeholder={focusedInput === 'message' ? '' : 'Write your message...'}
                value={formData.message}
                onChange={handleChange}
                onFocus={() => setFocusedInput('message')}
                onBlur={() => setFocusedInput(null)}
                required
              />
            </div>
          </div>

          {/* CTA Submit Button */}
          <button type="submit" className="main-contact-btn" disabled={loading}>
            {loading ? (
              <>
                <Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} />
                <span>Sending...</span>
              </>
            ) : (
              <>
                <Send size={20} />
                <span>Send Message</span>
              </>
            )}
            <div className="main-contact-btn-shimmer" />
          </button>
        </form>

        {/* Feature Badges Footer */}
        <div className="main-contact-features">
          <div className="main-contact-feature-item">
            <Leaf className="main-contact-feature-icon" />
            <div>
              <h4>Natural & Pure</h4>
              <p>100% Natural Products</p>
            </div>
          </div>
          <div className="main-contact-feature-item">
            <ShieldCheck className="main-contact-feature-icon" />
            <div>
              <h4>Trusted Quality</h4>
              <p>We ensure the best for you</p>
            </div>
          </div>
          <div className="main-contact-feature-item">
            <Sparkles className="main-contact-feature-icon" />
            <div>
              <h4>Sustainable</h4>
              <p>Eco-friendly Practices</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainContact