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
import Criarmatch from '../Pages/Criarmatch';
import EncontrarMatch from '../Pages/Encontrarmatch';

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

      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/perfil"
        element={
          <ProtectedRoute>
            <ProfileCard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/postmatch"
        element={
          <ProtectedRoute>
            <Postmatch />
          </ProtectedRoute>
        }
      />
      <Route
        path="/nextmatch"
        element={
          <ProtectedRoute>
            <Nextmacth />
          </ProtectedRoute>
        }
      />
      <Route
        path="/criarmatch"
        element={
          <ProtectedRoute>
            <Criarmatch />
          </ProtectedRoute>
        }
      />
      <Route
        path="/encontrarmatch"
        element={
          <ProtectedRoute>
            <EncontrarMatch />
          </ProtectedRoute>
        }
      />
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
