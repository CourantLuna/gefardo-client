import React, { useState,useEffect } from "react";
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

const modelIdNames = {
    Roles: { idFieldName: 'Id_Rol', defaultField: 'Nombre' },
    UsuarioRoles: { idFieldName: 'Id_UsuarioRoles', defaultField: 'Id_Rol' },
    Usuarios: { idFieldName: 'Id_Usuario', defaultField: 'Nombre' },
    AccionesSeguimiento: { idFieldName: 'Id_AccionSeguimiento', defaultField: 'Descripcion' },
    ClasificacionRiesgo: { idFieldName: 'Id_ClasificacionRiesgo', defaultField: 'Nivel' },
    Farmacia: { idFieldName: 'Id_Farmacia', defaultField: 'Nombre' },
    FlujoEstadosServicio: { idFieldName: 'Id_FlujoEstadoServicio', defaultField: 'EstadoActual' },
    Formulario: { idFieldName: 'Id_Formulario', defaultField: 'Nombre_Formulario' },
    Hallazgos: { idFieldName: 'Id_Hallazgo', defaultField: 'Descripcion' },
    HistorialCambio: { idFieldName: 'Id_HistorialCambio', defaultField: 'Cambio' },
    Inspeccion: { idFieldName: 'Id_Inspeccion', defaultField: 'Fecha' },
    Licencia: { idFieldName: 'Id_Licencia', defaultField: 'Numero' },
    ListasVerificacion: { idFieldName: 'Id_ListaVerificacion', defaultField: 'Nombre' },
    Provincia: { idFieldName: 'Id_Provincia', defaultField: 'Descripcion' },
    Sancion: { idFieldName: 'Id_Sancion', defaultField: 'Motivo' },
    Servicio: { idFieldName: 'Id_Servicio', defaultField: 'Descripcion' },
    TipoFarmacia: { idFieldName: 'Id_Tipo_Farmacia', defaultField: 'Descripcion' },
    TipoServicio: { idFieldName: 'Id_TipoServicio', defaultField: 'Descripcion' },
};


const DynamicForm = ({ formFields, formTitle }) => {
  const [formValues, setFormValues] = useState({});
  const [dynamicOptions, setDynamicOptions] = useState({});

  const handleChange = (name, value) => {
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleFileChange = (name, files) => {
    setFormValues({
      ...formValues,
      [name]: files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

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
    alert("Formulario enviado correctamente. Revisa la consola para ver los datos.");
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
                    value={formValues[field.name] || ""}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    required={field.required}
                    error={field.required && !formValues[field.name]} // Marca como error si el campo está vacío
                    helperText={field.required && !formValues[field.name] ? "campo obligatorio" : ""} // Mensaje de error
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
              disablePortal
              options={dynamicOptions[field.name] || []} // Usa las opciones dinámicas cargadas
              getOptionLabel={(option) => option.label || ""}
              value={formValues[field.name] || null}
              onChange={( event, newValue) => handleChange(field.name, newValue || "")}
              renderInput={(params) => 
                <TextField {...params} label={field.label}
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

          <FormControl component="fieldset" key={field.name} margin="normal">
            <Typography>{field.label}</Typography>
            <RadioGroup
              value={formValues[field.name] || ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
            >
              {field.options.map((option, index) => (
                <FormControlLabel
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
                        label={field.label}
                        required={field.required}
                        error={field.required && !formValues[field.name]} // Marca como error si el campo está vacío
                        helperText={field.required && !formValues[field.name] ? "campo obligatorio" : ""} // Mensaje de error
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
          

      default:
        return null;
    }
  };

  const renderSection = (section) => (
      <Paper elevation={2} style={{  marginBottom: "20px"}}>
         <Typography variant="h6" gutterBottom paddingTop={1} display={"flex"} justifyContent={"center"} alignContent={"center"}>
            {section.sectionTitle}
        </Typography>
            {section.divider && <Divider style={{margin:"0 auto",  width:"50vw", }} />}

          <Box
              key={section.sectionTitle}
            sx={{
            marginTop:"10px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              flexWrap: "wrap   ",
              gap: "0px 20px", padding:"0px 15px",
            }}
          >
            

      {section.fields.map((field) => renderField(field))}

          </Box>

      </Paper>

  );
  

  useEffect(() => {
    
    
    const loadDynamicOptions = async () => {
      const optionsData = {};
  
      // Filtra los campos que tienen `modelOptions` especificado
      const dynamicFields = formFields
        .flatMap((section) => section.fields)
        .filter((field) => (field.type === "select" || field.type === "autocomplete") && field.modelOptions);
  
      // Carga las opciones para cada campo
      for (const field of dynamicFields) {
        const model = field.modelOptions;
        if (modelIdNames[model]) {
          try {
            const data = await generalService.getFromTable(
              model,
              `${modelIdNames[model].idFieldName},${modelIdNames[model].defaultField}`
            );
            optionsData[field.name] = data.map((item) => ({
              value: item[modelIdNames[model].idFieldName],
              label: item[modelIdNames[model].defaultField],
            }));
          } catch (error) {
            console.error(`Error al cargar opciones para ${model}:`, error.message);
          }
        } else {
          console.warn(`Modelo ${model} no encontrado en modelIdNames.`);
        }
      }
  
      setDynamicOptions(optionsData);
    };
      loadDynamicOptions();
  }, [formFields]);

  return (
    <Box sx={{ flexGrow: 1, }}>

      <Grid container spacing={1} >


          <form onSubmit={handleSubmit} >
            <Typography variant="h5" marginY={3}>
              {/* Formulario Dinámico con Secciones Wrappables */}
              {formTitle}

            </Typography>
            <Box

            >
              {formFields.map((section) => renderSection(section))}
            </Box>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth

              style={{ marginTop: "20px", height: "50px" }}
            >
              Enviar
            </Button>
          </form>
      </Grid>
    </Box>

  );
};

export default DynamicForm;
