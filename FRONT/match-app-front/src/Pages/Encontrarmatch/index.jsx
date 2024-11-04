import React, { useState } from 'react';
import './encontrar.css';
import Navbar from '../Navbar'; // Importando o componente Navbar
import { TextField, Select, MenuItem, FormControl, InputLabel, Checkbox, FormControlLabel, Button, Grid, Box, Typography } from '@mui/material';

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

  return (
    <>
      <nav>
        <Navbar />
      </nav> 
    <Box sx={{ maxWidth: "sm", mx: "auto", mt: 4, p: 2, border: "1px solid #ccc", borderRadius: 2 }}>
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
          <TextField
            label="Nível de expertise"
            value={filters.expertiseLevel}
            onChange={(e) => handleFilterChange('expertiseLevel', e.target.value)}
            fullWidth
          />
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
          <Box sx={{ height: 200, backgroundColor: '#f0f0f0', borderRadius: 1, mt: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="caption">[Mapa interativo com marcadores]</Typography>
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
