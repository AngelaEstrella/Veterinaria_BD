import React, { useState, useEffect } from 'react';
import Table from '../common/Table';
import Modal from '../common/Modal';

const ClientesManagement = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('add'); // 'add', 'edit', 'view'
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [mascotas, setMascotas] = useState([]);
  const [formData, setFormData] = useState({
    dni: '',
    nombre: '',
    apellido_paterno: '',
    apellido_materno: '',
    telefono: '',
    email: '',
    genero: 'F',
    direccion: '',
    estado: 'Activo'
  });

  const BASE_URL = 'https://veterinariaclinicabackend-production.up.railway.app/api/v1';

  // Cargar clientes al montar el componente
  useEffect(() => {
    fetchClientes();
  }, []);

  // Función para obtener todos los clientes
  const fetchClientes = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/clientes`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        setClientes(data.clientes || data);
      } else {
        console.error('Error al cargar clientes:', response.statusText);
        alert('Error al cargar los clientes');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error de conexión al cargar clientes');
    } finally {
      setLoading(false);
    }
  };

  // Función para obtener mascotas de un cliente
  const fetchMascotasCliente = async (clienteId) => {
    try {
      const response = await fetch(`${BASE_URL}/catalogos/cliente-mascota/cliente/${clienteId}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        setMascotas(data.mascotas || []);
      } else {
        setMascotas([]);
      }
    } catch (error) {
      console.error('Error al cargar mascotas:', error);
      setMascotas([]);
    }
  };

  const handleAdd = () => {
    setModalType('add');
    setFormData({
      dni: '',
      nombre: '',
      apellido_paterno: '',
      apellido_materno: '',
      telefono: '',
      email: '',
      genero: 'F',
      direccion: '',
      estado: 'Activo'
    });
    setMascotas([]);
    setShowModal(true);
  };

  const handleEdit = async (cliente) => {
    setModalType('edit');
    setSelectedCliente(cliente);
    setFormData({
      dni: cliente.dni || '',
      nombre: cliente.nombre || '',
      apellido_paterno: cliente.apellido_paterno || '',
      apellido_materno: cliente.apellido_materno || '',
      telefono: cliente.telefono || '',
      email: cliente.email || '',
      genero: cliente.genero || 'F',
      direccion: cliente.direccion || '',
      estado: cliente.estado || 'Activo'
    });
    setMascotas([]);
    setShowModal(true);
  };

  const handleView = async (cliente) => {
    setModalType('view');
    setSelectedCliente(cliente);
    await fetchMascotasCliente(cliente.id_cliente);
    setShowModal(true);
  };

  const handleDelete = async (cliente) => {
    if (window.confirm(`¿Está seguro de eliminar al cliente ${cliente.nombre} ${cliente.apellido_paterno}?`)) {
      setLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/clientes/${cliente.id_cliente}`, {
          method: 'DELETE',
          mode: 'cors',
          headers: {
            'Accept': 'application/json',
          },
        });
        
        if (response.ok) {
          alert('Cliente eliminado exitosamente');
          fetchClientes(); // Recargar la lista
        } else {
          const errorData = await response.json();
          alert(`Error al eliminar cliente: ${errorData.detail || 'Error desconocido'}`);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error de conexión al eliminar cliente');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validaciones básicas
    if (!formData.dni || !formData.nombre || !formData.apellido_paterno || 
        !formData.telefono || !formData.email) {
      alert('Por favor, complete todos los campos requeridos');
      setLoading(false);
      return;
    }

    try {
      const clienteData = {
        dni: formData.dni,
        nombre: formData.nombre,
        apellido_paterno: formData.apellido_paterno,
        apellido_materno: formData.apellido_materno,
        telefono: formData.telefono,
        email: formData.email,
        genero: formData.genero,
        direccion: formData.direccion,
        estado: formData.estado
      };

      let response;
      
      if (modalType === 'add') {
        response = await fetch(`${BASE_URL}/clientes`, {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(clienteData),
        });
      } else if (modalType === 'edit') {
        response = await fetch(`${BASE_URL}/clientes/${selectedCliente.id_cliente}`, {
          method: 'PUT',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(clienteData),
        });
      }

      if (response.ok) {
        alert(modalType === 'add' ? 'Cliente agregado exitosamente' : 'Cliente actualizado exitosamente');
        setShowModal(false);
        fetchClientes(); // Recargar la lista
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.detail || 'Error desconocido'}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error de conexión al guardar cliente');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { key: 'dni', header: 'DNI' },
    { key: 'nombre', header: 'NOMBRES' },
    { key: 'apellido_paterno', header: 'A. PATE' },
    { key: 'apellido_materno', header: 'A. MATERN' },
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

  if (loading && clientes.length === 0) {
    return <div style={{ textAlign: 'center', padding: '50px' }}>Cargando clientes...</div>;
  }

  return (
    <div className="clientes-management">
      <div className="section-header">
        <h2>Clientes / Lista Clientes</h2>
        <button onClick={handleAdd} className="btn-add" disabled={loading}>
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
                <div><strong>DNI:</strong> {selectedCliente?.dni}</div>
                <div><strong>Nombres:</strong> {selectedCliente?.nombre}</div>
                <div><strong>Apellido Paterno:</strong> {selectedCliente?.apellido_paterno}</div>
                <div><strong>Apellido Materno:</strong> {selectedCliente?.apellido_materno}</div>
                <div><strong>Género:</strong> {selectedCliente?.genero === 'F' ? 'Femenino' : 'Masculino'}</div>
                <div><strong>Estado:</strong> {selectedCliente?.estado}</div>
              </div>
              
              <h3>DATOS DE CONTACTO</h3>
              <div className="info-grid">
                <div><strong>Teléfono:</strong> {selectedCliente?.telefono || '-'}</div>
                <div><strong>Email:</strong> {selectedCliente?.email || '-'}</div>
                <div><strong>Dirección:</strong> {selectedCliente?.direccion || '-'}</div>
              </div>
              
              <h3>MASCOTAS REGISTRADAS</h3>
              <div className="mascotas-table">
                <table>
                  <thead>
                    <tr>
                      <th>NOMBRE</th>
                      <th>ESPECIE</th>
                      <th>RAZA</th>
                      <th>COLOR</th>
                      <th>EDAD</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mascotas.length > 0 ? (
                      mascotas.map((mascota, index) => (
                        <tr key={index}>
                          <td>{mascota.nombre}</td>
                          <td>{mascota.sexo}</td>
                          <td>{mascota.raza}</td>
                          <td>{mascota.color}</td>
                          <td>{mascota.edad_anios} años, {mascota.edad_meses} meses</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5">No hay mascotas registradas</td>
                      </tr>
                    )}
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
                  <label>DNI (*)</label>
                  <input
                    type="text"
                    value={formData.dni}
                    onChange={(e) => setFormData({...formData, dni: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>GÉNERO (*)</label>
                  <select
                    value={formData.genero}
                    onChange={(e) => setFormData({...formData, genero: e.target.value})}
                    required
                  >
                    <option value="F">Femenino</option>
                    <option value="M">Masculino</option>
                  </select>
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>NOMBRES (*)</label>
                  <input
                    type="text"
                    value={formData.nombre}
                    onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>APELLIDO PATERNO (*)</label>
                  <input
                    type="text"
                    value={formData.apellido_paterno}
                    onChange={(e) => setFormData({...formData, apellido_paterno: e.target.value})}
                    required
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>APELLIDO MATERNO</label>
                  <input
                    type="text"
                    value={formData.apellido_materno}
                    onChange={(e) => setFormData({...formData, apellido_materno: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>ESTADO (*)</label>
                  <select
                    value={formData.estado}
                    onChange={(e) => setFormData({...formData, estado: e.target.value})}
                    required
                  >
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                  </select>
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
                    required
                  />
                </div>
                <div className="form-group">
                  <label>EMAIL (*)</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>
              </div>
              
              <div className="form-group full-width">
                <label>DIRECCIÓN (*)</label>
                <input
                  type="text"
                  value={formData.direccion}
                  onChange={(e) => setFormData({...formData, direccion: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="button" onClick={() => setShowModal(false)} className="btn-cancel" disabled={loading}>
                CANCELAR
              </button>
              <button type="submit" className="btn-submit" disabled={loading}>
                {loading ? 'PROCESANDO...' : 'FINALIZAR REGISTRO'}
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default ClientesManagement;