import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { 
  LayoutDashboard, 
  Box, 
  FileText, 
  MessageSquare, 
  CreditCard, 
  User, 
  LogOut, 
  Search, 
  Bell, 
  Settings 
} from 'lucide-react';
import './SupplierDashboard.css';

import logoImg from '../../assets/LandingPage/logo.png';
import supplierAvatar from '../../assets/supplieravator.png';
import cocoaImg from '../../assets/LandingPage/cocoa.png';
import cashewImg from '../../assets/LandingPage/cashew.jpg';

import OverviewTab from '../../components/SupplierDashboard/OverviewTab';
import MyProductsTab from '../../components/SupplierDashboard/MyProductsTab';
import RfqsTab from '../../components/SupplierDashboard/RfqsTab';
import MessagesTab from '../../components/SupplierDashboard/MessagesTab';
import SupplierTransactions from '../../components/SupplierDashboard/SupplierTransactions'; 
import ProfileTab from '../../components/SupplierDashboard/ProfileTab';
import NewProductFormTab from '../../components/SupplierDashboard/NewProductFormTab';

const SupplierDashboard = () => {
  const navigate = useNavigate(); 
  const [activeTab, setActiveTab] = useState('overview');

  // States to dynamically track avatar and company title changes across tabs
  const [headerAvatar, setHeaderAvatar] = useState(supplierAvatar);
  
  // ✅ FIXED: Changed default value from "Ghana Ecofarm Ltd." to "Ecofarm Ltd."
  const [companyTitle, setCompanyTitle] = useState("Lagos Cashew Nuts Ltd.");

  // Moving the products array into state so it updates dynamically!
  const [products, setProducts] = useState([
    { id: 1, name: "Premium Cocoa Beans", category: "Agriculture", stock: "14,500 KG", moq: "500 KG", price: "$8.20/KG", img: cocoaImg, status: "In Stock" },
    { id: 2, name: "Raw Organic Cashew Nuts", category: "Agriculture", stock: "8,000 KG", moq: "1,000 KG", price: "$4.50/KG", img: cashewImg, status: "In Stock" }
  ]);

  // Pull and update metadata from localStorage whenever the profile saves changes
  const refreshProfileMetadata = () => {
    const savedAvatar = localStorage.getItem('supplier_avatar_url');
    const savedName = localStorage.getItem('supplier_company_name');
    if (savedAvatar) setHeaderAvatar(savedAvatar);
    if (savedName) setCompanyTitle(savedName);
  };

  useEffect(() => {
    // Read initial data values if they exist on component mount
    refreshProfileMetadata();

    // Setup listener event to catch changes dispatched from ProfileTab
    window.addEventListener('storage_avatar_update', refreshProfileMetadata);
    
    return () => {
      window.removeEventListener('storage_avatar_update', refreshProfileMetadata);
    };
  }, []);

  // Function to append a new product from the form payload
  const handleAddProduct = (newProduct) => {
    const formattedProduct = {
      id: Date.now(), 
      name: newProduct.name,
      category: newProduct.category,
      stock: newProduct.stock.endsWith('KG') ? newProduct.stock : `${newProduct.stock} KG`,
      moq: newProduct.moq.endsWith('KG') ? newProduct.moq : `${newProduct.moq} KG`,
      price: newProduct.price.includes('$') ? newProduct.price : `$${newProduct.price}`,
      img: newProduct.imagePreview || cocoaImg, 
      status: "In Stock"
    };

    setProducts((prevProducts) => [formattedProduct, ...prevProducts]);
    setActiveTab('products'); 
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <OverviewTab 
            onTabSwitch={setActiveTab} 
            onNavigateToCreate={() => setActiveTab('new-product')} 
            products={products.slice(0, 2)} 
          />
        );
      case 'products':
        return (
          <MyProductsTab 
            onNavigateToCreate={() => setActiveTab('new-product')} 
            products={products} 
          />
        );
      case 'rfqu':
        return <RfqsTab />;
      case 'messages':
        return <MessagesTab />;
      case 'transactions':
        return <SupplierTransactions />; 
      case 'profile':
        return <ProfileTab />;
      case 'new-product':
        return <NewProductFormTab onCancel={() => setActiveTab('products')} onPublish={handleAddProduct} />;
      default:
        return <OverviewTab onTabSwitch={setActiveTab} onNavigateToCreate={() => setActiveTab('new-product')} products={products.slice(0, 2)} />;
    }
  };

  return (
    <div className="dashboard-app-frame">
      <aside className="dashboard-sidebar">
        <div className="sidebar-logo-block" onClick={() => navigate('/')}>
          <img src={logoImg} alt="Africonnect Logo" className="sidebar-logo-img" />
          <h2 className="logo-text"><span className="text-green">FRI</span><span className="text-black">CONNECT</span></h2>
        </div>
        <span className="sidebar-subtitle">Supplier Dashboard</span>
        
        <nav className="sidebar-nav-tree">
          <button className={`nav-item-link ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}><LayoutDashboard size={18} /><span>Overview</span></button>
          <button className={`nav-item-link ${activeTab === 'products' || activeTab === 'new-product' ? 'active' : ''}`} onClick={() => setActiveTab('products')}><Box size={18} /><span>My Products</span></button>
          <button className={`nav-item-link ${activeTab === 'rfqu' ? 'active' : ''}`} onClick={() => setActiveTab('rfqu')}><FileText size={18} /><span>RFQs</span></button>
          <button className={`nav-item-link ${activeTab === 'messages' ? 'active' : ''}`} onClick={() => setActiveTab('messages')}><MessageSquare size={18} /><span>Messages</span></button>
          
          <button className={`nav-item-link ${activeTab === 'transactions' ? 'active' : ''}`} onClick={() => setActiveTab('transactions')}><CreditCard size={18} /><span>Transactions</span></button>
          
          <button className={`nav-item-link ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}><User size={18} /><span>Profile</span></button>
        </nav>
        
        <div className="sidebar-footer-block">
          <button className="sidebar-logout-btn" onClick={() => navigate('/')}><LogOut size={18} /><span>Log out</span></button>
        </div>
      </aside>

      <div className="dashboard-viewport-right">
        <header className="viewport-top-header">
          <div className="header-search-wrapper"><Search className="search-box-icon" size={18} /><input type="text" placeholder="Search Category" className="header-search-input" /></div>
          <div className="header-actions-wrapper">
            <button className="icon-badge-btn"><Bell size={20} /><span className="badge-dot"></span></button>
            <button className="icon-badge-btn"><Settings size={20} /></button>
            
            <div className="header-profile-pill">
              <img src={headerAvatar} alt="Avatar" className="user-pill-avatar" />
              <span className="user-pill-name">{companyTitle}</span>
            </div>
          </div>
        </header>
        <main className="viewport-main-content">{renderTabContent()}</main>
      </div>
    </div>
  );
};

export default SupplierDashboard;