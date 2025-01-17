import axios from 'axios';
import AuthService from './authService'; // Asegúrate de que AuthService existe
import { environment } from '../environments/environment';

const axiosInstance = axios.create({
  baseURL: `${environment.apiBaseUrl}/api/general`,
});

// Interceptores para manejar el token y errores
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

const generalService = {
  /**
   * Método para obtener datos de una tabla específica con un campo opcional
   * @param {string} table - Nombre de la tabla
   * @param {string} field - Nombre del campo (opcional)
   * @param {string} value - Valor del campo (opcional para filtrar)
   * @returns {Promise<any>} - Datos de la tabla
   */
 getFromTable: async (table, fields) => {
    try {
        console.log("los campos ahora pasados son: ",fields)
        const url2 = fields ? console.log(`${table}?fields=${fields}`) : `${table}`;

      const url = fields ? `${table}?fields=${fields}` : `${table}`;
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener datos de la tabla ${table}:`, error.response?.data || error.message);
      throw new Error(error.response?.data?.message || `No se pudo obtener datos de la tabla ${table}.`);
    }
  },
};

export default generalService;
