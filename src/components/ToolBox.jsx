import React from "react";
import { Box, Button, Paper, Typography, useTheme } from "@mui/material";

const Toolbox = ({ handleDragStart }) => {
  const components = [
    { type: "section", label: "Nueva Sección" },
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
            const theme = useTheme();

  return (
    <Box>
        <Typography variant="h5" textAlign={"left"} paddingLeft={2} gutterBottom>
        Componentes
      </Typography>
    <Paper
    fullWidth
      sx={{
        boxShadow: theme.shadows[5], // Niveles de 0 a 24

        // backgroundColor: theme.palette.mode === "dark" ? "#333" : "#f5f5f5",
        borderBottom: "1px solid #ddd",
        padding: "16px",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: "8px",
      }}
    >
      
      {components.map((component) => (
        <Button
          key={component.type}
          variant="outlined"
          
          draggable
          onDragStart={(e) => handleDragStart(e, component.type)}
          sx={{ marginBottom: "8px", width: "200px" }}
        >
          {component.label}
        </Button>
      ))}
    </Paper>
    </Box>
  );
};

export default Toolbox;
