// import React from 'react';
// import DynamicForm from '../components/CustomForm'; 


// const jsonFields = [
//     {
//       "sectionTitle": "1. Información del Establecimiento",
//       "divider": true,
//       "fields": [
//         {
//           "name": "nombre_farmacia",
//           "label": "Nombre Comercial de la Farmacia",
//           "type": "text",
//           "required": true,
//           "md": 12,
//           "value": ""

//         },
//         {
//           "name": "direccion_calle",
//           "label": "Calle",
//           "type": "text",
//           "required": true,
//           "md": 3,
//           "value": ""
//         },
//         {
//           "name": "direccion_numero",
//           "label": "Número",
//           "type": "number",
//           "required": true,
//           "md": 1,
//           "value": ""
//         },
//         {
//           "name": "direccion_sector",
//           "label": "Sector/Barrio",
//           "type": "text",
//           "required": true,
//           "md": 2,
//           "value": ""
//         },
//         {
//           "name": "direccion_municipio",
//           "label": "Municipio",
//           "type": "text",
//           "required": true,
//           "md": 2,
//           "value": ""

//         },
//         {
//           "name": "direccion_provincia",
//           "label": "Provincia",
//           "type": "select",
//           "required": true,
//           "modelOptions": "Provincia",
//           "md": 3.38,
//           "value": ""
//         },
//         {
//           "name": "telefono",
//           "label": "Teléfono",
//           "type": "tel",
//           "required": true,
//           "md": 3 ,
//           "value": ""

//         },
//         {
//           "name": "correo_electronico",
//           "label": "Correo Electrónico",
//           "type": "email",
//           "required": false,
//           "md": 3.15 ,
//           "value": ""

//         }
//       ]
//     },
//     {
//       "sectionTitle": "2. Información del Responsable Técnico",
//       "divider": true,
//       "fields": [
//         {
//           "name": "nombre_responsable",
//           "label": "Nombre Completo del Responsable Técnico",
//           "type": "text",
//           "required": true,
//           "md": 6.3 ,
//           "value": ""

          
//         },
//         {
//           "name": "cedula_responsable",
//           "label": "Cédula de Identidad",
//           "type": "id",
//           "required": true,
//           "md": 5.54 ,
//           "value": ""

//         },
//         {
//           "name": "titulo_universitario",
//           "label": "Título Universitario",
//           "type": "text",
//           "required": true,
//           "md": 6.3 ,
//           "value": ""

//         },
//         {
//           "name": "numero_exequatur",
//           "label": "Número de Exequátur",
//           "type": "number",
//           "required": true,
//           "md": 2 ,
//           "value": ""

//         },
//         {
//           "name": "telefono_responsable",
//           "label": "Teléfono del Responsable Técnico",
//           "type": "tel",
//           "required": true,
//           "md": 3.38,
//           "value": ""
//         },
//         {
//           "name": "correo_responsable",
//           "label": "Correo Electrónico del Responsable Técnico",
//           "type": "email",
//           "required": true,
//           "md": 3.15 ,
//           "value": ""

//         }
//       ]
//     },
//     {
//       "sectionTitle": "3. Detalles del Proyecto",
//       "divider": true,
//       "fields": [
//         {
//           "name": "tipo_establecimiento",
//           "label": "Tipo de Establecimiento",
//           "type": "select",
//           "required": true,
//           "modelOptions": "TipoFarmacia",
//           "md": 3.15 ,
//           "value": ""

//         },
//         {
//           "name": "servicios_ofrecidos",
//           "label": "Servicios Ofrecidos",
//           "type": "checkbox",
//           "options": [
//             "Dispensación de Medicamentos",
//             "Venta de Productos de Higiene",
//             "Fórmulas Magistrales",
//             "Otros"
//           ],
//           "md": 8,
//           "value": ""

//         },
//         {
//           "name": "descripcion_proyecto",
//           "label": "Descripción del Proyecto",
//           "type": "text",
//           "required": false,
//           "md": 12,
//           "value": ""

//         }
//       ]
//     },
//     {
//       "sectionTitle": "4. Documentos Adjuntos",
//       "divider": true,
//       "fields": [
//         {
//           "name": "certificado_nombre",
//           "label": "Certificado de Nombre Comercial (ONAPI)",
//           "type": "file",
//           "required": true,
//           "md": 3.9,
//           "value": ""

//         },
//         {
//           "name": "planos_local",
//           "label": "Planos del Local Avalados (CODIA)",
//           "type": "file",
//           "required": false,
//           "md": 3.9,
//           "value": ""

//         },
//         {
//           "name": "cedula_propietario",
//           "label": "Cédula del Propietario",
//           "type": "file",
//           "required": false,
//           "md": 3.9,
//           "value": ""

//         },
//         {
//           "name": "titulo_responsable",
//           "label": "Título Universitario del Responsable Técnico",
//           "type": "file",
//           "required": false,
//           "md": 3.9,
//           "value": ""

//         },
//         {
//           "name": "rnc",
//           "label": "Certificado del RNC",
//           "type": "file",
//           "required": false,
//           "md": 3.9,
//           "value": ""

//         },
//         {
//           "name": "contrato_titulo",
//           "label": "Contrato de Alquiler o Título de Propiedad",
//           "type": "file",
//           "required": false,
//           "md": 3.9,
//           "value": ""

//         },
//         {
//           "name": "declaracion_jurada",
//           "label": "Declaración Jurada",
//           "type": "file",
//           "required": false,
//           "md": 3.9,
//           "value": ""

//         },
//         {
//           "name": "comprobante_pago",
//           "label": "Comprobante de Pago",
//           "type": "file",
//           "required": false,
//           "md": 3.9,
//           "value": ""
//         }
//       ]
//     },
   
//   ]
//   ;
 

//   const VerFormularios = () => {
//     return (
//         <div style={{ paddingLeft: "30px" }}>
//         {/* <h1>Formulario Dinámico para Farmacias</h1> */}
//         <DynamicForm formFields={jsonFields} />
//       </div>
//     );
//   };
  
//   export default VerFormularios;

import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  useTheme,
  Box,
  TableFooter,
  Typography,
  IconButton,

} from "@mui/material";

import formService from '../services/formService';

import CustomGrid from "../components/CustomGrid";

import SearchBar from "../components/SearchBar";
import FilterAutocomplete from "../components/FilterAutocomplete";
import DialogComponent from "../components/DialogComponent";
import DynamicForm from '../components/CustomForm'; 

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";



const VerFormularios = () => {
  const [formularios, setFormularios] = useState([]); // Datos de formularios
  const [filteredData, setFilteredData] = useState([]); // Datos filtrados
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedId, setSelectedId] = useState(null); // ID seleccionado


  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState("");

  const theme = useTheme();

 
 

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

  }, []);

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

{/* Activar cuando tengamos el campo de Estado */}

      {/* <FilterAutocomplete
        label="Estado"
        data={formularios}
        filterKey="Estado"
        onFilterChange={handleFilterChange}
      /> */}
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
        actions={{ onView: handleView, onEdit: handleEdit, onToggle: toggleEstado }}
      />

    {/* Dialogo para mostrar formulario */}
    <DialogComponent
      open={dialogOpen}
      onClose={() => setDialogOpen(false)}
      title="Vista del Formulario"
    >
      {dialogContent}
    </DialogComponent>

  </Box>
);
};

export default VerFormularios;
