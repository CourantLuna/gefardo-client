import React, { createContext, useState, useEffect } from 'react';
import AuthService from '../services/authService'; // Importa el AuthService

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Estado para manejar la carga inicial

  // Verificar el token al cargar la aplicación
  useEffect(() => {
    const checkToken = async () => {
      const token = AuthService.getToken(); // Obtener el token almacenado
      if (token) {
        try {
          await AuthService.verifyToken(); // Verificar el token con el backend
          setIsAuthenticated(true); // Si es válido, autenticar al usuario
        } catch (error) {
          console.warn("Token inválido o expirado:", error.message);
          AuthService.logout(); // Eliminar datos inconsistentes
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false); // Si no hay token, no está autenticado
      }
      setLoading(false); // Finaliza la carga
    };
    checkToken(); // Ejecutar verificación
  }, []);

  // Función de login que utiliza el AuthService
  const login = async (email, password) => {
    try {
      const token = await AuthService.login(email, password); // Autentica con el backend
      sessionStorage.setItem('token', token); // Guarda el token en sessionStorage
      sessionStorage.setItem('isAuthenticated', 'true'); // Marca al usuario como autenticado
      setIsAuthenticated(true); // Actualiza el estado de autenticación
    } catch (error) {
      console.error('Error en login:', error.message);
      throw error; // Lanza el error para manejarlo en el componente que llama a login
    }
  };

  // Función de logout
  const logout = () => {
  AuthService.logout();
    setIsAuthenticated(false); // Actualiza el estado de autenticación
  };
// Mostrar un loader mientras se verifica el token
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
