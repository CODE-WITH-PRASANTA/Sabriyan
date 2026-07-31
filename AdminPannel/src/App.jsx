import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./Layout/MainLayout/MainLayout";
//Components
import RefundManagement from "./Components/RefundManagement/RefundManagement";
import PendingOrders from "./Components/PendingOrders/PendingOrders";
import Dashboard from "./Components/Dashboard/Dashboard";
import ProcessingOrder from "./Components/ProcessingOrder/ProcessingOrder";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {/* Default Page */}
          <Route index element={<Dashboard/>} />

          {/* Routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/refund" element={<RefundManagement />} />
          <Route path="/pending" element={<PendingOrders />} />
          <Route path="/processing" element={<ProcessingOrder />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;