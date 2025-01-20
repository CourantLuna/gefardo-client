import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import CustomGrid from "../components/CustomGrid";
import SearchBar from "../components/SearchBar";
import FilterAutocomplete from "../components/FilterAutocomplete";

import inspectionsService from "../services/inspectionsService";

const VerInspecciones = () => {
  const [inspecciones, setInspecciones] = useState([]);
  const [filteredInspecciones, setFilteredInspecciones] = useState([]);

  useEffect(() => {
    const fetchInspections = async () => {
      try {
        const inspections = await inspectionsService.getAllInspections();
        console.log("Inspecciones:", inspections);

        setInspecciones(inspections);
        setFilteredInspecciones(inspections);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchInspections();
  }, []);

  // Función para manejar el filtro de búsqueda
  const handleFilterChange = (filteredResults) => {
    setFilteredInspecciones(filteredResults);
  };

  // Función para manejar las acciones
  const handleEdit = (id) => {
    alert(`Editar inspección con ID: ${id}`);
  };

  const handleToggle = (id) => {
    setInspecciones((prevInspecciones) =>
      prevInspecciones.map((inspeccion) =>
        inspeccion.Id_Inspeccion === id
          ? {
              ...inspeccion,
              Estado: inspeccion.Estado === true ? false : true,
            }
          : inspeccion
      )
    );
    alert(`Toggle Estado de la inspección con ID: ${id}`);
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
          data={inspecciones}
          onFilterChange={handleFilterChange}
          label="Buscar inspección por tipo"
          filterKey="Tipo_Actividad" // Filtra por el campo "Tipo_Actividad"
        />

        {/* FilterAutocomplete para filtrar por estado */}
        <FilterAutocomplete
          label="Estado"
          data={inspecciones}
          filterKey="Estado"
          onFilterChange={handleFilterChange}
        />
      </Box>

      {/* Tabla de inspecciones */}
      <CustomGrid
        data={filteredInspecciones}
        columns={[
          { key: "Id_Inspeccion", label: "ID" },
          { key: "Tipo_Actividad", label: "Tipo de Actividad" },
          { key: "Fecha_Inspeccion", label: "Fecha de Inspección" },
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

export default VerInspecciones;
