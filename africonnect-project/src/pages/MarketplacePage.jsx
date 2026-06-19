import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react'; 
import { dummyProducts } from '../data/dummyProducts';
import './MarketplacePage.css'; 

// Local Fallback Asset Imports
import cocoaFarmImg from '../assets/Marketplace/cocoa-farm.jpg';
import cashewImg from '../assets/ProductListing/cashew.jpg'; 
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

  // CRITICAL PROTECTION INTERCEPTOR: Bounces unauthenticated guests to signup with a return bookmark
  const handleInquiryProtectionGuard = (e) => {
    e.preventDefault();
    const userIsAuthenticated = localStorage.getItem('isLoggedIn') === 'true';

    if (userIsAuthenticated) {
      navigate('/rfq');
    } else {
      console.log("Anonymous guest context detected. Saving navigation state intercept point...");
      localStorage.setItem('redirect_after_auth', '/rfq');
      alert("Authentication required. Redirecting to registration to verify your credentials securely.");
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
    if (aiStrategy === 'closest') {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords;

        // FIXED: Completely removed the accidental trailing comma trailing after user_lng to stop parser crashes
        const { data, error } = await supabase.rpc('nearest_suppliers', {
          search_term: aiSearchQuery,
          user_lat: lat,
          user_lng: lng
        });

        setIsLoading(false);
        
        if (error) return console.error(error), alert(error.message);
        console.log('Results:', data);
        setFilteredProducts(data || []);
        setResults(data || []);
      }, () => {
        setIsLoading(false);
        alert('GPS blocked. Enable location permission.');
      });
    } else {
      setIsLoading(false);
    }
  };

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
          
          {/* FIXED LINK: Explicitly clears out the session inquiry redirect flag on direct navbar click intent */}
          <Link 
            to="/buyer-login" 
            onClick={() => localStorage.removeItem('redirect_after_auth')}
          >
            Login
          </Link>
        </nav>
      </header>

      {/* TWO-COLUMN HERO SECTION */}
      <section className="mkt-hero-container">
        <div className="mkt-hero-left">
          <h1 className="mkt-hero-title">Empowering African Industry through sustainable innovation & streamlined production.</h1>
          <p className="mkt-hero-subtitle">The premium B2B gateway connecting global institutional buyers with verified, high-capacity African producers and manufacturers.</p>
          
          <div className="mkt-hero-badge">
            <span className="mkt-badge-highlight">500+</span> Verified Suppliers
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
              <option value="verified">Search Reliable Supplier</option>
            </select>
            
            <button type="submit" className="mkt-ai-search-submit-btn">AI Search</button>
          </form>

          {isLoading && (
            <p className="mt-4 text-gray-500">Finding suppliers near you...</p>
          )}

          {results && results.length > 0 && !isLoading && (
            <div className="mt-6 space-y-3">
              <h3 className="font-semibold text-lg" style={{ textAlign: 'left', color: '#0f172a' }}>Closest Suppliers</h3>
              
              {results.map((s) => (
                <div key={s.id} className="border rounded-lg p-4 hover:shadow-md transition" style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px', backgroundColor: '#f8fafc', marginBottom: '12px' }}>
                  <div className="flex justify-between items-start" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ textAlign: 'left' }}>
                      
                      <h4 className="font-bold" style={{ margin: '0 0 4px 0', fontSize: '1.1rem', color: '#0f172a' }}>
                        {s.name} <span style={{ fontSize: '0.72rem', color: '#16a34a', backgroundColor: '#dcfce7', padding: '2px 8px', borderRadius: '10px', marginLeft: '6px', fontWeight: '700', whiteSpace: 'nowrap' }}>Verified Supplier</span>
                      </h4>
                      <p className="text-sm text-gray-600" style={{ margin: '0 0 4px 0', fontSize: '0.85rem', color: '#475569' }}>{s.product_category || s.category} • {s.country}, {s.region}</p>
                      
                      <p className="text-sm mt-1" style={{ margin: '0', fontSize: '0.85rem', color: '#ef4444', fontWeight: '700' }}>
                        Min.order: 1 ton
                      </p>
                    </div>
                    <div className="text-right" style={{ textAlign: 'right' }}>
                      <p className="text-2xl font-bold text-green-600" style={{ margin: '0', fontSize: '1.5rem', fontWeight: '800', color: '#16a34a' }}>{s.distance_km ? s.distance_km.toFixed(1) : '0.0'}</p>
                      <p className="text-xs text-gray-500" style={{ margin: '0', fontSize: '0.75rem', color: '#64748b' }}>km away</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!isLoading && results && results.length === 0 && aiStrategy === 'closest' && (
            <p className="mt-4 text-gray-400" style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '16px' }}>No suppliers found. Try 'cocoa' or 'cashew'.</p>
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
            <button className="mkt-btn-inquiry" style={{ width: 'auto', marginTop: '16px' }} onClick={() => { setSearchQuery(''); setFilteredProducts(dummyProducts); setResults([]); }}>
              Reset Search Filter
            </button>
          </div>
        ) : (
          <div className="mkt-products-grid">
            {filteredProducts.map((product) => {
              const isOutOfStock = product.status?.toLowerCase() === 'out of stock';
              
              // Dynamic Picture Fallback Selector Engine
              const isCashewSearch = 
                product.name?.toLowerCase().includes('cashew') || 
                product.product_category?.toLowerCase().includes('cashew') ||
                product.category?.toLowerCase().includes('cashew');

              const fallbackResolvedImg = isCashewSearch ? cashewImg : cocoaFarmImg;

              return (
                <div className={`mkt-product-card ${isOutOfStock ? 'mkt-card-out-of-stock' : ''}`} key={product.id}>
                  
                  <div className="mkt-card-img-box">
                    {/* ✅ Removed dynamic class assignment that adds filters, keeping image fully clear */}
                    <img 
                      src={product.image || fallbackResolvedImg} 
                      alt={product.name} 
                    />
                    
                    {/* ✅ Relocated Out Of Stock Badge to the bottom-left corner layout */}
                    {isOutOfStock ? (
                      <span className="mkt-status-tag mkt-out-of-stock-badge">
                        Out Of Stock
                      </span>
                    ) : (
                      (product.status || !product.image) && (
                        <span className="mkt-status-tag verified">
                          {product.status === "Verified" ? "Verified Supplier" : (product.status || "Verified Supplier")}
                        </span>
                      )
                    )}
                  </div>
                  
                  <div className="mkt-card-body">
                    <h3 className="mkt-product-title">{product.name}</h3>
                    <p className="mkt-product-origin">
                      ORIGIN: {product.origin || `${product.region || ''}, ${product.country || ''}`}
                    </p>
                    
                    <div className="mkt-price-line">
                      <span className="mkt-price-value">PRICE: ${product.price || '1,250'}/ton</span>
                      <span className="mkt-moq-value">Min.order: 1 ton</span>
                    </div>
                    
                    <div className="mkt-card-actions">
                      <button 
                        className="mkt-btn-inquiry" 
                        onClick={handleInquiryProtectionGuard}
                        disabled={isOutOfStock}
                      >
                        Submit Inquiry
                      </button>
                      <button 
                        className="mkt-btn-chat" 
                        onClick={handleInquiryProtectionGuard}
                        disabled={isOutOfStock}
                      >
                        Chat
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

    </div>
  );
}

export default MarketplacePage;