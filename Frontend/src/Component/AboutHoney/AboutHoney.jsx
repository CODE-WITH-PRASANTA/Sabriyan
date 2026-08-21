import React from 'react';
import './AboutHoney.css';

import bgImage from '../../assets/honey-3.png';

const AboutHoney = () => {
  return (
    <section
      className="AboutHoney"
      id="about-sabriyana-honey"
      aria-labelledby="about-honey-title"
    >
      {/* Full Hero Container */}
      <div
        className="AboutHoney-bg"
        style={{ backgroundImage: `url(${bgImage})` }}
      >

        {/* Subtle Ambient Floating Particles */}
        <div className="AboutHoney-particles" aria-hidden="true">
          <span
            className="AboutHoney-sparkle"
            style={{
              top: '25%',
              left: '55%',
              animationDelay: '0s'
            }}
          />

          <span
            className="AboutHoney-sparkle"
            style={{
              top: '65%',
              left: '50%',
              animationDelay: '1.5s'
            }}
          />

          <span
            className="AboutHoney-sparkle"
            style={{
              top: '35%',
              left: '90%',
              animationDelay: '2.8s'
            }}
          />
        </div>

        {/* Translucent Golden Glass Box */}
        <article className="AboutHoney-card">

          {/* SEO Tagline */}
          <div className="AboutHoney-tagline">
            <span className="AboutHoney-star">✦</span>

            <span>
              ABOUT SABRIYANA HONEY
            </span>
          </div>

          {/* Main SEO Heading */}
          <h2
            id="about-honey-title"
            className="AboutHoney-heading"
          >
            Bringing{' '}
            <span className="AboutHoney-highlight">
              Nature's
            </span>
            <br />
            Goodness To You
          </h2>

          {/* Main Human-Written SEO Content */}
          <p className="AboutHoney-description">
            At <strong>Sabriyana</strong>, we believe good honey should
            taste as close to nature as possible. Our journey is rooted
            in a simple idea: bring carefully selected, naturally
            sourced honey from trusted beekeeping environments to
            homes that value authentic taste and quality.
          </p>

          <p className="AboutHoney-description AboutHoney-seoText">
            <strong>Sabriyana honey</strong> is created for people who
            appreciate the natural sweetness and distinctive character
            of genuine honey. From everyday breakfasts to warm drinks
            and homemade recipes, <strong>Sabriyana pure honey</strong>
            is made to become a simple part of everyday life.
          </p>

          {/* Feature Badges */}
          <div className="AboutHoney-features">

            {/* Feature 1 */}
            <div className="AboutHoney-featureItem">

              <div className="AboutHoney-iconWrapper">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                  <polyline points="2 17 12 22 22 17"></polyline>
                  <polyline points="2 12 12 17 22 12"></polyline>
                </svg>
              </div>

              <span className="AboutHoney-featureLabel">
                Naturally<br />
                Sourced
              </span>

            </div>

            <div className="AboutHoney-divider" />

            {/* Feature 2 */}
            <div className="AboutHoney-featureItem">

              <div className="AboutHoney-iconWrapper">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>

              <span className="AboutHoney-featureLabel">
                Carefully<br />
                Harvested
              </span>

            </div>

            <div className="AboutHoney-divider" />

            {/* Feature 3 */}
            <div className="AboutHoney-featureItem">

              <div className="AboutHoney-iconWrapper">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>

                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>

                  <line
                    x1="12"
                    y1="22.08"
                    x2="12"
                    y2="12"
                  ></line>
                </svg>
              </div>

              <span className="AboutHoney-featureLabel">
                Packed with<br />
                Care
              </span>

            </div>

          </div>

          {/* Additional SEO Brand Statement */}
          <p className="AboutHoney-brandText">
            <strong>Sabriyana</strong> brings the same attention to
            quality to every product it creates, from{' '}
            <strong>natural honey</strong> to thoughtfully crafted
            chocolate. With Sabriyana, our goal is simple — create
            food that feels honest, tastes memorable and stays
            connected to nature.
          </p>

          {/* CTA */}
          <button
            className="AboutHoney-button"
            type="button"
          >
            LEARN MORE ABOUT SABRIYANA
          </button>

        </article>

      </div>
    </section>
  );
};

export default AboutHoney;