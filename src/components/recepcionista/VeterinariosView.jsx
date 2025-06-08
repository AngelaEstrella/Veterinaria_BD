// components/recepcionista/VeterinariosView.jsx
import React, { useState } from 'react';
import Table from '../common/Table';

const VeterinariosView = () => {
  const [veterinarios, setVeterinarios] = useState([
    { 
      id: 'C54H67B', 
      dni: '74343', 
      nombre: 'Julio', 
      apellidos: 'Morales Garcia',
      especialidad: 'Radiografia',
      estado: 'LIBRE'
    },
    { 
      id: 'STU562P1', 
      dni: '64331', 
      nombre: 'Maria', 
      apellidos: 'Paz Solano',
      especialidad: 'Traumatologia',
      estado: 'OCUPADO'
    }
  ]);

  const [filtros, setFiltros] = useState({
    busqueda: '',
    especialidad: ''
  });

  const handleFiltroChange = (e) => {
    setFiltros({
      ...filtros,
      [e.target.name]: e.target.value
    });
  };

  const veterinariosFiltrados = veterinarios.filter(vet => {
    return (
      (filtros.busqueda === '' || vet.nombre.toLowerCase().includes(filtros.busqueda.toLowerCase())) &&
      (filtros.especialidad === '' || vet.especialidad.toLowerCase().includes(filtros.especialidad.toLowerCase()))
    );
  });

  const columns = [
    { key: 'id', header: 'N°' },
    { key: 'dni', header: 'DNI' },
    { key: 'id', header: 'CODIGO CMP' },
    { key: 'nombre', header: 'Nombre' },
    { key: 'apellidos', header: 'Apellidos' },
    { key: 'especialidad', header: 'Especialidad' },
    { 
      key: 'estado', 
      header: 'Estado',
      render: (row) => (
        <span className={`status-badge ${row.estado === 'LIBRE' ? 'status-libre' : 'status-ocupado'}`}>
          {row.estado}
        </span>
      )
    }
  ];

  return (
    <div className="veterinarios-view">
      <div className="section-header">
        <h2>Veterinarios</h2>
        <div className="filters-row">
          <input
            type="text"
            name="busqueda"
            placeholder="Buscar veterinario..."
            value={filtros.busqueda}
            onChange={handleFiltroChange}
            className="search-input"
          />
          <select
            name="especialidad"
            value={filtros.especialidad}
            onChange={handleFiltroChange}
          >
            <option value="">Todas las especialidades</option>
            <option value="radiografia">Radiografía</option>
            <option value="traumatologia">Traumatología</option>
            <option value="cirugia">Cirugía</option>
          </select>
        </div>
      </div>

      <div className="veterinarios-table-section">
        <h3>REGISTRO DE VETERINARIOS</h3>
        <Table 
          columns={columns}
          data={veterinariosFiltrados}
          emptyMessage="No hay veterinarios registrados"
        />
      </div>
    </div>
  );
};

export default VeterinariosView;