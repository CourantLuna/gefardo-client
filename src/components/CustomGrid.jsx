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
  Button
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";

const CustomGrid = ({
  data = [],
  columns = [], // Campos a mostrar en la tabla [{ key: "id", label: "ID" }]
  actions = {}, // { onView, onEdit, onToggle, actionButton1, actionButton2 }
  rowsPerPageOptions = [5, 10, 25], // Opciones de paginación

}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const theme = useTheme();

// Llamar a la función onResetPage desde el componente padre para cambiar la página

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
                }}              >
                {column.label}
              </TableCell>
            ))}
            {(actions.onView ||
              actions.onEdit ||
              actions.onToggle ||
              actions.actionButton1 ||
              actions.actionButton2) && (
              <TableCell
                sx={{
                  color: theme.palette.primary.contrastText,
                  textAlign: "center",
                }}
              >
                Acciones
              </TableCell>
            )}

          </TableRow>
        </TableHead>

        {/* Cuerpo */}
        <TableBody>
          {paginatedData.map((row, index) => (
            <TableRow 
            key={row[idKey] || index}
            
             hover
             >
              {columns.map((column) => {
  const isBoolean = column.isBoolean;
  const isStatusField = column.isStatusField;
  const stateColors = column.StateColors || {}; // Obtiene los colores del estado
  
  return (
    <TableCell
      key={column.key}
      sx={{
        color: isBoolean
          ? row[column.key]
            ? "success.main"
            : "error.main"
          : isStatusField
          ? theme.palette[stateColors[row[column.key]]]?.main || "inherit"
          : "inherit", // Si no es booleano ni de estado, usa color por defecto
        fontWeight: isBoolean || isStatusField ? "bold" : "normal", // Negrita si es booleano o estado
      }}
    >
      {isBoolean
        ? row[column.key]
          ? "Sí"
          : "No"
        : row[column.key] || "N/A"} {/* Valor mostrado */}
    </TableCell>
  );
})}


              {(actions.onView ||
                actions.onEdit ||
                actions.onToggle ||
                actions.actionButton1 ||
                actions.actionButton2) && (
                  <TableCell
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }} 
                  >
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
                    {actions.actionButton1 && (
                      <Button
                      variant="contained"
                      color={
                        actions.actionButton1.colors[
                          actions.actionButton1.estados.indexOf(
                            row[columns.find((col) => col.isStatusField).key]
                          )
                        ] || "primary"
                      } // Color dinámico
                      onClick={() => actions.actionButton1.onClick(row[idKey])}
                      size="small"
                      sx={{
                        width: "180px",
                      }}px
                    >
                      {
                        actions.actionButton1.labels?.[
                          actions.actionButton1.estados?.indexOf(
                            row[columns.find((col) => col.isStatusField)?.key]
                          )
                        ]
                      }{" "}
                      {/* Texto dinámico */}
                    </Button>
                    )}
                    {actions.actionButton2 && (
                      <Button
                        variant="contained"
                        color={actions.actionButton2.color || "secondary"} // Color del botón
                        onClick={() => actions.actionButton2.onClick(row[idKey])} // Acción al hacer clic
                        size="small"
                        sx={{
                          width: "180px",
                        }}px
                      >
                        {actions.actionButton2.label} {/* Texto del botón */}
                      </Button>
                    )}
                  </Box>
                </TableCell>
              )}

            </TableRow>
          ))}
        </TableBody>

        {/* Paginación */}
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={rowsPerPageOptions}
              colSpan={columns.length + (actions.onView || actions.onEdit || actions.onToggle ? 1 : 0)} // Ajusta dinámicamente
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
