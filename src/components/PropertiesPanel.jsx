import React from "react";
import { Box, TextField, Typography, Switch, Grid, FormControlLabel } from "@mui/material";

const PropertiesPanel = ({ selectedField, handleFieldChange, onClose }) => {
  if (!selectedField) return null;

  return (
    <Box
      sx={{
        padding: "16px",
        height: "100%",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Título */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h6" gutterBottom>
          Propiedades del Campo
        </Typography>
        {onClose && (
          <button onClick={onClose} style={{ cursor: "pointer", background: "none", border: "none", fontSize: "16px" }}>
            ✕
          </button>
        )}
      </Box>

      {/* Propiedades */}
      <Grid container spacing={2}>
        {/* Nombre del Campo */}
        <Grid item xs={12} md={6}>
          <TextField
            label="Nombre del Campo"
            value={selectedField.name || ""}
            onChange={(e) => handleFieldChange("name", e.target.value)}
            fullWidth
          />
        </Grid>

        {/* Etiqueta */}
        <Grid item xs={12} md={6}>
          <TextField
            label="Etiqueta"
            value={selectedField.label || ""}
            onChange={(e) => handleFieldChange("label", e.target.value)}
            fullWidth
          />
        </Grid>

        {/* Opciones (solo para selects) */}
        {selectedField.type === "select" && (
          <Grid item xs={12}>
            <TextField
              label="Opciones (separadas por comas)"
              value={selectedField.options?.map((opt) => opt.label).join(",") || ""}
              onChange={(e) =>
                handleFieldChange(
                  "options",
                  e.target.value.split(",").map((opt) => ({ label: opt, value: opt }))
                )
              }
              fullWidth
            />
          </Grid>
        )}

        {/* Campo Requerido */}
        <Grid item xs={12} md={6}>
          <FormControlLabel
            control={
              <Switch
                checked={!!selectedField.required}
                onChange={(e) => handleFieldChange("required", e.target.checked)}
              />
            }
            label="Requerido"
          />
        </Grid>

        {/* Tipo de Campo */}
        <Grid item xs={12} md={6}>
          <TextField
            label="Tipo de Campo"
            value={selectedField.type || ""}
            onChange={(e) => handleFieldChange("type", e.target.value)}
            fullWidth
            disabled
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default PropertiesPanel;
