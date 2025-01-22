import React from "react";
import {
    Box, Paper, Typography, Grid, Button, Divider,
    FormControlLabel,
    TextField,
    Select,
    MenuItem,
    Checkbox,
    RadioGroup,
    Radio,


} from "@mui/material";

const Canvas = ({
    formFields,
    handleDrop,
    handleRemoveField,
    handleRemoveSection,
    onSelectField, Switch
}) => {
    return (
        <Box
            sx={{
                flex: 1,
                padding: "16px",
                border: "1px dashed #ccc",
                minHeight: "500px",
                backgroundColor: "#f9f9f9",
                position: "relative",
            }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
                e.preventDefault();
                e.stopPropagation(); // Evita duplicados.
                handleDrop(e);
              }}
        >
            {formFields.length === 0 && (
                <Typography variant="body1" align="center" sx={{ color: "#999" }}>
                    Arrastra una sección aquí para empezar
                </Typography>
            )}

            {formFields.map((section, sectionIndex) => (
                <Box
                    key={sectionIndex}
                    sx={{
                        marginBottom: "24px",
                        border: "1px solid #ddd",
                        padding: "16px",
                        borderRadius: "8px",
                        backgroundColor: "#fff",
                    }}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => handleDrop(e, sectionIndex)} // Permite drop dentro de la sección

                >
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            cursor: "pointer", // Cambia el cursor a pointer
                        }}
                    >
                        {/* Título de la sección */}
                        <Button
                            onClick={() => onSelectField({ sectionIndex, section })} // Pasa la sección como `selectedField`
                        >
                            <Typography variant="h6">{section.sectionTitle || "Nueva Sección"}</Typography>
                        </Button>

                        <Button
                            size="small"
                            color="error"
                            onClick={(e) => {
                                e.stopPropagation(); // Evita que se seleccione al eliminar
                                handleRemoveSection(sectionIndex);
                            }}            >
                            Eliminar Sección
                        </Button>
                    </Box>


                    {section.divider && <Divider sx={{ marginY: "16px" }} />}

                    <Grid container spacing={2}>
                        {section.fields.map((field, fieldIndex) => (
                            <Grid item xs={12} sm={6} md={4} key={fieldIndex}>
                                <Paper
                                    sx={{
                                        padding: "16px",
                                        position: "relative",
                                        cursor: "pointer",
                                        border: "1px solid #ddd",
                                    }}
                                    onClick={() => onSelectField({ sectionIndex, fieldIndex, field })}
                                >
                                    <Typography
                                        variant="body1"
                                        sx={{ marginBottom: "8px", fontWeight: "bold" }}
                                    >
                                        {field.label || "Campo sin Nombre"}
                                    </Typography>

                                    {/* Renderiza el campo dinámicamente */}
                                    {(() => {
                                        switch (field.type) {
                                            case "text":
                                                return (
                                                    <TextField
                                                        fullWidth
                                                        variant="outlined"
                                                        label={field.label}
                                                        placeholder={field.label || "Texto"}
                                                    />
                                                );

                                            case "textarea":
                                                return (
                                                    <TextField
                                                        fullWidth
                                                        multiline
                                                        rows={4}
                                                        variant="outlined"
                                                        label={field.label}
                                                        placeholder={field.label || "Área de texto"}
                                                    />
                                                );

                                            case "number":
                                                return (
                                                    <TextField
                                                        fullWidth
                                                        type="number"
                                                        variant="outlined"
                                                        label={field.label}
                                                        placeholder={field.label || "Número"}
                                                    />
                                                );

                                            case "select":
                                                return (
                                                    <Select fullWidth defaultValue="">
                                                        <MenuItem value="" disabled>
                                                            {field.label || "Seleccionar"}
                                                        </MenuItem>
                                                        {field.options?.map((option, i) => (
                                                            <MenuItem key={i} value={option.value}>
                                                                {option.label}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                );

                                            case "checkbox":
                                                return (
                                                    <FormControlLabel
                                                        control={<Checkbox />}
                                                        label={field.label || "Checkbox"}
                                                    />
                                                );

                                            case "radio":
                                                return (
                                                    <RadioGroup>
                                                        {field.options?.map((option, i) => (
                                                            <FormControlLabel
                                                                key={i}
                                                                value={option.value}
                                                                control={<Radio />}
                                                                label={option.label || `Opción ${i + 1}`}
                                                            />
                                                        ))}
                                                    </RadioGroup>
                                                );

                                            case "date":
                                                return (
                                                    <TextField
                                                        fullWidth
                                                        type="date"
                                                        variant="outlined"
                                                        label={field.label || "Fecha"}
                                                    />
                                                );

                                            case "switch":
                                                return (
                                                    <FormControlLabel
                                                        control={
                                                            <Switch
                                                                checked={field.value} onChange={(e) => onSelectField({ sectionIndex, fieldIndex, field: { ...field, value: e.target.checked } })} name={field.name}
                                                            />
                                                        }
                                                        label={field.label || "Switch"}
                                                    />
                                                );

                                            default:
                                                return <Typography color="error">Tipo no soportado</Typography>;
                                        }
                                    })()}

                                    <Button
                                        size="small"
                                        color="error"
                                        variant="text"
                                        sx={{ position: "absolute", top: 8, right: 8 }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleRemoveField({ sectionIndex, fieldIndex });
                                        }}
                                    >
                                        X
                                    </Button>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>

                </Box>
            ))}
        </Box>
    );
};

export default Canvas;
