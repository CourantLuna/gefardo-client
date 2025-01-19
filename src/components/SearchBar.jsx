// SearchBar Component
import React, { useState } from "react";
import {TextField } from "@mui/material";

const SearchBar = ({ data, onFilterChange, label, filterKey  }) => {
    const [search, setSearch] = useState("");

    const handleSearch = (e) => {
      const value = e.target.value;
      setSearch(value);
      
      // Filtra los datos según el campo especificado en filterKey
      const filtered = data.filter((item) =>
        String(item[filterKey]).toLowerCase().includes(value.toLowerCase())
    );
      onFilterChange(filtered);
    };
  
    return (
      <TextField
        label={label}
        type="search"
        variant="outlined"
        value={search}
        onChange={handleSearch}
        fullWidth
      />
    );
  };
  

export default SearchBar;