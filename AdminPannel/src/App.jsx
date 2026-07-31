import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Global Green & Golden Theme Styles
import "./App.css";

// Layout
import MainLayout from "./Layout/MainLayout/MainLayout";
import AddnewProduct from "./Pages/AddnewProduct/AddnewProduct";
import AllProduct from "./Pages/AllProduct/AllProduct";
import AllOrder from "./Pages/AllOrder/AllOrder";

// Pages
import Dashboard from "./Pages/Dashboard/Dashboard";
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
          {/* All admin pages use MainLayout */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="/products/add" element={<AddnewProduct />} />
            <Route path="/products/all" element={<AllProduct />} />
            <Route path="/orders/all" element={<AllOrder />} />

            <Route path="products/categories" element={<Catagories />} />
            <Route path="products/brands" element={<ManageBrands />} />
            <Route path="products/attributes" element={<Attributes />} />

            <Route path="orders/complete" element={<CompletedOrders />} />
            <Route path="orders/cancel" element={<CancelOrders />} />

            <Route path="customers" element={<Customers />} />
            <Route path="/blogpost" element={<BlogPost />} />
            <Route path="/blogmanagement" element={<BlogManagement />} />
            <Route path="/coldleads" element={<ColdLeads />} />

          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;