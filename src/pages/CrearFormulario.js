import React, { useState, useEffect } from "react";
import { Box, Grid, TextField, Button, Alert, Snackbar  } from "@mui/material";
import Toolbox from "../components/ToolBox";
import Canvas from "../components/Canvas";
import PropertiesPanel from "../components/PropertiesPanel";
import JSONView from "../components/JSONView";


import VisibilityIcon from "@mui/icons-material/Visibility";
import SaveIcon from "@mui/icons-material/Save";

import authService from '../services/authService';
import userService from "../services/userService";
import formService from "../services/formService"; // Importa tu servicio de formulario


import DialogComponent from "../components/DialogComponent"; // Asegúrate de que la ruta sea correcta
import DynamicForm from '../components/CustomForm'; 

const CreateForm = ({ initialFormData = null, isEditMode = false }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [formFields, setFormFields] = useState([
        {
          
            sectionTitle: "Sección Inicial",
            divider: true,
            fields: [],
          
        }
    ]);
  const [isPropertiesPanelOpen, setIsPropertiesPanelOpen] = useState(false); // Controla la visibilidad del panel
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [currentForm, setCurrentForm] = useState([]);
  const [formName, setFormName] = useState(""); // Estado para almacenar el nombre del formulario

// Estado para el Snackbar
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success", // "success", "error", "warning", "info"
  });

  // Función para manejar el cierre del Snackbar
  const handleSnackbarClose = () => setSnackbar({ ...snackbar, open: false });

  useEffect(() => {
    if (isEditMode && initialFormData) {
      setFormFields(initialFormData.Campos_Formulario || [
        {
          sectionTitle: "Sección Inicial",
          divider: true,
          fields: [],
        },
      ]);
      setFormName(initialFormData.Nombre_Formulario || "");
    } else if (!isEditMode) {
      setFormFields([
        {
          sectionTitle: "Sección Inicial",
          divider: true,
          fields: [],
        },
      ]);
      setFormName("");
    }
  }, [isEditMode, initialFormData]);
  
  
  

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const id = authService.getUserId();
        //  setUserId(id);
        const result = await userService.getUsuarioById(id); //
        setCurrentUser(result); //
        console.log("Información del usuario:", result);
      } catch (error) {
        console.error("Error al obtener formularios:", error.message);
      }
    };

    fetchCurrentUser();
  }, []);

  const handleSaveForm = async () => {
    if (!formName) {
      alert("Por favor, ingrese un nombre para el formulario.");
      return;
    }
    if (!currentUser?.Id_Usuario) {
      alert("El usuario no está disponible. Por favor, inicie sesión nuevamente.");
      return;
    }
  
    try {
      // Construir formData dinámicamente
      const formData = {
        Nombre_Formulario: formName,
        Campos_Formulario: JSON.stringify(getCleanedFormFields()), // Convierte los campos en un string JSON
      };
  
      // Agregar Creado_Por o Modificado_Por según el modo
      if (!isEditMode) {
        formData.Creado_Por = currentUser?.Id_Usuario; // Solo en modo creación
      } else {
        formData.Modificado_Por = currentUser?.Id_Usuario; // Solo en modo edición
        formData.Fecha_Ultima_Modificacion = new Date().toISOString().split("T")[0];
      }
  
      // Llamar al servicio correspondiente
      const response = !isEditMode
        ? await formService.saveFormData(formData) // Crear nuevo formulario
        : await formService.updateFormData(initialFormData.Id_Formulario, formData); // Actualizar formulario existente
  
      console.log("Formulario procesado exitosamente:", response);
      setSnackbar({
        open: true,
        message: `Formulario (${formData.Nombre_Formulario}) ${isEditMode ? "actualizado" : "guardado"} exitosamente`,
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: `Error al ${isEditMode ? "actualizar" : "guardar"} el formulario (${formName}). Por favor, inténtalo nuevamente.`,
        severity: "error",
      });
      console.log("Error al procesar el formulario:", error);
    }
  };
  
  

  //Funciones para abrir/cerrar cuadro de dialogo
  const handleDialogOpen = () => setDialogOpen(true);

  const handleDialogClose = () => setDialogOpen(false);

  const getCleanedFormFields = () => {
    return formFields.map((section) => ({
      ...section,
      fields: section.fields.map(({ options, ...field }) => field), // Excluye `options`
    }));
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

  const handleVisualize = () => {
   
    const cleanedData = getCleanedFormFields();
    // console.log("la data cleaned es:", JSON.stringify(cleanedData));

    setCurrentForm(cleanedData);

    // console.log( `Formulario de parse a Stringtify : ${JSON.stringify(currentForm)}`);
    // console.log( `Formulario de Stringtify a parse guardar: `,JSON.parse(JSON.stringify(currentForm)));
    handleDialogOpen();
    setDialogOpen(true);
  };

  const handleDragStart = (e, type) => {
    e.dataTransfer.setData("type", type);
  };

  const handleDrop = (e, sectionIndex = null) => {
    e.preventDefault();
    e.stopPropagation(); // Detiene la propagación del evento para evitar duplicados.
    const fieldType = e.dataTransfer.getData("type");

    if (fieldType === "section") {
      // Agregar una nueva sección si se arrastra una sección
      setFormFields((prev) => [
        ...prev,
        { sectionTitle: "Nueva Sección", divider: true, fields: [] },
      ]);
    } else if (sectionIndex !== null) {
      // Agregar un campo dentro de una sección específica
      setFormFields((prev) =>
        prev.map((section, index) =>
          index === sectionIndex
            ? {
                ...section,
                fields: [
                  ...section.fields,
                  { type: fieldType, label: "", name: "", required: false },
                ],
              }
            : section
        )
      );
    }
  };

  const handleRemoveField = ({ sectionIndex, fieldIndex }) => {
    setFormFields((prev) =>
      prev.map((section, index) =>
        index === sectionIndex
          ? {
              ...section,
              fields: section.fields.filter((_, i) => i !== fieldIndex),
            }
          : section
      )
    );
  };

  const handleRemoveSection = (sectionIndex) => {
    setFormFields((prev) => prev.filter((_, index) => index !== sectionIndex));
  };

  const handleFieldChange = (key, value) => {
    const { sectionIndex, fieldIndex } = selectedIndex;

    setFormFields((prev) =>
      prev.map((section, index) => {
        if (index === sectionIndex) {
          // Si fieldIndex es null o undefined, estamos editando una sección
          if (fieldIndex === undefined) {
            return { ...section, [key]: value };
          }

          // Caso contrario, estamos editando un campo dentro de la sección
          return {
            ...section,
            fields: section.fields.map((field, idx) =>
              idx === fieldIndex ? { ...field, [key]: value } : field
            ),
          };
        }
        return section;
      })
    );
  };

  return (
    <Box>
      <Box display="flex" flexDirection="column" height="fit-content">
        <Grid
          container
          spacing={2}
          sx={{ flex: "0 0 auto", padding: "0 0px 15px 15px" }}
        >
          <Grid item xs={12}>
            <TextField
              key="Nombre_Formulario"
              name="Nombre_Formulario"
              type="text"
              label="Nombre del Formulario"
              required={true}
              value={formName} // Conecta el estado al valor
              onChange={(e) => setFormName(e.target.value)} // Actualiza el estado al cambiar el valor
              variant="standard"
              fullWidth
              margin="normal"
            />
          </Grid>
        </Grid>

        <Grid
          container
          spacing={2}
          sx={{
            flex: "0 0 auto",
            padding: "0 0px 15px 15px",
            alignItems: "center",
          }}
        >
          {isEditMode && (
            <Grid item xs={3}>
              <TextField
                key="Modificado_Por"
                name="Modificado_Por"
                label="Modificado Por"
                value={
                  currentUser
                    ? `${currentUser.Nombre} ${currentUser.Apellido}`
                    : "Desconocido"
                }
                required={true}
                disabled={true}
                variant="standard"
                fullWidth
                margin="normal"
              />
            </Grid>
          )}

          {!isEditMode && (
            <Grid item xs={3}>
              <TextField
                key="Creado_Por"
                name="Creado_Por"
                label="Creado Por"
                value={
                  currentUser
                    ? `${currentUser.Nombre} ${currentUser.Apellido}`
                    : "Desconocido"
                }
                required={true}
                disabled={true}
                variant="standard"
                fullWidth
                margin="normal"
              />
            </Grid>
          )}

          {isEditMode && (
          <Grid item xs={3}>
            <TextField
              key="Fecha_Ultima_Modificacion"
              name="Fecha_Ultima_Modificacion"
              label="Fecha Modificacion"
              type="date"
              variant="standard"
              value={new Date().toISOString().split("T")[0]}
              required={true}
              disabled={true}
              fullWidth
              margin="normal"
            />
          </Grid>
 )}
          {!isEditMode && (
          <Grid item xs={3}>
            <TextField
              key="Fecha_Creacion"
              name="Fecha_Creacion"
              label="Fecha Creacion"
              type="date"
              variant="standard"
              value={new Date().toISOString().split("T")[0]}
              required={true}
              disabled={true}
              fullWidth
              margin="normal"
            />
          </Grid>
        )}

          <Grid item xs={3}>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<VisibilityIcon />}
              fullWidth
              onClick={handleVisualize} // Conecta la función al botón
              sx={{ height: "50px" }}
            >
              Visualizar
            </Button>
          </Grid>

          <Grid item xs={3}>
            <Button
              sx={{ height: "50px" }}
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              fullWidth
              onClick={handleSaveForm}
            >
              {isEditMode ? "Actualizar" : "Guardar"}
            </Button>
          </Grid>
        </Grid>

        {/* Fila 1: Toolbox ocupa todo el ancho */}
        <Grid
          container
          spacing={2}
          sx={{ flex: "0 0 auto", padding: "0 0px 15px 15px" }}
        >
          <Grid item xs={12}>
            <Toolbox handleDragStart={handleDragStart} />
          </Grid>
        </Grid>

        {/* Fila 2: Canvas, PropertiesPanel y JSONView */}
        <Grid
          container
          spacing={2}
          sx={{ flex: "1 1 auto", overflow: "hidden" }}
        >
          <Grid item xs={12} md={7}>
            <Canvas
              formFields={formFields}
              handleDrop={handleDrop}
              handleRemoveField={handleRemoveField}
              handleRemoveSection={handleRemoveSection}
              onSelectField={(index) => {
                if (index.fieldIndex === undefined) {
                  setSelectedIndex({ sectionIndex: index.sectionIndex });
                } else {
                  setSelectedIndex(index);
                }
                setIsPropertiesPanelOpen(true); // Abre el panel al seleccionar un campo
              }}
            />
          </Grid>
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              {isPropertiesPanelOpen && (
                <Box sx={{ flex: "1 1 auto", overflow: "auto" }}>
                  <PropertiesPanel
                    selectedField={
                      selectedIndex
                        ? selectedIndex.fieldIndex === undefined
                          ? formFields[selectedIndex.sectionIndex]
                          : formFields[selectedIndex.sectionIndex].fields[
                              selectedIndex.fieldIndex
                            ]
                        : null
                    }
                    handleFieldChange={handleFieldChange}
                    onClose={() => setIsPropertiesPanelOpen(false)} // Cierra el panel
                  />
                </Box>
              )}
              <Box
                sx={{
                  flex: isPropertiesPanelOpen ? "1 1 auto" : "1 0 auto", // Ocupa todo el alto si no está abierto
                }}
              >
                <JSONView formFields={formFields} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
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
            formFields={currentForm}
            formTitle={formName ? formName : "Nuevo Formulario"}
            labelButtonOnSubmit="Aceptar"
            initialValues={generateInitialValues(currentForm)}
            // initialValues={getEmptyInitialValues()} // Estructura vacía del modelo
            handleSendData={() => handleDialogClose()}
          />
        </Box>
      </DialogComponent>
    </Box>
  );
};

export default CreateForm;
