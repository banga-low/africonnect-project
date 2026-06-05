import React from 'react';
import './BuyerDashboard.css';

const BuyerDashboard = () => {
  return (
    <div className="buyer-dashboard">
      
      
      <div className="dashboard-wrapper">
        {/* Sidebar - hide on mobile, show on desktop */}
        <aside className="sidebar">
          <h3>AFRICONNECT</h3>
          <nav>
            <a className="active">Dashboard</a>
            <a href="/profile">Profile</a>
            <a href="/messages">Messages</a>
            <a href="/orders">My Orders</a>
            <a className="logout">Log out</a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="dashboard-main">
          <div className="dashboard-header">
            <h1>Welcome back, Masikana </h1>
            <p>Here’s what’s happening with your orders today</p>
          </div>

          {/* Search Bar - MISSION: 2s to buy */}
          <div className="search-bar">
            <input type="text" placeholder="Search products, suppliers, categories..." />
            <button>Search</button>
          </div>

          {/* Stats Cards */}
          <div className="stats-grid">
            <div className="stat-card">
              <h2>12</h2>
              <p>Active Orders</p>
              <span className="badge">+3 this week</span>
            </div>
            <div className="stat-card">
              <h2>08</h2>
              <p>Pending Delivery</p>
              <span className="subtext">Next: Oct 24</span>
            </div>
          </div>

          {/* Top Products */}
          <div className="products-section">
            <div className="section-header">
              <h2>Top Products</h2>
              <a href="/marketplace">View Marketplace →</a>
            </div>
            <div className="products-grid">
              <div className="product-card">
                <img src="/assets2/shea-butter.png" alt="Shea-Butter" />
                <p>Shea-Butter</p>
              </div>
              <div className="product-card">
                <img src="/assets2/sesame.jpg" alt="Sesame" />
                <p>Sesame</p>
              </div>
            </div>
          </div>

          {/* Recent Orders Table */}
          <div className="orders-section">
            <div className="section-header">
              <h2>Recent Orders</h2>
              <a href="/orders">Manage all</a>
            </div>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Product</th>
                    <th>Qty</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>#AF8472</td>
                    <td>Cashew Nuts</td>
                    <td>50 QTY</td>
                    <td><span className="status active">Delivered</span></td>
                  </tr>
                  <tr>
                    <td>#AF8473</td>
                    <td>Shea-Butter</td>
                    <td>100 QTY</td>
                    <td><span className="status active">On-Route</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default BuyerDashboard;
