import React, { useState } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Collapse,
  Typography,
  useTheme,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import PersonIcon from '@mui/icons-material/Person';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SettingsIcon from '@mui/icons-material/Settings';
import ReceiptIcon from '@mui/icons-material/Receipt';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const drawerWidth = 300;
const collapsedWidth = 85;

const NAVIGATION = [
  // Sección de Inicio
  { type: 'title', title: 'Home' },
  {
    segment: 'dashboard',
    title: 'Inicio',
    icon: <DashboardIcon />,
  },
  { type: 'divider' },

  // Sección de Gestión
  { type: 'title', title: 'Gestión' },
  {
    segment: 'solicitudes',
    title: 'Solicitudes',
    icon: <ShoppingCartIcon />,
    children: [
      { segment: 'revisar-solicitudes', title: 'Revisar solicitudes', icon: <ReceiptIcon /> }, // Administrador
      { segment: 'crear-solicitudes', title: 'Crear solicitudes', icon: <ReceiptIcon /> }, // Farmacéutico
      { segment: 'consultar-estado', title: 'Consultar estado', icon: <ReceiptIcon /> }, // Farmacéutico
    ],
  },
  {
    segment: 'inspecciones',
    title: 'Inspecciones',
    icon: <BarChartIcon />,
    children: [
      { segment: 'ver-asignadas', title: 'Ver asignadas', icon: <TrendingUpIcon /> }, // Inspector
      { segment: 'programar-inspecciones', title: 'Programar inspecciones', icon: <TrendingUpIcon /> }, // Administrador
      { segment: 'completar-inspecciones', title: 'Completar inspecciones', icon: <TrendingUpIcon /> }, // Inspector
    ],
  },
  {
    segment: 'seguimiento',
    title: 'Seguimiento',
    icon: <LayersIcon />,
    children: [
      { segment: 'ver-acciones', title: 'Ver acciones', icon: <ReceiptIcon /> }, // Farmacéutico
      { segment: 'crear-acciones', title: 'Crear acciones', icon: <ReceiptIcon /> }, // Administrador/Inspector
      { segment: 'actualizar-acciones', title: 'Actualizar acciones', icon: <ReceiptIcon /> }, // Administrador/Inspector
    ],
  },
  {
    segment: 'usuarios',
    title: 'Usuarios',
    icon: <PersonIcon />,
    children: [
      { segment: 'crear-usuario', title: 'Crear usuario', icon: <PersonAddIcon /> }, // Administrador
      { segment: 'modificar-usuario', title: 'Modificar usuario', icon: <SettingsIcon /> }, // Administrador
    ],
  },
  { type: 'divider' },

  // Sección de Reportes
  { type: 'title', title: 'Reportes' },
  {
    segment: 'reportes',
    title: 'Reportes',
    icon: <BarChartIcon />,
    children: [
      { segment: 'ver-inspecciones', title: 'Ver inspecciones', icon: <TrendingUpIcon /> }, // Administrador
      { segment: 'ver-historial', title: 'Ver historial', icon: <ReceiptIcon /> }, // Administrador
    ],
  },
 
];

function CustomDrawer({ isOpen, onPageChange, selectedPage }) {
  const theme = useTheme();
  const [expanded, setExpanded] = useState({});

  const handleToggle = (segment) => {
    setExpanded((prev) => ({
      ...prev,
      [segment]: !prev[segment],
    }));
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: isOpen ? drawerWidth : collapsedWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: isOpen ? drawerWidth : collapsedWidth,
          boxSizing: 'border-box',
          marginTop: { xs: '56px', sm: '64px' },
          overflowX: 'hidden',
          overflowY: 'auto',
          transition: 'width 0.3s',
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
        },
      }}
    >
      <Box>
        <List>
          {NAVIGATION.map((item, index) => {
            if (item.type === 'title') {
              return (
                <Typography
                  key={index}
                  variant="subtitle2"
                  sx={{
                    px: isOpen ? 2 : 0,
                    py: 1,
                    color: theme.palette.text.secondary,
                    fontWeight: 'bold',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {isOpen ? item.title : null}
                </Typography>
              );
            }

            if (item.type === 'divider') {
              return <Divider key={index} />;
            }

            const isSelected = selectedPage?.segment === item.segment;

            if (!item.children) {
              return (
                <ListItem
                  button
                  key={index}
                  onClick={() => onPageChange({ segment: item.segment, title: item.title })}
                  sx={{
                    backgroundColor: isSelected ? theme.palette.action.selected : 'transparent',
                    '&:hover': {
                      backgroundColor: theme.palette.action.hover,
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: isSelected ? theme.palette.primary.main : theme.palette.text.disabled,
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  {isOpen && (
                    <ListItemText
                      primary={item.title}
                      sx={{
                        color: isSelected
                          ? theme.palette.primary.main
                          : theme.palette.text.primary,
                      }}
                    />
                  )}
                </ListItem>
              );
            }

            return (
              <React.Fragment key={index}>
                <ListItem
                  button
                  onClick={() => handleToggle(item.segment)}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: isOpen ? 'space-between' : 'flex-start',
                    backgroundColor: expanded[item.segment]
                      ? theme.palette.action.hover
                      : 'transparent',
                    '&:hover': {
                      backgroundColor: theme.palette.action.hover,
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: expanded[item.segment]
                        ? theme.palette.primary.main // Icono seleccionado
                        : theme.palette.text.disabled, // Icono no seleccionado
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    {item.icon}
                    {!isOpen && (
                      <Box
                        component="span"
                        sx={{
                          position: 'absolute',
                          right: -5, // Ajuste para posicionar el ícono cerca del principal
                          color: theme.palette.text.secondary,
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        {expanded[item.segment] ? (
                          <ExpandLessIcon fontSize="small" />
                        ) : (
                          <ExpandMoreIcon fontSize="small" />
                        )}
                      </Box>
                    )}
                  </ListItemIcon>

                  {isOpen && (
                    <ListItemText
                      primary={item.title}
                      sx={{
                        color: theme.palette.text.primary,
                      }}
                    />
                  )}

                  {isOpen && (
                    expanded[item.segment] ? (
                      <ExpandLessIcon sx={{ color: theme.palette.text.primary }} />
                    ) : (
                      <ExpandMoreIcon sx={{ color: theme.palette.text.disabled }} />
                    )
                  )}
                </ListItem>

                <Collapse in={expanded[item.segment]} timeout="auto" unmountOnExit>
                  <List disablePadding>
                    {item.children.map((child, childIndex) => {
                      const isChildSelected = selectedPage?.segment === child.segment;

                      return (
                        <ListItem
                          button
                          key={childIndex}
                          onClick={() =>
                            onPageChange({ segment: child.segment, title: child.title })
                          }
                          sx={{
                            pl: 4,
                            backgroundColor: isChildSelected
                              ? theme.palette.action.selected
                              : 'transparent',
                            '&:hover': {
                              backgroundColor: theme.palette.action.hover,
                            },
                          }}
                        >
                          <ListItemIcon
                            sx={{
                              color: isChildSelected
                                ? theme.palette.primary.main
                                : theme.palette.text.disabled,
                            }}
                          >
                            {child.icon}
                          </ListItemIcon>
                          {isOpen && (
                            <ListItemText
                              primary={child.title}
                              sx={{
                                color: isChildSelected
                                  ? theme.palette.primary.main
                                  : theme.palette.text.primary,
                              }}
                            />
                          )}
                        </ListItem>
                      );
                    })}
                  </List>
                </Collapse>
              </React.Fragment>
            );
          })}
        </List>
      </Box>
    </Drawer>
  );
}

export default CustomDrawer;
