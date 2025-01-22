import React, { useState, useEffect } from "react";
import { Box, Button, Paper, Alert, Snackbar } from "@mui/material";
import CustomGrid from "../components/CustomGrid";
import SearchBar from "../components/SearchBar";
import FilterAutocomplete from "../components/FilterAutocomplete";

import licenseService from '../services/licenseService';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';

import DialogComponent from "../components/DialogComponent"; // Asegúrate de que la ruta sea correcta
import DynamicForm from '../components/CustomForm'; 

const VerLicencias = () => {
  const [licencias, setLicencias] = useState([]);
  const [filteredLicencias, setFilteredLicencias] = useState([]);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [currentForm, setCurrentForm] = useState(null);
  const [selectedLicencia, setSelectedLicencia] = useState(null);

  const licenciaFormFields = [
    {
      sectionTitle: "Información General",
      divider: true,
      fields: [
        {
          name: "Id_Farmacia",
          label: "Farmacia",
          type: "autocomplete",
          apiOptions: "/farmacias", // Ruta del API para obtener las farmacias
          filterField: "Nombre",
          IdFieldName: "Id_Farmacia",
          "IsThisFieldDisabled": currentForm === "edit"? true : false,
          required: true,
          xs: 12,
          sm: 5,
          md: 5,
        },
        {
          name: "Numero_Licencia",
          label: "Número de Licencia",
          type: "text",
          required: true,
          "IsThisFieldDisabled": true,
          xs: 12,
          sm: 6,
          md: 5,
        },
        // {
        //   name: "Estado_Licencia",
        //   label: "Estado de la Licencia",
        //   type: "text",
        //   "IsThisFieldDisabled": true,
        //   value: "Activa", // Valor inicial como ejemplo
        //   xs: 12,
        //   sm: 6,
        //   md: 4,
        // },
      ],
    },
    {
      sectionTitle: "Fechas de Validez",
      divider: true,
      fields: [
        {
          name: "Fecha_Emision",
          label: "Fecha de Emisión",
          type: "date",
          "IsThisFieldDisabled": true,
          required: true,
          xs: 12,
          sm: 6,
          md: 5,
        },
        {
          name: "Fecha_Vencimiento",
          label: "Fecha de Vencimiento",
          type: "date",
          required: true,
          xs: 12,
          sm: 6,
          md: 5,
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
    const fetchLicenses = async () => {
      try {
        const licenses = await licenseService.getAllLicenses();
        console.log('Licencias:', licenses);
        
        setLicencias(licenses);
        setFilteredLicencias(licenses);
      } catch (error) {
        console.error(error.message);
      }
    };
    
    fetchLicenses();
  }, []);

  //Funciones para abrir/cerrar cuadro de dialogo
  const handleDialogOpen = () => {
    setCurrentForm("add"); // Establece que se abrirá el formulario de "Añadir Licencia"
    setDialogOpen(true);
  };

  const handleDialogClose = () => setDialogOpen(false);

  //Funcion para añadir licencia
  const handleAddLicense = async (licenseData) => {
    try {
      // Verificar si la farmacia tiene una licencia que no está en estado "Activa"
      const existingLicense = licencias.find(
        (licencia) =>
          licencia.Id_Farmacia === licenseData.Id_Farmacia &&
          licencia.Estado_Licencia === "Activa"
      );
  
      if (existingLicense) {
        // Mostrar un mensaje de error si ya tiene una licencia activa
        setSnackbar({
          open: true,
          message: `La farmacia seleccionada ya posee una licencia activa (${existingLicense.Numero_Licencia}).`,
          severity: "error",
        });
        return; // Detener el proceso de creación
      }
  
      // Verificar si la fecha de vencimiento es mayor a la actual
      const currentDate = new Date();
      const expirationDate = new Date(licenseData.Fecha_Vencimiento);
  
      if (expirationDate <= currentDate) {
        // Mostrar un mensaje de error si la fecha de vencimiento no es válida
        setSnackbar({
          open: true,
          message: `La fecha de vencimiento debe ser mayor a la fecha actual.`,
          severity: "error",
        });
        return; // Detener el proceso de creación
      }
  
      // Llama al método del servicio para guardar los datos
      const result = await licenseService.createLicense(licenseData);
  
      // Vuelve a cargar las licencias desde el backend
      const updatedLicenses = await licenseService.getAllLicenses();
      setLicencias(updatedLicenses);
      setFilteredLicencias(updatedLicenses);
      handleDialogClose();
  
      // Mostrar mensaje de éxito
      setSnackbar({
        open: true,
        message: `La licencia ${licenseData.Numero_Licencia} se ha creado con éxito.`,
        severity: "success",
      });
    } catch (error) {
      // Manejo de errores
      console.error("Error al añadir la licencia:", error.message);
      setSnackbar({
        open: true,
        message: `Error al crear la licencia ${licenseData.Numero_Licencia}.`,
        severity: "error",
      });
    }
  };
  

  //Funciones para las acciones del customGrid
  const handleView = (id) => {
     // Busca la licencia en el estado `licencias` usando el ID
     const licencia = licencias.find((f) => f.Id_Licencia === id);
    if (licencia) {
      setSelectedLicencia(licencia); // Guarda la licencia seleccionada
      setCurrentForm("view"); // Cambia al formulario de edición
      setDialogOpen(true); // Abre el diálogo
    } else {
      console.error(`No se encontró ninguna licencia con el ID: ${id}`);
    }
  };

  const handleEdit = (id) => {
     // Busca la licencia en el estado `licencias` usando el ID
     const licencia = licencias.find((f) => f.Id_Licencia === id);
     if (licencia) {
       setSelectedLicencia(licencia); // Guarda la licencia seleccionada
       setCurrentForm("edit"); // Cambia al formulario de edición
       setDialogOpen(true); // Abre el diálogo
     } else {
       console.error(`No se encontró ninguna licencia con el ID: ${id}`);
     }
  };

  const getEmptyInitialValues = () => {
    const today = new Date();
    
    // Fecha de emisión (hoy)
    const formattedDateEmision = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  
    // Fecha de vencimiento (un año después)
    const nextYear = new Date(today);
    nextYear.setFullYear(today.getFullYear() + 1); // Sumar un año
    const formattedDateVencimiento = `${nextYear.getFullYear()}-${String(nextYear.getMonth() + 1).padStart(2, '0')}-${String(nextYear.getDate()).padStart(2, '0')}`;
  
    return {
      Id_Farmacia: 1, // Relación con la farmacia
      Numero_Licencia: generateNumeroLicencia(), // Número de licencia generado automáticamente
      Fecha_Emision: formattedDateEmision, // Fecha actual en formato "YYYY-MM-DD"
      Fecha_Vencimiento: formattedDateVencimiento, // Fecha de vencimiento (un año después)
    };
  };
  
  

  const generateNumeroLicencia = () => {
    const prefix = "LIC"; // Prefijo estático
    const randomId = Math.floor(Math.random() * 100) + 1; // Genera un número aleatorio del 1 al 100 (para identificar algo único como la farmacia)
    const timestamp = Date.now(); // Marca de tiempo única en milisegundos
    return `${prefix}-${randomId}-${timestamp}`; // Formato: LIC-1-1737405875054
  };

  const validFields = [
    "Id_Licencia",
    "Id_Farmacia",
    "Numero_Licencia",
    "Fecha_Emision",
    "Fecha_Vencimiento",
    "Id_Tipo_Farmacia",
    "Estado_Licencia",
  ];

  

  const filterValidFields = (data) => {
    return Object.keys(data).reduce((filteredData, key) => {
      if (validFields.includes(key)) {
        filteredData[key] = data[key]; // Incluye solo las claves válidas
      }
      return filteredData;
    }, {});
  };
  
  const handleUpdateLicense = async (updatedPharmacyData) => {
  
    const filteredData = filterValidFields(updatedPharmacyData);
  // Verificar si la fecha de vencimiento es mayor a la actual
  const currentDate = new Date();
  const expirationDate = new Date(filteredData.Fecha_Vencimiento);
  console.log(`Fecha de vencimiento: ${filteredData.Fecha_Vencimiento}`);

  if (expirationDate <= currentDate) {
    // Mostrar un mensaje de error si la fecha de vencimiento no es válida
    setSnackbar({
      open: true,
      message: `La fecha de vencimiento debe ser mayor a la fecha actual.`,
      severity: "error",
    });
    return; // Detener el proceso de creación
  }

    try {
      // Envía los datos al backend
      await licenseService.updateLicense(
        filteredData.Id_Licencia,
        filteredData
      );
  
      // Vuelve a cargar las licencias desde el backend
      const updatedLicenses = await licenseService.getAllLicenses();
      setLicencias(updatedLicenses);
      setFilteredLicencias(updatedLicenses);
      handleDialogClose();

  
      setSnackbar({
        open: true,
        message: `La licencia ${filteredData.Numero_Licencia} se ha actualizado con éxito.`,
        severity: "success",
      });
  
    } catch (error) {
      console.error("Error al actualizar la licencia:", error.message);
  
      setSnackbar({
        open: true,
        message: `Error al actualizar la licencia ${filteredData.Nombre}.`,
        severity: "error",
      });
  
    }
  };

  const toggleState = async (id) => {
    // Busca la licencia en el estado `licencias` usando el ID
    const licencia = licencias.find((f) => f.Id_Licencia === id);
    if (!licencia) return;
  
    const currentDate = new Date();
    const expirationDate = new Date(licencia.Fecha_Vencimiento);
    let newState = "";
  
    switch (licencia.Estado_Licencia) {
      case "Activa":
        newState = "Suspendida";
        break;
  
      case "Suspendida":
        if (expirationDate > currentDate) {
          newState = "Activa";
        } else {
          setSnackbar({
            open: true,
            message: `La licencia con ID: ${id} está vencida y no se puede activar.`,
            severity: "error",
          });
          return; // No continuar si la licencia está vencida
        }
        break;
  
      case "Expirada":
        setSnackbar({
          open: true,
          message: `La licencia con ID: ${id} está expirada. Por favor, edite la licencia y actualice la fecha de vencimiento.`,
          severity: "error",
        });
        return; // No continuar si la licencia está expirada
  
      default:
        return; // No hacer nada si el estado no es válido
    }
  
    try {
      // Llama al servicio para actualizar el estado de la licencia
      await licenseService.updateLicense(id, { Estado_Licencia: newState });
  
      // Actualiza el estado localmente
      // Vuelve a cargar las licencias desde el backend
      const updatedLicenses = await licenseService.getAllLicenses();
      setLicencias(updatedLicenses);
      setFilteredLicencias(updatedLicenses);
      handleDialogClose();
  
      // Muestra un mensaje de éxito
      setSnackbar({
        open: true,
        message: `La licencia con ID: ${id} ha cambiado su estado a "${newState}".`,
        severity: "success",
      });
    } catch (error) {
      console.error("Error al cambiar el estado de la licencia:", error.message);
      setSnackbar({
        open: true,
        message: `Error al cambiar el estado de la licencia con ID: ${id}.`,
        severity: "error",
      });
    }
  };

  // Función para manejar el filtro de búsqueda
  const handleFilterChange = (filteredResults) => {
    setFilteredLicencias(filteredResults);
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
          data={licencias}
          onFilterChange={handleFilterChange}
          label="Buscar por farmacia o por numero de licencia"
          filterKeys={["Nombre_Farmacia", "Numero_Licencia"]} 
        />

        {/* Botón para añadir un nuevo tipo de servicio */}
        <Box>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<CreateNewFolderIcon />}
            onClick={handleDialogOpen}
          >
            Licencia
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
          data={licencias}
          filterKey="Estado_Licencia"
          onFilterChange={handleFilterChange}
        />
O
        {/* FilterAutocomplete para filtrar por Farmacia */}
        <FilterAutocomplete
          label="Farmacia"
          data={licencias}
          filterKey="Nombre_Farmacia"
          onFilterChange={handleFilterChange}
        />

      </Paper>

      {/* Tabla de licencias */}
      <CustomGrid
        data={filteredLicencias}
        columns={[
          { key: "Id_Licencia", label: "ID" },
          { key: "Numero_Licencia", label: "Número de Licencia" },
          { key: "Fecha_Emision", label: "Fecha de Emisión" },
          { key: "Fecha_Vencimiento", label: "Fecha de Vencimiento" },
          { key: "Estado_Licencia", label: "Estado", isStatusField: true, 
            StateColors: {
              "Activa": "success",
              "Suspendida": "error",
              "Expirada": "warning",
            } },
          { key: "Nombre_Farmacia", label: "Nombre Farmacia" },

        ]}
        actions={{
          onEdit: handleEdit,
          onView: handleView,
          actionButton1: {
            labels: ["Suspender", "Reactivar", "Renovar"],
            estados: ["Activa", "Suspendida", "Expirada"],
            colors: ["error", "success", "warning"],
            onClick: toggleState,
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
              formFields={licenciaFormFields}
              formTitle="Registrando Nueva Licencia"
              labelButtonOnSubmit="Registrar Licencia"
              handleSendData={handleAddLicense}
              initialValues={getEmptyInitialValues()} // Estructura vacía del modelo

            />
          )}

          {currentForm === "view" && (
            <DynamicForm
              formFields={licenciaFormFields}
              formTitle="Vista de Licencia"
              initialValues={selectedLicencia}
              isDisabled={true} // Deshabilita todos los campos
              handleSendData={handleAddLicense}

            />
          )}

          {currentForm === "edit" && (
            <DynamicForm
            formFields={licenciaFormFields}
            formTitle="Editando Licencia"
            labelButtonOnSubmit="Guardar Cambios"
            initialValues={selectedLicencia}
            handleSendData={handleUpdateLicense}
          />
          
          )}
        </Box>
      </DialogComponent>
    </Box>
  );
};

export default VerLicencias;
