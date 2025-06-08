// components/veterinario/ListadoMascotas.jsx
import React, { useState } from 'react';
import Table from '../common/Table';

const ListadoMascotas = () => {
  const [mascotas, setMascotas] = useState([
    {
      id: 1,
      nombre: 'Lucky',
      especie: 'Perro',
      raza: 'Criollo',
      genero: 'M',
      color: 'Negro',
      proximaCita: '20/01/2025',
      ultimaAtencion: '15/01/2025'
    },
    {
      id: 2,
      nombre: 'Max',
      especie: 'Gato',
      raza: 'Blanco',
      genero: 'H',
      color: 'Púrpura',
      proximaCita: '22/01/2025',
      ultimaAtencion: '10/01/2025'
    }
  ]);

  const [filtros, setFiltros] = useState({
    especie: '',
    genero: '',
    busqueda: ''
  });

  const handleFiltroChange = (e) => {
    setFiltros({
      ...filtros,
      [e.target.name]: e.target.value
    });
  };

  const mascotasFiltradas = mascotas.filter(mascota => {
    return (
      (filtros.especie === '' || mascota.especie.toLowerCase().includes(filtros.especie.toLowerCase())) &&
      (filtros.genero === '' || mascota.genero === filtros.genero) &&
      (filtros.busqueda === '' || mascota.nombre.toLowerCase().includes(filtros.busqueda.toLowerCase()))
    );
  });

  const columns = [
    { key: 'nombre', header: 'NOMBRE' },
    { key: 'especie', header: 'ESPECIE' },
    { key: 'raza', header: 'RAZA' },
    { key: 'genero', header: 'GÉNERO' },
    { key: 'color', header: 'COLOR' },
    { key: 'proximaCita', header: 'PRÓXIMA CITA' },
    { key: 'ultimaAtencion', header: 'ÚLTIMA ATENCIÓN' }
  ];

  return (
    <div className="listado-mascotas">
      <div className="section-header">
        <h2>Listado de Mascotas</h2>
        
        <div className="filters-row">
          <input
            type="text"
            name="busqueda"
            placeholder="Buscar mascota..."
            value={filtros.busqueda}
            onChange={handleFiltroChange}
            className="search-input"
          />
          
          <select
            name="especie"
            value={filtros.especie}
            onChange={handleFiltroChange}
          >
            <option value="">Todas las especies</option>
            <option value="perro">Perro</option>
            <option value="gato">Gato</option>
            <option value="ave">Ave</option>
            <option value="otro">Otro</option>
          </select>
          
          <select
            name="genero"
            value={filtros.genero}
            onChange={handleFiltroChange}
          >
            <option value="">Todos los géneros</option>
            <option value="M">Macho</option>
            <option value="H">Hembra</option>
          </select>
        </div>
      </div>

      <Table 
        columns={columns}
        data={mascotasFiltradas}
        emptyMessage="No se encontraron mascotas"
      />
    </div>
  );
};

export default ListadoMascotas;