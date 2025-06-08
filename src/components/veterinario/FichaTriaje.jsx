// components/veterinario/FichaTriaje.jsx
import React, { useState } from 'react';

const FichaTriaje = ({ solicitud, onComplete, onCancel }) => {
  const [formData, setFormData] = useState({
    peso: '',
    latidosPm: '',
    frecuenciaResp: '',
    temperatura: '',
    talla: '',
    tiempoCapilar: '',
    colorMucosas: '',
    frecuenciaPulso: '',
    deshidratacion: '',
    condicionCorporal: 'Select',
    clasificacionUrgencia: 'Select'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos de triaje:', formData);
    onComplete();
  };

  return (
    <form onSubmit={handleSubmit} className="ficha-triaje">
      <div className="form-section">
        <h3>Datos del Triaje</h3>
        
        <div className="form-row">
          <div className="form-group">
            <label>PESO</label>
            <input
              type="text"
              name="peso"
              value={formData.peso}
              onChange={handleChange}
              placeholder="Kg"
            />
          </div>
          
          <div className="form-group">
            <label>LATIDOS P/M</label>
            <input
              type="text"
              name="latidosPm"
              value={formData.latidosPm}
              onChange={handleChange}
              placeholder="latidos por minuto"
            />
          </div>
          
          <div className="form-group">
            <label>FRECUENCIA RESP</label>
            <input
              type="text"
              name="frecuenciaResp"
              value={formData.frecuenciaResp}
              onChange={handleChange}
              placeholder="resp por minuto"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>TEMPERATURA</label>
            <input
              type="text"
              name="temperatura"
              value={formData.temperatura}
              onChange={handleChange}
              placeholder="°C"
            />
          </div>
          
          <div className="form-group">
            <label>TALLA</label>
            <input
              type="text"
              name="talla"
              value={formData.talla}
              onChange={handleChange}
              placeholder="cm"
            />
          </div>
          
          <div className="form-group">
            <label>TIEMPO CAPILAR</label>
            <input
              type="text"
              name="tiempoCapilar"
              value={formData.tiempoCapilar}
              onChange={handleChange}
              placeholder="seg"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>COLOR MUCOSAS</label>
            <input
              type="text"
              name="colorMucosas"
              value={formData.colorMucosas}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label>FRECUENCIA PULSO</label>
            <input
              type="text"
              name="frecuenciaPulso"
              value={formData.frecuenciaPulso}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label>% DESHIDRATACIÓN</label>
            <input
              type="text"
              name="deshidratacion"
              value={formData.deshidratacion}
              onChange={handleChange}
              placeholder="%"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>CONDICIÓN CORPORAL</label>
            <select
              name="condicionCorporal"
              value={formData.condicionCorporal}
              onChange={handleChange}
            >
              <option value="Select">Select</option>
              <option value="Muy delgado">Muy delgado</option>
              <option value="Delgado">Delgado</option>
              <option value="Ideal">Ideal</option>
              <option value="Sobrepeso">Sobrepeso</option>
              <option value="Obeso">Obeso</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>CLASIFICACIÓN URGENCIA</label>
            <select
              name="clasificacionUrgencia"
              value={formData.clasificacionUrgencia}
              onChange={handleChange}
            >
              <option value="Select">Select</option>
              <option value="Baja">Baja</option>
              <option value="Media">Media</option>
              <option value="Alta">Alta</option>
              <option value="Crítica">Crítica</option>
            </select>
          </div>
        </div>
      </div>

      <div className="form-actions">
        <button type="button" onClick={onCancel} className="btn-cancel">
          Cancelar
        </button>
        <button type="submit" className="btn-submit">
          Continuar a Consulta
        </button>
      </div>
    </form>
  );
};

export default FichaTriaje;