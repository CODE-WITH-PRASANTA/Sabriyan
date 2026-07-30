import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Catagories from './Components/Catagories/Catagories';
import ManageBrands from './Components/ManageBrands/ManageBrands';
import Attributes from './Components/Attributes/Attributes';

function App() {
  return (
    <Router>
      <Routes>
        
        
        {/* Route for the Categories component matching your breadcrumb design */}
        <Route path="/categories" element={<Catagories />} />
        <Route path="/brands" element={<ManageBrands />} />
        <Route path="/attributes" element={<Attributes/>} />
       
      </Routes>
    </Router>
  );
}

export default App;