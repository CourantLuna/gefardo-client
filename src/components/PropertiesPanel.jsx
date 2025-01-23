import React, { useState } from "react";
import { Box, TextField, Typography, Switch, Divider, IconButton, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import generalService from "../services/generalService";

const PropertiesPanel = ({ selectedField, handleFieldChange, onClose }) => {
  const [loadingOptions, setLoadingOptions] = useState(false); // Estado de carga de opciones
  const [error, setError] = useState(null); // Manejo de errores en la carga de opciones

  if (!selectedField) return null;

  // Determinar si el campo seleccionado es una sección o un campo normal
  const isSection = selectedField.hasOwnProperty("sectionTitle");

  // Función para cargar las opciones dinámicamente
  const handleLoadOptions = async () => {
    const { apiOptions, filterField, IdFieldName } = selectedField;

    if (!apiOptions || !filterField || !IdFieldName) {
      setError("Por favor, completa todas las propiedades necesarias para cargar opciones.");
      return;
    }

    setError(null); // Limpia errores previos
    setLoadingOptions(true);

    try {
      const response = await generalService.getOptionsFromApi(apiOptions);

      const options = response.map((item) => ({
        value: item[IdFieldName],
        label: item[filterField],
      }));

      handleFieldChange("options", options); // Guarda las opciones en el campo seleccionado
    } catch (err) {
      setError(`Error al cargar opciones: ${err.message}`);
    } finally {
      setLoadingOptions(false);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        padding: "16px",
        border: "1px solid #ddd",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: "8px",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h6" gutterBottom>
          {isSection ? "Propiedades de la Sección" : "Propiedades del Campo"}
        </Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </Box>

      {isSection ? (
        <>
          {/* Propiedades para la sección */}
          <TextField
            label="Título de la Sección"
            value={selectedField.sectionTitle || ""}
            onChange={(e) => handleFieldChange("sectionTitle", e.target.value)}
            fullWidth
            sx={{ marginBottom: "16px" }}
          />
          <Switch
            checked={!!selectedField.divider}
            onChange={(e) => handleFieldChange("divider", e.target.checked)}
          />
          <Typography>Incluir un divisor</Typography>
        </>
      ) : (
        <>
          {/* Propiedades para el campo */}
          <TextField
            label="Nombre del Campo"
            value={selectedField.name || ""}
            onChange={(e) => handleFieldChange("name", e.target.value)}
            fullWidth
            sx={{ marginBottom: "16px" }}
          />
          <TextField
            label="Etiqueta"
            value={selectedField.label || ""}
            onChange={(e) => handleFieldChange("label", e.target.value)}
            fullWidth
            sx={{ marginBottom: "16px" }}
          />
          {/* Campos para API Options */}
          {(selectedField.type === "select" || selectedField.type === "autocomplete" || selectedField.type === "radio") && (
            <>
              <TextField
                label="API Options"
                value={selectedField.apiOptions || ""}
                onChange={(e) => handleFieldChange("apiOptions", e.target.value)}
                fullWidth
                sx={{ marginBottom: "16px" }}
              />
              <TextField
                label="Campo de Filtro (filterField)"
                value={selectedField.filterField || ""}
                onChange={(e) => handleFieldChange("filterField", e.target.value)}
                fullWidth
                sx={{ marginBottom: "16px" }}
              />
              <TextField
                label="Nombre del Campo ID (IdFieldName)"
                value={selectedField.IdFieldName || ""}
                onChange={(e) => handleFieldChange("IdFieldName", e.target.value)}
                fullWidth
                sx={{ marginBottom: "16px" }}
              />
              <Button
                variant="contained"
                onClick={handleLoadOptions}
                disabled={loadingOptions}
                fullWidth
                sx={{ marginBottom: "16px" }}
              >
                {loadingOptions ? "Cargando Opciones..." : "Cargar Opciones"}
              </Button>
              {error && <Typography color="error">{error}</Typography>}
            </>
          )}

<Typography variant="subtitle1" sx={{ marginBottom: "8px", width: "100%" }}>
            Tamaños del Campo
          </Typography>
          <TextField
            label="Tamaño XS"
            type="number"
            inputProps={{ step: "0.1", min: "0" }}
            value={selectedField.xs || ""}
            onChange={(e) => {
              const value = parseFloat(e.target.value) || 0; // Convierte a número
              if (value >= 0 && value <= 12) { // Valida que esté en el rango
                handleFieldChange("xs", value);
              }
            }}            fullWidth
            sx={{ marginBottom: "16px" }}
          />
          <TextField
            label="Tamaño SM"
            type="number"
            inputProps={{ step: "0.1", min: "0" }}
            value={selectedField.sm || ""}
            onChange={(e) => {
              const value = parseFloat(e.target.value) || 0; // Convierte a número
              if (value >= 0 && value <= 12) { // Valida que esté en el rango
                handleFieldChange("sm", value);
              }
            }}            fullWidth
            sx={{ marginBottom: "16px" }}
          />
          <TextField
            label="Tamaño MD"
            type="number"
            inputProps={{ step: "0.1", min: "0" }}
            value={selectedField.md || ""}
            onChange={(e) => {
              const value = parseFloat(e.target.value) || 0; // Convierte a número
              if (value >= 0 && value <= 12) { // Valida que esté en el rango
                handleFieldChange("md", value);
              }
            }}            fullWidth
            sx={{ marginBottom: "16px" }}
          />
          
          <Switch
            checked={!!selectedField.required}
            onChange={(e) => handleFieldChange("required", e.target.checked)}
          />
          <Typography>Requerido</Typography>

          <Switch
            checked={!!selectedField.IsThisFieldDisabled}
            onChange={(e) => handleFieldChange("IsThisFieldDisabled", e.target.checked)}
          />
          <Typography>Campo Deshabilitado</Typography>
        </>
      )}

      <Divider sx={{ marginY: "16px" }} />

      {/* Tipo de Campo o Sección */}
      {!isSection && (
        <TextField
          label="Tipo de Campo"
          value={selectedField.type || ""}
          disabled
          fullWidth
        />
      )}
    </Box>
  );
};

export default PropertiesPanel;
