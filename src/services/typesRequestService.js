import axios from 'axios';
import AuthService from './authService';
import { environment } from '../environments/environment';
import { ApiEndpoints } from '../environments/apiEnpoints';

// Configuración del cliente Axios
const axiosInstance = axios.create({
  baseURL: `${environment.apiBaseUrl}/api${ApiEndpoints.typesRequests}`,
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

const typesRequestService = {
  // Obtiene todos los tipos de servicios disponibles
  getAllTypesRequests: async () => {
    try {
      const response = await axiosInstance.get();
      return response.data;
    } catch (error) {
      console.error('Error al obtener los tipos de servicio:', error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message || 'No se pudo obtener la lista de tipos de servicio.'
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

  // Obtiene los detalles de un tipo de servicio por su ID
  getTypeRequestById: async (typeRequestId) => {
    try {
      const response = await axiosInstance.get(`/${typeRequestId}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener el tipo de servicio:', error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message || 'No se pudo obtener la información del tipo de servicio.'
      );
    }
  },

  // Crea un nuevo tipo de servicio
  createTypeRequest: async (typeRequestData) => {
    try {
      const response = await axiosInstance.post('/', typeRequestData);
      return response.data;
    } catch (error) {
      console.error('Error al crear el tipo de servicio:', error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message || 'No se pudo crear el tipo de servicio.'
      );
    }
  },

  // Actualiza un tipo de servicio existente
  updateTypeRequest: async (typeRequestId, typeRequestData) => {
    try {
      const response = await axiosInstance.put(`/${typeRequestId}`, typeRequestData);
      return response.data;
    } catch (error) {
      console.error('Error al actualizar el tipo de servicio:', error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message || 'No se pudo actualizar el tipo de servicio.'
      );
    }
  },

  // Elimina un tipo de servicio por su ID
  deleteTypeRequest: async (typeRequestId) => {
    try {
      await axiosInstance.delete(`/${typeRequestId}`);
    } catch (error) {
      console.error('Error al eliminar el tipo de servicio:', error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message || 'No se pudo eliminar el tipo de servicio.'
      );
    }
  },
};

export default typesRequestService;
