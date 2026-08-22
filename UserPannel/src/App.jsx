import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./Layout/MainLayout/MainLayout";
import DashBoard from "./Pages/DashBoard/DashBoard";
import MyOrders from "./Components/MyOrders/MyOrders";
import WishList from "./Components/WishList/WishList";
import MyAddress from "./Components/MyAddress/MyAddress";
import AccountDetails from "./Components/AccountDetails/AccountDetails";
import Coupons from "./Components/Coupons/Coupons";
import Review from "./Components/Review/Review";
import TrackOrder from "./Components/TrackOrder/TrackOrder";
import PaymentMethods from "./Components/PaymentMethods/PaymentMethods";
import ReferEarn from "./Components/ReferEarn/ReferEarn";
import HelpAndSupport from "./Components/HelpAndSupport/HelpAndSupport";

const ProfilePage = () => <div style={{ padding: "20px" }}>My Profile Content</div>;
const EditProfilePage = () => <div style={{ padding: "20px" }}>Edit Profile Content</div>;
const ActivityLogsPage = () => <div style={{ padding: "20px" }}>Activity Logs Content</div>;
const SettingsPage = () => <div style={{ padding: "20px" }}>Account Settings Content</div>;

// Dummy Login Page
const LoginPage = ({ setIsAuthenticated }) => {
  const handleLogin = () => {
    localStorage.setItem("authToken", "sample_token_12345");
    setIsAuthenticated(true);
  };

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h2>Login Page</h2>
      <p style={{ margin: "15px 0" }}>Click below to simulate logging in:</p>
      <button
        onClick={handleLogin}
        style={{
          padding: "10px 20px",
          backgroundColor: "#2b1810",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Sign In
      </button>
    </div>
  );
};

// Protected Route Guard
const ProtectedRoute = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return Boolean(localStorage.getItem("authToken"));
  });

  return (
    <BrowserRouter>
      <Routes>
        {/* Protected Application Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <MainLayout setIsAuthenticated={setIsAuthenticated} />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashBoard />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="profile/edit" element={<EditProfilePage />} />
          <Route path="activity-logs" element={<ActivityLogsPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="my-orders" element={<MyOrders />} />
          <Route path="wishlist" element={<WishList />} />
          <Route path="addresses" element={<MyAddress />} />
          <Route path="account-details" element={<AccountDetails />} />
          <Route path="coupons" element={<Coupons />} />
          <Route path="reviews" element={<Review />} />
          <Route path="track-order" element={<TrackOrder />} />
          <Route path="payment-methods" element={<PaymentMethods />} />
          <Route path="refer-earn" element={<ReferEarn />} />
          <Route path="help-support" element={<HelpAndSupport />} />
        </Route>

        {/* Public Route */}
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <LoginPage setIsAuthenticated={setIsAuthenticated} />
            )
          }
        />

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;