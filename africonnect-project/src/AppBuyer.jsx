import{dummyProducts} from './data/dummyProducts';

import MarketplaceGrid from './components/MarketplaceGrid'
import "./components/MarketplaceGrid.css";


function AppBuyer(){
    return(
        <div>
            {/*HERO SECTION */}
    <div className="hero">
  <img src="/assets2/hero-cocoa.jpg" alt="Empowering African Industry" />
</div>
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
          <button className="btn-primary">Submit Inquiry</button>
          <button className="btn-secondary">Chat</button>
        </div>
      </div>
    ))}
  </div>
</section>

<div className="product-grid">
  {/* your 3 product cards here using /assets2/cashew.jpg etc */}
</div>

<h2 className="section-title">Verified Top suppliers</h2>
<p className="section-subtitle">Direct access to Africa's most reliable high-volume suppliers</p>

<div className="product-grid">
  <div className="product-card">
    <img src="/assets2/cocoa-beans.jpg" alt="Cocoa" />
    <h3>Lualaba cocoa farm</h3>
    <p className="location">ORIGIN: Abuja, Nigeria</p>
    <div className="price-row">
      <span className="price">PRICE: $1,200/kg</span>
      <span className="moq">Min.order: 10 tons</span>
    </div>
    <div className="card-buttons">
      <button className="btn-primary">Submit Inquiry</button>
      <button className="btn-secondary">Chat</button>
    </div>
  </div>

  <div className="product-card">
    <img src="/assets2/cashew.jpg" alt="Cashew nuts" />
    <h3>Helios Cashew nuts</h3>
    <p className="location">ORIGIN: Lagos, Nigeria</p>
    <div className="price-row">
      <span className="price">PRICE: $800/kg</span>
      <span className="moq">Min.order: 10 tons</span>
    </div>
    <div className="card-buttons">
      <button className="btn-primary">Submit Inquiry</button>
      <button className="btn-secondary">Chat</button>
    </div>
  </div>

  <div className="product-card">
    <img src="/assets2/cocoa-beans.jpg" alt="Warehouse" />
    <h3>Ivory Gold cocoa warehouse</h3>
    <p className="location">ORIGIN: Lagos, Nigeria</p>
    <div className="price-row">
      <span className="price">PRICE: $1,200/kg</span>
      <span className="moq">Min.order: 10 tons</span>
    </div>
    <div className="card-buttons">
      <button className="btn-primary">Submit Inquiry</button>
      <button className="btn-secondary">Chat</button>
    </div>
  </div>
</div>
            </div>

    )
}

export default AppBuyer;

