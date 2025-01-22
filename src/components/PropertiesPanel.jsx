import React from "react";
import { Box, TextField, Typography, Switch, Divider, IconButton, } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";


const PropertiesPanel = ({ selectedField, handleFieldChange, onClose }) => {
    if (!selectedField) return null;

    // Determinar si el campo seleccionado es una sección o un campo normal
    const isSection = selectedField.hasOwnProperty("sectionTitle");

    return (
        <Box
            sx={{
                width: "100% ",
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
                    {selectedField.type === "select" && (
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
                            sx={{ marginBottom: "16px" }}
                        />
                    )}
                    <Switch
                        checked={!!selectedField.required}
                        onChange={(e) => handleFieldChange("required", e.target.checked)}
                    />
                    <Typography>Requerido</Typography>
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
