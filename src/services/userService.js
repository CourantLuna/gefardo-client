// services/userService.js 
import axios from 'axios';
import AuthService from './authService'; // Asegúrate de que AuthService existe
import { environment } from '../environments/environment';
import { ApiEndpoints } from '../environments/apiEnpoints';

const axiosInstance = axios.create({
  baseURL: `${environment.apiBaseUrl}/api`,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = AuthService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.error('Token no válido. Redirigiendo a inicio de sesión.');
      AuthService.logout();
      window.location.href = '/';
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 403) {
      console.error('Acceso denegado. Redirigiendo al inicio.');
      AuthService.logout();
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

const userService = {
  getUsuarios: async () => {
    try {
      const response = await axiosInstance.get(ApiEndpoints.usuarios);
      return response.data;
    } catch (error) {
      console.error('Error al obtener usuarios:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'No se pudo obtener la lista de usuarios.');
    }
  },


  toggleEstado: async (id, nuevoEstado) => {
    try {
      await axiosInstance.patch(`${ApiEndpoints.usuarios}/${id}`, { Estado: nuevoEstado });
    } catch (error) {
      console.error('Error al cambiar el estado del usuario:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'No se pudo cambiar el estado del usuario.');
    }
  },

  getRoles: async (idUsuario) => {  
    try {
      const response = await axiosInstance.get(`${ApiEndpoints.RolesByUsuarioId}/${idUsuario}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener roles:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'No se pudo obtener los roles.');
    } 
  },
  getAllRoles: async () => {
    try {
        const response = await axiosInstance.get(`${ApiEndpoints.AllUserRoles}`);
        return response.data; // La API debería devolver la tabla puente con los datos
    } catch (error) {
        console.error('Error al obtener todos los roles:', error);
        throw error; // Opcional: Propagar el error para manejarlo en el componente
    }
},

  // Puedes añadir otros métodos aquí, como crear o eliminar usuarios
};

export default userService;
