import React, { createContext, useState } from 'react';
import AuthService from '../services/authService'; // Importa el AuthService

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    sessionStorage.getItem('isAuthenticated') === 'true'
  );

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

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
