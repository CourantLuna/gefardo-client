import React, { useState, useEffect } from "react";
import { Box, Paper, Button, Snackbar, Alert } from "@mui/material";
import CustomGrid from "../components/CustomGrid";
import SearchBar from "../components/SearchBar";
import FilterAutocomplete from "../components/FilterAutocomplete";
import EventIcon from '@mui/icons-material/Event';

import inspectionsService from "../services/inspectionsService";
import generalService from "../services/generalService";
import AuthService from "../services/authService";

import DialogComponent from "../components/DialogComponent"; // Asegúrate de que la ruta sea correcta
import DynamicForm from '../components/CustomForm'; 

const VerInspecciones = () => {
  const [inspecciones, setInspecciones] = useState([]);
  const [filteredInspecciones, setFilteredInspecciones] = useState([]);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [currentForm, setCurrentForm] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);

  const [selectedInspeccion, setSelectedInspeccion] = useState(null);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => setDialogOpen(false);

  const inspeccionesFormFields = [
    {
      sectionTitle: "Información General de la Inspección",
      divider: true,
      fields: [
        
        {
          IsThisFieldDisabled: true,
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
          IsThisFieldDisabled: true,
          name: "Inspector",
          label: "Inspector",
          type: "autocomplete", // Campo relacionado
          required: true,
          md: 6,
          apiOptions: "/usuarioRoles/4", // Ruta para obtener inspectores
          filterField: "Nombre_Completo", // Campo que se muestra como opción
          IdFieldName: "Id_Usuario", // ID que se enviará
        },
        // {
        //   IsThisFieldDisabled: true,
        //   name: "Fecha_Programada_Inspeccion",
        //   label: "Fecha Programada de Inspección",
        //   type: "datetime-local",
        //   required: false,
        //   md: 6,
        // },
        {
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
          name: "Resultado",
          label: "Resultado",
          type: "textarea",
          required: false,
          md: 12,
        },
        {
          name: "Firma_Responsable",
          label: "Firma del Responsable",
          type: "file",
          required: false,
          md: 6,
        },
        {
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
  
    const transformInspectionData = (inspection) => {
      const formatDateForInput = (isoDate) => {
        if (!isoDate) return ''; // Devuelve vacío si no hay fecha
        return new Date(isoDate).toISOString().split('T')[0]; // Convierte a YYYY-MM-DD
      };
    
      return {
        ...inspection,
        Fecha_Completada_Inspeccion: formatDateForInput(inspection.Fecha_Completada_Inspeccion),
        Fecha_Programada_Inspeccion: formatDateForInput(inspection.Fecha_Programada_Inspeccion),
      };
    };

  useEffect(() => {
    const fetchInspections = async () => {
      try {
        const userId = AuthService.getUserId(); // Obtiene el ID del usuario
        console.log('ID del inspector:', userId);
        setCurrentUserId(userId);

        if (!userId) {
          console.error('No se pudo obtener el ID del usuario del token.');
          return;
        }
        const inspections = await generalService.filterByField('Inspeccion', 'Inspector', userId);
        console.log('Inspecciones asignadas al inspector:', inspections);
const transformedInspection = transformInspectionData(inspections);

console.log("Transformed Inspection:",transformedInspection);
        setInspecciones(inspections);
        setFilteredInspecciones(inspections);
      } catch (error) {
        console.error('Error al obtener inspecciones para el inspector:', error.message);
      }
    };

    fetchInspections();
  }, []);

  

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
       const updatedInspections = await generalService.filterByField('Inspeccion', 'Inspector', currentUserId)
       setInspecciones(updatedInspections);
       setFilteredInspecciones(updatedInspections);
       handleDialogClose();
 

  
      setSnackbar({
        open: true,
        message: `La inspeccion para la farmacia ${filteredData.Id_Farmacia} se ha actualizado con éxito.`,
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
        filterKey="Id_Farmacia"
        onFilterChange={handleFilterChange}
      />
     
    </Paper>

      {/* Tabla de inspecciones */}
      <CustomGrid
        data={filteredInspecciones}
        columns={[
          { key: "Id_Inspeccion", label: "ID" },
          { key: "Id_Farmacia", label: "Farmacia" },
          { key: "Fecha_Programada_Inspeccion", label: "Fecha Programada" },
          { key: "Fecha_Completada_Inspeccion", label: "Fecha Completada" },
          { key: "Estado", label: "Estado",isBoolean: true },
        ]}  
        actions={{
          onEdit: handleEdit,
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
         

          {currentForm === "view" && (
            <DynamicForm
              formFields={inspeccionesFormFields}
              formTitle="Vista de Inspección"
              initialValues={selectedInspeccion}
              isDisabled={true} // Deshabilita todos los campos
              handleSendData={handleUpdateInspection}

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
