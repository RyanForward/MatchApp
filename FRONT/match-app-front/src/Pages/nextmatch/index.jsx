import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Box, Button, CircularProgress, Alert } from '@mui/material';
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
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Buscar o userId do localStorage
    const userId = localStorage.getItem('userId');

    if (!userId) {
      setError('Usuário não autenticado');
      setLoading(false);
      return;
    }

    // Fazer a requisição para buscar as próximas partidas
    const fetchMatches = async () => {
      try {
        console.log('userId: ', userId)
        const response = await axios.get(`/nextmatch/${userId}`); // Chamada à API
        if (!response.ok) {
          throw new Error('Erro ao buscar as partidas');
        }
        console.log('response: ', response)
        const data = await response.json();
        console.log('data: ', data)
        setMatches(data); // Atualizar o estado com as partidas
      } catch (err) {
        console.error(err);
        setError('Erro ao carregar as partidas');
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  if (loading) {
    return (
      <Box id="loading-container" sx={{ textAlign: 'center', mt: 5 }}>
        <CircularProgress />
        <Typography id="loading-text" variant="body1" sx={{ mt: 2 }}>
          Carregando suas próximas partidas...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box id="error-container" sx={{ textAlign: 'center', mt: 5 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <>
      <nav id="navbar-container">
        <Navbar id="navbar" />
      </nav>
      <Box id="upcoming-matches-container" sx={{ maxWidth: 'sm', mx: 'auto', mt: 5, p: 2, textAlign: 'center', marginTop: 10 }}>
        <Typography id="upcoming-matches-title" variant="h6" gutterBottom>
          Suas próximas partidas
        </Typography>
        {matches.length > 0 ? (
          matches.map((match) => (
            <MatchCard
              key={match.match_id}
              sport={match.sport} // Ajuste conforme o nome do campo retornado pela API
              location={match.location} // Ajuste conforme o nome do campo retornado pela API
              date={new Date(match.match_data).toLocaleDateString('pt-BR')} // Formata a data
            />
          ))
        ) : (
          <Typography id="no-matches-text" variant="body1">
            Nenhuma partida futura encontrada.
          </Typography>
        )}
      </Box>
    </>
  );
};

export default UpcomingMatches;
