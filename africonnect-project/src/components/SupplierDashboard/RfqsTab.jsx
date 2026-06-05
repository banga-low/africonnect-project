import React, { useState } from 'react';
import { Search, Send, X, DollarSign, Calendar } from 'lucide-react';
import './RfqsTab.css';

const RfqsTab = () => {
  const rfqDatabase = [
    { id: "RFQ-08215", details: "Premium cocoa", buyer: "Swiss Trust Bank", volume: "25 KG", time: "2h ago", defaultStatus: "New Request", defaultClass: "rfq-new" },
    { id: "RFQ-08194", details: "Raw Cashew Nuts", buyer: "Global Foods Inc.", volume: "450 MT", time: "1h ago", defaultStatus: "New Request", defaultClass: "rfq-new" },
    { id: "RFQ-07992", details: "High-Grade Copper Ore", buyer: "Shenzhen Metals", volume: "2,000 MT", time: "3d ago", defaultStatus: "NEGOTIATING", defaultClass: "rfq-negotiating" }
  ];

  const [selectedRfq, setSelectedRfq] = useState(null);
  const [quotePrice, setQuotePrice] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('');
  const [notes, setNotes] = useState('');
  
  // ✅ Tracks which RFQ IDs have received submitted quotes
  const [submittedRfqIds, setSubmittedRfqIds] = useState([]);

  const handleClearForm = () => {
    setSelectedRfq(null);
    setQuotePrice('');
    setDeliveryTime('');
    setNotes('');
  };

  const handleSubmitQuote = (e) => {
    e.preventDefault();
    if (!quotePrice || !deliveryTime) {
      alert("Please fill in your Bid Price and Estimated Delivery time frames.");
      return;
    }
    
    // ✅ Add the current RFQ ID to our tracked list of responses
    setSubmittedRfqIds([...submittedRfqIds, selectedRfq.id]);
    
    alert(`Bid Proposal for ${selectedRfq.id} sent successfully to ${selectedRfq.buyer}!`);
    handleClearForm();
  };

  return (
    <div className="tab-pane-layout">
      
      {/* 1. Header Block */}
      <div className="view-action-header-row">
        <div>
          <h2>Active RFQs Marketplace</h2>
          <p>Review raw material requirements, monitor quotes, and submit instant counter-offers to incoming buyers.</p>
        </div>
      </div>

      {/* 2. Search Box */}
      <div className="filter-utilities-strip">
        <div className="util-search-input-box">
          <Search size={16} />
          <input type="text" placeholder="Search RFQ reference ID..." />
        </div>
      </div>

      {/* 3. Worksheet Table */}
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
            {rfqDatabase.map((rfq) => {
              // ✅ Check if this specific RFQ was responded to
              const hasResponded = submittedRfqIds.includes(rfq.id);
              
              return (
                <React.Fragment key={rfq.id}>
                  <tr className={selectedRfq?.id === rfq.id ? "active-row-focus" : ""}>
                    <td>
                      <div className="rfq-title-cell">
                        <span className="rfq-main-item">{rfq.details}</span>
                        <span className="rfq-sub-meta">{rfq.id} • {rfq.time}</span>
                      </div>
                    </td>
                    <td className="buyer-cell-txt">{rfq.buyer}</td>
                    <td className="volume-cell-txt">{rfq.volume}</td>
                    <td>
                      {/* ✅ DYNAMIC STATUS PILL */}
                      <span className={`rfq-status-pill ${hasResponded ? 'rfq-progress' : rfq.defaultClass}`}>
                        {hasResponded ? 'In Progress' : rfq.defaultStatus}
                      </span>
                    </td>
                    <td>
                      <button 
                        className="rfq-action-respond-btn" 
                        onClick={() => setSelectedRfq(selectedRfq?.id === rfq.id ? null : rfq)}
                        disabled={hasResponded}
                        style={hasResponded ? { backgroundColor: '#94a3b8', cursor: 'not-allowed' } : {}}
                      >
                        {hasResponded ? 'Sent' : (selectedRfq?.id === rfq.id ? 'Viewing' : 'Respond')}
                      </button>
                    </td>
                  </tr>

                  {/* 4. Inline Slide-Down Response Form */}
                  {selectedRfq?.id === rfq.id && !hasResponded && (
                    <tr className="rfq-respond-drawer-row">
                      <td colSpan="5" className="drawer-container-cell">
                        <div className="rfq-response-card">
                          <div className="drawer-header">
                            <h4>Submit Quotation Proposal for {rfq.id}</h4>
                            <button type="button" className="close-drawer-btn" onClick={handleClearForm}><X size={16} /></button>
                          </div>

                          <form onSubmit={handleSubmitQuote} className="drawer-form-layout">
                            <div className="form-field-group">
                              <label>Your Quote Price (USD) *</label>
                              <div className="input-with-icon">
                                <DollarSign size={16} />
                                <input type="text" placeholder="e.g. 7,900" value={quotePrice} onChange={(e) => setQuotePrice(e.target.value)} />
                              </div>
                            </div>

                            <div className="form-field-group">
                              <label>Estimated Lead/Delivery Time *</label>
                              <div className="input-with-icon">
                                <Calendar size={16} />
                                <input type="text" placeholder="e.g. 5 Business Days" value={deliveryTime} onChange={(e) => setDeliveryTime(e.target.value)} />
                              </div>
                            </div>

                            <div className="form-field-group full-width-field">
                              <label>Additional Terms / Specifications</label>
                              <textarea placeholder="Specify purity grades, logistics terms (FOB/CIF), etc..." value={notes} onChange={(e) => setNotes(e.target.value)} />
                            </div>

                            <div className="form-actions-row">
                              <button type="button" className="cancel-action-btn" onClick={handleClearForm}>Cancel</button>
                              <button type="submit" className="submit-proposal-btn"><Send size={14} /> Send Quote</button>
                            </div>
                          </form>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RfqsTab;