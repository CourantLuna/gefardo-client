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

  const jsonData = [
    {
      "sectionTitle": "1. Información del Establecimiento",
      "divider": true,
      "fields": [
        {
          "name": "nombre_farmacia",
          "label": "Nombre Comercial de la Farmacia",
          "type": "text",
          "required": true,
          "md": 12,
          "value": ""
        },
        {
          "name": "direccion_calle",
          "label": "Calle",
          "type": "text",
          "required": true,
          "md": 3,
          "value": ""
        },
        {
          "name": "direccion_numero",
          "label": "Número",
          "type": "number",
          "required": true,
          "md": 1,
          "value": ""
        },
        {
          "name": "direccion_sector",
          "label": "Sector/Barrio",
          "type": "text",
          "required": true,
          "md": 2,
          "value": ""
        },
        {
          "name": "direccion_municipio",
          "label": "Municipio",
          "type": "text",
          "required": true,
          "md": 2,
          "value": ""
        },
        {
          "name": "direccion_provincia",
          "label": "Provincia",
          "type": "select",
          "required": true,
          "modelOptions": "Provincia",
          "md": 3.38,
          "value": ""
        },
        {
          "name": "telefono",
          "label": "Teléfono",
          "type": "tel",
          "required": true,
          "md": 3,
          "value": ""
        },
        {
          "name": "correo_electronico",
          "label": "Correo Electrónico",
          "type": "email",
          "required": false,
          "md": 3.15,
          "value": ""
        }
      ]
    },
    {
      "sectionTitle": "2. Información del Responsable Técnico",
      "divider": true,
      "fields": [
        {
          "name": "nombre_responsable",
          "label": "Nombre Completo del Responsable Técnico",
          "type": "text",
          "required": true,
          "md": 6.3,
          "value": ""
        },
        {
          "name": "cedula_responsable",
          "label": "Cédula de Identidad",
          "type": "id",
          "required": true,
          "md": 5.54,
          "value": ""
        },
        {
          "name": "titulo_universitario",
          "label": "Título Universitario",
          "type": "text",
          "required": true,
          "md": 6.3,
          "value": ""
        },
        {
          "name": "numero_exequatur",
          "label": "Número de Exequátur",
          "type": "number",
          "required": true,
          "md": 2,
          "value": ""
        },
        {
          "name": "telefono_responsable",
          "label": "Teléfono del Responsable Técnico",
          "type": "tel",
          "required": true,
          "md": 3.38,
          "value": ""
        },
        {
          "name": "correo_responsable",
          "label": "Correo Electrónico del Responsable Técnico",
          "type": "email",
          "required": true,
          "md": 3.15,
          "value": ""
        }
      ]
    },
    {
      "sectionTitle": "3. Detalles del Proyecto",
      "divider": true,
      "fields": [
        {
          "name": "tipo_establecimiento",
          "label": "Tipo de Establecimiento",
          "type": "select",
          "required": true,
          "modelOptions": "TipoFarmacia",
          "md": 3.15,
          "value": ""
        },
        {
          "name": "servicios_ofrecidos",
          "label": "Servicios Ofrecidos",
          "type": "checkbox",
          "options": [
            "Dispensación de Medicamentos",
            "Venta de Productos de Higiene",
            "Fórmulas Magistrales",
            "Otros"
          ],
          "md": 8,
          "value": ""
        },
        {
          "name": "descripcion_proyecto",
          "label": "Descripción del Proyecto",
          "type": "text",
          "required": false,
          "md": 12,
          "value": ""
        }
      ]
    },
    {
      "sectionTitle": "4. Documentos Adjuntos",
      "divider": true,
      "fields": [
        {
          "name": "certificado_nombre",
          "label": "Certificado de Nombre Comercial (ONAPI)",
          "type": "file",
          "required": true,
          "md": 3.9,
          "value": ""
        },
        {
          "name": "planos_local",
          "label": "Planos del Local Avalados (CODIA)",
          "type": "file",
          "required": false,
          "md": 3.9,
          "value": ""
        },
        {
          "name": "cedula_propietario",
          "label": "Cédula del Propietario",
          "type": "file",
          "required": false,
          "md": 3.9,
          "value": ""
        },
        {
          "name": "titulo_responsable",
          "label": "Título Universitario del Responsable Técnico",
          "type": "file",
          "required": false,
          "md": 3.9,
          "value": ""
        },
        {
          "name": "rnc",
          "label": "Certificado del RNC",
          "type": "file",
          "required": false,
          "md": 3.9,
          "value": ""
        },
        {
          "name": "contrato_titulo",
          "label": "Contrato de Alquiler o Título de Propiedad",
          "type": "file",
          "required": false,
          "md": 3.9,
          "value": ""
        },
        {
          "name": "declaracion_jurada",
          "label": "Declaración Jurada",
          "type": "file",
          "required": false,
          "md": 3.9,
          "value": ""
        },
        {
          "name": "comprobante_pago",
          "label": "Comprobante de Pago",
          "type": "file",
          "required": false,
          "md": 3.9,
          "value": ""
        }
      ]
    }
  ];  

  // Datos fake (puedes reemplazar con una API)
  const fakeData = [
    {
      Id_Formulario: 1,
      Nombre_Formulario: "Formulario A",
      Creado_Por: 101,
      Modificado_Por: null,
      Fecha_Creacion: "2025-01-01",
      Fecha_Ultima_Modificacion: null,
      Campos_Formulario: "[{\"sectionTitle\":\"Sección 1\",\"fields\":[{\"name\":\"campo1\",\"label\":\"Campo 1\",\"type\":\"text\",\"value\":\"\"}]}]",
      Estado: "Activo",
    },
    {
      Id_Formulario: 2,
      Nombre_Formulario: "Formulario B",
      Creado_Por: 102,
      Modificado_Por: 103,
      Fecha_Creacion: "2025-01-02",
      Fecha_Ultima_Modificacion: "2025-01-05",
      Campos_Formulario: JSON.stringify(jsonData),
      Estado: "Inactivo",
    },
    {
      Id_Formulario: 3,
      Nombre_Formulario: "Formulario C",
      Creado_Por: 104,
      Modificado_Por: 105,
      Fecha_Creacion: "2025-01-03",
      Fecha_Ultima_Modificacion: "2025-01-06",
      Campos_Formulario: '{"campo1": "valor5", "campo2": "valor6"}',
      Estado: "Activo",
    },
    {
      Id_Formulario: 4,
      Nombre_Formulario: "Formulario D",
      Creado_Por: 106,
      Modificado_Por: 107,
      Fecha_Creacion: "2025-01-07",
      Fecha_Ultima_Modificacion: "2025-01-09",
      Campos_Formulario: '{"campo1": "valor7", "campo2": "valor8"}',
      Estado: "Inactivo",
    },
    {
      Id_Formulario: 5,
      Nombre_Formulario: "Formulario E",
      Creado_Por: 108,
      Modificado_Por: null,
      Fecha_Creacion: "2025-01-10",
      Fecha_Ultima_Modificacion: null,
      Campos_Formulario: '{"campo1": "valor9", "campo2": "valor10"}',
      Estado: "Activo",
    },
    {
      Id_Formulario: 6,
      Nombre_Formulario: "Formulario F",
      Creado_Por: 109,
      Modificado_Por: 110,
      Fecha_Creacion: "2025-01-11",
      Fecha_Ultima_Modificacion: "2025-01-12",
      Campos_Formulario: '{"campo1": "valor11", "campo2": "valor12"}',
      Estado: "Activo",
    },
    {
      Id_Formulario: 7,
      Nombre_Formulario: "Formulario G",
      Creado_Por: 111,
      Modificado_Por: 112,
      Fecha_Creacion: "2025-01-13",
      Fecha_Ultima_Modificacion: "2025-01-14",
      Campos_Formulario: '{"campo1": "valor13", "campo2": "valor14"}',
      Estado: "Inactivo",
    },
    {
      Id_Formulario: 8,
      Nombre_Formulario: "Formulario H",
      Creado_Por: 113,
      Modificado_Por: null,
      Fecha_Creacion: "2025-01-15",
      Fecha_Ultima_Modificacion: null,
      Campos_Formulario: '{"campo1": "valor15", "campo2": "valor16"}',
      Estado: "Activo",
    },
    {
      Id_Formulario: 9,
      Nombre_Formulario: "Formulario I",
      Creado_Por: 114,
      Modificado_Por: 115,
      Fecha_Creacion: "2025-01-16",
      Fecha_Ultima_Modificacion: "2025-01-17",
      Campos_Formulario: '{"campo1": "valor17", "campo2": "valor18"}',
      Estado: "Inactivo",
    },
    {
      Id_Formulario: 10,
      Nombre_Formulario: "Formulario J",
      Creado_Por: 116,
      Modificado_Por: 117,
      Fecha_Creacion: "2025-01-18",
      Fecha_Ultima_Modificacion: "2025-01-19",
      Campos_Formulario: '{"campo1": "valor19", "campo2": "valor20"}',
      Estado: "Activo",
    },
  ];

  useEffect(() => {
    setFormularios(fakeData);
    setFilteredData(fakeData);
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRowClick = (id) => {
    setSelectedId(id);
    console.log("ID seleccionado: ", id);
  };

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
        <Box >
          <DynamicForm formFields={jsonFields} />
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
        boxShadow: theme.shadows[3],
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
        <SearchBar data={formularios} onFilterChange={handleFilterChange} label={"Buscar formulario por nombre"} />
        <FilterAutocomplete
          label="Estado"
          data={formularios}
          filterKey="Estado"
          onFilterChange={handleFilterChange}
        />
      </Box>

      {/* Tabla de resultados */}
          {/* Tabla de resultados */}
      <TableContainer component={Paper} sx={{ borderRadius: "8px" }}>
        <Table>
          <TableHead sx={{ backgroundColor: theme.palette.primary.main }}>
            <TableRow>
              <TableCell sx={{ color: theme.palette.primary.contrastText }}>ID</TableCell>
              <TableCell sx={{ color: theme.palette.primary.contrastText }}>
                Nombre del Formulario
              </TableCell>
              <TableCell sx={{ color: theme.palette.primary.contrastText }}>Creado Por</TableCell>
              <TableCell sx={{ color: theme.palette.primary.contrastText }}>Modificado Por</TableCell>
              <TableCell sx={{ color: theme.palette.primary.contrastText }}>
                Fecha de Creación
              </TableCell>
              <TableCell sx={{ color: theme.palette.primary.contrastText }}>
                Última Modificación
              </TableCell>
              {/* <TableCell sx={{ color: theme.palette.primary.contrastText }}>Campos</TableCell> */}
              <TableCell sx={{ color: theme.palette.primary.contrastText }}>Estado</TableCell>
              <TableCell sx={{ color: theme.palette.primary.contrastText }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedFormularios.map((formulario) => (
              <TableRow
                key={formulario.Id_Formulario}
                hover
                onClick={() => handleRowClick(formulario.Id_Formulario)}
                sx={{ cursor: "pointer" }}
              >
                <TableCell>{formulario.Id_Formulario}</TableCell>
                <TableCell>{formulario.Nombre_Formulario}</TableCell>
                <TableCell>{formulario.Creado_Por}</TableCell>
                <TableCell>{formulario.Modificado_Por || "N/A"}</TableCell>
                <TableCell>{formulario.Fecha_Creacion}</TableCell>
                <TableCell>{formulario.Fecha_Ultima_Modificacion || "N/A"}</TableCell>
                {/* <TableCell>
                  {JSON.stringify(JSON.parse(formulario.Campos_Formulario), null, 2)}
                </TableCell> */}
                <TableCell>{formulario.Estado}</TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", gap: "8px" }}>
                    <IconButton color="primary" onClick={() => handleView(formulario.Id_Formulario)}>
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton color="secondary" onClick={() => handleEdit(formulario.Id_Formulario)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color={formulario.Estado === "Activo" ? "success" : "error"}
                      onClick={() => toggleEstado(formulario.Id_Formulario)}
                    >
                      {formulario.Estado === "Activo" ? <ToggleOnIcon /> : <ToggleOffIcon />}
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                colSpan={9}
                count={filteredData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{
                  borderTop: `1px solid ${theme.palette.divider}`,
                  width: "100%",
                }}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>

      {/* Mostrar ID seleccionado temporalmente */}
      {/* {selectedId && (
        <Typography variant="h6" sx={{ marginTop: "20px" }}>
          ID seleccionado: {selectedId}
        </Typography>
      )} */}

<DialogComponent
  open={dialogOpen}
  onClose={() => setDialogOpen(false)}
  title="Detalles del Formulario"
>
  {dialogContent}
</DialogComponent>


    </Box>
    
);
};

export default VerFormularios;
