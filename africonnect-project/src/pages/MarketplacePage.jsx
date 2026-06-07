import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react'; // Added chevron for the AI cards
import { dummyProducts } from '../data/dummyProducts';
import './MarketplacePage.css'; 
import cocoaFarmImg from '../assets/Marketplace/cocoa-farm.jpg';
import logoImg from '../assets/LandingPage/logo.png';

function MarketplacePage() {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(dummyProducts);

  // Global event listener to redirect 'Submit Inquiry' clicks to the RFQ portal
  useEffect(() => {
    const handleGlobalInquiryClick = (e) => {
      if (e.target && e.target.textContent === 'Submit Inquiry') {
        e.preventDefault();
        e.stopPropagation();
        navigate('/rfq');
      }
    };

    document.addEventListener('click', handleGlobalInquiryClick);
    return () => document.removeEventListener('click', handleGlobalInquiryClick);
  }, [navigate]);

  const handleSearchExecute = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setFilteredProducts(dummyProducts);
      return;
    }

    const cleanQuery = searchQuery.toLowerCase();
    const matches = dummyProducts.filter((product) => {
      return (
        product.name.toLowerCase().includes(cleanQuery) ||
        product.origin.toLowerCase().includes(cleanQuery) ||
        (product.supplier && product.supplier.toLowerCase().includes(cleanQuery))
      );
    });

    setFilteredProducts(matches);
  };

  // Placeholder functions for future AI API connections
  const handleAISupplierMatch = () => {
    console.log("Triggering Geospatial AI API to find closest supplier...");
    alert("Connecting to AI Model: Calculating closest geolocation routing metrics...");
  };

  const handleAIVerifiedSearch = () => {
    console.log("Triggering NLP verification analysis API...");
    alert("Connecting to AI Model: Scanning global supplier credentials & historical risk analysis...");
  };

  const handleAIPriceComparison = () => {
    console.log("Triggering Predictive Pricing Analytics ML Model...");
    alert("Connecting to AI Model: Fetching real-time global commodity index price forecasting...");
  };

  return (
    <div className="marketplace-page-scope">
      
      {/* TOP NAVIGATION HEADER BAR */}
      <header className="mkt-navbar-header">
        <div className="mkt-nav-logo-block" onClick={() => navigate('/')}>
          <img src={logoImg} alt="AFRICONNECT Logo Icon" className="mkt-nav-logo-icon" />
          <span className="mkt-logo-text-brand">
            <span className="mkt-logo-green">FRI</span>
            <span className="mkt-logo-dark">CONNECT</span>
          </span>
        </div>
        
        <nav className="mkt-nav-links-group">
          <a href="/">Home</a>
          <a href="/buyer-login">Login</a>
          <a href="/buyer-dashboard">Dashboard</a>
        </nav>
      </header>

      {/* TWO-COLUMN HERO SECTION */}
      <section className="mkt-hero-container">
        <div className="mkt-hero-left">
          <h1>Empowering African Industry through sustainable innovation & streamlined production.</h1>
          <p className="mkt-hero-subtitle">The premium B2B gateway connecting global institutional buyers with verified, high-capacity African producers and manufacturers.</p>
          
          <div className="mkt-hero-badge">
            <span>500+</span> Verified Industrial Suppliers
          </div>
        </div>
        
        <div className="mkt-hero-right">
          <img className="mkt-main-hero-img" src={cocoaFarmImg} alt="Cocoa farm cultivation" />
        </div>
      </section>

      {/* SEARCH FILTER STRIP */}
      <div className="search-filter-strip">
        <form className="mkt-filter-bar" onSubmit={handleSearchExecute}>
          <div className="mkt-search-wrapper">
            <input 
              type="text" 
              placeholder="Search for materials, commodities or suppliers..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select className="mkt-dropdown" defaultValue="">
            <option value="" disabled>All Categories</option>
          </select>
          <select className="mkt-dropdown" defaultValue="">
            <option value="" disabled>All Regions</option>
          </select>
          <button type="submit" className="mkt-search-btn">Search</button>
        </form>
      </div>

      {/* PRODUCT EXHIBITION SECTION */}
      <section className="mkt-products-section">
        <h2 className="mkt-section-heading">Verified Top suppliers</h2>
        <p className="mkt-section-subheading">Direct access to Africa's most reliable high-volume suppliers</p>
        
        {filteredProducts.length === 0 ? (
          <div className="mkt-no-results-card">
            <h3>No Products Found</h3>
            <p>We couldn't find any commodities matching "{searchQuery}". Try searching for something else like "Cocoa", "Cashew", or "Ginger".</p>
            <button className="mkt-btn-inquiry" style={{ width: 'auto', marginTop: '16px' }} onClick={() => { setSearchQuery(''); setFilteredProducts(dummyProducts); }}>
              Reset Search Filter
            </button>
          </div>
        ) : (
          <div className="mkt-products-grid">
            {filteredProducts.map((product) => (
              <div className="mkt-product-card" key={product.id}>
                <div className="mkt-card-img-box">
                  <img src={product.image} alt={product.name} />
                  {product.status && (
                    <span className={`mkt-status-tag ${product.status.toLowerCase().replace(' ', '-')}`}>
                      {product.status}
                    </span>
                  )}
                </div>
                <div className="mkt-card-body">
                  <h3 className="mkt-product-title">{product.name}</h3>
                  <p className="mkt-product-origin">ORIGIN: {product.origin}</p>
                  <div className="mkt-price-line">
                    <span className="mkt-price-value">PRICE: ${product.price}/kg</span>
                    <span className="mkt-moq-value">Min.order: {product.moq} tons</span>
                  </div>
                  <div className="mkt-card-actions">
                    <button className="mkt-btn-inquiry" onClick={() => navigate('/rfq')}>
                      Submit Inquiry
                    </button>
                    <button className="mkt-btn-chat">Chat</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ✅ HIGH-FIDELITY STAGGERED AI MODE SECTION */}
      <section className="mkt-ai-mode-section">
        <div className="mkt-ai-section-inner">
          <h2 className="mkt-ai-heading">
            Source Smarter With <span className="mkt-ai-highlight">AI Mode</span>
          </h2>
          
          <div className="mkt-ai-staggered-links">
            {/* Card 1: Right offset */}
            <div className="mkt-ai-action-card align-right" onClick={handleAISupplierMatch}>
              <span>Find Closest Supplier Here</span>
              <ChevronRight size={18} className="mkt-ai-chevron" />
            </div>

            {/* Card 2: Centered / Left offset */}
            <div className="mkt-ai-action-card align-left" onClick={handleAIVerifiedSearch}>
              <span>Search Verified Supplier</span>
              <ChevronRight size={18} className="mkt-ai-chevron" />
            </div>

            {/* Card 3: Deep right offset */}
            <div className="mkt-ai-action-card align-far-right" onClick={handleAIPriceComparison}>
              <span>Compare Commodity Price</span>
              <ChevronRight size={18} className="mkt-ai-chevron" />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default MarketplacePage;