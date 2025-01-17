import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  TextField,
  Typography,
  Paper,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AddCircleIcon from '@mui/icons-material/AddCircle'; // Importa el ícono de Material-UI
import LoginIcon from '@mui/icons-material/Login'; // Importa el ícono de Material-UI


function LoginForm(onEnablePharmacyClick, // Callback when the  button is clicked
) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password); // Llama al contexto para autenticar
      navigate('/gefardo/dashboard'); // Redirige al dashboard si el login es exitoso
    } catch (err) {
      setError(err.message); // Muestra el mensaje de error en la interfaz
    }
  };

  const isFormValid = email.trim() !== '' && password.trim() !== '';


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper
        elevation={3}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyItems: 'center',
          alignItems: 'center',
          padding: 4,
          borderRadius: 2,
        }}
      >
        {/* Ícono */}
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LockOutlinedIcon />
        </Avatar>

        {/* Título */}
        <Typography component="h1" variant="h5">
          Iniciar sesión
        </Typography>
        <Typography variant="body2" color="textSecondary" align="center" sx={{ mt: 1 }}>
          Bienvenido, por favor inicia sesión para continuar
        </Typography>

        {/* Formulario */}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Correo Electrónico"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <Typography color="error">
              {error}
            </Typography>
          )}
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Recuérdame"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={!isFormValid} // Deshabilita el botón si no es válido
            startIcon={<LoginIcon />} // Asegura que el ícono esté a la izquierda
            sx={{
              mt: 3,
              mb: 2,
              padding: 1.5,
              display: 'flex',
              alignItems: 'center',
              justifyItems: 'start',
            }}
          >
            Iniciar sesión
          </Button>

          <Button
            variant="outlined"
            fullWidth
            startIcon={<AddCircleIcon />} // Ícono a la izquierda
            onClick={onEnablePharmacyClick}
            sx={{
              mb: 2,
              padding: 1.5,
            }}
          >

            Habilitar Farmacia

          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default LoginForm;
