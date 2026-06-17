import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './landingPage.css';

// Image Imports
import heroImg from '../../assets/LandingPage/hero-image.jpeg';
import cottonImg from '../../assets/LandingPage/cotton.png';
import cocoaTree from '../../assets/LandingPage/cocoa-tree.png';
import sweater from '../../assets/LandingPage/sweater.jpeg';
import wool from '../../assets/LandingPage/wool.jpeg';
import woolTree from '../../assets/LandingPage/wool-tree.png';
import cashew from '../../assets/LandingPage/cashew.jpg';
import cocoa from '../../assets/LandingPage/cocoa.png';

// Logo Import
import logoImg from '../../assets/LandingPage/logo.png';

// AuthModal Import
import AuthModal from '../../components/AuthModal/AuthModal';

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

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <>
      <div className="landing-container">

        {/* 1. Navbar with Proportional Logo Constraints */}
        <nav className="navbar">
          <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            <img src={logoImg} alt="Africonnect Logo" className="logo-icon-img" />
            <h1 className="logo-text">
              <span className="text-green" style={{ color: '#036942' }}>FRI</span>
              <span className="text-black" style={{ color: '#000000' }}>CONNECT</span>
            </h1>
          </div>

          <div className="nav-links">
            <span onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>Home</span>
            <span onClick={() => navigate('/marketplace')} style={{ cursor: 'pointer' }}>Buy</span>
            
            {/* ✅ FIXED: Wipes out lingering RFQ redirection state flags on direct header click intent */}
            <button 
              className="nav-search-btn" 
              onClick={() => {
                localStorage.removeItem('redirect_after_auth');
                setIsAuthModalOpen(true);
              }}
            >
              Login
            </button>
          </div>
        </nav>

        {/* 2. Hero Section */}
        <header className="hero" style={{ backgroundImage: `url(${heroImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="hero-content">
            <h2 className="hero-title">Source Raw materials Across <span className="text-green" style={{ color: '#036942' }}>Africa,</span><br />Faster, Cheaper, And <span className="text-green" style={{ color: '#036942' }}>Smarter</span></h2>
            <p className="hero-subtitle">Connect with trusted suppliers, compare prices, and source raw materials across the continent.</p>
            <div className="hero-btns">
              <button className="btn-primary" onClick={() => setIsModalOpen(true)}>Search Materials</button>
              <button className="btn-primary btn-spacer" onClick={() => navigate('/supplier-signup')}>
                Become a supplier
              </button>
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
            <h3>Sourcing <span className="text-green" style={{ color: '#036942' }}>raw</span> materials shouldn't be a hurdle</h3>
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
              <div key={item.name} className="material-item" onClick={() => navigate('/marketplace')} style={{ cursor: 'pointer' }}>
                <img src={item.img} alt={item.name} className="material-thumb" />
                <span className="material-name">{item.name.toUpperCase()}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 6 & 7. Info Sections */}
        <section className="info-section">
          <h3 className="section-title">About <span className="text-green" style={{ color: '#036942' }}>Africonnect</span></h3>
          <p className="lorem-text">Africonnect is revolutionizing how businesses source raw materials by leveraging geospatial machine learning to find the most efficient, cost-effective, and reliable suppliers across the African continent.</p>
        </section>

        {/* Core Value Pillar Points */}
        <section className="info-section">
          <h3 className="section-title">Why choose <span className="text-green" style={{ color: '#036942' }}>Africonnect</span></h3>
          <ul className="check-list">
            <li>Verified supplier network</li>
            <li>Lower sourcing cost</li>
            <li>Cross-border access</li>
            <li>Faster procurement</li>
          </ul>
        </section>
      </div>

      {/* 8. Modernized Footer Element */}
      <footer className="footer" style={{ backgroundColor: '#ffffff', color: '#222222', paddingTop: '80px', borderTop: '1px solid #eaeaea', width: '100%', display: 'block', margin: '0' }}>
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
              <img src={logoImg} alt="Africonnect Logo" className="logo-icon-img-small" />
              <h2 className="logo-text">
                <span className="text-green" style={{ color: '#036942' }}>FRI</span>
                <span className="text-black" style={{ color: '#000000' }}>CONNECT</span>
              </h2>
            </div>
            <p style={{ color: '#333333', fontSize: '0.95rem', maxWidth: '340px', lineHeight: '1.5', marginTop: '15px', marginBottom: '0' }}>
              Connecting African businesses with verified raw material suppliers.
            </p>

            <div className="lp-designer-footer-trust">
              <svg viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', flexShrink: 0 }}>
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="m9 11 2 2 4-4" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="lp-designer-trust-text">Escrow Supported</span>
            </div>
          </div>

          <div className="footer-links-container">
            <div className="footer-column">
              <h4 style={{ color: '#2bb673', marginBottom: '25px', fontSize: '1.2rem', fontWeight: '700' }}>Product</h4>
              <ul>
                <li style={{ marginBottom: '16px' }}><span onClick={() => navigate('/how-it-works')} style={{ cursor: 'pointer', color: '#222222', fontSize: '0.95rem', fontWeight: '500' }}>How It Works</span></li>
                <li style={{ marginBottom: '16px' }}><span onClick={() => navigate('/marketplace')} style={{ cursor: 'pointer', color: '#222222', fontSize: '0.95rem', fontWeight: '500' }}>Find Suppliers</span></li>
                <li style={{ marginBottom: '16px' }}><span onClick={() => navigate('/signup')} style={{ cursor: 'pointer', color: '#222222', fontSize: '0.95rem', fontWeight: '500' }}>List Your Products</span></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4 style={{ color: '#2bb673', marginBottom: '25px', fontSize: '1.2rem', fontWeight: '700' }}>Company</h4>
              <ul>
                <li style={{ marginBottom: '16px' }}><a href="#about" style={{ color: '#222222', textDecoration: 'none', fontSize: '0.95rem', fontWeight: '500' }}>About Africonnect</a></li>
                <li style={{ marginBottom: '16px' }}><a href="#contact" style={{ color: '#222222', textDecoration: 'none', fontSize: '0.95rem', fontWeight: '500' }}>Contact</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4 style={{ color: '#2bb673', marginBottom: '25px', fontSize: '1.2rem', fontWeight: '700' }}>Legal</h4>
              <ul>
                <li style={{ marginBottom: '16px' }}><a href="#tos" style={{ color: '#222222', textDecoration: 'none', fontSize: '0.95rem', fontWeight: '500' }}>Terms of Service</a></li>
                <li style={{ marginBottom: '16px' }}><a href="#privacy" style={{ color: '#222222', textDecoration: 'none', fontSize: '0.95rem', fontWeight: '500' }}>Privacy Policy</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom" style={{ backgroundColor: '#22c55e', color: '#ffffff', textAlign: 'center', padding: '22px 0', width: '100%', display: 'block', margin: '0' }}>
          <p style={{ margin: '0', padding: '0' }}>© AFRICONNECT 2026. All rights reserved.</p>
        </div>
      </footer>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </>
  );
};

export default LandingPage;