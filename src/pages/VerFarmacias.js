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
  const [currentForm, setCurrentForm] = useState(null);
  const [selectedFarmacia, setSelectedFarmacia] = useState(null);


  const handleDialogOpen = () => {
    setCurrentForm("add"); // Establece que se abrirá el formulario de "Añadir Farmacia"
    setDialogOpen(true);
  };
  
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
          value: "La milagrosa",
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
          value: "8295124461",
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
          apiOptions: "/usuarioRoles/5", // Ruta del API
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
    // Busca la farmacia en el estado `farmacias` usando el ID
    const farmacia = farmacias.find((f) => f.Id_Farmacia === id);
    if (farmacia) {
      setSelectedFarmacia(farmacia); // Guarda la farmacia seleccionada
      setCurrentForm("view"); // Cambia al formulario de edición
      setDialogOpen(true); // Abre el diálogo
    } else {
      console.error(`No se encontró ninguna farmacia con el ID: ${id}`);
    }
  };

  const handleEdit = (id) => {
    // Busca la farmacia en el estado `farmacias` usando el ID
    const farmacia = farmacias.find((f) => f.Id_Farmacia === id);

    if (farmacia) {
      setSelectedFarmacia(farmacia); // Guarda la farmacia seleccionada
      setCurrentForm("edit"); // Cambia al formulario de edición
      setDialogOpen(true); // Abre el diálogo
    } else {
      console.error(`No se encontró ninguna farmacia con el ID: ${id}`);
    }
  };


  const validFields = [
    "Direccion",
    "Estado",
    "Id_Clasificacion",
    "Id_Farmacia",
    "Id_Provincia",
    "Id_Tipo_Farmacia",
    "Nombre",
    "RNC",
    "Responsable_Tecnico",
    "Tamano",
    "Telefono",
  ];

  const filterValidFields = (data) => {
    return Object.keys(data).reduce((filteredData, key) => {
      if (validFields.includes(key)) {
        filteredData[key] = data[key]; // Incluye solo las claves válidas
      }
      return filteredData;
    }, {});
  };
  
  

  const handleUpdatePharmacy = async (updatedPharmacyData) => {
  
    const filteredData = filterValidFields(updatedPharmacyData);
  
    try {
      // Envía los datos al backend
      await pharmacyService.updatePharmacyData(
        filteredData.Id_Farmacia,
        filteredData
      );
  
      // Vuelve a cargar las farmacias desde el backend
      const updatedPharmacies = await pharmacyService.getAllPharmacies();
      setFarmacias(updatedPharmacies);
      setFilteredFarmacias(updatedPharmacies);
      handleDialogClose();

  
      setSnackbar({
        open: true,
        message: `La farmacia ${filteredData.Nombre} se ha actualizado con éxito.`,
        severity: "success",
      });
  
    } catch (error) {
      console.error("Error al actualizar la farmacia:", error.message);
  
      setSnackbar({
        open: true,
        message: `Error al actualizar la farmacia ${filteredData.Nombre}.`,
        severity: "error",
      });
  
    }
  };
  

  const handleAddPharmacy = async (pharmacyData) => {
    try {
      // Llama al método del servicio para guardar los datos
      const result = await pharmacyService.savePharmacyData(pharmacyData);
      
      // Actualiza las listas de usuarios y usuarios filtrados
      setFarmacias((prevFarmacias) => [...prevFarmacias, result]);
      setFilteredFarmacias((prevFiltered) => [...prevFiltered, result]);

      handleDialogClose();

      // Mostrar mensaje de éxito
      setSnackbar({
        open: true,
        message: `La farmacia ${pharmacyData.Nombre} se ha creado con éxito.`,
        severity: "success",
      });
    } catch (error) {
      // Manejo de errores
      console.error("Error al añadir la farmacia:", error.message);
      setSnackbar({
        open: true,
        message: `Error al crear el farmacia ${pharmacyData.Nombre}.`,
        severity: "error",
      });
    }
  };

  const toggleEstadoFarmacia = async (id) => {
    const farmacia = farmacias.find((f) => f.Id_Farmacia === id);
    const nuevoEstado = !farmacia.Estado;
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
        
        {/* FilterAutocomplete para filtrar por Provincia */}
        <FilterAutocomplete
          label="Provincia"
          data={farmacias}
          filterKey="Nombre_Provincia"
          onFilterChange={handleFilterChange}
          width="200px"
        />

        <Typography variant="body1">O</Typography>
        
        {/* FilterAutocomplete para filtrar por Responsable Tecnico */}
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
          { key: "Estado", label: "Estado" , isBoolean: true },
          { key: "Nombre_Tipo_Farmacia", label: "Tipo de Farmacia" },
          // { key: "Tamano", label: "Tamaño" },
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
          {currentForm === "add" && (
            <DynamicForm
              formFields={farmaciaFormFields}
              formTitle="Registrando Nueva Farmacia"
              labelButtonOnSubmit="Registrar Farmacia"
              handleSendData={handleAddPharmacy}
            />
          )}

          {currentForm === "view" && (
            <DynamicForm
              formFields={farmaciaFormFields}
              formTitle="Vista de Farmacia"
              initialValues={selectedFarmacia}
              isDisabled={true} // Deshabilita todos los campos
              handleSendData={handleAddPharmacy}

            />
          )}

          {currentForm === "edit" && (
            <DynamicForm
            formFields={farmaciaFormFields}
            formTitle="Editando Farmacia"
            labelButtonOnSubmit="Guardar Cambios"
            initialValues={selectedFarmacia}
            handleSendData={handleUpdatePharmacy}
          />
          
          )}
        </Box>
      </DialogComponent>
    </Box>
  );
};

export default VerFarmacias;
