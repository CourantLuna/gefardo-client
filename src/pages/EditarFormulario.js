import { Box, Button, Typography } from "@mui/material";
import CreateForm from "../pages/CrearFormulario";
import React from "react";
import { useLocation, useParams } from "react-router-dom";

  
const EditarFormulario = () => {
    const location = useLocation();
    const { id } = useParams();
    const initialFormData = location.state;
  
    return (
      <Box sx={{ padding: "16px" }}>
        <Typography variant="h4" gutterBottom>
          Editar Formulario (ID: {id})
        </Typography>
        {initialFormData ? (
          <CreateForm initialFormData={initialFormData} isEditMode={true} />
        ) : (
          <Typography variant="body1">Cargando formulario...</Typography>
        )}
      </Box>
    );
  };
  
  export default EditarFormulario;
  