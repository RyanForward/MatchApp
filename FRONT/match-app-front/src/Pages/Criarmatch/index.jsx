import React, { useState } from 'react';
import { TextField, Select, MenuItem, FormControl, InputLabel, Checkbox, FormControlLabel, Button, Grid, Box, Typography, IconButton, List, ListItem, ListItemText, ListItemSecondaryAction } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import './criapartida.css';
import Navbar from '../Navbar'; // Importando o componente Navbar
import axios from 'axios';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'
import { Icon } from 'leaflet';

function CreateMatch() {
  const [participants, setParticipants] = useState([]);
  const [newParticipant, setNewParticipant] = useState("");

  const handleAddParticipant = () => {
    if (newParticipant) {
      setParticipants([...participants, newParticipant]);
      setNewParticipant("");
    }
  };

  const handleRemoveParticipant = (name) => {
    setParticipants(participants.filter(participant => participant !== name));
  };

  const handleSubmit = async () => {
    const matchData = {
        esporte: document.querySelector('input[name="esporte"]').value,
        tipoCompeticao: document.querySelector('input[name="tipoCompeticao"]').value,
        genero: document.querySelector('input[name="genero"]').value,
        data: document.querySelector('input[name="data"]').value,
        faixaIdadeMin: document.querySelector('input[name="faixaIdadeMin"]').value,
        faixaIdadeMax: document.querySelector('input[name="faixaIdadeMax"]').value,
        nivelExpertise: document.querySelector('input[name="nivelExpertise"]').value,
        numeroTotalPessoas: document.querySelector('input[name="numeroTotalPessoas"]').value,
        partidaGratuita: document.querySelector('input[name="partidaGratuita"]').checked,
        acessivel: document.querySelector('input[name="acessivel"]').checked,
        participantes: participants,
    };

    try {
        const response = await axios.post('/api/partida', matchData);
        console.log('Match created successfully:', response.data);
    } catch (error) {
        console.error('Error creating match:', error);
    }
};

  return (
    <>
      <nav>
        <Navbar />
      </nav> 
    <Box sx={{ maxWidth: "sm", mx: "auto", mt: 4, p: 2, border: "1px solid #ccc", borderRadius: 2, marginTop: 10  }}>
      <Typography variant="h6" gutterBottom>Crie uma partida</Typography>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>Esporte</InputLabel>
            <Select defaultValue="">
              <MenuItem value="vôlei">Vôlei</MenuItem>
              <MenuItem value="futebol">Futebol</MenuItem>
              <MenuItem value="basquete">Basquete</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>Tipo de competição</InputLabel>
            <Select defaultValue="">
              <MenuItem value="amador">Amador</MenuItem>
              <MenuItem value="profissional">Profissional</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>Gênero</InputLabel>
            <Select defaultValue="">
              <MenuItem value="masculino">Masculino</MenuItem>
              <MenuItem value="feminino">Feminino</MenuItem>
              <MenuItem value="misto">Misto</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Data"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField label="Faixa de idade (min)" type="number" fullWidth />
        </Grid>

        <Grid item xs={6}>
          <TextField label="Faixa de idade (max)" type="number" fullWidth />
        </Grid>

        <Grid item xs={6}>
          <TextField label="Nível de expertise" fullWidth />
        </Grid>

        <Grid item xs={6}>
          <TextField label="Número total de pessoas" type="number" fullWidth />
        </Grid>

        <Grid item xs={12}>
          <FormControlLabel control={<Checkbox />} label="Partida gratuita?" />
          <FormControlLabel control={<Checkbox />} label="Acessível" />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle1">Selecione um local:</Typography>
          <Box sx={{ height: 300, backgroundColor: '#f0f0f0', borderRadius: 1, mt: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid black' }}>
          <MapContainer center={[-22.4142733, -45.4495993]} zoom={14}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            </MapContainer>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle1">Adicione participantes:</Typography>
          <Box display="flex" alignItems="center">
            <TextField
              value={newParticipant}
              onChange={(e) => setNewParticipant(e.target.value)}
              label="Nome do participante"
              fullWidth
            />
            <IconButton color="primary" onClick={handleAddParticipant}>
              <AddIcon />
            </IconButton>
          </Box>
          <List>
            {participants.map((participant, index) => (
              <ListItem key={index}>
                <ListItemText primary={participant} />
                <ListItemSecondaryAction>
                  <IconButton edge="end" color="secondary" onClick={() => handleRemoveParticipant(participant)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Grid>

        <Grid item xs={12}>
            <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
                Criar Partida
            </Button>
        </Grid>
      </Grid>
    </Box>
    </>
  );
}

export default CreateMatch;




