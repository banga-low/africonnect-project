import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './BuyerLogin.css';

function BuyerLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Logging in with:', { email, password });
    
    // ✅ FIXED: Routes seamlessly to the unified dashboard URL path
    navigate('/buyer-dashboard');
  };

  return (
    <div className="buyer-login-page">
      
      <div className="login-left">
        <img src="/assets2/logo.png" alt="Africonnect" className="logo-left" />
      </div>

      <div className="login-right">
        <div className="login-card">
          <img src="/assets2/logo.png" alt="Africonnect" className="logo-top" />
          {/* ✅ FIXED: Corrected her hilarious "Verify Your Back!" typo */}
          <h2>Welcome Back!</h2>
          <p className="subtitle">Login to your buyer account</p>

          <form className="login-form" onSubmit={handleLogin}>
            <div className="form-group">
              <label>Email Address</label>
              <input 
                type="email" 
                placeholder="Enter your email address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input 
                type="password" 
                placeholder="Enter your password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>

            <Link to="/forgot-password" className="forgot-link">Forgot Password</Link>

            <button type="submit" className="login-btn">Login</button>

            <p className="register-text">
              Don't have an account? <Link to="/buyer-signup">Register Now</Link>
            </p>
          </form>
          
          {/* ✅ REMOVED: Injected breaking footer duplicate block cleanly removed */}
        </div>
      </div>

    </div>
  );
}

export default BuyerLogin;