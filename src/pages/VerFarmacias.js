import React, { useState, useEffect } from "react";
import { Box, Button, Typography, Paper, Snackbar, Alert} from "@mui/material";
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
      sectionTitle: "Información General",
      divider: true,
      fields: [
        {
          name: "Nombre",
          label: "Nombre de la Farmacia",
          type: "text",
          required: true,
          value: "Farmaciaa del Señor",
          xs: 12,
          sm: 6,
          md: 4,
        },
        {
          name: "Direccion",
          label: "Dirección",
          type: "text",
          required: true,
          xs: 12,
          sm: 6,
          md: 4,
        },
        {
          name: "Telefono",
          label: "Teléfono",
          type: "tel",
          required: false,
          xs: 12,
          sm: 6,
          md: 4,
        },
        {
          name: "RNC",
          label: "RNC (Registro Nacional de Contribuyentes)",
          type: "rnc", // Valida 9 dígitos
          required: true,
          xs: 12,
          sm: 6,
          md: 4,
        },
      ],
    },
    {
      sectionTitle: "Clasificaciones y Ubicación",
      divider: true,
      fields: [
        {
          name: "Id_Provincia",
          label: "Provincia",
          type: "autocomplete",
          apiOptions: "/provincias", // Ruta del API
          filterField: "Descripcion",
          IdFieldName: "Id_Provincia",
          required: true,
          value: 5,
          xs: 12,
          sm: 6,
          md: 4,
        },
        {
          name: "Id_Tipo_Farmacia",
          label: "Tipo de Farmacia",
          type: "autocomplete", // Usar un campo de autocompletar
          apiOptions: "/tipos-farmacia", // Ruta del API
          filterField: "Descripcion",
          IdFieldName: "Id_Tipo_Farmacia",
          required: true,
          xs: 12,
          sm: 6,
          md: 4,
        },
        {
          name: "Id_Clasificacion",
          label: "Clasificación de Riesgo",
          type: "autocomplete",
          apiOptions: "/clasificaciones-riesgo", // Ruta del API
          filterField: "Nivel_Riesgo",
          IdFieldName: "Id_Clasificacion",
          required: false,
          xs: 12,
          sm: 6,
          md: 4,
        },
      ],
    },
    {
      sectionTitle: "Responsable y Estado",
      divider: true,
      fields: [
        {
          name: "Responsable_Tecnico",
          label: "Responsable Técnico",
          type: "autocomplete",
          apiOptions: "/usuarioRoles/4", // Ruta del API
          filterField: "Nombre_Completo",
          IdFieldName: "Id_Usuario",
          required: true,
          xs: 12,
          sm: 6,
          md: 4,
        },
        {
          name: "Tamano",
          label: "Tamaño",
          type: "text",
          required: false,
          xs: 12,
          sm: 6,
          md: 4,
        },
        {
          name: "Estado",
          label: "Activo",
          type: "checkbox",
          required: false,
          xs: 12,
          sm: 6,
          md: 4,
        },
      ],
    },
  ];
   
  // Estado para el Snackbar
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success", // "success", "error", "warning", "info"
  });

  // Función para manejar el cierre del Snackbar
  const handleSnackbarClose = () => setSnackbar({ ...snackbar, open: false });

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

  const handleAddPharmacy = async (pharmacyData) => {
    console.log('Datos de la farmacia a guardar:', pharmacyData);
    try {
      // Llama al método del servicio para guardar los datos
      const result = await pharmacyService.savePharmacyData(pharmacyData);
      // Mostrar mensaje de éxito
      setSnackbar({
        open: true,
        message: `El usuario ${pharmacyData.Nombre} se ha creado con éxito.`,
        severity: "success",
      });
  
      console.log('Datos de la farmacia guardados correctamente:', result);
  // Actualiza las listas de usuarios y usuarios filtrados
  setFarmacias((prevFarmacias) => [...prevFarmacias, result]);
  setFilteredFarmacias((prevFiltered) => [...prevFiltered, result]);

  handleDialogClose();
    } catch (error) {
      // Manejo de errores
      console.error('Error al añadir la farmacia:', error.message);
      setSnackbar({
        open: true,
        message: `Error al crear el usuario ${pharmacyData.Nombre}.`,
        severity: "error",
      });    }
  };

  const toggleEstadoFarmacia = async (id) => {
    const farmacia = farmacias.find((f) => f.Id_Farmacia === id);
    const nuevoEstado = !farmacia.Estado;
    console.log(`Estado nuevo de la farmacia ${farmacia.Id_Farmacia}:`, nuevoEstado);
    try {
      // Llama al servicio correspondiente para actualizar el estado de la farmacia
      await pharmacyService.toggleEstado(id, nuevoEstado);
  
      // Actualiza el estado local de farmacias
      setFarmacias((prev) => {
        const updatedFarmacias = prev.map((farmacia) =>
          farmacia.Id_Farmacia === id ? { ...farmacia, Estado: nuevoEstado } : farmacia
        );
        setFilteredFarmacias(updatedFarmacias); // También actualiza la lista filtrada
        return updatedFarmacias;
      });
  
      // Muestra un Snackbar con éxito
      setSnackbar({
        open: true,
        message: `El estado de la farmacia ${farmacia.Nombre} se actualizó con éxito.`,
        severity: "success",
      });
    } catch (error) {
      console.error("Error al actualizar el estado de la farmacia:", error.message);
      // Muestra un Snackbar con error
      setSnackbar({
        open: true,
        message: `Error al actualizar el estado de la farmacia ${farmacia.Nombre}.`,
        severity: "error",
      });
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
          { key: "Id_Tipo_Farmacia", label: "Tipo de Farmacia" },
        ]}
        actions={{
          onEdit: handleEdit,
          onToggle: toggleEstadoFarmacia,
          onView: handleView,
        }}
      />


{/* Snackbar para avisar estado final del cambio de estado */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>

      <DialogComponent open={isDialogOpen} onClose={handleDialogClose} title="">
        <Box
          sx={{
            width: "fit-content", // Tamaño ajustado al contenido
            margin: "0 auto", // Centra automáticamente horizontalmente
          }}
        >
          <DynamicForm
            formFields={farmaciaFormFields}
            formTitle="Registrando Nueva Farmacia"
            labelButtonOnSubmit="Registrar Farmacia"
            handleSendData = {handleAddPharmacy}
          />
        </Box>
      </DialogComponent>
    </Box>
  );
};

export default VerFarmacias;
