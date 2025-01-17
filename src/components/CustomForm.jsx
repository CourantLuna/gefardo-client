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
  Paper, Box, Grid
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
    Formulario: { idFieldName: 'Id_Formulario', defaultField: 'Titulo' },
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


const fetchAllUsuarios = async (model) => {
    try {
        console.log(`El modelo es ${model}`);
        const data = await generalService.getFromTable(`${model}`, `${modelIdNames[model].idFieldName},${modelIdNames[model].defaultField}`);
        console.log('Datos obtenidos:', data);
      } catch (error) {
        console.error('Error al obtener datos:', error.message);
      }
  };


const DynamicForm = ({ formFields }) => {
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
    console.log("Datos enviados:", formValues);
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
         <Typography variant="h6" gutterBottom paddingTop={1}>
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
    
    fetchAllUsuarios("Usuarios");

    const loadDynamicOptions = async () => {
        const optionsData = {};
    
        // Filtra los campos que tienen `modelOptions` especificado
        const selectFields = formFields
          .flatMap((section) => section.fields)
          .filter((field) => field.type === "select" && field.modelOptions);
    
        // Carga las opciones para cada campo
        for (const field of selectFields) {
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
    <Box  sx={{ flexGrow: 1, }}>

<Grid container  spacing={1} >

      <Paper elevation={4}  style={{ padding: "15px"}}>

          <form onSubmit={handleSubmit} >
              <Typography variant="h5" marginY={3}>
                  Formulario Dinámico con Secciones Wrappables
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

                  style={{ marginTop: "20px", height:"50px" }}
              >
                  Enviar
              </Button>
          </form>
      </Paper>
      </Grid>
      </Box>

  );
};

export default DynamicForm;
