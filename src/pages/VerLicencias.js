import React, { useState, useEffect } from "react";
import { Box, Button, Paper } from "@mui/material";
import CustomGrid from "../components/CustomGrid";
import SearchBar from "../components/SearchBar";
import FilterAutocomplete from "../components/FilterAutocomplete";

import licenseService from '../services/licenseService';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';

const VerLicencias = () => {
  const [licencias, setLicencias] = useState([]);
  const [filteredLicencias, setFilteredLicencias] = useState([]);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [currentForm, setCurrentForm] = useState(null);
  const [selectedFarmacia, setSelectedFarmacia] = useState(null);

  useEffect(() => {
    const fetchLicenses = async () => {
      try {
        const licenses = await licenseService.getAllLicenses();
        console.log('Licencias:', licenses);
        
        setLicencias(licenses);
        setFilteredLicencias(licenses);
      } catch (error) {
        console.error(error.message);
      }
    };
    
    fetchLicenses();
  }, []);

  const handleDialogOpen = () => {
    setCurrentForm("add"); // Establece que se abrirá el formulario de "Añadir Farmacia"
    setDialogOpen(true);
  };

  const handleView = (id) => {
    // Busca la farmacia en el estado `farmacias` usando el ID
    const licencia = licencias.find((f) => f.Id_Farmacia === id);
    alert(`La entidad de ID ${id} va a ser vista`);
    if (licencia) {
    //   setSelectedFarmacia(farmacia); // Guarda la farmacia seleccionada
      setCurrentForm("view"); // Cambia al formulario de edición
      setDialogOpen(true); // Abre el diálogo
    } else {
      console.error(`No se encontró ninguna farmacia con el ID: ${id}`);
    }
  };

  // Función para manejar el filtro de búsqueda
  const handleFilterChange = (filteredResults) => {
    setFilteredLicencias(filteredResults);
  };

  // Función para manejar las acciones
  const handleEdit = (id) => {
    alert(`Editar licencia con ID: ${id}`);
  };

  const handleToggle = (id) => {
    setLicencias((prevLicencias) =>
      prevLicencias.map((licencia) =>
        licencia.Id_Licencia === id
          ? {
              ...licencia,
              Estado: licencia.Estado === true ? false : true,
            }
          : licencia
      )
    );
    alert(`Toggle Estado de la licencia con ID: ${id}`);
  };

  return (
    <Box
      sx={{
        padding: "20px",
        borderRadius: "8px",
        marginLeft: "20px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          gap: "16px",
        }}
      >
        {/* Barra de búsqueda */}
        <SearchBar
          data={licencias}
          onFilterChange={handleFilterChange}
          label="Buscar licencia por número"
          filterKey="Numero_Licencia" // Filtra por el campo "Numero_Licencia"
        />

        {/* Botón para añadir un nuevo tipo de servicio */}
        <Box>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<CreateNewFolderIcon />}
            onClick={handleDialogOpen}
          >
            Licencia
          </Button>
        </Box>
      </Box>

      {/* Seccion de filtros */}
      <Paper
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          padding: "15px",
          gap: "15px",
          fullWidth: "true",
          marginBottom: "20px",
        }}
      >
        {/* FilterAutocomplete para filtrar por estado */}
        <FilterAutocomplete
          label="Estado"
          data={licencias}
          filterKey="Estado_Licencia"
          onFilterChange={handleFilterChange}
        />
      </Paper>

      {/* Tabla de licencias */}
      <CustomGrid
        data={filteredLicencias}
        columns={[
          { key: "Id_Licencia", label: "ID" },
          { key: "Numero_Licencia", label: "Número de Licencia" },
          { key: "Fecha_Emision", label: "Fecha de Emisión" },
          { key: "Fecha_Vencimiento", label: "Fecha de Vencimiento" },
          { key: "Estado_Licencia", label: "Estado", isBoolean: false },
        ]}
        actions={{
          onEdit: handleEdit,
          onToggle: handleToggle,
          onView: handleView,

        }}
      />
    </Box>
  );
};

export default VerLicencias;
