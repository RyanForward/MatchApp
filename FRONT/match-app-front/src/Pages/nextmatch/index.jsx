import React from 'react';
import { Card, CardContent, Typography, Box, Button } from '@mui/material';
import Navbar from '../Navbar'; // Importando o componente Navbar

const MatchCard = ({ sport, location, date }) => {
  return (
    <Box id="match-card-container" display="flex" flexDirection={{ xs: 'column', sm: 'row' }} alignItems="center" justifyContent="space-between" mb={2}>
      <Card id="match-card" sx={{ backgroundColor: '#42845c', color: 'white', p: 1, flex: 1, mb: { xs: 2, sm: 0 }, mr: { sm: 2 } }}>
        <CardContent id="match-card-content" sx={{ padding: '8px !important' }}>
          <Typography id="match-sport-location" variant="body1">
            {sport} - {location}
          </Typography>
          <Typography id="match-date" variant="body2">{date}</Typography>
        </CardContent>
      </Card>
      <Button id="desistir-button" variant="contained" color="error" fullWidth={false}>
        Desistir
      </Button>
    </Box>
  );
};

const UpcomingMatches = () => {
  return (
    <>
      <nav id="navbar-container">
        <Navbar id="navbar" />
      </nav>
      <Box id="upcoming-matches-container" sx={{ maxWidth: 'sm', mx: 'auto', mt: 5, p: 2, textAlign: 'center', marginTop: 10 }}>
        <Typography id="upcoming-matches-title" variant="h6" gutterBottom>
          Suas próximas partidas
        </Typography>
        <MatchCard id="match-card-1" sport="Vôlei" location="Av. Coliseu, 400, Recife" date="14/08/2024" />
        <MatchCard id="match-card-2" sport="Futebol" location="Av. Coliseu, 400, Recife" date="15/08/2024" />
      </Box>
    </>
  );
};

export default UpcomingMatches;
