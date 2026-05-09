import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import { User, Box, Upload, CheckCircle, List, Bell, Search } from 'lucide-react';
import './SupplierDashboard.css';
import supplieravator from '../../assets/supplieravator.png';
import '../../components/ProductListing/ProductListing'

const SupplierDashboard = () => {
  const navigate = useNavigate(); 

  return (
    <div className="dashboard-container">
      {/* --- Navbar --- */}
      <nav className="dash-navbar">
        <div className="dash-logo">
          <div className="logo-circle"></div>
          <h1>Africonnect</h1>
        </div>
        
        <div className="search-bar">
          <input type="text" placeholder="" />
          <Search className="search-icon" size={20} />
        </div>

        <div className="nav-profile">
          <Bell className="notif-icon" />
          <div className="profile-avatar">
            <img src={supplieravator} alt="Profile" />
          </div>
          <button className="logout-btn">
            Logout
          </button>
        </div>
      </nav>

      {/* --- Main Content --- */}
      <main className="dash-content">
        <div className="welcome-header">
          <h2>Hi, Daniels</h2>
          <div className="verification-status">
            <span>Complete verification</span>
            <div className="progress-bg">
              <div className="progress-fill" style={{ width: '66%' }}></div>
            </div>
            <span className="progress-text">1/3</span>
          </div>
        </div>

        <section className="features-section">
          <h1 className="section-heading">Features</h1>
          
          <div className="feature-grid top-grid">
            {/* Added onClick to trigger navigation to your new route */}
            <div 
              className="feature-card clickable" 
              onClick={() => navigate('/supplier-set-profile')}
              style={{ cursor: 'pointer' }}
            >
              <User size={40} strokeWidth={1.5} />
              <p>Set Profile</p>
            </div>

            <div
             className="feature-card"
             onClick={() => navigate('/product-listing')}
             style={{ cursor: 'pointer' }}
             >
              <Box size={40} strokeWidth={1.5} />
              <p>Product listing</p>
            </div>
            <div className="feature-card">
              <Upload size={40} strokeWidth={1.5} />
              <p>Upload document</p>
            </div>
          </div>

          <div className="divider">
            <span className="star-icon">★</span>
          </div>

          <div className="feature-grid bottom-grid">
            <div className="feature-card">
              <CheckCircle size={40} strokeWidth={1.5} />
              <p>Verify Email</p>
            </div>
            <div className="feature-card">
              <List size={40} strokeWidth={1.5} />
              <p>Product Category</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SupplierDashboard;