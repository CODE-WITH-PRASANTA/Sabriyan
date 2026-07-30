import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Boxes,
  Users,
  Tag,
  Megaphone,
  BarChart3,
  Globe,
  Settings,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  Sparkles,
  X
} from 'lucide-react';
import logo from '../../assets/logo.png';
import './Sidebar.css';

const sidebarConfig = [
  { title: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  {
    title: 'Orders',
    path: '/orders',
    icon: ShoppingBag,
    subItems: [
      { title: 'All Orders', path: '/orders/all' },
      { title: 'Pending', path: '/orders/pending' },
      { title: 'Complete Orders', path: '/orders/complete' },
      { title: 'Cancel Orders', path: '/orders/cancel' },
    ],
  },
  {
    title: 'Products',
    path: '/products',
    icon: Package,
    subItems: [
      { title: 'All Products', path: '/products/all' },
      { title: 'Add New Product', path: '/products/add' },
      { title: 'Categories', path: '/products/categories' },
      { title: 'Brands', path: '/products/brands' },
      { title: 'Attributes', path: '/products/attributes' },
      { title: 'Reviews', path: '/products/reviews' },
    ],
  },
  { title: 'Inventory', path: '/inventory', icon: Boxes },
  { title: 'Customers', path: '/customers', icon: Users },
  { title: 'Coupons & Offers', path: '/coupons', icon: Tag },
  { title: 'Marketing', path: '/marketing', icon: Megaphone },
  { title: 'Reports & Analytics', path: '/reports', icon: BarChart3 },
  { title: 'Website Settings', path: '/website-settings', icon: Globe },
  { title: 'Settings', path: '/settings', icon: Settings },
  { title: 'Support', path: '/support', icon: HelpCircle },
];

const Sidebar = ({ isCollapsed, isMobileOpen, setIsMobileOpen }) => {
  const location = useLocation();
  const [openSubmenu, setOpenSubmenu] = useState('Products');

  const toggleSubmenu = (title) => {
    setOpenSubmenu(openSubmenu === title ? null : title);
  };

  const handleNavClick = () => {
    if (window.innerWidth <= 768) {
      setIsMobileOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div 
          className="sidebar-overlay" 
          onClick={() => setIsMobileOpen(false)} 
          aria-hidden="true"
        />
      )}

      <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''} ${isMobileOpen ? 'mobile-open' : ''}`}>
        {/* Brand Header */}
        <div className="sidebar-header">
          <div className="brand-wrapper">
            <img src={logo} alt="Sabriyana Logo" className="sidebar-logo" />
            {!isCollapsed && (
              <div className="sidebar-brand-text">
                <h3>SABRIYANA</h3>
                <span>CRAFT CHOCOLATE & HONEY</span>
              </div>
            )}
          </div>
          <button 
            className="mobile-close-btn" 
            onClick={() => setIsMobileOpen(false)}
            aria-label="Close Sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Profile Info Card */}
       

        {/* Navigation Menu */}
        <nav className="sidebar-nav">
          <ul>
            {sidebarConfig.map((item) => {
              const Icon = item.icon;
              const hasSub = !!item.subItems;
              const isActive = location.pathname.startsWith(item.path);
              const isSubOpen = openSubmenu === item.title;

              return (
                <li key={item.title} className="sidebar-nav-item">
                  {hasSub ? (
                    <div
                      className={`nav-link ${isActive ? 'active' : ''}`}
                      onClick={() => toggleSubmenu(item.title)}
                      title={isCollapsed ? item.title : undefined}
                    >
                      <span className="nav-icon-wrapper">
                        <Icon size={18} />
                      </span>
                      {!isCollapsed && <span className="nav-title">{item.title}</span>}
                      {!isCollapsed && (
                        <span className="nav-arrow">
                          {isSubOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                        </span>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.path}
                      className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                      onClick={handleNavClick}
                      title={isCollapsed ? item.title : undefined}
                    >
                      <span className="nav-icon-wrapper">
                        <Icon size={18} />
                      </span>
                      {!isCollapsed && <span className="nav-title">{item.title}</span>}
                    </Link>
                  )}

                  {/* Submenu rendering */}
                  {hasSub && !isCollapsed && isSubOpen && (
                    <ul className="sidebar-submenu">
                      {item.subItems.map((sub) => (
                        <li key={sub.title}>
                          <Link
                            to={sub.path}
                            className={`submenu-link ${location.pathname === sub.path ? 'active' : ''}`}
                            onClick={handleNavClick}
                          >
                            {sub.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Revenue Widget */}
        {!isCollapsed && (
          <div className="sidebar-widget">
            <div className="widget-header">
              <Sparkles size={16} />
              <span>Total Revenue</span>
            </div>
            <div className="widget-amount">₹1,24,560</div>
            <div className="widget-badge">+ 24.5% this month</div>
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;