import React, { useState } from 'react';
import './Account.css';

// React Icons
import {
  FiUser,
  FiMail,
  FiPhone,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiCheck,
  FiCoffee,
  FiMapPin,
  FiHeart,
  FiBox
} from 'react-icons/fi';

const Account = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isRegister && formData.password !== formData.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    console.log(
      isRegister ? 'Register Data:' : 'Login Data:',
      formData
    );
  };

  const handleModeChange = (registerMode) => {
    setIsRegister(registerMode);
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  return (
    <div className="account-wrapper">

      <div
        className={`account-container ${
          isRegister
            ? 'account-mode-register'
            : 'account-mode-login'
        }`}
      >

        {/* ================= LEFT / HERO SECTION ================= */}
        <div className="account-hero-panel">

          <div className="account-hero-content">

            {/* Brand Header */}
            <div className="account-brand">

              <div className="account-brand-icon">
                <svg
                  viewBox="0 0 100 100"
                  className="account-logo-svg"
                >
                  <path
                    d="M50 5 C30 25 15 50 25 75 C35 100 65 100 75 75 C85 50 70 25 50 5 Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.5"
                  />

                  <path
                    d="M50 22 C40 38 30 55 38 70 C44 82 56 82 62 70 C70 55 60 38 50 22 Z"
                    fill="currentColor"
                    opacity="0.85"
                  />
                </svg>
              </div>

              <h1 className="account-brand-title">
                SABRIYANA
              </h1>

              <p className="account-brand-subtitle">
                CRAFT CHOCOLATE & HONEY
              </p>

            </div>

            {/* Welcome Text */}
            <div className="account-hero-text">

              <h2>
                {isRegister
                  ? 'Begin Your Journey with Sabriyana'
                  : 'Welcome Back to Sabriyana'}
              </h2>

              <div className="account-divider-line"></div>

              <p>
                Indulge in premium chocolates and pure honey.
                Crafted with love, made for you.
              </p>

            </div>

            {/* Product Showcase */}
            <div className="account-hero-showcase">

              <div className="account-chocolate-card">

                <div className="account-card-logo">

                  <svg
                    viewBox="0 0 100 100"
                    className="account-mini-logo"
                  >
                    <path
                      d="M50 15 C35 32 25 50 32 68 C38 80 62 80 68 68 C75 50 65 32 50 15 Z"
                      fill="currentColor"
                    />
                  </svg>

                  <span>SABRIYANA</span>
                  <small>CRAFT CHOCOLATE</small>

                </div>

                <div className="account-cocoa-percent">

                  <h3>
                    55<sup>%</sup>
                  </h3>

                  <span>COCOA</span>

                </div>

                <div className="account-card-footer">

                  <p>SINGLE ORIGIN</p>

                  <h4>DARK CHOCOLATE</h4>

                  <div className="account-gold-dash"></div>

                  <p className="account-sub-text">
                    BEAN TO BAR FINEST INGREDIENTS
                  </p>

                  <p className="account-origin">
                    india
                  </p>

                  <span className="account-weight">
                    80g
                  </span>

                </div>

              </div>

              {/* Honey & Chocolate Decoration */}
              <div className="account-honey-decor">

                <div className="account-honey-glow"></div>

                <div className="account-honey-jar">
                  🍯
                </div>

                <div className="account-choco-pieces">
                  🍫
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* ================= RIGHT / FORM SECTION ================= */}
        <div className="account-form-panel">

          <div className="account-form-card">

            {/* Header */}
            <div className="account-form-header">

              <h2>
                {isRegister
                  ? 'Create Your Account'
                  : 'Login to Your Account'}
              </h2>

              <p>
                {isRegister
                  ? 'Fill in the details below to get started'
                  : 'Please enter your details to continue'}
              </p>

              {/* Ornament Divider */}
              <div className="account-ornament-divider">

                <span className="account-ornament-line"></span>

                <span className="account-ornament-icon">
                  ✤
                </span>

                <span className="account-ornament-line"></span>

              </div>

            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="account-form"
            >

              {/* Full Name */}
              {isRegister && (
                <div className="account-input-group account-slide-down">

                  <label>Full Name</label>

                  <div className="account-input-box">

                    <FiUser className="account-field-icon" />

                    <input
                      type="text"
                      name="fullName"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                    />

                  </div>

                </div>
              )}

              {/* Email */}
              <div className="account-input-group">

                <label>Email Address</label>

                <div className="account-input-box">

                  <FiMail className="account-field-icon" />

                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />

                </div>

              </div>

              {/* Phone */}
              {isRegister && (
                <div className="account-input-group account-slide-down">

                  <label>Phone Number</label>

                  <div className="account-input-box">

                    <FiPhone className="account-field-icon" />

                    <input
                      type="tel"
                      name="phone"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />

                  </div>

                </div>
              )}

              {/* Password */}
              <div className="account-input-group">

                <label>Password</label>

                <div className="account-input-box">

                  <FiLock className="account-field-icon" />

                  <input
                    type={
                      showPassword
                        ? 'text'
                        : 'password'
                    }
                    name="password"
                    placeholder={
                      isRegister
                        ? 'Create a password'
                        : 'Enter your password'
                    }
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />

                  <button
                    type="button"
                    className="account-password-toggle"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    aria-label={
                      showPassword
                        ? 'Hide password'
                        : 'Show password'
                    }
                  >
                    {showPassword ? (
                      <FiEyeOff />
                    ) : (
                      <FiEye />
                    )}
                  </button>

                </div>

              </div>

              {/* Confirm Password */}
              {isRegister && (
                <div className="account-input-group account-slide-down">

                  <label>Confirm Password</label>

                  <div className="account-input-box">

                    <FiLock className="account-field-icon" />

                    <input
                      type={
                        showConfirmPassword
                          ? 'text'
                          : 'password'
                      }
                      name="confirmPassword"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />

                    <button
                      type="button"
                      className="account-password-toggle"
                      onClick={() =>
                        setShowConfirmPassword(
                          !showConfirmPassword
                        )
                      }
                      aria-label={
                        showConfirmPassword
                          ? 'Hide confirm password'
                          : 'Show confirm password'
                      }
                    >
                      {showConfirmPassword ? (
                        <FiEyeOff />
                      ) : (
                        <FiEye />
                      )}
                    </button>

                  </div>

                </div>
              )}

              {/* Login Options */}
              {!isRegister ? (
                <div className="account-options-row">

                  <label className="account-checkbox-label">

                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) =>
                        setRememberMe(e.target.checked)
                      }
                    />

                    <span className="account-custom-checkbox">
                      {rememberMe && <FiCheck />}
                    </span>

                    <span>
                      Remember me
                    </span>

                  </label>

                  <a
                    href="#forgot"
                    className="account-forgot-link"
                  >
                    Forgot Password?
                  </a>

                </div>
              ) : (

                /* Register Terms */
                <div className="account-terms-row account-slide-down">

                  <label className="account-checkbox-label">

                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) =>
                        setAgreeTerms(e.target.checked)
                      }
                      required
                    />

                    <span className="account-custom-checkbox">
                      {agreeTerms && <FiCheck />}
                    </span>

                    <span>
                      I agree to the{' '}
                      <a href="#terms">
                        Terms & Conditions
                      </a>{' '}
                      and{' '}
                      <a href="#privacy">
                        Privacy Policy
                      </a>
                    </span>

                  </label>

                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="account-submit-btn"
              >

                <span>
                  {isRegister
                    ? 'Register'
                    : 'Login'}
                </span>

                <FiArrowRight className="account-btn-arrow" />

              </button>

              {/* Or Divider */}
              {!isRegister && (
                <div className="account-or-divider">

                  <span className="account-or-line"></span>

                  <span className="account-or-text">
                    or
                  </span>

                  <span className="account-or-line"></span>

                </div>
              )}

              {/* Switch Login/Register */}
              <div className="account-switch-view">

                {isRegister ? (

                  <p>
                    Already have an account?{' '}

                    <button
                      type="button"
                      className="account-switch-btn"
                      onClick={() =>
                        handleModeChange(false)
                      }
                    >
                      Login now
                    </button>
                  </p>

                ) : (

                  <p>
                    Don't have an account?{' '}

                    <button
                      type="button"
                      className="account-switch-btn"
                      onClick={() =>
                        handleModeChange(true)
                      }
                    >
                      Register now
                    </button>
                  </p>

                )}

              </div>

            </form>

          </div>

        </div>

      </div>

      {/* ================= BOTTOM FEATURE BAR ================= */}
      <div className="account-features-bar">

        {/* Premium */}
        <div className="account-feature-item">

          <div className="account-feature-icon-wrapper">
            <FiHeart className="account-feature-icon" />
          </div>

          <div className="account-feature-text">
            <h4>Premium</h4>
            <p>Ingredients</p>
          </div>

        </div>

        {/* Bean to Bar */}
        <div className="account-feature-item">

          <div className="account-feature-icon-wrapper">
            <FiCoffee className="account-feature-icon" />
          </div>

          <div className="account-feature-text">
            <h4>Bean to Bar</h4>
            <p>Crafted</p>
          </div>

        </div>

        {/* Pure Honey */}
        <div className="account-feature-item">

          <div className="account-feature-icon-wrapper">
            <FiBox className="account-feature-icon" />
          </div>

          <div className="account-feature-text">
            <h4>Pure & Natural</h4>
            <p>Honey</p>
          </div>

        </div>

        {/* Made in India */}
        <div className="account-feature-item">

          <div className="account-feature-icon-wrapper">
            <FiMapPin className="account-feature-icon" />
          </div>

          <div className="account-feature-text">
            <h4>Made in</h4>
            <p>India</p>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Account;