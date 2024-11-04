import React from 'react';
import { Card, CardContent, Typography, Box, Button } from '@mui/material';
import Navbar from '../Navbar'; // Importando o componente Navbar

const MatchCard = ({ sport, location, date }) => {
  return (
    <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
      <Card sx={{ backgroundColor: 'green', color: 'white', p: 1, flex: 1, mr: 2 }}>
        <CardContent sx={{ padding: '8px !important' }}>
          <Typography variant="body1">
            {sport} - {location}
          </Typography>
          <Typography variant="body2">{date}</Typography>
        </CardContent>
      </Card>
      <Button variant="contained" color="error">Desistir</Button>
    </Box>
  );
};

const UpcomingMatches = () => {
  return (
    <>
        <nav>
          <Navbar />
        </nav> 
    <Box sx={{ maxWidth: "sm", mx: 'auto', mt: 5, p: 2, textAlign: 'center' }}>
      <Typography variant="h6" gutterBottom>Suas próximas partidas</Typography>
      <MatchCard sport="Vôlei" location="Av. Coliseu, 400, Recife" date="14/08/2024" />
      <MatchCard sport="Futebol" location="Av. Coliseu, 400, Recife" date="15/08/2024" />
    </Box>
    </>
  );
};

export default UpcomingMatches;
