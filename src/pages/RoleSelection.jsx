// pages/RoleSelection.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/RoleSelection.css';

const RoleSelection = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    navigate(`/login/${role}`);
  };

  return (
    <div className="role-selection-container">
      <div className="role-selection-card">
        <div className="role-header">
          <h1>Sistema Veterinaria</h1>
          <h2>Inicio de sesión</h2>
        </div>
        
        <div className="role-content">
          <h3>Iniciar sesión como:</h3>
          
          <div className="role-buttons">
            <button 
              className="role-btn recepcionista"
              onClick={() => handleRoleSelect('recepcionista')}
            >
              RECEPCIONISTA
            </button>
            
            <button 
              className="role-btn veterinario"
              onClick={() => handleRoleSelect('veterinario')}
            >
              VETERINARIO
            </button>
            
            <button 
              className="role-btn administrador"
              onClick={() => handleRoleSelect('administrador')}
            >
              ADMINISTRADOR
            </button>
          </div>
        </div>
        
        <div className="role-info">
          <p>De cada opción de usuario que se escoja, saldrá el panel de login</p>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;