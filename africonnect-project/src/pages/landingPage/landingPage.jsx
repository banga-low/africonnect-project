import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './landingPage.css';

// ✅ Import Modal
import SearchModal from '../../components/SearchModal/SearchModal';

// Image Imports
import heroImg from '../../assets/LandingPage/hero-image.jpeg'
import cottonImg from '../../assets/LandingPage/cotton.png';
import cocoaTree from '../../assets/LandingPage/cocoa-tree.png';
import sweater from '../../assets/LandingPage/sweater.jpeg';
import wool from '../../assets/LandingPage/wool.jpeg';
import woolTree from '../../assets/LandingPage/wool-tree.png';
import cashew from '../../assets/LandingPage/cashew.jpg';
import cocoa from '../../assets/LandingPage/cocoa.png';

const LandingPage = () => {
  const navigate = useNavigate(); 

  // --- ML Integration Logic ---
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // ✅ Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ✅ Updated to accept dynamic term
  const handleSearch = async (term) => {
    setIsSearching(true);
    try {
      const response = await fetch(`http://127.0.0.1:8000/search?term=${term}&lat=-1.28&lng=36.82`);
      const data = await response.json();
      setResults(data);
      setIsModalOpen(false); // close modal after search
    } catch (error) {
      console.error("ML Engine connection failed:", error);
      alert("Make sure your Python Uvicorn server is running!");
    } finally {
      setIsSearching(false);
    }
  };

  const popularMaterials = [
    { name: 'cashew nuts', img: cashew },
    { name: 'cocoa', img: cocoa },
    { name: 'cotton', img: cottonImg }
  ];

  return (
    <div className="landing-container">

      {/* ✅ SEARCH MODAL */}
      <SearchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSearch={handleSearch}
        isSearching={isSearching}
      />

      {/* 1. Navbar */}
      <nav className="navbar">
        <div className="logo">
          <span className="logo-icon"></span>
          <h1>Africonnect</h1>
        </div>
        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#product">Product</a>
          <a href="#buy">Buy</a>
          <button className="nav-search-btn" onClick={() => navigate('/login')}>Login</button>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <header 
        className="hero" 
        style={{ backgroundImage: `url(${heroImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="hero-content">
          <h2 className="hero-title">
            Source Raw materials Across <span className="text-green">Africa,</span><br />
            Faster, Cheaper, And <span className="text-green">Smarter</span>
          </h2>
          <p className="hero-subtitle">
            Connect with trusted suppliers, compare prices, and source raw materials across the continent.
          </p>
          <div className="hero-btns">

            {/* ✅ OPEN MODAL INSTEAD */}
            <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
              Search Materials
            </button>

            <button className="btn-primary btn-spacer" onClick={() => navigate('/signup')}>
               Become a supplier
            </button>
          </div>
        </div>
      </header>

      {/* --- ML Results --- */}
      {results.length > 0 && (
        <section className="ml-results-wrapper">
          <div className="results-header">
            <h3>Smart Search Results (Diversified across Africa)</h3>
            <button className="close-results" onClick={() => setResults([])}>×</button>
          </div>
          <div className="ml-results-grid">
            {results.map((supplier, index) => (
              <div key={index} className="ml-card">
                <div className="ml-card-top">
                  <span className="country-badge">{supplier.country}</span>
                  <h4>{supplier.name}</h4>
                </div>
                <p className="ml-product">Material: {supplier.product}</p>
                <div className="ml-card-bottom">
                  <span>📍 {supplier.distance} km away</span>
                  <span className="relevance-score">Score: {supplier.relevance}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 3. Statistics Section */}
      <section className="stats-grid">
        <div className="stat-card">5000+ Suppliers</div>
        <div className="stat-card">20+ African countries</div>
        <div className="stat-card">Verified Suppliers</div>
        <div className="stat-card">Transparent Pricing</div>
      </section>

      {/* 4. Sourcing Materials */}
      <section className="sourcing-huddle">
        <div className="huddle-text">
          <h3>Sourcing <span className="text-green">raw</span> materials shouldn't be a hurdle</h3>
        </div>
        <div className="huddle-grid">
          <img src={cocoaTree} alt="Cocoa tree" className="huddle-img" />
          <img src={sweater} alt="Sweater" className="huddle-img" />
          <img src={wool} alt="Wool" className="huddle-img" />
          <img src={woolTree} alt="Wool tree" className="huddle-img" />
        </div>
      </section>

      {/* 5. Popular Materials */}
      <section className="materials-section">
        <h3 className="section-title">Popular materials on Africonnect</h3>
        <div className="material-list">
          {popularMaterials.map((item) => (
            <div key={item.name} className="material-item">
              <img src={item.img} alt={item.name} className="material-thumb" />
              <span className="material-name">{item.name.toUpperCase()}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 6. About */}
      <section className="info-section">
        <h3 className="section-title">About <span className="text-green">Africonnect</span></h3>
        <p className="lorem-text">
          Africonnect is revolutionizing how businesses source raw materials by leveraging 
          geospatial machine learning to find the most efficient, cost-effective, and 
          reliable suppliers across the African continent.
        </p>
      </section>

      {/* 7. Why Choose */}
      <section className="info-section">
        <h3 className="section-title">Why choose <span className="text-green">Africonnect</span></h3>
        <ul className="check-list">
          <li>Verified supplier network</li>
          <li>Lower sourcing cost</li>
          <li>Cross-border access</li>
          <li>Faster procurement</li>
        </ul>
      </section>

      {/* 8. Footer */}
      <footer className="footer">
        <div className="footer-content">
          <h2 className="hero-title">
            Source Raw materials Across <span className="text-green">Africa,</span><br />
            Faster, Cheaper, And <span className="text-green">Smarter</span>
          </h2>
          <div className="footer-btns">

            {/* ✅ ALSO OPEN MODAL */}
            <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
              Search Materials
            </button>

            <button className="btn-primary btn-spacer" onClick={() => navigate('/signup')}>
               Become a supplier
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;