import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import CustomGrid from "../components/CustomGrid";
import SearchBar from "../components/SearchBar";

const VerFarmacias = () => {
  // Datos ficticios de farmacias
  const [farmacias, setFarmacias] = useState([]);
  const [filteredFarmacias, setFilteredFarmacias] = useState([]);

  useEffect(() => {
    // Fake data para farmacias
    const fakeFarmacias = [
      {
        Id_Farmacia: 1,
        Nombre: "Farmacia Central",
        Direccion: "Av. Independencia 123",
        Telefono: "809-123-4567",
        Estado: "Activo",
      },
      {
        Id_Farmacia: 2,
        Nombre: "Farmacia Nacional",
        Direccion: "Calle Principal 45",
        Telefono: "809-234-5678",
        Estado: "Inactivo",
      },
      {
        Id_Farmacia: 3,
        Nombre: "Farmacia del Pueblo",
        Direccion: "Calle Segunda 67",
        Telefono: "809-345-6789",
        Estado: "Activo",
      },
    ];

    setFarmacias(fakeFarmacias);
    setFilteredFarmacias(fakeFarmacias);
  }, []);

  // Función para manejar el filtro de búsqueda
  const handleFilterChange = (filteredResults) => {
    setFilteredFarmacias(filteredResults);
  };

  // Función para manejar las acciones
  const handleView = (id) => {
    console.log(`Ver farmacia con ID: ${id}`);
  };

  const handleEdit = (id) => {
    console.log(`Editar farmacia con ID: ${id}`);
  };

  const handleToggle = (id) => {
    setFarmacias((prevFarmacias) =>
      prevFarmacias.map((farmacia) =>
        farmacia.Id_Farmacia === id
          ? {
              ...farmacia,
              Estado: farmacia.Estado === "Activo" ? "Inactivo" : "Activo",
            }
          : farmacia
      )
    );
    console.log(`Toggle Estado de la farmacia con ID: ${id}`);
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
     </Box>

      {/* Tabla de farmacias */}
      <CustomGrid
        data={filteredFarmacias}
        columns={[
          { key: "Id_Farmacia", label: "ID" },
          { key: "Nombre", label: "Nombre" },
          { key: "Direccion", label: "Dirección" },
          { key: "Telefono", label: "Teléfono" },
          { key: "Estado", label: "Estado" },
        ]}
        actions={{
          onView: handleView,
          onEdit: handleEdit,
          onToggle: handleToggle,
        }}
      />
    </Box>
  );
};

export default VerFarmacias;
