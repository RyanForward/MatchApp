import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Container, Button, Box, Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material';
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
      <nav>
        <Navbar />
      </nav>
      <Container maxWidth="sm" sx={{ paddingTop: 2, marginTop: 8 }}>
        {/* Saudação */}
        <Profile />
        <Typography variant="subtitle1" gutterBottom sx={{ fontSize: '1.4em', textAlign: 'center', margin: 6 }}>
          O que deseja?
        </Typography>

        {/* Botões */}
        <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
          <Button variant="contained" color="success" fullWidth sx={{ marginTop: 2 }} component={Link} to="/encontrarmatch">
                  Encontrar uma partida
          </Button>
          <Typography variant="subtitle1" gutterBottom sx={{ marginY: 1 }}>
            ou
          </Typography>
          <Button variant="contained" color="success" fullWidth sx={{ marginTop: 2 }} component={Link} to="/criarmatch">
                  Organizar uma partida
          </Button>
        </Box>

        {/* Últimas partidas */}
        <Typography variant="subtitle1" gutterBottom sx={{ marginY: 2 }}>
          Últimas 5 partidas:
        </Typography>
        
        {/* Box com rolagem horizontal para a tabela */}
        <Box sx={{ overflowX: 'auto' }}>
          <TableContainer component={Paper} sx={{ maxWidth: '100%' }}>
            <Table aria-label="Ultimas partidas">
              <TableBody>
                {partidas.map((partida) => (
                  <TableRow key={partida.id}>
                    <TableCell align="left">{partida.esporte}</TableCell>
                    <TableCell align="left">{partida.local}</TableCell>
                    <TableCell align="left">{partida.data}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
    </>
  );
}

export default HomePage;
