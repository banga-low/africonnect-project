import './BuyerLogin.css'
import { Link } from 'react-router-dom'

function BuyerLogin() {
  return (
    <div className="buyer-login-page">
      
      <div className="login-left">
        <img src="/assets2/logo.png" alt="Africonnect" className="logo-left" />
      </div>

      <div className="login-right">
        <div className="login-card">
          <img src="/assets2/logo.png" alt="Africonnect" className="logo-top" />
          <h2>Verify Your Back!</h2>
          <p className="subtitle">Login to your buyer account</p>

          <form className="login-form">
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" placeholder="Enter your email address" />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input type="password" placeholder="Enter your password" />
            </div>

            <Link to="/forgot-password" className="forgot-link">Forgot Password</Link>

            <button type="submit" className="login-btn">Login</button>

            <p className="register-text">
              Don't have an account? <Link to="/buyer-signup">Register Now</Link>
            </p>
          </form>
          <footer className="footer" style={{background:'#1a3d2a', color:'white', padding:'3rem', marginTop:'4rem'}}>
            <p>© AFRICONNECT 2026. All Rights Reserved.</p>
          </footer>  
        </div>
      </div>

    </div>
  )
}
export default BuyerLogin