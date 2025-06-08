// components/veterinario/CitasProgramadas.jsx
import React, { useState } from 'react';
import Table from '../common/Table';
import Modal from '../common/Modal';
import AtenderCita from './AtenderCita';

const CitasProgramadas = () => {
  const [citas, setCitas] = useState([
    {
      id: 1,
      mascota: 'Lucky',
      servicio: 'Consulta',
      fecha: '15/01/2025',
      hora: '14:30',
      veterinario: 'Veterinario 1',
      estado: 'Atendida'
    },
    {
      id: 2,
      mascota: 'Max',
      servicio: 'Vacunación',
      fecha: '15/01/2025',
      hora: '16:00',
      veterinario: 'Veterinario 1',
      estado: 'Pendiente'
    }
  ]);

  const [selectedCita, setSelectedCita] = useState(null);
  const [showAtender, setShowAtender] = useState(false);

  const handleAtender = (cita) => {
    setSelectedCita(cita);
    setShowAtender(true);
  };

  const handleAtenderComplete = () => {
    setShowAtender(false);
    setCitas(prev => 
      prev.map(c => 
        c.id === selectedCita.id 
          ? { ...c, estado: 'Atendida' }
          : c
      )
    );
    setSelectedCita(null);
  };

  const columns = [
    { key: 'mascota', header: 'MASCOTA' },
    { key: 'servicio', header: 'SERVICIO' },
    { key: 'fecha', header: 'FECHA' },
    { key: 'hora', header: 'HORA' },
    { key: 'veterinario', header: 'VETERINARIO' },
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
    <div className="citas-programadas">
      <div className="section-header">
        <h2>Citas Programadas - Hoy</h2>
      </div>

      <Table 
        columns={columns}
        data={citas}
        actions={actions}
        emptyMessage="No hay citas programadas para hoy"
      />

      <Modal
        isOpen={showAtender}
        onClose={() => setShowAtender(false)}
        title="Atender Cita"
        size="large"
      >
        <AtenderCita 
          cita={selectedCita}
          onComplete={handleAtenderComplete}
          onCancel={() => setShowAtender(false)}
        />
      </Modal>
    </div>
  );
};

export default CitasProgramadas;