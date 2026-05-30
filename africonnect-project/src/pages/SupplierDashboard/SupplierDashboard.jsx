import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { 
  LayoutDashboard, 
  Box, 
  FileText, 
  MessageSquare, 
  User, 
  LogOut, 
  Search, 
  Bell, 
  Settings 
} from 'lucide-react';
import './SupplierDashboard.css';

// Logo Graphic Import 
import logoImg from '../../assets/LandingPage/logo.png';
import supplierAvatar from '../../assets/supplieravator.png';

// ✅ Dynamic Tab Sub-Components Imports
import OverviewTab from '../../components/SupplierDashboard/OverviewTab';
import MyProductsTab from '../../components/SupplierDashboard/MyProductsTab';
import RfqsTab from '../../components/SupplierDashboard/RfqsTab';
import MessagesTab from '../../components/SupplierDashboard/MessagesTab';
import ProfileTab from '../../components/SupplierDashboard/ProfileTab';

const SupplierDashboard = () => {
  const navigate = useNavigate(); 
  const [activeTab, setActiveTab] = useState('overview');

  // ✅ Swapped out div placeholders to return your real feature components seamlessly
  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab />;
      case 'products':
        return <MyProductsTab />;
      case 'rfqu':
        return <RfqsTab />;
      case 'messages':
        return <MessagesTab />;
      case 'profile':
        return <ProfileTab />;
      default:
        return <OverviewTab />;
    }
  };

  return (
    <div className="dashboard-app-frame">
      
      {/* 1. LEFT PERSISTENT SIDEBAR */}
      <aside className="dashboard-sidebar">
        {/* Brand identity lockup */}
        <div className="sidebar-logo-block" onClick={() => navigate('/')}>
          <img src={logoImg} alt="Africonnect Logo" className="sidebar-logo-img" />
          <h2 className="logo-text">
            <span className="text-green">FRI</span>
            <span className="text-black">CONNECT</span>
          </h2>
        </div>
        <span className="sidebar-subtitle">Supplier Dashboard</span>

        {/* Navigation Item Tree */}
        <nav className="sidebar-nav-tree">
          <button 
            className={`nav-item-link ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <LayoutDashboard size={18} />
            <span>Overview</span>
          </button>

          <button 
            className={`nav-item-link ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            <Box size={18} />
            <span>My Products</span>
          </button>

          <button 
            className={`nav-item-link ${activeTab === 'rfqu' ? 'active' : ''}`}
            onClick={() => setActiveTab('rfqu')}
          >
            <FileText size={18} />
            <span>RFQs</span>
          </button>

          <button 
            className={`nav-item-link ${activeTab === 'messages' ? 'active' : ''}`}
            onClick={() => setActiveTab('messages')}
          >
            <MessageSquare size={18} />
            <span>Messages</span>
          </button>

          <button 
            className={`nav-item-link ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <User size={18} />
            <span>Profile</span>
          </button>
        </nav>

        {/* Logout anchoring footer action */}
        <div className="sidebar-footer-block">
          <button className="sidebar-logout-btn" onClick={() => navigate('/login')}>
            <LogOut size={18} />
            <span>Log out</span>
          </button>
        </div>
      </aside>

      {/* 2. RIGHT-SIDE VIEW PORT DATA CONTAINER CONTAINER */}
      <div className="dashboard-viewport-right">
        
        {/* Top Navbar Control Strip */}
        <header className="viewport-top-header">
          <div className="header-search-wrapper">
            <Search className="search-box-icon" size={18} />
            <input type="text" placeholder="Search Category" className="header-search-input" />
          </div>

          <div className="header-actions-wrapper">
            <button className="icon-badge-btn">
              <Bell size={20} />
              <span className="badge-dot"></span>
            </button>
            <button className="icon-badge-btn">
              <Settings size={20} />
            </button>
            
            <div className="header-profile-pill">
              <img src={supplierAvatar} alt="Supplier Profile Avatar" className="user-pill-avatar" />
              <span className="user-pill-name">Ghana Ecofarm Ltd.</span>
            </div>
          </div>
        </header>

        {/* Dynamic Nested Screen Content Port Injector */}
        <main className="viewport-main-content">
          {renderTabContent()}
        </main>
      </div>

    </div>
  );
};

export default SupplierDashboard;