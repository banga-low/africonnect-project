import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, User, MessageSquare, FileText, ShoppingBag, LogOut, Search, Bell } from 'lucide-react';
import './BuyerDashboard.css';

// Local Asset Imports Mapped From Your Directory Tree
import cashewTreeImg from '../../assets/ProductListing/cashew-tree.png';
import cashewImg from '../../assets/ProductListing/cashew.jpg';
import cocoaBeansImg from '../../assets/ProductListing/cocoa-beans.jpg';
import cocoaTreeImg from '../../assets/ProductListing/cocoa-tree.png';
import cottonImg from '../../assets/ProductListing/cotton.png';
import fineCocoaImg from '../../assets/ProductListing/fine-cocoa.png';
import gingerImg from '../../assets/ProductListing/ginger.jpg';
import milletImg from '../../assets/ProductListing/millet.jpg';
import sesameImg from '../../assets/ProductListing/sesame.jpg';
import sheaButterImg from '../../assets/ProductListing/shea-butter.png';

const BuyerDashboard = () => {
  const navigate = useNavigate();

  // Master database array holding all your imported raw materials
  const allProducts = [
    { id: 'prod-1', name: 'Premium Cotton', img: cottonImg },
    { id: 'prod-2', name: 'Split Ginger', img: gingerImg },
    { id: 'prod-3', name: 'Raw Cashew Nuts', img: cashewImg },
    { id: 'prod-4', name: 'Sesame Seeds', img: sesameImg },
    { id: 'prod-5', name: 'Premium Cocoa Beans', img: cocoaBeansImg },
    { id: 'prod-6', name: 'Organic Shea Butter', img: sheaButterImg },
    { id: 'prod-7', name: 'Pearl Millet', img: milletImg }
  ];

  // ✅ State tracks the starting index of the 2 displayed items
  const [currentIndex, setCurrentIndex] = useState(0);

  // ✅ Automatically transitions and slides/swaps items every 4 seconds
  useEffect(() => {
    const rotateInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        // Step forward by 2 items. If we run out of pairs, cycle back to the beginning!
        if (prevIndex + 2 >= allProducts.length) {
          return 0;
        }
        return prevIndex + 2;
      });
    }, 4000);

    return () => clearInterval(rotateInterval);
  }, [allProducts.length]);

  // ✅ Grab exactly two items relative to our tracking index pointer
  const visibleProducts = allProducts.slice(currentIndex, currentIndex + 2);

  // Fallback protection handler just in case the total array length is odd
  if (visibleProducts.length < 2) {
    visibleProducts.push(allProducts[0]);
  }

  return (
    <div className="buyer-dashboard-scope">
      <div className="dashboard-wrapper">
        
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-brand-block">
            <h3>TerraTrade</h3>
            <span className="brand-subtitle">Industrial Hub</span>
          </div>
          
          <nav>
            <button className="nav-btn active">
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </button>
            <button className="nav-btn" onClick={() => navigate('/buyer-profile')}>
              <User size={18} />
              <span>Profile</span>
            </button>
            <button className="nav-btn" onClick={() => navigate('/messages')}>
              <MessageSquare size={18} />
              <span>Messages</span>
            </button>
            <button className="nav-btn" onClick={() => navigate('/rfq')}>
              <FileText size={18} />
              <span>My RFQs</span>
            </button>
            <button className="nav-btn" onClick={() => navigate('/marketplace')}>
              <ShoppingBag size={18} />
              <span>Orders</span>
            </button>
            <button className="nav-btn logout" onClick={() => navigate('/')}>
              <LogOut size={18} />
              <span>Log out</span>
            </button>
          </nav>
        </aside>

        {/* Main Content Workspace */}
        <main className="dashboard-main">
          {/* Top Header Search + Meta Bar */}
          <div className="viewport-top-bar" style={styles.topBar}>
            <div className="search-bar" style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
              <Search size={16} style={styles.searchIcon} />
              <input type="text" placeholder="Search for materials, suppliers, or logistics..." />
            </div>
            <div style={styles.headerRight}>
              <Bell size={20} style={{ color: '#64748b', cursor: 'pointer' }} />
              <div style={styles.avatarPill}>
                <img src="https://placehold.co/32" alt="Profile" style={{ borderRadius: '50%' }} />
              </div>
            </div>
          </div>

          <div className="dashboard-header">
            <h1>Welcome back, Kwame</h1>
            <p>Here’s what’s happening with your procurement requests today.</p>
          </div>

          {/* Stats Cards */}
          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-label">Active RFQs</span>
              <h2>12</h2>
              <span className="badge">+3 this week</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Pending Orders</span>
              <h2>08</h2>
              <span className="subtext">Next delivery: Oct 24</span>
            </div>
          </div>

          {/* Top Products Section */}
          <div className="products-section">
            <div className="section-header">
              <div>
                <h2>Top Products</h2>
                <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: '#64748b' }}>
                  Premium products meeting strict industrial quality standards.
                </p>
              </div>
              <span className="view-market-link" onClick={() => navigate('/marketplace')}>
                View Marketplace →
              </span>
            </div>

            {/* ✅ DYNAMIC 2-ITEM ROTATING CAROUSEL LIST GRID */}
            <div className="products-grid">
              {visibleProducts.map((product, idx) => (
                <div 
                  className="product-card" 
                  key={`${product.id}-${idx}`} 
                  style={{ animation: 'fadeIn 0.5s ease-in-out', position: 'relative' }}
                >
                  <img src={product.img} alt={product.name} />
                  {/* Subtle caption overlay to showcase the asset name dynamically */}
                  <div style={styles.carouselCaption}>
                    <span>{product.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>

      </div>
    </div>
  );
};

const styles = {
  topBar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', borderBottom: '1px solid #e2e8f0', paddingBottom: '16px' },
  searchIcon: { position: 'absolute', left: '14px', color: '#64748b', zIndex: 10 },
  headerRight: { display: 'flex', alignItems: 'center', gap: '20px' },
  avatarPill: { width: '32px', height: '32px', borderRadius: '50%', overflow: 'hidden', border: '1px solid #cbd5e1' },
  carouselCaption: {
    position: 'absolute',
    bottom: '16px',
    left: '16px',
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    color: '#ffffff',
    padding: '6px 14px',
    borderRadius: '20px',
    fontSize: '0.85rem',
    fontWeight: '600',
    backdropFilter: 'blur(4px)'
  }
};

export default BuyerDashboard;