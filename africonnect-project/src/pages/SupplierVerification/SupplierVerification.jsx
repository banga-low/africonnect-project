import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileText, CheckCircle, ArrowLeft } from 'lucide-react';

const SupplierVerification = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [files, setFiles] = useState({ registration: null, taxId: null });

  const handleFileChange = (e, type) => {
    if (e.target.files[0]) {
      setFiles({ ...files, [type]: e.target.files[0].name });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!files.registration) {
      alert("Please upload at least your Business Registration Document.");
      return;
    }
    
    setSubmitted(true);
    
    // Set local storage flag so the dashboard updates state globally
    localStorage.setItem('supplier_verified_status', 'verified');
    
    // Automatically redirect back to dashboard after 2.5 seconds
    setTimeout(() => {
      navigate('/supplierdashboard');
    }, 2500);
  };

  if (submitted) {
    return (
      <div style={styles.successWrapper}>
        <div style={styles.successCard}>
          <CheckCircle size={64} color="#22c55e" />
          <h2 style={{ color: '#036942', margin: '20px 0 10px' }}>Submitted Successfully!</h2>
          <p style={{ color: '#666' }}>Our compliance team is verifying your business documentation.</p>
          <p style={{ color: '#999', fontSize: '0.85rem', marginTop: '15px' }}>Redirecting to your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <button onClick={() => navigate('/supplierdashboard')} style={styles.backBtn}>
        <ArrowLeft size={18} /> Back to Dashboard
      </button>

      <div style={styles.formCard}>
        <h2 style={styles.title}>Company Verification</h2>
        <p style={styles.subtitle}>Upload your legal documents to acquire the "Verified Supplier" badge.</p>

        <form onSubmit={handleSubmit}>
          {/* Document Unit 1 */}
          <div style={styles.uploadBox}>
            <div style={styles.boxHeader}>
              <FileText color="#036942" size={24} />
              <span style={styles.boxTitle}>Business Registration Document *</span>
            </div>
            <label style={styles.dropZone}>
              <Upload size={20} color="#666" />
              <span style={styles.dropText}>
                {files.registration ? files.registration : "Click to select Certificate of Incorporation"}
              </span>
              <input type="file" accept=".pdf,.png,.jpg" onChange={(e) => handleFileChange(e, 'registration')} style={{ display: 'none' }} />
            </label>
          </div>

          {/* Document Unit 2 */}
          <div style={styles.uploadBox}>
            <div style={styles.boxHeader}>
              <FileText color="#036942" size={24} />
              <span style={styles.boxTitle}>Tax Compliance Certificate / TIN</span>
            </div>
            <label style={styles.dropZone}>
              <Upload size={20} color="#666" />
              <span style={styles.dropText}>
                {files.taxId ? files.taxId : "Click to select valid local tax certificate"}
              </span>
              <input type="file" accept=".pdf,.png,.jpg" onChange={(e) => handleFileChange(e, 'taxId')} style={{ display: 'none' }} />
            </label>
          </div>

          <button type="submit" style={styles.submitBtn}>Submit for Compliance Verification</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: { backgroundColor: '#f9fafb', minHeight: '100vh', padding: '40px 20px', fontFamily: 'Inter, sans-serif' },
  backBtn: { display: 'flex', alignItems: 'center', gap: '8px', border: 'none', background: 'none', color: '#036942', fontWeight: '600', cursor: 'pointer', marginBottom: '20px' },
  formCard: { backgroundColor: '#ffffff', maxWidth: '600px', margin: '0 auto', padding: '40px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' },
  title: { color: '#000000', margin: '0 0 10px 0', fontSize: '1.8rem', fontWeight: '800' },
  subtitle: { color: '#666666', margin: '0 0 30px 0', fontSize: '0.95rem' },
  uploadBox: { marginBottom: '25px' },
  boxHeader: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' },
  boxTitle: { fontWeight: '600', color: '#333', fontSize: '1rem' },
  dropZone: { border: '2px dashed #eaeaea', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer', backgroundColor: '#fafafa' },
  dropText: { fontSize: '0.9rem', color: '#555', textAlign: 'center' },
  submitBtn: { width: '100%', backgroundColor: '#036942', color: '#ffffff', border: 'none', padding: '15px', borderRadius: '12px', fontSize: '1.05rem', fontWeight: '700', cursor: 'pointer', marginTop: '10px' },
  successWrapper: { backgroundColor: '#f9fafb', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' },
  successCard: { backgroundColor: '#ffffff', padding: '50px', borderRadius: '20px', textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', maxWidth: '450px', width: '90%' }
};

export default SupplierVerification;