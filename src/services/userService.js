// services/userService.js
import axios from 'axios';
import AuthService from './authService'; // Asegúrate de que AuthService existe
import { environment } from '../environments/environment';
import { ApiEndpoints } from '../environments/apiEnpoints';

const axiosInstance = axios.create({
  baseURL: `${environment.apiBaseUrl}/api`,
  headers: {
    Authorization: `Bearer ${AuthService.getToken()}`,
  },
});

// Interceptor para manejar errores
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 403) {
      AuthService.logout();
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

const userService = {
  getUsuarios: async () => {
    const response = await axiosInstance.get(`${ApiEndpoints.usuarios}`);
    return response.data;
  },

  toggleEstado: async (id, nuevoEstado) => {
    await axiosInstance.patch(`${ApiEndpoints.usuarios}/${id}`, { Estado: nuevoEstado });
  },

  // Puedes añadir otros métodos aquí, como crear o eliminar usuarios
};

export default userService;
