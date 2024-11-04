import { Card, CardContent, Typography, Box, Button, Avatar, Divider } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import Navbar from '../Navbar'; // Importando o componente Navbar



// export default ProfileCard;
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProfileCard = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/usuario/:id')
      .then(response => {
        setProfile(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the profile data!', error);
      });
  }, []);

  if (!profile) {
    return <div sx={{ maxWidth: "sm", mx: 'auto', mt: 5, p: 2, textAlign: 'center', boxShadow: 3 }}><Typography variant='h3'>Buscando informações de usuário...</Typography></div>;
  }

  return (
    <>
      <nav>
        <Navbar />
      </nav>  
      <Card sx={{ maxWidth: "sm", mx: 'auto', mt: 5, p: 2, textAlign: 'center', boxShadow: 3 }}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Avatar sx={{ width: 80, height: 80, mb: 2 }} src={profile.avatarUrl} />
          <Typography variant="h6">{profile.name}</Typography>
          <Box display="flex" alignItems="center" color="green" mb={1}>
            <Typography variant="h4">{profile.rating}</Typography>
            <StarIcon fontSize="large" />
          </Box>
        </Box>
        <Divider sx={{ my: 2 }} />
        <CardContent>
          <Typography variant="body2">Partidas jogadas: {profile.gamesPlayed}</Typography>
          <Typography variant="body2">Partidas organizadas: {profile.gamesOrganized}</Typography>
          <Typography variant="body2">Esporte favorito: {profile.favoriteSport}</Typography>
          <Typography variant="body2" mt={2}>Idade: {profile.age}</Typography>
          <Typography variant="body2">Email: {profile.email}</Typography>
          <Typography variant="body2" mt={2}>Biografia:</Typography>
          <Box component="textarea" rows="4" style={{ width: '100%', marginTop: 8, padding: 8, resize: 'none', borderRadius: 4 }} value={profile.bio} readOnly />
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