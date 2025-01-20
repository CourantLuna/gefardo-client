import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import CustomGrid from "../components/CustomGrid";
import SearchBar from "../components/SearchBar";
import FilterAutocomplete from "../components/FilterAutocomplete";

import requestService from "../services/requestService";

const VerSolicitudes = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [filteredSolicitudes, setFilteredSolicitudes] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const requests = await requestService.getAllRequests();
        console.log("Solicitudes:", requests);

        setSolicitudes(requests);
        setFilteredSolicitudes(requests);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchRequests();
  }, []);

  // Función para manejar el filtro de búsqueda
  const handleFilterChange = (filteredResults) => {
    setFilteredSolicitudes(filteredResults);
  };

  // Función para manejar las acciones
  const handleEdit = (id) => {
    alert(`Editar solicitud con ID: ${id}`);
  };

  const handleToggle = (id) => {
    setSolicitudes((prevSolicitudes) =>
      prevSolicitudes.map((solicitud) =>
        solicitud.Id_Servicio === id
          ? {
              ...solicitud,
              Estado: solicitud.Estado === true ? false : true,
            }
          : solicitud
      )
    );
    alert(`Toggle Estado de la solicitud con ID: ${id}`);
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
          data={solicitudes}
          onFilterChange={handleFilterChange}
          label="Buscar solicitud por descripción"
          filterKey="Descripcion" // Filtra por el campo "Descripcion"
        />

        {/* FilterAutocomplete para filtrar por estado */}
        <FilterAutocomplete
          label="Estado"
          data={solicitudes}
          filterKey="Estado"
          onFilterChange={handleFilterChange}
        />
      </Box>

      {/* Tabla de solicitudes */}
      <CustomGrid
        data={filteredSolicitudes}
        columns={[
          { key: "Id_Servicio", label: "ID" },
          { key: "Descripcion", label: "Descripción" },
          { key: "Fecha_Solicitud", label: "Fecha de Solicitud" },
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

export default VerSolicitudes;
