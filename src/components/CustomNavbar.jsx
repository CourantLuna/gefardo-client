import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Menu,
  MenuItem,
  Fab,
  ListItemIcon,
  Divider,
  Avatar,  useTheme

} from '@mui/material';
import { useNavigate  } from 'react-router-dom';
import userService
 from "../services/userService";
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import LockResetIcon from '@mui/icons-material/LockReset';import Logout from '@mui/icons-material/Logout';
import Person from '@mui/icons-material/Person';

function CustomNavbar({
  appName,
  onMenuClick,
  darkMode,
  onToggleDarkMode,
  onLogout,
  showMenuButton = true, // Default: show the menu button
  showProfileButton = true, // Default: show the profile button
  NombreUsuario,
  ApellidosUsuario,
  FotoPerfil,
  // VerPerfil
}) {
  const [anchorEl, setAnchorEl] = useState(null); // Controla el menú desplegable del perfil
  const navigate = useNavigate();
   const [userId, setUserId] = useState();
    const [userInfo, setUserInfo] = useState({});
  const theme = useTheme();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const NavigateToPerfil = () => {
   
    navigate(`/gefardo/ver-perfil`);
    handleClose();
};

  const handleLogout = () => {
    onLogout(); // Llamamos a la función onLogout pasada como prop
    handleClose(); // Cerramos el menú
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  
  useEffect(() => {
    const fetchUserInfo = async () => {
        try {
            const usuario = await userService.getUsuarioById(userId);
            console.log("Información del usuario antes de setUserInfo:", usuario);
            setUserInfo(usuario);
        } catch (error) {
            console.error("Error al obtener la información del usuario:", error);
        }
    };
    if (userId) fetchUserInfo();
}, [userId]);


  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '64px' }}>
      <AppBar position="fixed">
        <Toolbar>
          {/* Menu Button (Opcional) */}
          {showMenuButton && (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={onMenuClick}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* App Name */}
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <img
              src="https://mui.com/static/logo.png"
              alt="Logo"
              style={{ width: 32, height: 32, marginRight: 8 }}
            />
            {appName}
          </Typography>

          {/* Profile Button (Opcional) */}
          {showProfileButton && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography sx={{
                display: {
                  xs: 'none', // Oculta en pantallas pequeñas
                  sm: 'flex', // Muestra en pantallas medianas y grandes
                },
              }} variant="h6">
                {`${NombreUsuario} ${ApellidosUsuario}`}              </Typography>
              <IconButton

                onClick={handleProfileMenuOpen}
                sx={{
                  ml: 1,
                }}
              >

                <Avatar  alt={userInfo.Nombre} 
                src={FotoPerfil || userInfo.Foto_Perfil}
                 />
              </IconButton>

              {/* Profile Menu */}
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem onClick={NavigateToPerfil}>
                  <ListItemIcon>
                    <Person fontSize="small" />
                  </ListItemIcon>
                  Ver perfil
                </MenuItem>

                <Divider />

                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <LockResetIcon fontSize="small" />
                  </ListItemIcon>
                  Cambiar contraseña
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Cerrar sesión
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Floating Action Button (FAB) */}
      <Fab
        color="primary"
        aria-label="toggle-theme"
        onClick={onToggleDarkMode}
        sx={{
          position: 'fixed',
          bottom: 16, // Espaciado desde el borde inferior
          right: 16, // Espaciado desde el borde derecho
          zIndex: 1200,
        }}
      >
        {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
      </Fab>
    </Box>
  );
}

export default CustomNavbar;
