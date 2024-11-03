import React from 'react';
import { Card, CardContent, Typography, Box, Button, Avatar, Divider } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import Navbar from '../Navbar'; // Importando o componente Navbar

const ProfileCard = () => {
  return (
    <>
        <nav>
          <Navbar />
        </nav>  
    <Card sx={{ maxWidth: 300, mx: 'auto', mt: 5, p: 2, textAlign: 'center', boxShadow: 3 }}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Avatar sx={{ width: 80, height: 80, mb: 2 }} />
        <Typography variant="h6">Andressa Silva</Typography>
        <Box display="flex" alignItems="center" color="green" mb={1}>
          <Typography variant="h4">5.0</Typography>
          <StarIcon fontSize="large" />
        </Box>
      </Box>
      <Divider sx={{ my: 2 }} />
      <CardContent>
        <Typography variant="body2">Partidas jogadas: 10</Typography>
        <Typography variant="body2">Partidas organizadas: 2</Typography>
        <Typography variant="body2">Esporte favorito: Basquete</Typography>
        <Typography variant="body2" mt={2}>Idade: 21</Typography>
        <Typography variant="body2">Email: andressa@exemplo.com</Typography>
        <Typography variant="body2" mt={2}>Biografia:</Typography>
        <Box component="textarea" rows="4" style={{ width: '100%', marginTop: 8, padding: 8, resize: 'none', borderRadius: 4 }} />
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
