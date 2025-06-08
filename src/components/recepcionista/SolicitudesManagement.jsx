// components/recepcionista/SolicitudesManagement.jsx
import React, { useState } from 'react';
import Table from '../common/Table';
import Modal from '../common/Modal';

const SolicitudesManagement = () => {
  const [solicitudes, setSolicitudes] = useState([
    { 
      id: 1, 
      mascota: 'Firulais', 
      cliente: 'María Alejandra Guerra', 
      fecha: '15/01/2025', 
      hora: '12:00', 
      estado: 'Asignada'
    },
    { 
      id: 2, 
      mascota: 'Toribio', 
      cliente: 'Chavo del ocho', 
      fecha: '14/01/2025', 
      hora: '16:00', 
      estado: 'Pendiente'
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    mascota: '',
    dueño: '',
    tipoSolicitud: ''
  });

  const handleAdd = () => {
    setFormData({
      mascota: '',
      dueño: '',
      tipoSolicitud: ''
    });
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSolicitud = {
      id: Date.now(),
      mascota: formData.mascota,
      cliente: formData.dueño,
      fecha: new Date().toLocaleDateString('es-ES'),
      hora: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
      estado: 'Pendiente'
    };
    setSolicitudes(prev => [...prev, newSolicitud]);
    setShowModal(false);
  };

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
    { label: '✏️', type: 'edit', onClick: () => {} },
    { label: '🗑️', type: 'delete', onClick: () => {} }
  ];

  return (
    <div className="solicitudes-management">
      <div className="section-header">
        <h2>Solicitudes / Nueva solicitud</h2>
        <button onClick={handleAdd} className="btn-add">
          + Añadir Solicitud
        </button>
      </div>

      <div className="solicitudes-table-section">
        <h3>LISTA DE SOLICITUDES</h3>
        <Table 
          columns={columns}
          data={solicitudes}
          actions={actions}
          emptyMessage="No hay solicitudes registradas"
        />
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="REGISTRO DE SOLICITUD DE ATENCIÓN"
        size="medium"
      >
        <form onSubmit={handleSubmit} className="solicitud-form">
          <div className="form-group">
            <label>MASCOTA (*) (Se pone solito)</label>
            <select
              value={formData.mascota}
              onChange={(e) => setFormData({...formData, mascota: e.target.value})}
              required
            >
              <option value="">Nombre / Mascota</option>
              <option value="Lucky">Lucky</option>
              <option value="Max">Max</option>
              <option value="Luna">Luna</option>
            </select>
          </div>

          <div className="form-group">
            <label>DUEÑO (Se pone solito)</label>
            <input
              type="text"
              value={formData.dueño}
              onChange={(e) => setFormData({...formData, dueño: e.target.value})}
              placeholder="Dueño / DNI"
              required
            />
          </div>

          <div className="form-group">
            <label>TIPO DE SOLICITUD</label>
            <select
              value={formData.tipoSolicitud}
              onChange={(e) => setFormData({...formData, tipoSolicitud: e.target.value})}
            >
              <option value="">Seleccionar</option>
              <option value="consulta">Consulta general</option>
              <option value="emergencia">Emergencia</option>
              <option value="vacunacion">Vacunación</option>
              <option value="cirugia">Cirugía</option>
            </select>
          </div>

          <div className="form-actions">
            <button type="button" onClick={() => setShowModal(false)} className="btn-cancel">
              CANCELAR
            </button>
            <button type="submit" className="btn-submit">
              CREAR SOLICITUD
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default SolicitudesManagement;