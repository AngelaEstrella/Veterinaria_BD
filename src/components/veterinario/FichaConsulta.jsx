// components/veterinario/FichaConsulta.jsx
import React, { useState } from 'react';
import Modal from '../common/Modal';
import ModificarDiagnostico from './ModificarDiagnostico';

const FichaConsulta = ({ solicitud, onComplete, onCancel }) => {
  const [formData, setFormData] = useState({
    motivoConsulta: '',
    diagnosticoPreliminar: '',
    sintomasObservados: '',
    observaciones: '',
    condicionGeneral: 'Select'
  });

  const [showModificarDiagnostico, setShowModificarDiagnostico] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos de consulta:', formData);
    onComplete();
  };

  const handleModificarDiagnostico = () => {
    setShowModificarDiagnostico(true);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="ficha-consulta">
        <div className="form-section">
          <h3>Datos de la consulta</h3>
          
          <div className="form-group full-width">
            <label>Motivo de la consulta (llenar todos)</label>
            <textarea
              name="motivoConsulta"
              value={formData.motivoConsulta}
              onChange={handleChange}
              placeholder="Observaciones"
              rows="3"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>DIAGNÓSTICO PRELIMINAR</label>
              <input
                type="text"
                name="diagnosticoPreliminar"
                value={formData.diagnosticoPreliminar}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label>SÍNTOMAS OBSERVADOS</label>
              <input
                type="text"
                name="sintomasObservados"
                value={formData.sintomasObservados}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group full-width">
            <label>OBSERVACIONES</label>
            <textarea
              name="observaciones"
              value={formData.observaciones}
              onChange={handleChange}
              placeholder="Observaciones"
              rows="3"
            />
          </div>

          <div className="form-group">
            <label>CONDICIÓN GENERAL</label>
            <select
              name="condicionGeneral"
              value={formData.condicionGeneral}
              onChange={handleChange}
            >
              <option value="Select">Select</option>
              <option value="Buena">Buena</option>
              <option value="Regular">Regular</option>
              <option value="Mala">Mala</option>
              <option value="Crítica">Crítica</option>
            </select>
          </div>
        </div>

        <div className="form-actions">
          <button 
            type="button" 
            onClick={handleModificarDiagnostico}
            className="btn-secondary"
          >
            Modificar Diagnóstico
          </button>
          <button type="button" onClick={onCancel} className="btn-cancel">
            Cancelar
          </button>
          <button type="submit" className="btn-submit">
            Finalizar Consulta
          </button>
        </div>
      </form>

      <Modal
        isOpen={showModificarDiagnostico}
        onClose={() => setShowModificarDiagnostico(false)}
        title="Modificar Diagnóstico"
        size="large"
      >
        <ModificarDiagnostico 
          diagnostico={formData.diagnosticoPreliminar}
          onSave={(nuevoDiagnostico) => {
            setFormData({...formData, diagnosticoPreliminar: nuevoDiagnostico});
            setShowModificarDiagnostico(false);
          }}
          onCancel={() => setShowModificarDiagnostico(false)}
        />
      </Modal>
    </>
  );
};

export default FichaConsulta;