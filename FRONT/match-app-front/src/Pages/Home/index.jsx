import React from 'react';
import {AppBar, Toolbar, IconButton, Typography, Container, Button, Box, Table, TableBody, TableCell, TableContainer, TableRow, Paper,} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Navbar from '../Navbar'; // Importando o componente Navbar
import logo from '../../Assets/imgs/logo-completo.png';

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
        <Container maxWidth="xs" style={{ paddingTop: 20 }}>
    
          {/* Saudação */}
          <Typography variant="h5" gutterBottom>Olá, Andressa!</Typography>
          <Typography variant="subtitle1" gutterBottom>O que deseja?</Typography>
    
          {/* Botões */}
          <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
            <Button variant="contained" color="success" fullWidth style={{ marginBottom: 10 }}>
              Encontrar partida
            </Button>
            <Typography variant="subtitle1" gutterBottom>ou</Typography>
            <Button variant="contained" color="success" fullWidth>
              Organizar partida
            </Button>
          </Box>
    
          {/* Últimas partidas */}
          <Typography variant="subtitle1" gutterBottom>Últimas 5 partidas:</Typography>
          <TableContainer component={Paper}>
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
        </Container>
      </>
    );
  }
  
  export default HomePage;