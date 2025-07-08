import React, { useState, useEffect } from 'react';

const AtenderCita = ({ cita, onComplete, onCancel }) => {
  const [formData, setFormData] = useState({
    resultado: '',
    fechaRealizacion: new Date().toISOString().split('T')[0],
    archivoAdjunto: null,
    interpretacion: ''
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ FUNCIÓN MEJORADA para cargar resultado
  const fetchResultadoServicio = async (citaId) => {
    try {
      console.log('Cargando resultado para cita ID:', citaId);
      
      const response = await fetch(
        `https://veterinariaclinicabackend-production.up.railway.app/api/v1/consultas/resultado_servicio/${citaId}`
      );
      
      if (!response.ok) {
        // Si es 404, no hay resultado previo (normal para nuevas citas)
        if (response.status === 404) {
          console.log('No hay resultado previo, usando valores por defecto');
          setFormData({
            resultado: '',
            interpretacion: '',
            archivoAdjunto: null,
            fechaRealizacion: new Date().toISOString().split('T')[0]
          });
          return;
        }
        
        // Para otros errores, obtener el mensaje
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `Error HTTP ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Resultado cargado:', data);
      
      setFormData({
        resultado: data.resultado || '',
        interpretacion: data.interpretacion || '',
        archivoAdjunto: data.archivo_adjunto ? data.archivo_adjunto.split('/').pop() : null,
        fechaRealizacion: data.fecha_realizacion ? 
          new Date(data.fecha_realizacion).toISOString().split('T')[0] : 
          new Date().toISOString().split('T')[0]
      });
    } catch (err) {
      console.error('Error al cargar resultado:', err);
      setError(`Error al cargar: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('Cita recibida:', cita);
    
    if (cita && cita.id_cita) {
      fetchResultadoServicio(cita.id_cita);
    } else {
      console.error('Cita inválida:', cita);
      setError('No se recibió una cita válida');
      setLoading(false);
    }
  }, [cita]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      archivoAdjunto: e.target.files[0] ? e.target.files[0].name : null
    });
  };

  // ✅ FUNCIÓN SUBMIT SOLO PARA PUT (ACTUALIZAR)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!cita || !cita.id_cita) {
      setError('No se puede guardar: ID de cita no válido');
      return;
    }

    // Validar datos requeridos
    if (!formData.resultado.trim()) {
      setError('El resultado es requerido');
      return;
    }

    if (!formData.fechaRealizacion) {
      setError('La fecha de realización es requerida');
      return;
    }
    
    // ✅ FORMATO CORRECTO: Incluir TODOS los campos que espera el backend
    const updatedData = {
      id_cita: cita.id_cita,  // ← AGREGADO: El backend lo necesita
      id_veterinario: cita.id_veterinario || 4,  // ← AGREGADO: El backend lo necesita (fallback a 4)
      resultado: formData.resultado.trim(),
      interpretacion: formData.interpretacion.trim() || null,
      archivo_adjunto: formData.archivoAdjunto || null,
      fecha_realizacion: `${formData.fechaRealizacion}T00:00:00`
    };

    console.log('=== DATOS A ENVIAR (PUT) ===');
    console.log('Cita completa:', cita);
    console.log('Cita ID:', cita.id_cita);
    console.log('Veterinario ID:', cita.id_veterinario);
    console.log('Datos a enviar:', updatedData);
    console.log('URL:', `resultado_servicio/${cita.id_cita}`);

    try {
      setLoading(true);
      setError(null);
      
      // ✅ SOLO PUT - NO FALLBACK A POST
      const response = await fetch(
        `https://veterinariaclinicabackend-production.up.railway.app/api/v1/consultas/resultado_servicio/${cita.id_cita}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedData)
        }
      );

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);

      if (!response.ok) {
        // ✅ MEJOR MANEJO DE ERRORES DEL BACKEND
        let errorMessage = `Error HTTP ${response.status}`;
        
        try {
          const errorData = await response.json();
          console.log('Error data from backend:', errorData);
          
          if (errorData.detail) {
            // Si detail es un string
            if (typeof errorData.detail === 'string') {
              errorMessage = errorData.detail;
            }
            // Si detail es un array de errores de validación
            else if (Array.isArray(errorData.detail)) {
              const errors = errorData.detail.map(err => {
                if (typeof err === 'object' && err.msg) {
                  return `${err.loc ? err.loc.join('.') + ': ' : ''}${err.msg}`;
                }
                return String(err);
              });
              errorMessage = errors.join(', ');
            }
            // Si detail es un objeto
            else if (typeof errorData.detail === 'object') {
              errorMessage = JSON.stringify(errorData.detail);
            }
          }
        } catch (parseError) {
          console.error('Error parsing response:', parseError);
          errorMessage = `Error ${response.status}: ${response.statusText}`;
        }
        
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log('✅ Resultado actualizado exitosamente:', data);
      
      alert('Cita atendida exitosamente');
      onComplete();
      
    } catch (err) {
      console.error('❌ Error completo:', err);
      console.error('❌ Error message:', err.message);
      
      setError(err.message || 'Error desconocido al guardar');
    } finally {
      setLoading(false);
    }
  };

  if (!cita) {
    return <div className="error-message">No se recibió información de la cita</div>;
  }

  if (loading && !error) {
    return <div className="loading-message">Cargando información del resultado...</div>;
  }

  return (
    <div className="atender-cita-container">
      {error && (
        <div className="error-container">
          <p className="error-message">⚠️ {error}</p>
          <button 
            onClick={() => {
              setError(null);
              setLoading(true);
              fetchResultadoServicio(cita.id_cita);
            }}
            className="btn-retry"
          >
            Reintentar
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="atender-cita">
        <div className="form-section">
          <h3>Datos de la Cita</h3>
          
          <div className="cita-info">
            <p><strong>ID Cita:</strong> {cita.id_cita}</p>
            <p><strong>Mascota:</strong> {cita.mascota}</p>
            <p><strong>Servicio:</strong> {cita.servicio}</p>
            <p><strong>Fecha:</strong> {cita.fecha}</p>
            <p><strong>Hora:</strong> {cita.hora}</p>
          </div>

          <div className="form-group">
            <label>RESULTADO *</label>
            <textarea
              name="resultado"
              value={formData.resultado}
              onChange={handleChange}
              placeholder="Resultado de la consulta"
              rows="4"
              required
              disabled={loading}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Fecha realización: *</label>
              <input
                type="date"
                name="fechaRealizacion"
                value={formData.fechaRealizacion}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-group">
            <label>INTERPRETACIÓN</label>
            <textarea
              name="interpretacion"
              value={formData.interpretacion}
              onChange={handleChange}
              placeholder="Interpretación del resultado (opcional)"
              rows="3"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>ARCHIVO ADJUNTO</label>
            <input
              type="file"
              name="archivoAdjunto"
              onChange={handleFileChange}
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              disabled={loading}
            />
            <small>
              {formData.archivoAdjunto ? 
                `📎 Archivo: ${formData.archivoAdjunto}` : 
                'No hay archivo adjunto'
              }
            </small>
          </div>
        </div>

        <div className="form-actions">
          <button 
            type="button" 
            onClick={onCancel} 
            className="btn-cancel"
            disabled={loading}
          >
            Cancelar
          </button>
          <button 
            type="submit" 
            className="btn-submit" 
            disabled={loading || !formData.resultado.trim()}
          >
            {loading ? 'Guardando...' : 'Finalizar Atención'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AtenderCita;