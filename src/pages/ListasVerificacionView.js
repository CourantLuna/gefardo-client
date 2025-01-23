import React, { useState } from "react";
import {
  TextField,
  Checkbox,
  Button,
  Grid,
  Box,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";

const ListasVerificacionView = () => {
  const [lista, setLista] = useState([]);
  const [nuevoItem, setNuevoItem] = useState({
    item_auditar: "",
    conforme: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    setNuevoItem((prev) => ({
      ...prev,
      conforme: e.target.checked,
    }));
  };

  const agregarItem = () => {
    if (nuevoItem.item_auditar.trim() !== "") {
      setLista((prev) => [...prev, { ...nuevoItem }]);
      setNuevoItem({ item_auditar: "", conforme: false });
    }
  };

  const actualizarItem = (index, key, value) => {
    const nuevaLista = [...lista];
    nuevaLista[index][key] = value;
    setLista(nuevaLista);
  };

  const obtenerJSON = () => {
    console.log(JSON.stringify(lista, null, 2));
    alert("JSON generado. Revisa la consola.");
  };

  return (
    <Box sx={{ padding: 2 }}>
    <Grid
      container
      marginLeft={1}
      spacing={1}
      alignItems=""
      justifyContent={"space-around"}
    >
      <Grid item xs={8}>
        <div>
          <label style={{ fontWeight: "bold", marginBottom: 4 }}>Ítem a Auditar</label>
          <TextField
            fullWidth
            size="small"
            label=""
            name="item_auditar"
            value={nuevoItem.item_auditar}
            onChange={handleInputChange}
          />
        </div>
      </Grid>
      <Grid item xs={2}>
        <div>
          <label style={{ fontWeight: "bold", marginBottom: 4 }}>Es Conforme</label>
          <Checkbox
            checked={nuevoItem.conforme}
            onChange={handleCheckboxChange}
            color="primary"
          />
        </div>
      </Grid>
      <Grid item xs={2}>
        <Button variant="contained" onClick={agregarItem}>
          Añadir
        </Button>
      </Grid>
    </Grid>
    <Table sx={{ marginTop: 1 }}>
      <TableBody>
        {lista.map((item, index) => (
          <TableRow key={index}>
            <TableCell>
              <div>
                <label style={{ fontWeight: "bold", marginBottom: 4 }}>
                  Ítem a Auditar
                </label>
                <TextField
                  size="small"
                  fullWidth
                  value={item.item_auditar}
                  onChange={(e) =>
                    actualizarItem(index, "item_auditar", e.target.value)
                  }
                />
              </div>
            </TableCell>
            <TableCell>
              <div>
                <label style={{ fontWeight: "bold", marginBottom: 4 }}>
                  Es Conforme
                </label>
                <Checkbox
                  checked={item.conforme}
                  onChange={(e) =>
                    actualizarItem(index, "conforme", e.target.checked)
                  }
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    <Button
      variant="contained"
      sx={{ marginTop: 2 }}
      onClick={obtenerJSON}
      fullWidth
    >
      Guardar Lista de verificación
    </Button>
  </Box>
  
  );
};

export default ListasVerificacionView;
