import axios from 'axios';
import AuthService from './authService'; // Asegúrate de que AuthService existe
import { environment } from '../environments/environment';
import { ApiEndpoints } from '../environments/apiEnpoints';

// Configuración del cliente Axios
const axiosInstance = axios.create({
  baseURL: `${environment.apiBaseUrl}/api${ApiEndpoints.pharmacies}`,
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

const pharmacyService = {
  // Obtiene todas las farmacias disponibles
  getAllPharmacies: async () => {
    try {
      const response = await axiosInstance.get(); // Endpoint para obtener todas las farmacias
      return response.data; // Retorna la lista de farmacias
    } catch (error) {
      console.error('Error al obtener todas las farmacias:', error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message || 'No se pudo obtener la lista de farmacias.'
      );
    }
  },

  // Obtiene la información de una farmacia por su ID
  getPharmacyById: async (pharmacyId) => {
    try {
      const response = await axiosInstance.get(`/${pharmacyId}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener la información de la farmacia:', error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message || 'No se pudo obtener la información de la farmacia.'
      );
    }
  },

  // Guarda los datos de una nueva farmacia
  savePharmacyData: async (pharmacyData) => {
    try {
      const response = await axiosInstance.post('/', pharmacyData);
      return response.data;
    } catch (error) {
      console.error('Error al guardar los datos de la farmacia:', error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message || 'No se pudieron guardar los datos de la farmacia.'
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

  // Actualiza los datos de una farmacia existente
  updatePharmacyData: async (pharmacyId, pharmacyData) => {
    try {
      const response = await axiosInstance.put(`/${pharmacyId}`, pharmacyData);
      return response.data;
    } catch (error) {
      console.error('Error al actualizar los datos de la farmacia:', error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message || 'No se pudieron actualizar los datos de la farmacia.'
      );
    }
  },
};

export default pharmacyService;
