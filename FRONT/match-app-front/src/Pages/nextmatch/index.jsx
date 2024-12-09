import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Box, Button, CircularProgress, Alert, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import Navbar from '../Navbar';
import axios from 'axios';

const MatchCard = ({ sport, location, date, shipmentId, onDesistir }) => {
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
      <Button
        id="desistir-button"
        variant="contained"
        color="error"
        fullWidth={false}
        onClick={() => onDesistir(shipmentId)}
      >
        Desistir
      </Button>
    </Box>
  );
};

const fetchAddressFromCoordinates = async (lat, lng) => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.REACT_APP_MAPS_API_KEY}`
    );
    const data = await response.json();
    if (data.results && data.results.length > 0) {
      return data.results[0].formatted_address;
    } else {
      return 'Endereço não encontrado';
    }
  } catch (error) {
    console.error('Erro ao buscar endereço:', error);
    return 'Erro ao buscar endereço';
  }
};

const UpcomingMatches = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedMatchId, setSelectedMatchId] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem('userId');

    if (!userId) {
      setError('Usuário não autenticado');
      setLoading(false);
      return;
    }

    const fetchMatches = async () => {
      try {
        const response = await fetch(`/api/grupo/nextmatch/${userId}`);
        if (!response.ok) {
          throw new Error('Erro ao buscar as partidas');
        }

        const data = await response.json();

        if (Array.isArray(data)) {
          const partidasComEnderecos = await Promise.all(
            data.map(async (partida) => {
              if (typeof partida.match_local === 'string' && partida.match_local.includes(',')) {
                const [lat, lng] = partida.match_local.split(',');
                const address = await fetchAddressFromCoordinates(lat, lng);
                return {
                  ...partida,
                  match_local: address,
                };
              } else {
                console.warn('Coordenadas inválidas ou ausentes:', partida);
                return {
                  ...partida,
                  match_local: 'Localização não encontrada',
                };
              }
            })
          );
          setMatches(partidasComEnderecos);
        } else {
          setMatches([]);
        }
      } catch (err) {
        console.error(err);
        setError('Erro ao carregar as partidas');
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  const handleDesistirClick = (id) => {
    setSelectedMatchId(id);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedMatchId(null);
  };

  const handleConfirmDesistir = async () => {
    if (!selectedMatchId) return;

    try {
      const response = await axios.delete(`/api/grupo/${selectedMatchId}`);
      if (response.status === 200) {
        setMatches(matches.filter((match) => match.shipment_id !== selectedMatchId));
        alert('Você desistiu da partida com sucesso!');
      } else {
        alert('Erro ao desistir da partida.');
      }
    } catch (error) {
      console.error('Erro ao deletar o grupo:', error);
      alert('Erro ao desistir da partida.');
    } finally {
      handleDialogClose();
    }
  };

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
              key={match.shipment_id}
              sport={match.esporte}
              location={match.match_local}
              date={new Date(match.match_data).toLocaleDateString('pt-BR')}
              shipmentId={match.shipment_id}
              onDesistir={handleDesistirClick}
            />
          ))
        ) : (
          <Typography id="no-matches-text" variant="body1">
            Nenhuma partida futura encontrada.
          </Typography>
        )}
      </Box>

      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Confirmação</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Deseja mesmo desistir da partida?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirmDesistir} color="error">
            Desistir
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UpcomingMatches;
