import React from 'react';
import { dummyProducts as products } from '../data/dummyProducts';
import "./MarketplaceGrid.css";

// ✅ ADDED: destructure 'onInquiryClick' from props here
export default function MarketplaceGrid({ onInquiryClick }) {
  return (
    <div className="marketplace-container">
      <h1 className="marketplace-title">Marketplace</h1>
      
      <div className="marketplace-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <h2 className="product-name">{product.name}</h2>
            <p>{product.description}</p>
            <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>{product.location}</p>
            <p>MOQ: {product.moq}</p>
            <p className="product-price">₦{product.price}</p>
            
            <div className="btn-group">
              {/* ✅ FIXED: Wire up the button click to trigger the parent's navigate function */}
              <button 
                className="btn-primary" 
                onClick={onInquiryClick}
              >
                Submit Inquiry
              </button>
              <button className="btn-secondary">Chat</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}