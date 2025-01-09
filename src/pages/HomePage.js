import React, { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import CustomNavbar from "../components/CustomNavbar";

import { Box, CssBaseline, createTheme, ThemeProvider } from "@mui/material";
import LoginPage from "../components/LoginForm"; // Asegúrate de que el formulario esté exportado correctamente

function HomePage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const { isAuthenticated, logout } = useContext(AuthContext);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  

  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box>
        <CustomNavbar
          appName="Gefardo"
          darkMode={darkMode}
          onToggleDarkMode={handleToggleDarkMode}
          onLogout={logout} // Pasamos logout del contexto
          showMenuButton={false} // Oculta el menú hamburguesa
          showProfileButton={false} // Muestra la foto de perfil
          showEnablePharmacyButton={true} // Mostrar el botón Habilitar Farmacia

        />

        {/* Main Content */}
        <Box
          sx={{
            display: "flex",
            justifyItems: "center",
            alignItems: "center",
            minHeight: "calc(100vh - 64px)", // Subtract Navbar height
          }}
        >
          {/* Login Form */}
          {!isAuthenticated && (
            
              <LoginPage />
          )}

          {/* If authenticated, you can replace this with dashboard content */}
          {isAuthenticated && <h1>Bienvenido al sistema Gefardo</h1>}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default HomePage;
