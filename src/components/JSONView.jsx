import React from "react";
import { Box, Typography } from "@mui/material";

const JSONView = ({ formFields }) => {
  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5",
        padding: "16px",
        marginTop: "16px",
        textAlign: "left",
      }}
    >
      <Typography variant="h6">JSON Generado</Typography>
      <pre>{JSON.stringify(formFields, null, 2)}</pre>
    </Box>
  );
};

export default JSONView;
