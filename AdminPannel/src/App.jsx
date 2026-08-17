import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Global Styles
import "./App.css";

// Layout
import MainLayout from "./Layout/MainLayout/MainLayout";

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

function App() {
  return (
    <div className="App-theme-wrapper">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>

            {/* Dashboard */}
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />

            {/* Products */}
            <Route path="products/add" element={<AddnewProduct />} />
            <Route path="products/all" element={<AllProduct />} />
            <Route path="products/categories" element={<Catagories />} />
            <Route path="products/brands" element={<ManageBrands />} />
            <Route path="products/attributes" element={<Attributes />} />
            <Route path="premium-collection" element={<PremiumCollection />} />
            <Route path="honey-product" element={<HoneyProduct />} />

            {/* Orders */}
            <Route path="orders/all" element={<AllOrder />} />
            <Route path="orders/complete" element={<CompletedOrders />} />
            <Route path="orders/cancel" element={<CancelOrders />} />
            <Route path="orders/pending" element={<PendingOrders />} />
            <Route path="orders/processing" element={<ProcessingOrder />} />
            <Route path="orders/refund" element={<RefundManagement />} />

            {/* Customers */}
            <Route path="customers" element={<Customers />} />

            {/* Blog */}
            <Route path="/blogpost" element={<BlogPost />} />
            <Route path="/blogmanagement" element={<BlogManagement />} />

            {/* Leads */}
            <Route path="coldleads" element={<ColdLeads />} />

            {/* Testimonials */}
            <Route path="testimonials" element={<Testimonial />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;