import React, { useEffect, useState } from 'react';
import { TextField, Select, MenuItem, FormControl, InputLabel, Checkbox, FormControlLabel, Button, Grid, Box, Typography, IconButton, List, ListItem, ListItemText, ListItemSecondaryAction } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import './criapartida.css';
import Navbar from '../Navbar';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const MapComponent = ({ marker, setMarker }) => {
  const center = [-22.4142733, -45.4495993];
  const zoom = 13;

  const addMarker = (e) => {
    setMarker({
      id: Date.now(),
      position: e.latlng,
      label: `Marcador em ${e.latlng.lat.toFixed(4)}, ${e.latlng.lng.toFixed(4)}`
    });
    console.log(e.latlng);
  };

  function MapClickHandler() {
    useMapEvents({ click: addMarker });
    return null;
  }

  return (
    <MapContainer center={center} zoom={zoom} style={{ height: "300px", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MapClickHandler />
      {marker && <Marker key={marker.id} position={marker.position}><Popup>{marker.label}</Popup></Marker>}
    </MapContainer>
  );
};

function CreateMatch() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { control, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      match_data: '',
      match_valor: 0,
      esporte: '',
      tipoCompeticao: '',
      genero: '',
      faixaIdadeMin: '',
      faixaIdadeMax: '',
      nivelExpertise: '',
      numeroTotalPessoas: '',
      match_publico: false,
      acessivel: false,
    }
  });

  const formValues = watch();

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

  const [participants, setParticipants] = useState([]);
  const [newParticipant, setNewParticipant] = useState("");
  const [marker, setMarker] = useState(null);

  const handleAddParticipant = () => {
    if (newParticipant) {
      setParticipants([...participants, newParticipant]);
      setNewParticipant("");
    }
  };

  const handleRemoveParticipant = (name) => {
    setParticipants(participants.filter(participant => participant !== name));
  };

  const handleRemoveMarker = () => {
    setMarker(null);
  };

  const generateRandomNumber = () => {
    return Math.floor(Math.random() * 1000000);
  };

  const onSubmit = async (data) => {
    const randomNumber = generateRandomNumber();
    const localizacao = marker.position.lat + ',' + marker.position.lng;
    const matchData = {
      randomNumber,
      user_id: user.user_id,
      match_local: localizacao,
      ...data,
      participantes: participants,
    };

    try {
      console.log(marker.position.lat + ', ' + marker.position.lng);
      console.log('Creating match:', matchData);
      const response = await axios.post('/api/partida', matchData);
      console.log('Match created successfully:', response.data);
    } catch (error) {
      console.error('Error creating match:', error);
    }
  };

  return (
    <>
      <nav><Navbar /></nav>
      <Box sx={{ maxWidth: "sm", mx: "auto", mt: 4, p: 2, border: "1px solid #ccc", borderRadius: 2, marginTop: 10 }}>
        <Typography variant="h6" gutterBottom id="title">Crie uma partida</Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Esporte</InputLabel>
              <Controller
                name="esporte"
                control={control}
                render={({ field }) => (
                  <Select {...field}>
                    <MenuItem value="vôlei">Vôlei</MenuItem>
                    <MenuItem value="futebol">Futebol</MenuItem>
                    <MenuItem value="basquete">Basquete</MenuItem>
                  </Select>
                )}
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Tipo de competição</InputLabel>
              <Controller
                name="tipoCompeticao"
                control={control}
                render={({ field }) => (
                  <Select {...field}>
                    <MenuItem value="amador">Amador</MenuItem>
                    <MenuItem value="profissional">Profissional</MenuItem>
                  </Select>
                )}
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Gênero</InputLabel>
              <Controller
                name="genero"
                control={control}
                render={({ field }) => (
                  <Select {...field}>
                    <MenuItem value="masculino">Masculino</MenuItem>
                    <MenuItem value="feminino">Feminino</MenuItem>
                    <MenuItem value="misto">Misto</MenuItem>
                  </Select>
                )}
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <Controller
              name="match_data"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Data"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              )}
            />
          </Grid>

          <Grid item xs={6}>
            <Controller
              name="faixaIdadeMin"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="Faixa de idade (min)" type="number" fullWidth />
              )}
            />
          </Grid>

          <Grid item xs={6}>
            <Controller
              name="faixaIdadeMax"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="Faixa de idade (max)" type="number" fullWidth />
              )}
            />
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Tipo de expertise</InputLabel>
              <Controller
                name="nivelExpertise"
                control={control}
                render={({ field }) => (
                  <Select {...field}>
                    <MenuItem value="novato">Novato</MenuItem>
                    <MenuItem value="iniciante">Iniciante</MenuItem>
                    <MenuItem value="amador">Amador</MenuItem>
                    <MenuItem value="experiente">Experiente</MenuItem>
                    <MenuItem value="profissional">Profissional</MenuItem>
                  </Select>
                )}
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <Controller
              name="numeroTotalPessoas"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="Número total de pessoas" type="number" fullWidth />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Controller
                  name="match_publico"
                  control={control}
                  render={({ field }) => (
                    <Checkbox {...field} checked={field.value} />
                  )}
                />
              }
              label="Partida gratuita?"
            />
            <FormControlLabel
              control={
                <Controller
                  name="acessivel"
                  control={control}
                  render={({ field }) => (
                    <Checkbox {...field} checked={field.value} />
                  )}
                />
              }
              label="Acessível"
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1">Selecione um local:</Typography>
            <Box sx={{ height: 300, backgroundColor: '#f0f0f0', borderRadius: 1, mt: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid black' }}>
              <MapComponent marker={marker} setMarker={setMarker} />
            </Box>
            <br />
            {marker && (
              <Button variant="contained" color="warning" fullWidth onClick={handleRemoveMarker}>
                Remover Marcador
              </Button>
            )}
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1">Adicione participantes:</Typography>
            <Box display="flex" alignItems="center">
              <TextField value={newParticipant} onChange={(e) => setNewParticipant(e.target.value)} label="Nome do participante" fullWidth />
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
            <Button variant="contained" color="primary" fullWidth onClick={handleSubmit(onSubmit)}>
              Criar Partida
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default CreateMatch;
