import React, { useState } from 'react';
import './SearchModal.css';
import {supabase} from '../../supabase/supabaseClient'

const SearchModal = ({ isOpen, onClose, onSearch, onSearchResults, isSearching }) => {
  const [term, setTerm] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (term.trim()) {
      onSearch(term); // This triggers handleSearch in LandingPage
      onClose(); // Close modal after search starts
    }
  }; // <- THIS WAS MISSING. This closes handleSubmit

  const handleNearestSearch = () => {
    if (!term.trim()) return;
   
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
     
      const { data, error } = await supabase.rpc('get_smart_suppliers', {
        user_lng: longitude,
        user_lat: latitude,
        search_category: term,
        radius_km: 100
      });
     
      if (error) console.error(error);
      onSearchResults(data);
      onClose();
    });
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
          <button 
            type="button" 
            className="search-nearby-btn" 
            onClick={handleNearestSearch}
            disabled={isSearching || !term.trim()}
          >
            Find Nearest
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchModal;

