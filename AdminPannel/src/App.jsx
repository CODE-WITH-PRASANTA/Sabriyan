import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import Dashboard from "./Pages/Dashboard/Dashboard";
import MainLayout from "./Layout/MainLayout/MainLayout";

// Pages


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;