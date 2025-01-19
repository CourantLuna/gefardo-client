import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Box,
  IconButton,
  TableFooter,
  useTheme, 
  Switch,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";

const CustomGrid = ({
  data = [],
  columns = [], // Campos a mostrar en la tabla [{ key: "id", label: "ID" }]
  actions = {}, // { onView: func, onEdit: func, onToggle: func }
  rowsPerPageOptions = [5, 10, 25], // Opciones de paginación
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const theme = useTheme();

  // Detectar el campo clave (primera columna)
  const idKey = columns[0]?.key || "id";

  // Paginación
  const paginatedData = data.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper} sx={{ borderRadius: "8px" }}>
      <Table>
        {/* Encabezado */}
        <TableHead sx={{ backgroundColor: theme.palette.primary.main }}>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.key}
                sx={{
                  color: theme.palette.primary.contrastText,
                  textAlign: "center", // Centrar el texto
                }}              >
                {column.label}
              </TableCell>
            ))}
            <TableCell sx={{ color: theme.palette.primary.contrastText,textAlign: "center" }}>
              Acciones
            </TableCell>
          </TableRow>
        </TableHead>

        {/* Cuerpo */}
        <TableBody>
          {paginatedData.map((row, index) => (
            <TableRow key={row[idKey] || index} hover>
              {columns.map((column) => (
               <TableCell
               key={column.key}
               sx={{
                 color:
                   column.key === "Estado"
                     ? row[column.key] === true
                       ? "success.main" // Verde si es true
                       : "error.main" // Rojo si es false
                     : "inherit", // Color predeterminado para otros campos
                 fontWeight: column.key === "Estado" ? "bold" : "normal", // Resaltar el estado
               }}
             >
               {column.key === "Estado"
                 ? row[column.key] === true
                   ? "Sí" // Mostrar "Sí" para true
                   : "No" // Mostrar "No" para false
                 : row[column.key] || "N/A"}
             </TableCell>
             
              ))}
              <TableCell>
                <Box sx={{ display: "flex", gap: "8px" }}>
                  {actions.onView && (
                    <IconButton
                      color="primary"
                      onClick={() => actions.onView(row[idKey])}
                    >
                      <VisibilityIcon />
                    </IconButton>
                  )}
                  {actions.onEdit && (
                    <IconButton
                      color="primary"
                      onClick={() => actions.onEdit(row[idKey])}
                    >
                      <EditIcon />
                    </IconButton>
                  )}
                  {actions.onToggle && (
                    
                    
                    
                    <Switch
                      checked={row.Estado === true}
                      onChange={() => actions.onToggle(row[idKey])}
                      color={row.Estado === true ? "primary" : "default"}
                      inputProps={{ "aria-label": "toggle switch" }}

                    />
                  )}

                

                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

        {/* Paginación */}
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={rowsPerPageOptions}
              colSpan={columns.length + 1} // Incluye la columna de Acciones
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default CustomGrid;
