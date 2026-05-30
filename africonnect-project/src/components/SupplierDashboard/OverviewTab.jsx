import React from 'react';
import { ShieldCheck, TrendingUp, MessageSquare, Layers } from 'lucide-react';
import supplierAvatar from '../../assets/supplieravator.png';

// ✅ Directly calling your other official components
import MyProductsTab from './MyProductsTab';
import RfqsTab from './RfqsTab';

const OverviewTab = () => {
  const mockChats = [
    {
      id: 1,
      name: "David Chen",
      company: "SHENZHEN METALS",
      text: "We are reviewing your last quote for the Copper Ore. Can you provide...",
      time: "14:22",
      badge: true
    },
    {
      id: 2,
      name: "Sarah Miller",
      company: "GLOBAL FOODS INC.",
      text: "Thank you for the document upload. We will process it within...",
      time: "Yesterday"
    }
  ];

  return (
    <div className="tab-content-wrapper">
      
      {/* 1. Verification Alert Banner */}
      <div className="verification-banner">
        <div className="banner-left">
          <ShieldCheck color="#FF3B30" size={32} strokeWidth={2.5} className="banner-verify-icon" />
          <div>
            <h4>Complete Your Verification</h4>
            <p>Unlock the "Verified" badge to build buyer trust and increase your bid visibility.</p>
          </div>
        </div>
        <button className="banner-upload-btn">Upload Documents</button>
      </div>

      {/* 2. Analytics Mini-Grid */}
      <div className="analytics-summary-grid">
        <div className="metric-card">
          <div className="metric-card-header">
            <span className="metric-title">Active RFQs</span>
            <TrendingUp size={20} className="text-green" />
          </div>
          <h3>14</h3>
          <span className="metric-trend text-green">↑ 12% from last month</span>
        </div>

        <div className="metric-card">
          <div className="metric-card-header">
            <span className="metric-title">Unread Messages</span>
            <MessageSquare size={20} className="text-orange" />
          </div>
          <h3>08</h3>
          <span className="metric-trend text-orange">New request from 3 buyers</span>
        </div>

        <div className="metric-card">
          <div className="metric-card-header">
            <span className="metric-title">Total Products</span>
            <Layers size={20} className="text-blue" />
          </div>
          <h3>32</h3>
          <span className="metric-trend text-red">4 items low on stock</span>
        </div>
      </div>

      {/* 3. Horizontal Row Wrapper (Products page + Chats panel side-by-side) */}
      <div className="overview-grid-row">
        
        {/* Left main window slot */}
        <div className="grid-main-column">
          <MyProductsTab />
        </div>

        {/* Right sidebar window slot: Recent Chats Panel */}
        <div className="grid-side-column">
          <div className="dashboard-block-section block-gray-chat">
            <div className="block-section-header">
              <div className="chat-header-title-row">
                <h3>Recent Chats</h3>
                <span className="chat-notification-count-badge">2 New</span>
              </div>
            </div>

            <div className="chats-widget-list-stack">
              {mockChats.map((chat) => (
                <div key={chat.id} className="widget-chat-row-item">
                  <div className="chat-item-avatar-wrapper">
                    <img src={supplierAvatar} alt={chat.name} className="chat-row-avatar" />
                    {chat.badge && <span className="active-online-dot"></span>}
                  </div>
                  <div className="chat-item-body-content">
                    <div className="chat-row-top-meta">
                      <h4>{chat.name}</h4>
                      <span className="chat-row-timestamp">{chat.time}</span>
                    </div>
                    <span className="chat-row-company-lbl">{chat.company}</span>
                    <p className="chat-row-snippet-text">{chat.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="block-section-footer">
              <button className="footer-view-all-btn chat-center-btn">Open Message Center</button>
            </div>
          </div>
        </div>

      </div>

      {/* 4. Bottom Row: Reusing your official RFQs page layout */}
      <RfqsTab />

    </div>
  );
};

export default OverviewTab;