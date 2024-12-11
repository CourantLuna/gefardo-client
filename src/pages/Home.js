import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
  const [provincias, setProvincias] = useState([]);

  useEffect(() => {
    // Realizar una solicitud GET a la API de Provincias
    axios.get('/api/provincias')
      .then(response => {
        setProvincias(response.data);
      })
      .catch(error => {
        console.error("Hubo un error al obtener las provincias", error);
      });
  }, []);

  return (
    <div>
      <h1>Lista de Provincias</h1>
      <ul>
        {provincias.map(provincia => (
          <li key={provincia.Id_Provincia}>
            {provincia.Descripcion} - {provincia.Estado === 1 ? 'Activo' : 'Inactivo'}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
