import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, User, MessageSquare, FileText, ShoppingBag, LogOut, Search, Bell, Send, CheckCheck, Plus, Eye } from 'lucide-react';
import './BuyerDashboard.css';

// Local Asset Imports
import cottonImg from '../../assets/ProductListing/cotton.png';
import gingerImg from '../../assets/ProductListing/ginger.jpg';
import cashewImg from '../../assets/ProductListing/cashew.jpg';
import sesameImg from '../../assets/ProductListing/sesame.jpg';
import cocoaBeansImg from '../../assets/ProductListing/cocoa-beans.jpg';
import sheaButterImg from '../../assets/ProductListing/shea-butter.png';
import milletImg from '../../assets/ProductListing/millet.jpg';

const BuyerDashboard = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  // Central tab navigation switch state
  const [activeTab, setActiveTab] = useState('dashboard');
  const [profileImage, setProfileImage] = useState('https://placehold.co/150');

  const [profileForm, setProfileForm] = useState({
    fullName: 'Masikana',
    email: 'queen@africonnect.com',
    phone: '+263 77 123 4567',
    country: 'Zimbabwe',
    companyName: 'Queen Trading Co.'
  });

  // --- MOCK DATA FOR MESSAGES ENGINE ---
  const initialChats = [
    {
      id: 'chat-1',
      supplier: 'West Africa Agro Corp',
      commodity: 'Premium Cocoa Beans',
      lastMessage: 'The quotation for 50 metric tons has been attached to your RFQ portal.',
      time: '10:42 AM',
      unread: true,
      online: true,
      avatar: 'https://placehold.co/100/036942/ffffff?text=WA'
    },
    {
      id: 'chat-2',
      supplier: 'Equatorial Cotton Growers',
      commodity: 'Premium Cotton',
      lastMessage: 'Can we schedule a call to finalize the logistics framework tomorrow?',
      time: 'Yesterday',
      unread: false,
      online: false,
      avatar: 'https://placehold.co/100/1e293b/ffffff?text=EC'
    },
    {
      id: 'chat-3',
      supplier: 'Zambezi Organic Ltd',
      commodity: 'Split Ginger',
      lastMessage: 'Samples are dispatched. Tracking ID: AF-99427-X',
      time: 'June 4',
      unread: false,
      online: true,
      avatar: 'https://placehold.co/100/b45309/ffffff?text=ZO'
    }
  ];

  const [chats, setChats] = useState(initialChats);
  const [activeChatId, setActiveChatId] = useState('chat-1');
  const [typedMessage, setTypedMessage] = useState('');
  
  const [conversations, setConversations] = useState({
    'chat-1': [
      { id: 1, sender: 'supplier', text: 'Hello Kwame, regarding your open inquiry for high-grade cocoa beans...', time: '10:35 AM' },
      { id: 2, sender: 'buyer', text: 'Hi! Yes, we need strict alignment on the moisture levels before we sign.', time: '10:38 AM' },
      { id: 3, sender: 'supplier', text: 'The quotation for 50 metric tons has been attached to your RFQ portal.', time: '10:42 AM' }
    ],
    'chat-2': [
      { id: 1, sender: 'supplier', text: 'We have received your specifications for long-staple cotton fibers.', time: 'Monday' },
      { id: 2, sender: 'supplier', text: 'Can we schedule a call to finalize the logistics framework tomorrow?', time: 'Monday' }
    ],
    'chat-3': [
      { id: 1, sender: 'buyer', text: 'Are the ginger stocks completely sun-dried?', time: 'June 4' },
      { id: 2, sender: 'supplier', text: 'Samples are dispatched. Tracking ID: AF-99427-X', time: 'June 4' }
    ]
  });

  // --- MOCK DATA FOR RFQ ENGINE ---
  const mockRfqs = [
    { id: 'RFQ-2026-001', commodity: 'Organic Cocoa Beans', quantity: '50 MT', destination: 'Port of Harare', bidsReceived: 4, dateCreated: '2026-05-28', closingDate: '2026-06-15', status: 'Open' },
    { id: 'RFQ-2026-002', commodity: 'Raw Cashew Nuts (RCN)', quantity: '100 MT', destination: 'Port of Bulawayo', bidsReceived: 7, dateCreated: '2026-05-14', closingDate: '2026-06-10', status: 'Open' },
    { id: 'RFQ-2026-003', commodity: 'Premium Cotton Fibers', quantity: '20 MT', destination: 'Mutare Hub', bidsReceived: 2, dateCreated: '2026-04-20', closingDate: '2026-05-18', status: 'Closed' },
    { id: 'RFQ-2026-004', commodity: 'Dried Split Ginger', quantity: '15 MT', destination: 'Port of Harare', bidsReceived: 5, dateCreated: '2026-05-01', closingDate: '2026-05-25', status: 'Under Review' }
  ];

  const allProducts = [
    { id: 'prod-1', name: 'Premium Cotton', img: cottonImg },
    { id: 'prod-2', name: 'Split Ginger', img: gingerImg },
    { id: 'prod-3', name: 'Raw Cashew Nuts', img: cashewImg },
    { id: 'prod-4', name: 'Sesame Seeds', img: sesameImg },
    { id: 'prod-5', name: 'Premium Cocoa Beans', img: cocoaBeansImg },
    { id: 'prod-6', name: 'Organic Shea Butter', img: sheaButterImg },
    { id: 'prod-7', name: 'Pearl Millet', img: milletImg }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (activeTab !== 'dashboard') return;
    const rotateInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 2 >= allProducts.length ? 0 : prevIndex + 2));
    }, 4000);
    return () => clearInterval(rotateInterval);
  }, [allProducts.length, activeTab]);

  const visibleProducts = allProducts.slice(currentIndex, currentIndex + 2);
  if (visibleProducts.length < 2) visibleProducts.push(allProducts[0]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileForm({ ...profileForm, [name]: value });
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    alert('Changes saved successfully!');
    setActiveTab('dashboard');
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!typedMessage.trim()) return;

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMsg = { id: Date.now(), sender: 'buyer', text: typedMessage, time: timestamp };

    setConversations({ ...conversations, [activeChatId]: [...conversations[activeChatId], newMsg] });
    setChats(chats.map(c => c.id === activeChatId ? { ...c, lastMessage: typedMessage, time: timestamp, unread: false } : c));
    setTypedMessage('');
  };

  const selectedChatMeta = chats.find(c => c.id === activeChatId) || chats[0];
  const activeMessagesList = conversations[activeChatId] || [];

  return (
    <div className="buyer-dashboard-scope">
      <div className="dashboard-wrapper">
        
        {/* SIDEBAR NAVIGATION BAR */}
        <aside className="sidebar">
          <div className="sidebar-brand-block">
            <h3>TerraTrade</h3>
            <span className="brand-subtitle">Industrial Hub</span>
          </div>
          
          <nav>
            <button className={`nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </button>
            <button className={`nav-btn ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}>
              <User size={18} />
              <span>Profile</span>
            </button>
            <button className={`nav-btn ${activeTab === 'messages' ? 'active' : ''}`} onClick={() => setActiveTab('messages')}>
              <MessageSquare size={18} />
              <span>Messages</span>
            </button>
            <button className={`nav-btn ${activeTab === 'rfqs' ? 'active' : ''}`} onClick={() => setActiveTab('rfqs')}>
              <FileText size={18} />
              <span>My RFQs</span>
            </button>
            <button className="nav-btn" onClick={() => navigate('/marketplace')}>
              <ShoppingBag size={18} />
              <span>Orders</span>
            </button>
            <button className="nav-btn logout" onClick={() => navigate('/')}>
              <LogOut size={18} />
              <span>Log out</span>
            </button>
          </nav>
        </aside>

        {/* MAIN DISPLAY REGION PORT */}
        <main className="dashboard-main">
          {/* Top Universal Layout Header Strip */}
          <div className="viewport-top-bar">
            <div className="search-bar">
              <Search size={16} className="search-icon" />
              <input type="text" placeholder="Search for materials, suppliers, or logistics..." />
            </div>
            <div className="header-right">
              <Bell size={20} className="bell-alert-btn" />
              <div className="avatar-pill">
                <img src={profileImage} alt="Profile" />
              </div>
            </div>
          </div>

          {/* DYNAMIC TAB VIEW ROUTER PORT */}
          {activeTab === 'dashboard' && (
            <>
              <div className="dashboard-header">
                <h1>Welcome back, {profileForm.fullName}</h1>
                <p>Here’s what’s happening with your procurement requests today.</p>
              </div>

              <div className="stats-grid">
                <div className="stat-card">
                  <span className="stat-label">Active RFQs</span>
                  <h2>12</h2>
                  <span className="badge">+3 this week</span>
                </div>
                <div className="stat-card">
                  <span className="stat-label">Pending Orders</span>
                  <h2>08</h2>
                  <span className="subtext">Next delivery: Oct 24</span>
                </div>
              </div>

              <div className="products-section">
                <div className="section-header">
                  <div>
                    <h2>Top Products</h2>
                    <p>Premium products meeting strict industrial quality standards.</p>
                  </div>
                  <span className="view-market-link" onClick={() => navigate('/marketplace')}>
                    View Marketplace →
                  </span>
                </div>

                <div className="products-grid">
                  {visibleProducts.map((product, idx) => (
                    <div className="product-card-wrapper" key={`${product.id}-${idx}`}>
                      <img src={product.img} alt={product.name} />
                      <div className="carousel-caption">
                        <span>{product.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === 'profile' && (
            <div className="profile-view-wrapper">
              <div className="profile-header">
                <h1>Profile Settings</h1>
                <p>Manage your account and preferences</p>
              </div>

              <div className="profile-card">
                <div className="avatar-section">
                  <img src={profileImage} alt="Avatar Spec" />
                  <input type="file" accept="image/*" ref={fileInputRef} style={{ display: 'none' }} onChange={handleImageChange} />
                  <button type="button" className="change-photo" onClick={() => fileInputRef.current.click()}>Change Photo</button>
                </div>

                <form className="profile-form" onSubmit={handleSaveProfile}>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Full Name</label>
                      <input type="text" name="fullName" value={profileForm.fullName} onChange={handleInputChange} required />
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <input type="email" name="email" value={profileForm.email} onChange={handleInputChange} required />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Phone</label>
                      <input type="tel" name="phone" value={profileForm.phone} onChange={handleInputChange} required />
                    </div>
                    <div className="form-group">
                      <label>Country</label>
                      <select name="country" value={profileForm.country} onChange={handleInputChange}>
                        <option value="Nigeria">Nigeria</option>
                        <option value="Ghana">Ghana</option>
                        <option value="Kenya">Kenya</option>
                        <option value="Zimbabwe">Zimbabwe</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group full">
                    <label>Company / Business Name</label>
                    <input type="text" name="companyName" value={profileForm.companyName} onChange={handleInputChange} required />
                  </div>

                  <div className="form-actions">
                    <button type="button" className="btn-secondary" onClick={() => setActiveTab('dashboard')}>Cancel</button>
                    <button type="submit" className="btn-primary">Save Changes</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {activeTab === 'messages' && (
            <div className="messages-view-wrapper">
              <div className="dashboard-header">
                <h1>Negotiation Hub</h1>
                <p>Direct encrypted pipeline with vetted raw material suppliers across Africa.</p>
              </div>

              <div className="chat-master-container">
                <div className="chat-left-panel">
                  <div className="panel-search-box">
                    <input type="text" placeholder="Filter conversations..." />
                  </div>
                  <div className="chat-list-scroll">
                    {chats.map(chat => (
                      <div key={chat.id} className={`chat-list-item ${chat.id === activeChatId ? 'active' : ''} ${chat.unread ? 'unread-tint' : ''}`} onClick={() => { setActiveChatId(chat.id); chat.unread = false; }}>
                        <div className="avatar-holder">
                          <img src={chat.avatar} alt="Supplier" />
                          {chat.online && <span className="online-dot-pulse" />}
                        </div>
                        <div className="item-details">
                          <div className="item-row-top">
                            <h4>{chat.supplier}</h4>
                            <span className="chat-time-stamp">{chat.time}</span>
                          </div>
                          <p className="item-commodity-tag">{chat.commodity}</p>
                          <p className="item-preview-text">{chat.lastMessage}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="chat-right-window">
                  <div className="chat-window-header">
                    <div className="header-meta-group">
                      <h4>{selectedChatMeta.supplier}</h4>
                      <p>Deal Scope: <span>{selectedChatMeta.commodity}</span></p>
                    </div>
                    <span className={`status-pill ${selectedChatMeta.online ? 'online' : ''}`}>{selectedChatMeta.online ? 'Active Now' : 'Offline'}</span>
                  </div>

                  <div className="chat-messages-stream">
                    {activeMessagesList.map(msg => (
                      <div key={msg.id} className={`message-bubble-row ${msg.sender === 'buyer' ? 'outgoing' : 'incoming'}`}>
                        <div className="bubble-wrapper">
                          <p className="bubble-text">{msg.text}</p>
                          <div className="bubble-meta">
                            <span>{msg.time}</span>
                            {msg.sender === 'buyer' && <CheckCheck size={14} className="receipt-check" />}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <form className="chat-input-panel-form" onSubmit={handleSendMessage}>
                    <input type="text" placeholder={`Message ${selectedChatMeta.supplier}...`} value={typedMessage} onChange={(e) => setTypedMessage(e.target.value)} />
                    <button type="submit" className="chat-send-btn-action"><Send size={18} /></button>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* ✅ RFQS TAB ENGINE INTEGRATION */}
          {activeTab === 'rfqs' && (
            <div className="rfqs-view-wrapper">
              <div className="rfq-header-row">
                <div className="dashboard-header">
                  <h1>Sourcing & RFQ Portal</h1>
                  <p>Track bids, dispatch specifications, and manage global supplier invitations.</p>
                </div>
                {/* Strategic Call to Action button */}
                <button className="create-rfq-action-btn" onClick={() => navigate('/rfq')}>
                  <Plus size={16} />
                  <span>Raise New RFQ</span>
                </button>
              </div>

              {/* Internal Dashboard RFQ Analytics Metrics Row */}
              <div className="rfq-mini-stats-grid">
                <div className="rfq-mini-card">
                  <h4>Open Requests</h4>
                  <p className="stat-count">2 Active</p>
                </div>
                <div className="rfq-mini-card">
                  <h4>Total Offers Received</h4>
                  <p className="stat-count-green">18 Offers</p>
                </div>
                <div className="rfq-mini-card">
                  <h4>Historical Closed</h4>
                  <p className="stat-count-muted">1 Archived</p>
                </div>
              </div>

              {/* Main Enterprise RFQs Data Table */}
              <div className="rfq-table-card">
                <div className="rfq-table-wrapper">
                  <table className="rfq-data-table">
                    <thead>
                      <tr>
                        <th>RFQ ID</th>
                        <th>Commodity Material</th>
                        <th>Target Qty</th>
                        <th>Destination</th>
                        <th>Bids Sent</th>
                        <th>Closing Date</th>
                        <th>Status</th>
                        <th style={{ textAlign: 'center' }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockRfqs.map((rfq) => (
                        <tr key={rfq.id}>
                          <td className="rfq-id-cell">{rfq.id}</td>
                          <td className="rfq-material-name">{rfq.commodity}</td>
                          <td>{rfq.quantity}</td>
                          <td>{rfq.destination}</td>
                          <td>
                            <span className="bids-count-badge">{rfq.bidsReceived} responses</span>
                          </td>
                          <td>{rfq.closingDate}</td>
                          <td>
                            <span className={`rfq-status-badge ${rfq.status.toLowerCase().replace(' ', '-')}`}>
                              {rfq.status}
                            </span>
                          </td>
                          <td style={{ textAlign: 'center' }}>
                            <button className="rfq-view-action-row-btn" onClick={() => alert(`Reviewing Bids for ${rfq.id}`)}>
                              <Eye size={14} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </main>

      </div>
    </div>
  );
};

export default BuyerDashboard;