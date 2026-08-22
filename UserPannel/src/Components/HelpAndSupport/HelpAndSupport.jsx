import React, { useState } from "react";
import {
  MdSearch,
  MdHeadsetMic,
  MdKeyboardArrowDown,
  MdKeyboardArrowRight,
  MdChat,
  MdEmail,
  MdPhone,
  MdSend,
  MdAccessTime,
  MdSecurity,
  MdDownload,
} from "react-icons/md";
import { FaWhatsapp, FaBox, FaUndo, FaEdit, FaCreditCard, FaTag } from "react-icons/fa";
import "./HelpAndSupport.css";

const HelpAndSupport = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaq, setOpenFaq] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    topic: "",
    orderId: "",
    message: "",
  });

  // FAQs Data
  const faqs = [
    {
      id: 1,
      question: "How can I track my order?",
      answer:
        "You can track your order using the tracking link sent to your registered email or phone number, or by visiting the 'My Orders' section in your account dashboard.",
      icon: <FaBox className="faq-icon-box" />,
    },
    {
      id: 2,
      question: "What is your return and refund policy?",
      answer:
        "We offer a 7-day hassle-free return policy for eligible products. Refunds are processed back to your original payment method within 5-7 business days after approval.",
      icon: <FaUndo className="faq-icon-undo" />,
    },
    {
      id: 3,
      question: "How can I cancel or modify my order?",
      answer:
        "Orders can be cancelled or modified within 2 hours of placement. Go to 'My Orders' and click 'Cancel Order' or reach out directly to our live support team.",
      icon: <FaEdit className="faq-icon-edit" />,
    },
    {
      id: 4,
      question: "What payment methods do you accept?",
      answer:
        "We accept Credit/Debit Cards (Visa, Mastercard), UPI (Google Pay, PhonePe, Paytm), Net Banking, and Cash on Delivery (COD) for eligible pin codes.",
      icon: <FaCreditCard className="faq-icon-card" />,
    },
    {
      id: 5,
      question: "How do I use a coupon code?",
      answer:
        "Enter your coupon code in the 'Apply Promo Code' field at the checkout page before making payment to receive your instant discount.",
      icon: <FaTag className="faq-icon-tag" />,
    },
  ];

  // Handlers
  const handleToggleFaq = (id) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      alert(`Searching for help articles related to: "${searchQuery}"`);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.topic || !formData.message) {
      alert("Please select a topic and enter your message.");
      return;
    }
    alert(
      `Support request submitted successfully!\nTopic: ${formData.topic}\nOrder ID: ${formData.orderId || "N/A"}`
    );
    setFormData({ topic: "", orderId: "", message: "" });
  };

  const handleContactClick = (channel) => {
    switch (channel) {
      case "chat":
        alert("Initiating Live Chat with Support...");
        break;
      case "email":
        window.open("mailto:support@sabriyana.com");
        break;
      case "call":
        window.open("tel:+919876543210");
        break;
      case "whatsapp":
        window.open("https://api.whatsapp.com/send?phone=919876543210");
        break;
      default:
        break;
    }
  };

  const handleDownloadInvoice = () => {
    const content = `
==================================================
           SABRIYANA HELP & SUPPORT DIRECTORY     
==================================================
Customer Support Contact Summary:

Email Support: support@sabriyana.com
Call Support: +91 98765 43210
WhatsApp Support: +91 98765 43210

Support Timings:
Monday - Saturday: 10:00 AM - 07:00 PM
Sunday: Closed

Safety Note:
We never ask for your password or confidential payment details.
==================================================
    `;

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Support_Directory_Sabriyana.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="HelpAndSupport">
      {/* Top Banner Row */}
      <div className="HelpAndSupport_TopGrid">
        {/* Search Header Card */}
        <div className="HelpAndSupport_SearchCard">
          <div className="HelpAndSupport_SearchIconBubble">
            <MdSearch />
          </div>
          <div className="HelpAndSupport_SearchContent">
            <h2 className="HelpAndSupport_SearchTitle">
              How can we help you today?
            </h2>
            <form
              onSubmit={handleSearchSubmit}
              className="HelpAndSupport_SearchForm"
            >
              <input
                type="text"
                placeholder="Search for help articles, topics or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="HelpAndSupport_SearchInput"
              />
              <button type="submit" className="HelpAndSupport_SearchBtn">
                <MdSearch />
                <span>Search</span>
              </button>
            </form>
          </div>
        </div>

        {/* Immediate Help Card */}
        <div className="HelpAndSupport_ImmediateCard">
          <div className="HelpAndSupport_ImmediateLeft">
            <div className="HelpAndSupport_HeadsetIconBubble">
              <MdHeadsetMic />
            </div>
            <div className="HelpAndSupport_ImmediateText">
              <h3 className="HelpAndSupport_ImmediateTitle">
                Need Immediate Help?
              </h3>
              <p className="HelpAndSupport_ImmediateSubtitle">
                Our support team is ready to assist you.
              </p>
              <button
                className="HelpAndSupport_ContactSupportBtn"
                onClick={() => handleContactClick("chat")}
              >
                Contact Support
              </button>
            </div>
          </div>
          <button
            className="HelpAndSupport_DownloadBtn"
            onClick={handleDownloadInvoice}
            title="Download Support Directory"
          >
            <MdDownload />
          </button>
        </div>
      </div>

      {/* Middle Row Grid */}
      <div className="HelpAndSupport_MiddleGrid">
        {/* FAQs Section */}
        <div className="HelpAndSupport_Card HelpAndSupport_FaqCard">
          <div className="HelpAndSupport_FaqHeader">
            <h3 className="HelpAndSupport_CardTitle">
              Frequently Asked Questions
            </h3>
            <button
              className="HelpAndSupport_ViewAllBtn"
              onClick={() => alert("Loading all FAQs...")}
            >
              <span>View All FAQs</span>
              <MdKeyboardArrowRight />
            </button>
          </div>

          <div className="HelpAndSupport_FaqList">
            {faqs.map((faq) => {
              const isOpen = openFaq === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`HelpAndSupport_FaqItem ${isOpen ? "open" : ""}`}
                >
                  <div
                    className="HelpAndSupport_FaqQuestionRow"
                    onClick={() => handleToggleFaq(faq.id)}
                  >
                    <div className="HelpAndSupport_FaqQuestionLeft">
                      <div className="HelpAndSupport_FaqCategoryIcon">
                        {faq.icon}
                      </div>
                      <span className="HelpAndSupport_FaqQuestionText">
                        {faq.question}
                      </span>
                    </div>
                    <MdKeyboardArrowDown
                      className={`HelpAndSupport_FaqArrow ${
                        isOpen ? "rotated" : ""
                      }`}
                    />
                  </div>

                  {isOpen && (
                    <div className="HelpAndSupport_FaqAnswerRow">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Contact Support Channels Section */}
        <div className="HelpAndSupport_Card HelpAndSupport_ChannelsCard">
          <h3 className="HelpAndSupport_CardTitle">Contact Support</h3>
          <p className="HelpAndSupport_CardSubtitle">Choose a way to reach us</p>

          <div className="HelpAndSupport_ChannelsList">
            {/* Live Chat */}
            <div
              className="HelpAndSupport_ChannelItem"
              onClick={() => handleContactClick("chat")}
            >
              <div className="HelpAndSupport_ChannelIcon live-chat">
                <MdChat />
              </div>
              <div className="HelpAndSupport_ChannelInfo">
                <h4 className="HelpAndSupport_ChannelTitle">Live Chat</h4>
                <p className="HelpAndSupport_ChannelDetail">
                  Chat with our support team
                </p>
              </div>
              <MdKeyboardArrowRight className="HelpAndSupport_ChannelArrow" />
            </div>

            {/* Email Support */}
            <div
              className="HelpAndSupport_ChannelItem"
              onClick={() => handleContactClick("email")}
            >
              <div className="HelpAndSupport_ChannelIcon email">
                <MdEmail />
              </div>
              <div className="HelpAndSupport_ChannelInfo">
                <h4 className="HelpAndSupport_ChannelTitle">Email Support</h4>
                <p className="HelpAndSupport_ChannelDetail">
                  support@sabriyana.com
                </p>
              </div>
              <MdKeyboardArrowRight className="HelpAndSupport_ChannelArrow" />
            </div>

            {/* Call Us */}
            <div
              className="HelpAndSupport_ChannelItem"
              onClick={() => handleContactClick("call")}
            >
              <div className="HelpAndSupport_ChannelIcon call">
                <MdPhone />
              </div>
              <div className="HelpAndSupport_ChannelInfo">
                <h4 className="HelpAndSupport_ChannelTitle">Call Us</h4>
                <p className="HelpAndSupport_ChannelDetail">
                  +91 98765 43210
                </p>
                <span className="HelpAndSupport_ChannelSubDetail">
                  (Mon - Sat, 10AM - 7PM)
                </span>
              </div>
              <MdKeyboardArrowRight className="HelpAndSupport_ChannelArrow" />
            </div>

            {/* WhatsApp Support */}
            <div
              className="HelpAndSupport_ChannelItem"
              onClick={() => handleContactClick("whatsapp")}
            >
              <div className="HelpAndSupport_ChannelIcon whatsapp">
                <FaWhatsapp />
              </div>
              <div className="HelpAndSupport_ChannelInfo">
                <h4 className="HelpAndSupport_ChannelTitle">
                  WhatsApp Support
                </h4>
                <p className="HelpAndSupport_ChannelDetail">
                  +91 98765 43210
                </p>
              </div>
              <MdKeyboardArrowRight className="HelpAndSupport_ChannelArrow" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row Grid */}
      <div className="HelpAndSupport_BottomGrid">
        {/* Submit a Request Form Card */}
        <div className="HelpAndSupport_Card HelpAndSupport_FormCard">
          <h3 className="HelpAndSupport_CardTitle">Submit a Request</h3>
          <p className="HelpAndSupport_CardSubtitle">
            Fill in the details and we'll get back to you.
          </p>

          <form onSubmit={handleFormSubmit} className="HelpAndSupport_RequestForm">
            <div className="HelpAndSupport_FormRow">
              <div className="HelpAndSupport_FormGroup">
                <label>Select Topic</label>
                <div className="HelpAndSupport_SelectWrapper">
                  <select
                    name="topic"
                    value={formData.topic}
                    onChange={handleInputChange}
                    className="HelpAndSupport_SelectInput"
                    required
                  >
                    <option value="">-- Select Topic --</option>
                    <option value="Order Issues">Order Issues</option>
                    <option value="Refund & Return">Refund & Return</option>
                    <option value="Payment Issue">Payment Issue</option>

                    <option value="Account Settings">Account Settings</option>
                    <option value="General Inquiry">General Inquiry</option>
                  </select>
                  <MdKeyboardArrowDown className="HelpAndSupport_SelectArrow" />
                </div>
              </div>

              <div className="HelpAndSupport_FormGroup">
                <label>Order ID (Optional)</label>
                <input
                  type="text"
                  name="orderId"
                  placeholder="Enter your order ID"
                  value={formData.orderId}
                  onChange={handleInputChange}
                  className="HelpAndSupport_TextInput"
                />
              </div>
            </div>

            <div className="HelpAndSupport_FormGroup">
              <label>Your Message</label>
              <textarea
                name="message"
                placeholder="Type your message here..."
                rows="4"
                value={formData.message}
                onChange={handleInputChange}
                className="HelpAndSupport_TextareaInput"
                required
              />
            </div>

            <button type="submit" className="HelpAndSupport_SubmitBtn">
              <MdSend />
              <span>Submit Request</span>
            </button>
          </form>
        </div>

        {/* Vector Illustration Banner Box */}
        <div className="HelpAndSupport_Card HelpAndSupport_BannerCard">
          <div className="HelpAndSupport_BannerHeader">
            <h3 className="HelpAndSupport_CardTitle">We're Here to Help!</h3>
            <p className="HelpAndSupport_CardSubtitle">
              Your satisfaction is our priority. Our team is always ready to
              assist you.
            </p>
          </div>

          <div className="HelpAndSupport_IllustrationContainer">
            <svg
              viewBox="0 0 400 240"
              className="HelpAndSupport_SvgGraphic"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="200" cy="180" r="110" fill="#FFF8EE" />

              {/* Chat Bubble Graphic */}
              <g className="chat-bubble">
                <rect
                  x="145"
                  y="65"
                  width="45"
                  height="30"
                  rx="10"
                  fill="#4CAF50"
                />
                <circle cx="158" cy="80" r="2.5" fill="#FFFFFF" />
                <circle cx="167" cy="80" r="2.5" fill="#FFFFFF" />
                <circle cx="176" cy="80" r="2.5" fill="#FFFFFF" />
              </g>

              {/* Female Support Agent Graphic */}
              <g className="agent">
                {/* Hair back */}
                <path
                  d="M210 90 C180 80 180 160 190 190 L260 190 C270 160 270 80 240 90 Z"
                  fill="#2A1810"
                />
                {/* Face */}
                <circle cx="225" cy="115" r="22" fill="#FAD0C4" />
                {/* Headset */}
                <path
                  d="M205 110 C205 90 245 90 245 110"
                  stroke="#333"
                  strokeWidth="3"
                  fill="none"
                />
                <circle cx="204" cy="115" r="5" fill="#333" />
                <path
                  d="M204 118 L218 126"
                  stroke="#333"
                  strokeWidth="2"
                  fill="none"
                />
                <circle cx="220" cy="126" r="3" fill="#333" />
                {/* Yellow Top */}
                <path
                  d="M190 150 C200 135 250 135 260 150 L275 220 L175 220 Z"
                  fill="#ECA82C"
                />
              </g>

              {/* Laptop & Desk Graphic */}
              <g className="desk">
                <rect
                  x="120"
                  y="210"
                  width="210"
                  height="12"
                  rx="3"
                  fill="#C48D53"
                />
                {/* Laptop base & screen */}
                <path d="M150 180 L200 180 L205 210 L145 210 Z" fill="#666" />
                <rect
                  x="147"
                  y="182"
                  width="51"
                  height="26"
                  rx="2"
                  fill="#888"
                />
                <circle cx="172" cy="195" r="3" fill="#DDD" />
              </g>

              {/* Plant Pot */}
              <g className="plant">
                <path d="M295 190 L310 190 L307 210 L298 210 Z" fill="#B06000" />
                <circle cx="300" cy="182" r="7" fill="#81A870" />
                <circle cx="305" cy="185" r="6" fill="#4CAF50" />
              </g>
            </svg>
          </div>
        </div>

        {/* Info Right Column Panel */}
        <div className="HelpAndSupport_SideColumn">
          {/* Support Timings Box */}
          <div className="HelpAndSupport_Card HelpAndSupport_TimingCard">
            <div className="HelpAndSupport_InfoBox">
              <div className="HelpAndSupport_InfoIcon blue">
                <MdAccessTime />
              </div>
              <div className="HelpAndSupport_InfoContent">
                <h4 className="HelpAndSupport_InfoTitle">Support Timings</h4>
                <div className="HelpAndSupport_TimingDetails">
                  <p className="HelpAndSupport_TimingText">Monday - Saturday</p>
                  <p className="HelpAndSupport_TimingSub">
                    10:00 AM - 07:00 PM
                  </p>
                  <p className="HelpAndSupport_TimingText margin-top">Sunday</p>
                  <p className="HelpAndSupport_TimingSub">Closed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Safety Box */}
          <div className="HelpAndSupport_Card HelpAndSupport_SafetyCard">
            <div className="HelpAndSupport_InfoBox">
              <div className="HelpAndSupport_InfoIcon green">
                <MdSecurity />
              </div>
              <div className="HelpAndSupport_InfoContent">
                <h4 className="HelpAndSupport_InfoTitle">
                  Your Safety is Important
                </h4>
                <p className="HelpAndSupport_SafetyDesc">
                  We never ask for your password or payment details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpAndSupport;