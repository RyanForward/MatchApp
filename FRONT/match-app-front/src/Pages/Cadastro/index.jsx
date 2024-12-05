import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box, Grid, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { auth } from '../../firebase';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuth } from '../../Routes/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
<<<<<<< HEAD
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
=======
import axios from 'axios';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import logo from '../../Assets/imgs/logo-completo.png';
import googleLogo from '../../Assets/imgs/google_logo.png';
import './cadastro.css';

const schema = yup.object().shape({
  nome: yup.string().required('Nome é obrigatório'),
  email: yup.string().email('Email inválido').required('Email é obrigatório'),
  senha: yup.string().min(6, 'A senha deve ter pelo menos 6 caracteres').required('Senha é obrigatória'),
  confirmarSenha: yup.string().oneOf([yup.ref('senha'), null], 'As senhas não coincidem').required('Confirmação de senha é obrigatória'),
});

const Cadastro = () => {
  const [showSenha, setShowSenha] = useState(false);

  const { register, handleSubmit, formState: { errors }, control } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  const { login } = useAuth();

  const generateRandomNumber = () => {
    return Math.floor(Math.random() * 1000000);
  };

  const onSubmit = async (data) => {
    try {
      const randomNumber = generateRandomNumber();
      const userData = { randomNumber, ...data };
      await axios.post('/api/usuario', {
        user_id: randomNumber,
        user_nome: data.nome,
        user_email: data.email,
        user_senha: data.senha,
      });
      alert('Cadastrado com sucesso! Redirecionando para a página de login...')
      navigate('/login');
    } catch (error) {
      console.error('Erro ao cadastrar: ', error);
>>>>>>> origin/matheus
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      const result = await signInWithPopup(auth, provider);
<<<<<<< HEAD
      console.log('Usuário logado com Google: ', result.user);
=======
>>>>>>> origin/matheus
      login();
      navigate('/home');
    } catch (error) {
      console.error('Erro ao fazer login com Google: ', error);
    }
  };

  return (
<<<<<<< HEAD
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
=======
    <Container id="cadastro-container" maxWidth="sm" sx={{ backgroundColor: '#ffffff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Box id="cadastro-box" display="flex" justifyContent="center" alignItems="center" flexDirection="column" flexGrow={1} padding={2} sx={{ overflowY: 'auto' }}>
        <Box id="logo-box" mb={2} sx={{ flexShrink: 0, width: '100%', display: 'flex', justifyContent: 'center' }}>
          <img id="logo-image" src={logo} alt="Descrição da imagem" style={{ width: '100%', height: 'auto', maxWidth: '250px' }} />
        </Box>
        <Typography id="welcome-message" variant="h4" component="h1" gutterBottom paddingBottom={2} sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}>
          Seja bem-vindo!
        </Typography>
        <form id="cadastro-form" onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2} justifyContent="center" sx={{ width: '100%' }}>
            <Grid item xs={12}>
              <Controller
                name="nome"
                control={control}
                render={({ field }) => (
                  <TextField
                    id="nome-input"
                    {...field}
                    label="Nome"
                    variant="outlined"
                    fullWidth
                    error={!!errors.nome}
                    helperText={errors.nome ? errors.nome.message : ''}
                    required
                    sx={{ maxWidth: '100%' }}
                  />
                )}
>>>>>>> origin/matheus
              />
            </Grid>

            <Grid item xs={12}>
<<<<<<< HEAD
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
=======
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    id="email-input"
                    {...field}
                    label="Email"
                    variant="outlined"
                    fullWidth
                    type="email"
                    error={!!errors.email}
                    helperText={errors.email ? errors.email.message : ''}
                    required
                    sx={{ maxWidth: '100%' }}
                  />
                )}
>>>>>>> origin/matheus
              />
            </Grid>

            <Grid item xs={12}>
<<<<<<< HEAD
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
=======
              <Controller
                name="senha"
                control={control}
                render={({ field }) => (
                  <TextField
                    id="senha-input"
                    {...field}
                    label="Senha"
                    variant="outlined"
                    fullWidth
                    type={showSenha ? 'text' : 'password'}
                    error={!!errors.senha}
                    helperText={errors.senha ? errors.senha.message : ''}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton id="toggle-senha-visibility" onClick={() => setShowSenha(!showSenha)} edge="end">
                            {showSenha ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                    sx={{ maxWidth: '100%' }}
                  />
                )}
>>>>>>> origin/matheus
              />
            </Grid>

            <Grid item xs={12}>
<<<<<<< HEAD
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

=======
              <Controller
                name="confirmarSenha"
                control={control}
                render={({ field }) => (
                  <TextField
                    id="confirmar-senha-input"
                    {...field}
                    label="Confirmar Senha"
                    variant="outlined"
                    fullWidth
                    type="password"
                    error={!!errors.confirmarSenha}
                    helperText={errors.confirmarSenha ? errors.confirmarSenha.message : ''}
                    required
                    sx={{ maxWidth: '100%' }}
                  />
                )}
              />
            </Grid>

>>>>>>> origin/matheus
            <Grid item xs={12}>
              <Button 
                id="submit-button" 
                type="submit" 
                variant="contained" 
                color="primary" 
                fullWidth 
<<<<<<< HEAD
                sx={{ fontWeight: 'bold', fontSize: '1.1em', borderRadius: '10.7px' }}
=======
                disableElevation 
                sx={{
                  fontWeight: 'bold', 
                  fontSize: { xs: '1em', sm: '1.1em' },
                  borderRadius: '10.7px',
                  maxWidth: '100%',
                }}
>>>>>>> origin/matheus
              >
                Cadastrar
              </Button>
            </Grid>

            <Grid item xs={12}>
              <Button
                id="google-login-button"
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
                  id="google-logo-box"
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
          id="login-link"
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
