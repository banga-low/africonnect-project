import React, { useState } from 'react';
import './SearchModal.css';

const SearchModal = ({ isOpen, onClose, onSearch, isSearching }) => {
  const [term, setTerm] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (term.trim()) {
      onSearch(term); // This triggers handleSearch in LandingPage
      onClose(); // Close modal after search starts
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>&times;</button>
        <h2>Search Materials</h2>
        <p>Enter the raw material you are looking for:</p>
        
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="e.g. Timber, Copper, Cotton..." 
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            autoFocus
          />
          <button type="submit" className="search-confirm-btn" disabled={isSearching}>
            {isSearching ? 'Searching...' : 'Find Suppliers'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchModal;