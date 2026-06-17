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
import './BuyerTransactions.css';
import signImg from '../../assets/sign.png';
import logoImg from '../../assets/logo.png';
import EscrowPayment from '../EscrowPayment';

// Dummy Data mapped precisely from your Buyer Figma template screen
const buyerDummyTransactions = [
  { id: 'TXN001', supplier: 'Lualaba cocoa farm Ltd', location: 'Abuja, Nigeria', date: 'May 24, 2026', amount: '$2,400.00', status: 'Awaiting Payment', commodity: 'Cocoa / 12 Tons' },
  { id: 'TXN002', supplier: 'Ivory Gold cocoa warehouse', location: 'Lagos, Nigeria', date: 'Feb 22, 2026', amount: '$4,500.00', status: 'Escrow Active', commodity: 'Cocoa / 11 Tons' },
  { id: 'TXN003', supplier: 'Helios Cashew', location: 'Lagos, Nigeria', date: 'Jan 18, 2026', amount: '$6,000.00', status: 'Completed', commodity: 'Cashew / 15 Tons' }
];

export default function BuyerTransactions() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="byr-txn-view-wrapper">
      
      {/* TRANSACTION HEADER HEADER ROW */}
      <div className="byr-txn-board-header">
        <div className="byr-txn-header-left">
          <h2>Transaction History</h2>
          <p>Track & manage your transaction, and payments protection status.</p>
        </div>
        <div className="byr-txn-header-actions">
          <button className="byr-txn-export-btn"><Download size={16} /> Export CSV</button>
        </div>
      </div>

      {/* DATA GRID DISPLAY BOX FRAME */}
      <div className="byr-txn-history-board">
        <div className="byr-txn-table-responsive-frame">
          <table className="byr-txn-data-table">
            <thead>
              <tr>
                <th>TRANSACTION ID</th>
                <th>SUPPLIER</th>
                <th>DATE</th>
                <th>AMOUNT</th>
                <th>STATUS</th>
                <th>COMMODITY/ QTY</th>
              </tr>
            </thead>
            <tbody>
              {buyerDummyTransactions.map((txn) => (
                <tr key={txn.id}>
                  <td className="byr-txn-bold-id">{txn.id}</td>
                  <td>
                    <div className="byr-txn-supplier-cell">
                      <span className="byr-txn-supplier-title">{txn.supplier}</span>
                      <span className="byr-txn-supplier-loc">{txn.location}</span>
                    </div>
                  </td>
                  <td>{txn.date}</td>
                  <td className="byr-txn-bold-amount">{txn.amount}</td>
                  <td>
                    <span className={`byr-txn-status-pill status-${txn.status.toLowerCase().replace(' ', '-')}`}>
                      {txn.status}
                    </span>
                  </td>
                  <td className="byr-txn-commodity-cell">{txn.commodity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINATION DATA CONSTRAINTS CONTROL */}
        <div className="byr-txn-table-footer-pagination">
          <span>Showing 1-3 of 10 transactions</span>
          <div className="byr-txn-pagination-arrows">
            <button className="byr-txn-arrow-btn"><ChevronLeft size={16} /></button>
            <button className="byr-txn-arrow-btn"><ChevronRight size={16} /></button>
          </div>
        </div>
      </div>

      {/* BOTTOM DOUBLE BLOCK ASSURANCE METRICS ROW */}
      <div className="byr-txn-protection-row">
        
        <div className="byr-txn-funds-protection-card">
          <div className="byr-txn-funds-top">
            <div className="byr-txn-funds-info">
              <h3>Funds In Protection</h3>
              <p>Pending release for active trade orders</p>
            </div>
            <div className="byr-txn-lock-icon-container">
              <Lock size={18} color="#d97706" />
            </div>
          </div>
          <h2 className="byr-txn-protected-value">$17,450</h2>
        </div>

        <div className="byr-txn-assurance-banner-card">
          <div className="byr-txn-assurance-heading">
            <Lock size={20} color="#ffffff" />
            <h3>Trade Assurance Protection</h3>
          </div>
          <p className="byr-txn-assurance-body">
            Your transactions are protected until agreed trade conditions are met. 
            This helps create a safe and secure sourcing experience for buyers and suppliers.
          </p>
          
          <div className="byr-txn-assurance-footer-brand">
            <div className="byr-txn-text-only-capsule">
              <span className="byr-txn-powered-by">Powered by</span>
            </div>
            <img src={signImg} alt="Partner brand" className="byr-txn-badge-asset-img" />
            <img src={logoImg} alt="AFRICONNECT logo symbol" className="byr-txn-badge-asset-img" />
          </div>
        </div>

      </div>

    </div>
  );
}