import React, { useState } from 'react';
import Table from '../common/Table';
import Modal from '../common/Modal';

const ReceptionistManagement = () => {
  const [recepcionistas, setRecepcionistas] = useState([
    { id: 123, nombre: 'JUAN CARLOS', estado: 'Activo' }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('add');
  const [formData, setFormData] = useState({
    dni: '',
    nombres: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    telefono: '',
    email: '',
    turno: '',
    contraseña: ''
  });

  const handleAdd = () => {
    setModalType('add');
    setFormData({
      dni: '',
      nombres: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
      telefono: '',
      email: '',
      turno: '',
      contraseña: ''
    });
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modalType === 'add') {
      const newRecep = {
        id: parseInt(formData.dni),
        nombre: `${formData.nombres} ${formData.apellidoPaterno}`,
        estado: 'Activo'
      };
      setRecepcionistas(prev => [...prev, newRecep]);
    }
    setShowModal(false);
  };

  const columns = [
    { key: 'id', header: 'ID' },
    { key: 'nombre', header: 'NOMBRE' },
    { key: 'estado', header: 'ESTADO' }
  ];

  const actions = [
    { label: '✏️', type: 'edit', onClick: () => {} },
    { label: '🗑️', type: 'delete', onClick: () => {} }
  ];

  return (
    <div className="recepcionista-management">
      <div className="section-header">
        <h2>CRUD Recepcionista</h2>
        <button onClick={handleAdd} className="btn-add">
          AGREGAR
        </button>
      </div>

      <Table 
        columns={columns}
        data={recepcionistas}
        actions={actions}
        emptyMessage="No hay recepcionistas registrados"
      />

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={modalType === 'add' ? 'AGREGAR' : 'EDITAR'}
        size="large"
      >
        <form onSubmit={handleSubmit} className="recepcionista-form">
          <div className="form-section">
            <h3>DATOS PERSONALES</h3>
            <div className="form-row">
              <div className="form-group">
                <label>DNI(*)</label>
                <input
                  type="text"
                  value={formData.dni}
                  onChange={(e) => setFormData({...formData, dni: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>NOMBRES(*)</label>
                <input
                  type="text"
                  value={formData.nombres}
                  onChange={(e) => setFormData({...formData, nombres: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Genero (*)</label>
                <select>
                  <option value="">F</option>
                  <option value="M">Masculino</option>
                  <option value="F">Femenino</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>APELLIDO PATERNO(*)</label>
                <input
                  type="text"
                  value={formData.apellidoPaterno}
                  onChange={(e) => setFormData({...formData, apellidoPaterno: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>APELLIDO MATERNO(*)</label>
                <input
                  type="text"
                  value={formData.apellidoMaterno}
                  onChange={(e) => setFormData({...formData, apellidoMaterno: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>TELEFONO(*)</label>
                <input
                  type="tel"
                  value={formData.telefono}
                  onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>EMAIL(*)</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>TURNO(*)</label>
                <select
                  value={formData.turno}
                  onChange={(e) => setFormData({...formData, turno: e.target.value})}
                >
                  <option value="">CONTRASEÑA</option>
                  <option value="mañana">Mañana</option>
                  <option value="tarde">Tarde</option>
                </select>
              </div>
              <div className="form-group">
                <label>CONTRASEÑA(*)</label>
                <input
                  type="password"
                  value={formData.contraseña}
                  onChange={(e) => setFormData({...formData, contraseña: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Estado (*)</label>
              <select>
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo</option>
              </select>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" onClick={() => setShowModal(false)} className="btn-cancel">
              Cancelar
            </button>
            <button type="submit" className="btn-submit">
              GUARDAR
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ReceptionistManagement;