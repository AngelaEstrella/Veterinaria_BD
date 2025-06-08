// components/recepcionista/CitasManagement.jsx
import React, { useState } from 'react';
import Table from '../common/Table';
import Modal from '../common/Modal';

const CitasManagement = () => {
  const [citas, setCitas] = useState([
    {
      id: 1,
      mascota: 'Firulais',
      servicio: 'Limpio',
      fecha: '15/01/2025',
      hora: '10:30',
      veterinario: 'Veterinario 1',
      estado: 'ATENDIDA'
    },
    {
      id: 2,
      mascota: 'Flora care',
      servicio: 'Gato',
      fecha: '23/10/2017',
      hora: 'Carretera aves',
      veterinario: 'Veterinario 1',
      estado: 'PENDIENTE'
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [formData, setFormData] = useState({
    mascota: '',
    dueño: '',
    servicio: '',
    fechaProgramada: '',
    requiereAyuno: false,
    observaciones: ''
  });

  const handleAdd = () => {
    setFormData({
      mascota: '',
      dueño: '',
      servicio: '',
      fechaProgramada: '',
      requiereAyuno: false,
      observaciones: ''
    });
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCita = {
      id: Date.now(),
      mascota: formData.mascota,
      servicio: formData.servicio,
      fecha: formData.fechaProgramada,
      hora: '10:00',
      veterinario: 'Veterinario 1',
      estado: 'PENDIENTE'
    };
    setCitas(prev => [...prev, newCita]);
    setShowModal(false);
  };

  const columns = [
    { key: 'id', header: 'N°' },
    { key: 'mascota', header: 'Mascota' },
    { key: 'servicio', header: 'Servicio' },
    { key: 'fecha', header: 'Fecha' },
    { key: 'veterinario', header: 'Veterinario' },
    { 
      key: 'estado', 
      header: 'Estado',
      render: (row) => (
        <span className={`status-badge status-${row.estado.toLowerCase()}`}>
          {row.estado}
        </span>
      )
    }
  ];

  const actions = [
    { label: '✏️', type: 'edit', onClick: () => {} },
    { label: '👁️', type: 'view', onClick: () => {} }
  ];

  return (
    <div className="citas-management">
      <div className="section-header">
        <h2>Citas / Nueva Cita</h2>
        <div className="header-buttons">
          <button onClick={handleAdd} className="btn-add">
            + Añadir Cita
          </button>
          <button onClick={() => setShowCalendar(true)} className="btn-secondary">
            📅 Cronograma citas
          </button>
        </div>
      </div>

      <div className="citas-table-section">
        <h3>REGISTROS DE CITAS</h3>
        <Table 
          columns={columns}
          data={citas}
          actions={actions}
          emptyMessage="No hay citas registradas"
        />
      </div>

      {/* Modal Nueva Cita */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="REGISTRO DE UNA NUEVA CITA"
        size="medium"
      >
        <form onSubmit={handleSubmit} className="cita-form">
          <div className="form-row">
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
          </div>

          <div className="form-group">
            <label>SERVICIO SOLICITADO</label>
            <select
              value={formData.servicio}
              onChange={(e) => setFormData({...formData, servicio: e.target.value})}
              required
            >
              <option value="">Radiografia</option>
              <option value="radiografia">Radiografía</option>
              <option value="consulta">Consulta</option>
              <option value="vacunacion">Vacunación</option>
              <option value="cirugia">Cirugía</option>
            </select>
          </div>

          <div className="form-group">
            <label>FECHA PROGRAMADA</label>
            <input
              type="date"
              value={formData.fechaProgramada}
              onChange={(e) => setFormData({...formData, fechaProgramada: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label>REQUIERE AYUNO</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="requiereAyuno"
                  checked={formData.requiereAyuno === true}
                  onChange={() => setFormData({...formData, requiereAyuno: true})}
                />
                Sí
              </label>
              <label>
                <input
                  type="radio"
                  name="requiereAyuno"
                  checked={formData.requiereAyuno === false}
                  onChange={() => setFormData({...formData, requiereAyuno: false})}
                />
                No
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>OBSERVACIONES</label>
            <textarea
              value={formData.observaciones}
              onChange={(e) => setFormData({...formData, observaciones: e.target.value})}
              placeholder="Alguna observación"
              rows="3"
            />
          </div>

          <div className="form-actions">
            <button type="button" onClick={() => setShowModal(false)} className="btn-cancel">
              CANCELAR
            </button>
            <button type="submit" className="btn-submit">
              CREAR CITA
            </button>
          </div>
        </form>
      </Modal>

      {/* Modal Calendario */}
      <Modal
        isOpen={showCalendar}
        onClose={() => setShowCalendar(false)}
        title="CALENDARIO DE CITAS"
        size="large"
      >
        <div className="calendario-citas">
          <div className="calendar-header">
            <h3>Junio 06, 2025</h3>
            <div className="calendar-nav">
              <button>◀</button>
              <span>Jun</span>
              <button>▶</button>
            </div>
          </div>
          <div className="calendar-grid">
            <div className="calendar-days">
              <div>Dom</div><div>Lun</div><div>Mar</div><div>Mié</div><div>Jue</div><div>Vie</div><div>Sáb</div>
            </div>
            <div className="calendar-dates">
              {Array.from({length: 30}, (_, i) => (
                <div key={i} className={`calendar-date ${i === 6 ? 'selected' : ''}`}>
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CitasManagement;