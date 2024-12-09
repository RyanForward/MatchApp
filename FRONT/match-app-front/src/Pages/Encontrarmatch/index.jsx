import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './encontrar.css';
import Navbar from '../Navbar';
import { TextField, Snackbar, Alert, Select, MenuItem, FormControl, InputLabel, CircularProgress, Checkbox, FormControlLabel, Button, Grid, Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';

function FindMatch() {
  const [filters, setFilters] = useState({
    sport: '',
    competitionType: '',
    gender: '',
    expertiseLevel: '',
    minAge: '',
    maxAge: '',
    isFree: false,
    isAccessible: false
  });

  const [matches, setMatches] = useState([]);
  const [filteredMatches, setFilteredMatches] = useState([]);
  const [center, setCenter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success',
  });


  const handleClose = () => {
    setNotification((prev) => ({ ...prev, open: false }));
  };

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

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = [position.coords.latitude, position.coords.longitude];
          setCenter(newLocation);
        },
        (error) => {
          console.error('Error obtaining location', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('Token not found');
          throw new Error('Token not found');
        }
        const response = await axios.get('/api/partida/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMatches(response.data);
        setFilteredMatches(response.data);
      } catch (error) {
        console.error('There was an error fetching the matches!', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMatches();
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      let filtered = matches;

      if (filters.sport) {
        filtered = filtered.filter(match => match.esporte === filters.sport);
      }
      if (filters.competitionType) {
        filtered = filtered.filter(match => match.tipo_competicao === filters.competitionType);
      }
      if (filters.gender) {
        filtered = filtered.filter(match => match.genero === filters.gender);
      }
      if (filters.expertiseLevel) {
        filtered = filtered.filter(match => match.nivel_expertise === filters.expertiseLevel);
      }
      if (filters.minAge) {
        filtered = filtered.filter(match => match.faixa_idade_min >= filters.minAge);
      }
      if (filters.maxAge) {
        filtered = filtered.filter(match => match.faixa_idade_max <= filters.maxAge);
      }
      if (filters.isFree) {
        filtered = filtered.filter(match => match.partida_gratuita);
      }
      if (filters.isAccessible) {
        filtered = filtered.filter(match => match.acessivel);
      }

      setFilteredMatches(filtered);
    };

    applyFilters();
  }, [filters, matches]);

  const handleFilterChange = (field, value) => {
    setFilters({ ...filters, [field]: value });
  };

  const handleMatchSelect = (match) => {
    setSelectedMatch(match);
  };

  const generateRandomNumber = () => {
    return Math.floor(Math.random() * 1000000);
  };

  const handleSubscribe = async () => {
    if (!selectedMatch) {
      alert('Selecione uma partida primeiro!');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token not found');
        throw new Error('Token not found');
      }

      const randomNumber = generateRandomNumber();
      const currentDate = new Date().toLocaleDateString('pt-BR');
      await axios.post('/api/grupo', {
        shipment_id: randomNumber,
        match_id: selectedMatch.match_id,
        user_id: user.user_id,
        horario: currentDate
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setNotification({
        open: true,
        message: 'Incrição realizada com sucesso!',
        severity: 'success',
      });

    } catch (error) {
      console.error('There was an error subscribing to the match!', error);
      setNotification({
        open: true,
        message: 'Incrição falhou!',
        severity: 'error',
      });
    }
  };

  const customIcon = new Icon({
    iconUrl: 'https://firebasestorage.googleapis.com/v0/b/matchapp-a23bb.appspot.com/o/marker.png?alt=media&token=aa7f387b-c9ad-44f8-9adb-d8793184097a',
    iconSize: [50, 50],
    iconAnchor: [16, 32],
  });

  if (!center) {
    return <div>Carregando mapa...</div>;
  }

  return (
    <>
      <nav id="navbar">
        <Navbar />
      </nav>
      <Box sx={{ maxWidth: "sm", mx: "auto", mt: 4, p: 2, border: "1px solid #ccc", borderRadius: 2, marginTop: 10 }} id="main-box">
        <Typography variant="h6" gutterBottom id="title">Encontre uma partida próxima a você</Typography>

        {loading ? ( // Exibe o spinner enquanto carrega
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}>
            <CircularProgress />
          </Box>
        ) : (

        <Grid container spacing={2} id="filters-grid">
          <Grid item xs={12} sm={6} id="sport-filter">
            <FormControl fullWidth>
              <InputLabel id="sport-label">Esporte</InputLabel>
              <Select
                value={filters.sport}
                onChange={(e) => handleFilterChange('sport', e.target.value)}
                labelId="sport-label"
                id="sport-select"
              >
                <MenuItem value="Vôlei">Vôlei</MenuItem>
                <MenuItem value="Futebol">Futebol</MenuItem>
                <MenuItem value="Basquete">Basquete</MenuItem>
                <MenuItem value="Tênis">Tênis</MenuItem>
                <MenuItem value="Futebol Americano">Futebol Americano</MenuItem>
                <MenuItem value="Handebol">Handebol</MenuItem>
                <MenuItem value="Rugby">Rugby</MenuItem>
                <MenuItem value="Beisebol">Beisebol</MenuItem>
                <MenuItem value="Hóquei">Hóquei</MenuItem>
                <MenuItem value="Golf">Golf</MenuItem>
                <MenuItem value="Skate">Skate</MenuItem>
                <MenuItem value="Surf">Surf</MenuItem>
                <MenuItem value="Natação">Natação</MenuItem>
                <MenuItem value="Ciclismo">Ciclismo</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} id="competition-type-filter">
            <FormControl fullWidth>
              <InputLabel id="competition-type-label">Tipo de competição</InputLabel>
              <Select
                value={filters.competitionType}
                onChange={(e) => handleFilterChange('competitionType', e.target.value)}
                labelId="competition-type-label"
                id="competition-type-select"
              >
                <MenuItem value="amador">Amador</MenuItem>
                <MenuItem value="profissional">Profissional</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} id="gender-filter">
            <FormControl fullWidth>
              <InputLabel id="gender-label">Gênero</InputLabel>
              <Select
                value={filters.gender}
                onChange={(e) => handleFilterChange('gender', e.target.value)}
                labelId="gender-label"
                id="gender-select"
              >
                <MenuItem value="masculino">Masculino</MenuItem>
                <MenuItem value="feminino">Feminino</MenuItem>
                <MenuItem value="misto">Misto</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} id="expertise-level-filter">
            <FormControl fullWidth>
              <InputLabel id="expertise-level-label">Tipo de expertise</InputLabel>
              <Select
                value={filters.expertiseLevel}
                onChange={(e) => handleFilterChange('expertiseLevel', e.target.value)}
                labelId="expertise-level-label"
                id="expertise-level-select"
              >
                <MenuItem value="novato">Novato</MenuItem>
                <MenuItem value="iniciante">Iniciante</MenuItem>
                <MenuItem value="amador">Amador</MenuItem>
                <MenuItem value="experiente">Experiente</MenuItem>
                <MenuItem value="profissional">Profissional</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} id="min-age-filter">
            <TextField
              label="Faixa de idade (min)"
              type="number"
              value={filters.minAge}
              onChange={(e) => handleFilterChange('minAge', e.target.value)}
              fullWidth
              id="min-age-textfield"
            />
          </Grid>

          <Grid item xs={12} sm={6} id="max-age-filter">
            <TextField
              label="Faixa de idade (max)"
              type="number"
              value={filters.maxAge}
              onChange={(e) => handleFilterChange('maxAge', e.target.value)}
              fullWidth
              id="max-age-textfield"
            />
          </Grid>

          <Grid item xs={12} id="checkbox-filters">
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.isFree}
                  onChange={(e) => handleFilterChange('isFree', e.target.checked)}
                  id="free-checkbox"
                />
              }
              label="Partida gratuita?"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.isAccessible}
                  onChange={(e) => handleFilterChange('isAccessible', e.target.checked)}
                  id="accessible-checkbox"
                />
              }
              label="Acessível"
            />
          </Grid>

            <Grid item xs={12} id="map-container">
              <Typography variant="subtitle1" id="map-title">Selecione uma partida:</Typography>
              <Box sx={{ height: 300, backgroundColor: '#f0f0f0', borderRadius: 1, mt: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid black' }} id="map-box">
                <MapContainer center={center} zoom={14} id="map">
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    id="tile-layer"
                  />
                 {filteredMatches.map((match, index) => {
                    const coordinates = match.match_local
                      .split(',')
                      .map(coord => parseFloat(coord.trim()));

                    return (
                      <Marker
                        key={index}
                        position={coordinates}
                        icon={customIcon}
                        id={`marker-${index}`}
                        eventHandlers={{
                          click: () => handleMatchSelect(match),
                        }}
                      >
                        <Popup id={`popup-${index}`}>
                          <div>
                            <div>{match.esporte} - {match.numero_total_pessoas} pessoas</div>
                            <div>Faixa de idade: {match.faixa_idade_min} - {match.faixa_idade_max} anos</div>
                            <div>Data: {new Date(match.match_data).toLocaleDateString('pt-BR', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                            }).replace(/\//g, '-')} 
                          </div>                            
                          <div>Preço: {match.partida_gratuita ? 'gratuito' : `R$${match.match_valor}`}</div>
                          </div>
                        </Popup>
                      </Marker>
                    );
                  })}
                </MapContainer>
              </Box>
            </Grid>

            <Grid item xs={12} id="matches-list">
              <Typography variant="subtitle1" id="list-title">Lista de partidas:</Typography>
              <List id="matches-list" className='selected-match'>
                {filteredMatches.map((match, index) => (
                  <ListItem 
                    key={index} 
                    id={`list-item-${index}`} 
                    button 
                    selected={selectedMatch && selectedMatch.id === match.id}
                    onClick={() => handleMatchSelect(selectedMatch && selectedMatch.match_id === match.match_id ? null : match)}
                    sx={{
                      backgroundColor: selectedMatch && selectedMatch.match_id === match.match_id ? 'rgba(0, 123, 255, 0.5)' : 'transparent',
                      '&:hover': {
                        backgroundColor: selectedMatch && selectedMatch.match_id === match.match_id ? 'rgba(0, 123, 255, 0.6)' : 'transparent',
                      },
                    }}
                  >
                    <ListItemText primary={`${match.esporte} - ${match.numero_total_pessoas} pessoas`} secondary={`Local: ${match.partida_gratuita ? 'gratuito' : 'paga'}`} />
                  </ListItem>
                ))}
              </List>
            </Grid>

          <Grid item xs={12} id="action-buttons">
            <Button 
              variant="contained" 
              color="success" 
              fullWidth 
              sx={{ mb: 1, backgroundColor: 'rgb(46, 125, 50)' }} 
              id="subscribe-button"
              onClick={handleSubscribe}
              disabled={!selectedMatch}
            >
              inscrever-se
            </Button>
            <Button variant="contained" color="success" fullWidth style={{ marginTop: 10, backgroundColor: 'rgb(46, 125, 50)' }} id="organize-button">
              <a href="/criarmatch" style={{ color: 'inherit', textDecoration: 'none' }}>Organizar uma partida</a>
            </Button>
            <Snackbar
              open={notification.open}
              autoHideDuration={6000}
              onClose={handleClose}
              color='primary'
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <Alert onClose={handleClose} severity={notification.severity} sx={{ width: '100%' }}>
                {notification.message}
              </Alert>
            </Snackbar>
          </Grid>
        </Grid>
      )}
      </Box>
    </>
  );
}

export default FindMatch;
