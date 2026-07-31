import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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
import PremiumCollection from "./Components/PremiumCollection/PremiumCollection";
import Testimonial from "./Components/Testimonial/Testimonial";
import HoneyProduct from "./Components/HoneyProduct/HoneyProduct";

function App() {
  return (
    <Router>
      <Routes>

        {/* All admin pages use MainLayout */}
        <Route path="/" element={<MainLayout />}>

          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="/products/add" element={<AddnewProduct/>}/>
          <Route path="/products/all"element={<AllProduct/>}/>
          <Route path="/orders/all"element={<AllOrder/>}/>

          <Route path="products/categories" element={<Catagories />} />
          <Route path="products/brands" element={<ManageBrands />} />
          <Route path="products/attributes" element={<Attributes />} />

          <Route path="orders/complete" element={<CompletedOrders />} />
          <Route path="orders/cancel" element={<CancelOrders />} />

          <Route path="customers" element={<Customers />} />
          <Route path="/premium-collection" element={<PremiumCollection/>} />
          <Route path="/testimonials" element={<Testimonial/>} />
          <Route path="/honey-product" element={<HoneyProduct/>} />

        </Route>

      </Routes>
    </Router>
  );
}

export default App;