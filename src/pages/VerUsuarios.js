import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, Button, CardActions, Switch } from '@mui/material';
import axios from 'axios';
import AuthService from '../services/authService'; // Importa AuthService
import {jwtDecode} from 'jwt-decode';

function ListaUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState(null);

  // Verifica si el token es válido
  const isTokenValid = () => {
    try {
      const token = AuthService.getToken();
      if (!token) return false;

      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decodedToken.exp > currentTime; // Verifica que el token no haya expirado
    } catch (err) {
      console.error('Error al verificar el token:', err.message);
      return false;
    }
  };

  // Configuración de axios con interceptor
  const axiosInstance = axios.create({
    baseURL: 'http://localhost:3001/api',
    headers: {
      Authorization: `Bearer ${AuthService.getToken()}`,
    },
  });

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 403) {
        setError('No tienes permisos para realizar esta acción.');
        AuthService.logout(); // Opcional: Desconecta al usuario automáticamente
        window.location.href = '/'; // Redirige al login
      }
      return Promise.reject(error);
    }
  );

  // Cargar datos de usuarios
  useEffect(() => {
    if (!isTokenValid()) {
      AuthService.logout();
      window.location.href = '/login'; // Redirige si el token es inválido
      return;
    }

    axiosInstance
      .get('/Usuarios')
      .then((response) => setUsuarios(response.data))
      .catch((error) => {
        console.error('Error al cargar usuarios:', error);
        setError('Hubo un problema al cargar los usuarios. Inténtalo de nuevo más tarde.');
      });
  }, [axiosInstance]);

  const toggleEstado = (id, estadoActual) => {
    const nuevoEstado = estadoActual === 1 ? 0 : 1;
    axiosInstance
      .patch(`/Usuarios/${id}`, { Estado: nuevoEstado })
      .then(() => {
        setUsuarios((prevUsuarios) =>
          prevUsuarios.map((user) =>
            user.Usuario_Id === id ? { ...user, Estado: nuevoEstado } : user
          )
        );
      })
      .catch((error) => console.error('Error al cambiar estado:', error));
  };

  return (
    <div>
      {error && <Typography color="error">{error}</Typography>}
      <Grid container spacing={3} padding={3}>
        {usuarios.map((usuario) => (
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
              <CardActions>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => alert(`Modificar usuario ${usuario.Usuario_Id}`)}
                >
                  Modificar
                </Button>
                <Switch
                  checked={usuario.Estado === 1}
                  onChange={() => toggleEstado(usuario.Usuario_Id, usuario.Estado)}
                  color="primary"
                />
                <Typography variant="body2">
                  {usuario.Estado ? 'Deshabilitar' : 'Habilitar'}
                </Typography>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default ListaUsuarios;
