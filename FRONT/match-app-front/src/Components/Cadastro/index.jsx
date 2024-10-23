import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Container, Box, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import './cadastro.css';
import logo from '../../Assets/imgs/logo.png';
import { Link } from 'react-router-dom';

const Cadastro = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [error, setError] = useState('');
  const [showSenha, setShowSenha] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (senha !== confirmarSenha) {
      setError('As senhas não coincidem!');
    } else {
      setError('');
      console.log({ nome, email, senha });
    }
  };

  return (
    <Container 
      maxWidth="sm" 
      sx={{
        backgroundColor: '#ffffff',
      }}
    >
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        flexDirection="column"
        height="100vh"
        padding={2}
      >
        <Box mb={2}>
          <img 
            src={logo} 
            alt="Descrição da imagem"
            style={{ width: '100%', height: 'auto', maxWidth: '300px' }}
          />
        </Box>
        <Typography variant="h4" component="h1" gutterBottom paddingBottom={10}>
          Seja bem-vindo!
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Nome"
                variant="outlined"
                fullWidth
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Senha"
                variant="outlined"
                fullWidth
                type={showSenha ? 'text' : 'password'}
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowSenha(!showSenha)}
                        edge="end"
                      >
                        {showSenha ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Confirmar Senha"
                variant="outlined"
                fullWidth
                type="password"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                required
                error={senha !== confirmarSenha}
                helperText={senha !== confirmarSenha ? 'As senhas não coincidem' : ''}
              />
            </Grid>
            {error && (
              <Grid item xs={12}>
                <Typography color="error">{error}</Typography>
              </Grid>
            )}
            <Grid item xs={12}>
              <Button 
                type="submit" 
                variant="contained" 
                color="primary"
                fullWidth 
                disableElevation 
                sx={{
                  fontWeight: 'bold', 
                  fontSize: '1.1em',
                  borderRadius: '10.7px',
                  backgroundColor: (theme) => theme.palette.primary.main,
                  color: (theme) => theme.palette.primary.contrastText,
                  '&:hover': { backgroundColor: (theme) => theme.palette.primary.light },
                  '&:active': { backgroundColor: (theme) => theme.palette.primary.dark },
                  '&:disabled': { backgroundColor: (theme) => theme.palette.grey[400], color: (theme) => theme.palette.grey[700] },
                }}
              >
                Cadastrar
              </Button>
            </Grid>
          </Grid>
        </form>
        <Typography
          component={Link}
          to="/login" 
          sx={{
            margin: '10px',
            color: 'black', 
            textAlign: 'center', 
            textDecoration: 'none', 
            '&:hover': { textDecoration: 'underline' }
          }}
        >
          Já possui uma conta? <strong>Faça login!</strong>
        </Typography>
      </Box>
    </Container>
  );
};

export default Cadastro;
