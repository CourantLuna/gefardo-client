// FilterComponent
import React, { useState } from "react";
import { Autocomplete, TextField } from "@mui/material";

const FilterAutocomplete = ({ label, data, filterKey, onFilterChange }) => {
    const [value, setValue] = useState("Todos");

    const handleFilter = (event, newValue) => {
        setValue(newValue);
        const filtered =
          newValue === "Todos"
            ? data
            : data.filter((item) => item[filterKey] === newValue);
        onFilterChange(filtered);
      };

      const options = ["Todos", ...new Set(data.map((item) => item[filterKey]))];

    return (
        <Autocomplete
            disablePortal
            options={options}
            value={value}
            onChange={handleFilter}
            renderInput={(params) => <TextField {...params} label={label} variant="outlined" />}
            sx={{ width: 300 }}
        />
      );
  };

export default FilterAutocomplete;