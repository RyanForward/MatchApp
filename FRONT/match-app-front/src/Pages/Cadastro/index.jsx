import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box, Grid2, InputAdornment, IconButton, Grid } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../firebase';
import { Link } from 'react-router-dom';
import logo from '../../Assets/imgs/logo-completo.png';
import googleLogo from '../../Assets/imgs/google_logo.png';
import './cadastro.css';

const Cadastro = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [error, setError] = useState('');
  const [showSenha, setShowSenha] = useState(false);

  // logar sem google
  const handleSubmit = (e) => {
    e.preventDefault();
    if (senha !== confirmarSenha) {
      setError('As senhas não coincidem!');
    } else {
      setError('');
      console.log({ nome, email, senha });
    }
  };

  // logar com google
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log('Usuário logado com Google: ', result.user);
      // redireciona
    } catch (error) {
      console.error('Erro ao fazer login com Google: ', error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ backgroundColor: '#ffffff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        flexDirection="column"
        flexGrow={1} // faz o conteúdo crescer para preencher a altura da tela
        padding={2}
        sx={{ overflowY: 'auto' }} // habilita o scroll quando necessário
      >
        <Box mb={2} sx={{ flexShrink: 0 }}>
          <img 
            src={logo} 
            alt="Descrição da imagem"
            style={{ width: '100%', height: 'auto' }}
          />
        </Box>
        <Typography variant="h4" component="h1" gutterBottom paddingBottom={2}>
          Seja bem-vindo!
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid2 container spacing={2} fullWidth display="flex" justifyContent="center">
            <Grid2 item xs={12} sx={{ padding: 0 }} minWidth="350px">
              <TextField
                label="Nome"
                variant="outlined"
                fullWidth
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
                sx={{ maxWidth: '100%' }}
              />
            </Grid2>

            <Grid2 item xs={12} sx={{ padding: 0 }} minWidth="350px">
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                sx={{ maxWidth: '100%' }}
              />
            </Grid2>

            <Grid2 item xs={12} sx={{ padding: 0 }} minWidth="350px">
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
                sx={{ maxWidth: '100%' }}
              />
            </Grid2>

            <Grid2 item xs={12} sx={{ padding: 0 }} minWidth="350px">
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
                sx={{ maxWidth: '100%' }}
              />
            </Grid2>

            {error && (
              <Grid2 item xs={12} sx={{ padding: 0 }} minWidth="350px">
                <Typography color="error">{error}</Typography>
              </Grid2>
            )}

            <Grid2 item xs={12} sx={{ padding: 0 }} minWidth="350px">
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
                  maxWidth: '100%',
                }}
              >
                Cadastrar
              </Button>
            </Grid2>
            <Grid2 item xs={12} minWidth="350px">
              <Button
                variant="outlined"
                fullWidth
                onClick={handleGoogleLogin}
                sx={{
                  backgroundColor: '#fff',
                  color: '#000',
                  borderColor: '#7a7a7a',
                  fontSize: '1em',
                  textTransform: 'none',
                  padding: '10px 20px',
                  borderRadius: '25px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  '&:hover': {
                    backgroundColor: '#adffb5',
                    borderColor: 'black'
                  },
                }}
              >
                <Box
                  component="img"
                  src={googleLogo}
                  alt="Google logo"
                  sx={{
                    width: '25px',
                    height: '25px',
                    marginRight: '10px',
                  }}
                />
                Cadastro com Google
              </Button>
            </Grid2>
          </Grid2>
        </form>

        <Typography
          component={Link}
          to="/login" 
          sx={{
            margin: '10px',
            color: 'black', 
            textAlign: 'center', 
            fontSize: '1.05em',
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
