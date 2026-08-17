import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./Layout/MainLayout/MainLayout";

// Components
import Dashboard from "./Components/Dashboard/Dashboard";
import RefundManagement from "./Components/RefundManagement/RefundManagement";
import PendingOrders from "./Components/PendingOrders/PendingOrders";
import ProcessingOrder from "./Components/ProcessingOrder/ProcessingOrder";
import Catagories from "./Components/Catagories/Catagories";
import ManageBrands from "./Components/ManageBrands/ManageBrands";
import Attributes from "./Components/Attributes/Attributes";
import CompletedOrders from "./Components/CompletedOrders/CompletedOrders";
import CancelOrders from "./Components/CancelOrders/CancelOrders";
import Customers from "./Components/Customers/Customers";
import PremiumCollection from "./Components/PremiumCollection/PremiumCollection";
import Testimonial from "./Components/Testimonial/Testimonial";
import HoneyProduct from "./Components/HoneyProduct/HoneyProduct";
import BlogPost from "./Components/BlogPost/BlogPost";
import BlogManagement from "./Components/BlogManagement/BlogManagement";

// Import these if they exist
// import AddnewProduct from "./Components/AddnewProduct/AddnewProduct";
// import AllProduct from "./Components/AllProduct/AllProduct";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />

          <Route path="dashboard" element={<Dashboard />} />

          {/* <Route path="products/add" element={<AddnewProduct />} /> */}
          {/* <Route path="products/all" element={<AllProduct />} /> */}
          {/* <Route path="orders/all" element={<AllOrder />} /> */}

          <Route path="products/categories" element={<Catagories />} />
          <Route path="products/brands" element={<ManageBrands />} />
          <Route path="products/attributes" element={<Attributes />} />

          <Route path="orders/complete" element={<CompletedOrders />} />
          <Route path="orders/cancel" element={<CancelOrders />} />

          <Route path="customers" element={<Customers />} />
          <Route path="premium-collection" element={<PremiumCollection />} />
          <Route path="testimonials" element={<Testimonial />} />
          <Route path="honey-product" element={<HoneyProduct />} />

          <Route path="refund" element={<RefundManagement />} />
          <Route path="pending" element={<PendingOrders />} />
          <Route path="processing" element={<ProcessingOrder />} />
          <Route path="blogpost" element={<BlogPost/>} />
          <Route path="blogmanagement" element={<BlogManagement/>} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;