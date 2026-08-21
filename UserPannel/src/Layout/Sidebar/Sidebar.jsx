import React from "react";
import {
  MdHome,
  MdOutlineShoppingBag,
  MdOutlineFavoriteBorder,
  MdOutlineLocationOn,
  MdOutlinePerson,
  MdOutlineConfirmationNumber,
  MdOutlineStarOutline,
  MdOutlineShareLocation,
  MdOutlineCreditCard,
  MdOutlinePeopleAlt,
  MdOutlineHelpOutline,
  MdClose,
} from "react-icons/md";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

// Adjust these paths if your assets are located elsewhere
import Logo from "../../assets/Logo (2).png";
import PromoChoc from "../../assets/Logo (2).png";

const Sidebar = ({ collapsed, mobileOpen, setMobileOpen }) => {
  const menuItems = [
    { title: "Dashboard", path: "/dashboard", icon: <MdHome /> },
    { title: "My Orders", path: "/my-orders", icon: <MdOutlineShoppingBag /> },
    { title: "Wishlist", path: "/wishlist", icon: <MdOutlineFavoriteBorder /> },
    { title: "Addresses", path: "/addresses", icon: <MdOutlineLocationOn /> },
    { title: "Account Details", path: "/account-details", icon: <MdOutlinePerson /> },
    { title: "Coupons & Offers", path: "/coupons", icon: <MdOutlineConfirmationNumber /> },
    { title: "My Reviews", path: "/reviews", icon: <MdOutlineStarOutline /> },
    { title: "Track Order", path: "/track-order", icon: <MdOutlineShareLocation /> },
    { title: "Payment Methods", path: "/payment-methods", icon: <MdOutlineCreditCard /> },
    { title: "Refer & Earn", path: "/refer-earn", icon: <MdOutlinePeopleAlt /> },
    { title: "Help & Support", path: "/help-support", icon: <MdOutlineHelpOutline /> },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="Sabriyana_Backdrop"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`Sabriyana_Sidebar ${collapsed ? "Sabriyana_Collapsed" : ""} ${
          mobileOpen ? "Sabriyana_MobileOpen" : ""
        }`}
      >
        {/* Brand Header */}
        <div className="Sabriyana_Header">
          <div className="Sabriyana_Brand">
            <div className="Sabriyana_LogoWrapper">
              <img src={Logo} alt="Sabriyana Logo" className="Sabriyana_Logo" />
            </div>
            {!collapsed && (
              <div className="Sabriyana_BrandText">
                <h2 className="Sabriyana_Title">SABRIYANA</h2>
                <span className="Sabriyana_Subtitle">CRAFT CHOCOLATE & HONEY</span>
              </div>
            )}
          </div>

          <button
            className="Sabriyana_CloseBtn"
            onClick={() => setMobileOpen(false)}
            aria-label="Close Sidebar"
          >
            <MdClose />
          </button>
        </div>

        {/* Navigation List */}
        <nav className="Sabriyana_Nav">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen && setMobileOpen(false)}
              className={({ isActive }) =>
                `Sabriyana_NavLink ${isActive ? "active" : ""}`
              }
            >
              <span className="Sabriyana_NavIcon">{item.icon}</span>
              {!collapsed && (
                <>
                  <span className="Sabriyana_NavLabel">{item.title}</span>
                  {item.count !== undefined && (
                    <span className="Sabriyana_Badge">{item.count}</span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Bottom Promo Card */}
        {!collapsed && (
          <div className="Sabriyana_PromoCard">
            <img
              src={PromoChoc}
              alt="Sweet Deals"
              className="Sabriyana_PromoImg"
            />
            <div className="Sabriyana_PromoContent">
              <h4 className="Sabriyana_PromoHeading">Sweet Deals</h4>
              <p className="Sabriyana_PromoText">
                Get up to 20% OFF on your favorite chocolates
              </p>
              <button className="Sabriyana_PromoBtn">Shop Now</button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;