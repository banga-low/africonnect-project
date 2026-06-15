import React, { useState } from 'react';
import { 
  Download, 
  Search, 
  Lock, 
  SlidersHorizontal, 
  History, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';
import './SupplierTransactions.css';
import signImg from '../../assets/sign.png';
import logoImg from '../../assets/logo.png';

const dummyTransactions = [
  { id: 'TXN001', buyer: 'TerraTrade Hub', commodity: 'Cashew', qty: '2 Tons', date: 'May 24, 2026', amount: '$2,400.00', paymentStatus: 'Protected', deliveryStatus: 'Awaiting Shipment' },
  { id: 'TXN002', buyer: 'Green Snacks Ltd', commodity: 'Cocoa', qty: '3 Tons', date: 'Feb 22, 2026', amount: '$4,500.00', paymentStatus: 'Escrow Active', deliveryStatus: 'In Progress' },
  { id: 'TXN003', buyer: 'GoldenBite Ltd', commodity: 'Cashew', qty: '5 Tons', date: 'Jan 18, 2026', amount: '$6,000.00', paymentStatus: 'Completed', deliveryStatus: 'In Transit' }
];

export default function SupplierTransactions() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="supp-txn-view-wrapper">
      
      {/* TOP SEARCH BAR STRIP */}
      <div className="supp-txn-search-bar-row">
        <div className="supp-txn-search-input-box">
          <Search size={18} color="#64748b" />
          <input 
            type="text" 
            placeholder="Search transactions..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* METRIC HEADLINE: TOTAL REVENUE */}
      <div className="supp-txn-revenue-card">
        <span className="supp-txn-card-label">TOTAL REVENUE</span>
        <h2 className="supp-txn-revenue-value">$142,500.00</h2>
      </div>

      {/* CENTRAL HISTORY BOARD MODULE */}
      <div className="supp-txn-history-board">
        <div className="supp-txn-board-header">
          <div className="supp-txn-header-left">
            <h2>Transaction History</h2>
            <p>Track & manage your transaction, and payments protection status.</p>
          </div>
          <div className="supp-txn-header-actions">
            <button className="supp-txn-sub-btn"><History size={16} /> Recent</button>
            <button className="supp-txn-sub-btn"><SlidersHorizontal size={16} /> Filter</button>
            <button className="supp-txn-export-btn"><Download size={16} /> Export CSV</button>
          </div>
        </div>

        {/* DATA GRID TABLE RESPONSIVE CANVAS */}
        <div className="supp-txn-table-responsive-frame">
          <table className="supp-txn-data-table">
            <thead>
              <tr>
                <th>TRANSACTION ID</th>
                <th>BUYER</th>
                <th>COMMODITY/QTY</th>
                <th>DATE</th>
                <th>AMOUNT</th>
                <th>PAYMENT STATUS</th>
                <th>DELIVERY STATUS</th>
              </tr>
            </thead>
            <tbody>
              {dummyTransactions.map((txn) => (
                <tr key={txn.id}>
                  <td className="supp-txn-bold-id">{txn.id}</td>
                  <td>
                    <div className="supp-txn-buyer-cell">
                      <div className="supp-txn-avatar-placeholder">
                        {txn.buyer.charAt(0)}
                      </div>
                      <span>{txn.buyer}</span>
                    </div>
                  </td>
                  <td>{txn.commodity} <span className="supp-txn-qty-subtext">{txn.qty}</span></td>
                  <td>{txn.date}</td>
                  <td className="supp-txn-bold-amount">{txn.amount}</td>
                  <td>
                    <span className={`supp-txn-status-pill status-${txn.paymentStatus.toLowerCase().replace(' ', '-')}`}>
                      {txn.paymentStatus}
                    </span>
                  </td>
                  <td className="supp-txn-delivery-cell">
                    <span className={`supp-txn-dot dot-${txn.deliveryStatus.toLowerCase().replace(' ', '-')}`}></span>
                    {txn.deliveryStatus}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* TABLE COMPONENT FOOTER CONTROLS */}
        <div className="supp-txn-table-footer-pagination">
          <span>Showing 1-3 of 12 transactions</span>
          <div className="supp-txn-pagination-arrows">
            <button className="supp-txn-arrow-btn"><ChevronLeft size={16} /></button>
            <button className="supp-txn-arrow-btn"><ChevronRight size={16} /></button>
          </div>
        </div>
      </div>

      {/* BOTTOM DOUBLE-COLUMN PROTECTION CARDS */}
      <div className="supp-txn-protection-row">
        
        {/* Left Protective Card: Funds Summary */}
        <div className="supp-txn-funds-protection-card">
          <div className="supp-txn-funds-top">
            <div className="supp-txn-funds-info">
              <h3>Funds In Protection</h3>
              <p>Pending release for active trade orders</p>
            </div>
            <div className="supp-txn-lock-icon-container">
              <Lock size={18} color="#d97706" />
            </div>
          </div>
          <h2 className="supp-txn-protected-value">$17,450</h2>
        </div>

        {/* Right Protective Card: Trade Assurance Brand Banner */}
        <div className="supp-txn-assurance-banner-card">
          <div className="supp-txn-assurance-heading">
            <Lock size={20} color="#ffffff" />
            <h3>Trade Assurance Protection</h3>
          </div>
          <p className="supp-txn-assurance-body">
            Your transactions are protected until agreed trade conditions are met. 
            This helps create a safe and secure sourcing experience for buyers and suppliers.
          </p>
          
          {/* ✅ FIXED: Only "Powered by" text has the black background pill capsule. Images are adjacent! */}
          <div className="supp-txn-assurance-footer-brand">
            <div className="supp-txn-text-only-capsule">
              <span className="supp-txn-powered-by">Powered by</span>
            </div>
            <img src={signImg} alt="Partner brand" className="supp-txn-badge-asset-img" />
            <img src={logoImg} alt="AFRICONNECT logo symbol" className="supp-txn-badge-asset-img" />
          </div>
        </div>

      </div>

    </div>
  );
}