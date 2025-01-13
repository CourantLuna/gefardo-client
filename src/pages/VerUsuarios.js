import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, Button, CardActions, Switch, TextField, Box } from '@mui/material';
import userService from '../services/userService';

function VerUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // Estado para la búsqueda
  const [error, setError] = useState(null);


  useEffect(() => {
    // const checkToken = async () => {
    //   const isValid = await AuthService.verifyToken();
    //   if (!isValid) {
    //     AuthService.logout(); // O alguna acción para desloguear al usuario
    //     window.location.href = '/';
    //   }
    // };

    // checkToken();

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

  const toggleEstado = async (id, estadoActual) => {
    const nuevoEstado = estadoActual === 1 ? 0 : 1;
    try {
      await userService.toggleEstado(id, nuevoEstado);
      setUsuarios((prevUsuarios) =>
        prevUsuarios.map((user) =>
          user.Usuario_Id === id ? { ...user, Estado: nuevoEstado } : user
        )
      );
    } catch (error) {
      console.error('Error al cambiar estado:', error);
      setError('Hubo un problema al cambiar el estado del usuario.');
    }
  };

  const label = { inputProps: { 'aria-label': 'Switch demo' } };

  // Filtrar usuarios según el término de búsqueda
  const filteredUsuarios = usuarios.filter((usuario) =>
    `${usuario.Nombre} ${usuario.Apellido}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {error && <Typography color="error">{error}</Typography>}
      <Switch {...label} defaultChecked />

      {/* Barra de búsqueda */}
      <Box marginLeft={2} marginTop={3} sx={{ display: 'flex', alignItems: 'center' }}>
        <TextField
          fullWidth
          variant="outlined"
          label="Buscar usuarios"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Actualiza el término de búsqueda
        />
      </Box>

      {/* Lista de usuarios filtrados */}
      <Grid container spacing={3} padding={3}>
        {filteredUsuarios.map((usuario) => (
          <Grid item xs={12} sm={6} md={4} key={usuario.Usuario_Id}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6">
                  {usuario.Nombre} {usuario.Apellido}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  ID: {usuario.Usuario_Id}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Correo: {usuario.Correo_Electronico}
                </Typography>
                <Typography variant="body2" color={usuario.Estado ? 'green' : 'red'}>
                  Estado: {usuario.Estado ? 'Activo' : 'Inactivo'}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'space-around', alignItems: 'center' }}>
                
                <Switch
                  checked={usuario.Estado === 1} // Estado controlado
                  onChange={(e) =>
                    toggleEstado(usuario.Id_Usuario, e.target.checked ? 1 : 0)
                  }
                  inputProps={{
                    'aria-label': `Cambiar estado de ${usuario.Nombre}`,
                  }}
                  color="primary"
                />
                <Typography variant="body2">
                  {usuario.Estado ? 'Deshabilitar' : 'Habilitar'}
                </Typography>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => alert(`Modificar usuario ${usuario.Id_Usuario}`)}
                >
                  Modificar
                </Button>

              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default VerUsuarios;