import React from 'react';
import { ArrowLeft, Plus, Filter, MoreVertical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './ProductListing.css';

// Importing your assets
import cashewImg from '../../assets/ProductListing/cashew.jpg'
import cocoaImg from '../../assets/ProductListing/cocoa-beans.jpg';
import cottonImg from '../../assets/ProductListing/cotton.png';
import gingerImg from '../../assets/ProductListing/ginger.jpg';
import sesameImg from '../../assets/ProductListing/sesame.jpg';
import sheaImg from '../../assets/ProductListing/shea-butter.png';

const ProductListing = () => {
  const navigate = useNavigate();

  const products = [
    { id: 1, name: 'Premium Cocoa Beans', category: 'Agriculture', price: '$2,400/ton', origin: 'Ghana', stock: '50 Tons', img: cocoaImg },
    { id: 2, name: 'Raw Cashew Nuts', category: 'Nuts', price: '$1,200/ton', origin: 'Ivory Coast', stock: '120 Tons', img: cashewImg },
    { id: 3, name: 'Organic Cotton', category: 'Textiles', price: '$1,800/ton', origin: 'Benin', stock: '30 Tons', img: cottonImg },
    { id: 4, name: 'Dried Ginger', category: 'Spices', price: '$3,500/ton', origin: 'Nigeria', stock: '15 Tons', img: gingerImg },
    { id: 5, name: 'Sesame Seeds', category: 'Seeds', price: '$1,100/ton', origin: 'Ethiopia', stock: '80 Tons', img: sesameImg },
    { id: 6, name: 'Shea Butter', category: 'Processing', price: '$4,000/ton', origin: 'Mali', stock: '10 Tons', img: sheaImg },
  ];

  return (
    <div className="listing-container">
      <header className="listing-header">
        <div className="header-left">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <ArrowLeft size={24} />
          </button>
          <h2>My Product Listings</h2>
        </div>
        <button className="add-product-btn">
          <Plus size={20} /> Add New Product
        </button>
      </header>

      <div className="filter-bar">
        <div className="search-box">
          <input type="text" placeholder="Search products..." />
        </div>
        <button className="filter-btn">
          <Filter size={18} /> Filter
        </button>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-image-container">
              <img src={product.img} alt={product.name} className="product-image" />
            </div>
            <div className="product-info">
              <div className="info-header">
                <h3>{product.name}</h3>
                <MoreVertical size={18} className="more-icon" />
              </div>
              <p className="category">{product.category}</p>
              <div className="details-row">
                <span className="origin">📍 {product.origin}</span>
                <span className="stock">{product.stock} available</span>
              </div>
              <div className="price-tag">{product.price}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductListing;