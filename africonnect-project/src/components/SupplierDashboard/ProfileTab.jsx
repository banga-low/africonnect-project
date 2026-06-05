import React, { useState, useEffect, useRef } from 'react';
import { Save, ShieldAlert, ShieldCheck, Camera } from 'lucide-react';
import supplierAvatar from '../../assets/supplieravator.png';

// ✅ Link profile design sheet
import './ProfileTab.css';

const ProfileTab = () => {
  const fileInputRef = useRef(null);
  const [isVerified, setIsVerified] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(supplierAvatar);
  
  // Form input field states
  const [companyName, setCompanyName] = useState("Ghana Ecofarm Ltd.");
  const [businessDesc, setBusinessDesc] = useState("Connecting African commercial markets with organically sourced raw food supplies, verified agricultural products, grains, and premium local ingredients.");
  const [emailAddress, setEmailAddress] = useState("procurement@ghanaecofarm.cc");
  const [phoneNumber, setPhoneNumber] = useState("+233 24 123 4567");

  // Load saved modifications and verification state on mount
  useEffect(() => {
    // 1. Check Compliance Flag
    const verifyStatus = localStorage.getItem('supplier_verified_status');
    if (verifyStatus === 'verified') {
      setIsVerified(true);
    }

    // 2. Check Custom Avatar Flag
    const savedAvatar = localStorage.getItem('supplier_avatar_url');
    if (savedAvatar) {
      setAvatarPreview(savedAvatar);
    }

    // 3. Check Custom Corporate Metadata
    const savedName = localStorage.getItem('supplier_company_name');
    const savedDesc = localStorage.getItem('supplier_business_desc');
    const savedEmail = localStorage.getItem('supplier_email');
    const savedPhone = localStorage.getItem('supplier_phone');

    if (savedName) setCompanyName(savedName);
    if (savedDesc) setBusinessDesc(savedDesc);
    if (savedEmail) setEmailAddress(savedEmail);
    if (savedPhone) setPhoneNumber(savedPhone);
  }, []);

  // Handle image selection conversion
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  // Persist form save alterations globally
  const handleSaveProfile = (e) => {
    e.preventDefault();
    
    localStorage.setItem('supplier_avatar_url', avatarPreview);
    localStorage.setItem('supplier_company_name', companyName);
    localStorage.setItem('supplier_business_desc', businessDesc);
    localStorage.setItem('supplier_email', emailAddress);
    localStorage.setItem('supplier_phone', phoneNumber);

    // Dispatch custom tracking trigger event so top navbar header updates immediately
    window.dispatchEvent(new Event('storage_avatar_update'));

    alert("Profile Modifications Saved Successfully!");
  };

  return (
    <div className="tab-pane-layout max-width-form">
      <div className="view-action-header-row">
        <div>
          <h2>Supplier Professional Profile</h2>
          <p>Modify public company data parameters visible to verified procurement officers.</p>
        </div>
      </div>

      <div className="profile-dashboard-layout-grid">
        <form className="profile-settings-form-wrapper" onSubmit={handleSaveProfile}>
          <div className="form-input-group-row">
            <div className="form-field-item">
              <label>Company Legal Corporate Name</label>
              <input 
                type="text" 
                value={companyName} 
                onChange={(e) => setCompanyName(e.target.value)} 
              />
            </div>
            <div className="form-field-item">
              <label>Registration Reference Code</label>
              <input type="text" defaultValue="CR-GH-2026-991A" disabled style={{backgroundColor: '#f1f5f9', cursor: 'not-allowed'}} />
            </div>
          </div>

          <div className="form-field-item">
            <label>Business Description Summary</label>
            <textarea 
              rows={4} 
              value={businessDesc} 
              onChange={(e) => setBusinessDesc(e.target.value)} 
            />
          </div>

          <div className="form-input-group-row">
            <div className="form-field-item">
              <label>Primary Operational Email Address</label>
              <input 
                type="email" 
                value={emailAddress} 
                onChange={(e) => setEmailAddress(e.target.value)} 
              />
            </div>
            <div className="form-field-item">
              <label>Telephone Line / WhatsApp</label>
              <input 
                type="text" 
                value={phoneNumber} 
                onChange={(e) => setPhoneNumber(e.target.value)} 
              />
            </div>
          </div>

          <button type="submit" className="rfq-action-respond-btn flex-btn large-action-btn">
            <Save size={16} />
            <span>Save Profile Modifications</span>
          </button>
        </form>

        <div className="profile-identity-card-sidebar">
          {/* ✅ CLICKABLE AVATAR DROP-ZONE */}
          <div className="avatar-uploader-center" onClick={triggerFileInput} style={{ cursor: 'pointer' }}>
            <div className="avatar-preview-hover-container" style={{position: 'relative', display: 'inline-block'}}>
              <img src={avatarPreview} alt="Current Corporate Branding Mark" className="uploader-preview-avatar" />
              <div className="avatar-overlay-cam" style={styles.avatarOverlay}>
                <Camera size={18} color="#fff" />
              </div>
            </div>
            
            {/* Hidden native input file hook */}
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleAvatarChange} 
              accept="image/*" 
              style={{ display: 'none' }} 
            />
            <button type="button" className="edit-mini-btn" style={{marginTop: '12px'}}>
              Change Branding Mark
            </button>
          </div>
          
          {/* ✅ DYNAMIC COMPLIANCE STATUS BOX */}
          {isVerified ? (
            <div className="verification-status-sidebar-box" style={{ borderColor: '#22c55e', backgroundColor: '#f0fdf4' }}>
              <div className="status-title-row">
                <ShieldCheck size={18} color="#22c55e" />
                <span style={{fontWeight: 700, color: '#166534'}}>Account Verified</span>
              </div>
              <p style={{ color: '#166534' }}>Your verification pipeline is completely verified. Your premium priority status credentials are fully operational.</p>
            </div>
          ) : (
            <div className="verification-status-sidebar-box">
              <div className="status-title-row">
                <ShieldAlert size={18} color="#ef4444" />
                <span style={{fontWeight: 700}}>Account Unverified</span>
              </div>
              <p>Your business verification pipeline is pending document clearance. Upload regional certification papers to acquire an absolute priority badge.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  avatarOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0,
    transition: 'opacity 0.2s ease',
  }
};

export default ProfileTab;