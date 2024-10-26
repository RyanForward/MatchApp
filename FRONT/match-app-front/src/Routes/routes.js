import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cadastro from '../Pages/Cadastro';
import Login from '../Pages/Login';
import HistoricoPartidas from '../Pages/Historico';
import { AuthProvider } from './AuthContext'; // Importe o AuthProvider
import ProtectedRoute from './ProtectedRoute'; // Importe a ProtectedRoute

function RoutesApp() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Cadastro />} />
          <Route
            path="/historico"
            element={
              <ProtectedRoute>
                <HistoricoPartidas />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default RoutesApp;
