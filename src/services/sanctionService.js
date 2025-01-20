import axios from 'axios';
import AuthService from './authService';
import { environment } from '../environments/environment';
import { ApiEndpoints } from '../environments/apiEnpoints';

// Configuración del cliente Axios
const axiosInstance = axios.create({
  baseURL: `${environment.apiBaseUrl}/api${ApiEndpoints.sanctions}`,
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

const sanctionService = {
  // Obtiene todas las sanciones disponibles
  getAllSanctions: async () => {
    try {
      const response = await axiosInstance.get();
      return response.data;
    } catch (error) {
      console.error('Error al obtener las sanciones:', error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message || 'No se pudo obtener la lista de sanciones.'
      );
    }
  },

  // Obtiene los detalles de una sanción por su ID
  getSanctionById: async (sanctionId) => {
    try {
      const response = await axiosInstance.get(`/${sanctionId}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener los detalles de la sanción:', error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message || 'No se pudo obtener la información de la sanción.'
      );
    }
  },

  // Crea una nueva sanción
  createSanction: async (sanctionData) => {
    try {
      const response = await axiosInstance.post('/', sanctionData);
      return response.data;
    } catch (error) {
      console.error('Error al crear la sanción:', error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message || 'No se pudo crear la sanción.'
      );
    }
  },

  // Actualiza los datos de una sanción existente
  updateSanction: async (sanctionId, sanctionData) => {
    try {
      const response = await axiosInstance.put(`/${sanctionId}`, sanctionData);
      return response.data;
    } catch (error) {
      console.error('Error al actualizar la sanción:', error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message || 'No se pudo actualizar la sanción.'
      );
    }
  },

  // Elimina una sanción por su ID
  deleteSanction: async (sanctionId) => {
    try {
      await axiosInstance.delete(`/${sanctionId}`);
    } catch (error) {
      console.error('Error al eliminar la sanción:', error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message || 'No se pudo eliminar la sanción.'
      );
    }
  },
};

export default sanctionService;
