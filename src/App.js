import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/authContext";
import HomePage from "./pages/HomePage";
import GefardoPage from "./pages/GefardoPage";
import VerUsuarios from "./pages/VerUsuarios";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <AuthProvider>
      <Router>
        <AuthContext.Consumer>
          {({ isAuthenticated }) => (
            <Routes>
              {/* Ruta principal */}
              <Route path="/" element={<HomePage />} />

              {/* Rutas protegidas para Gefardo */}
              <Route
                path="/gefardo"
                element={
                  isAuthenticated ? (
                    <GefardoPage />
                  ) : (
                    <Navigate to="/" replace />
                  )
                }
              >
                {/* Ruta anidada para ver usuarios */}
                <Route path="ver-usuarios" element={<VerUsuarios />} />
                {/* <Route path="otra-pagina" element={<OtraPagina />} /> */}
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          )}
        </AuthContext.Consumer>
      </Router>
    </AuthProvider>
  );
}

export default App;
