import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SupplierProfile.css';

const SupplierProfile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: 'Kelvin Daniels',
    email: 'Kelvin.Daniels@gmail.com',
    gender: '',
    phone: '',
    region: ''
  });

  return (
    <div className="profile-container">
      {/* Header */}
      <header className="profile-header">
        <div className="back-nav" onClick={() => navigate(-1)}>
          <span className="back-arrow">‹</span>
          <h2>Profile</h2>
        </div>
        <div className="avatar-upload">
          <div className="avatar-circle">
            <span>Add Image</span>
          </div>
        </div>
      </header>

      {/* Form Fields */}
      <div className="profile-form">
        <div className="form-group">
          <label>Name</label>
          <span className="value-text">{profile.name}</span>
        </div>

        <div className="form-group">
          <label>Email</label>
          <span className="value-text">{profile.email}</span>
        </div>

        <div className="form-group clickable">
          <label>Gender</label>
          <span className="chevron">›</span>
        </div>

        <div className="form-group clickable">
          <label>Phone number</label>
          <span className="chevron">›</span>
        </div>

        <div className="form-group clickable">
          <label>Country/Region</label>
          <span className="chevron">›</span>
        </div>
      </div>
    </div>
  );
};

export default SupplierProfile;