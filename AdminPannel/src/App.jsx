import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Global Styles
import "./App.css";

// Layout
import MainLayout from "./Layout/MainLayout/MainLayout";

// Pages
import Dashboard from "./Pages/Dashboard/Dashboard";
import AddnewProduct from "./Pages/AddnewProduct/AddnewProduct";
import AllProduct from "./Pages/AllProduct/AllProduct";
import AllOrder from "./Pages/AllOrder/AllOrder";

// Components
import Catagories from "./Components/Catagories/Catagories";
import ManageBrands from "./Components/ManageBrands/ManageBrands";
import Attributes from "./Components/Attributes/Attributes";
import CompletedOrders from "./Components/CompletedOrders/CompletedOrders";
import CancelOrders from "./Components/CancelOrders/CancelOrders";
import Customers from "./Components/Customers/Customers";
import BlogPost from "./Components/BlogPost/BlogPost";
import BlogManagement from "./Components/BlogManagement/BlogManagement";
import ColdLeads from "./Components/ColdLeads/ColdLeads";

function App() {
  return (
    <div className="App-theme-wrapper">
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />

            {/* Products */}
            <Route path="products/add" element={<AddnewProduct />} />
            <Route path="products/all" element={<AllProduct />} />
            <Route path="products/categories" element={<Catagories />} />
            <Route path="products/brands" element={<ManageBrands />} />
            <Route path="products/attributes" element={<Attributes />} />

            {/* Orders */}
            <Route path="orders/all" element={<AllOrder />} />
            <Route path="orders/complete" element={<CompletedOrders />} />
            <Route path="orders/cancel" element={<CancelOrders />} />

            {/* Customers */}
            <Route path="customers" element={<Customers />} />

            {/* Blog */}
            <Route path="blogpost" element={<BlogPost />} />
            <Route path="blogmanagement" element={<BlogManagement />} />

            {/* Leads */}
            <Route path="coldleads" element={<ColdLeads />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;