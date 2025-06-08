import React, { useState } from 'react';
import Table from '../common/Table';
import Modal from '../common/Modal';

const ServicesManagement = () => {
  const [servicios, setServicios] = useState([
    { id: 123, nombre: 'RADIOGRAFIA', precio: 500 }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('add');
  const [selectedService, setSelectedService] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    precio: ''
  });

  const handleAdd = () => {
    setModalType('add');
    setFormData({ nombre: '', precio: '' });
    setShowModal(true);
  };

  const handleEdit = (service) => {
    setModalType('edit');
    setSelectedService(service);
    setFormData({
      nombre: service.nombre,
      precio: service.precio.toString()
    });
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modalType === 'add') {
      const newService = {
        id: Date.now(),
        nombre: formData.nombre,
        precio: parseInt(formData.precio)
      };
      setServicios(prev => [...prev, newService]);
    } else {
      setServicios(prev => prev.map(s => 
        s.id === selectedService.id 
          ? { ...s, nombre: formData.nombre, precio: parseInt(formData.precio) }
          : s
      ));
    }
    setShowModal(false);
  };

  const columns = [
    { key: 'id', header: 'ID' },
    { key: 'nombre', header: 'NOMBRE' },
    { 
      key: 'precio', 
      header: 'PRECIO',
      render: (row) => `S/ ${row.precio}`
    }
  ];

  const actions = [
    { label: '✏️', type: 'edit', onClick: handleEdit },
    { label: '🗑️', type: 'delete', onClick: () => {} }
  ];

  return (
    <div className="services-management">
      <div className="section-header">
        <h2>CRUD Servicios</h2>
        <div className="service-categories">
          <select>
            <option>IMAGENES</option>
            <option>LABORATORIO</option>
            <option>MEDICINA FISICA</option>
          </select>
          <button onClick={handleAdd} className="btn-add">
            AGREGAR
          </button>
        </div>
      </div>

      <Table 
        columns={columns}
        data={servicios}
        actions={actions}
        emptyMessage="No hay servicios registrados"
      />

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={modalType === 'add' ? 'AGREGAR' : 'EDITAR'}
        size="medium"
      >
        <form onSubmit={handleSubmit} className="service-form">
          <div className="form-group">
            <label>NOMBRES (*)</label>
            <input
              type="text"
              value={formData.nombre}
              onChange={(e) => setFormData({...formData, nombre: e.target.value})}
              placeholder="RADIOGRAFIA"
              required
            />
          </div>

          <div className="form-group">
            <label>PRECIO (*)</label>
            <input
              type="number"
              value={formData.precio}
              onChange={(e) => setFormData({...formData, precio: e.target.value})}
              placeholder="S/ 500"
              required
            />
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

export default ServicesManagement;