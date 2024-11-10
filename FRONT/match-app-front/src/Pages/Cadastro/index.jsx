import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box, Grid, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { auth } from '../../firebase';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuth } from '../../Routes/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import './cadastro.css';

const Cadastro = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [error, setError] = useState('');
  const [showSenha, setShowSenha] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); 
  const logo = 'https://firebasestorage.googleapis.com/v0/b/matchapp-a23bb.appspot.com/o/logo-completo.png?alt=media&token=719c282e-32a0-4c91-908a-6fb1dbcd0c1b'
  const googleLogo = 'https://firebasestorage.googleapis.com/v0/b/matchapp-a23bb.appspot.com/o/google_logo.png?alt=media&token=f4bf9fbf-24e6-4858-92bd-4512741a8aed'

  const handleSubmit = (e) => {
    e.preventDefault();
    if (senha !== confirmarSenha) {
      setError('As senhas não coincidem!');
    } else {
      setError('');
      console.log({ nome, email, senha });
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      const result = await signInWithPopup(auth, provider);
      console.log('Usuário logado com Google: ', result.user);
      login();
      navigate('/home');
    } catch (error) {
      console.error('Erro ao fazer login com Google: ', error);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ backgroundColor: '#ffffff', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 2 }}>
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        flexDirection="column"
        width="100%"
        padding={2}
        sx={{ overflowY: 'auto' }}
      >
        <Box mb={2} width="100%" display="flex" justifyContent="center">
          <img 
            src={logo} 
            alt="Logo da empresa MatchApp"
            style={{ width: '80%', maxWidth: '300px', height: 'auto' }}
          />
        </Box>
        <Typography variant="h5" component="h1" gutterBottom>
          Seja bem-vindo!
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
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
                sx={{ fontWeight: 'bold', fontSize: '1.1em', borderRadius: '10.7px' }}
              >
                Cadastrar
              </Button>
            </Grid>

            <Grid item xs={12}>
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
                  sx={{ width: '25px', height: '25px', marginRight: '10px' }}
                />
                Cadastro com Google
              </Button>
            </Grid>
          </Grid>
        </form>

        <Typography
          component={Link}
          to="/login" 
          sx={{
            marginTop: '15px',
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
