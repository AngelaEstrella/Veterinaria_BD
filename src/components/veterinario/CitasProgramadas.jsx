// CitasProgramadas.jsx - CORREGIDO
import React, { useState, useEffect } from 'react';
import Table from '../common/Table';
import Modal from '../common/Modal';
import AtenderCita from './AtenderCita';

const CitasProgramadas = () => {
  const [citas, setCitas] = useState([]);
  const [selectedCita, setSelectedCita] = useState(null);
  const [showAtender, setShowAtender] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para cargar las citas
  const fetchCitas = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        'https://veterinariaclinicabackend-production.up.railway.app/api/v1/consultas/cita'
      );
      if (!response.ok) {
        throw new Error('Error al cargar citas');
      }
      const data = await response.json();

      // Para cada cita, obtener el servicio, veterinario y mascota
      const citasConServicioVeterinarioYMascota = await Promise.all(
        data.map(async (cita) => {
          // Obtener el servicio
          const servicioResponse = await fetch(
            `https://veterinariaclinicabackend-production.up.railway.app/api/v1/consultas/citaServicio/${cita.id_cita}`
          );
          const servicioData = await servicioResponse.json();

          // Obtener el veterinario
          const veterinarioResponse = await fetch(
            `https://veterinariaclinicabackend-production.up.railway.app/api/v1/consultas/citaVeterinario/${cita.id_cita}`
          );
          const veterinarioData = await veterinarioResponse.json();

          // Obtener la mascota
          const mascotaResponse = await fetch(
            `https://veterinariaclinicabackend-production.up.railway.app/api/v1/consultas/citaMascota/${cita.id_cita}`
          );
          const mascotaData = await mascotaResponse.json();

          const fechaObj = new Date(cita.fecha_hora_programada);
          
          // ✅ CAMBIO PRINCIPAL: Mantener TODA la información de la cita original
          return {
            ...cita, // ← Mantener todos los datos originales incluyendo id_cita
            id: cita.id_cita, // ← Para compatibilidad con la tabla
            mascota: mascotaData.nombre_mascota || 'Mascota no encontrada',
            servicio: servicioData.nombre_servicio || 'Servicio no encontrado',
            veterinario: veterinarioData.veterinario || 'Veterinario no encontrado',
            fecha: fechaObj.toLocaleDateString(),
            hora: fechaObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            estado: cita.estado_cita
          };
        })
      );

      setCitas(citasConServicioVeterinarioYMascota);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCitas();
  }, []);
  
  // ✅ FUNCIÓN MEJORADA para manejar atender
  const handleAtender = (cita) => {
    console.log('Cita completa recibida:', cita); // Para debug
    console.log('ID de la cita:', cita.id_cita); // Para debug
    
    if (cita && cita.id_cita) {
      setSelectedCita(cita); // Pasar toda la cita con id_cita
      setShowAtender(true);
    } else {
      console.error('No se pudo obtener la ID de la cita', cita);
      alert('Error: No se puede acceder a los datos de la cita');
    }
  };

  const handleAtenderComplete = () => {
    setShowAtender(false);
    setCitas((prev) =>
      prev.map((c) =>
        c.id_cita === selectedCita.id_cita ? { ...c, estado: 'Atendida' } : c
      )
    );
    setSelectedCita(null);
  };

  const columns = [
    { key: 'mascota', header: 'MASCOTA' },
    { key: 'servicio', header: 'SERVICIO' },
    { key: 'veterinario', header: 'VETERINARIO' },
    { key: 'fecha', header: 'FECHA' },
    { key: 'hora', header: 'HORA' },
    {
      key: 'estado',
      header: 'ESTADO',
      render: (row) => (
        <span className={`status-badge status-${row.estado.toLowerCase()}`}>
          {row.estado}
        </span>
      )
    }
  ];

  const actions = [
    {
      label: 'Atender',
      type: 'primary',
      onClick: handleAtender // Esta función recibe la fila completa
    }
  ];

  if (loading) {
    return <p>Cargando citas...</p>;
  }

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
        <button onClick={fetchCitas}>Reintentar</button>
      </div>
    );
  }

  return (
    <div className="citas-programadas">
      <div className="section-header">
        <h2>Citas Programadas - Hoy</h2>
      </div>

      <Table
        columns={columns}
        data={citas}
        actions={actions}
        emptyMessage="No hay citas programadas para hoy"
      />

      <Modal
        isOpen={showAtender}
        onClose={() => setShowAtender(false)}
        title="Atender Cita"
        size="large"
      >
        <AtenderCita
          cita={selectedCita} // ← Ahora contiene id_cita
          onComplete={handleAtenderComplete}
          onCancel={() => setShowAtender(false)}
        />
      </Modal>
    </div>
  );
};

export default CitasProgramadas;