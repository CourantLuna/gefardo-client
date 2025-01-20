import React, { useState } from "react";
import { TextField } from "@mui/material";

const SearchBar = ({ data, onFilterChange, label, filterKey, filterKeys = [], width = "100%" }) => {
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);

    // Determinar las claves de filtro: usar `filterKeys` o convertir `filterKey` en un array
    const keys = Array.isArray(filterKeys) && filterKeys.length > 0
      ? filterKeys
      : filterKey
      ? [filterKey]
      : []; // Siempre asegúrate de que `keys` sea un array

    // Filtrar los datos concatenando las claves
    const filtered = data.filter((item) => {
      const concatenatedValues = keys
        .map((key) => {
          const value = item[key];
          return value !== null && value !== undefined ? String(value).toLowerCase() : ""; // Convertir a string y manejar valores nulos/indefinidos
        })
        .join(" "); // Concatena los valores con un espacio
      return concatenatedValues.includes(value.toLowerCase());
    });

    onFilterChange(filtered);
  };

  return (
    <TextField
      label={label}
      type="search"
      variant="outlined"
      value={search}
      onChange={handleSearch}
      sx={{ width }} // Aplicar el ancho recibido como prop
    />
  );
};

export default SearchBar;
