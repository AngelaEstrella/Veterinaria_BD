import React, { useState } from 'react';
import Table from '../common/Table';
import Modal from '../common/Modal';

const UserManagement = () => {
  const [users, setUsers] = useState([
    { id: 123, nombre: 'JUAN CARLOS', role: 'admin' }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAdd = () => {
    setShowModal(true);
  };

  const handleEdit = (user) => {
    console.log('Editar usuario:', user);
  };

  const handleDelete = (user) => {
    if (window.confirm('¿Está seguro de eliminar este usuario?')) {
      setUsers(prev => prev.filter(u => u.id !== user.id));
    }
  };

  const columns = [
    { key: 'id', header: 'ID' },
    { key: 'nombre', header: 'NOMBRE' },
    { key: 'role', header: 'ROL' }
  ];

  const actions = [
    { label: '✏️', type: 'edit', onClick: handleEdit },
    { label: '🗑️', type: 'delete', onClick: handleDelete }
  ];

  const filteredUsers = users.filter(user =>
    user.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="user-management">
      <div className="section-header">
        <input
          type="text"
          placeholder="Nombre o código"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button onClick={handleAdd} className="btn-add">
          AGREGAR
        </button>
      </div>

      <Table 
        columns={columns}
        data={filteredUsers}
        actions={actions}
        emptyMessage="No hay usuarios registrados"
      />

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Agregar Usuario"
        size="medium"
      >
        <div className="modal-form">
          <p>Formulario para agregar usuario aquí...</p>
          <button onClick={() => setShowModal(false)} className="btn-submit">
            Cerrar
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default UserManagement;