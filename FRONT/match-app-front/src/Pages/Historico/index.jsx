import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableRow, Typography, Paper,
  Button, Grid2, Container
} from '@mui/material';

const HistoricoPartidas = () => {
  const [partidas, setPartidas] = useState([]);

  useEffect(() => {
    // Simulação de dados que viriam do backend
    const partidasDoBackend = [
      { esporte: 'Basquete', local: 'Av. Coliseu, 400, Recife', data: '10/08/2024' },
      { esporte: 'Vôlei', local: 'Av. Coliseu, 400, Recife', data: '10/08/2024' },
      { esporte: 'Futebol', local: 'Av. Magalhães, 200, Rio de Janeiro', data: '15/05/2024' },
      { esporte: 'Vôlei', local: 'Av. Coliseu, 400, Recife', data: '10/08/2024' },
      { esporte: 'Basquete', local: 'Av. Coliseu, 400, Recife', data: '10/08/2024' },
      { esporte: 'Basquete', local: 'Av. Coliseu, 400, Recife', data: '10/08/2024' },
      { esporte: 'Vôlei', local: 'Av. Coliseu, 400, Recife', data: '10/08/2024' },
      { esporte: 'Futebol', local: 'Av. Magalhães, 200, Rio de Janeiro', data: '15/05/2024' },
      { esporte: 'Vôlei', local: 'Av. Coliseu, 400, Recife', data: '10/08/2024' },
      { esporte: 'Basquete', local: 'Av. Coliseu, 400, Recife', data: '10/08/2024' },
      { esporte: 'Basquete', local: 'Av. Coliseu, 400, Recife', data: '10/08/2024' },
      { esporte: 'Vôlei', local: 'Av. Coliseu, 400, Recife', data: '10/08/2024' },
      { esporte: 'Futebol', local: 'Av. Magalhães, 200, Rio de Janeiro', data: '15/05/2024' },
      { esporte: 'Vôlei', local: 'Av. Coliseu, 400, Recife', data: '10/08/2024' },
      { esporte: 'Basquete', local: 'Av. Coliseu, 400, Recife', data: '10/08/2024' },
    
    ];
    
    setPartidas(partidasDoBackend);
  }, []);

  return (
    <Container maxWidth="sm" sx={{ backgroundColor: "#ffffff", marginTop: 10 }}>
        <Grid2
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            sx={{
                maxWidth: '100%'
            }}
        >
            <Typography variant="h5" align="center" gutterBottom sx={{ maxWidth: 250, margin: 'auto', mt: 2}}>
                <strong>Histórico de partidas</strong>
            </Typography>
            <TableContainer component={Paper} sx={{ maxWidth: 350, mt: 4, paddingBottom: 10}}>
            <Table>
                <TableBody>
                {partidas.map((partida, index) => (
                    <TableRow key={index}>
                    <TableCell
                        align="center"
                        sx={{
                        border: '1px solid black',
                        padding: '16px',
                        fontWeight: 'bold',
                        }}
                    >
                        {`${partida.esporte} - ${partida.local} - ${partida.data}`}
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody> 
                <Grid2 sx={{
                    maxWidth: '350px',  
                    position: 'fixed',
                    bottom: '5vh',
                    transform: 'translateX(-50%)',
                    left: '47%',
                    height: '8vw'}}
                    >
                <Button 
                    variant="contained"
                    fullWidth
                    sx={{
                        backgroundColor: "#FF0000",
                        fontWeight: 'bold', 
                        fontSize: '0.8em',
                        border: 0,
                        borderRadius: '10.7px',
                        maxWidth: '350px',
                        margin: 2
                    }}
                    >
                        Deletar histórico
                </Button>
            </Grid2 >
            </Table>
            </TableContainer>
        </Grid2>
    </Container>
        
  );
};

export default HistoricoPartidas;
