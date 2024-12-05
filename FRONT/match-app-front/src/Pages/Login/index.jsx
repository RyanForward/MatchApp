<<<<<<< HEAD
import { Box, Container, IconButton, InputAdornment, TextField, Typography, Grid, Button } from "@mui/material";
=======
import { Box, Container, IconButton, InputAdornment, TextField, Typography, Button } from "@mui/material";
>>>>>>> origin/matheus
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
<<<<<<< HEAD
=======
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import googleLogo from '../../Assets/imgs/google_logo.png';
>>>>>>> origin/matheus
import { useAuth } from '../../Routes/AuthContext';
import './login.css';

const schema = yup.object().shape({
    email: yup.string().email('Email inválido').required('Email é obrigatório'),
    senha: yup.string().min(6, 'A senha deve ter pelo menos 6 caracteres').required('Senha é obrigatória')
});

const Login = () => {
    const [showSenha, setShowSenha] = useState(false);
    const [msg, setMsg] = useState('');
    const [error, setError] = useState('');
    const auth = getAuth();
    const { login } = useAuth(); 
    const navigate = useNavigate();
<<<<<<< HEAD
    const logo = 'https://firebasestorage.googleapis.com/v0/b/matchapp-a23bb.appspot.com/o/logo-completo.png?alt=media&token=719c282e-32a0-4c91-908a-6fb1dbcd0c1b';
    const googleLogo = 'https://firebasestorage.googleapis.com/v0/b/matchapp-a23bb.appspot.com/o/google_logo.png?alt=media&token=f4bf9fbf-24e6-4858-92bd-4512741a8aed';

    const handleSubmit = (e) => {
        e.preventDefault(); 
        const senhaPerfil = "123";
        if (senha !== senhaPerfil) {
            setError('As senhas não coincidem!');
        } else {
            setError('');
            console.log({ email, senha });
=======
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data) => {
        try {
            const response = await axios.post('/api/login', {
                user_email: data.email,
                user_senha: data.senha
            });
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userId', response.data.userID); 
    
            setMsg('Login efetuado com sucesso!');
            login();
            navigate('/home');
        } catch (error) {
            setError(error.response.data.message);
>>>>>>> origin/matheus
        }
    };
    

<<<<<<< HEAD
    // Login com Google
=======
>>>>>>> origin/matheus
    const handleGoogleLogin = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
<<<<<<< HEAD
            console.log('Usuário logado com Google: ', result.user.accessToken);
=======
>>>>>>> origin/matheus
            localStorage.setItem('token', result.user.accessToken);
            login();
            navigate('/home');
        } catch (error) {
            console.error('Erro ao fazer login com Google: ', error);
        }
    };

    return (
<<<<<<< HEAD
        <Container maxWidth="sm" sx={{ backgroundColor: "#ffffff", borderRadius: "8px"}}>
=======
        <Container maxWidth="xs" sx={{ backgroundColor: "#ffffff", padding: 2 }} id="login-container">
>>>>>>> origin/matheus
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                height="100vh"
<<<<<<< HEAD
                textAlign="center"
            >
                {/* Logo */}
                <Box mb={3}>
                    <img 
                        src={logo} 
                        alt="Logo do aplicativo"
                        style={{ width: '80%', height: 'auto' }}
                    />
                </Box>

                {/* Título */}
                <Typography variant="h5" component="h1" gutterBottom fontWeight="bold">
                    Bora jogar?
                </Typography>

                {/* Formulário */}
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2} direction="column" alignItems="center" width="100%">
                        {/* Campo de Email */}
                        <Grid item xs={12} style={{ width: '100%' }}>
                            <TextField
                                label="Email"
                                variant="outlined"
                                fullWidth
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Grid>

                        {/* Campo de Senha */}
                        <Grid item xs={12} style={{ width: '100%' }}>
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
                                            <IconButton onClick={() => setShowSenha(!showSenha)}>
                                                {showSenha ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>

                        {/* Exibir erro */}
                        {error && (
                            <Typography color="error" variant="body2" mt={1}>
                                {error}
                            </Typography>
                        )}

                        {/* Botão Entrar */}
                        <Grid item xs={12} style={{ width: '100%' }}>
=======
                padding={2}
                id="login-box"
            >
                <Box mb={2} sx={{ maxWidth: '80%' }} id="logo-box">
                    <img 
                        src={logo} 
                        alt="Descrição da imagem"
                        style={{ width: '100%', height: 'auto' }}
                        id="logo"
                    />
                </Box>
                <Typography variant="h4" component="h1" gutterBottom paddingBottom={2} sx={{ textAlign: 'center', fontSize: '1.5rem' }} id="login-heading">
                    Bora jogar?
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }} id="login-form">
                    <Box display="flex" flexDirection="column" alignItems="center" width="100%" id="form-box">
                        <Box width="100%" mb={2} id="email-box">
                            <Controller
                                name="email"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Email"
                                        variant="outlined"
                                        fullWidth
                                        error={!!errors.email}
                                        helperText={errors.email ? errors.email.message : ''}
                                        id="email-input"
                                    />
                                )}
                            />
                        </Box>
                        <Box width="100%" mb={2} id="senha-box">
                            <Controller
                                name="senha"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <TextField
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
                                                    <IconButton
                                                        onClick={() => setShowSenha(!showSenha)}
                                                        id="toggle-password-visibility"
                                                    >
                                                        {showSenha ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                        id="senha-input"
                                    />
                                )}
                            />
                        </Box>
                        {error && (
                            <Typography color="error" textAlign="center" sx={{ marginBottom: '16px' }} id="login-error-message">
                                {error}
                            </Typography>
                        )}
                        <Box width="100%" mb={2} id="submit-button-box">
>>>>>>> origin/matheus
                            <Button 
                                type="submit"
                                variant="contained" 
                                color="primary"
<<<<<<< HEAD
                                fullWidth
                                sx={{ fontWeight: 'bold', fontSize: '1em', borderRadius: '8px' }}
                            >
                                Entrar
                            </Button>
                        </Grid>

                        {/* Botão Login com Google */}
                        <Grid item xs={12} mt={2} style={{ width: '100%' }}>
=======
                                fullWidth 
                                disableElevation 
                                sx={{
                                    fontWeight: 'bold', 
                                    fontSize: '1.1em',
                                    borderRadius: '10.7px',
                                    maxWidth: '100%',
                                }}
                                id="submit-button"
                            >
                                Entrar
                            </Button>
                        </Box>
                        <Box width="100%" mb={2} id="google-login-box">
>>>>>>> origin/matheus
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
                                    borderRadius: '25px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    '&:hover': {
                                        backgroundColor: '#adffb5',
                                        borderColor: 'black'
                                    },
                                }}
                                id="google-login-button"
                            >
                                <Box
                                    component="img"
                                    src={googleLogo}
                                    alt="Google logo"
                                    sx={{
                                        width: '24px',
                                        height: '24px',
                                        marginRight: '8px',
                                    }}
                                    id="google-logo"
                                />
                                Login com Google
                            </Button>
<<<<<<< HEAD
                        </Grid>
                    </Grid>
                </form>

                {/* Link para a página de cadastro */}
=======
                        </Box>
                    </Box>
                </form>
>>>>>>> origin/matheus
                <Typography
                    component={Link}
                    to="/signup"
                    sx={{
                        mt: 2,
                        color: 'black', 
                        fontSize: '1em',
                        textDecoration: 'none', 
                        '&:hover': { textDecoration: 'underline' }
                    }}
                    id="signup-link"
                >
                    Não possui conta? <strong>Cadastre-se</strong>
                </Typography>
            </Box>
        </Container>
    );
};

export default Login;
