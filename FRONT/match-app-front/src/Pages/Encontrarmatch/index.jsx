import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './encontrar.css';
import Navbar from '../Navbar';
import { TextField, Select, MenuItem, FormControl, InputLabel, Checkbox, FormControlLabel, Button, Grid, Box, Typography, List, ListItem, ListItemText } from '@mui/material';
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

  useEffect(() => {
    axios.get('/api/partida/')
      .then(response => {
        setMatches(response.data);
        setFilteredMatches(response.data);
        console.log('Matches fetched successfully!', response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the matches!', error);
      });
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      let filtered = matches;

      if (filters.sport) {
        filtered = filtered.filter(match => match.sport === filters.sport);
      }
      if (filters.competitionType) {
        filtered = filtered.filter(match => match.competitionType === filters.competitionType);
      }
      if (filters.gender) {
        filtered = filtered.filter(match => match.gender === filters.gender);
      }
      if (filters.expertiseLevel) {
        filtered = filtered.filter(match => match.expertiseLevel === filters.expertiseLevel);
      }
      if (filters.minAge) {
        filtered = filtered.filter(match => match.age >= filters.minAge);
      }
      if (filters.maxAge) {
        filtered = filtered.filter(match => match.age <= filters.maxAge);
      }
      if (filters.isFree) {
        filtered = filtered.filter(match => match.isFree);
      }
      if (filters.isAccessible) {
        filtered = filtered.filter(match => match.isAccessible);
      }

      setFilteredMatches(filtered);
    };

    applyFilters();
  }, [filters, matches]);

  const handleFilterChange = (field, value) => {
    setFilters({ ...filters, [field]: value });
  };

  const customIcon = new Icon({
    iconUrl: 'https://firebasestorage.googleapis.com/v0/b/matchapp-a23bb.appspot.com/o/marker.png?alt=media&token=aa7f387b-c9ad-44f8-9adb-d8793184097a',
    iconSize: [50, 50],
    iconAnchor: [16, 32],
  });

  return (
    <>
      <nav id="navbar">
        <Navbar />
      </nav>
      <Box sx={{ maxWidth: "sm", mx: "auto", mt: 4, p: 2, border: "1px solid #ccc", borderRadius: 2, marginTop: 10 }} id="main-box">
        <Typography variant="h6" gutterBottom id="title">Encontre uma partida próxima a você</Typography>

        <Grid container spacing={2} id="filters-grid">
          <Grid item xs={6} id="sport-filter">
            <FormControl fullWidth>
              <InputLabel id="sport-label">Esporte</InputLabel>
              <Select
                value={filters.sport}
                onChange={(e) => handleFilterChange('sport', e.target.value)}
                labelId="sport-label"
                id="sport-select"
              >
                <MenuItem value="vôlei">Vôlei</MenuItem>
                <MenuItem value="futebol">Futebol</MenuItem>
                <MenuItem value="basquete">Basquete</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6} id="competition-type-filter">
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

          <Grid item xs={6} id="gender-filter">
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

          <Grid item xs={6} id="expertise-level-filter">
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

          <Grid item xs={6} id="min-age-filter">
            <TextField
              label="Faixa de idade (min)"
              type="number"
              value={filters.minAge}
              onChange={(e) => handleFilterChange('minAge', e.target.value)}
              fullWidth
              id="min-age-textfield"
            />
          </Grid>

          <Grid item xs={6} id="max-age-filter">
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
              <MapContainer center={[-22.4142733, -45.4495993]} zoom={14} id="map">
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  id="tile-layer"
                />
                {filteredMatches.map((match, index) => (
                  <Marker key={index} position={[match.latitude, match.longitude]} icon={customIcon} id={`marker-${index}`}>
                    <Popup id={`popup-${index}`}>
                      <div>
                        {match.sport} - {match.participants} pessoas
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </Box>
          </Grid>

          <Grid item xs={12} id="matches-list">
            <Typography variant="subtitle1" id="list-title">Lista de partidas:</Typography>
            <List id="matches-list">
              {filteredMatches.map((match, index) => (
                <ListItem key={index} id={`list-item-${index}`}>
                  <ListItemText primary={`${match.sport} - ${match.participants} pessoas`} secondary={`Local: ${match.location}`} />
                </ListItem>
              ))}
            </List>
          </Grid>

          <Grid item xs={12} id="action-buttons">
            <Button variant="contained" color="success" fullWidth sx={{ mb: 1 }} id="subscribe-button">
              Se inscrever
            </Button>
            <Button variant="contained" color="success" fullWidth style={{ marginTop: 10 }} id="organize-button">
              <a href="/criarmatch" style={{ color: 'inherit', textDecoration: 'none' }}>Organizar uma partida</a>
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default FindMatch;