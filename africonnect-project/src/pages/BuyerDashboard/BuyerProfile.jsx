import React from 'react';
import './BuyerProfile.css';

const BuyerProfile = () => {
  return (
    <div className="profile-page">
      <div className="profile-wrapper">
        {/* Sidebar - same as dashboard */}
        <aside className="sidebar">
          <h3>AFRICONNECT</h3>
          <nav>
            <a href="/dashboard">Dashboard</a>
            <a className="active">Profile</a>
            <a href="/messages">Messages</a>
            <a href="/orders">My Orders</a>
            <a className="logout">Log out</a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="profile-main">
          <div className="profile-header">
            <h1>Profile Settings</h1>
            <p>Manage your account and preferences</p>
          </div>

          <div className="profile-card">
            <div className="avatar-section">
              <img src="/assets2/logo.png" alt="Profile" className="avatar" />
              <button className="change-photo">Change Photo</button>
            </div>

            <form className="profile-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" defaultValue="Masikana" />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" defaultValue="queen@africonnect.com" />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Phone</label>
                  <input type="tel" defaultValue="+263 77 123 4567" />
                </div>
                <div className="form-group">
                  <label>Country</label>
                  <select defaultValue="Zimbabwe">
                    <option>Nigeria</option>
                    <option>Ghana</option>
                    <option>Kenya</option>
                  </select>
                </div>
              </div>

              <div className="form-group full">
                <label>Company / Business Name</label>
                <input type="text" defaultValue="Queen Trading Co." />
              </div>

              <div className="form-actions">
                <button type="button" className="btn-secondary">Cancel</button>
                <button type="submit" className="btn-primary">Save Changes</button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default BuyerProfile;
