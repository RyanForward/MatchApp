// src/Pages/NotFound.js
import React from 'react';
import { Container, Box, Typography, Grid, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import img from '../../Assets/imgs/luvas.png';

function NotFound() {
  const theme = useTheme();

  return (
    <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', py: 4 }}>
      <Grid container spacing={4} alignItems="center" justifyContent="center">
        {/* Texto de erro */}
        <Grid item xs={12} md={6}>
          <Box textAlign={{ xs: 'center', md: 'left' }} p={3}>
            <Typography
              variant="h1"
              color="black"
              fontWeight="bold"
              gutterBottom
              sx={{
                fontSize: { xs: '3rem', sm: '4rem', md: '6rem' }, // Ajuste do tamanho da fonte
              }}
            >
              404
            </Typography>
            <Typography
              variant="h4"
              color="textPrimary"
              sx={{
                fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }, // Ajuste do tamanho da fonte
              }}
            >
              Página Não Encontrada
            </Typography>
            <Typography
              variant="body1"
              color="textPrimary"
              mt={2}
              sx={{
                fontSize: { xs: '1rem', sm: '1.25rem' }, // Ajuste do tamanho da fonte
                textAlign: { xs: 'center', md: 'left' },
              }}
            >
              Lamentamos por isso, mas a página que você está procurando não existe ou está fora do ar.
            </Typography>
            <Box mt={4} display="flex" justifyContent={{ xs: 'center', md: 'flex-start' }}>
              <Button
                component={Link}
                to="/home"
                variant="contained"
                color="primary"
              >
                Voltar para a Página Inicial
              </Button>
            </Box>
          </Box>
        </Grid>

        {/* Imagem de erro */}
        <Grid item xs={12} md={6}>
          <Box display="flex" justifyContent="center" px={2}>
            <img
              src={img}
              alt="Página não encontrada"
              style={{
                width: '100%',
                maxWidth: '400px', // Limita a largura máxima da imagem
                height: 'auto',
                borderRadius: theme.shape.borderRadius,
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default NotFound;
