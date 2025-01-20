import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation  } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import CustomNavbar from '../components/CustomNavbar';
import CustomDrawer from '../components/CustomDrawer';
import { Box, CssBaseline, createTheme, ThemeProvider, Typography } from '@mui/material';
import { AuthContext } from '../context/authContext'; // Importa el AuthContext
import AuthService from '../services/authService'; // Importa AuthService
import userService from '../services/userService';

import NAVIGATION from '../navigationConfig';

const drawerWidth = 280;
const collapsedWidth = 60;

// export const NAVIGATION = [
//   { type: 'title', title: 'Home', roles: ['Administrador', 'Inspector', 'Farmaceutico'] },
//   {
//     segment: 'dashboard',
//     title: 'Inicio',
//     icon: <DashboardIcon />,
//     roles: ['Administrador', 'Inspector', 'Farmaceutico'],
//   },
//   { type: 'divider', roles: ['Administrador', 'Inspector', 'Farmaceutico'] },
//   { type: 'title', title: 'Gestión', roles: ['Administrador', 'Inspector', 'Farmaceutico'] },
//   {
//     segment: 'solicitudes',
//     title: 'Solicitudes',
//     icon: <ShoppingCartIcon />,
//     roles: ['Administrador', 'Farmaceutico'],
//     children: [
//       { segment: 'revisar-solicitudes', title: 'Revisar solicitudes', icon: <ReceiptIcon />, roles: ['Administrador'] },
//       { segment: 'crear-solicitudes', title: 'Crear solicitudes', icon: <ReceiptIcon />, roles: ['Farmaceutico'] },
//       { segment: 'consultar-estado', title: 'Consultar estado', icon: <ReceiptIcon />, roles: ['Farmaceutico'] },
//     ],
//   },
//   {
//     segment: 'inspecciones',
//     title: 'Inspecciones',
//     icon: <BarChartIcon />,
//     roles: ['Administrador', 'Inspector'],
//     children: [
//       { segment: 'ver-asignadas', title: 'Ver asignadas', icon: <TrendingUpIcon />, roles: ['Inspector'] },
//       { segment: 'programar-inspecciones', title: 'Programar inspecciones', icon: <TrendingUpIcon />, roles: ['Administrador'] },
//       { segment: 'completar-inspecciones', title: 'Completar inspecciones', icon: <TrendingUpIcon />, roles: ['Inspector'] },
//     ],
//   },
//   {
//     segment: 'usuarios',
//     title: 'Usuarios',
//     icon: <PersonIcon />,
//     roles: ['Administrador'],
//     children: [
//       { segment: 'ver-usuarios', title: 'Ver usuarios', icon: <SettingsIcon />, roles: ['Administrador'] },
//       { segment: 'crear-usuario', title: 'Crear usuario', icon: <PersonAddIcon />, roles: ['Administrador'] },
//     ],
//   },
// ];

function GefardoPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedPage, setSelectedPage] = useState({
    segment: "dashboard",
    title: "Inicio",
  });
  const [userRolesPasados = [], setUserRoles] = useState([]); // Cambia userRole a userRoles como array
  const [userId, setUserId] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const location = useLocation(); // Hook para obtener la ruta actual

  const { logout } = useContext(AuthContext); // Obtiene la función logout del contexto

  // Sincronizar el estado de la página seleccionada con la URL actual
  useEffect(() => {
    const currentPath = location.pathname.replace("/gefardo/", ""); // Obtén el segmento actual
    const findPage = (navItems, path) => {
      for (const item of navItems) {
        if (item.segment === path) return item;
        if (item.children) {
          const child = findPage(item.children, path);
          if (child) return child;
        }
      }
      return null;
    };

    const page = findPage(NAVIGATION, currentPath) || {
      segment: "dashboard",
      title: "Inicio",
    };
    setSelectedPage(page);
  }, [location.pathname]); // Se ejecuta cuando cambia la URL

  useEffect(() => {
    try {
      const id = AuthService.getUserId();
      console.log("ID del usuario:", id);
      setUserId(id); // Guarda el ID en el estado

      const fetchUserInfo = async () => {
        try {
          setLoading(true); // Inicia la carga
          setError(null); // Limpia errores previos
          const usuario = await userService.getUsuarioById(userId); // Llama al servicio
          setUserInfo(usuario); // Establece la información del usuario
          console.log("Información del usuario:", usuario);
        } catch (err) {
          setError(err.message); // Maneja el error
        } finally {
          setLoading(false); // Finaliza la carga
        }
      };

      if (userId) {
        fetchUserInfo(); // Llama a la función si se proporciona un ID

      }
    } catch (err) {
      console.error('Error al obtener el ID del usuario:', err.message);
    }

    
  }, [userId]);

  // Obtener el rol del usuario cuando la página se carga
  useEffect(() => {
    const roles = AuthService.getUserRoles();
    if (!roles || roles.length === 0) {
      console.warn("No se encontraron roles, asignando rol predeterminado.");
      // setUserRoles(['Farmaceutico']); // Rol predeterminado
    } else {
      console.log("Roles del usuario:", roles);

      setUserRoles(roles);
    }
  }, []);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
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
    if (page.segment) {
      navigate(`/gefardo/${page.segment}`);
    }
  };
  // const NavigateToPerfil = () => {
   
  //     navigate(`/gefardo/ver-perfil`);
  // };

  // Encuentra el componente correspondiente para renderizar en el contenido principal

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
          NombreUsuario={userInfo?.Nombre || "Invitado"} // Valor predeterminado
          ApellidosUsuario={userInfo?.Apellido || ""}
          // VerPerfil={NavigateToPerfil}
        />

        {/* Drawer */}
        <CustomDrawer
          isOpen={drawerOpen}
          onPageChange={handleNavigationClick}
          selectedPage={selectedPage}
          userRoles={userRolesPasados} // Pasa el rol del usuario al drawer
          navigationConfig={NAVIGATION}
        />

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            marginLeft: drawerOpen ? `${drawerWidth}px` : `${collapsedWidth}px`,
            transition: "margin-left 0.3s",
            overflowX: "hidden",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              marginBottom: 1,
            }}
          >
            {selectedPage.title.toUpperCase()}
          </Typography>
          <Box
            sx={{
              alignSelf: "center",
              width: "50px",
              height: "4px",
              backgroundColor: theme.palette.primary.main,
              borderRadius: "4px",
              marginBottom: 2,
            }}
          ></Box>
          {/* <Typography variant="body1">
            This is the content for {selectedPage.title}.
          </Typography> */}
          {/* Contenido dinámico */}
          <Outlet />
          {loading && <p>Cargando información del usuario...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
          
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default GefardoPage;
