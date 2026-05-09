import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Routes imports
import LandingPage from './pages/landingPage/landingPage';
import Login from './pages/SupplierLogin';
import SupplierSignup from './pages/SupplierSignup';
import SupplierDashboard from './pages/SupplierDashboard/SupplierDashboard.jsx';
import SupplierProfile from './pages/SupplierProfile/SupplierProfile.jsx';
import ProductListing from './components/ProductListing/ProductListing.jsx';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Default view: Landing Page */}
          <Route path="/" element={<LandingPage />} />

          {/* Navigation Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SupplierSignup />} />
          <Route path="/supplierdashboard" element={<SupplierDashboard/>} />
          <Route path="/supplier-set-profile" element={<SupplierProfile/>} />
          <Route path="/product-listing" element={<ProductListing />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;