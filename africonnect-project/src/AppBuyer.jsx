import {useNavigate} from 'react-router-dom';
import { Routes, Route, Link } from 'react-router-dom';
import { dummyProducts } from './data/dummyProducts';
import Login from './pages/Login.jsx';
import './pages/Login.css';
import './components/MarketplaceGrid.css';
import RFQPage from './pages/RFQPage.jsx';
import './pages/RFQPage.css';

function HomePage() {
  const navigate = useNavigate();
  return (
    <>
      {/* HERO SECTION */}
      <div className="hero">
        <img src="/assets2/hero-cocoa.jpg" alt="Empowering African Industry" />
      </div>

      {/* FEATURED PRODUCTS */}
      <section className="featured-products">
        <h2 className="section-title">Featured Products</h2>
        <div className="product-grid">
          {dummyProducts.map((product) => (
            <div className="product-card" key={product.id}>
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p className="location">ORIGIN: {product.origin}</p>
              <div className="price-row">
                <span className="price">PRICE: ${product.price}/kg</span>
                <span className="moq">Min.order: {product.moq} tons</span>
              </div>
              <div className="card-buttons">
                <button className="btn-primary" onClick={() => navigate('/rfq')}>Submit Inquiry</button>
                <button className="btn-secondary">Chat</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default function AppBuyer() {
  return (
    <div>
      {/* Test nav - delete this later */}
      <nav style={{ padding: '10px 20px', background: '#f5f5f5', display: 'flex', gap: '15px' }}>
        <Link to="/">Home</Link>
        <Link to="/buyer-login">Login</Link>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/buyer-login" element={<Login />} />
        <Route path="/rfq" element={<RFQPage/>} />
      </Routes>
    </div>
  );
}
