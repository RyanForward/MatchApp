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
  TextField,
  Container,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import Navbar from '../Navbar';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useAuth } from '../../Routes/AuthContext';
import { useTheme } from '@mui/material/styles';
import { useForm, Controller } from 'react-hook-form';

const ProfileCard = () => {
  const theme = useTheme();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      nome: '',
      fav_sport: '',
      age: '',
      bio: ''
    }
  });

  useEffect(() => {
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
        console.log('response: ', response.data)
        setUser(response.data);
        reset({
          nome: response.data.user_nome,
          fav_sport: response.data.fav_sport,
          age: response.data.user_age,
          bio: response.data.user_bio
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [reset]);

  if (loading) return <div id="loading-message">Carregando...</div>;

  if (!user) return <div id="user-not-found-message">Usuário não encontrado</div>;

  const handleEditClick = () => {
    setIsEditing((prev) => !prev);
  };

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
    navigate('/login');
  };

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token not found');
        throw new Error('Token not found');
      }
      await axios.put(`/perfil/${user.user_id}`, data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser((prev) => ({ ...prev, ...data }));
      setIsEditing(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <nav id="navbar-container">
        <Navbar id="navbar" />
      </nav>
      <Card id="profile-card" sx={{ maxWidth: 400, mx: 'auto', mt: 5, p: 2, textAlign: 'center', boxShadow: 3, marginTop: 10 }}>
        <Box id="profile-header" display="flex" flexDirection="column" alignItems="center">
          <Avatar id="profile-avatar" sx={{ width: 80, height: 80, mb: 2 }} src={user.avatarUrl} />
          <Typography id="profile-name" variant="h6">{user.user_nome.trim()}</Typography>
        </Box>
        <CardContent id="profile-content">
          <Container sx={{ textAlign: 'left' }}>
            {isEditing ? (
              <Controller
                name="nome"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Nome"
                    fullWidth
                    sx={{ mb: 1 }}
                  />
                )}
              />
            ) : (
              <Typography id="profile-email" variant="body2" sx={{ mb: 1 }}>Nome: {user.user_nome}</Typography>
            )}

            {isEditing ? (
              <Controller
                name="fav_sport"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Esporte favorito"
                    fullWidth
                    sx={{ mb: 1 }}
                  />
                )}
              />
            ) : (
              <Typography id="profile-favorite-sport" variant="body2" sx={{ mb: 1 }}>Esporte favorito: {user.fav_sport}</Typography>
            )}

            {isEditing ? (
              <Controller
                name="age"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Idade"
                    fullWidth
                    sx={{ mb: 1 }}
                  />
                )}
              />
            ) : (
              <Typography id="profile-age" variant="body2" sx={{ mt: 2, mb: 1 }}>Idade: {user.user_age}</Typography>
            )}

            <Typography id="profile-bio-title" variant="body2" mt={2} sx={{ mb: 1 }}>Biografia:</Typography>
            {isEditing ? (
              <Controller
                name="bio"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Biografia"
                    multiline
                    rows={4}
                    fullWidth
                    sx={{ mb: 1 }}
                  />
                )}
              />
            ) : (
              <Box
                id="profile-bio-textarea"
                component="textarea"
                rows="4"
                style={{ width: '100%', marginTop: 8, padding: 8, resize: 'none', borderRadius: 4 }}
                value={user.user_bio}
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
            onClick={isEditing ? handleSubmit(onSubmit) : handleEditClick}
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
              Sair
            </Button>
          </DialogActions>
        </Dialog>
      </Card>
    </form>
  );
};

export default ProfileCard;
