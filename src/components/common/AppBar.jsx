import React from 'react';
import { useAuth } from '../../context/AuthContext';
import '../../styles/AppBar.css';

const AppBar = ({ title, subtitle, user }) => {
  const { logout } = useAuth();

  const handleLogout = () => {
    if (window.confirm('¿Está seguro de cerrar sesión?')) {
      logout();
    }
  };

  return (
    <header className="app-bar">
      <div className="app-bar-content">
        <div className="app-bar-titles">
          <h1>{title}</h1>
          {subtitle && <h2>{subtitle}</h2>}
        </div>
        <div className="app-bar-user">
          <div className="user-info">
            <span className="user-icon">👤</span>
            <span className="user-name">Recepcionista</span>
          </div>
          <button onClick={handleLogout} className="logout-btn">
            Cerrar Sesión
          </button>
        </div>
      </div>
    </header>
  );
};

export default AppBar;