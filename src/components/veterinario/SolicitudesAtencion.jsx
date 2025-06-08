// components/veterinario/SolicitudesAtencion.jsx
import React, { useState } from 'react';
import Table from '../common/Table';
import Modal from '../common/Modal';
import FichaTriaje from './FichaTriaje';
import FichaConsulta from './FichaConsulta';

const SolicitudesAtencion = () => {
  const [solicitudes, setSolicitudes] = useState([
    { 
      id: 1, 
      mascota: 'Lucky', 
      cliente: 'María Alejandra Guerra', 
      fecha: '15/01/2025', 
      hora: '10:00', 
      estado: 'Asignada',
      urgencia: 'Media'
    },
    { 
      id: 2, 
      mascota: 'Max', 
      cliente: 'Carlos del agua', 
      fecha: '14/01/2025', 
      hora: '14:00', 
      estado: 'Pendiente',
      urgencia: 'Alta'
    }
  ]);

  const [selectedSolicitud, setSelectedSolicitud] = useState(null);
  const [showTriaje, setShowTriaje] = useState(false);
  const [showConsulta, setShowConsulta] = useState(false);
  const [filtroUrgencia, setFiltroUrgencia] = useState('todas');

  const handleAtender = (solicitud) => {
    setSelectedSolicitud(solicitud);
    setShowTriaje(true);
  };

  const handleTriajeComplete = () => {
    setShowTriaje(false);
    setShowConsulta(true);
  };

  const handleConsultaComplete = () => {
    setShowConsulta(false);
    setSelectedSolicitud(null);
    // Actualizar estado de la solicitud
    setSolicitudes(prev => 
      prev.map(s => 
        s.id === selectedSolicitud.id 
          ? { ...s, estado: 'Atendida' }
          : s
      )
    );
  };

  const solicitudesFiltradas = solicitudes.filter(s => 
    filtroUrgencia === 'todas' || s.urgencia.toLowerCase() === filtroUrgencia
  );

  const columns = [
    { key: 'mascota', header: 'MASCOTA' },
    { key: 'cliente', header: 'CLIENTE' },
    { key: 'fecha', header: 'FECHA' },
    { key: 'hora', header: 'HORA' },
    { 
      key: 'estado', 
      header: 'ESTADO',
      render: (row) => (
        <span className={`status-badge status-${row.estado.toLowerCase()}`}>
          {row.estado}
        </span>
      )
    }
  ];

  const actions = [
    {
      label: 'Atender',
      type: 'primary',
      onClick: handleAtender
    }
  ];

  return (
    <div className="solicitudes-atencion">
      <div className="section-header">
        <h2>Solicitudes de Atención</h2>
        <div className="filters">
          <label>Filtrar por urgencia:</label>
          <select 
            value={filtroUrgencia}
            onChange={(e) => setFiltroUrgencia(e.target.value)}
          >
            <option value="todas">Todas</option>
            <option value="alta">Alta</option>
            <option value="media">Media</option>
            <option value="baja">Baja</option>
          </select>
        </div>
      </div>

      <Table 
        columns={columns}
        data={solicitudesFiltradas}
        actions={actions}
        emptyMessage="No hay solicitudes pendientes"
      />

      {/* Modal Ficha de Triaje */}
      <Modal
        isOpen={showTriaje}
        onClose={() => setShowTriaje(false)}
        title="Ficha Triaje"
        size="large"
      >
        <FichaTriaje 
          solicitud={selectedSolicitud}
          onComplete={handleTriajeComplete}
          onCancel={() => setShowTriaje(false)}
        />
      </Modal>

      {/* Modal Ficha de Consulta */}
      <Modal
        isOpen={showConsulta}
        onClose={() => setShowConsulta(false)}
        title="Ficha Consulta"
        size="large"
      >
        <FichaConsulta 
          solicitud={selectedSolicitud}
          onComplete={handleConsultaComplete}
          onCancel={() => setShowConsulta(false)}
        />
      </Modal>
    </div>
  );
};

export default SolicitudesAtencion;