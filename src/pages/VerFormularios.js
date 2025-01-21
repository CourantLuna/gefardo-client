import React, { useState, useEffect } from "react";
import {
  Box,
} from "@mui/material";

import formService from '../services/formService';

import CustomGrid from "../components/CustomGrid";
import SearchBar from "../components/SearchBar";
import FilterAutocomplete from "../components/FilterAutocomplete";
import DialogComponent from "../components/DialogComponent";
import DynamicForm from '../components/CustomForm'; 

const VerFormularios = () => {
  const [formularios, setFormularios] = useState([]); // Datos de formularios
  const [filteredData, setFilteredData] = useState([]); // Datos filtrados
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState("");


  useEffect(() => {

    const fetchAllForms = async () => {
      try {
        const forms = await formService.getAllForms(); // Llama al servicio para obtener los formularios reales
        console.log('Lista de formularios:', forms);
        setFormularios(forms); // Almacena los datos en el estado
        setFilteredData(forms); // Inicializa los datos filtrados
      } catch (error) {
        console.error('Error al obtener formularios:', error.message);
      }
    };
  
    fetchAllForms();

  }, [formularios]);

  // Actualiza los datos filtrados
  const handleFilterChange = (filteredResults) => {
    setFilteredData(filteredResults);
  };

  // Ajustar paginación para que funcione con los datos filtrados
  const paginatedFormularios = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  useEffect(() => {
    if (page > 0 && paginatedFormularios.length === 0) {
      setPage(0); // Reinicia la página si el filtro cambia y no hay datos en la página actual
    }
  }, [filteredData, page, paginatedFormularios.length]);

  const toggleEstado = (id) => {
    setFormularios((prevFormularios) =>
      prevFormularios.map((formulario) =>
        formulario.Id_Formulario === id
          ? {
              ...formulario,
              Estado: formulario.Estado === "Activo" ? "Inactivo" : "Activo",
            }
          : formulario
      )
    );
    alert(`La entidad de ID ${id} va a ser ${
      formularios.find((f) => f.Id_Formulario === id).Estado === "Activo"
        ? "deshabilitada"
        : "habilitada"
    }`);
  };

  const handleView = (id) => {
    const formulario = formularios.find((f) => f.Id_Formulario === id);
    try {
      const jsonFields = JSON.parse(formulario.Campos_Formulario);
  
      // Asegúrate de que jsonFields es un array
      if (Array.isArray(jsonFields)) {
        setDialogContent(
          <Box>
            <DynamicForm
              formFields={jsonFields}
              formTitle={formulario.Nombre_Formulario}
            />
          </Box>
        );
        setDialogOpen(true);
      } else {
        console.error("Campos_Formulario no es un array válido.");
        alert("Los campos del formulario no tienen el formato esperado.");
      }
    } catch (error) {
      console.error("Error al parsear Campos_Formulario:", error.message);
      alert("Error al cargar los campos del formulario.");
    }
  };

  const handleEdit = (id) => {
    alert(`La entidad de ID ${id} va a ser editada`);
  };

return (
  <Box
    sx={{
      padding: "20px",
      borderRadius: "8px",
      marginLeft: "20px",
    }}
  >
    {/* Barra de búsqueda y filtro inline */}
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px",
        gap: "16px",
      }}
    >
      {/* SearchBar para buscar por nombre */}
      <SearchBar
        data={formularios}
        onFilterChange={handleFilterChange}
        label={"Buscar formulario por nombre"}
        filterKey="Nombre_Formulario"
      />

      {/* FilterAutocomplete para filtrar por estado */}
      <FilterAutocomplete
        label="Estado"
        data={formularios}
        filterKey="Estado"
        onFilterChange={handleFilterChange}
      />
    </Box>

    {/* Tabla de resultados */}
    <CustomGrid
      data={filteredData}
      columns={[
        { key: "Id_Formulario", label: "ID" },
        { key: "Nombre_Formulario", label: "Nombre" },
        { key: "Creado_Por", label: "Creado Por" },
        { key: "Modificado_Por", label: "Modificado Por" },
        { key: "Fecha_Creacion", label: "Fecha de Creación" },
        { key: "Fecha_Ultima_Modificacion", label: "Última Modificación" },
        { key: "Estado", label: "Estado" },
      ]}
      actions={{
        onView: handleView,
        onEdit: handleEdit,
        onToggle: toggleEstado,
      }}
    />

    <Box
      sx={{
        width: "fit-content", // Tamaño ajustado al contenido
        margin: "0 auto", // Centra automáticamente horizontalmente
      }}
    >
      {/* Dialogo para mostrar formulario */}
      <DialogComponent
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        title="Vista del Formulario"
      >
        {dialogContent}
      </DialogComponent>
    </Box>
  </Box>
);
};

export default VerFormularios;
