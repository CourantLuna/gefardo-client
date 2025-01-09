import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/authContext'; // Importamos el contexto
import LoginPage from './pages/LoginPage';
import GefardoPage from './pages/GefardoPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <AuthContext.Consumer>
          {({ isAuthenticated }) => (
            <Routes>
              {/* Ruta de Login */}
              <Route
                path="/login"
                element={
                  isAuthenticated ? <Navigate to="/gefardo" replace /> : <LoginPage />
                }
              />

              {/* Ruta Principal de Gefardo */}
              <Route
                path="/gefardo/*"
                element={
                  isAuthenticated ? <GefardoPage /> : <Navigate to="/login" replace />
                }
              />

              {/* Redirección por defecto */}
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          )}
        </AuthContext.Consumer>
      </Router>
    </AuthProvider>
  );
}

export default App;
