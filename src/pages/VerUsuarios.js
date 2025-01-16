import React, { useState, useEffect } from "react";
import {
  Grid,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Snackbar,
  Alert,
  TextField,
  Box,
} from "@mui/material";
import userService from "../services/userService";
import UserCard from "../components/UserCard";

import {
  AdminPanelSettings,
  LocalPharmacy,
  VerifiedUser,
} from "@mui/icons-material"; // Íconos de roles

function VerUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [roles, setRoles] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [filterEstado, setFilterEstado] = useState("todos");
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
      setUsuarios((prev) =>
        prev.map((user) =>
          user.Id_Usuario === id ? { ...user, Estado: nuevoEstado } : user
        )
      );
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

  const handleSnackbarClose = () => setSnackbar({ ...snackbar, open: false });

  const filteredUsuarios = usuarios.filter((usuario) => {
    const matchesSearch = `${usuario.Nombre} ${usuario.Apellido}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesEstado =
      filterEstado === "todos" ||
      (filterEstado === "activo" && usuario.Estado) ||
      (filterEstado === "inactivo" && !usuario.Estado);

    return matchesSearch && matchesEstado;
  });

  return (
    <div>
      <Box margin={2} display="flex" gap={2}>
     
        <TextField
          fullWidth
          label="Buscar usuarios"
          type="search"
          variant="outlined"

          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        

<FormControl variant="outlined" sx={{ maxWidth: 200, minWidth: 110 }}>
        <InputLabel id="filter-estado-label">Estado</InputLabel>
        <Select
          labelId="filter-estado-label"
          value={filterEstado}
          onChange={(e) => setFilterEstado(e.target.value)}
          label="Estado"
        >
          
          <MenuItem value="todos">Todos</MenuItem>
            <MenuItem value="activo">Activos</MenuItem>
            <MenuItem value="inactivo">Inactivos</MenuItem>
        </Select>
      </FormControl>
       
      </Box>
      <Grid container spacing={3} padding={3}>
        {filteredUsuarios.map((usuario) => (
          <Grid item xs={12} sm={6} md={4} key={usuario.Id_Usuario}>
            <UserCard
              usuario={usuario}
              roles={roles}
              roleConfig={roleConfig}
              toggleEstado={toggleEstado}
            />
          </Grid>
        ))}
      </Grid>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </div>
  );
}

export default VerUsuarios;