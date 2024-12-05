import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Button, 
  Avatar, 
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
<<<<<<< HEAD
 } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import Navbar from '../Navbar'; // Importando o componente Navbar
=======
  TextField,
  Container,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import Navbar from '../Navbar'; 
>>>>>>> origin/matheus
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useAuth } from '../../Routes/AuthContext';
<<<<<<< HEAD

const ProfileCard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
=======
import { useTheme } from '@mui/material/styles';

const ProfileCard = () => {
    
  const theme = useTheme();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editValues, setEditValues] = useState({});
>>>>>>> origin/matheus
  const navigate = useNavigate();
  const { logout } = useAuth(); 

  useEffect(() => {
<<<<<<< HEAD
=======

>>>>>>> origin/matheus
    const fetchUser = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('Token not found');
                throw new Error('Token not found');
            }
            const response = await axios.get('/api/usuario_logado', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUser(response.data);
<<<<<<< HEAD
=======
            setEditValues({
              favoriteSport: response.data.fav_sport,
              nome: response.data.nome,
              age: response.data.age,
              bio: response.data.bio
            });
>>>>>>> origin/matheus
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    fetchUser();
  }, []);

<<<<<<< HEAD
  if (loading) return <div>Carregando...</div>;

  if (!user) return <div>Usuário não encontrado</div>;

  
=======
  if (loading) return <div id="loading-message">Carregando...</div>;

  if (!user) return <div id="user-not-found-message">Usuário não encontrado</div>;

  const handleEditClick = () => {
    setIsEditing((prev) => !prev);
  };

  const handleInputChange = (field, value) => {
    setEditValues((prev) => ({ ...prev, [field]: value }));
  };

>>>>>>> origin/matheus
  const handleLogoutClick = (event) => {
    event.stopPropagation();
    setOpenLogoutDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenLogoutDialog(false);
  };

  const confirmLogout = () => {
    setOpenLogoutDialog(false);
    logout();
<<<<<<< HEAD
    navigate('/login')
=======
    navigate('/login');
>>>>>>> origin/matheus
  };

  return (
    <>
<<<<<<< HEAD
      <nav>
        <Navbar />
      </nav>  
      <Card sx={{ maxWidth: 400, mx: 'auto', mt: 5, p: 2, textAlign: 'center', boxShadow: 3, marginTop: 10 }}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Avatar sx={{ width: 80, height: 80, mb: 2 }} src={user.avatarUrl} />
          <Typography variant="h6">{user.user_nome}</Typography>
          <Box display="flex" alignItems="center" color="green" mb={1}>
            <Typography variant="h4">{user.rating}</Typography>
            <StarIcon fontSize="large" />
          </Box>
        </Box>
        <Divider sx={{ my: 2 }} />
        <CardContent>
          <Typography variant="body2" sx={{ mb: 1 }}>Partidas jogadas: {user.gamesPlayed}</Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>Partidas organizadas: {user.gamesOrganized}</Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>Esporte favorito: {user.favoriteSport}</Typography>
          <Typography variant="body2" sx={{ mt: 2, mb: 1 }}>Idade: {user.age}</Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>Email: {user.email}</Typography>
          <Typography variant="body2" mt={2} sx={{ mb: 1 }}>Biografia:</Typography>
          <Box component="textarea" rows="4" style={{ width: '100%', marginTop: 8, padding: 8, resize: 'none', borderRadius: 4 }} value={user.bio} readOnly />
        </CardContent>
        <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} justifyContent="space-around" mt={2} mb={1}>
          <Button variant="contained" color="success" onClick={handleLogoutClick} sx={{ mb: { xs: 2, sm: 0 } }}>Sair</Button>
          <Button variant="contained" color="error">Deletar Conta</Button>
        </Box>
        <Dialog
          open={openLogoutDialog}
          onClose={handleCloseDialog}
        >
          <DialogTitle>Confirmar Logout</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Você realmente deseja sair?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Cancelar
            </Button>
            <Button onClick={confirmLogout} color="primary" autoFocus>
=======
      <nav id="navbar-container">
        <Navbar id="navbar" />
      </nav>  
      <Card id="profile-card" sx={{ maxWidth: 400, mx: 'auto', mt: 5, p: 2, textAlign: 'center', boxShadow: 3, marginTop: 10 }}>
        <Box id="profile-header" display="flex" flexDirection="column" alignItems="center">
          <Avatar id="profile-avatar" sx={{ width: 80, height: 80, mb: 2 }} src={user.avatarUrl} />
          <Typography id="profile-name" variant="h6">{user.user_nome}</Typography>
          <Box id="profile-rating" display="flex" alignItems="center" color="green" mb={1}>
            <Typography id="profile-rating-value" variant="h4">{user.rating}</Typography>
            <StarIcon id="profile-rating-icon" fontSize="large" color="primary" />
            </Box>
        </Box>
        <CardContent id="profile-content">
          <Typography id="profile-games-played" variant="body2" sx={{ mb: 1 }}>Partidas jogadas: {user.gamesPlayed}</Typography>
          <Typography id="profile-games-organized" variant="body2" sx={{ mb: 1 }}>Partidas organizadas: {user.gamesOrganized}</Typography>
          <Divider id="profile-divider" sx={{ my: 2, backgroundColor: 'primary.main' }} />
          <Container sx={{textAlign: 'left'}}>
            {isEditing ? (
              <TextField
                label="Esporte favorito"
                value={editValues.fav_sport}
                onChange={(e) => handleInputChange('fav_sport', e.target.value)}
                fullWidth
                sx={{ mb: 1 }}
              />
            ) : (
              <Typography id="profile-favorite-sport" variant="body2" sx={{ mb: 1 }}>Esporte favorito: {user.fav_sport}</Typography>
            )}

            {isEditing ? (
              <TextField
                label="Nome"
                value={editValues.nome}
                onChange={(e) => handleInputChange('nome', e.target.value)}
                fullWidth
                sx={{ mb: 1 }}
              />
            ) : (
              <Typography id="profile-email" variant="body2" sx={{ mb: 1 }}>Nome: {user.nome}</Typography>
            )}

            {isEditing ? (
              <TextField
                label="Idade"
                value={editValues.age}
                onChange={(e) => handleInputChange('age', e.target.value)}
                fullWidth
                sx={{ mb: 1 }}
              />
            ) : (
              <Typography id="profile-age" variant="body2" sx={{ mt: 2, mb: 1 }}>Idade: {user.age}</Typography>
            )}

            <Typography id="profile-bio-title" variant="body2" mt={2} sx={{ mb: 1 }}>Biografia:</Typography>
            {isEditing ? (
              <TextField
                label="Biografia"
                value={editValues.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                multiline
                rows={4}
                fullWidth
                sx={{ mb: 1 }}
              />
            ) : (
              <Box
                id="profile-bio-textarea"
                component="textarea"
                rows="4"
                style={{ width: '100%', marginTop: 8, padding: 8, resize: 'none', borderRadius: 4 }}
                value={user.bio}
                readOnly
              />
            )}
          </Container>
        </CardContent>
        <Box id="profile-actions" display="flex" flexDirection={{ xs: 'column', sm: 'row' }} justifyContent="space-around" mt={2} mb={1}>
          <Button
            id="edit-button"
            variant="contained"
            color="success"
            onClick={handleEditClick}
            sx={{ mb: { xs: 2, sm: 0 } }}
          >
            {isEditing ? 'Salvar' : 'Editar'}
          </Button>
          <Button id="logout-button" variant="contained" color="success" onClick={handleLogoutClick} sx={{ mb: { xs: 2, sm: 0 } }}>Sair</Button>
          <Button id="delete-account-button" variant="contained" color="error">Deletar Conta</Button>
        </Box>
        <Dialog id="logout-dialog" open={openLogoutDialog} onClose={handleCloseDialog}>
          <DialogTitle id="logout-dialog-title">Confirmar Logout</DialogTitle>
          <DialogContent id="logout-dialog-content">
            <DialogContentText id="logout-dialog-content-text">
              Você realmente deseja sair?
            </DialogContentText>
          </DialogContent>
          <DialogActions id="logout-dialog-actions">
            <Button id="logout-dialog-cancel-button" onClick={handleCloseDialog} color="primary">
              Cancelar
            </Button>
            <Button id="logout-dialog-confirm-button" onClick={confirmLogout} color="primary" autoFocus>
>>>>>>> origin/matheus
              Sair
            </Button>
          </DialogActions>
        </Dialog>
<<<<<<< HEAD
        </Card>
      </>
=======
      </Card>
    </>
>>>>>>> origin/matheus
  );
};

export default ProfileCard;
