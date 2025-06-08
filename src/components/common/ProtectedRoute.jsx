import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { isAuthenticated, user, loading } = useAuth();

  // Mostrar loading mientras se verifica la autenticación
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">Cargando...</div>
      </div>
    );
  }

  // Redirigir a login si no está autenticado
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Verificar si el rol del usuario está permitido
  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    // Redirigir al dashboard correspondiente según el rol
    const dashboardRoutes = {
      admin: '/admin',
      veterinario: '/veterinario',
      recepcionista: '/recepcionista'
    };
    
    const userDashboard = dashboardRoutes[user?.role];
    if (userDashboard) {
      return <Navigate to={userDashboard} replace />;
    }
    
    // Si no tiene un dashboard definido, redirigir a login
    return <Navigate to="/" replace />;
  }

  // Si todo está bien, renderizar el componente hijo
  return children;
};

export default ProtectedRoute;