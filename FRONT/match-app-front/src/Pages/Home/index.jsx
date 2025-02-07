import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Container, Button, Box, Card, CardActionArea, CardContent, Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Navbar from '../Navbar'; // Importando o componente Navbar
import Perfil from '../Perfil'; // Importando o componente Perfil
import Profile from '../Profile'; // Importando o componente Profile
import logo from '../../Assets/imgs/logo-completo.png';
import axios from 'axios';
import { Link } from 'react-router-dom';

function HomePage() {

  const partidas = [
    { id: 1, esporte: 'Vôlei', local: 'Av. Coliseu, 400, Recife', data: '10/08/2024' },
    { id: 2, esporte: 'Vôlei', local: 'Av. Coliseu, 400, Recife', data: '10/08/2024' },
    { id: 3, esporte: 'Vôlei', local: 'Av. Coliseu, 400, Recife', data: '10/08/2024' },
    { id: 4, esporte: 'Vôlei', local: 'Av. Coliseu, 400, Recife', data: '10/08/2024' },
    { id: 5, esporte: 'Vôlei', local: 'Av. Coliseu, 400, Recife', data: '10/08/2024' },
  ];

  return (
    <>
      <nav id="navbar">
        <Navbar id="navbar-component" />
      </nav>
      <Container maxWidth="sm" sx={{ paddingTop: 2, marginTop: 8 }} id="container-home">
        {/* Saudação */}
        <Profile id="profile-component" />
        <Typography 
          variant="subtitle1" 
          gutterBottom 
          sx={{ fontSize: '1.4em', textAlign: 'center', margin: 6 }} 
          id="greeting-text"
        >
          O que deseja fazer?
        </Typography>

        {/* Cards */}
        <Box display="flex" flexDirection="column" alignItems="center" mb={3} id="action-cards">
          <Card sx={{ width: '100%', marginTop: 2, backgroundColor: 'success.main' }} id="find-match-card">
            <CardActionArea component={Link} to="/encontrarmatch">
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h6" component="div" sx={{ color: 'white' }}>
                  Encontrar uma partida
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          <Typography variant="subtitle1" gutterBottom sx={{ marginY: 1 }} id="or-text">
            ou
          </Typography>
          <Card sx={{ width: '100%', marginTop: 2, backgroundColor: 'success.main' }} id="organize-match-card">
            <CardActionArea component={Link} to="/criarmatch">
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h6" component="div" sx={{ color: 'white' }}>
                  Organizar uma partida
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Box>

      </Container>
    </>
  );
}

export default HomePage;
