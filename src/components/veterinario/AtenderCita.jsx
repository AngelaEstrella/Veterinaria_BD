// components/veterinario/AtenderCita.jsx
import React, { useState } from 'react';

const AtenderCita = ({ cita, onComplete, onCancel }) => {
  const [formData, setFormData] = useState({
    resultado: '',
    fechaRealizacion: new Date().toISOString().split('T')[0],
    archivoAdjunto: null,
    interpretacion: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      archivoAdjunto: e.target.files[0]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Resultado de cita:', formData);
    onComplete();
  };

  return (
    <form onSubmit={handleSubmit} className="atender-cita">
      <div className="form-section">
        <h3>Datos de la Cita</h3>
        
        <div className="cita-info">
          <p><strong>Mascota:</strong> {cita?.mascota}</p>
          <p><strong>Servicio:</strong> {cita?.servicio}</p>
          <p><strong>Fecha:</strong> {cita?.fecha}</p>
          <p><strong>Hora:</strong> {cita?.hora}</p>
        </div>

        <div className="form-group">
          <label>RESULTADO</label>
          <textarea
            name="resultado"
            value={formData.resultado}
            onChange={handleChange}
            placeholder="Resultado"
            rows="4"
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Fecha realización:</label>
            <input
              type="date"
              name="fechaRealizacion"
              value={formData.fechaRealizacion}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>ARCHIVO ADJUNTO</label>
            <input
              type="file"
              name="archivoAdjunto"
              onChange={handleFileChange}
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
            />
            <small>Subir archivo</small>
          </div>
        </div>

        <div className="form-group">
          <label>INTERPRETACIÓN</label>
          <textarea
            name="interpretacion"
            value={formData.interpretacion}
            onChange={handleChange}
            rows="3"
          />
        </div>
      </div>

      <div className="form-actions">
        <button type="button" onClick={onCancel} className="btn-cancel">
          Cancelar
        </button>
        <button type="submit" className="btn-submit">
          Finalizar Atención
        </button>
      </div>
    </form>
  );
};

export default AtenderCita;