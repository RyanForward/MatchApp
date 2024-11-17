import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableRow, Typography, Paper, Button, Container } from '@mui/material';
import NavBar from '../Navbar';
import { useAuth } from '../../Routes/AuthContext';

const HistoricoPartidas = () => {
  const [partidas, setPartidas] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem('userId');
  
  const fetchAddressFromCoordinates = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.REACT_APP_MAPS_API_KEY}`
      );
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        return data.results[0].formatted_address;
      } else {
        return 'Endereço não encontrado';
      }
    } catch (error) {
      console.error('Erro ao buscar endereço:', error);
      return 'Erro ao buscar endereço';
    }
  };

  useEffect(() => {
    const fetchPartidas = async () => {
      try {
        const response = await fetch(`/api/grupo/historico/${userId}`);
        const data = await response.json();

        if (Array.isArray(data)) {
          const partidasComEnderecos = await Promise.all(
            data.map(async (partida) => {
              if (typeof partida.match_local === 'string' && partida.match_local.includes(',')) {
                const [lat, lgn] = partida.match_local.split(',');

                const address = await fetchAddressFromCoordinates(lat, lgn);
                return {
                  ...partida,
                  match_local: address,
                };
              } else {
                console.warn('match_local ausente ou inválido para a partida:', partida);
                return {
                  ...partida,
                  match_local: 'Coordenadas inválidas ou ausentes',
                };
              }
            })
          );
          setPartidas(partidasComEnderecos);
        } else if (data) {
          setPartidas([data]);
        } else {
          setPartidas([]);
        }

      } catch (error) {
        console.error("Erro ao buscar dados do histórico de partidas:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchPartidas();
    }

  }, [userId]);

  if (loading) {
    return <Typography variant="h6" align="center">Carregando partidas...</Typography>;
  }

  return (
    <>
      <NavBar />
      <Container
        maxWidth="sm"
        sx={{
          backgroundColor: "#ffffff",
          marginTop: { xs: 10, md: 12, lg: 14 },
        }}
      >
        <Typography variant="h5" align="center" sx={{ marginTop: 2 }}>
          <strong>Histórico de partidas</strong>
        </Typography>
        <TableContainer component={Paper} sx={{ marginTop: 4 }}>
          <Table>
            <TableBody>
              {partidas.map((partida, index) => (
                <TableRow key={index}>
                  <TableCell align="center">
                    {`${partida.esporte} - ${partida.match_local} - ${partida.match_data}`}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: "#FF0000",
            marginTop: 4,
            color: "white",
          }}
        >
          Deletar histórico
        </Button>
      </Container>
    </>
  );
};

export default HistoricoPartidas;
