import React, { useState, useEffect } from "react";
import {
  Box,
  Avatar,
  Typography,
  Grid,
  Paper,
  IconButton,
  Divider,
  useTheme, 

} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import BadgeIcon from "@mui/icons-material/Badge";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import AuthService from '../services/authService'; // Importa AuthService
import userService from '../services/userService';

const VerPerfil = () => {
  const [userId, setUserId] = useState();
  const [userInfo, setUserInfo] = useState({});
  const [rolUser, setRolUser] = useState({});
    const theme = useTheme();
  

  useEffect(() => {
    const id = AuthService.getUserId();
    console.log("ID del usuario:", id);
    setUserId(id); // Guarda el ID en el estado
  }, []);
  
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const usuario = await userService.getUsuarioById(userId); // Llama al servicio
        const rol = await userService.getRoles(userId); // Llama al servicio
        setUserInfo(usuario); // Establece la información del usuario
        setRolUser(rol); // Establece el rol del usuario
        console.log("Información del usuario:", usuario);
        console.log("Roles del usuario:", rol);
      } catch (error) {
        console.error("Error al obtener la información del usuario:", error);
      }
    };
  
    if (userId) {
      fetchUserInfo(); // Llama a la función si se proporciona un ID
    }
  }, [userId])

  return (
    <Box
      sx={{
        padding: "40px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "90vh",
      }}
    >
      <Paper
        sx={{
          padding: "40px",
          borderRadius: "12px",
          maxWidth: "1200px",
          width: "100%",
          boxShadow: theme.shadows[8] // Niveles de 0 a 24
        }}
      >
        <Grid container spacing={5}>
          <Grid item xs={12} md={6} display="flex" flexDirection="column" alignItems="center">
            <Box sx={{ position: "relative", display: "inline-block", mb: 4 }}>
              <Avatar
                alt={userInfo.Nombre}
                src={userInfo.avatarUrl}
                sx={{ width: 200, height: 200                    
                  ,boxShadow: theme.shadows[7] // Niveles de 0 a 24
                }}
                
              />
              <IconButton
                aria-label="Cambiar foto de perfil"
                sx={{
                  backgroundColor: theme.palette.background.paper,
                  position: "absolute",
                  bottom: 10,
                  right: 10,
                  borderColor: theme.palette.contrastThreshold,
                  zIndex: 1,
                  boxShadow: theme.shadows[4] // Niveles de 0 a 24
                }}
              >
                <CameraAltIcon color="primary" />
              </IconButton>
            </Box>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              {userInfo.Nombre || "Nombre"} {userInfo.Apellido || "Apellido"}
            </Typography>
            <Typography variant="h6" color="textSecondary">
            {rolUser && rolUser[0] && rolUser[0].Rol && rolUser[0].Rol.Nombre_Rol ? String(rolUser[0].Rol.Nombre_Rol) : "Rol no especificado"}
          </Typography>
          </Grid>

          {/* Línea divisoria */}
          <Grid item xs={1} display="flex" justifyContent="center">
            <Divider orientation="vertical" flexItem sx={{ height: '100%' }} />
          </Grid>

          <Grid item xs={12} md={5} display="flex" flexDirection="column" alignItems="flex-start" justifyContent="center">
            <Box display="flex" alignItems="center" mb={5}>
              <BadgeIcon color="primary" sx={{ mr: 2 }} />
              <Typography variant="h5">
                <strong>Estado:</strong> {userInfo.Estado || "No disponible"}
              </Typography>
            </Box>

            <Box display="flex" alignItems="center" mb={5}>
              <BadgeIcon color="primary" sx={{ mr: 2 }} />
              <Typography variant="h5">
                <strong>Cédula:</strong> {userInfo.Cedula || "No disponible"}
              </Typography>
            </Box>

            <Box display="flex" alignItems="center" mb={5}>
              <EmailIcon color="primary" sx={{ mr: 2 }} />
              <Typography variant="h5">
                <strong>Email:</strong> {userInfo.Correo_Electronico || "No disponible"}
              </Typography>
            </Box>

            <Box display="flex" alignItems="center" mb={5}>
              <PhoneIcon color="primary" sx={{ mr: 2 }} />
              <Typography variant="h5">
                <strong>Teléfono:</strong> {userInfo.Telefono || "No disponible"}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default VerPerfil;