import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import CustomGrid from "../components/CustomGrid";
import SearchBar from "../components/SearchBar";
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import DialogComponent from "../components/DialogComponent"; // Asegúrate de que la ruta sea correcta
import DynamicForm from '../components/CustomForm'; 



import typesRequestService from "../services/typesRequestService";

const GestionarServicios = () => {
  const [tiposServicios, setTiposServicios] = useState([]);
  const [filteredTiposServicios, setFilteredTiposServicios] = useState([]);

  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);

  const serviciosFields = [
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
    const fetchTypesRequests = async () => {
      try {
        const typesRequests = await typesRequestService.getAllTypesRequests();
        console.log("Tipos de Servicio:", typesRequests);

        setTiposServicios(typesRequests);
        setFilteredTiposServicios(typesRequests);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchTypesRequests();
  }, []);

  // Función para manejar el filtro de búsqueda
  const handleFilterChange = (filteredResults) => {
    setFilteredTiposServicios(filteredResults);
  };

  // Función para manejar las acciones
  const handleEdit = (id) => {
    alert(`Editar tipo de servicio con ID: ${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este tipo de servicio?")) {
      setTiposServicios((prevTiposServicios) =>
        prevTiposServicios.filter((tipo) => tipo.Id_Tipo_Servicio !== id)
      );
      alert(`Eliminado tipo de servicio con ID: ${id}`);
    }
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
          data={tiposServicios}
          onFilterChange={handleFilterChange}
          label="Buscar tipo de servicio"
          filterKey="Nombre_Servicio" // Filtra por el campo "Nombre_Servicio"
        />

        {/* Botón para añadir un nuevo tipo de servicio */}
        <Box>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<MedicalServicesIcon />}
            onClick={handleDialogOpen}
          >
            Servicio
          </Button>
        </Box>
      </Box>

      {/* Tabla de tipos de servicio */}
      <CustomGrid
        data={filteredTiposServicios}
        columns={[
          { key: "Id_Tipo_Servicio", label: "ID" },
          { key: "Nombre_Servicio", label: "Nombre del Servicio" },
          { key: "Descripcion", label: "Descripción" },
        ]}
        actions={{
          onEdit: handleEdit,
          onDelete: handleDelete,
        }}
      />

      <DialogComponent open={isDialogOpen} onClose={handleDialogClose} title="">
        <Box
         sx={{
          width: 'fit-content', // Tamaño ajustado al contenido
          margin: '0 auto', // Centra automáticamente horizontalmente
        }}
        >
          <DynamicForm
            formFields={serviciosFields}
            formTitle="Añadir Nuevo Tipo de Servicio"
          />
        </Box>
      </DialogComponent>
    </Box>
  );
};

export default GestionarServicios;
