<<<<<<< HEAD
import React, { useState } from 'react';
import { TextField, Select, MenuItem, FormControl, InputLabel, Checkbox, FormControlLabel, Button, Grid, Box, Typography, IconButton, List, ListItem, ListItemText, ListItemSecondaryAction } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import './criapartida.css';
import Navbar from '../Navbar'; // Importando o componente Navbar
import axios from 'axios';

function CreateMatch() {
  const [participants, setParticipants] = useState([]);
  const [newParticipant, setNewParticipant] = useState("");
=======
import React, { useEffect, useState } from 'react';
import { TextField, Select, MenuItem, Snackbar, Alert, FormControl, InputLabel, Checkbox, FormControlLabel, Button, Grid, Box, Typography, IconButton, List, ListItem, ListItemText, ListItemSecondaryAction, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import './criapartida.css';
import Navbar from '../Navbar';
import axios from 'axios';
import { useForm, Controller, set } from 'react-hook-form';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { InfoOutlined } from '@mui/icons-material';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});


const MapComponent = ({ marker, setMarker }) => {
  const [center, setCenter] = useState(null);

  const zoom = 14;

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

  const addMarker = (e) => {
    setMarker({
      id: Date.now(),
      position: e.latlng,
      label: `Marcador em ${e.latlng.lat.toFixed(4)}, ${e.latlng.lng.toFixed(4)}`
    });
  };

  function MapClickHandler() {
    useMapEvents({ click: addMarker });
    return null;
  }

  if (!center) {
    return <div>Carregando mapa...</div>;
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
      match_publico: true,
      acessivel: false,
    }
  });

  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success',
  });


  const handleClose = () => {
    setNotification((prev) => ({ ...prev, open: false }));
  };
  

  const formValues = watch();
  const isFreeMatch = watch("match_publico");

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
>>>>>>> origin/matheus

  const handleAddParticipant = () => {
    if (newParticipant) {
      setParticipants([...participants, newParticipant]);
      setNewParticipant("");
    }
  };

  const handleRemoveParticipant = (name) => {
    setParticipants(participants.filter(participant => participant !== name));
  };

<<<<<<< HEAD
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
          <Box sx={{ height: 200, backgroundColor: '#f0f0f0', borderRadius: 1, mt: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="caption">[Mapa interativo aqui]</Typography>
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
=======
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
      host_id: user.user_id,
      match_local: localizacao,
      ...data,
      match_valor: isFreeMatch ? 0 : data.match_valor,
      participantes: participants,
    };

    try {
      const response = await axios.post('/api/partida', matchData);
      setNotification({
        open: true,
        message: 'Partida criada com sucesso!',
        severity: 'success',
      });
      setTimeout(() => {
        window.location.href = '/home';
      }, 5000);      
    } catch (error) {
      setNotification({
        open: true,
        message: 'Erro ao criar a partida.',
        severity: 'error',
      });
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
                    <MenuItem value="Amador">Amador</MenuItem>
                    <MenuItem value="Profissional">Profissional</MenuItem>
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
                    <MenuItem value="Masculino">Masculino</MenuItem>
                    <MenuItem value="Feminino">Feminino</MenuItem>
                    <MenuItem value="Misto">Misto</MenuItem>
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
                    <MenuItem value="Novato">Novato</MenuItem>
                    <MenuItem value="Iniciante">Iniciante</MenuItem>
                    <MenuItem value="Amador">Amador</MenuItem>
                    <MenuItem value="Experiente">Experiente</MenuItem>
                    <MenuItem value="Profissional">Profissional</MenuItem>
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
            {!isFreeMatch && (
              <Controller
                name="match_valor"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Valor da partida"
                    type="number"
                    fullWidth
                    InputProps={{ inputProps: { min: 0 } }}
                  />
                )}
              />
            )}
            <FormControlLabel
              control={
                <Controller
                  name="match_publico"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      {...field}
                      defaultValue={true}
                      checked={field.value}
                      onChange={(e) => {
                        field.onChange(e.target.checked);
                        if (e.target.checked) {
                          setValue("match_valor", 0);
                        }
                      }}
                    />
                  )}
                />
              }
              label={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  Gratuito para jogar
                  <Tooltip title="Marque esta opção se a partida for gratuita">
                    <IconButton size="small" style={{ marginLeft: 4, fontSize: '150px' }}>
                      <InfoOutlined fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </div>
              }            />
            <Grid>
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
              label={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  Com acessibilidade 
                  <span role="img" aria-label="com acessibilidade">♿</span>
                  <Tooltip title="Partidas acessíveis têm o objetivo de promover a inclusão, tornando possível a participação de deficientes físicos">
                    <IconButton size="small" style={{ marginLeft: 4, fontSize: '150px' }}>
                      <InfoOutlined fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </div>
              }                
            />
            </Grid>
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
      </Box>
>>>>>>> origin/matheus
    </>
  );
}

export default CreateMatch;
<<<<<<< HEAD




=======
>>>>>>> origin/matheus
