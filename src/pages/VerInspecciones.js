import React, { useState, useEffect } from "react";
import { Box, Paper, Button, Snackbar, Alert } from "@mui/material";
import CustomGrid from "../components/CustomGrid";
import SearchBar from "../components/SearchBar";
import FilterAutocomplete from "../components/FilterAutocomplete";
import EventIcon from '@mui/icons-material/Event';

import inspectionsService from "../services/inspectionsService";


import DialogComponent from "../components/DialogComponent"; // Asegúrate de que la ruta sea correcta
import DynamicForm from '../components/CustomForm'; 

const VerInspecciones = () => {
  const [inspecciones, setInspecciones] = useState([]);
  const [filteredInspecciones, setFilteredInspecciones] = useState([]);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [currentForm, setCurrentForm] = useState(null);
  const [selectedInspeccion, setSelectedInspeccion] = useState(null);

  const handleDialogOpen = () => {
    setCurrentForm("add"); // Establece que se abrirá el formulario de "Añadir Farmacia"
    setDialogOpen(true);
  };

  const handleDialogClose = () => setDialogOpen(false);

  const inspeccionesFormFields = [
    {
      sectionTitle: "Información General de la Inspección",
      divider: true,
      fields: [
        
        {
          name: "Id_Farmacia",
          label: "Farmacia",
          type: "autocomplete", // Campo relacionado
          required: true,
          md: 6,
          apiOptions: "/farmacias", // Ruta para obtener farmacias
          filterField: "Nombre", // Campo que se muestra como opción
          IdFieldName: "Id_Farmacia", // ID que se enviará
        },
        {
          name: "Inspector",
          label: "Inspector",
          type: "autocomplete", // Campo relacionado
          required: true,
          md: 6,
          apiOptions: "/usuarioRoles/4", // Ruta para obtener inspectores
          filterField: "Nombre_Completo", // Campo que se muestra como opción
          IdFieldName: "Id_Usuario", // ID que se enviará
        },
        {
          name: "Fecha_Programada_Inspeccion",
          label: "Fecha Programada de Inspección",
          type: "datetime-local",
          required: false,
          md: 6,
        },
        {
          IsThisFieldDisabled: true,
          name: "Fecha_Completada_Inspeccion",
          label: "Fecha Completada de Inspección",
          type: "datetime-local",
          required: false,
          md: 6,
        },
      ],
    },
    {
      sectionTitle: "Detalles de la Inspección",
      divider: true,
      fields: [
        {
          name: "Tipo_Actividad",
          label: "Tipo de Actividad",
          type: "textarea",
          required: false,
          md: 12,
        },
        {
          IsThisFieldDisabled: true,
          name: "Resultado",
          label: "Resultado",
          type: "textarea",
          required: false,
          md: 12,
        },
        {
          IsThisFieldDisabled: true,
          name: "Firma_Responsable",
          label: "Firma del Responsable",
          type: "file",
          required: false,
          md: 6,
        },
        {
          IsThisFieldDisabled: true,
          name: "Lista_Verificacion",
          label: "Lista de Verificación",
          type: "autocomplete", // Campo relacionado
          required: false,
          md: 6,
          apiOptions: "/listas-verificacion", // Ruta para obtener listas
          filterField: "Nombre", // Campo que se muestra como opción
          IdFieldName: "Id_Lista", // ID que se enviará
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

  const handleAddInspection = async (inspectionData) => {
    try {
      // Llama al método del servicio para guardar los datos
      await inspectionsService.createInspection(inspectionData);
      
      // Vuelve a cargar las farmacias desde el backend
      const updatedInspections = await inspectionsService.getAllInspections();
      setInspecciones(updatedInspections);
      setFilteredInspecciones(updatedInspections);
      handleDialogClose();

      handleDialogClose();

      // Mostrar mensaje de éxito
      setSnackbar({
        open: true,
        message: `La inspeccion para la farmacia ${inspectionData.Nombre_Farmacia} se ha creado con éxito.`,
        severity: "success",
      });
    } catch (error) {
      // Manejo de errores
      console.error("Error al añadir inspeccion para la farmacia:", error.message);
      setSnackbar({
        open: true,
        message: `Error al crear inspeccion para la farmacia ${inspectionData.Nombre_Farmacia}.`,
        severity: "error",
      });
    }
  };


  const validFields = [
    "Id_Inspeccion",
    "Id_Farmacia",
    "Inspector",
    "Fecha_Programada_Inspeccion",
    "Fecha_Completada_Inspeccion",
    "Tipo_Actividad",
    "Resultado",
    "Firma_Responsable",
    "Lista_Verificacion",
  ];

  const filterValidFields = (data) => {
    return Object.keys(data).reduce((filteredData, key) => {
      if (validFields.includes(key)) {
        filteredData[key] = data[key]; // Incluye solo las claves válidas
      }
      return filteredData;
    }, {});
  };

  const handleUpdateInspection = async (updatedInspectionData) => {
  
    const filteredData = filterValidFields(updatedInspectionData);
  
    try {
      // Envía los datos al backend
      await inspectionsService.updateInspection(
        filteredData.Id_Inspeccion,
        filteredData
      );
  
       // Vuelve a cargar las farmacias desde el backend
       const updatedInspections = await inspectionsService.getAllInspections();
       setInspecciones(updatedInspections);
       setFilteredInspecciones(updatedInspections);
       handleDialogClose();
 

  
      setSnackbar({
        open: true,
        message: `La inspeccion para la farmacia ${filteredData.Nombre_Farmacia} se ha actualizado con éxito.`,
        severity: "success",
      });
  
    } catch (error) {
      console.error("Error al actualizar la inspeccion:", error.message);
  
      setSnackbar({
        open: true,
        message: `Error al actualizar la inspeccion de la farmacia ${filteredData.Nombre_Farmacia}.`,
        severity: "error",
      });
  
    }
  };
  // Función para manejar el filtro de búsqueda
  const handleFilterChange = (filteredResults) => {
    setFilteredInspecciones(filteredResults);
  };

  // Función para manejar las acciones
  const handleEdit = (id) => {
    const inspeccion = inspecciones.find((f) => f.Id_Inspeccion === id);

    if (inspeccion) {
      setSelectedInspeccion(inspeccion); 
      setCurrentForm("edit");
      setDialogOpen(true);
    } else {
      console.error(`No se encontró ninguna farmacia con el ID: ${id}`);
    }
  };

  const handleView = (id) => {
    const inspeccion = inspecciones.find((f) => f.Id_Inspeccion === id);
    if (inspeccion) {
      setSelectedInspeccion(inspeccion); 
      setCurrentForm("view"); 
      setDialogOpen(true); 
    } else {
      console.error(`No se encontró ninguna farmacia con el ID: ${id}`);
    }
  };

  const toggleEstadoInspeccion = async (id) => {
    const inspeccion = inspecciones.find((i) => i.Id_Inspeccion === id);
    const nuevoEstado = !inspeccion.Estado;
  
    try {
      // Llama al servicio correspondiente para actualizar el estado de la inspección
      await inspectionsService.toggleEstado(id, nuevoEstado);
  
      // Actualiza el estado local de inspecciones
      setInspecciones((prev) => {
        const updatedInspecciones = prev.map((inspeccion) =>
          inspeccion.Id_Inspeccion === id ? { ...inspeccion, Estado: nuevoEstado } : inspeccion
        );
        setFilteredInspecciones(updatedInspecciones); // También actualiza la lista filtrada
        return updatedInspecciones;
      });
  
      // Muestra un Snackbar con éxito
      setSnackbar({
        open: true,
        message: `El estado de la inspección con ID ${id} se actualizó con éxito.`,
        severity: "success",
      });
    } catch (error) {
      console.error("Error al actualizar el estado de la inspección:", error.message);
      // Muestra un Snackbar con error
      setSnackbar({
        open: true,
        message: `Error al actualizar el estado de la inspección con ID ${id}.`,
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
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          gap: "16px",
        }}
      >
        {/* Barra de búsqueda y boton de añadir*/}
        <SearchBar
          data={inspecciones}
          onFilterChange={handleFilterChange}
          label="Buscar inspección por tipo"
          filterKey="Tipo_Actividad" // Filtra por el campo "Tipo_Actividad"
        />

        


        {/* Botón para añadir un nuevo tipo de servicio */}
        <Box>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<EventIcon />}
            onClick={handleDialogOpen}
          >
            Programar Inspección
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
      {/* FilterAutocomplete para filtrar por farmacia */}
      <FilterAutocomplete
        label="Farmacia"
        data={inspecciones}
        filterKey="Nombre_Farmacia"
        onFilterChange={handleFilterChange}
      />
      O{/* FilterAutocomplete para filtrar por inspector asignado */}
      <FilterAutocomplete
        label="Inspector"
        data={inspecciones}
        filterKey="Nombre_Inspector"
        onFilterChange={handleFilterChange}
      />
     
    </Paper>

      {/* Tabla de inspecciones */}
      <CustomGrid
        data={filteredInspecciones}
        columns={[
          { key: "Id_Inspeccion", label: "ID" },
          
          { key: "Nombre_Farmacia", label: "Farmacia" },
          { key: "Nombre_Inspector", label: "Inspector asignado" },
          
          { key: "Fecha_Programada_Inspeccion", label: "Fecha Programada" },
          { key: "Fecha_Completada_Inspeccion", label: "Fecha Completada" },

          { key: "Estado", label: "Estado",isBoolean: true },
        ]}  
        actions={{
          onEdit: handleEdit,
          onToggle: toggleEstadoInspeccion,
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
              formFields={inspeccionesFormFields}
              formTitle="Programando Inspeccion"
              labelButtonOnSubmit="Programar inspección"
              handleSendData={handleAddInspection}
              initialValues={generateInitialValues(inspeccionesFormFields)} // Valores iniciales vacíos
            />
          )}

          {currentForm === "view" && (
            <DynamicForm
              formFields={inspeccionesFormFields}
              formTitle="Vista de Inspección"
              initialValues={selectedInspeccion}
              isDisabled={true} // Deshabilita todos los campos
              handleSendData={handleAddInspection}

            />
          )}

          {currentForm === "edit" && (
            <DynamicForm
            formFields={inspeccionesFormFields}
            formTitle="Editando Inspección"
            labelButtonOnSubmit="Guardar Cambios"
            initialValues={selectedInspeccion}
            handleSendData={handleUpdateInspection}
          />
          
          )}
        </Box>
      </DialogComponent>
    </Box>
  );
};

export default VerInspecciones;
