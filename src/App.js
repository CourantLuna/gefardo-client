import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';

import CustomNavbar from './components/CustomNavbar';
import CustomDrawer from './components/CustomDrawer';
import { Box, CssBaseline, createTheme, ThemeProvider, Typography } from '@mui/material';

const drawerWidth = 240;
const collapsedWidth = 60;

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedPage, setSelectedPage] = useState({ segment: 'dashboard', title: 'Inicio' });

  // Crear tema dinámico
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  const handleToggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleNavigationClick = (page) => {
    setSelectedPage(page);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box>
          {/* Navbar - Siempre ocupa todo el ancho */}
          <CustomNavbar
            appName="Gefardo"
            onMenuClick={handleToggleDrawer}
            darkMode={darkMode}
            onToggleDarkMode={handleToggleDarkMode}
            selectedPage={selectedPage}
            onNavigationClick={handleNavigationClick} // Lógica de navegación
          />

          {/* Drawer - Controla la navegación también */}
          <CustomDrawer
            isOpen={drawerOpen}
            onPageChange={handleNavigationClick} // Lógica de navegación
            selectedPage={selectedPage} // Página seleccionada
          />

          {/* Contenido principal */}
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              marginLeft: drawerOpen
                ? `${drawerWidth}px`
                : `${collapsedWidth}px`, // Ajusta según el estado del Drawer
              transition: "margin-left 0.3s", // Transición suave
              overflowX: "hidden", // Previene desbordamientos horizontales
              display: "flex", // Habilita diseño flexible
              justifyContent: "center", // Centrado horizontal
              flexDirection: "column",
              textAlign: "center",
              marginBottom: 2, // Espacio inferior para separación
            }}
          >
            {/* Contenido dinámico según la página seleccionada */}
            <Typography
  variant="h4"
  sx={{
    fontWeight: 'bold',
    marginBottom: 1, // Espacio entre título y subrayado
  }}
>
  {selectedPage.title.toUpperCase()}
</Typography>

            <Box
              sx={{
                alignSelf: "center",
                width: "50px", // Longitud de la línea subrayada
                height: "4px", // Grosor de la línea
                backgroundColor: theme.palette.primary.main, // Color dinámico según el tema
                borderRadius: "4px", // Bordes redondeados
                marginBottom: 2, // Espacio inferior para separación
              }}
            ></Box>
            {/* Aquí puedes agregar el contenido dinámico según la página */}
            <Typography variant="body1">
              This is the content for
               {selectedPage.title}
            </Typography>
          </Box>


        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
