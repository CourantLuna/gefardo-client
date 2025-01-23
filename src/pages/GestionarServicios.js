import React, { useState, useEffect } from "react";
import { Box, Button, Paper, Snackbar, Alert } from "@mui/material";
import CustomGrid from "../components/CustomGrid";
import SearchBar from "../components/SearchBar";
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import DialogComponent from "../components/DialogComponent"; // Asegúrate de que la ruta sea correcta
import DynamicForm from '../components/CustomForm'; 
import FilterAutocomplete from "../components/FilterAutocomplete";
import typesRequestService from "../services/typesRequestService";

const GestionarServicios = () => {
  const [tiposServicios, setTiposServicios] = useState([]);
  const [filteredTiposServicios, setFilteredTiposServicios] = useState([]);
 const [currentForm, setCurrentForm] = useState(null);
  const [selectedTipoServicio, setSelectedTipoServicio] = useState(null);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = () => {
    setCurrentForm("add"); 
    setDialogOpen(true);
  };
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
          apiOptions: "/formularios", // Ruta del API
          filterField: "Nombre_Formulario",
          IdFieldName: "Id_Formulario",
          "required": false,
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

  // Estado para el Snackbar
      const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success", // "success", "error", "warning", "info"
      });
    
      // Función para manejar el cierre del Snackbar
      const handleSnackbarClose = () => setSnackbar({ ...snackbar, open: false });

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

  const generateInitialValues = (formFields) => {
    const initialValues = {};
  
    formFields.forEach((section) => {
      section.fields.forEach((field) => {
        if (field.type === "text" || field.type === "date") {
          // Para textos y fechas, el valor vacío es ""
          initialValues[field.name] = field.value || "";
        } else if (field.type === "number") {
          // Para números, el valor vacío es null
          initialValues[field.name] = field.value || null;
        } else if (field.type === "autocomplete" || field.type === "select") {
          // Para autocomplete/select, el valor vacío es null
          initialValues[field.name] = field.value || null;
        } else if (field.type === "checkbox" || field.type === "radio") {
          // Para checkbox/radio, el valor vacío es false
          initialValues[field.name] = field.value || false;
        } else {
          // Valor genérico si no se especifica un tipo
          initialValues[field.name] = field.value || null;
        }
      });
    });
  
    return initialValues;
  };

  const handleAddTipoServicio = async (tipoServicioData) => {
    try {
      // Llama al método del servicio para guardar los datos
      await typesRequestService.createTypeRequest(tipoServicioData);
  
      // Vuelve a cargar los tipos de servicio desde el backend
      const updatedTiposServicio = await typesRequestService.getAllTypesRequests();
      setTiposServicios(updatedTiposServicio);
      setFilteredTiposServicios(updatedTiposServicio);
      handleDialogClose();
  
      // Mostrar mensaje de éxito
      setSnackbar({
        open: true,
        message: `El tipo de servicio "${tipoServicioData.Nombre_Servicio}" se ha creado con éxito.`,
        severity: "success",
      });
    } catch (error) {
      // Manejo de errores
      console.error("Error al añadir tipo de servicio:", error.message);
      setSnackbar({
        open: true,
        message: `Error al crear el tipo de servicio "${tipoServicioData.Nombre_Servicio}".`,
        severity: "error",
      });
    }
  };
  
  const validTipoServicioFields = 
  ["Id_Tipo_Servicio", "Nombre_Servicio", "Id_Formulario", "Descripcion"];

const filterValidTipoServicioFields = (data) => {
  return Object.keys(data).reduce((filteredData, key) => {
    if (validTipoServicioFields.includes(key)) {
      filteredData[key] = data[key]; // Incluye solo las claves válidas
    }
    return filteredData;
  }, {});
};

const handleUpdateTipoServicio = async (updatedTipoServicioData) => {
  const filteredData = filterValidTipoServicioFields(updatedTipoServicioData);

  try {
    // Envía los datos al backend
    await typesRequestService.updateTypeRequest(
      filteredData.Id_Tipo_Servicio,
      filteredData
    );

    // Vuelve a cargar los tipos de servicio desde el backend
    const updatedTiposServicio = await typesRequestService.getAllTypesRequests();
    setTiposServicios(updatedTiposServicio);
    setFilteredTiposServicios(updatedTiposServicio);
    handleDialogClose();

    // Mostrar mensaje de éxito
    setSnackbar({
      open: true,
      message: `El tipo de servicio "${filteredData.Nombre_Servicio}" se ha actualizado con éxito.`,
      severity: "success",
    });
  } catch (error) {
    // Manejo de errores
    console.error("Error al actualizar el tipo de servicio:", error.message);

    setSnackbar({
      open: true,
      message: `Error al actualizar el tipo de servicio "${filteredData.Nombre_Servicio}".`,
      severity: "error",
    });
  }
};

  
  // Función para manejar el filtro de búsqueda
  const handleFilterChange = (filteredResults) => {
    setFilteredTiposServicios(filteredResults);
  };

  const handleView = (id) => {
    const tipoServicio = tiposServicios.find((f) => f.Id_Tipo_Servicio === id);
    if (tipoServicio) {
      setSelectedTipoServicio(tipoServicio); 
      setCurrentForm("view");
      setDialogOpen(true); 
    } else {
      console.error(`No se encontró ninguna tipo de servicio con el ID: ${id}`);
    }
  };

  // Función para manejar las acciones
  const handleEdit = (id) => {
 const tipoServicio = tiposServicios.find((f) => f.Id_Tipo_Servicio === id);
 if (tipoServicio) {
   setSelectedTipoServicio(tipoServicio); 
   setCurrentForm("edit");
   setDialogOpen(true); 
 } else {
   console.error(`No se encontró ninguna tipo de servicio con el ID: ${id}`);
 }  };

 const toggleEstadoTipoServicio = async (id) => {
  const tipoServicio = tiposServicios.find((t) => t.Id_Tipo_Servicio === id);
  const nuevoEstado = !tipoServicio.Estado;

  try {
      // Llama al servicio correspondiente para actualizar el estado del tipo de servicio
      await typesRequestService.toggleEstado(id, nuevoEstado);

      // Actualiza el estado local de tiposServicios
      setTiposServicios((prev) => {
          const updatedTiposServicios = prev.map((tipo) =>
              tipo.Id_Tipo_Servicio === id ? { ...tipo, Estado: nuevoEstado } : tipo
          );
          setFilteredTiposServicios(updatedTiposServicios);
          return updatedTiposServicios;
      });
      

      // Muestra un mensaje de éxito
      setSnackbar({
          open: true,
          message: `El estado del tipo de servicio con ID ${id} se actualizó con éxito.`,
          severity: "success",
      });
  } catch (error) {
      console.error("Error al actualizar el estado del tipo de servicio:", error.message);

      // Muestra un mensaje de error
      setSnackbar({
          open: true,
          message: `Error al actualizar el estado del tipo de servicio con ID ${id}.`,
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
      Filtrar por:
      {/* FilterAutocomplete para filtrar por estado */}
      <FilterAutocomplete
        label="Formulario Asociado"
        data={tiposServicios}
        filterKey="Nombre_Formulario"
        onFilterChange={handleFilterChange}
      />
     
    </Paper>

      {/* Tabla de tipos de servicio */}
      <CustomGrid
        data={filteredTiposServicios}
        columns={[
          { key: "Id_Tipo_Servicio", label: "ID" },
          { key: "Nombre_Servicio", label: "Nombre del Servicio" },
          { key: "Nombre_Formulario", label: "Formulario Asociado" },
          { key: "Estado", label: "Estado",isBoolean: true },

        ]}
        actions={{
          onEdit: handleEdit,
          onView: handleView,
          onToggle: toggleEstadoTipoServicio,
          
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
              formFields={serviciosFields}
              formTitle="Registrando tipo de servicio"
              labelButtonOnSubmit="Registrar tipo de servicio"
              handleSendData={handleAddTipoServicio}
              initialValues={generateInitialValues(serviciosFields)} // Valores iniciales vacíos
            />
          )}

          {currentForm === "view" && (
            <DynamicForm
              formFields={serviciosFields}
              formTitle="Vista de tipo de servicio"
              initialValues={selectedTipoServicio}
              isDisabled={true} // Deshabilita todos los campos
              handleSendData={handleAddTipoServicio }

            />
          )}

          {currentForm === "edit" && (
            <DynamicForm
            formFields={serviciosFields}
            formTitle="Editando Tipo de Servicio"
            labelButtonOnSubmit="Guardar Cambios"
            initialValues={selectedTipoServicio}
            handleSendData={handleUpdateTipoServicio}
          />
          
          )}
        </Box>
      </DialogComponent>
    </Box>
  );
};

export default GestionarServicios;
