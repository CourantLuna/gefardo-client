import React, { useState } from 'react';
import {
  AppBar, Toolbar, IconButton, Typography, Box , Menu,
  MenuItem, Fab, ListItemIcon, Divider,
  Avatar,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import Person from '@mui/icons-material/Person';


function CustomNavbar({ appName, onMenuClick, darkMode, onToggleDarkMode, onLogout  }) {
  //const [darkMode, setDarkMode] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null); // Controla el menú desplegable del perfil

  //const handleThemeToggle = () => setDarkMode(!darkMode);
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    onLogout(); // Call the onLogout function passed from the parent
    handleClose(); // Close the menu
  };


  const handleClose = () => {
    setAnchorEl(null);
  };

  

  //  const theme = themeConfig(darkMode);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '64px' }}>
      <AppBar position="fixed">
        <Toolbar>
          {/* Menu Button */}
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

          {/* Navigation Buttons */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>

            {/* Profile Button */}
            <IconButton
              color="inherit"
              onClick={handleProfileMenuOpen}
              sx={{
                ml: 2,
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
                Perfil       </MenuItem>

              <Divider />

              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Configuracion
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Cerrar sesión
              </MenuItem>
            </Menu>

          </Box>
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
