import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./Layout/MainLayout/MainLayout";
import DashBoard from "./Pages/DashBoard/DashBoard";
import MyOrders from "./Components/MyOrders/MyOrders";
import WishList from "./Components/WishList/WishList";
import MyAddress from "./Components/MyAddress/MyAddress";
import AccountDetails from "./Components/AccountDetails/AccountDetails";
import Coupons from "./Components/Coupons/Coupons";
import Review from "./Components/Review/Review";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Application Layout Wrapper */}
        <Route path="/" element={<MainLayout />}>
          {/* Default Redirect from "/" to "/dashboard" */}
          <Route index element={<Navigate to="/dashboard" replace />} />

          {/* Dashboard Route */}
          <Route path="dashboard" element={<DashBoard />} />

          {/* My Orders Route */}
          <Route path="my-orders" element={<MyOrders />} />

          {/* Wishlist Route */}
          <Route path="wishlist" element={<WishList />} />

          {/* My Address Route */}
          <Route path="addresses" element={<MyAddress />} />

          {/* Account Details Route */}
          <Route path="account-details" element={<AccountDetails />} />

          {/* Coupons Route */}
          <Route path="coupons" element={<Coupons />} />

          {/* Reviews Route */}
          <Route path="reviews" element={<Review />} />
        </Route>

        {/* 404 Fallback - Redirects unknown URLs back to Dashboard */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;