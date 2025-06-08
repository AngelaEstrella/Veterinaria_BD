// components/recepcionista/Reportes.jsx
import React, { useState } from 'react';

const Reportes = () => {
  const [reporteSeleccionado, setReporteSeleccionado] = useState('servicios');

  const serviciosData = [
    { servicio: 'A', valor: 80 },
    { servicio: 'B', valor: 60 },
    { servicio: 'C', valor: 40 },
    { servicio: 'D', valor: 100 },
    { servicio: 'E', valor: 90 }
  ];

  const otroReporteData = [
    { categoria: 'X', valor: 70 },
    { categoria: 'Y', valor: 85 },
    { categoria: 'Z', valor: 65 },
    { categoria: 'W', valor: 95 }
  ];

  return (
    <div className="reportes">
      <div className="section-header">
        <h2>Reportes</h2>
      </div>

      <div className="reportes-content">
        <div className="reportes-section">
          <h3>SERVICIOS MÁS SOLICITADOS</h3>
          <div className="chart-container">
            <div className="bar-chart">
              {serviciosData.map((item, index) => (
                <div key={index} className="bar-item">
                  <div 
                    className="bar" 
                    style={{height: `${item.valor}%`, backgroundColor: '#64b5f6'}}
                  ></div>
                  <label>{item.servicio}</label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="reportes-section">
          <h3>OTRO REPORTE</h3>
          <div className="chart-container">
            <div className="bar-chart">
              {otroReporteData.map((item, index) => (
                <div key={index} className="bar-item">
                  <div 
                    className="bar" 
                    style={{height: `${item.valor}%`, backgroundColor: '#4caf50'}}
                  ></div>
                  <label>{item.categoria}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reportes;