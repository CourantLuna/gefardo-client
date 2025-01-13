import axios from 'axios';
import { environment } from '../environments/environment';
import { ApiEndpoints } from '../environments/apiEnpoints';
import {jwtDecode} from 'jwt-decode'; // Importa jwt-decode


const AuthService = {
  // Login: Envía las credenciales al backend y guarda el token en sessionStorage
  login: async (email, password) => {
    try {
      const response = await axios.post(`${environment.apiBaseUrl}/auth/login`, {
        Correo_Electronico: email,
        Clave: password,
      });
      const token = response.data.token; // Obtén el token de la respuesta
      sessionStorage.setItem('token', token); // Guarda el token en sessionStorage
      sessionStorage.setItem('isAuthenticated', 'true'); // Guarda el estado de autenticación

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
   getUserRoles: () => {
    try {
      const token = sessionStorage.getItem('token');
      if (!token) throw new Error('Token no encontrado.');
  
      const decodedToken = jwtDecode(token); // Decodifica el token JWT
  
      // Verifica si 'roles' existe y es un array
      if (Array.isArray(decodedToken.roles) && decodedToken.roles.length > 0) {
        return decodedToken.roles; // Retorna todos los roles
      }
  
      console.warn('Roles no encontrados en el token.');
      return []; // Retorna un array vacío si no hay roles
    } catch (err) {
      console.error('Error al obtener los roles del usuario:', err.message);
      return []; // Retorna un array vacío si ocurre un error
    }
  },

  // Verificar si el token es válido usando el backend
  verifyToken: async () => {
    try {
      const token = sessionStorage.getItem('token'); // Obtén el token de sessionStorage
      if (!token) throw new Error('Token no encontrado.');

      // Verifica el token con el backend
      const response = await axios.get(`${environment.apiBaseUrl}${ApiEndpoints.Authentication}`, {
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
    sessionStorage.removeItem('isAuthenticated'); // Limpia el estado de autenticación
  },
};

export default AuthService;
