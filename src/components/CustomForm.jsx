import React, { useState } from "react";
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



const DynamicForm = ({ formFields }) => {
  const [formValues, setFormValues] = useState({});

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
    switch (field.type) {
      case "text":
        return (
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
        );
      case "password":
        return (
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
        );
      case "date":
      case "time":
      case "week":
      case "month":
      case "datetime-local":
      case "email":
      case "search":
        return (
          <TextField
            key={field.name}
            type={field.type}
            slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
              fullWidth
            label={field.label}
            required={field.required}
            margin="normal"
            value={formValues[field.name] || ""}
            onChange={(e) => handleChange(field.name, e.target.value)}
          />
        );
      case "number":
        return (

         
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
        );
      case "select":
        return (
          <FormControl key={field.name} fullWidth margin="normal">
            <InputLabel>{field.label}</InputLabel>
            <Select
              value={formValues[field.name] || ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
              required={field.required}
              fullWidth
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            >
              {field.options.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {`Opción ${option}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      case "file":
        return (
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
        );
      case "checkbox":
        return (
          <FormControlLabel
            key={field.name}
            control={
              <Checkbox
                checked={formValues[field.name] || false}
                onChange={(e) => handleChange(field.name, e.target.checked)}
              />
            }
            label={field.label}
            sx={{alignSelf:"flex-start", justifyContent:"flex-start"}}
          />
        );
      case "radio":
        return (
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
        );
      case "button":
        return (
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
        );
        case "telefono":
            return (
                <TextField
                key={field.name}
                label={field.label}
                required={field.required}
                fullWidth
                margin="normal"
                value={formValues[field.name]
                  ? formValues[field.name]
                      .replace(/(\d{3})(\d{4})(\d{0,4})/, "($1)-$2-$3") // Formatea solo para mostrar
                  : ""}
                onChange={(e) => {
                  const rawValue = e.target.value.replace(/\D/g, ""); // Elimina caracteres no numéricos
                  handleChange(field.name, rawValue); // Almacena solo los dígitos
                }}
                inputProps={{ maxLength: 15 }} // Limita a 15 caracteres
              />
            );

      default:
        return null;
    }
  };

  const renderSection = (section) => (
    <Grid item xs={12} sm={6} key={section.sectionTitle}>
    <Paper elevation={2} style={{ padding: "10px", marginBottom: "20px" }}>
      <Typography variant="h6" gutterBottom>
        {section.sectionTitle}
      </Typography>
      {section.divider && <Divider style={{ marginBottom: "10px" }} />}
      {section.fields.map((field) => renderField(field))}
    </Paper>
  </Grid>

  );

  return (

    <Paper elevation={4} style={{ padding: "15px" }}>
    <form onSubmit={handleSubmit} style={{ maxWidth: "100%", margin: "0 auto" }}>
      <Typography variant="h5" marginY={3}>
        Formulario Dinámico con Secciones Tetris
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", // Cada elemento ocupa un mínimo de 250px y se ajusta automáticamente
          gap: "16px", // Espaciado entre elementos
        }}
      >
        {formFields.map((section) => renderSection(section))}
      </Box>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        style={{ marginTop: "20px" }}
      >
        Enviar
      </Button>
    </form>
  </Paper>

  );
};

export default DynamicForm;
