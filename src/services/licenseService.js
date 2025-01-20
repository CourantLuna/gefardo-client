import axios from 'axios';
import AuthService from './authService'; // Asegúrate de que AuthService existe
import { environment } from '../environments/environment';
import { ApiEndpoints } from '../environments/apiEnpoints';

// Configuración del cliente Axios
const axiosInstance = axios.create({
  baseURL: `${environment.apiBaseUrl}/api${ApiEndpoints.licenses}`,
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

const licenseService = {
  // Obtiene todas las licencias disponibles
  getAllLicenses: async () => {
    try {
      const response = await axiosInstance.get(); // Endpoint para obtener todas las licencias
      return response.data; // Retorna la lista de licencias
    } catch (error) {
      console.error('Error al obtener todas las licencias:', error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message || 'No se pudo obtener la lista de licencias.'
      );
    }
  },

  // Obtiene los detalles de una licencia por su ID
  getLicenseById: async (licenseId) => {
    try {
      const response = await axiosInstance.get(`/${licenseId}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener los detalles de la licencia:', error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message || 'No se pudo obtener los detalles de la licencia.'
      );
    }
  },

  // Crea una nueva licencia
  createLicense: async (licenseData) => {
    try {
      const response = await axiosInstance.post('/', licenseData);
      return response.data;
    } catch (error) {
      console.error('Error al crear la licencia:', error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message || 'No se pudo crear la licencia.'
      );
    }
  },

  // Actualiza una licencia existente
  updateLicense: async (licenseId, licenseData) => {
    try {
      const response = await axiosInstance.put(`/${licenseId}`, licenseData);
      return response.data;
    } catch (error) {
      console.error('Error al actualizar la licencia:', error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message || 'No se pudo actualizar la licencia.'
      );
    }
  },

  // Elimina una licencia por su ID
  deleteLicense: async (licenseId) => {
    try {
      await axiosInstance.delete(`/${licenseId}`);
    } catch (error) {
      console.error('Error al eliminar la licencia:', error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message || 'No se pudo eliminar la licencia.'
      );
    }
  },
};

export default licenseService;
