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
    useTheme,
    Switch,
    Autocomplete

} from "@mui/material";

const Canvas = ({
    formFields,
    handleDrop,
    handleRemoveField,
    handleRemoveSection,
    onSelectField,
}) => {
    const theme = useTheme();
    

    return (
        <Box
            sx={{
                flex: 1,
                marginLeft: "15px",
                border: "1px dashed #ccc",
                minHeight: "700px",
                backgroundColor: theme.palette.mode === "dark" ? "#333" : theme.palette.background.default,
                boxShadow: theme.shadows[5], // Niveles de 0 a 24
                overflowX: "hidden", // Elimina scroll horizontal

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
{Array.isArray(formFields) && formFields.length > 0 ? (
            formFields.map((section, sectionIndex) => (
                <Paper
                    key={sectionIndex}
                    sx={{
                        marginBottom: "20px",
                        padding: "16px",
                        borderRadius: "8px",
                        backgroundColor: theme.palette.mode === "dark" ? "#333" : theme.palette.background.default,
                        boxShadow: theme.shadows[2], // Niveles de 0 a 24
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
                            <Typography variant="h6" gutterBottom paddingTop={1} display={"flex"} justifyContent={"center"} alignContent={"center"}>
                                {section.sectionTitle || "Nueva Sección"}
                            </Typography>
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

                    <Grid container spacing={1} sx={{ padding: "15px" }}>
                        {section.fields.map((field, fieldIndex) =>{
                                const xs = field.xs || 12; // Tamaño predeterminado
                                const sm = field.sm || 6;
                                const md = field.md || 4;
                            return (
                                <Grid item xs={xs} sm={sm} md={md} key={fieldIndex}>

                                <Paper
                                sx={{
                                    padding: "16px",
                                    position: "relative",
                                    cursor: "pointer",
                                    minHeight: "120px",
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
                                                        error={field.required } // Marca como error si el campo está vacío

                                                        disabled={field.IsThisFieldDisabled} // Aplica el valor de IsThisFieldDisabled o isDisabled
                                                        helperText={field.required  ? "campo obligatorio" : ""} // Mensaje de error


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
                                                        disabled={field.IsThisFieldDisabled}
                                                        error={field.required } // Marca como error si el campo está vacío

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
                                                        error={field.required } // Marca como error si el campo está vacío
                                                        disabled={field.IsThisFieldDisabled} // Aplica el valor de IsThisFieldDisabled o isDisabled
                                                        helperText={field.required  ? "campo obligatorio" : ""} // Mensaje de error


                                                    />

                                                );

                                            case "date":
                                            case "time":
                                            case "week":
                                            case "month":
                                            case "datetime-local":
                                            case "email":
                                                return (
                                                    // <Grid item xs={xs} sm={sm} md={md} key={field.name}>

                                                    <TextField
                                                        slotProps={{ inputLabel: { shrink: true } }}
                                                        key={field.name}
                                                        type={field.type}
                                                        disabled={field.IsThisFieldDisabled} // Aplica el valor de IsThisFieldDisabled o isDisabled
                                                        label={field.label}
                                                        required={field.required}
                                                        fullWidth
                                                        margin="normal"
                                                        error={field.required } // Marca como error si el campo está vacío
                                                        helperText={field.required  ? "campo obligatorio" : ""} // Mensaje de error


                                                    />
                                                    // </Grid>

                                                );

                                            case "number":
                                                return (
                                                    <TextField
                                                        fullWidth
                                                        type="number"
                                                        variant="outlined"
                                                        label={field.label}
                                                        disabled={field.IsThisFieldDisabled}
                                                        defaultValue={field.value}
                                                        error={field.required } // Marca como error si el campo está vacío
                                                        helperText={field.required  ? "campo obligatorio" : ""} // Mensaje de error

                                                    />
                                                );

                                            case "select":
                                                return (
                                                    <Select
                                                        fullWidth
                                                        defaultValue="">
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

                                                case "autocomplete":
                                                        return (
                                                        //   <Grid item xs={xs} sm={sm} md={md} key={field.name}>
                                                            <Autocomplete
                                                            disabled={field.IsThisFieldDisabled} // Aplica el valor de IsThisFieldDisabled o isDisabled
                                                                options={field.options || []}
                                                                getOptionLabel={(option) => option.label || ""}
                                                                renderInput={(params) => <TextField {...params} label={field.label} />}

                                                                sx={{ width: "100%" }}
                                                            />
                                                            //   </Grid>
                                                        );

                                                        case "file":
                                                                return (
                                                        
                                                                    <TextField
                                                                    key={field.name}
                                                                    disabled={field.IsThisFieldDisabled} // Aplica el valor de IsThisFieldDisabled o isDisabled
                                                                    type="file"
                                                                    label={field.label}
                                                                    InputLabelProps={{ shrink: true }}
                                                                    required={field.required}
                                                                    fullWidth
                                                                    margin="normal"
                                                                    error={field.required } // Marca como error si el campo está vacío
                                                                    helperText={field.required ? "campo obligatorio" : ""} // Mensaje de error
                                                                    />
                                                        
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
                                                            disabled={field.IsThisFieldDisabled } // Aplica el valor de IsThisFieldDisabled o isDisabled
                                                                key={i}
                                                                value={option.value}
                                                                control={<Radio />}
                                                                label={option.label || `Opción ${i + 1}`}
                                                            />
                                                        ))}
                                                    </RadioGroup>
                                                );

                                            

                                            case "switch":
                                                return (
                                                    <FormControlLabel
                                                    label={field.label || "Switch"}

                                                        control={
                                                            <Switch
                                                                checked={field.value} onChange={(e) => onSelectField({ sectionIndex, fieldIndex, field: { ...field, value: e.target.checked } })} name={field.name}
                                                            />
                                                        }
                                                    />
                                                );

                                                case "tel":
                                                        return (
                                                            <TextField
                                                              label={field.label}
                                                              type="tel"
                                                              disabled={field.IsThisFieldDisabled} // Aplica el valor de IsThisFieldDisabled o isDisabled
                                                              required={field.required}
                                                              error={field.required} // Marca como error si el campo está vacío
                                                              helperText={field.required ? "campo obligatorio" : ""} // Mensaje de error
                                                              fullWidth
                                                              margin="normal"
                                                    
                                                              inputProps={{ maxLength: 10 }} // Limita la entrada visible (incluyendo guiones)
                                                            />
                                                        );

                                                        case "id":
                                                                return (
                                                                    <TextField
                                                                      disabled={field.IsThisFieldDisabled } // Aplica el valor de IsThisFieldDisabled o isDisabled
                                                                      label={field.label}
                                                                      required={field.required}
                                                                      error={field.required } // Marca como error si el campo está vacío o si no tiene 11 dígitos
                                                                      helperText={
                                                                        field.required 
                                                                          ? "Debe tener exactamente 11 dígitos"
                                                                          : ""
                                                                      } // Mensaje de error específico
                                                                      fullWidth
                                                                      margin="normal"
                                                                     
                                                                      inputProps={{ maxLength: 11 }} // Limita la entrada visible (11 dígitos + 2 guiones)
                                                                    />
                                                                );

                                                                case "rnc":
                                                                        return (
                                                                         
                                                                            <TextField
                                                                              disabled={field.IsThisFieldDisabled} // Aplica el valor de IsThisFieldDisabled o isDisabled
                                                                              label={field.label}
                                                                              required={field.required}
                                                                              error={field.required } 
                                                                              helperText={
                                                                                field.required 
                                                                                  ? "Debe tener exactamente 9 dígitos"
                                                                                  : ""
                                                                              } // Mensaje de error específico
                                                                              fullWidth
                                                                              margin="normal"
                                                                              
                                                                              inputProps={{ maxLength: 11 }} // Limita la entrada visible (9 dígitos + 2 guiones)
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

                            );
                        } 
                            
                               
                        )}
                    </Grid>


                </Paper>
            )))

: (
  <Typography> No hay secciones disponibles.</Typography>
)}
        </Box>
    );
};

export default Canvas;
