// components/veterinario/ModificarDiagnostico.jsx
import React, { useState } from 'react';

const ModificarDiagnostico = ({ diagnostico, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    tipoDiagnostico: 'Presuntivo, confirmado',
    diagnostico: diagnostico || '',
    patologia: '',
    especieAfecta: '',
    esContagioso: false,
    esCronico: false,
    estadoPatologia: 'Activa, confirmada',
    gravedadPatologia: 'Leve, moderada, s',
    fechaInicio: '',
    tipoTratamiento: 'Medicamento, ciru',
    eficaciaTratamiento: 'Muy bueno, bueno, r'
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData.diagnostico);
  };

  return (
    <form onSubmit={handleSubmit} className="modificar-diagnostico">
      <div className="form-section">
        <div className="form-row">
          <div className="form-group">
            <label>TIPO DIAGNÓSTICO</label>
            <select
              name="tipoDiagnostico"
              value={formData.tipoDiagnostico}
              onChange={handleChange}
            >
              <option value="Presuntivo, confirmado">Presuntivo, confirmado</option>
              <option value="Confirmado">Confirmado</option>
              <option value="Presuntivo">Presuntivo</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>DIAGNÓSTICO</label>
            <input
              type="text"
              name="diagnostico"
              value={formData.diagnostico}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>N. PATOLOGÍA</label>
            <input
              type="text"
              name="patologia"
              value={formData.patologia}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label>ESPECIE AFECTA</label>
            <input
              type="text"
              name="especieAfecta"
              value={formData.especieAfecta}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                name="esContagioso"
                checked={formData.esContagioso}
                onChange={handleChange}
              />
              ES CONTAGIOSO?
            </label>
            <label>
              <input
                type="checkbox"
                name="esCronico"
                checked={formData.esCronico}
                onChange={handleChange}
              />
              ES CRÓNICO?
            </label>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>ESTADO PATOLOGÍA</label>
            <select
              name="estadoPatologia"
              value={formData.estadoPatologia}
              onChange={handleChange}
            >
              <option value="Activa, confirmada">Activa, confirmada</option>
              <option value="Activa">Activa</option>
              <option value="Inactiva">Inactiva</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>GRAVEDAD PATOLOGÍA</label>
            <select
              name="gravedadPatologia"
              value={formData.gravedadPatologia}
              onChange={handleChange}
            >
              <option value="Leve, moderada, s">Leve, moderada, s</option>
              <option value="Leve">Leve</option>
              <option value="Moderada">Moderada</option>
              <option value="Severa">Severa</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>FECHA INICIO</label>
            <input
              type="date"
              name="fechaInicio"
              value={formData.fechaInicio}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label>TIPO TRATAMIENTO</label>
            <select
              name="tipoTratamiento"
              value={formData.tipoTratamiento}
              onChange={handleChange}
            >
              <option value="Medicamento, ciru">Medicamento, ciru</option>
              <option value="Medicamento">Medicamento</option>
              <option value="Cirugía">Cirugía</option>
              <option value="Terapia">Terapia</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>EFICACIA TRATAMIENTO</label>
            <select
              name="eficaciaTratamiento"
              value={formData.eficaciaTratamiento}
              onChange={handleChange}
            >
              <option value="Muy bueno, bueno, r">Muy bueno, bueno, r</option>
              <option value="Muy bueno">Muy bueno</option>
              <option value="Bueno">Bueno</option>
              <option value="Regular">Regular</option>
              <option value="Malo">Malo</option>
            </select>
          </div>
        </div>
      </div>

      <div className="form-actions">
        <button type="button" onClick={onCancel} className="btn-cancel">
          Cancelar
        </button>
        <button type="submit" className="btn-submit">
          Guardar Cambios
        </button>
      </div>
    </form>
  );
};

export default ModificarDiagnostico;