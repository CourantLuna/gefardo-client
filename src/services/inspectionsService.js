import axios from 'axios';
import AuthService from './authService';
import { environment } from '../environments/environment';
import { ApiEndpoints } from '../environments/apiEnpoints';

// Configuración del cliente Axios
const axiosInstance = axios.create({
  baseURL: `${environment.apiBaseUrl}/api${ApiEndpoints.inspections}`,
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

const inspectionsService = {
  // Obtiene todas las inspecciones disponibles
  getAllInspections: async () => {
    try {
      const response = await axiosInstance.get();
      return response.data;
    } catch (error) {
      console.error('Error al obtener las inspecciones:', error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message || 'No se pudo obtener la lista de inspecciones.'
      );
    }
  },

  // Obtiene los detalles de una inspección por su ID
  getInspectionById: async (inspectionId) => {
    try {
      const response = await axiosInstance.get(`/${inspectionId}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener los detalles de la inspección:', error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message || 'No se pudo obtener la información de la inspección.'
      );
    }
  },

  // Crea una nueva inspección
  createInspection: async (inspectionData) => {
    try {
      const response = await axiosInstance.post('/', inspectionData);
      return response.data;
    } catch (error) {
      console.error('Error al crear la inspección:', error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message || 'No se pudo crear la inspección.'
      );
    }
  },

  // Actualiza una inspección existente
  updateInspection: async (inspectionId, inspectionData) => {
    try {
      const response = await axiosInstance.put(`/${inspectionId}`, inspectionData);
      return response.data;
    } catch (error) {
      console.error('Error al actualizar la inspección:', error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message || 'No se pudo actualizar la inspección.'
      );
    }
  },

  // Elimina una inspección por su ID
  deleteInspection: async (inspectionId) => {
    try {
      await axiosInstance.delete(`/${inspectionId}`);
    } catch (error) {
      console.error('Error al eliminar la inspección:', error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message || 'No se pudo eliminar la inspección.'
      );
    }
  },
};

export default inspectionsService;
