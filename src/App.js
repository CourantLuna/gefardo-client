import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/authContext';
import HomePage from './pages/HomePage';
import GefardoPage from './pages/GefardoPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <AuthContext.Consumer>
          {({ isAuthenticated }) => (
            <Routes>
              {/* Ruta de Home */}
              <Route path="/" element={<HomePage />} />

              {/* Ruta de Gefardo */}
              <Route
                path="/gefardo"
                element={
                  isAuthenticated ? <GefardoPage /> : <Navigate to="/" replace />
                }
              />

              {/* Redirección por defecto */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          )}
        </AuthContext.Consumer>
      </Router>
    </AuthProvider>
  );
}

export default App;
