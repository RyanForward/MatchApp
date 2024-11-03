import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cadastro from '../Pages/Cadastro';
import Login from '../Pages/Login';
import HistoricoPartidas from '../Pages/Historico';
import { AuthProvider } from './AuthContext'; 
import ProtectedRoute from './ProtectedRoute';
import PrivacyPolicy from '../Pages/PoliticaPrivacidade';
import TermsOfUse from '../Pages/TermosDeUso';
import HomePage from '../Pages/Home';
<<<<<<< HEAD
import ProfileCard from '../Pages/Perfil';
=======
import ProfileCard from '../Pages/Perfil/perfil';
>>>>>>> 72ebb7af22814956f0f9797ebb636fcc5800d36c

function RoutesApp() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Cadastro />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfUse />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/perfil" element={<ProfileCard />} />
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
