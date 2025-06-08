import React, { useState } from 'react';
import Table from '../common/Table';
import Modal from '../common/Modal';

const VetManagement = () => {
  const [veterinarios, setVeterinarios] = useState([
    { 
      id: 'C54H67B', 
      dni: '74343', 
      nombre: 'Julio', 
      apellidos: 'Morales Garcia',
      especialidad: 'Radiografia',
      estado: 'LIBRE'
    },
    { 
      id: 'STU562P1', 
      dni: '64331', 
      nombre: 'Maria', 
      apellidos: 'Paz Solano',
      especialidad: 'Traumatologia',
      estado: 'OCUPADO'
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('add');
  const [selectedVet, setSelectedVet] = useState(null);
  const [formData, setFormData] = useState({
    dni: '',
    codigoCmp: '',
    genero: '',
    nombres: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    telefono: '',
    email: '',
    fechaNacimiento: '',
    turno: '',
    proVeterinario: '',
    especialidad: '',
    contraseña: ''
  });

  const handleAdd = () => {
    setModalType('add');
    setFormData({
      dni: '',
      codigoCmp: '',
      genero: '',
      nombres: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
      telefono: '',
      email: '',
      fechaNacimiento: '',
      turno: '',
      proVeterinario: '',
      especialidad: '',
      contraseña: ''
    });
    setShowModal(true);
  };

  const handleEdit = (vet) => {
    setModalType('edit');
    setSelectedVet(vet);
    setFormData({
      dni: vet.dni,
      codigoCmp: vet.id,
      genero: '',
      nombres: vet.nombre,
      apellidoPaterno: vet.apellidos.split(' ')[0] || '',
      apellidoMaterno: vet.apellidos.split(' ')[1] || '',
      telefono: '',
      email: '',
      fechaNacimiento: '',
      turno: '',
      proVeterinario: vet.especialidad,
      especialidad: vet.especialidad,
      contraseña: ''
    });
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modalType === 'add') {
      const newVet = {
        id: formData.codigoCmp,
        dni: formData.dni,
        nombre: formData.nombres,
        apellidos: `${formData.apellidoPaterno} ${formData.apellidoMaterno}`,
        especialidad: formData.especialidad,
        estado: 'LIBRE'
      };
      setVeterinarios(prev => [...prev, newVet]);
    } else {
      setVeterinarios(prev => prev.map(v => 
        v.id === selectedVet.id 
          ? { ...v, nombre: formData.nombres, apellidos: `${formData.apellidoPaterno} ${formData.apellidoMaterno}`, especialidad: formData.especialidad }
          : v
      ));
    }
    setShowModal(false);
  };

  const columns = [
    { key: 'id', header: 'N°' },
    { key: 'dni', header: 'DNI' },
    { key: 'id', header: 'CODIGO CMP' },
    { key: 'nombre', header: 'Nombre' },
    { key: 'apellidos', header: 'Apellidos' },
    { key: 'especialidad', header: 'Especialidad' },
    { 
      key: 'estado', 
      header: 'Estado',
      render: (row) => (
        <span className={`status-badge ${row.estado === 'LIBRE' ? 'status-libre' : 'status-ocupado'}`}>
          {row.estado}
        </span>
      )
    }
  ];

  const actions = [
    { label: '✏️', type: 'edit', onClick: handleEdit }
  ];

  return (
    <div className="vet-management">
      <div className="section-header">
        <h2>REGISTRO DE VETERINARIOS</h2>
        <button onClick={handleAdd} className="btn-add">
          AGREGAR
        </button>
      </div>

      <Table 
        columns={columns}
        data={veterinarios}
        actions={actions}
        emptyMessage="No hay veterinarios registrados"
      />

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={modalType === 'add' ? 'AGREGAR' : 'EDITAR'}
        size="large"
      >
        <form onSubmit={handleSubmit} className="vet-form">
          <div className="form-section">
            <h3>DATOS PERSONALES</h3>
            <div className="form-row three-cols">
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
                <label>CODIGO CMP(*)</label>
                <input
                  type="text"
                  value={formData.codigoCmp}
                  onChange={(e) => setFormData({...formData, codigoCmp: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>GENERO(*)</label>
                <select
                  value={formData.genero}
                  onChange={(e) => setFormData({...formData, genero: e.target.value})}
                  required
                >
                  <option value="">NO ESPECIFICAR</option>
                  <option value="M">Masculino</option>
                  <option value="F">Femenino</option>
                </select>
              </div>
            </div>

            <div className="form-row three-cols">
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
                <label>APELLIDO MATERNO(*)</label>
                <input
                  type="text"
                  value={formData.apellidoMaterno}
                  onChange={(e) => setFormData({...formData, apellidoMaterno: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>APELLIDO PATERNO(*)</label>
                <input
                  type="text"
                  value={formData.apellidoPaterno}
                  onChange={(e) => setFormData({...formData, apellidoPaterno: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="form-row three-cols">
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
              <div className="form-group">
                <label>F. DE NACIMIENTO (*)</label>
                <input
                  type="date"
                  value={formData.fechaNacimiento}
                  onChange={(e) => setFormData({...formData, fechaNacimiento: e.target.value})}
                />
              </div>
            </div>

            <div className="form-row three-cols">
              <div className="form-group">
                <label>TURNO(*)</label>
                <select
                  value={formData.turno}
                  onChange={(e) => setFormData({...formData, turno: e.target.value})}
                >
                  <option value="">MAÑANA</option>
                  <option value="mañana">Mañana</option>
                  <option value="tarde">Tarde</option>
                  <option value="noche">Noche</option>
                </select>
              </div>
              <div className="form-group">
                <label>PRO VETERINARIO(*)</label>
                <select
                  value={formData.proVeterinario}
                  onChange={(e) => setFormData({...formData, proVeterinario: e.target.value})}
                >
                  <option value="">ESPECIALISTA</option>
                  <option value="general">General</option>
                  <option value="especialista">Especialista</option>
                </select>
              </div>
              <div className="form-group">
                <label>ESPECIALIDAD (*)</label>
                <select
                  value={formData.especialidad}
                  onChange={(e) => setFormData({...formData, especialidad: e.target.value})}
                >
                  <option value="">RADIOGRAFIA</option>
                  <option value="radiografia">Radiografía</option>
                  <option value="traumatologia">Traumatología</option>
                  <option value="cirugia">Cirugía</option>
                  <option value="dermatologia">Dermatología</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Estado</label>
              <select>
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo</option>
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

export default VetManagement;