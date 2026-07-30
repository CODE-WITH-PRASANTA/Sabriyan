import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, Search, Calendar, Bell, Gift, User, Settings, LogOut, X } from 'lucide-react';
import './Topbar.css';

const Topbar = ({ toggleSidebar, toggleMobileSidebar }) => {
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const notifRef = useRef(null);
  const profileRef = useRef(null);

  // Parse pathnames for breadcrumbs
  const pathNames = location.pathname.split('/').filter((x) => x);
  const currentPageTitle = pathNames.length > 0 
    ? pathNames[pathNames.length - 1].replace(/-/g, ' ') 
    : 'Dashboard';

  // Handle Outside Clicks for Popups
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="topbar">
      {/* Left Section: Nav Trigger & Page Titles */}
      <div className="topbar-left">
        <button className="toggle-btn desktop-only" onClick={toggleSidebar} aria-label="Toggle Desktop Sidebar">
          <Menu size={20} />
        </button>
        <button className="toggle-btn mobile-only" onClick={toggleMobileSidebar} aria-label="Toggle Mobile Menu">
          <Menu size={20} />
        </button>

        <div className="topbar-title-section">
          <h1 className="page-title">{currentPageTitle}</h1>
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <span>Dashboard</span>
            {pathNames.map((name, index) => (
              <React.Fragment key={index}>
                <span className="separator">/</span>
                <span className={index === pathNames.length - 1 ? 'current' : ''}>
                  {name.replace(/-/g, ' ')}
                </span>
              </React.Fragment>
            ))}
          </nav>
        </div>
      </div>

      {/* Right Section: Actions, Search, Notifications, Profile */}
      <div className="topbar-right">
        {/* Desktop Search */}
        <div className="topbar-search desktop-search">
          <Search size={16} className="search-icon" />
          <input type="text" placeholder="Search products, SKU..." />
        </div>

        {/* Mobile Search Toggle Button */}
        <button 
          className="topbar-icon-btn mobile-search-btn"
          onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
          aria-label="Toggle Search"
        >
          <Search size={18} />
        </button>

        {/* Date Selector Display */}
        <div className="topbar-date-badge">
          <Calendar size={15} />
          <span>May 29, 2025</span>
        </div>

        {/* Notification Icon & Dropdown */}
        <div className="topbar-popover-container" ref={notifRef}>
          <button
            className="topbar-icon-btn"
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            aria-label="View Notifications"
          >
            <Bell size={18} />
            <span className="notification-badge">12</span>
          </button>

          {showNotifications && (
            <div className="popover-card notification-card">
              <div className="popover-header">
                <h3>Notifications</h3>
                <span className="badge-count">12 New</span>
              </div>
              <ul className="notification-list">
                <li>
                  <p><strong>Low Stock Alert:</strong> Nut Fusion has 18 items left.</p>
                  <span>2 mins ago</span>
                </li>
                <li>
                  <p><strong>New Order Received:</strong> Order #CHO-004 placed.</p>
                  <span>10 mins ago</span>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Promotion Button */}
        <button className="topbar-icon-btn promo-btn" aria-label="Promotions">
          <Gift size={18} />
        </button>

        {/* Profile Dropdown */}
        <div className="topbar-popover-container" ref={profileRef}>
          <button
            className="topbar-profile-btn"
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            aria-label="User Profile Menu"
          >
            <img src="https://i.pravatar.cc/100?img=12" alt="Admin Avatar" />
          </button>

          {showProfileMenu && (
            <div className="popover-card profile-menu-card">
              <div className="profile-info-header">
                <strong>Admin User</strong>
                <span>admin@sabriyana.com</span>
              </div>
              <hr />
              <ul>
                <li>
                  <User size={16} /> Profile
                </li>
                <li>
                  <Settings size={16} /> Account Settings
                </li>
                <li className="logout-btn">
                  <LogOut size={16} /> Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Expandable Mobile Search Overlay */}
      {isMobileSearchOpen && (
        <div className="mobile-search-overlay">
          <div className="mobile-search-input-wrapper">
            <Search size={16} className="search-icon" />
            <input type="text" placeholder="Search products, orders..." autoFocus />
            <button className="close-search-btn" onClick={() => setIsMobileSearchOpen(false)}>
              <X size={18} />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Topbar;