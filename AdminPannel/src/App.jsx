import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import Dashboard from "./Pages/Dashboard/Dashboard";
import MainLayout from "./Layout/MainLayout/MainLayout";
import AddnewProduct from "./Pages/AddnewProduct/AddnewProduct";
import AllProduct from "./Pages/AllProduct/AllProduct";
import AllOrder from "./Pages/AllOrder/AllOrder";

// Pages


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="/products/add" element={<AddnewProduct/>}/>
          <Route path="/products/all"element={<AllProduct/>}/>
          <Route path="/orders/all"element={<AllOrder/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;