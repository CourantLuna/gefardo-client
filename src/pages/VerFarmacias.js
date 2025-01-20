import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import CustomGrid from "../components/CustomGrid";
import SearchBar from "../components/SearchBar";
import FilterAutocomplete from "../components/FilterAutocomplete";

import pharmacyService from '../services/pharmacyService';

const VerFarmacias = () => {
  // Datos ficticios de farmacias
  const [farmacias, setFarmacias] = useState([]);
  const [filteredFarmacias, setFilteredFarmacias] = useState([]);

  useEffect(() => {

    const fetchPharmacies = async () => {
      try {
        const pharmacies = await pharmacyService.getAllPharmacies();
        console.log('Farmacias:', pharmacies);
        
    setFarmacias(pharmacies);
    setFilteredFarmacias(pharmacies);
      } catch (error) {
        console.error(error.message);
      }
    };
    
    fetchPharmacies();
  }, []);

  // Función para manejar el filtro de búsqueda
  const handleFilterChange = (filteredResults) => {
    setFilteredFarmacias(filteredResults);
  };

  // Función para manejar las acciones
  const handleView = (id) => {
    alert(`Ver farmacia con ID: ${id}`);
  };

  const handleEdit = (id) => {
    alert(`Editar farmacia con ID: ${id}`);
  };

  const handleToggle = (id) => {
    setFarmacias((prevFarmacias) =>
      prevFarmacias.map((farmacia) =>
        farmacia.Id_Farmacia === id
          ? {
              ...farmacia,
              Estado: farmacia.Estado === true ? false : true,
            }
          : farmacia
      )
    );
    alert(`Toggle Estado de la farmacia con ID: ${id}`);
  };

  return (
    <Box
        sx={{
          padding: "20px",
          borderRadius: "8px",
          marginLeft: "20px",
        }}
      >
     <Box 
     sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px",
        gap: "16px",
      }}>
         {/* Barra de búsqueda */}
      <SearchBar
        data={farmacias}
        onFilterChange={handleFilterChange}
        label="Buscar farmacia por nombre"
        filterKey="Nombre" // Filtra por el campo "Nombre"
      />

      {/* FilterAutocomplete para filtrar por estado */}
      <FilterAutocomplete
        label="Estado"
        data={farmacias}
        filterKey="Estado"
        onFilterChange={handleFilterChange}
      />
     </Box>

      {/* Tabla de farmacias */}
      <CustomGrid
        data={filteredFarmacias}
        columns={[
          { key: "Id_Farmacia", label: "ID" },
          { key: "RNC", label: "RNC" },
          { key: "Nombre", label: "Nombre" },
          { key: "Nombre_Provincia", label: "Provincia" },
          { key: "Nombre_Responsable", label: "Responsable Tecnico" },
          { key: "Telefono", label: "Teléfono" },
          { key: "Estado", label: "Estado" },
        ]}
        actions={{
          onEdit: handleEdit,
          onToggle: handleToggle,
          onView: handleView,
        }}
      />

      
    </Box>
  );
};

export default VerFarmacias;
