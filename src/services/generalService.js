import axios from 'axios';
import { environment } from '../environments/environment';
import { ApiEndpoints } from '../environments/apiEnpoints';

const axiosInstance = axios.create({
  baseURL: `${environment.apiBaseUrl}${ApiEndpoints.general}`,
});

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

      const url = fields ? `${table}?fields=${fields}` : `${table}`;
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener datos de la tabla ${table}:`, error.response?.data || error.message);
      throw new Error(error.response?.data?.message || `No se pudo obtener datos de la tabla ${table}.`);
    }
  },
 /**
 * Obtiene datos de un endpoint y filtra las opciones basándose en el campo especificado.
 * @param {string} endpointUrl - URL del API para obtener los datos.
 * @param {string} field - Campo del objeto en el API para las opciones.
 * @returns {Promise<any[]>} - Una promesa que resuelve un arreglo de valores filtrados.
 */
 getOptionsFromApi: async (endpointUrl) => {
  try {
    const response = await axios.get(`${environment.apiBaseUrl}/api${endpointUrl}`);
   
      return response.data; // Devuelve todos los datos tal cual
    }
   catch (error) {
    console.error('Error al obtener datos del API:', error);
    throw error;
  }
},


};



export default generalService;
