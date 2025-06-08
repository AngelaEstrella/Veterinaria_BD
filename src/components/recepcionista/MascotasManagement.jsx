// components/recepcionista/MascotasManagement.jsx
import React, { useState } from 'react';
import Table from '../common/Table';
import Modal from '../common/Modal';

const MascotasManagement = () => {
  const [mascotas, setMascotas] = useState([
    { id: 1, nombre: 'Lucky', especie: 'Perro', raza: 'Criollo', genero: 'M', color: 'Negro' },
    { id: 2, nombre: 'Max miau', especie: 'Gato', raza: 'Blanco', genero: 'H', color: 'Púrpura' }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('add');
  const [selectedMascota, setSelectedMascota] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    dueño: '',
    sexo: '',
    color: '',
    edad: '',
    especie: '',
    raza: '',
    esterilizado: ''
  });

  const handleAdd = () => {
    setModalType('add');
    setFormData({
      nombre: '',
      dueño: '',
      sexo: '',
      color: '',
      edad: '',
      especie: '',
      raza: '',
      esterilizado: ''
    });
    setShowModal(true);
  };

  const handleView = (mascota) => {
    setModalType('view');
    setSelectedMascota(mascota);
    setShowModal(true);
  };

  const handleEdit = (mascota) => {
    setModalType('edit');
    setSelectedMascota(mascota);
    setFormData({
      nombre: mascota.nombre,
      dueño: '',
      sexo: mascota.genero,
      color: mascota.color,
      edad: '',
      especie: mascota.especie,
      raza: mascota.raza,
      esterilizado: ''
    });
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modalType === 'add') {
      const newMascota = {
        id: Date.now(),
        nombre: formData.nombre,
        especie: formData.especie,
        raza: formData.raza,
        genero: formData.sexo,
        color: formData.color
      };
      setMascotas(prev => [...prev, newMascota]);
    } else if (modalType === 'edit') {
      setMascotas(prev => prev.map(m => 
        m.id === selectedMascota.id 
          ? { ...m, nombre: formData.nombre, especie: formData.especie, raza: formData.raza, genero: formData.sexo, color: formData.color }
          : m
      ));
    }
    setShowModal(false);
  };

  const columns = [
    { key: 'nombre', header: 'NOMBRE' },
    { key: 'especie', header: 'ESPECIE' },
    { key: 'raza', header: 'RAZA' },
    { key: 'genero', header: 'GÉNERO' },
    { key: 'color', header: 'COLOR' }
  ];

  const actions = [
    { label: '👁️', type: 'view', onClick: handleView },
    { label: '✏️', type: 'edit', onClick: handleEdit },
    { label: '🗑️', type: 'delete', onClick: () => {} }
  ];

  return (
    <div className="mascotas-management">
      <div className="section-header">
        <h2>Mascotas / Nueva mascota</h2>
        <button onClick={handleAdd} className="btn-add">
          + Añadir Mascota
        </button>
      </div>

      <div className="mascotas-table-section">
        <h3>MASCOTAS REGISTRADAS</h3>
        <Table 
          columns={columns}
          data={mascotas}
          actions={actions}
          emptyMessage="No hay mascotas registradas"
        />
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={modalType === 'add' ? 'Nueva mascota' : modalType === 'edit' ? 'Editar mascota' : 'Ver mascota'}
        size="large"
      >
        {modalType === 'view' ? (
          <div className="mascota-view">
            <div className="form-section">
              <h3>DATOS GENERALES DE LA MASCOTA</h3>
              <div className="info-grid">
                <div><strong>NOMBRE:</strong> {selectedMascota?.nombre}</div>
                <div><strong>DUEÑO:</strong> -</div>
                <div><strong>SEXO:</strong> {selectedMascota?.genero}</div>
                <div><strong>COLOR:</strong> {selectedMascota?.color}</div>
                <div><strong>EDAD:</strong> -</div>
                <div><strong>FOTO (Opcional):</strong> IMG-226</div>
                <div><strong>ESPECIE:</strong> {selectedMascota?.especie}</div>
                <div><strong>RAZA:</strong> {selectedMascota?.raza}</div>
                <div><strong>ESTERILIZADO:</strong> -</div>
              </div>
              
              <button onClick={() => setShowModal(false)} className="btn-submit">
                Subir foto
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mascota-form">
            <div className="form-section">
              <h3>DATOS GENERALES DE LA MASCOTA</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>NOMBRE (*)</label>
                  <input
                    type="text"
                    value={formData.nombre}
                    onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                    placeholder="Nombre de la mascota..."
                    required
                  />
                </div>
                <div className="form-group">
                  <label>DUEÑO (*)</label>
                  <input
                    type="text"
                    value={formData.dueño}
                    onChange={(e) => setFormData({...formData, dueño: e.target.value})}
                    placeholder="Nombre cliente / DNI"
                    required
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>SEXO (*)</label>
                  <select
                    value={formData.sexo}
                    onChange={(e) => setFormData({...formData, sexo: e.target.value})}
                    required
                  >
                    <option value="">Macho</option>
                    <option value="M">Macho</option>
                    <option value="H">Hembra</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>COLOR (*)</label>
                  <select
                    value={formData.color}
                    onChange={(e) => setFormData({...formData, color: e.target.value})}
                    required
                  >
                    <option value="">Marrón claro / Oro</option>
                    <option value="Negro">Negro</option>
                    <option value="Blanco">Blanco</option>
                    <option value="Marrón">Marrón</option>
                    <option value="Gris">Gris</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>EDAD</label>
                  <div className="edad-inputs">
                    <input
                      type="number"
                      placeholder="Años"
                      style={{marginRight: '10px'}}
                    />
                    <input
                      type="number"
                      placeholder="Meses"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>FOTO (Opcional)</label>
                  <input
                    type="file"
                    accept="image/*"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>ESPECIE (*)</label>
                  <select
                    value={formData.especie}
                    onChange={(e) => setFormData({...formData, especie: e.target.value})}
                    required
                  >
                    <option value="">Equino de palizada</option>
                    <option value="Perro">Perro</option>
                    <option value="Gato">Gato</option>
                    <option value="Ave">Ave</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>RAZA (*)</label>
                  <select
                    value={formData.raza}
                    onChange={(e) => setFormData({...formData, raza: e.target.value})}
                    required
                  >
                    <option value="">Criollo mestiza</option>
                    <option value="Criollo">Criollo</option>
                    <option value="Pastor Alemán">Pastor Alemán</option>
                    <option value="Golden Retriever">Golden Retriever</option>
                    <option value="Bulldog">Bulldog</option>
                    <option value="Siamés">Siamés</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>ESTERILIZADO (*)</label>
                <select
                  value={formData.esterilizado}
                  onChange={(e) => setFormData({...formData, esterilizado: e.target.value})}
                >
                  <option value="">Si / No</option>
                  <option value="Si">Sí</option>
                  <option value="No">No</option>
                </select>
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

export default MascotasManagement;