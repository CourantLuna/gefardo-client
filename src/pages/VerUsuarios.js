import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Snackbar,
  Alert,
  CardActions,
  Switch,
  TextField,
  Box,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import userService from "../services/userService";
import {
  AdminPanelSettings,
  LocalPharmacy,
  VerifiedUser,
} from "@mui/icons-material"; // Íconos de roles

function VerUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para la búsqueda
  const [error, setError] = useState(null);
  const [filterEstado, setFilterEstado] = useState("todos"); // Estado para el filtro

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success", // 'success', 'error', 'info', 'warning'
  });

  const [roles, setRoles] = useState({}); // Estado para los roles por usuario

  const roleConfig = {
    3: { name: "Inspector", color: "warning", icon: <VerifiedUser /> },
    4: {
      name: "Administrador",
      color: "primary",
      icon: <AdminPanelSettings />,
    },
    5: { name: "Farmaceutico", color: "success", icon: <LocalPharmacy /> },
  };

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        // Obtén todos los usuarios
        const data = await userService.getUsuarios();
        setUsuarios(data);

        const rolesData1 = await userService.getAllRoles();

        // Agrupar roles por Id_Usuario
        const rolesPorUsuario = rolesData1.reduce(
          (acc, { Id_Usuario, Id_Rol }) => {
            if (!acc[Id_Usuario]) acc[Id_Usuario] = [];
            acc[Id_Usuario].push(Id_Rol);
            return acc;
          },
          {}
        );

        console.log("Los roles por usuario: ", rolesPorUsuario);
        setRoles(rolesPorUsuario);
      } catch (error) {
        console.error("Error al cargar usuarios:", error);
        setError(
          "Hubo un problema al cargar los usuarios. Inténtalo de nuevo más tarde."
        );
      }
    };

    fetchUsuarios();
  }, []);

  const toggleEstado = async (id, nombre, estadoActual) => {
    const nuevoEstado = estadoActual === true ? false : true;
    try {
      await userService.toggleEstado(id, nuevoEstado);
      setUsuarios((prevUsuarios) =>
        prevUsuarios.map((user) =>
          user.Id_Usuario === id ? { ...user, Estado: nuevoEstado } : user
        )
      );
      setSnackbar({
        open: true,
        message: `El estado del usuario ${nombre} se actualizó con éxito a ${
          nuevoEstado ? "activo" : "inactivo"
        }.`,
        severity: "success",
      });
    } catch (error) {
      console.error("Error al cambiar estado:", error);
      setError("Hubo un problema al cambiar el estado del usuario.");
      setSnackbar({
        open: true,
        message: `Hubo un problema al actualizar el estado del usuario ${nombre}.`,
        severity: "error",
      });
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Filtrar usuarios según el término de búsqueda y el estado
  const filteredUsuarios = usuarios.filter((usuario) => {
    const matchesSearch = `${usuario.Nombre} ${usuario.Apellido}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesEstado =
      filterEstado === "todos" ||
      (filterEstado === "activo" && usuario.Estado === true) ||
      (filterEstado === "inactivo" && usuario.Estado === false);

    return matchesSearch && matchesEstado;
  });

  return (
    <div>
      {error && <Typography color="error">{error}</Typography>}

      {/* Barra de búsqueda y filtro */}
      <Box
        marginLeft={2}
        marginTop={3}
        sx={{ display: "flex", alignItems: "center", gap: 2 }}
      >
        <TextField
          fullWidth
          variant="outlined"
          label="Buscar usuarios"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Actualiza el término de búsqueda
        />
        <FormControl variant="outlined" sx={{ minWidth: 150 }}>
          <InputLabel id="filter-estado-label">Estado</InputLabel>
          <Select
            labelId="filter-estado-label"
            value={filterEstado}
            onChange={(e) => setFilterEstado(e.target.value)} // Actualiza el filtro de estado
            label="Estado"
          >
            <MenuItem value="todos">Todos</MenuItem>
            <MenuItem value="activo">Activos</MenuItem>
            <MenuItem value="inactivo">Inactivos</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Lista de usuarios filtrados */}
      <Grid container spacing={3} padding={3}>
        {filteredUsuarios.map((usuario) => (
          <Grid item xs={12} sm={6} md={4} key={usuario.Id_Usuario}>
            <Card
              variant="elevation"
              sx={{ minHeight: "300px", maxHeight: "300px" }}
            >
              <CardContent
              
              >
                <Typography variant="h6">
                  {usuario.Nombre} {usuario.Apellido}
                </Typography>

                {/* Mostrar roles como chips */}
                <Box mt={2}
                sx={{
                  minHeight: "75px", // Ajusta la altura de las acciones a 30% del contenedor
                  maxheight: "75px",
                }}>
                  {roles[usuario.Id_Usuario]?.length > 0 ? (
                    roles[usuario.Id_Usuario].map((rolId, index) => {
                      const role = roleConfig[rolId];
                      return (
                        <Chip
                          key={index}
                          label={role.name}
                          color={role.color}
                          icon={role.icon}
                          style={{ marginRight: 2, marginBottom: 2 }}
                        />
                      );
                    })
                  ) : (
                    <Typography variant="body2" color="textSecondary">
                      Sin roles asignados
                    </Typography>
                  )}
                </Box>

                {/* Mini tabla para Código y Correo */}
                <TableContainer
                  sx={{
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: "4px",
                  }}
                >
                  <Table size="small" aria-label="mini table">
                    <TableBody>
                      <TableRow>
                        <TableCell
                          sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}
                        >
                          Código
                        </TableCell>
                        <TableCell>{usuario.Id_Usuario}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}
                        >
                          Correo
                        </TableCell>
                        <TableCell>{usuario.Correo_Electronico}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>

              </CardContent>

              <CardActions
                sx={{
                
                  minHeight: "40px", // Ajusta la altura de las acciones a 30% del contenedor
                  maxheight: "40px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignContent  : "center",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Switch
                    checked={usuario.Estado}
                    disabled
                    onChange={() =>
                      toggleEstado(
                        usuario.Id_Usuario,
                        usuario.Nombre,
                        usuario.Estado
                      )
                    }
                    color="success"
                  />
                  <Typography
                    variant="body2"
                    color={usuario.Estado ? "green" : "red"}
                  >
                    {usuario.Estado ? "Activo" : "Inactivo"}
                  </Typography>
                </Box>
              </CardActions>

            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Snackbar para notificaciones */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default VerUsuarios;
