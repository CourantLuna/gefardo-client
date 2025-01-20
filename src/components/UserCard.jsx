import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Chip,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Box, Select,
  MenuItem,

} from "@mui/material";
import { Edit, Close } from "@mui/icons-material";
  import AddIcon from "@mui/icons-material/Add";

function UserCard({ usuario, roles, roleConfig, toggleEstado, handleAddRole, handleDeleteRole }) {
  const [isEditing, setIsEditing] = useState(false);

const [selectedRole, setSelectedRole] = useState("");

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };


  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };


  return (
    <Card
      variant="elevation"
      sx={{
        Height: "fit-content",
        minHeight: "380px",
        position: "relative",
      }}
    >
      {/* Botón FAB de Editar/Guardar */}
      <IconButton
        color={isEditing ? "success" : "primary"} // Cambia el color según el modo
        size="small"
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          zIndex: 1,
          boxShadow: 2,
        }}
        onClick={handleEditToggle}
      >
        {isEditing ? <Close fontSize="small" /> : <Edit fontSize="small" />}
      </IconButton>
      <CardContent>
        <Typography variant="h6" maxWidth="80%" textOverflow="clip">
          {usuario.Nombre} {usuario.Apellido}
        </Typography>

        {/* Mostrar roles como chips */}
        <Box mt={2}>
          {roles[usuario.Id_Usuario]?.length > 0 ? (
            roles[usuario.Id_Usuario].map((rolId, index) => {
              const role = roleConfig[rolId];
              return (
                <Chip
                  key={index}
                  label={role.name}
                  color={role.color}
                  icon={role.icon}
                  style={{ marginRight: 2, marginBottom: 2 }}
                  onDelete={isEditing ? () => handleDeleteRole(rolId, usuario.Id_Usuario) : undefined}
                />
              );
            })
          ) : (
            <Typography variant="body2" color="textSecondary">
              Sin roles asignados
            </Typography>
          )}
   
       {/* Formulario para añadir rol */}
          {isEditing && (
            <Box display="flex" alignItems="center" gap={1} marginTop={1}>
              <Select
                value={selectedRole}
                onChange={handleRoleChange}
                displayEmpty
                fullWidth
                size="small"
              >
                <MenuItem value="" disabled>
                  Seleccione un rol
                </MenuItem>
                {Object.keys(roleConfig).map((key) => (
                  <MenuItem key={key} value={key}>
                    {roleConfig[key].name}
                  </MenuItem>
                ))}
              </Select>
              <IconButton
                color="primary"
                onClick={() => handleAddRole(selectedRole, usuario.Id_Usuario)}
                disabled={!selectedRole}
              >
                <AddIcon />
              </IconButton>
            </Box>
          )}



        </Box>

        {/* Mini tabla para Código y Correo */}
        <TableContainer
          sx={{
            marginTop: 2,
            border: "1px solid",
            borderColor: "divider",
            borderRadius: "4px",
          }}
        >
          <Table size="small" aria-label="mini table">
            <TableBody>
              <TableRow>
                <TableCell
                  sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}
                >
                  Código
                </TableCell>
                <TableCell>{usuario.Id_Usuario}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}
                >
                  Cedula
                </TableCell>
                <TableCell>{usuario.Cedula}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}
                >
                  Correo
                </TableCell>
                <TableCell>{usuario.Correo_Electronico}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>

      <Box sx={{ display: "flex", alignItems: "center", padding: 2 }}>
        <Switch
          checked={usuario.Estado}
          disabled={!isEditing}
          onChange={() =>
            toggleEstado(usuario.Id_Usuario, usuario.Nombre, usuario.Estado)
          }
          color="success"
        />
        <Typography
          variant="body2"
          color={usuario.Estado ? "green" : "red"}
        >
          {usuario.Estado ? "Activo" : "Inactivo"}
        </Typography>
      </Box>
    </Card>
  );
}

export default UserCard;
