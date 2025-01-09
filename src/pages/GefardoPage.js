import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/authContext';
import CustomNavbar from '../components/CustomNavbar';
import CustomDrawer from '../components/CustomDrawer';
import { Box, CssBaseline, createTheme, ThemeProvider, Typography } from '@mui/material';

const drawerWidth = 240;
const collapsedWidth = 60;

function GefardoPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedPage, setSelectedPage] = useState({ segment: 'dashboard', title: 'Inicio' });
  const { logout } = useContext(AuthContext); // Usamos el contexto

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
        <CustomNavbar
          appName="Gefardo"
          onMenuClick={handleToggleDrawer}
          darkMode={darkMode}
          onToggleDarkMode={handleToggleDarkMode}
          onLogout={logout} // Pasamos logout del contexto
        />
        <CustomDrawer
          isOpen={drawerOpen}
          onPageChange={handleNavigationClick}
          selectedPage={selectedPage}
          userRole="Administrador"
        />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            marginLeft: drawerOpen ? `${drawerWidth}px` : `${collapsedWidth}px`,
            transition: 'margin-left 0.3s',
            overflowX: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
            {selectedPage.title.toUpperCase()}
          </Typography>
          <Typography variant="body1">This is the content for {selectedPage.title}</Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default GefardoPage;
