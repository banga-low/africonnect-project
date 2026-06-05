import React from 'react';
import { useNavigate } from 'react-router-dom';

const AuthModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  // Handle background click to close modal
  const handleOverlayClick = (e) => {
    if (e.target.className === 'modal-overlay') {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick} style={styles.overlay}>
      <div className="modal-content" style={styles.content}>
        <button onClick={onClose} style={styles.closeBtn}>✕</button>
        
        <h3 style={styles.title}>Login to AFRICONNECT</h3>
        <p style={styles.subtitle}>Select your portal account type to proceed</p>
        
        <div style={styles.btnContainer}>
          <button 
            style={styles.portalBtn} 
            onClick={() => { navigate('/buyer-login'); onClose(); }}
          >
            Login as a Buyer
          </button>
          
          <button 
            style={{ ...styles.portalBtn, ...styles.supplierBtn }} 
            onClick={() => { navigate('/supplier-login'); onClose(); }}
          >
            Login as a Supplier
          </button>
        </div>
      </div>
    </div>
  );
};

// Quick structural inline styling to guarantee zero duplicate CSS style collisions
const styles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  content: {
    backgroundColor: '#ffffff',
    padding: '40px 30px',
    borderRadius: '16px',
    maxWidth: '400px',
    width: '90%',
    textAlign: 'center',
    position: 'relative',
    boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.1)',
  },
  closeBtn: {
    position: 'absolute',
    top: '15px', right: '15px',
    background: 'none',
    border: 'none',
    fontSize: '1.2rem',
    cursor: 'pointer',
    color: '#666',
  },
  title: {
    margin: '0 0 10px 0',
    color: '#036942',
    fontSize: '1.6rem',
    fontWeight: '800',
  },
  subtitle: {
    margin: '0 0 30px 0',
    color: '#666666',
    fontSize: '0.95rem',
  },
  btnContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  portalBtn: {
    padding: '14px 20px',
    borderRadius: '12px',
    border: '2px solid #036942',
    backgroundColor: '#ffffff',
    color: '#036942',
    fontSize: '1.05rem',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  supplierBtn: {
    backgroundColor: '#036942',
    color: '#ffffff',
  }
};

export default AuthModal;