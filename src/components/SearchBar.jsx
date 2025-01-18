// SearchBar Component
import React, { useState } from "react";
import {TextField } from "@mui/material";

const SearchBar = ({ data, onFilterChange, label }) => {
    const [search, setSearch] = useState("");

    const handleSearch = (e) => {
      const value = e.target.value;
      setSearch(value);
      const filtered = data.filter((item) =>
        item.Nombre_Formulario.toLowerCase().includes(value.toLowerCase())
      );
      onFilterChange(filtered);
    };
  
    return (
      <TextField
        label={label}
        variant="outlined"
        value={search}
        onChange={handleSearch}
        fullWidth
      />
    );
  };
  

export default SearchBar;