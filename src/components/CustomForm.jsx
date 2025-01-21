import React, { useState, useEffect } from "react";
import {
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel,
  RadioGroup,
  Radio,
  Typography,
  Divider,
  Paper, Box, Grid, Autocomplete
} from "@mui/material";

import generalService from '../services/generalService';

// const modelIdNames = {
//     Roles: { idFieldName: 'Id_Rol', defaultField: 'Nombre' },
//     UsuarioRoles: { idFieldName: 'Id_Usuario', defaultField: 'Nombre_Completo' },
//     Usuarios: { idFieldName: 'Id_Usuario', defaultField: 'Nombre' },
//     AccionesSeguimiento: { idFieldName: 'Id_AccionSeguimiento', defaultField: 'Descripcion' },
//     ClasificacionRiesgo: { idFieldName: 'Id_Clasificacion', defaultField: 'Nivel_Riesgo' },
//     Farmacia: { idFieldName: 'Id_Farmacia', defaultField: 'Nombre' },
//     FlujoEstadosServicio: { idFieldName: 'Id_FlujoEstadoServicio', defaultField: 'EstadoActual' },
//     Formulario: { idFieldName: 'Id_Formulario', defaultField: 'Nombre_Formulario' },
//     Hallazgos: { idFieldName: 'Id_Hallazgo', defaultField: 'Descripcion' },
//     HistorialCambio: { idFieldName: 'Id_HistorialCambio', defaultField: 'Cambio' },
//     Inspeccion: { idFieldName: 'Id_Inspeccion', defaultField: 'Fecha' },
//     Licencia: { idFieldName: 'Id_Licencia', defaultField: 'Numero' },
//     ListasVerificacion: { idFieldName: 'Id_ListaVerificacion', defaultField: 'Nombre' },
//     Provincia: { idFieldName: 'Id_Provincia', defaultField: 'Descripcion' },
//     Sancion: { idFieldName: 'Id_Sancion', defaultField: 'Motivo' },
//     Servicio: { idFieldName: 'Id_Servicio', defaultField: 'Descripcion' },
//     TipoFarmacia: { idFieldName: 'Id_Tipo_Farmacia', defaultField: 'Descripcion' },
//     TipoServicio: { idFieldName: 'Id_TipoServicio', defaultField: 'Descripcion' },
// };


const DynamicForm = ({
   formFields, 
   formTitle, 
   labelButtonOnSubmit = "Enviar", 
   handleSendData, 
   initialValues = {}, 
   isDisabled = false,
}) => {
  const [formValues, setFormValues] = useState(initialValues);
  const [dynamicOptions, setDynamicOptions] = useState({});


  const handleChange = (name, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleFileChange = (name, files) => {
    setFormValues({
      ...formValues,
      [name]: files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Verificar que todos los campos requeridos están validados correctamente
    const hasErrors = formFields.some(section =>
      section.fields.some(field =>
        field.required && (!formValues[field.name] ||
          (field.type === "id" && formValues[field.name].replace(/\D/g, "").length !== 11))
      )
    );

    if (hasErrors) {
      return;
    }

    // Crear un JSON plano manejando valores anidados
    const plainJson = Object.entries(formValues).reduce((acc, [key, value]) => {
      if (typeof value === 'object' && value !== null) {
        // Extraer solo el valor interno si es un objeto
        if (value.value !== undefined) {
          acc[key] = value.value; // Si tiene un campo `value`, usa ese
        } else {
          acc[key] = JSON.stringify(value); // Si no, convierte todo el objeto en string
        }
      } else {
        acc[key] = value; // Agrega el valor directamente si no es un objeto
      }
      return acc;
    }, {});


    console.log("Datos enviados:", plainJson);
    handleSendData(plainJson);
  };

  const renderField = (field) => {
    const xs = field.xs || 12; // Tamaño predeterminado para móviles (toda la fila)
    const sm = field.sm || 6; // Tamaño predeterminado para pantallas medianas
    const md = field.md || 4; // Tamaño predeterminado para pantallas grandes

    switch (field.type) {
      case "text":
        return (
          <Grid item xs={xs} sm={sm} md={md} key={field.name}>

            <TextField
              key={field.name}
              label={field.label}
              required={field.required}
              variant="outlined"
              fullWidth
              margin="normal"
              value={formValues[field.name] || ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
              error={field.required && !formValues[field.name]} // Marca como error si el campo está vacío
              disabled={isDisabled} // Campo deshabilitado si isDisabled es true
              helperText={field.required && !formValues[field.name] ? "campo obligatorio" : ""} // Mensaje de error
            />
          </Grid>

        );

      case "textarea":
        return (
          <Grid item xs={xs} sm={sm} md={md} key={field.name}>
            <TextField
              key={field.name}
              label={field.label}
              required={field.required}
              variant="outlined"
              fullWidth
              margin="normal"
              multiline
              rows={field.rows || 4} // Número de filas predeterminado si no se especifica
              value={formValues[field.name] || ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
              error={field.required && !formValues[field.name]} // Marca como error si el campo está vacío
              helperText={field.required && !formValues[field.name] ? "campo obligatorio" : ""} // Mensaje de error
              disabled={isDisabled} // Campo deshabilitado si isDisabled es true

            />
          </Grid>
        );

      case "password":
        return (
          <Grid item xs={xs} sm={sm} md={md} key={field.name}>

            <TextField
              key={field.name}
              type="password"
              label={field.label}
              required={field.required}
              fullWidth
              margin="normal"
              value={formValues[field.name] || ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
              error={field.required && !formValues[field.name]} // Marca como error si el campo está vacío
              helperText={field.required && !formValues[field.name] ? "campo obligatorio" : ""} // Mensaje de error
              disabled={isDisabled} // Campo deshabilitado si isDisabled es true

            />
          </Grid>

        );
      case "date":
      case "time":
      case "week":
      case "month":
      case "datetime-local":
      case "email":
      case "search":
        return (
          <Grid item xs={xs} sm={sm} md={md} key={field.name}>

            <TextField
              key={field.name}
              type={field.type}
              disabled={isDisabled} // Campo deshabilitado si isDisabled es true
              label={field.label}
              required={field.required}
              fullWidth
              margin="normal"
              value={formValues[field.name] || ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
              error={field.required && !formValues[field.name]} // Marca como error si el campo está vacío
              helperText={field.required && !formValues[field.name] ? "campo obligatorio" : ""} // Mensaje de error
            />
          </Grid>

        );
      case "number":
        return (

          <Grid item xs={xs} sm={sm} md={md} key={field.name}>

            <TextField
              key={field.name}
              type="number"
              disabled={isDisabled} // Campo deshabilitado si isDisabled es true
              label={field.label}
              required={field.required}
              fullWidth
              margin="normal"
              value={formValues[field.name] || ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
              error={field.required && !formValues[field.name]} // Marca como error si el campo está vacío
              helperText={field.required && !formValues[field.name] ? "campo obligatorio" : ""} // Mensaje de error
            />
          </Grid>

        );
      case "select":
        return (
          <Grid item xs={xs} sm={sm} md={md} key={field.name}>
            <FormControl key={field.name} fullWidth margin="normal">
              <InputLabel>{field.label}</InputLabel>
              <Select
                disabled={isDisabled} // Campo deshabilitado si isDisabled es true
                value={formValues[field.name]?.value || ""} // Usa el value del estado
                onChange={(e) => handleChange(field.name, { value: e.target.value, label: e.target.innerText })}
                required={field.required}
              >
                {dynamicOptions[field.name]?.map((option, index) => (
                  <MenuItem key={index} value={option.value}>
                    {option.label}
                  </MenuItem>
                )) || (
                    <MenuItem disabled>Cargando opciones...</MenuItem>
                  )}
              </Select>
            </FormControl>
          </Grid>
        );


      case "autocomplete":
        return (
          <Grid item xs={xs} sm={sm} md={md} key={field.name}>
            <Autocomplete
            disabled={isDisabled}
              disablePortal
              options={dynamicOptions[field.name] || []} // Usa las opciones dinámicas cargadas
              getOptionLabel={(option) => option.label || ""}
              value={formValues[field.name] || null}
              onChange={(event, newValue) => handleChange(field.name, newValue || "")}
              renderInput={(params) =>
                <TextField
                  {...params}
                  label={field.label}
                  required={field.required}
                  error={field.required && !formValues[field.name]} // Marca como error si el campo está vacío
                  helperText={field.required && !formValues[field.name] ? "campo obligatorio" : ""} // Mensaje de error
                />}
              renderOption={(props, option) => (
                <li {...props} style={{ overflowY: "auto", maxHeight: "150px" }}>
                  {option.label}
                </li>
              )}
              sx={{ width: "100%" }}
            />
          </Grid>
        );

      case "file":
        return (
          <Grid item xs={xs} sm={sm} md={md} key={field.name}>

            <TextField
              key={field.name}
              disabled={isDisabled} // Campo deshabilitado si isDisabled es true
              type="file"
              label={field.label}
              InputLabelProps={{ shrink: true }}
              required={field.required}
              fullWidth
              margin="normal"
              onChange={(e) => handleFileChange(field.name, e.target.files)}
              error={field.required && !formValues[field.name]} // Marca como error si el campo está vacío
              helperText={field.required && !formValues[field.name] ? "campo obligatorio" : ""} // Mensaje de error
            />
          </Grid>

        );
      case "checkbox":
        return (
          <Grid item xs={xs} sm={sm} md={md} key={field.name}>

            <FormControlLabel
              key={field.name}
              control={
                <Checkbox
                disabled={isDisabled} // Campo deshabilitado si isDisabled es true
                  checked={formValues[field.name] || false}
                  required={field.required}
                  onChange={(e) => handleChange(field.name, e.target.checked)}
                />
              }
              label={field.label}
            />
          </Grid>

        );
      case "radio":
        return (
          <Grid item xs={xs} sm={sm} md={md} key={field.name}>

            <FormControl component="fieldset" key={field.name} margin="normal" >
              <Typography>{field.label}</Typography>
              <RadioGroup
                value={formValues[field.name] || ""}
                onChange={(e) => handleChange(field.name, e.target.value)}
                
              >
                {field.options.map((option, index) => (
                  <FormControlLabel
                  disabled={isDisabled} // Campo deshabilitado si isDisabled es true
                  key={index}
                    value={option}
                    control={<Radio />}
                    label={`Opción ${option}`}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Grid>

        );
      case "button":
        return (
          <Grid item xs={xs} sm={sm} md={md} key={field.name}>

            <Button
              key={field.name}
              disabled={isDisabled} // Campo deshabilitado si isDisabled es true
              variant="contained"
              color="primary"
              onClick={() => alert(`${field.label} presionado`)}
              fullWidth
              style={{ marginTop: "10px" }}
            >
              {field.label}
            </Button>
          </Grid>

        );
      case "tel":
        return (
          <Grid item xs={xs} sm={sm} md={md} key={field.name}>
            <TextField
              label={field.label}
              disabled={isDisabled} // Campo deshabilitado si isDisabled es true
              required={field.required}
              error={field.required && !formValues[field.name]} // Marca como error si el campo está vacío
              helperText={field.required && !formValues[field.name] ? "campo obligatorio" : ""} // Mensaje de error
              fullWidth
              margin="normal"
              value={
                formValues[field.name]
                  ? formValues[field.name]
                    .replace(/(\d{3})(\d{3})(\d{0,4})/, "$1-$2-$3") // Aplica formato para visualización
                    .replace(/-$/, "") // Elimina guión final si sobra
                  : ""
              }
              onChange={(e) => {
                const rawValue = e.target.value.replace(/\D/g, ""); // Elimina caracteres no numéricos
                handleChange(field.name, rawValue.slice(0, 10)); // Guarda solo los primeros 10 dígitos
              }}
              inputProps={{ maxLength: 12 }} // Limita la entrada visible (incluyendo guiones)
            />
          </Grid>
        );
      case "id":
        return (
          <Grid item xs={xs} sm={sm} md={md} key={field.name}>
            <TextField
              disabled={isDisabled} // Campo deshabilitado si isDisabled es true
              label={field.label}
              required={field.required}
              error={field.required && (!formValues[field.name] || formValues[field.name].replace(/\D/g, "").length !== 11)} // Marca como error si el campo está vacío o si no tiene 11 dígitos
              helperText={
                field.required && (!formValues[field.name] || formValues[field.name].replace(/\D/g, "").length !== 11)
                  ? "Debe tener exactamente 11 dígitos"
                  : ""
              } // Mensaje de error específico
              fullWidth
              margin="normal"
              value={
                formValues[field.name]
                  ? formValues[field.name]
                    .replace(/(\d{3})(\d{7})(\d{0,1})/, "$1-$2-$3") // Formatea como XXX-XXXXXXX-X
                    .replace(/-$/, "") // Elimina guión final si es innecesario
                  : ""
              }
              onChange={(e) => {
                const rawValue = e.target.value.replace(/\D/g, ""); // Solo dígitos
                handleChange(field.name, rawValue.slice(0, 11)); // Limita a 11 dígitos
              }}
              inputProps={{ maxLength: 13 }} // Limita la entrada visible (11 dígitos + 2 guiones)
            />
          </Grid>
        );

      case "rnc":
        return (
          <Grid item xs={xs} sm={sm} md={md} key={field.name}>
            <TextField
            disabled={isDisabled} // Campo deshabilitado si isDisabled es true
              label={field.label}
              required={field.required}
              error={field.required && (!formValues[field.name] || formValues[field.name].replace(/\D/g, "").length !== 9)} // Marca como error si el campo está vacío o no tiene 9 dígitos
              helperText={
                field.required && (!formValues[field.name] || formValues[field.name].replace(/\D/g, "").length !== 9)
                  ? "Debe tener exactamente 9 dígitos"
                  : ""
              } // Mensaje de error específico
              fullWidth
              margin="normal"
              value={
                formValues[field.name]
                  ? formValues[field.name]
                    .replace(/(\d{3})(\d{5})(\d{0,1})/, "$1-$2-$3") // Formatea como ###-#####-#
                    .replace(/-$/, "") // Elimina guión final si sobra
                  : ""
              }
              onChange={(e) => {
                const rawValue = e.target.value.replace(/\D/g, ""); // Solo dígitos
                handleChange(field.name, rawValue.slice(0, 9)); // Limita a 9 dígitos
              }}
              inputProps={{ maxLength: 11 }} // Limita la entrada visible (9 dígitos + 2 guiones)
            />
          </Grid>
        );



      default:
        return null;
    }
  };

  const renderSection = (section) => (
    <Paper elevation={2} style={{ marginBottom: "20px" }}>
      <Typography variant="h6" gutterBottom paddingTop={1} display={"flex"} justifyContent={"center"} alignContent={"center"}>
        {section.sectionTitle}
      </Typography>
      {section.divider && <Divider style={{ margin: "0 auto", width: "50vw", }} />}

      <Box
        key={section.sectionTitle}
        sx={{
          marginTop: "10px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          flexWrap: "wrap   ",
          gap: "20px 20px", padding: "15px",
        }}
      >


        {section.fields.map((field) => renderField(field))}

      </Box>

    </Paper>

  );


  // useEffect(() => {


  //   const loadDynamicOptions = async () => {
  //     const optionsData = {};

  //     // Filtra los campos que tienen `modelOptions` especificado
  //     const dynamicFields = formFields
  //       .flatMap((section) => section.fields)
  //       .filter((field) => (field.type === "select" || field.type === "autocomplete") && field.modelOptions);

  //     // Carga las opciones para cada campo
  //     for (const field of dynamicFields) {
  //       const model = field.modelOptions;
  //       if (modelIdNames[model]) {
  //         try {
  //           const data = await generalService.getFromTable(
  //             model,
  //             `${modelIdNames[model].idFieldName},${modelIdNames[model].defaultField}`
  //           );
  //           optionsData[field.name] = data.map((item) => ({
  //             value: item[modelIdNames[model].idFieldName],
  //             label: item[modelIdNames[model].defaultField],
  //           }));
  //         } catch (error) {
  //           console.error(`Error al cargar opciones para ${model}:`, error.message);
  //         }
  //       } else {
  //         console.warn(`Modelo ${model} no encontrado en modelIdNames.`);
  //       }
  //     }

  //     setDynamicOptions(optionsData);
  //   };
  //     loadDynamicOptions();
  // }, [formFields]);


  useEffect(() => {
    const initializeFormValues = async () => {
      const initialFormValues = { ...initialValues }; // Prioriza los valores de initialValues si existen
      const optionsData = {};

      // Filtrar campos de tipo select/autocomplete
      const dynamicFields = formFields
        .flatMap((section) => section.fields)
        .filter((field) => field.type === "select" || field.type === "autocomplete");

      // Cargar las opciones para cada campo dinámico
      for (const field of dynamicFields) {
        const { apiOptions, name, IdFieldName, filterField } = field;

        try {
          const response = await generalService.getOptionsFromApi(apiOptions);

          // Mapea las opciones dinámicas con sus valores y etiquetas
          optionsData[name] = response.map((item) => ({
            value: item[IdFieldName],
            label: item[filterField],
          }));

          // Manejar initialValues para campos select/autocomplete
          if (initialValues[name] !== undefined) {
            const matchedOption = optionsData[name].find(
              (option) => option.value === initialValues[name] // Busca la opción correspondiente al valor en initialValues
            );
            if (matchedOption) {
              initialFormValues[name] = matchedOption; // Asigna el objeto completo { value, label }
            }
          } else if (field.value !== undefined) {
            // Si no hay initialValues, usa el valor por defecto en el campo
            const matchedOption = optionsData[name].find(
              (option) => option.value === field.value
            );
            if (matchedOption) {
              initialFormValues[name] = matchedOption; // Asigna el objeto completo { value, label }
            }
          }
        } catch (error) {
          console.error(`Error al cargar opciones para ${name}:`, error.message);
        }
      }

      // Inicializa otros campos que no son select/autocomplete
      formFields.forEach((section) => {
        section.fields.forEach((field) => {
          if (!dynamicFields.includes(field)) {
            // Usa el valor de initialValues si existe, de lo contrario usa field.value
            initialFormValues[field.name] = initialValues[field.name] ?? field.value;
          }
        });
      });

      setDynamicOptions(optionsData);
      setFormValues(initialFormValues);
    };

    initializeFormValues();
  }, [formFields, initialValues]);





  return (
    <Box sx={{ flexGrow: 1, }}>

      <Grid container spacing={1} >


        <form onSubmit={handleSubmit} >
          <Typography variant="h4" marginY={3} textAlign={"center"}>
            {/* Formulario Dinámico con Secciones Wrappables */}
            {formTitle}

          </Typography>
          <Box

          >
            {formFields.map((section) => renderSection(section))}
          </Box>

          {!isDisabled && labelButtonOnSubmit && ( // Renderizar botón solo si no está deshabilitado y labelButtonOnSubmit está definido

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth

            style={{ marginTop: "20px", height: "50px" }}
          >
            {labelButtonOnSubmit}
          </Button>
            )}
        </form>
      </Grid>
    </Box>

  );
};

export default DynamicForm;
