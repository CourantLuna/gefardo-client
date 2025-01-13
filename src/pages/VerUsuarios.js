import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, FormControl, Select, MenuItem, InputLabel, Button, Snackbar, Alert, CardActions, Switch, TextField, Box } from '@mui/material';
import userService from '../services/userService';

function VerUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // Estado para la búsqueda
  const [error, setError] = useState(null);
  const [filterEstado, setFilterEstado] = useState('todos'); // Estado para el filtro

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success', // 'success', 'error', 'info', 'warning'
  });

  useEffect(() => {
  

    const fetchUsuarios = async () => {
      try {
        const data = await userService.getUsuarios();
        setUsuarios(data);
      } catch (error) {
        console.error('Error al cargar usuarios:', error);
        setError('Hubo un problema al cargar los usuarios. Inténtalo de nuevo más tarde.');
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
        message: `El estado del usuario ${nombre} se actualizó con éxito.`,
        severity: 'success',
      });
    } catch (error) {
      console.error('Error al cambiar estado:', error);
      setError('Hubo un problema al cambiar el estado del usuario.');
      setSnackbar({
        open: true,
        message: `Hubo un problema al actualizar el estado del usuario ${nombre}.`,
        severity: 'error',
      });
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };


  // Filtrar usuarios según el término de búsqueda y el estado
  const filteredUsuarios = usuarios.filter((usuario) => {
    const matchesSearch = `${usuario.Nombre} ${usuario.Apellido}`.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEstado =
      filterEstado === 'todos' ||
      (filterEstado === 'activo' && usuario.Estado === true) ||
      (filterEstado === 'inactivo' && usuario.Estado === false);

    return matchesSearch && matchesEstado;
  });

  

  return (
    <div>
      {error && <Typography color="error">{error}</Typography>}

      {/* Barra de búsqueda y filtro */}
      <Box marginLeft={2} marginTop={3} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
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
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6">
                  {usuario.Nombre} {usuario.Apellido}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  ID: {usuario.Id_Usuario}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Correo: {usuario.Correo_Electronico}
                </Typography>
                
              </CardContent>
              <CardActions sx={{ justifyContent: 'space-around', alignItems: 'center' }}>
                
              <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <Switch
                  checked={usuario.Estado}
                  onChange={() => toggleEstado(usuario.Id_Usuario, usuario.Nombre, usuario.Estado)}
                  color='success'                 />
                <Typography variant="body2" color={usuario.Estado ? 'green' : 'red'}>
                  {usuario.Estado ? 'Activo' : 'Inactivo'}
                </Typography>
              </Box>
                {/* <Button
                  variant="contained"
                  color="primary"
                  align="right"
                  onClick={() => alert(`Modificar usuario ${usuario.Id_Usuario}`)}
                >
                  Modificar
                </Button> */}

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
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default VerUsuarios;