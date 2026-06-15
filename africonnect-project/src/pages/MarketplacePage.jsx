import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react'; 
import { dummyProducts } from '../data/dummyProducts';
import './MarketplacePage.css'; 
import cocoaFarmImg from '../assets/Marketplace/cocoa-farm.jpg';
import logoImg from '../assets/LandingPage/logo.png';
import { supabase } from '../supabase/supabaseClient';

function MarketplacePage() {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');
  const [aiSearchQuery, setAiSearchQuery] = useState('');
  const [aiStrategy, setAiStrategy] = useState('all');
  const [filteredProducts, setFilteredProducts] = useState(dummyProducts);
  const [results, setResults] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  // Intercepts button clicks to jump directly to the RFQ setup if bypassed via inner HTML contents
  useEffect(() => {
    const handleGlobalInquiryClick = (e) => {
      if (e.target && e.target.textContent === 'Submit Inquiry') {
        e.preventDefault();
        e.stopPropagation();
        
        // Execute identical session gate check
        handleInquiryProtectionGuard(e);
      }
    };

    document.addEventListener('click', handleGlobalInquiryClick);
    return () => document.removeEventListener('click', handleGlobalInquiryClick);
  }, [navigate]);

  // ✅ CRITICAL PROTECTION INTERCEPTOR: Bounces unauthenticated guests to signup with a return bookmark
  const handleInquiryProtectionGuard = (e) => {
    e.preventDefault();
    const userIsAuthenticated = localStorage.getItem('isLoggedIn') === 'true';

    if (userIsAuthenticated) {
      navigate('/rfq');
    } else {
      console.log("Anonymous guest context detected. Saving navigation state intercept point...");
      localStorage.setItem('redirect_after_auth', '/rfq');
      alert("Authentication required. Redirecting to registration to verify your business credentials securely.");
      navigate('/buyer-signup');
    }
  };

  // Directory Filter Search Engine Execution
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

  // Smart AI Search Execution Handler 
  const handleAISmartSearchExecute = async (e) => {
  e.preventDefault();
  if (!aiSearchQuery.trim()) return alert("Enter search term");

  setIsLoading(true);
  if (aiStrategy === 'closest'){
    navigator.geolocation.getCurrentPosition(async (pos) => {
    const { latitude: lat, longitude: lng } = pos.coords;


    // Change function name here if yours is different
    const { data, error } = await supabase.rpc('nearest_suppliers', {
      user_lat: lat,
      user_lng: lng,
      search_term: aiSearchQuery
    });

    setIsLoading(false);
    
    if (error) return console.error(error), alert(error.message);
    console.log('Results:', data);
    setFilteredProducts(data);
    setResults(data);
  }, () => {
    setIsLoading(false);
    alert('GPS blocked. Enable location permission.');
  });

  };
}

  

  return (
    <div className="mkt-page-wrapper">
      
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
          <Link to="/">Home</Link>
          <Link to="/buyer-login">Login</Link>
          
          {/* ✅ FIXED SIDEBAR ACTION: Added protective guard logic intercept on dashboard link selection */}
          <span 
            onClick={() => {
              const userIsAuthenticated = localStorage.getItem('isLoggedIn') === 'true';
              if (userIsAuthenticated) {
                navigate('/buyer-dashboard');
              } else {
                alert("Access Restricted. Please sign in to view your dashboard hub workspace.");
                navigate('/buyer-login');
              }
            }} 
            style={{ cursor: 'pointer' }}
            className="mkt-dashboard-nav-link"
          >
            Dashboard
          </span>
        </nav>
      </header>

      {/* TWO-COLUMN HERO SECTION */}
      <section className="mkt-hero-container">
        <div className="mkt-hero-left">
          <h1 className="mkt-hero-title">Empowering African Industry through sustainable innovation & streamlined production.</h1>
          <p className="mkt-hero-subtitle">The premium B2B gateway connecting global institutional buyers with verified, high-capacity African producers and manufacturers.</p>
          
          <div className="mkt-hero-badge">
            <span className="mkt-badge-highlight">500+</span> Verified Industrial Suppliers
          </div>
        </div>
        
        <div className="mkt-hero-right">
          <img className="mkt-main-hero-img" src={cocoaFarmImg} alt="Cocoa farm cultivation" />
        </div>
      </section>

      {/* SEARCH FILTER STRIP */}
      <div className="mkt-filter-strip">
        <div className="mkt-filter-inner-block">
          
          {/* Row 1: Traditional Directory Search Bar */}
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

          {/* Row 2: Promoted AI Smart Mode Search Architecture */}
          <form className="mkt-ai-smart-search-bar" onSubmit={handleAISmartSearchExecute}>
            <div className="mkt-ai-search-input-wrapper">
              <Sparkles size={16} className="mkt-ai-icon-sparkle" />
              <input 
                type="text"
                placeholder="search smarter with ai"
                value={aiSearchQuery}
                onChange={(e) => setAiSearchQuery(e.target.value)}
              />
            </div>
            
            <select 
              className="mkt-ai-dropdown" 
              value={aiStrategy}
              onChange={(e) => setAiStrategy(e.target.value)}
            >
              <option value="all">All</option>
              <option value="closest">Find Closest Supplier</option>
              <option value="verified">Search Verified Supplier</option>
            </select>
            
            <button type="submit" className="mkt-ai-search-submit-btn">AI Search</button>
          </form>

    {/* Results from Supabase RPC */}

    {isLoading && (
      <p className="mt-4 text-gray-500">Finding suppliers near you...</p>
    )}

    {results.length > 0 && !isLoading && (
      <div className="mt-6 space-y-3">
        <h3 className="font-semibold text-lg">Closest Suppliers</h3>
        
        {results.map((s) => (
          <div key={s.id} className="border rounded-lg p-4 hover:shadow-md transition">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-bold">{s.name}</h4>
                <p className="text-sm text-gray-600">{s.product_category} • {s.country}, {s.region}</p>
                <p className="text-sm mt-1">📞 {s.phone}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-green-600">{s.distance_km.toFixed(1)}</p>
                <p className="text-xs text-gray-500">km away</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}

    {!isLoading && results.length === 0 && aiStrategy === 'closest' && (
      <p className="mt-4 text-gray-400">No suppliers found. Try 'cocoa' or 'cashew'.</p>
    )}

        </div>
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
                    <span className="mkt-status-tag verified">
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
                    <button className="mkt-btn-inquiry" onClick={handleInquiryProtectionGuard}>
                      Submit Inquiry
                    </button>
                    <button className="mkt-btn-chat" onClick={handleInquiryProtectionGuard}>Chat</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}

export default MarketplacePage;