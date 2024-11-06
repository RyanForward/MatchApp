import { Card, CardContent, Typography, Box, Button, Avatar, Divider } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import Navbar from '../Navbar'; // Importando o componente Navbar



// export default ProfileCard;
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProfileCard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
            setUser(response.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    fetchUser();
}, []);

if (loading) return <div>Carregando...</div>;

if (!user) return <div>Usuário não encontrado</div>;


  return (
    <>
      <nav>
        <Navbar />
      </nav>  
      <Card sx={{ maxWidth: "sm", mx: 'auto', mt: 5, p: 2, textAlign: 'center', boxShadow: 3 }}>
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
          <Typography variant="body2">Partidas jogadas: {user.gamesPlayed}</Typography>
          <Typography variant="body2">Partidas organizadas: {user.gamesOrganized}</Typography>
          <Typography variant="body2">Esporte favorito: {user.favoriteSport}</Typography>
          <Typography variant="body2" mt={2}>Idade: {user.age}</Typography>
          <Typography variant="body2">Email: {user.email}</Typography>
          <Typography variant="body2" mt={2}>Biografia:</Typography>
          <Box component="textarea" rows="4" style={{ width: '100%', marginTop: 8, padding: 8, resize: 'none', borderRadius: 4 }} value={user.bio} readOnly />
        </CardContent>
        <Box display="flex" justifyContent="space-around" mt={2} mb={1}>
          <Button variant="contained" color="success">Sair</Button>
          <Button variant="contained" color="error">Deletar Conta</Button>
        </Box>
      </Card>
    </>
  );
};

export default ProfileCard;