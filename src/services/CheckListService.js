import axios from 'axios';
import AuthService from './authService';
import { environment } from '../environments/environment';
import { ApiEndpoints } from '../environments/apiEnpoints';

// Configuración del cliente Axios
const axiosInstance = axios.create({
  baseURL: `${environment.apiBaseUrl}/api${ApiEndpoints.checklists}`,
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

const checklistService = {
  // Obtiene todos los checklists disponibles
  getAllChecklists: async () => {
    try {
      const response = await axiosInstance.get();
      return response.data;
    } catch (error) {
      console.error('Error al obtener los checklists:', error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message || 'No se pudo obtener la lista de checklists.'
      );
    }
  },
  toggleEstado: async (id, estado) => {
    try {
      const response = await axiosInstance.put(`/${id}`, { Estado: estado });
      return response.data;
    } catch (error) {
      console.error("Error al cambiar el estado de la farmacia:", error.response?.data || error.message);
      throw new Error("No se pudo actualizar el estado de la farmacia.");
    }
  },

  // Obtiene los detalles de un checklist por su ID
  getChecklistById: async (checklistId) => {
    try {
      const response = await axiosInstance.get(`/${checklistId}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener los detalles del checklist:', error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message || 'No se pudo obtener la información del checklist.'
      );
    }
  },

  // Crea un nuevo checklist
  createChecklist: async (checklistData) => {
    try {
      const response = await axiosInstance.post('/', checklistData);
      return response.data;
    } catch (error) {
      console.error('Error al crear el checklist:', error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message || 'No se pudo crear el checklist.'
      );
    }
  },

  // Actualiza los datos de un checklist existente
  updateChecklist: async (checklistId, checklistData) => {
    try {
      const response = await axiosInstance.put(`/${checklistId}`, checklistData);
      return response.data;
    } catch (error) {
      console.error('Error al actualizar el checklist:', error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message || 'No se pudo actualizar el checklist.'
      );
    }
  },

  // Elimina un checklist por su ID
  deleteChecklist: async (checklistId) => {
    try {
      await axiosInstance.delete(`/${checklistId}`);
    } catch (error) {
      console.error('Error al eliminar el checklist:', error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message || 'No se pudo eliminar el checklist.'
      );
    }
  },
};

export default checklistService;