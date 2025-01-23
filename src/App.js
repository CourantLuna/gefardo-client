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
import VerFormularios from "./pages/VerFormularios";
import VerFarmacias from "./pages/VerFarmacias";
import VerLicencias from "./pages/VerLicencias";
import VerSanciones from "./pages/VerSanciones";
import VerInspecciones from "./pages/VerInspecciones";
import VerSolicitudes from "./pages/VerSolicitudes";
import GestionarServicios from "./pages/GestionarServicios";
import CrearFormulario from "./pages/CrearFormulario";

import InspeccionesAsignadas from "./pages/InspeccionesAsignadas";
import VerPerfil from "./pages/VerPerfil";
import EditarFormulario from "./pages/EditarFormulario";

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

                {/* Paginas del rol ADMINISTRADOR */}
                <Route path="ver-usuarios" element={<VerUsuarios />} />
                <Route path="ver-formularios" element={ <VerFormularios/>} />
                <Route path="ver-farmacias" element={ <VerFarmacias/>} />
                <Route path="ver-licencias" element={ <VerLicencias/>} />
                <Route path="ver-sanciones" element={ <VerSanciones/>} />
                <Route path="ver-inspecciones" element={ <VerInspecciones/>} />
                <Route path="revisar-solicitudes" element={ <VerSolicitudes/>} />
                <Route path="gestionar-servicios" element={ <GestionarServicios/>} />
                <Route path="crear-formularios" element={ <CrearFormulario/>} />
                <Route path="editar-formularios/:id" element={ <EditarFormulario/>} />

                {/* Paginas del rol Inspectores */}
                <Route path="ver-asignadas" element={ <InspeccionesAsignadas/>} />



                {/* Paginas de acceso con autorizacion */}
                <Route path="ver-perfil" element={<VerPerfil />} />



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
