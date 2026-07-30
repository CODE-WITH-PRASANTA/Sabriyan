import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './Components/Dashboard/Dashboard';
import RefundManagement from './Components/RefundManagement/RefundManagement';
import PendingOrders from './Components/PendingOrders/PendingOrders';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path='/refund' element={<RefundManagement />}/>
        <Route path='/pending' element={<PendingOrders />} />
        
      </Routes>
    </Router>
  );
};

export default App;