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
    
    // Smooth navigation directly to the client-side buyer core dashboard
    navigate('/buyer-dashboard');
  };

  return (
    <div className="buyer-auth-scope">
      <div className="auth-card-wrapper">
        <div className="auth-header-block">
          <h2>Welcome Back!</h2>
          <p>Login to your buyer account</p>
        </div>

        <form className="auth-form-element" onSubmit={handleLogin}>
          <div className="auth-field-group">
            <label>Email Address</label>
            <input 
              type="email" 
              placeholder="Enter your email address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          <div className="auth-field-group">
            <div className="label-row-forgot">
              <label>Password</label>
              <Link to="/forgot-password" style={{ textDecoration: 'none' }} className="forgot-password-link">
                Forgot Password?
              </Link>
            </div>
            <input 
              type="password" 
              placeholder="Enter your password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          <button type="submit" className="auth-execute-btn">Login</button>

          <p className="auth-redirect-footer">
            Don't have an account? <Link to="/buyer-signup">Register Now</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default BuyerLogin;