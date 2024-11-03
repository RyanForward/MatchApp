import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cadastro from '../Pages/Cadastro';
import Login from '../Pages/Login';
import HistoricoPartidas from '../Pages/Historico';
import { AuthProvider } from './AuthContext'; 
import ProtectedRoute from './ProtectedRoute';
import PrivacyPolicy from '../Pages/PoliticaPrivacidade';
import TermsOfUse from '../Pages/TermosDeUso';
import HomePage from '../Pages/Home';
import ProfileCard from '../Pages/Perfil';
import Postmatch from '../Pages/postmatch';
import Nextmacth from '../Pages/nextmatch'; 

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
          <Route path="/postmatch" element={<Postmatch />} />
          <Route path="/nextmatch" element={<Nextmacth />} />
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
