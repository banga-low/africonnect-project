import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, FileText, MessageSquare, TrendingUp } from 'lucide-react';
import './BuyerLogin.css';

export default function BuyerLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Helper method to resolve smooth conditional navigation flows post-authentication
  const handleAuthNavigationRedirect = () => {
    // ✅ SAVE THE ACTIVE AUTHENTICATION FLAG IN BROWSER STORAGE
    localStorage.setItem('isLoggedIn', 'true');

    // Check if the user was intercepted with an intentional destination path bookmark
    const targetFormPath = localStorage.getItem('redirect_after_auth');

    if (targetFormPath) {
      console.log(`Intercepted destination found: ${targetFormPath}. Rerouting user...`);
      localStorage.removeItem('redirect_after_auth'); // Instantly clean up temporary redirection bookmark
      navigate(targetFormPath); // Send them directly back to file the live form!
    } else {
      // Default baseline route path if they simply decided to login manually from a navbar route link
      navigate('/buyer-dashboard');
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Logging in buyer manually with:', { email, password });
    
    // Execute unified route check engine
    handleAuthNavigationRedirect();
  };

  const handleGoogleLogin = () => {
    console.log('Google Auth login layer triggered');
    alert('Connecting to secure Google Account single sign-on...');
    
    // Execute unified route check engine
    handleAuthNavigationRedirect();
  };

  return (
    <div className="byr-login-container">
      <div className="byr-login-inner">
        
        {/* LEFT SIDE: VALUE PROPOSITION GRID */}
        <div className="byr-login-left">
          <div className="byr-restricted-badge">
            <span className="lock-icon">🔒</span> Restricted Action
          </div>
          
          <h1 className="byr-main-heading">Join the Network Of 2000+ buyers</h1>
          <p className="byr-main-desc">
            Access the leading industrial marketplace for African raw materials. 
            Verify your business to start submitting inquiries and closing deals.
          </p>

          <div className="byr-feature-matrix">
            <div className="byr-feature-card">
              <div className="byr-icon-box bg-green">
                <ShieldCheck size={20} color="#22c55e" />
              </div>
              <h3>Verified Supplier Access</h3>
              <p>Connect exclusively with trusted suppliers across the continent.</p>
            </div>

            <div className="byr-feature-card">
              <div className="byr-icon-box bg-green">
                <FileText size={20} color="#22c55e" />
              </div>
              <h3>Secure RFQ Management</h3>
              <p>Track all your requests for quotation in a centralized, professional dashboard.</p>
            </div>

            <div className="byr-feature-card">
              <div className="byr-icon-box bg-green">
                <MessageSquare size={20} color="#22c55e" />
              </div>
              <h3>Direct Communication</h3>
              <p>Encrypted messaging channels for seamless negotiations with suppliers.</p>
            </div>

            <div className="byr-feature-card">
              <div className="byr-icon-box bg-green">
                <TrendingUp size={20} color="#22c55e" />
              </div>
              <h3>Real-time Pricing</h3>
              <p>Stay ahead with live market prices.</p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: AUTHENTICATION FORM CARD */}
        <div className="byr-login-right">
          <div className="byr-auth-card">
            <div className="byr-card-header">
              <h2>Welcome Back</h2>
              <p>Choose how you want to access the platform</p>
            </div>

            {/* Google OAuth Button Element with clean inline vector path paths */}
            <button className="byr-google-btn" type="button" onClick={handleGoogleLogin}>
              <svg className="byr-google-icon-svg" viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
              </svg>
              <span>Continue with Google</span>
            </button>

            <div className="byr-divider">
              <span>OR SIGN IN</span>
            </div>

            <form onSubmit={handleLogin} className="byr-form-element">
              <div className="byr-input-group">
                <label>Email</label>
                <input 
                  type="email" 
                  placeholder="johndoe@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="byr-input-group">
                <label>Password</label>
                <input 
                  type="password" 
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {/* High Fidelity Deep Solid Sign In Action Button Token */}
              <button type="submit" className="byr-submit-btn">Sign In</button>
            </form>

            <div className="byr-card-footer">
              <Link to="/forgot-password" className="byr-forgot-link">Forgot password?</Link>
              <p className="byr-register-redirect">
                Don't have an account? <Link to="/buyer-signup">Register Now</Link>
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}