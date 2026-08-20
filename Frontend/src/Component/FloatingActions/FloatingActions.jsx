import React, { useEffect, useState } from "react";
import {
  FaWhatsapp,
  FaPhoneAlt,
  FaArrowUp,
} from "react-icons/fa";
import "./FloatingActions.css";

const FloatingActions = () => {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleCall = () => {
    window.location.href = "tel:+919876543210";
  };

  const handleWhatsApp = () => {
    const phoneNumber = "919876543210";
    const message = "Hello, I want to know more about your honey products.";

    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  const handleTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="floating-actions">

      {/* Call */}
      <button
        className="floating-btn call-btn"
        onClick={handleCall}
        title="Call Us"
      >
        <FaPhoneAlt />
      </button>

      {/* WhatsApp */}
      <button
        className="floating-btn whatsapp-btn"
        onClick={handleWhatsApp}
        title="WhatsApp"
      >
        <FaWhatsapp />
      </button>

      {/* Back to Top */}
      {showTop && (
        <button
          className="floating-btn top-btn"
          onClick={handleTop}
          title="Back to Top"
        >
          <FaArrowUp />
        </button>
      )}

    </div>
  );
};

export default FloatingActions;