import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Snackbar,
  Alert
} from "@mui/material";

import formService from '../services/formService';

import CustomGrid from "../components/CustomGrid";
import SearchBar from "../components/SearchBar";
import FilterAutocomplete from "../components/FilterAutocomplete";
import DialogComponent from "../components/DialogComponent";
import DynamicForm from '../components/CustomForm'; 

import { useNavigate } from "react-router-dom";



const VerFormularios = () => {
  const navigate = useNavigate();

  const [formularios, setFormularios] = useState([]); // Datos de formularios
  const [filteredData, setFilteredData] = useState([]); // Datos filtrados

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState("");



  useEffect(() => {
    const fetchAllForms = async () => {
      try {
        const forms = await formService.getAllForms(); // Llama al servicio para obtener los formularios reales
        setFormularios(forms); // Almacena los datos en el estado
        setFilteredData(forms); // Inicializa los datos filtrados
      } catch (error) {
        console.error('Error al obtener formularios:', error.message);
      }
    };
  
    fetchAllForms();

  }, []);

  // const formFieldsFormularios = [
  //   {
  //     sectionTitle: "Información General",
  //     divider: true,
  //     fields: [
  //       {
  //         name: "Nombre_Formulario",
  //         label: "Nombre del Formulario",
  //         type: "text",
  //         required: true,
  //         xs: 12,
  //         sm: 6,
  //         md: 6,
  //       },
  //       {
  //         name: "Creado_Por",
  //         label: "Creado Por",
  //         apiOptions: "/usuarioRoles/3", // Ruta para obtener los usuarios
  //         filterField: "Nombre_Completo", // Campo a mostrar en el autocompletado
  //         IdFieldName: "Id_Usuario",
  //         "IsThisFieldDisabled": true,
  //         value: userId,
  //         type: "autocomplete",
  //         required: false,
  //         xs: 12,
  //         sm: 6,
  //         md: 6,
  //       },
  //       // {
  //       //   name: "Modificado_Por",
  //       //   label: "Modificado Por",
  //       //   type: "autocomplete",
  //       //   apiOptions: "/usuarioRoles/3", // Ruta para obtener los usuarios
  //       //   filterField: "Nombre_Completo", // Campo a mostrar en el autocompletado
  //       //   IdFieldName: "Id_Usuario",
  //       //   "IsThisFieldDisabled": true,
  //       //   required: false,
  //       //   xs: 12,
  //       //   sm: 6,
  //       //   md: 6,
  //       // },
  //     ],
  //   },
  //   {
  //     sectionTitle: "Campos del Formulario",
  //     divider: true,
  //     fields: [
  //       {
  //         name: "Campos_Formulario",
  //         label: "Definición de Campos",
  //         type: "textarea",
  //         required: true,
  //         rows: 6,
  //         xs: 12,
  //         sm: 12,
  //         md: 12,
  //       },
  //     ],
  //   },
  // ];
  



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

  // Actualiza los datos filtrados
  const handleFilterChange = (filteredResults) => {
    setFilteredData(filteredResults);
  };


  const toggleEstado = async (id) => {
    const formulario = formularios.find((f) => f.Id_Formulario === id);
    const nuevoEstado = !formulario.Estado;
    try {
      // Llama al servicio correspondiente para actualizar el estado de la farmacia
      await formService.toggleEstado(id, nuevoEstado);
  
      // Actualiza el estado local de farmacias
      setFormularios((prev) => {
        const updatedFormularios = prev.map((formulario) =>
          formulario.Id_Formulario === id ? { ...formulario, Estado: nuevoEstado } : formulario
        );
        setFilteredData(updatedFormularios); // También actualiza la lista filtrada
        return updatedFormularios;
      });
  
      // Muestra un Snackbar con éxito
      setSnackbar({
        open: true,
        message: `El estado de la farmacia ${formulario.Nombre_Formulario} se actualizó con éxito.`,
        severity: "success",
      });
    } catch (error) {
      console.error("Error al actualizar el estado de la farmacia:", error.message);
      // Muestra un Snackbar con error
      setSnackbar({
        open: true,
        message: `Error al actualizar el estado de la farmacia ${formulario.Nombre_Formulario}.`,
        severity: "error",
      });
    }
  };

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

  const handleView = (id) => {

    const formulario = formularios.find((f) => f.Id_Formulario === id);
    try {
      const jsonFields = JSON.parse(formulario.Campos_Formulario);
      // Registra correctamente el objeto initialValues
      const initialValues = generateInitialValues(
        jsonFields
      );

      console.log("initialValues:", initialValues);
      // Asegúrate de que jsonFields es un array
      if (Array.isArray(jsonFields)) {
        setDialogContent(
          <Box>
            <DynamicForm
              formFields={jsonFields}
              formTitle={formulario.Nombre_Formulario}
              labelButtonOnSubmit={`Enviar Solicitud para ${formulario.Nombre_Formulario}`}
              initialValues={initialValues}
            />
          </Box>
        );
        setDialogOpen(true);
      } else {
        console.error("Campos_Formulario no es un array válido.");
        alert("Los campos del formulario no tienen el formato esperado.");
      }
    } catch (error) {
      console.error("Error al parsear Campos_Formulario:", error.message);
      alert("Error al cargar los campos del formulario.");
    }
  };


  // const validFields = [
  //   "Id_Formulario",
  //   "Nombre_Formulario",
  //   "Creado_Por",
  //   "Modificado_Por",
  //   "Fecha_Creacion",
  //   "Fecha_Ultima_Modificacion",
  //   "Campos_Formulario",
  // ];

  // const filterValidFields = (data) => {
  //   return Object.keys(data).reduce((filteredData, key) => {
  //     if (validFields.includes(key)) {
  //       filteredData[key] = data[key]; // Incluye solo las claves válidas
  //     }
  //     return filteredData;
  //   }, {});
  // };


  const handleEdit = (id) => {
    const formulario = formularios.find((f) => f.Id_Formulario === id);
    const parsedForm = {
      ...formulario,
      Campos_Formulario: JSON.parse(formulario.Campos_Formulario),
    };

    // Navega a la página de edición con los datos del formulario
    navigate(`/gefardo/editar-formularios/${formulario.Id_Formulario}`, { state: parsedForm })
    
  };

return (
  <Box
    sx={{
      padding: "20px",
      borderRadius: "8px",
      marginLeft: "20px",
    }}
  >
    {/* Barra de búsqueda */}
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px",
        gap: "16px",
      }}
    >
      {/* SearchBar para buscar por nombre */}
      <SearchBar
        data={formularios}
        onFilterChange={handleFilterChange}
        label={"Buscar formulario por nombre"}
        filterKey="Nombre_Formulario"
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
      {/* FilterAutocomplete para filtrar por estado */}
      <FilterAutocomplete
        label="Estado"
        data={formularios}
        filterKey="Estado"
        onFilterChange={handleFilterChange}
      />
      O{/* FilterAutocomplete para filtrar por Creado Por */}
      <FilterAutocomplete
        label="Modificado Por"
        data={formularios}
        filterKey="Nombre_Completo_Modificador"
        onFilterChange={handleFilterChange}
      />
      O{/* FilterAutocomplete para filtrar por Modificado Por */}
      <FilterAutocomplete
        label="Creado_Por"
        data={formularios}
        filterKey="Nombre_Completo_Creador"
        onFilterChange={handleFilterChange}
      />
    </Paper>

    {/* Tabla de resultados */}
    <CustomGrid
      data={filteredData}
      columns={[
        { key: "Id_Formulario", label: "ID" },
        { key: "Nombre_Formulario", label: "Nombre" },
        { key: "Nombre_Completo_Creador", label: "Creado Por" },
        { key: "Nombre_Completo_Modificador", label: "Modificado Por" },
        { key: "Fecha_Creacion", label: "Fecha de Creación" },
        { key: "Fecha_Ultima_Modificacion", label: "Última Modificación" },
        { key: "Estado", label: "Estado", isBoolean: true },
      ]}
      actions={{
        onView: handleView,
        onEdit: handleEdit,
        onToggle: toggleEstado,
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
    <Box
      sx={{
        width: "fit-content", // Tamaño ajustado al contenido
        margin: "0 auto", // Centra automáticamente horizontalmente
      }}
    >
      {/* Dialogo para mostrar formulario */}
      <DialogComponent
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        title="Vista del Formulario"
      >
        <Box
          sx={{
            width: "fit-content", // Tamaño ajustado al contenido
            margin: "0 auto", // Centra automáticamente horizontalmente
          }}
        >
                  {dialogContent}

        </Box>
      </DialogComponent>
    </Box>
  </Box>
);
};

export default VerFormularios;
