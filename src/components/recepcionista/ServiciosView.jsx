// components/recepcionista/ServiciosView.jsx
import React, { useState } from 'react';
import Table from '../common/Table';

const ServiciosView = () => {
  const [servicios, setServicios] = useState([
    { id: 1, servicio: 'Radiografia', tipo: 'Imagenes', precio: 'S/ Precio' },
    { id: 2, servicio: 'Otro servicio', tipo: 'Tipo', precio: 'S/ Precio' }
  ]);

  const [filtroTipo, setFiltroTipo] = useState('');

  const serviciosFiltrados = servicios.filter(servicio => 
    filtroTipo === '' || servicio.tipo.toLowerCase().includes(filtroTipo.toLowerCase())
  );

  const columns = [
    { key: 'id', header: 'N°' },
    { key: 'servicio', header: 'Servicio' },
    { key: 'tipo', header: 'Tipo' },
    { key: 'precio', header: 'Precio' }
  ];

  return (
    <div className="servicios-view">
      <div className="section-header">
        <h2>Servicios</h2>
        <select
          value={filtroTipo}
          onChange={(e) => setFiltroTipo(e.target.value)}
        >
          <option value="">IMAGENES</option>
          <option value="imagenes">Imágenes</option>
          <option value="laboratorio">Laboratorio</option>
          <option value="medicina">Medicina Física</option>
        </select>
      </div>

      <div className="servicios-table-section">
        <h3>SERVICIOS DISPONIBLES</h3>
        <Table 
          columns={columns}
          data={serviciosFiltrados}
          emptyMessage="No hay servicios disponibles"
        />
      </div>
    </div>
  );
};

export default ServiciosView;