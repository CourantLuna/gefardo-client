import React, { useState, useEffect } from "react";
import { Autocomplete, TextField } from "@mui/material";

const FilterAutocomplete = ({ label, data, filterKey, onFilterChange, width = "300px" }) => {
  const [options, setOptions] = useState([]); // Opciones únicas derivadas de `data`
  const [filteredOptions, setFilteredOptions] = useState([]); // Opciones visibles filtradas
  const [value, setValue] = useState("Todos"); // Valor seleccionado o buscado

  useEffect(() => {
    if (data && filterKey) {
      // Extraer opciones únicas basadas en el campo `filterKey`
      const uniqueOptions = Array.from(
        new Set(data.map((item) => {
          if (filterKey === "Estado") {
            return item[filterKey] === true ? "Activo" : "Inactivo";
          }
          return item[filterKey];
        }))
      );
      setOptions(["Todos", ...uniqueOptions]); // Agregar opción "Todos"
      setFilteredOptions(["Todos", ...uniqueOptions]); // Inicializar opciones filtradas
    }
  }, [data, filterKey]);

  const handleInputChange = (event, newValue) => {
    // Filtrar las opciones dinámicamente según el input del usuario
    const searchValue = String(newValue).toLowerCase();
    const filtered = options.filter((option) =>
      String(option).toLowerCase().includes(searchValue)
    );
    setFilteredOptions(filtered);
  };

  const handleFilter = (event, newValue) => {
    setValue(newValue);

    if (newValue === "Todos") {
      onFilterChange(data); // Devolver todos los datos sin filtrar
    } else {
      const filteredData = data.filter((item) => {
        if (filterKey === "Estado") {
          return newValue === "Activo" ? item[filterKey] === true : item[filterKey] === false;
        }
        return item[filterKey] === newValue;
      });
      onFilterChange(filteredData); // Devolver los datos filtrados
    }
  };

  const handleBlur = () => {
    // Validar si el valor está vacío
    if (!value || value === "") {
      setValue("Todos"); // Restablecer a una opción predeterminada
      onFilterChange(data); // Devolver todos los datos
    }
  };

  return (
    <Autocomplete
      disablePortal
      options={filteredOptions} // Opciones visibles en el Autocomplete
      value={value}
      onInputChange={(event, newValue) => handleInputChange(event, newValue)} // Filtrar dinámicamente
      onChange={handleFilter} // Aplicar filtro final al seleccionar una opción
      onBlur={handleBlur} // Validar al salir del campo

      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          variant="outlined"
          helperText={data.length === 0 ? "No hay datos disponibles" : ""}
        />
      )}
      sx={{ width }}
    />
  );
};

export default FilterAutocomplete;
