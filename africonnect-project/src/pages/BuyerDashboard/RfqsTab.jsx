import React from 'react';
import { Search } from 'lucide-react';

// ✅ Localized modular layout stylesheet link
import './RfqsTab.css';

const RfqsTab = () => {
  const rfqDatabase = [
    { id: "RFQ-08215", details: "Premium cocoa", buyer: "Swiss Trust Bank", volume: "25 KG", time: "2h ago", status: "New Request", statusClass: "rfq-new" },
    { id: "RFQ-08194", details: "Raw Cashew Nuts", buyer: "Global Foods Inc.", volume: "450 MT", time: "1h ago", status: "New Request", statusClass: "rfq-new" },
    { id: "RFQ-07992", details: "High-Grade Copper Ore", buyer: "Shenzhen Metals", volume: "2,000 MT", time: "3d ago", status: "NEGOTIATING", statusClass: "rfq-negotiating" }
  ];

  return (
    <div className="tab-pane-layout">
      
      {/* 1. Header Text Meta Info block */}
      <div className="view-action-header-row">
        <div>
          <h2>Active RFQs Marketplace</h2>
          <p>Review raw material requirements, monitor quotes, and submit instant counter-offers to incoming buyers.</p>
        </div>
      </div>

      {/* 2. Filter Search Reference input component */}
      <div className="filter-utilities-strip">
        <div className="util-search-input-box">
          <Search size={16} />
          <input type="text" placeholder="Search RFQ reference ID..." />
        </div>
      </div>

      {/* 3. Worksheet Data Grid Table Layout Frame */}
      <div className="table-responsive-wrapper">
        <table className="rfq-dashboard-table">
          <thead>
            <tr>
              <th>Inquiry Details</th>
              <th>Buyer / Corporate Client</th>
              <th>Target Volume</th>
              <th>Bidding Status</th>
              <th>Action Workflow</th>
            </tr>
          </thead>
          <tbody>
            {rfqDatabase.map((rfq) => (
              <tr key={rfq.id}>
                <td>
                  <div className="rfq-title-cell">
                    <span className="rfq-main-item">{rfq.details}</span>
                    <span className="rfq-sub-meta">{rfq.id} • {rfq.time}</span>
                  </div>
                </td>
                <td className="buyer-cell-txt">{rfq.buyer}</td>
                <td className="volume-cell-txt">{rfq.volume}</td>
                <td>
                  <span className={`rfq-status-pill ${rfq.statusClass}`}>
                    {rfq.status}
                  </span>
                </td>
                <td>
                  <button className="rfq-action-respond-btn" onClick={() => console.log(`Trigger response stream logic context for ${rfq.id}`)}>
                    Respond
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default RfqsTab;