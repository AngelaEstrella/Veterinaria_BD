import React, { useState } from 'react';
import Table from '../common/Table';
import Modal from '../common/Modal';

const ClientesManagement = () => {
  const [clientes, setClientes] = useState([
    { id: 7244759, nombres: 'Luis Nikola', apPaterno: 'Marcos', apMaterno: 'Tapia', estado: 'Activo' },
    { id: 69357733, nombres: 'German', apPaterno: 'Torres', apMaterno: 'Del Campo', estado: 'No activo' }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('add'); // 'add', 'edit', 'view'
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [formData, setFormData] = useState({
    dni: '',
    nombres: '',
    apPaterno: '',
    apMaterno: '',
    telefono: '',
    email: '',
    direccion: '',
    mascotasRegistradas: []
  });

  const handleAdd = () => {
    setModalType('add');
    setFormData({
      dni: '',
      nombres: '',
      apPaterno: '',
      apMaterno: '',
      telefono: '',
      email: '',
      direccion: '',
      mascotasRegistradas: []
    });
    setShowModal(true);
  };

  const handleEdit = (cliente) => {
    setModalType('edit');
    setSelectedCliente(cliente);
    setFormData({
      dni: cliente.id.toString(),
      nombres: cliente.nombres,
      apPaterno: cliente.apPaterno,
      apMaterno: cliente.apMaterno,
      telefono: '',
      email: '',
      direccion: '',
      mascotasRegistradas: []
    });
    setShowModal(true);
  };

  const handleView = (cliente) => {
    setModalType('view');
    setSelectedCliente(cliente);
    setShowModal(true);
  };

  const handleDelete = (cliente) => {
    if (window.confirm('¿Está seguro de eliminar este cliente?')) {
      setClientes(prev => prev.filter(c => c.id !== cliente.id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modalType === 'add') {
      const newCliente = {
        id: parseInt(formData.dni),
        nombres: formData.nombres,
        apPaterno: formData.apPaterno,
        apMaterno: formData.apMaterno,
        estado: 'Activo'
      };
      setClientes(prev => [...prev, newCliente]);
    } else if (modalType === 'edit') {
      setClientes(prev => prev.map(c => 
        c.id === selectedCliente.id 
          ? { ...c, nombres: formData.nombres, apPaterno: formData.apPaterno, apMaterno: formData.apMaterno }
          : c
      ));
    }
    setShowModal(false);
  };

  const columns = [
    { key: 'id', header: 'DNI' },
    { key: 'nombres', header: 'NOMBRES' },
    { key: 'apPaterno', header: 'A. PATE' },
    { key: 'apMaterno', header: 'A. MATERN' },
    { 
      key: 'estado', 
      header: 'ESTADO',
      render: (row) => (
        <span className={`status-badge ${row.estado === 'Activo' ? 'status-active' : 'status-inactive'}`}>
          {row.estado}
        </span>
      )
    }
  ];

  const actions = [
    { label: '✏️', type: 'edit', onClick: handleEdit },
    { label: '👁️', type: 'view', onClick: handleView },
    { label: '🗑️', type: 'delete', onClick: handleDelete }
  ];

  return (
    <div className="clientes-management">
      <div className="section-header">
        <h2>Clientes / Lista Clientes</h2>
        <button onClick={handleAdd} className="btn-add">
          + Añadir Cliente
        </button>
      </div>

      <div className="clients-table-section">
        <h3>CLIENTES REGISTRADOS</h3>
        <Table 
          columns={columns}
          data={clientes}
          actions={actions}
          emptyMessage="No hay clientes registrados"
        />
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={modalType === 'add' ? 'Nuevo cliente' : modalType === 'edit' ? 'Editar cliente' : 'Ver cliente'}
        size="large"
      >
        {modalType === 'view' ? (
          <div className="cliente-view">
            <div className="form-section">
              <h3>DATOS PERSONALES</h3>
              <div className="info-grid">
                <div><strong>DNI:</strong> {selectedCliente?.id}</div>
                <div><strong>Nombres:</strong> {selectedCliente?.nombres}</div>
                <div><strong>Apellido Paterno:</strong> {selectedCliente?.apPaterno}</div>
                <div><strong>Apellido Materno:</strong> {selectedCliente?.apMaterno}</div>
              </div>
              
              <h3>DATOS DE CONTACTO</h3>
              <div className="info-grid">
                <div><strong>Teléfono:</strong> -</div>
                <div><strong>Email:</strong> -</div>
                <div><strong>Dirección:</strong> -</div>
              </div>
              
              <h3>MASCOTAS REGISTRADAS</h3>
              <div className="mascotas-table">
                <table>
                  <thead>
                    <tr>
                      <th>NOMBRE</th>
                      <th>ESPECIE</th>
                      <th>RAZA</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan="3">No hay mascotas registradas</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="cliente-form">
            <div className="form-section">
              <h3>DATOS PERSONALES</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>DNI DEL CLIENTE (*)</label>
                  <input
                    type="text"
                    value={formData.dni}
                    onChange={(e) => setFormData({...formData, dni: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>NOMBRES (*)</label>
                  <input
                    type="text"
                    value={formData.nombres}
                    onChange={(e) => setFormData({...formData, nombres: e.target.value})}
                    required
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>APELLIDO PATERNO(*)</label>
                  <input
                    type="text"
                    value={formData.apPaterno}
                    onChange={(e) => setFormData({...formData, apPaterno: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>APELLIDO MATERNO(*)</label>
                  <input
                    type="text"
                    value={formData.apMaterno}
                    onChange={(e) => setFormData({...formData, apMaterno: e.target.value})}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>DATOS DE CONTACTO</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>TELÉFONO (*)</label>
                  <input
                    type="tel"
                    value={formData.telefono}
                    onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>EMAIL (*)</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="form-group full-width">
                <label>DIRECCIÓN (*)</label>
                <input
                  type="text"
                  value={formData.direccion}
                  onChange={(e) => setFormData({...formData, direccion: e.target.value})}
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="button" onClick={() => setShowModal(false)} className="btn-cancel">
                CANCELAR
              </button>
              <button type="submit" className="btn-submit">
                FINALIZAR REGISTRO
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default ClientesManagement;