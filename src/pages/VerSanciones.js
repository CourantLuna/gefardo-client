import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import CustomGrid from "../components/CustomGrid";
import SearchBar from "../components/SearchBar";
import FilterAutocomplete from "../components/FilterAutocomplete";

import sanctionService from "../services/sanctionService";

const VerSanciones = () => {
  const [sanciones, setSanciones] = useState([]);
  const [filteredSanciones, setFilteredSanciones] = useState([]);

  useEffect(() => {
    const fetchSanctions = async () => {
      try {
        const sanctions = await sanctionService.getAllSanctions();
        console.log("Sanciones:", sanctions);

        setSanciones(sanctions);
        setFilteredSanciones(sanctions);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchSanctions();
  }, []);

  // Función para manejar el filtro de búsqueda
  const handleFilterChange = (filteredResults) => {
    setFilteredSanciones(filteredResults);
  };

  // Función para manejar las acciones
  const handleEdit = (id) => {
    alert(`Editar sanción con ID: ${id}`);
  };

  const handleToggle = (id) => {
    setSanciones((prevSanciones) =>
      prevSanciones.map((sancion) =>
        sancion.Id_Sancion === id
          ? {
              ...sancion,
              Estado: sancion.Estado === true ? false : true,
            }
          : sancion
      )
    );
    alert(`Toggle Estado de la sanción con ID: ${id}`);
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
          data={sanciones}
          onFilterChange={handleFilterChange}
          label="Buscar sanción por detalle"
          filterKey="Detalle" // Filtra por el campo "Detalle"
        />

        {/* FilterAutocomplete para filtrar por estado */}
        <FilterAutocomplete
          label="Estado"
          data={sanciones}
          filterKey="Estado"
          onFilterChange={handleFilterChange}
        />
      </Box>

      {/* Tabla de sanciones */}
      <CustomGrid
        data={filteredSanciones}
        columns={[
          { key: "Id_Sancion", label: "ID" },
          { key: "Detalle", label: "Detalle" },
          { key: "Fecha_Sancion", label: "Fecha de Sanción" },
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

export default VerSanciones;
