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
};

export default generalService;
