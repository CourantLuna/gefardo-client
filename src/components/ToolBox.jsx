import React from "react";
import { Box, Button, Typography, Grid } from "@mui/material";

const Toolbox = ({ handleDragStart }) => {
  // Lista de componentes disponibles
  const components = [
    { type: "text", label: "Text Field" },
    { type: "textarea", label: "Text Area" },
    { type: "password", label: "Password" },
    { type: "date", label: "Date Picker" },
    { type: "time", label: "Time Picker" },
    { type: "week", label: "Week Picker" },
    { type: "month", label: "Month Picker" },
    { type: "datetime-local", label: "DateTime Picker" },
    { type: "email", label: "Email Field" },
    { type: "search", label: "Search Field" },
    { type: "number", label: "Number Field" },
    { type: "select", label: "Select Field" },
    { type: "autocomplete", label: "Autocomplete" },
    { type: "file", label: "File Upload" },
    { type: "checkbox", label: "Checkbox" },
    { type: "radio", label: "Radio Buttons" },
    { type: "button", label: "Button" },
    { type: "tel", label: "Telephone Field" },
    { type: "id", label: "ID Field" },
    { type: "rnc", label: "RNC Field" },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        padding: "5px",
        display: "flex",
        flexWrap: "wrap", // Permite que los botones se acomoden automáticamente
        gap: "8px",
        borderRight: "1px solid #ddd",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Componentes Disponibles
      </Typography>
      <Grid container spacing={2}>
        {components.map((component) => (
          <Grid item xs={12} sm={4} md={4} key={component.type}>
            <Button
              variant="outlined"
              fullWidth
              draggable
              onDragStart={(e) => handleDragStart(e, component.type)}
            >
              {component.label}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Toolbox;
