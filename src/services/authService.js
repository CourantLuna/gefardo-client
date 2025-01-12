import axios from 'axios';
import { API_URL } from '../config';
import {jwtDecode} from 'jwt-decode'; // Importa jwt-decode


const AuthService = {
  // Login: Envía las credenciales al backend y guarda el token en sessionStorage
  login: async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        Correo_Electronico: email,
        Clave: password,
      });
      const token = response.data.token; // Obtén el token de la respuesta
      sessionStorage.setItem('token', token); // Guarda el token en sessionStorage
      return token;
    } catch (err) {
      console.error('Error en AuthService.login:', err.response?.data || err.message);
      throw new Error(err.response?.data?.message || 'Error al iniciar sesión.');
    }
  },

  // Obtener el token almacenado
  getToken: () => {
    return sessionStorage.getItem('token');
  },

   // Obtener el rol del usuario decodificando el token
   getUserRole: () => {
    try {
      const token = sessionStorage.getItem('token');
      if (!token) throw new Error('Token no encontrado.');
      const decodedToken = jwtDecode(token); // Decodifica el token JWT
      return decodedToken.roles?.[0] || 'Usuario'; // Ajusta según el formato del token
    } catch (err) {
      console.error('Error al obtener el rol del usuario:', err.message);
      return 'Usuario'; // Rol predeterminado si falla
    }
  },

  // Verificar si el token es válido usando el backend
  verifyToken: async () => {
    try {
      const token = sessionStorage.getItem('token'); // Obtén el token de sessionStorage
      if (!token) throw new Error('Token no encontrado.');

      // Verifica el token con el backend
      const response = await axios.get(`${API_URL}/secure`, {
        params: {
          authorization: `Bearer ${token}`,
        },
      });
      return response.data; // Devuelve la respuesta del backend si el token es válido
    } catch (err) {
      console.error('Error en AuthService.verifyToken:', err.response?.data || err.message);
      throw new Error(err.response?.data?.message || 'Token inválido o expirado.');
    }
  },

  // Logout: Limpia el token del almacenamiento
  logout: () => {
    sessionStorage.removeItem('token'); // Elimina el token del almacenamiento
  },
};

export default AuthService;
