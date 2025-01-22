import React from "react";
import { Box, Typography, useTheme } from "@mui/material";

const JSONView = ({ formFields }) => {
            const theme = useTheme();
    
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.mode === "dark" ? "#333" : "#f5f5f5",
        padding: "16px",
        textAlign: "left",
        minWidth: "250px",
        height: "100%",
        overflow: "auto",
        boxShadow: theme.shadows[5], // Niveles de 0 a 24
        
      }}
    >
      <Typography variant="body1">JSON Generado</Typography>
      <pre>{JSON.stringify(formFields, null, 2)}</pre>
    </Box>
  );
};

export default JSONView;