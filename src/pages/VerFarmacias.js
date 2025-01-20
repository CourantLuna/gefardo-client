import React, { useState, useEffect } from "react";
import { Box, Button, Typography, Paper } from "@mui/material";
import CustomGrid from "../components/CustomGrid";
import SearchBar from "../components/SearchBar";
import FilterAutocomplete from "../components/FilterAutocomplete";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";

import pharmacyService from "../services/pharmacyService";

import DialogComponent from "../components/DialogComponent"; // Asegúrate de que la ruta sea correcta
import DynamicForm from '../components/CustomForm'; 


const VerFarmacias = () => {
  // Datos ficticios de farmacias
  const [farmacias, setFarmacias] = useState([]);
  const [filteredFarmacias, setFilteredFarmacias] = useState([]);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);

  const farmaciaFormFields = [
    {
      "sectionTitle": "Información del Tipo de Servicio",
      "divider": true,
      "fields": [
        {
          "name": "Nombre_Servicio",
          "label": "Nombre del Servicio",
          "type": "text",
          "required": true,
          "md": 12,
          "value": ""
        },
        {
          "name": "Id_Formulario",
          "label": "Formulario Asociado",
          "type": "autocomplete",
          "required": false,
          "modelOptions": "Formulario",
          "md": 6,
          "value": ""
        },
        {
          "name": "Descripcion",
          "label": "Descripción del Servicio",
          "type": "textarea",
          "required": false,
          "md": 12,
          "value": ""
        }
      ]
    },
    
  ]; 

  useEffect(() => {
    const fetchPharmacies = async () => {
      try {
        const pharmacies = await pharmacyService.getAllPharmacies();
        console.log("Farmacias:", pharmacies);

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
          alignItems: "center",
          marginBottom: "20px",
          gap: "16px",
        }}
      >
        {/* Barra de búsqueda */}
        <SearchBar
          data={farmacias}
          onFilterChange={handleFilterChange}
          label="Buscar farmacia por nombre"
          filterKey="Nombre" // Filtra por el campo "Nombre"
        />

        {/* Botón para añadir un nuevo tipo de servicio */}
        <Box>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<AddBusinessIcon />}
            onClick={handleDialogOpen}
          >
            Farmacia
          </Button>
        </Box>
      </Box>

      {/* Seccion de filtros */}
      <Paper
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          padding: "15px",
          gap: "15px",
          fullWidth: "true",
          marginBottom: "20px",
        }}
      >
        <Typography variant="body1">Filtrar por:</Typography>
        {/* FilterAutocomplete para filtrar por estado */}
        <FilterAutocomplete
          label="Estado"
          data={farmacias}
          filterKey="Estado"
          onFilterChange={handleFilterChange}
          width="200px"
        />
        <Typography variant="body1">O</Typography>

        <FilterAutocomplete
          label="Provincia"
          data={farmacias}
          filterKey="Nombre_Provincia"
          onFilterChange={handleFilterChange}
          width="200px"
        />

        <Typography variant="body1">O</Typography>

        <FilterAutocomplete
          label="Responsable Tecnico"
          data={farmacias}
          filterKey="Nombre_Responsable"
          onFilterChange={handleFilterChange}
          width="200px"
        />
      </Paper>

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

      <DialogComponent open={isDialogOpen} onClose={handleDialogClose} title="">
        <Box
          sx={{
            width: "fit-content", // Tamaño ajustado al contenido
            margin: "0 auto", // Centra automáticamente horizontalmente
          }}
        >
          <DynamicForm
            formFields={farmaciaFormFields}
            formTitle="Añadir Nuevo Tipo de Servicio"
          />
        </Box>
      </DialogComponent>
    </Box>
  );
};

export default VerFarmacias;
