import React, { useState, useEffect } from "react";
import bcrypt from 'bcryptjs'; // Asegúrate de importar bcryptjs

import {
  Grid,
  Snackbar,
  Alert,
  Box,
  Paper, Typography,
  Button
} from "@mui/material";
import userService from "../services/userService";
import UserCard from "../components/UserCard";
import SearchBar from "../components/SearchBar";
import FilterAutocomplete from "../components/FilterAutocomplete";


import DialogComponent from "../components/DialogComponent"; // Asegúrate de que la ruta sea correcta
import DynamicForm from '../components/CustomForm'; 

import {
  AdminPanelSettings,
  LocalPharmacy,
  VerifiedUser} from "@mui/icons-material"; // Íconos de roles
  import PersonAddIcon from '@mui/icons-material/PersonAdd';


function VerUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [filteredUsuarios, setFilteredUsuarios] = useState([]);
  const [roles, setRoles] = useState({});
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);
  
  
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const roleConfig = {
    3: { name: "Administrador", color: "warning", icon: <VerifiedUser /> },
    4: {
      name: "Inspector",
      color: "primary",
      icon: <AdminPanelSettings />,
    },
    5: { name: "Farmaceutico", color: "success", icon: <LocalPharmacy /> },
  };

  const UsuariosFields = [
    {
      "sectionTitle": "1. Información Personal",
      "divider": true,
      "fields": [
        {
          "name": "Cedula",
          "label": "Cédula",
          "type": "id",
          "required": true,
          "md": 6,
          "value": ""
        },
        {
          "name": "Nombre",
          "label": "Nombre",
          "type": "text",
          "required": true,
          "md": 6,
          "value": ""
        },
        {
          "name": "Apellido",
          "label": "Apellido",
          "type": "text",
          "required": true,
          "md": 6,
          "value": ""
        }
      ]
    },
    {
      "sectionTitle": "2. Credenciales",
      "divider": true,
      "fields": [
        {
          "name": "Correo_Electronico",
          "label": "Correo Electrónico",
          "type": "email",
          "required": true,
          "md": 6,
          "value": ""
        },
        {
          "name": "Clave",
          "label": "Contraseña",
          "type": "password",
          "required": true,
          "md": 6,
          "value": ""
        }
      ]
    },
    {
      "sectionTitle": "3. Estado del Usuario",
      "divider": true,
      "fields": [
        {
          "name": "Estado",
          "label": "Estado Activo",
          "type": "checkbox",
          "required": false,
          "options": ["Activo"],
          "md": 12,
          "value": []
        }
      ]
    }
  ]
  ; 

  const updateRoles = (userId, updatedRoles) => {
    setRoles((prevRoles) => ({
      ...prevRoles,
      [userId]: updatedRoles,
    }));
  };
  

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const data = await userService.getUsuarios();
        setUsuarios(data);
        setFilteredUsuarios(data);


        // fetchRoles
        const rolesData = await userService.getAllRoles();
        const rolesPorUsuario = rolesData.reduce((acc, { Id_Usuario, Id_Rol }) => {
          if (!acc[Id_Usuario]) acc[Id_Usuario] = [];
          acc[Id_Usuario].push(Id_Rol);
          return acc;
        }, {});

        setRoles(rolesPorUsuario);
        
        
      } catch (error) {
        console.error("Error al cargar usuarios:", error);
      }
    };

    fetchUsuarios();
  }, []);

  const toggleEstado = async (id, nombre, estadoActual) => {
    const nuevoEstado = !estadoActual;
    try {
      await userService.toggleEstado(id, nuevoEstado);
      setUsuarios((prev) => {
        const updatedUsuarios = prev.map((user) =>
          user.Id_Usuario === id ? { ...user, Estado: nuevoEstado } : user
        );
        setFilteredUsuarios(updatedUsuarios); // También actualiza la lista filtrada
        return updatedUsuarios;
      });
      

      
      setSnackbar({
        open: true,
        message: `El estado del usuario ${nombre} se actualizó con éxito.`,
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: `Error al actualizar el estado del usuario ${nombre}.`,
        severity: "error",
      });
    }
  };

  const handleAddUser = async (userData) => {
    try {
      // Encriptar la contraseña antes de enviar los datos
      const hashedPassword = await bcrypt.hash(userData.Clave, 10); // Genera el hash con un salt de 10
  
      const userWithHashedPassword = {
        ...userData,
        Clave: hashedPassword, // Reemplaza la contraseña con su hash
      };
  
      // Llamar al servicio para crear el usuario
      const newUser = await userService.addUser(userWithHashedPassword);
  
      // Mostrar mensaje de éxito
      setSnackbar({
        open: true,
        message: `El usuario ${userData.Nombre} se ha creado con éxito.`,
        severity: "success",
      });
  
      // Actualiza las listas de usuarios y usuarios filtrados
      setUsuarios((prevUsuarios) => [...prevUsuarios, newUser]);
      setFilteredUsuarios((prevFiltered) => [...prevFiltered, newUser]);
  
      handleDialogClose();
    } catch (error) {
      console.error('Error al crear el usuario:', error.message);
      setSnackbar({
        open: true,
        message: `Error al crear el usuario ${userData.Nombre}.`,
        severity: "error",
      });
    }
  };
  
  const handleAddRole = async (selectedRole, Id_Usuario) => {
    // Obtener roles actuales del usuario desde el estado global `roles`
    const currentRoles = roles[Id_Usuario] || [];
  
    // Validar que el rol seleccionado no esté duplicado
    if (selectedRole && !currentRoles.includes(parseInt(selectedRole))) {
      try {
        // Llamar al servicio para añadir el rol
        await userService.addRoleToUser(Id_Usuario, selectedRole);
  
        // Actualizar roles en el estado global
        const updatedRoles = [...currentRoles, parseInt(selectedRole)];
        updateRoles(Id_Usuario, updatedRoles);
  
        // Mostrar notificación de éxito
        setSnackbar({
          open: true,
          message: `Rol ${roleConfig[selectedRole].name} añadido con éxito al usuario.`,
          severity: "success",
        });
      } catch (error) {
        console.error("Error al añadir rol:", error.message);
  
        // Mostrar notificación de error
        setSnackbar({
          open: true,
          message: `Error al añadir rol ${roleConfig[selectedRole].name}.`,
          severity: "error",
        });
      }
    } else {
      // Mostrar mensaje si el rol ya existe o no se seleccionó
      setSnackbar({
        open: true,
        message: "El rol seleccionado ya está asignado al usuario o no es válido.",
        severity: "warning",
      });
    }
  };
  
  const handleDeleteChip = async (rolId, userId) => {
    alert(`Eliminando rol con ID ${rolId} del usuario ${userId}`);
    try {
      await userService.deleteRoleFromUser(userId, rolId);
  
      // Actualizar el estado de roles local
      setRoles((prevRoles) => {
        const updatedRoles = prevRoles[userId]?.filter((role) => role !== rolId) || [];
        return {
          ...prevRoles,
          [userId]: updatedRoles,
        };
      });
  
      setSnackbar({
        open: true,
        message: `Rol eliminado con éxito.`,
        severity: "success",
      });
    } catch (error) {
      console.error(`Error al eliminar rol:`, error.message);
      setSnackbar({
        open: true,
        message: `Error al eliminar el rol.`,
        severity: "error",
      });
    }
  };
  

  // Función para manejar el filtro de búsqueda
  const handleFilterChange = (filteredResults) => {
    setFilteredUsuarios(filteredResults);
  };

  const handleSnackbarClose = () => setSnackbar({ ...snackbar, open: false });

  return (
    <Box
      sx={{
        padding: "20px",
        borderRadius: "8px",
        marginLeft: "20px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginBottom: "20px",
          gap: "16px",
        }}
      >
        {/* SearchBar para buscar por nombre */}
        <SearchBar
          data={usuarios}
          onFilterChange={handleFilterChange}
          label="Buscar por nombre y apellido o cédula"
          filterKeys={["Nombre", "Apellido", "Cedula"]} // Filtrar por varios campos
        />

        {/* Botón Añadir Usuario */}
        <Box>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<PersonAddIcon />}
            onClick={handleDialogOpen}
          >
            Usuario
          </Button>
        </Box>
      </Box>

      {/* Seccion de filtros */}
      <Paper
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          padding: "15px",
          gap: "15px",
          fullWidth: "true",
        }}
      >
        <Typography variant="body1" >
          Filtrar por:
        </Typography>
        {/* FilterAutocomplete para filtrar por estado */}
        <FilterAutocomplete
          label="Estado"
          data={usuarios}
          filterKey="Estado"
          onFilterChange={handleFilterChange}
        />
      </Paper>

      {/* Cards para usuarios */}
      <Grid container spacing={3} padding={3}>
        {filteredUsuarios.map((usuario) => (
          <Grid item xs={12} sm={6} md={4} key={usuario.Id_Usuario}>
            <UserCard
              usuario={{ ...usuario }} // Asegura que el usuario actualizado se pase como nuevo objeto
              roles={roles}
              roleConfig={roleConfig}
              toggleEstado={toggleEstado}
              handleAddRole ={handleAddRole}
              handleDeleteRole={handleDeleteChip}
            />
          </Grid>
        ))}
      </Grid>

      {/* Snackbar para avisar estado final del cambio de estado */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>

      <DialogComponent open={isDialogOpen} onClose={handleDialogClose} title="">
        <Box
         sx={{
          width: 'fit-content', // Tamaño ajustado al contenido
          margin: '0 auto', // Centra automáticamente horizontalmente
        }}
        >
          <DynamicForm
            formFields={UsuariosFields}
            formTitle="Añadir Nuevo Usuario"
            labelButtonOnSubmit="Crear Nuevo Usuario"
            handleSendData = {handleAddUser}
          />
        </Box>
      </DialogComponent>

    </Box>
  );
}

export default VerUsuarios;