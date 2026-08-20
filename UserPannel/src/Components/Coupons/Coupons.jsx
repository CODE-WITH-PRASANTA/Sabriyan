import React, { useState } from 'react';
import './Coupons.css';
import { 
  FiCopy, 
  FiCheck, 
  FiCalendar, 
  FiCheckCircle 
} from 'react-icons/fi';
import { LuTicketPercent } from 'react-icons/lu';

const COUPONS_DATA = [
  {
    id: 1,
    code: 'SABRI20',
    title: 'SABRIO',
    category: 'Seasonal Offers',
    iconEmoji: '🍫',
    discount: 'Get 20% OFF on orders above ₹999',
    validity: 'Valid till 31 May 2025',
    colorTheme: 'theme-orange'
  },
  {
    id: 2,
    code: 'HONEY15',
    title: 'HONEY15',
    category: 'Honey Offers',
    iconEmoji: '🍯',
    discount: 'Get 15% OFF on Honey products',
    validity: 'Valid till 15 June 2025',
    colorTheme: 'theme-pink'
  },
  {
    id: 3,
    code: 'CHOCOLATE10',
    title: 'CHOCOLATE10',
    category: 'Chocolate Offers',
    iconEmoji: '🍫',
    discount: 'Flat 10% OFF on all chocolates',
    validity: 'Valid till 30 June 2025',
    colorTheme: 'theme-brown'
  },
  {
    id: 4,
    code: 'WELCOME5',
    title: 'WELCOME5',
    category: 'Seasonal Offers',
    iconEmoji: '🎁',
    discount: 'Extra 5% OFF on your first order',
    validity: 'Valid till 30 June 2025',
    colorTheme: 'theme-purple'
  }
];

const TABS = ['All Coupons', 'Chocolate Offers', 'Honey Offers', 'Seasonal Offers'];

const Coupons = () => {
  const [activeTab, setActiveTab] = useState('All Coupons');
  const [copiedCode, setCopiedCode] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setToastMessage(`Coupon code "${code}" copied to clipboard!`);

    setTimeout(() => {
      setCopiedCode(null);
    }, 2500);

    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  const filteredCoupons = COUPONS_DATA.filter((coupon) => {
    if (activeTab === 'All Coupons') return true;
    return coupon.category === activeTab;
  });

  return (
    <div className="coupons-wrapper">
      {/* Toast Notification */}
      {toastMessage && <div className="coupons-toast">{toastMessage}</div>}

      {/* Header */}
      <div className="coupons-header">
        <div className="coupons-header-icon-box">
          <LuTicketPercent className="coupons-header-icon" />
        </div>
        <div className="coupons-header-text">
          <h1 className="coupons-main-title">Coupons</h1>
          <p className="coupons-sub-title">
            Use coupons to get exciting discounts on your orders. <span className="heart-emoji">❤️</span>
          </p>
        </div>
      </div>

      {/* Navigation Filter Tabs */}
      <div className="coupons-tabs-bar">
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            className={`coupons-tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Coupons List */}
      <div className="coupons-list">
        {filteredCoupons.map((coupon) => {
          const isCopied = copiedCode === coupon.code;
          return (
            <div key={coupon.id} className="coupons-card">
              {/* Left Ticket Stamp */}
              <div className={`coupons-ticket-badge ${coupon.colorTheme}`}>
                <span className="coupons-code-text">{coupon.code}</span>
                <div className="coupons-badge-divider">
                  <span className="divider-line"></span>
                  <span className="divider-percent">%</span>
                  <span className="divider-line"></span>
                </div>
              </div>

              {/* Middle Coupon Info */}
              <div className="coupons-info-box">
                <div className="coupons-tag-row">
                  <span className="coupons-emoji">{coupon.iconEmoji}</span>
                  <span className="coupons-tag-name">{coupon.title}</span>
                </div>
                <h3 className="coupons-discount-text">{coupon.discount}</h3>
                <div className="coupons-validity-row">
                  <FiCalendar className="validity-icon" />
                  <span>{coupon.validity}</span>
                </div>
              </div>

              {/* Right Action Button & Hint */}
              <div className="coupons-action-box">
                <button
                  type="button"
                  className={`coupons-copy-btn ${isCopied ? 'copied' : ''}`}
                  onClick={() => handleCopyCode(coupon.code)}
                >
                  {isCopied ? (
                    <>
                      <FiCheck className="btn-icon" /> Copied!
                    </>
                  ) : (
                    <>
                      <FiCopy className="btn-icon" /> Copy Code
                    </>
                  )}
                </button>
                <div className="coupons-tap-hint">
                  <FiCheckCircle className="check-hint-icon" />
                  <span>Tap to copy</span>
                </div>
              </div>
            </div>
          );
        })}

        {filteredCoupons.length === 0 && (
          <div className="coupons-empty-box">
            <LuTicketPercent className="empty-icon" />
            <p className="empty-title">No coupons found in this category</p>
            <p className="empty-sub">Check back later for exciting offers and seasonal discounts.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Coupons;