import React from "react";
import {
  Box,
  Paper,
  Typography,
  Grid,
  Button,
  Switch,
  TextField,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

const Canvas = ({ formFields, handleDrop, handleRemoveField, onSelectField }) => {
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
      onDrop={handleDrop}
    >
      {/* Mostrar mensaje si no hay campos */}
      {formFields.length === 0 && (
        <Typography variant="body1" align="center" sx={{ color: "#999" }}>
          Arrastra un componente aquí para empezar
        </Typography>
      )}

      <Grid container spacing={2}>
        {formFields.map((field, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper
              sx={{
                padding: "16px",
                position: "relative",
                cursor: "pointer",
                border: "1px solid #ddd",
                "&:hover": { boxShadow: 2 },
              }}
              onClick={() => onSelectField(index)}
            >
              <Typography variant="body1" sx={{ marginBottom: "8px", fontWeight: "bold" }}>
                {field.label || "Campo sin Nombre"}
              </Typography>

              {/* Renderizar diferentes tipos de campos */}
              {field.type === "text" && (
                <TextField fullWidth placeholder={field.label || "Texto"} disabled />
              )}
              {field.type === "textarea" && (
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  placeholder={field.label || "Área de Texto"}
                  
                />
              )}
              {field.type === "select" && (
                <Select fullWidth value="" displayEmpty >
                  <MenuItem value="" >
                    {field.label || "Seleccionar"}
                  </MenuItem>
                  {field.options?.map((option, i) => (
                    <MenuItem key={i} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              )}
              {field.type === "autocomplete" && (
                <TextField
                  fullWidth
                  placeholder={field.label || "Autocomplete"}
                  
                />
              )}
              {field.type === "date" && <TextField type="date" fullWidth  />}
              {field.type === "number" && (
                <TextField type="number" fullWidth placeholder={field.label || "Número"}  />
              )}
              {field.type === "checkbox" && (
                <FormControlLabel
                  control={<Checkbox  />}
                  label={field.label || "Opción"}
                />
              )}
              {field.type === "radio" && (
                <RadioGroup>
                  {(field.options || ["Opción 1", "Opción 2"]).map((option, i) => (
                    <FormControlLabel
                      key={i}
                      control={<Radio  />}
                      label={option.label || option}
                    />
                  ))}
                </RadioGroup>
              )}
              {field.type === "switch" && (
                <FormControlLabel
                  control={<Switch  />}
                  label={field.label || "Switch"}
                />
              )}
              {field.type === "button" && (
                <Button variant="contained" fullWidth >
                  {field.label || "Botón"}
                </Button>
              )}
              {field.type === "file" && (
                <TextField type="file" fullWidth  InputLabelProps={{ shrink: true }} />
              )}
              {field.type === "email" && (
                <TextField type="email" fullWidth placeholder={field.label || "Correo"}  />
              )}
              {field.type === "tel" && (
                <TextField type="tel" fullWidth placeholder={field.label || "Teléfono"}  />
              )}
              {field.type === "id" && (
                <TextField fullWidth placeholder={field.label || "ID"}  />
              )}
              {field.type === "rnc" && (
                <TextField fullWidth placeholder={field.label || "RNC"}  />
              )}

              {/* Botón para eliminar campo */}
              <Button
                size="small"
                color="error"
                variant="text"
                sx={{ position: "absolute", top: 8, right: 8 }}
                onClick={(e) => {
                  e.stopPropagation(); // Evitar que se seleccione el campo al eliminarlo
                  handleRemoveField(index);
                }}
              >
                X
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Canvas;
