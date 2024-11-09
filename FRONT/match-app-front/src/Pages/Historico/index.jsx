import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableRow, Typography, Paper,
  Button, Grid2, Container
} from '@mui/material';
import NavBar from '../Navbar';

const HistoricoPartidas = () => {
  const [partidas, setPartidas] = useState([]);

  useEffect(() => {
    const partidasDoBackend = [
      { esporte: 'Basquete', local: 'Av. Coliseu, 400, Recife', data: '10/08/2024' },
      { esporte: 'Vôlei', local: 'Av. Coliseu, 400, Recife', data: '10/08/2024' },
      { esporte: 'Futebol', local: 'Av. Magalhães, 200, Rio de Janeiro', data: '15/05/2024' },
      { esporte: 'Basquete', local: 'Av. Coliseu, 400, Recife', data: '10/08/2024' },
      { esporte: 'Vôlei', local: 'Av. Coliseu, 400, Recife', data: '10/08/2024' },
      { esporte: 'Futebol', local: 'Av. Magalhães, 200, Rio de Janeiro', data: '15/05/2024' },
      { esporte: 'Basquete', local: 'Av. Coliseu, 400, Recife', data: '10/08/2024' },
      { esporte: 'Vôlei', local: 'Av. Coliseu, 400, Recife', data: '10/08/2024' },
      { esporte: 'Futebol', local: 'Av. Magalhães, 200, Rio de Janeiro', data: '15/05/2024' },
      { esporte: 'Basquete', local: 'Av. Coliseu, 400, Recife', data: '10/08/2024' },
      { esporte: 'Vôlei', local: 'Av. Coliseu, 400, Recife', data: '10/08/2024' },
      { esporte: 'Futebol', local: 'Av. Magalhães, 200, Rio de Janeiro', data: '15/05/2024' },
      { esporte: 'Basquete', local: 'Av. Coliseu, 400, Recife', data: '10/08/2024' },
      { esporte: 'Vôlei', local: 'Av. Coliseu, 400, Recife', data: '10/08/2024' },
      { esporte: 'Futebol', local: 'Av. Magalhães, 200, Rio de Janeiro', data: '15/05/2024' },
      { esporte: 'Basquete', local: 'Av. Coliseu, 400, Recife', data: '10/08/2024' },
      { esporte: 'Vôlei', local: 'Av. Coliseu, 400, Recife', data: '10/08/2024' },
      { esporte: 'Futebol', local: 'Av. Magalhães, 200, Rio de Janeiro', data: '15/05/2024' },
      // Outros dados omitidos para brevidade
    ];
    setPartidas(partidasDoBackend);
  }, []);

  return (
    <>
    <nav>
      <NavBar />
    </nav>  
    <Container maxWidth="sm" sx={{ backgroundColor: "#ffffff", marginTop: { xs: 4, md: 6, lg: 8 } }}>
      <NavBar/>
      <Grid2
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        sx={{
          marginBottom: {xs: 6, md: 8, lg:8},
          maxWidth: '100%',
          padding: { xs: 2, sm: 3, lg: 4 }
        }}
      >
        <Typography
          variant="h5"
          align="center"
          sx={{
            maxWidth: { xs: '100%', md: 250, lg: 300 },
            margin: 'auto',
            mt: 2,
            fontSize: { xs: '1.2rem', sm: '1.5rem', lg: '1.8rem' }
          }}
        >
          <strong>Histórico de partidas</strong>
        </Typography>
        <TableContainer
          component={Paper}
          sx={{
            width: { xs: '100%', sm: 350, lg: 1000 },
            mt: 4,
          }}
        >
          <Table>
            <TableBody>
              {partidas.map((partida, index) => (
                <TableRow key={index}>
                  <TableCell
                    align="center"
                    sx={{
                      border: '1px solid black',
                      padding: { xs: 1, sm: 2, lg: 3 },
                      fontSize: { xs: '0.8rem', sm: '1rem', lg: '1.2rem' },
                      fontWeight: 'bold',
                      wordBreak: 'break-word'
                    }}
                  >
                    {`${partida.esporte} - ${partida.local} - ${partida.data}`}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid2>
          <Grid2
            sx={{
              width: { xs: '100%', sm: 350, lg: 500 },
              bottom: '2vh',
              marginTop: { xs: 2, sm: 4, lg: 6 },
              
            }}
          >
            <Button
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "#FF0000",
                bottom: {xs: '0%'},
                left: '50%',
                transform: 'translate(-50%, -50%)',
                position: 'fixed',
                fontWeight: 'bold',
                fontSize: { xs: '0.7rem', sm: '0.9rem', lg: '1.1rem' },
                border: 0,
                height: { xs: '4vh', sm: '4vh', lg: '6vh' },
                width:  { xs: '50vw', sm: '30vw', lg: '20vw' },
                borderRadius: '8px',
                padding: { xs: 1, sm: 2, lg: 3 }
              }}
            >
              Deletar histórico
            </Button>
          </Grid2>
    </Container>
    </>
  );
};

export default HistoricoPartidas;
