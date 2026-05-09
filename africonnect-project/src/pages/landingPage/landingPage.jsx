import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './landingPage.css';

// ✅ Import Modal
import SearchModal from '../../components/SearchModal/SearchModal';

// Image Imports
import heroImg from '../../assets/LandingPage/hero-image.jpeg';
import cottonImg from '../../assets/LandingPage/cotton.png';
import cocoaTree from '../../assets/LandingPage/cocoa-tree.png';
import sweater from '../../assets/LandingPage/sweater.jpeg';
import wool from '../../assets/LandingPage/wool.jpeg';
import woolTree from '../../assets/LandingPage/wool-tree.png';
import cashew from '../../assets/LandingPage/cashew.jpg';
import cocoa from '../../assets/LandingPage/cocoa.png';
// ✅ New Logo Import
import logoImg from '../../assets/LandingPage/logo.png';

const LandingPage = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = (term) => {
    console.log("Search term:", term);
    setIsModalOpen(false);
  };

  const popularMaterials = [
    { name: 'cashew nuts', img: cashew },
    { name: 'cocoa', img: cocoa },
    { name: 'cotton', img: cottonImg }
  ];

  return (
    <>
      <div className="landing-container">
        <SearchModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSearch={handleSearch}
        />

        {/* 1. Navbar with Image + Text Logo */}
        <nav className="navbar">
          <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            <img src={logoImg} alt="" className="logo-icon-img" />
            <h1>Africonnect</h1>
          </div>

          <div className="nav-links">
            <a href="#home">Home</a>
            <a href="#product">Product</a>
            <a href="#buy">Buy</a>
            <button className="nav-search-btn" onClick={() => navigate('/login')}>
              Login
            </button>
          </div>
        </nav>

        {/* 2. Hero Section */}
        <header className="hero" style={{ backgroundImage: `url(${heroImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="hero-content">
            <h2 className="hero-title">Source Raw materials Across <span className="text-green">Africa,</span><br />Faster, Cheaper, And <span className="text-green">Smarter</span></h2>
            <p className="hero-subtitle">Connect with trusted suppliers, compare prices, and source raw materials across the continent.</p>
            <div className="hero-btns">
              <button className="btn-primary" onClick={() => setIsModalOpen(true)}>Search Materials</button>
              <button className="btn-primary btn-spacer" onClick={() => navigate('/signup')}>Become a supplier</button>
            </div>
          </div>
        </header>

        {/* 3. Statistics Section */}
        <section className="stats-grid">
          <div className="stat-card">5000+ Suppliers</div>
          <div className="stat-card">20+ African countries</div>
          <div className="stat-card">Verified Suppliers</div>
          <div className="stat-card">Transparent Pricing</div>
        </section>

        {/* 4. Sourcing Huddle (Mosaic) */}
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

        {/* 6 & 7. Info Sections */}
        <section className="info-section">
          <h3 className="section-title">About <span className="text-green">Africonnect</span></h3>
          <p className="lorem-text">Africonnect is revolutionizing how businesses source raw materials by leveraging geospatial machine learning to find the most efficient, cost-effective, and reliable suppliers across the African continent.</p>
        </section>

        <section className="info-section">
          <h3 className="section-title">Why choose <span className="text-green">Africonnect</span></h3>
          <ul className="check-list">
            <li>Verified supplier network</li>
            <li>Lower sourcing cost</li>
            <li>Cross-border access</li>
            <li>Faster procurement</li>
          </ul>
        </section>
      </div>

      {/* 8. Footer with Image + Text Logo */}
      <footer className="footer">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">
              <img src={logoImg} alt="" className="logo-icon-img-small" />
              <h2>AFRICONNECT</h2>
            </div>
            <p>Connecting African businesses with verified raw material suppliers.</p>
          </div>

          <div className="footer-links-container">
            <div className="footer-column">
              <h4>Product</h4>
              <ul>
                <li><a href="#search">Search & Buy</a></li>
                <li><a href="#suppliers">Find Suppliers</a></li>
                <li><a href="#list">List Your Products</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>Company</h4>
              <ul>
                <li><a href="#about">About Africonnect</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>Legal</h4>
              <ul>
                <li><a href="#tos">Terms of Service</a></li>
                <li><a href="#privacy">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© AFRICONNECT 2024. All rights reserved.</p>
          <p className="footer-tagline">“Build the West African tech”</p>
        </div>
      </footer>
    </>
  );
};

export default LandingPage;