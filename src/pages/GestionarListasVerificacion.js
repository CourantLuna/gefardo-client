import React, { useState, useEffect } from "react";
import { Box, Button, Paper, Snackbar, Alert } from "@mui/material";
import CustomGrid from "../components/CustomGrid";
import SearchBar from "../components/SearchBar";
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import DialogComponent from "../components/DialogComponent"; // Asegúrate de que la ruta sea correcta
import DynamicForm from '../components/CustomForm'; 
import FilterAutocomplete from "../components/FilterAutocomplete";
import generalService from "../services/generalService";
import AuthService from "../services/authService";
import checklistService from "../services/CheckListService";

const GestionarListasVerificacion = () => {
  const [listasVerificacion, setListasVerificacion]  = useState([]);
  const [filteredlistasVerificacion, setFilteredlistasVerificacion] = useState([]);
 const [currentForm, setCurrentForm] = useState(null);
  const [selectedlistasVerificacion, setSelectedlistasVerificacion] = useState(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);

  const handleDialogOpen = () => {
    setCurrentForm("add"); 
    setDialogOpen(true);
  };
  const handleDialogClose = () => setDialogOpen(false);

  const listaVerificacionFields =[
    {
      sectionTitle: "Información General",
      divider: true,
      fields: [
        {
          name: "Nombre",
          label: "Nombre de la Lista",
          type: "text",
          required: true,
          value: "",
          xs: 12,
          sm: 12,
          md: 12,
        },
        {
          name: "Descripcion",
          label: "Descripción",
          type: "textarea",
          required: false,
          value: "",
          xs: 12,
          sm: 12,
          md: 12,
        },
      ],
    },
    {
      sectionTitle: "Detalles Técnicos",
      divider: true,
      fields: [
        {
          name: "Fecha_Creacion",
          label: "Fecha de Creación",
          type: "date",
          required: false,
          IsThisFieldDisabled: true,
          value: new Date().toISOString().split("T")[0],
          xs: 12,
          sm: 6,
          md: 4,
          disabled: true,
        },
        {
          IsThisFieldDisabled: true,
          name: "Creado_Por",
          label: "Creado Por",
          type: "autocomplete",
          apiOptions: "/usuarioRoles/4",
          filterField: "Nombre_Completo",
          IdFieldName: "Id_Usuario",
          required: true,
          value: currentUserId,
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
    const fetchlistasVerificacion = async () => {
      try {
        const userId = AuthService.getUserId(); // Obtiene el ID del usuario
        setCurrentUserId(userId);
        const listasVerificacion = await generalService.filterByField('ListasVerificacion', 'Creado_Por', userId);
        console.log("Tipos de lista de verificacion:", listasVerificacion);

        setListasVerificacion(listasVerificacion);
        setFilteredlistasVerificacion(listasVerificacion);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchlistasVerificacion();
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

  const handleAddListaVerificacion = async (listaVerificacionData) => {
    try {
      // Llama al método del lista de verificacion para guardar los datos
      await checklistService.createChecklist(listaVerificacionData);
  
      // Vuelve a cargar los tipos de lista de verificacion desde el backend
      const updateListasVerificacion = await generalService.filterByField('ListasVerificacion', 'Creado_Por', currentUserId);
      setListasVerificacion(updateListasVerificacion);
      setFilteredlistasVerificacion(updateListasVerificacion);
      handleDialogClose();
  
      // Mostrar mensaje de éxito
      setSnackbar({
        open: true,
        message: ` "${listaVerificacionData.Nombre}" se ha creado con éxito.`,
        severity: "success",
      });
    } catch (error) {
      // Manejo de errores
      console.error("Error al añadir:", error.message);
      setSnackbar({
        open: true,
        message: `Error al crear "${listaVerificacionData.Nombre}".`,
        severity: "error",
      });
    }
  };
  
  const validListaVerificacionFields = [
    "Id_Lista",
    "Nombre",
    "Descripcion",
    "Fecha_Creacion",
    "Creado_Por",
    "ListaJson",
  ];

const filterlistaVerificacionFields = (data) => {
  return Object.keys(data).reduce((filteredData, key) => {
    if (validListaVerificacionFields.includes(key)) {
      filteredData[key] = data[key]; // Incluye solo las claves válidas
    }
    return filteredData;
  }, {});
};

const handleUpdateListaVerificacion = async (updatedlistaVerificacionData) => {
  const filteredData = filterlistaVerificacionFields(updatedlistaVerificacionData);

  try {
    // Envía los datos al backend
    await checklistService.updateChecklist(
      filteredData.Id_Lista,
      filteredData
    );

    // Vuelve a cargar los tipos de lista de verificacion desde el backend
    const updateListasVerificacion = await generalService.filterByField('ListasVerificacion', 'Creado_Por', currentUserId);
    setListasVerificacion(updateListasVerificacion);
    setFilteredlistasVerificacion(updateListasVerificacion);
    handleDialogClose();

    // Mostrar mensaje de éxito
    setSnackbar({
      open: true,
      message: ` "${filteredData.Nombre}" se ha actualizado con éxito.`,
      severity: "success",
    });
  } catch (error) {
    // Manejo de errores
    console.error("Error al actualizar el tipo de lista de verificacion:", error.message);

    setSnackbar({
      open: true,
      message: `Error al actualizar el tipo de lista de verificacion "${filteredData.Nombre}".`,
      severity: "error",
    });
  }
};

  
  // Función para manejar el filtro de búsqueda
  const handleFilterChange = (filteredResults) => {
    setFilteredlistasVerificacion(filteredResults);
  };

  const handleView = (id) => {
    const listaverificacion = listasVerificacion.find((f) => f.Id_Lista === id);
    if (listaverificacion) {
      setSelectedlistasVerificacion(listaverificacion); 
      setCurrentForm("view");
      setDialogOpen(true); 
    } else {
      console.error(`No se encontró ninguna tipo de lista de verificacion con el ID: ${id}`);
    }
  };

  // Función para manejar las acciones
  const handleEdit = (id) => {
    const listaverificacion = listasVerificacion.find((f) => f.Id_Lista === id);
    if (listaverificacion) {
      setSelectedlistasVerificacion(listaverificacion); 
      setCurrentForm("edit");
      setDialogOpen(true); 
 } else {
   console.error(`No se encontró ninguna tipo de lista de verificacion con el ID: ${id}`);
 }  };

 const toggleEstadoListasVerificacion = async (id) => {
  const listaVerificacion = listasVerificacion.find((t) => t.Id_Lista === id);
  const nuevoEstado = !listaVerificacion.Estado;

  try {
      // Llama al lista de verificacion correspondiente para actualizar el estado del tipo de lista de verificacion
      await checklistService.toggleEstado(id, nuevoEstado);

      // Actualiza el estado local de tiposlista de verificacions
      setListasVerificacion((prev) => {
          const updateListasVerificacion = prev.map((tipo) =>
              tipo.Id_Lista === id ? { ...tipo, Estado: nuevoEstado } : tipo
          );
          setFilteredlistasVerificacion(updateListasVerificacion);
          return updateListasVerificacion;
      });
      

      // Muestra un mensaje de éxito
      setSnackbar({
          open: true,
          message: `El estado del la lista de verificación con ID ${id} se actualizó con éxito.`,
          severity: "success",
      });
  } catch (error) {
      console.error("Error al actualizar el estado de lista de verificación:", error.message);

      // Muestra un mensaje de error
      setSnackbar({
          open: true,
          message: `Error al actualizar el estado de lista de verificación con ID ${id}.`,
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
          data={listasVerificacion}
          onFilterChange={handleFilterChange}
          label="Buscar nombre de lista de verificación"
          filterKey="Nombre" 
        />

        {/* Botón para añadir un nuevo  */}
        <Box>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<MedicalServicesIcon />}
            onClick={handleDialogOpen}
          >
            Lista
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
        label="Estado"
        data={listasVerificacion}
        filterKey="Estado"
        onFilterChange={handleFilterChange}
      />
     
    </Paper>

      {/* Tabla de tipos de servicio */}
      <CustomGrid
        data={filteredlistasVerificacion}
        columns={[
          { key: "Id_Lista", label: "ID" },
          { key: "Nombre", label: "Nombre del la Lista" },
          { key: "Creado_Por", label: "CreadoPor" },
          { key: "Fecha_Creacion", label: "Fecha Creación" },
          { key: "Estado", label: "Estado",isBoolean: true },

        ]}
        actions={{
          onEdit: handleEdit,
          onView: handleView,
          onToggle: toggleEstadoListasVerificacion,
          
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
              formFields={listaVerificacionFields}
              formTitle="Registrando tipo de servicio"
              labelButtonOnSubmit="Registrar tipo de servicio"
              handleSendData={handleAddListaVerificacion}
              initialValues={generateInitialValues(listaVerificacionFields)} // Valores iniciales vacíos
            />
          )}

          {currentForm === "view" && (
            <DynamicForm
              formFields={listaVerificacionFields}
              formTitle="Vista de tipo de servicio"
              initialValues={selectedlistasVerificacion}
              isDisabled={true} // Deshabilita todos los campos
              handleSendData={handleAddListaVerificacion }

            />
          )}

          {currentForm === "edit" && (
            <DynamicForm
            formFields={listaVerificacionFields}
            formTitle="Editando Tipo de Servicio"
            labelButtonOnSubmit="Guardar Cambios"
            initialValues={selectedlistasVerificacion}
            handleSendData={handleUpdateListaVerificacion}
          />
          
          )}
        </Box>
      </DialogComponent>
    </Box>
  );
};

export default GestionarListasVerificacion;
