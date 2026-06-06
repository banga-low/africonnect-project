import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';

// --- Shared Core Platform Page Routes ---
import LandingPage from './pages/landingPage/landingPage';
import RFQPage from './pages/RFQPage.jsx'; 

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

// --- External Mock Database Array Asset ---
import { dummyProducts } from './data/dummyProducts';

// ✅ Consolidated her asset imports cleanly here so they stay isolated
import './components/MarketplaceGrid.css';
import './pages/RFQPage.css';
import './pages/BuyerSignup.css';
import './pages/BuyerDashboard/BuyerDashboard.css';
import './pages/BuyerDashboard/BuyerProfile.css';

// --- Integrated Marketplace Component (Clean Replacement for AppBuyer) ---
function MarketplacePage() {
  const navigate = useNavigate();
  return (
    <>
      {/* HERO SECTION */}
      <div className="marketplace-hero">
        <nav className="hero-topnav">
          <a href="/">Home</a>
          <a href="/buyer-login">Buyer Login</a>
          <a href="/buyer-signup">Buyer Signup</a>
          <a href="/rfq">RFQ</a>
          <a href="/buyer-dashboard">Buyer Dashboard</a>
        </nav>
        <div className="marketplace-hero-banner">
          <img src="/assets2/hero-cocoa.jpg" alt="Empowering African Industry" />
        </div>
      </div>

      {/* FEATURED PRODUCTS */}
      <section className="featured-products">
        <h2 className="section-title">Featured Products</h2>
        <div className="product-grid">
          {dummyProducts.map((product) => (
            <div className="product-card" key={product.id}>
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p className="location">ORIGIN: {product.origin}</p>
              <div className="price-row">
                <span className="price">PRICE: ${product.price}/kg</span>
                <span className="moq">Min.order: {product.moq} tons</span>
              </div>
              <div className="card-buttons">
                <button className="btn-primary" onClick={() => navigate('/buyer-signup')}>Submit Inquiry</button>
                <button className="btn-secondary">Chat</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

// --- Main application source of truth entry ---
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Default view: Landing Page */}
          <Route path="/" element={<LandingPage />} />

          {/* Core Central Marketplace Gateway Paths */}
          {/* ✅ FIXED: Safely swapped out <AppBuyer /> wrapper for the integrated Marketplace component */}
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
          
          {/* ✅ FIXED: Set a safe path structure to avoid conflict with supplier settings profile */}
          <Route path="/buyer-profile" element={<BuyerProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;