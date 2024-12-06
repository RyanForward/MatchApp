import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) return <div>Carregando...</div>; // Aguarda a verificação do token
    if (!isAuthenticated) return <Navigate to="/login" />; // Redireciona se não autenticado

    return children;
};

export default ProtectedRoute;
