// src/components/SearchBar.jsx
import React, { useState } from "react";
import { Search } from "lucide-react";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("London");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
    }
  };

  return (
    <div className="search-container glass-card">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          className="search-input"
          placeholder="Enter city name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" className="search-button">
          <Search size={20} />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
