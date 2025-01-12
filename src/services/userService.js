import axios from 'axios';

const API_URL = 'http://localhost:3001/api/usuarios'; // Cambia esto si tu backend está en otra URL o puerto

// Función para obtener usuarios
const getUsuarios = async (token) => {
    const response = await axios.get(API_URL, {
        headers: {
            Authorization: `Bearer ${token}`, // Incluye el token en el encabezado
        },
    });
    return response.data;
};

export default getUsuarios;
