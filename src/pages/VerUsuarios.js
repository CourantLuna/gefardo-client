import React, { useState, useEffect } from "react";
import {
  Grid,
  Snackbar,
  Alert,
  Box,
  Paper, Typography
} from "@mui/material";
import userService from "../services/userService";
import UserCard from "../components/UserCard";
import SearchBar from "../components/SearchBar";
import FilterAutocomplete from "../components/FilterAutocomplete";

import {
  AdminPanelSettings,
  LocalPharmacy,
  VerifiedUser,
} from "@mui/icons-material"; // Íconos de roles

function VerUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [filteredUsuarios, setFilteredUsuarios] = useState([]);

  const [roles, setRoles] = useState({});

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const roleConfig = {
    3: { name: "Inspector", color: "warning", icon: <VerifiedUser /> },
    4: { name: "Administrador", color: "primary", icon: <AdminPanelSettings /> },
    5: { name: "Farmaceutico", color: "success", icon: <LocalPharmacy /> },
  };

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const data = await userService.getUsuarios();
        setUsuarios(data);
        setFilteredUsuarios(data);

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
          justifyContent: "space-between",
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
        <Typography variant="body1"  color="initial">
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
    </Box>
  );
}

export default VerUsuarios;