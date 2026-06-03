import React from 'react';
import { Send, Paperclip, Search } from 'lucide-react';
import supplierAvatar from '../../assets/supplieravator.png';

// ✅ Isolated component layout styles link
import './MessagesTab.css';

const MessagesTab = () => {
  return (
    <div className="messages-workspace-wrapper">
      {/* Channels Sidebar Container Panel */}
      <aside className="messages-sidebar-panel">
        <div className="panel-search-header">
          <h3>Inbox Channels</h3>
        </div>
        <div className="threads-vertical-stack">
          <div className="thread-card-row selected-active">
            <div className="thread-avatar-container">
              <img src={supplierAvatar} alt="David" />
              <span className="online-beacon-dot"></span>
            </div>
            <div className="thread-meta-body">
              <div className="thread-header-line">
                <h4>David Chen</h4>
                <span className="thread-time-lbl">14:22</span>
              </div>
              <span className="thread-company-sub">Shenzhen Metals</span>
              <p className="thread-snippet-paragraph">We are reviewing your last quote for the Copper Ore...</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Active Stream Chat Window Column */}
      <div className="chat-window-viewport">
        <header className="chat-window-header">
          <div>
            <h3>David Chen</h3>
            <span className="subtitle-company">Procurement Officer • Shenzhen Metals</span>
          </div>
        </header>

        <div className="chat-message-log-scroll">
          <div className="message-bubble bubble-incoming">
            Hi Kelvin, we are reviewing your last quote for the Copper Ore. Can you provide the composition analysis breakdown certificate?
            <span className="bubble-timestamp">14:22</span>
          </div>
          <div className="message-bubble bubble-outgoing">
            Hello David, absolutely. Let me compile the documentation from our quality assurance officer and I will send it over immediately.
            <span className="bubble-timestamp">14:35</span>
          </div>
        </div>

        <footer className="chat-input-control-footer">
          <button className="chat-attach-trigger"><Paperclip size={18} /></button>
          <input type="text" placeholder="Type your negotiation counter-proposal message..." className="chat-text-field" />
          <button className="chat-send-trigger-btn"><Send size={16} /></button>
        </footer>
      </div>
    </div>
  );
};

export default MessagesTab;