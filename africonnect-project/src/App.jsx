import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// --- Shared Core Platform Page Routes ---
import LandingPage from './pages/landingPage/landingPage';
import RFQPage from './pages/RFQPage.jsx'; 
import MarketplacePage from './pages/MarketplacePage.jsx'; // ✅ Imesomwa kutoka faili lake rasmi!

// --- Supplier Portal Context Routes ---
import Login from './pages/SupplierLogin';
import SupplierSignup from './pages/SupplierSignup';
import SupplierDashboard from './pages/SupplierDashboard/SupplierDashboard.jsx';
import SupplierProfile from './pages/SupplierProfile/SupplierProfile.jsx';
import ProductListing from './components/ProductListing/ProductListing.jsx';
import SupplierVerification from './pages/SupplierVerification/SupplierVerification.jsx';

// --- Buyer Portal Context Routes ---
import BuyerLogin from './pages/BuyerLogin';
import BuyerSignup from './pages/BuyerSignup';
import BuyerDashboard from './pages/BuyerDashboard/BuyerDashboard';
import BuyerProfile from './pages/BuyerDashboard/BuyerProfile';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Default view: Landing Page */}
          <Route path="/" element={<LandingPage />} />

          {/* Core Central Marketplace Gateway Paths */}
          <Route path="/marketplace" element={<MarketplacePage />} />
          <Route path="/rfq" element={<RFQPage />} />

          {/* Supplier Workspaces Domain Routes */}
          <Route path="/supplier-login" element={<Login />} />
          <Route path="/supplier-signup" element={<SupplierSignup />} />
          <Route path="/supplierdashboard" element={<SupplierDashboard />} />
          <Route path="/supplier-set-profile" element={<SupplierProfile />} />
          <Route path="/product-listing" element={<ProductListing />} />
          <Route path="/supplier-verify" element={<SupplierVerification />} />

          {/* Buyer Workspaces Domain Routes */}
          <Route path="/buyer-login" element={<BuyerLogin />} />
          <Route path="/buyer-signup" element={<BuyerSignup />} />
          <Route path="/buyer-dashboard" element={<BuyerDashboard />} />
          <Route path="/buyer-profile" element={<BuyerProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;