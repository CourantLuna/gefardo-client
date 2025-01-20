import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import CustomGrid from "../components/CustomGrid";
import SearchBar from "../components/SearchBar";
import FilterAutocomplete from "../components/FilterAutocomplete";

import licenseService from '../services/licenseService';

const VerLicencias = () => {
  const [licencias, setLicencias] = useState([]);
  const [filteredLicencias, setFilteredLicencias] = useState([]);

  useEffect(() => {
    const fetchLicenses = async () => {
      try {
        const licenses = await licenseService.getAllLicenses();
        console.log('Licencias:', licenses);
        
        setLicencias(licenses);
        setFilteredLicencias(licenses);
      } catch (error) {
        console.error(error.message);
      }
    };
    
    fetchLicenses();
  }, []);

  // Función para manejar el filtro de búsqueda
  const handleFilterChange = (filteredResults) => {
    setFilteredLicencias(filteredResults);
  };

  // Función para manejar las acciones
  const handleEdit = (id) => {
    alert(`Editar licencia con ID: ${id}`);
  };

  const handleToggle = (id) => {
    setLicencias((prevLicencias) =>
      prevLicencias.map((licencia) =>
        licencia.Id_Licencia === id
          ? {
              ...licencia,
              Estado: licencia.Estado === true ? false : true,
            }
          : licencia
      )
    );
    alert(`Toggle Estado de la licencia con ID: ${id}`);
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
        }}
      >
        {/* Barra de búsqueda */}
        <SearchBar
          data={licencias}
          onFilterChange={handleFilterChange}
          label="Buscar licencia por número"
          filterKey="Numero_Licencia" // Filtra por el campo "Numero_Licencia"
        />

        {/* FilterAutocomplete para filtrar por estado */}
        <FilterAutocomplete
          label="Estado"
          data={licencias}
          filterKey="Estado"
          onFilterChange={handleFilterChange}
        />
      </Box>

      {/* Tabla de licencias */}
      <CustomGrid
        data={filteredLicencias}
        columns={[
          { key: "Id_Licencia", label: "ID" },
          { key: "Numero_Licencia", label: "Número de Licencia" },
          { key: "Fecha_Emision", label: "Fecha de Emisión" },
          { key: "Fecha_Vencimiento", label: "Fecha de Vencimiento" },
          { key: "Estado", label: "Estado" },
        ]}
        actions={{
          onEdit: handleEdit,
          onToggle: handleToggle,
        }}
      />
    </Box>
  );
};

export default VerLicencias;
