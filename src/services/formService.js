import axios from 'axios';
import AuthService from './authService'; // Asegúrate de que AuthService existe
import { environment } from '../environments/environment';
import { ApiEndpoints } from '../environments/apiEnpoints';

// Configuración del cliente Axios
const axiosInstance = axios.create({
  baseURL: `${environment.apiBaseUrl}/api${ApiEndpoints.forms}`,
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

const formService = {

// Obtiene todos los formularios disponibles
getAllForms: async () => {
  try {
    const response = await axiosInstance.get(); // Endpoint de "todos los formularios"
    return response.data; // Retorna la lista de formularios
  } catch (error) {
    console.error('Error al obtener todos los formularios:', error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message || 'No se pudo obtener la lista de formularios.'
    );
  }
},

  // Obtiene las configuraciones dinámicas de un formulario por su ID
  getFormConfig: async (formId) => {
    try {
      const response = await axiosInstance.get(`/${formId}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener la configuración del formulario:', error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message || 'No se pudo obtener la configuración del formulario.'
      );
    }
  },

  // Guarda los datos de un formulario
  saveFormData: async (formData) => {
    try {
      const response = await axiosInstance.post('/', formData);
      return response.data;
    } catch (error) {
      console.error('Error al guardar los datos del formulario:', error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message || 'No se pudieron guardar los datos del formulario.'
      );
    }
  },

  // Actualiza un formulario existente
  updateFormData: async (formId, formData) => {
    try {
      const response = await axiosInstance.put(`/${formId}`, formData);
      return response.data;
    } catch (error) {
      console.error('Error al actualizar los datos del formulario:', error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message || 'No se pudieron actualizar los datos del formulario.'
      );
    }
  },

  toggleEstado: async (id, estado) => {
    try {
      const response = await axiosInstance.put(`/${id}`, { Estado: estado });
      return response.data;
    } catch (error) {
      console.error("Error al cambiar el estado del formulario:", error.response?.data || error.message);
      throw new Error("No se pudo actualizar el estado del formulario.");
    }
  },

  // Borra un formulario por su ID
  deleteForm: async (formId) => {
    try {
      await axiosInstance.delete(`/${formId}`);
    } catch (error) {
      console.error('Error al borrar el formulario:', error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message || 'No se pudo borrar el formulario.'
      );
    }
  },
};

export default formService;
