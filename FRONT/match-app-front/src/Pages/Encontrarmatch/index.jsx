import React, { useState } from 'react';
import './encontrar.css';
import Navbar from '../Navbar'; // Importando o componente Navbar
import { TextField, Select, MenuItem, FormControl, InputLabel, Checkbox, FormControlLabel, Button, Grid, Box, Typography } from '@mui/material';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'
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
      <nav>
        <Navbar />
      </nav> 
    <Box sx={{ maxWidth: "sm", mx: "auto", mt: 4, p: 2, border: "1px solid #ccc", borderRadius: 2, marginTop: 10 }}>
      <Typography variant="h6" gutterBottom>Encontre uma partida próxima a você</Typography>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>Esporte</InputLabel>
            <Select
              value={filters.sport}
              onChange={(e) => handleFilterChange('sport', e.target.value)}
            >
              <MenuItem value="vôlei">Vôlei</MenuItem>
              <MenuItem value="futebol">Futebol</MenuItem>
              <MenuItem value="basquete">Basquete</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>Tipo de competição</InputLabel>
            <Select
              value={filters.competitionType}
              onChange={(e) => handleFilterChange('competitionType', e.target.value)}
            >
              <MenuItem value="amador">Amador</MenuItem>
              <MenuItem value="profissional">Profissional</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>Gênero</InputLabel>
            <Select
              value={filters.gender}
              onChange={(e) => handleFilterChange('gender', e.target.value)}
            >
              <MenuItem value="masculino">Masculino</MenuItem>
              <MenuItem value="feminino">Feminino</MenuItem>
              <MenuItem value="misto">Misto</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel>Tipo de expertise</InputLabel>
          <Select
            value={filters.expertiseLevel}
            onChange={(e) => handleFilterChange('expertiseLevel', e.target.value)}
            fullWidth
            >
              <MenuItem value="novato">Novato</MenuItem>
              <MenuItem value="iniciante">Iniciante</MenuItem>
              <MenuItem value="amador">Amador</MenuItem>
              <MenuItem value="experiente">Experiente</MenuItem>
              <MenuItem value="profissional">Profissional</MenuItem>
          </Select>
        </FormControl>
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Faixa de idade (min)"
            type="number"
            value={filters.minAge}
            onChange={(e) => handleFilterChange('minAge', e.target.value)}
            fullWidth
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Faixa de idade (max)"
            type="number"
            value={filters.maxAge}
            onChange={(e) => handleFilterChange('maxAge', e.target.value)}
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.isFree}
                onChange={(e) => handleFilterChange('isFree', e.target.checked)}
              />
            }
            label="Partida gratuita?"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.isAccessible}
                onChange={(e) => handleFilterChange('isAccessible', e.target.checked)}
              />
            }
            label="Acessível"
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle1">Selecione uma partida:</Typography>
          <Box sx={{ height: 300, backgroundColor: '#f0f0f0', borderRadius: 1, mt: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid black' }}>
          <MapContainer center={[-22.4142733, -45.4495993]} zoom={14}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[-22.4148486,-45.446872]} icon={customIcon}>
                <Popup>
                  <div>
                      Volei - 4 pessoas
                  </div>
                </Popup>
              </Marker>
              <Marker position={[-22.408078, -45.436202]} icon={customIcon}>
                <Popup>
                  <div>
                      Beach Tenis - 2 pessoas
                  </div>
                </Popup>
              </Marker>
            </MapContainer>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" color="success" fullWidth sx={{ mb: 1 }}>
            Se inscrever
          </Button>
          <Button variant="contained" color="success" fullWidth style={{ marginTop: 10 }}>
            <a href="/criarmatch" style={{ color: 'inherit', textDecoration: 'none' }}>Organizar uma partida</a>
          </Button>
        </Grid>
      </Grid>
    </Box>
    </>
  );
}

export default FindMatch;
