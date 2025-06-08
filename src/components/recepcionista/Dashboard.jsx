import React from 'react';

const Dashboard = () => {
  const stats = [
    { title: 'Mascotas registradas', value: '03', icon: '🐕', color: 'blue' },
    { title: 'Citas de hoy', value: '05', icon: '📅', color: 'green' },
    { title: 'Clientes activos', value: '02', icon: '👥', color: 'purple' },
    { title: 'Solicitudes pendientes', value: '10', icon: '⏰', color: 'orange' }
  ];

  return (
    <div className="dashboard-recepcionista">
      <div className="welcome-section">
        <div className="welcome-content">
          <div className="welcome-text">
            <h2>BIENVENID@</h2>
            <h3>NOMBRE RECEPCIONISTA</h3>
            <p>Equipo de la veterinaria</p>
          </div>
          <div className="welcome-image">
            <span className="vet-icon">👩‍⚕️🐕</span>
          </div>
        </div>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className={`stat-card stat-${stat.color}`}>
            <div className="stat-content">
              <div className="stat-header">
                <h3>{stat.title}</h3>
                <span className="stat-icon">{stat.icon}</span>
              </div>
              <div className="stat-value">{stat.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;