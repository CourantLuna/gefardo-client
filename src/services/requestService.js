import axios from 'axios';
import AuthService from './authService';
import { environment } from '../environments/environment';
import { ApiEndpoints } from '../environments/apiEnpoints';

// Configuración del cliente Axios
const axiosInstance = axios.create({
  baseURL: `${environment.apiBaseUrl}/api${ApiEndpoints.requests}`,
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

const requestService = {
  // Obtiene todas las solicitudes disponibles
  getAllRequests: async () => {
    try {
      const response = await axiosInstance.get();
      return response.data;
    } catch (error) {
      console.error('Error al obtener las solicitudes:', error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message || 'No se pudo obtener la lista de solicitudes.'
      );
    }
  },

  // Obtiene los detalles de una solicitud por su ID
  getRequestById: async (requestId) => {
    try {
      const response = await axiosInstance.get(`/${requestId}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener los detalles de la solicitud:', error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message || 'No se pudo obtener la información de la solicitud.'
      );
    }
  },

  // Crea una nueva solicitud
  createRequest: async (requestData) => {
    try {
      const response = await axiosInstance.post('/', requestData);
      return response.data;
    } catch (error) {
      console.error('Error al crear la solicitud:', error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message || 'No se pudo crear la solicitud.'
      );
    }
  },

  // Actualiza los datos de una solicitud existente
  updateRequest: async (requestId, requestData) => {
    try {
      const response = await axiosInstance.put(`/${requestId}`, requestData);
      return response.data;
    } catch (error) {
      console.error('Error al actualizar la solicitud:', error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message || 'No se pudo actualizar la solicitud.'
      );
    }
  },

  // Elimina una solicitud por su ID
  deleteRequest: async (requestId) => {
    try {
      await axiosInstance.delete(`/${requestId}`);
    } catch (error) {
      console.error('Error al eliminar la solicitud:', error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message || 'No se pudo eliminar la solicitud.'
      );
    }
  },
};

export default requestService;
