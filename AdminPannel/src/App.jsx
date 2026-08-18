import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Global Styles
import "./App.css";

// Layout
import MainLayout from "./Layout/MainLayout/MainLayout";

// Auth
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";

// Pages
import AddnewProduct from "./Pages/AddnewProduct/AddnewProduct";
import AllProduct from "./Pages/AllProduct/AllProduct";
import AllOrder from "./Pages/AllOrder/AllOrder";

// Components
import Dashboard from "./Components/Dashboard/Dashboard";
import Catagories from "./Components/Catagories/Catagories";
import ManageBrands from "./Components/ManageBrands/ManageBrands";
import Attributes from "./Components/Attributes/Attributes";
import CompletedOrders from "./Components/CompletedOrders/CompletedOrders";
import CancelOrders from "./Components/CancelOrders/CancelOrders";
import Customers from "./Components/Customers/Customers";
import BlogPost from "./Components/BlogPost/BlogPost";
import BlogManagement from "./Components/BlogManagement/BlogManagement";
import ColdLeads from "./Components/ColdLeads/ColdLeads";
import RefundManagement from "./Components/RefundManagement/RefundManagement";
import PendingOrders from "./Components/PendingOrders/PendingOrders";
import ProcessingOrder from "./Components/ProcessingOrder/ProcessingOrder";
import PremiumCollection from "./Components/PremiumCollection/PremiumCollection";
import Testimonial from "./Components/Testimonial/Testimonial";
import HoneyProduct from "./Components/HoneyProduct/HoneyProduct";

// Login
import Login from "./Components/Login/Login";
import Inventory from "./Components/Inventory/Inventory";
import Marketings from "./Components/Marketings/Marketings";
import WebsiteSetting from "./Components/WebsiteSetting/WebsiteSetting";
import Reviews from "./Components/Reviews/Reviews";
import Couponsoffers from "./Components/Couponsoffers/Couponsoffers";
import Reports from "./Components/Reports/Reports";

function App() {
  return (
    <div className="App-theme-wrapper">
      <BrowserRouter>
        <Routes>

          {/* =========================
              PUBLIC ROUTE
          ========================== */}
          <Route
            path="/login"
            element={<Login />}
          />

          {/* =========================
              PROTECTED ROUTES
          ========================== */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >

            {/* =========================
                DASHBOARD
            ========================== */}
            <Route
              index
              element={<Dashboard />}
            />

            <Route
              path="dashboard"
              element={<Dashboard />}
            />

            {/* Blog */}
            <Route path="/blogpost" element={<BlogPost />} />
            <Route path="/blogmanagement" element={<BlogManagement />} />
            {/* =========================
                PRODUCTS
            ========================== */}
            <Route
              path="products/add"
              element={<AddnewProduct />}
            />

            <Route
              path="products/all"
              element={<AllProduct />}
            />

            <Route
              path="products/categories"
              element={<Catagories />}
            />

            <Route
              path="products/brands"
              element={<ManageBrands />}
            />


         <Route
         path="Products/reviews"
         element={<Reviews/>}
         />
         
         <Route
         path="reports"
         element={<Reports/>}
         />

            <Route
              path="products/attributes"
              element={<Attributes />}
            />

            <Route
              path="premium-collection"
              element={<PremiumCollection />}
            />

            <Route
              path="honey-product"
              element={<HoneyProduct />}
            />

            {/* =========================
                ORDERS
            ========================== */}
            <Route
              path="orders/all"
              element={<AllOrder />}
            />

            <Route
              path="orders/complete"
              element={<CompletedOrders />}
            />

            <Route
              path="orders/cancel"
              element={<CancelOrders />}
            />

            <Route
              path="orders/pending"
              element={<PendingOrders />}
            />

            <Route
              path="orders/processing"
              element={<ProcessingOrder />}
            />

            <Route
              path="orders/refund"
              element={<RefundManagement />}
            />

            {/* =========================
                CUSTOMERS
            ========================== */}
            <Route
              path="customers"
              element={<Customers />}
            />
            
           <Route
           path="coupons"
           element={<Couponsoffers/>}
           />



            <Route
               path="website-settings"
               element={<WebsiteSetting/>}
               />

            {/* =========================
                BLOG
            ========================== */}
            <Route
              path="blog/post"
              element={<BlogPost />}
            />

            <Route
              path="blog/management"
              element={<BlogManagement />}
            />

            {/* Backward-compatible blog routes */}
            <Route
              path="blogpost"
              element={<BlogPost />}
            />

            <Route
              path="blogmanagement"
              element={<BlogManagement />}
            />

            {/* =========================
                LEADS
            ========================== */}
            <Route
              path="coldleads"
              element={<ColdLeads />}
            />

            {/* =========================
                ADDITIONAL ORDER ROUTES
            ========================== */}
            <Route
              path="refund"
              element={<RefundManagement />}
            />

            <Route
              path="pending"
              element={<PendingOrders />}
            />

            <Route
              path="processing"
              element={<ProcessingOrder />}
            />

            {/* =========================
                TESTIMONIALS
            ========================== */}
            <Route
              path="testimonials"
              element={<Testimonial />}
            />
            <Route
              path="inventory"
              element={<Inventory/>}
            />
            <Route
              path="marketing"
              element={<Marketings/>}
            />

          </Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;