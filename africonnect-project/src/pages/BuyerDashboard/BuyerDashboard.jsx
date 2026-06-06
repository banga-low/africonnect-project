import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, User, MessageSquare, FileText, ShoppingBag, LogOut, Search, Bell } from 'lucide-react';
import './BuyerDashboard.css';

const BuyerDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="buyer-dashboard-scope">
      <div className="dashboard-wrapper">
        
        {/* ✅ SIDEBAR MATCHED WITH SCREENSHOT DESIGN */}
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
            <div className="search-bar">
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

          {/* Top Products */}
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
            <div className="products-grid">
              <div className="product-card">
                <img src="https://images.unsplash.com/photo-1594488270432-8419dbf2e622?auto=format&fit=crop&q=80&w=600" alt="Cotton" />
              </div>
              <div className="product-card">
                <img src="https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&q=80&w=600" alt="Ginger" />
              </div>
            </div>
          </div>
        </main>

      </div>
    </div>
  );
};

const styles = {
  topBar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', borderBottom: '1px solid #e2e8f0', paddingBottom: '16px' },
  searchIcon: { position: 'absolute', left: '14px', color: '#64748b' },
  headerRight: { display: 'flex', alignItems: 'center', gap: '20px' },
  avatarPill: { width: '32px', height: '32px', borderRadius: '50%', overflow: 'hidden', border: '1px solid #cbd5e1' }
};

export default BuyerDashboard;