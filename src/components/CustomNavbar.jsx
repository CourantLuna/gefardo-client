import React, { useState } from 'react';
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
  Avatar,
} from '@mui/material';
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

}) {
  const [anchorEl, setAnchorEl] = useState(null); // Controla el menú desplegable del perfil

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    onLogout(); // Llamamos a la función onLogout pasada como prop
    handleClose(); // Cerramos el menú
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
                {NombreUsuario}
              </Typography>
              <IconButton

                onClick={handleProfileMenuOpen}
                sx={{
                  ml: 1,
                }}
              >

                <Avatar alt="Profile" src="https://mui.com/static/images/avatar/1.jpg" />
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
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <Person fontSize="small" />
                  </ListItemIcon>
                  Perfil
                </MenuItem>

                <Divider />

                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <LockResetIcon fontSize="small" />
                  </ListItemIcon>
                  Cambiar Contraseña
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
