import React, { useState, useEffect } from "react";
import { Box, Button,Paper,Snackbar, Alert } from "@mui/material";
import CustomGrid from "../components/CustomGrid";
import SearchBar from "../components/SearchBar";
import FilterAutocomplete from "../components/FilterAutocomplete";

import sanctionService from "../services/sanctionService";
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';


import DialogComponent from "../components/DialogComponent"; // Asegúrate de que la ruta sea correcta
import DynamicForm from '../components/CustomForm'; 

const VerSanciones = () => {
  const [sanciones, setSanciones] = useState([]);
  const [filteredSanciones, setFilteredSanciones] = useState([]);
   const [isDialogOpen, setDialogOpen] = useState(false);
    const [currentForm, setCurrentForm] = useState(null);
  const [selectedSancion, setSelectedSancion] = useState(null);

  const sancionFormFields = [
    {
      sectionTitle: "Información General",
      divider: true,
      fields: [
        {
          name: "Id_Farmacia",
          label: "Farmacia Asociada",
          type: "autocomplete", // Usa un campo de autocompletar
          apiOptions: "/farmacias", // Ruta del API para obtener farmacias
          filterField: "Nombre", // Campo que se mostrará en el autocompletar
          IdFieldName: "Id_Farmacia", // Campo que será el valor asociado
          "IsThisFieldDisabled": currentForm === "edit"? true : false,
          required: true,
          xs: 12,
          sm: 6,
          md: 4,
        },
        {
          name: "Fecha_Sancion",
          label: "Fecha de la Sanción",
          "IsThisFieldDisabled": currentForm === "edit"? true : false,
          type: "date",
          required: true,
          xs: 12,
          sm: 6,
          md: 4,
        },
        // {
        //   name: "Estado_Sancion",
        //   label: "Estado de la Sanción",
        //   type: "select", // Usa un campo select para elegir entre opciones fijas
        //   required: true,
        //   xs: 12,
        //   sm: 6,
        //   md: 4,
        // },
      ],
    },
    {
      sectionTitle: "Detalles y Multa",
      divider: true,
      fields: [
        {
          name: "Detalle",
          label: "Detalle de la Sanción",
          type: "textarea",
          rows: 4, // Define el número de filas del área de texto
          required: false,
          xs: 12,
          sm: 12,
          md: 12,
        },
        {
          name: "Multa",
          label: "Monto de la Multa (RD$)",
          type: "number",
          required: false,
          xs: 12,
          sm: 6,
          md: 4,
        },
      ],
    },
  ];

  const getEmptyInitialValues = () => {
    const today = new Date();
    const formattedDateEmision = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    
    return {
    Id_Sancion: null, // ID generado automáticamente por la base de datos
    Id_Farmacia: null, // ID de la farmacia, comienza vacío
    Fecha_Sancion: formattedDateEmision, // Fecha actual por defecto (formato ISO para campos de fecha)
    Estado_Sancion: "Pendiente", // Estado por defecto: "Pendiente"
    Detalle: "", // Detalle vacío inicialmente
    Multa: null, // Multa comienza como nula
  }};

  const validFields = [
    "Id_Sancion",
    "Id_Farmacia",
    "Fecha_Sancion",
    "Estado_Sancion",
    "Detalle",
    "Multa",
  ];
  const formatDateToShort = (date) => {
    const parsedDate = new Date(date);
    return parsedDate.toISOString().split("T")[0]; // Devuelve formato "YYYY-MM-DD"
  };

  const filterValidFields = (data) => {
    return Object.keys(data).reduce((filteredData, key) => {
      if (validFields.includes(key)) {
        filteredData[key] = data[key]; // Incluye solo las claves válidas
      }
      return filteredData;
    }, {});
  };

  useEffect(() => {
    const fetchSanctions = async () => {
      try {
        const sanctions = await sanctionService.getAllSanctions();
        console.log("Sanciones:", sanctions);

        setSanciones(sanctions);
        setFilteredSanciones(sanctions);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchSanctions();
  }, []);

  const handleUpdateSanction = async (updatedSanctionData) => {
    // Convierte la fecha al formato corto
    updatedSanctionData.Fecha_Sancion = formatDateToShort(updatedSanctionData.Fecha_Sancion);
    console.log("Datos de la sanción actualizados:", updatedSanctionData);
    // Filtra los campos válidos
    const filteredData = filterValidFields(updatedSanctionData);
  
    try {
      // Envía los datos al backend
      await sanctionService.updateSanction(filteredData.Id_Sancion, filteredData);
  
      // Vuelve a cargar las sanciones desde el backend
      const updatedSanctions = await sanctionService.getAllSanctions();
      setSanciones(updatedSanctions);
      setFilteredSanciones(updatedSanctions);
      handleDialogClose();
  
      // Muestra un mensaje de éxito
      setSnackbar({
        open: true,
        message: `La sanción con ID ${filteredData.Id_Sancion} se ha actualizado con éxito.`,
        severity: "success",
      });
    } catch (error) {
      console.error("Error al actualizar la sanción:", error.message);
  
      // Muestra un mensaje de error
      setSnackbar({
        open: true,
        message: `Error al actualizar la sanción con ID ${filteredData.Id_Sancion}.`,
        severity: "error",
      });
    }
  };
  

  //Funciones para abrir/cerrar cuadro de dialogo
  const handleDialogOpen = () => {
    setCurrentForm("add"); // Establece que se abrirá el formulario de "Añadir sancion"
    setDialogOpen(true);
  };

  const handleDialogClose = () => setDialogOpen(false);

  // Función para manejar el filtro de búsqueda
  const handleFilterChange = (filteredResults) => {
    setFilteredSanciones(filteredResults);
  };

  const handleAddSanction = async (sanctionData) => {

    try {
      // Llama al método del servicio para guardar los datos
      const result = await sanctionService.createSanction(sanctionData);
  
      // Vuelve a cargar las sanciones desde el backend
      const updatedSanctions = await sanctionService.getAllSanctions();
      setSanciones(updatedSanctions);
      setFilteredSanciones(updatedSanctions);
      handleDialogClose();
  
      // Mostrar mensaje de éxito
      setSnackbar({
        open: true,
        message: `La sanción se ha creado con éxito.`,
        severity: "success",
      });
    } catch (error) {
      // Manejo de errores
      console.error("Error al añadir la sanción:", error.message);
      setSnackbar({
        open: true,
        message: `Error al crear la sanción.`,
        severity: "error",
      });
    }
  };
  

  // Función para manejar las acciones
  const handleEdit = (id) => {

    // Busca la sanción en el estado `sanciones` usando el ID
    const sancion = sanciones.find((f) => f.Id_Sancion === id);
    if (sancion) {
      // Convierte la fecha al formato compatible con el campo de tipo date
      const formattedSanction = {
        ...sancion,
        Fecha_Sancion: new Date(sancion.Fecha_Sancion).toISOString().split("T")[0],
      };
  
      setSelectedSancion(formattedSanction); // Guarda la sanción seleccionada
      setCurrentForm("edit"); // Cambia al formulario de edición
      setDialogOpen(true); // Abre el diálogo
    } else {
      console.error(`No se encontró ninguna sanción con el ID: ${id}`);
    }
  };

  const toggleEstado = async (id) => {
    // Busca la sanción en el estado `sanciones` usando el ID
    const sancion = sanciones.find((f) => f.Id_Sancion === id);
  
    if (!sancion) {
      alert("Sanción no encontrada");
      return;
    }
  
    let newState = "";
  
    // Determinar el nuevo estado según el estado actual
    switch (sancion.Estado_Sancion) {
      case "Pendiente":
        newState = "Resuelta";
        break;
  
      case "Resuelta":
        newState = "Pendiente";
        break;
  
      default:
        alert("Estado desconocido de la sanción");
        return; // Salir si el estado es desconocido
    }
  
    try {
      // Llama al servicio para actualizar el estado de la sanción
      await sanctionService.updateSanction(id, { Estado_Sancion: newState });
  
      // Actualiza el estado localmente
      setSanciones((prevSanciones) =>
        prevSanciones.map((s) =>
          s.Id_Sancion === id ? { ...s, Estado_Sancion: newState } : s
        )
      );
  
      setFilteredSanciones((prevFiltered) =>
        prevFiltered.map((s) =>
          s.Id_Sancion === id ? { ...s, Estado_Sancion: newState } : s
        )
      );
  
      // Muestra un mensaje de éxito
      setSnackbar({
        open: true,
        message: `El estado de la sanción con ID: ${id} ha cambiado a "${newState}".`,
        severity: "success",
      });
    } catch (error) {
      console.error("Error al cambiar el estado de la sanción:", error.message);
  
      // Muestra un mensaje de error
      setSnackbar({
        open: true,
        message: `Error al cambiar el estado de la sanción con ID: ${id}.`,
        severity: "error",
      });
    }
  };

  // Estado para manejar el Snackbar
const [snackbar, setSnackbar] = useState({
  open: false,
  message: "",
  severity: "info",
});

// Cerrar el Snackbar
const handleSnackbarClose = () => {
  setSnackbar({ ...snackbar, open: false });
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
          data={sanciones}
          onFilterChange={handleFilterChange}
          label="Buscar por farmacia o por detalle de la sanción"
          filterKeys={["Detalle", "Nombre_Farmacia"]}
        />

        {/* Botón para añadir un nuevo tipo de servicio */}
        <Box>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<EnhancedEncryptionIcon />}
            onClick={handleDialogOpen}
          >
            Sanción
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
          data={sanciones}
          filterKey="Estado_Sancion"
          onFilterChange={handleFilterChange}
        />
        O
         {/* FilterAutocomplete para filtrar por FARMACIA */}
         <FilterAutocomplete
          label="Farmacia"
          data={sanciones}
          filterKey="Nombre_Farmacia"
          onFilterChange={handleFilterChange}
        />

      </Paper>

      {/* Tabla de sanciones */}
      <CustomGrid
        data={filteredSanciones}
        columns={[
          { key: "Id_Sancion", label: "ID" },
          { key: "Nombre_Farmacia", label: "Farmacia" },
          { key: "Detalle", label: "Detalle" },
          { key: "Fecha_Sancion", label: "Fecha" },

          { key: "Estado_Sancion", label: "Estado", isStatusField: true, 
            StateColors: {
              "Pendiente": "error",
              "Resuelta": "success",
            }
           },
          { key: "Multa", label: "Multa"},

        ]}
        actions={{
          onEdit: handleEdit,
          actionButton1: {
            labels: ["Confirmar Pago", "Revocar Pago"],
            estados: ["Pendiente", "Resuelta"],
            colors: ["success", "error"],
            onClick: toggleEstado,
          },
         
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
              formFields={sancionFormFields}
              formTitle="Registrando Nueva Sancion"
              labelButtonOnSubmit="Registrar Sanción"
              handleSendData={handleAddSanction}
              initialValues={getEmptyInitialValues()} // Estructura vacía del modelo

            />
          )}

          {currentForm === "edit" && (
            <DynamicForm
            formFields={sancionFormFields}
            formTitle="Editando sanción"
            labelButtonOnSubmit="Guardar Cambios"
            initialValues={selectedSancion}
            handleSendData={handleUpdateSanction}
          />
          
          )}
        </Box>
      </DialogComponent>
    </Box>
  );
};

export default VerSanciones;
