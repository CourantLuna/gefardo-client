import React, { useState, useContext } from 'react';
import CustomNavbar from '../components/CustomNavbar';
import CustomDrawer from '../components/CustomDrawer';
import { Box, CssBaseline, createTheme, ThemeProvider, Typography } from '@mui/material';
import { AuthContext } from '../context/authContext'; // Importa el AuthContext

const drawerWidth = 240;
const collapsedWidth = 60;

function GefardoPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedPage, setSelectedPage] = useState({ segment: 'dashboard', title: 'Inicio' });

  const { logout } = useContext(AuthContext); // Obtiene la función logout del contexto

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
      <Box>
        {/* Navbar */}
        <CustomNavbar
          appName="Gefardo"
          onMenuClick={handleToggleDrawer}
          darkMode={darkMode}
          onToggleDarkMode={handleToggleDarkMode}
          selectedPage={selectedPage}
          onLogout={logout} // Usa el logout del contexto
        />

        {/* Drawer */}
        <CustomDrawer
          isOpen={drawerOpen}
          onPageChange={handleNavigationClick}
          selectedPage={selectedPage}
          userRole="Administrador"
        />

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            marginLeft: drawerOpen ? `${drawerWidth}px` : `${collapsedWidth}px`,
            transition: 'margin-left 0.3s',
            overflowX: 'hidden',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 'bold',
              marginBottom: 1,
            }}
          >
            {selectedPage.title.toUpperCase()}
          </Typography>
          <Box
            sx={{
              alignSelf: 'center',
              width: '50px',
              height: '4px',
              backgroundColor: theme.palette.primary.main,
              borderRadius: '4px',
              marginBottom: 2,
            }}
          ></Box>
          <Typography variant="body1">This is the content for {selectedPage.title}.</Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default GefardoPage;
