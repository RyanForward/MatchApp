import { Box, Container, IconButton, InputAdornment, TextField, Typography, Button } from "@mui/material";
import { useState } from "react";
import logo from '../../Assets/imgs/logo-completo.png';
import { Link, useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import googleLogo from '../../Assets/imgs/google_logo.png';
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
            setMsg('Login efetuado com sucesso!');
            login();
            navigate('/home');
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            localStorage.setItem('token', result.user.accessToken);
            login();
            navigate('/home');
        } catch (error) {
            console.error('Erro ao fazer login com Google: ', error);
        }
    };

    return (
        <Container maxWidth="xs" sx={{ backgroundColor: "#ffffff", padding: 2 }} id="login-container">
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
                height="100vh"
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
                                id="submit-button"
                            >
                                Entrar
                            </Button>
                        </Box>
                        <Box width="100%" mb={2} id="google-login-box">
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
                                id="google-login-button"
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
                                    id="google-logo"
                                />
                                Login com Google
                            </Button>
                        </Box>
                    </Box>
                </form>
                <Typography
                    component={Link}
                    to="/signup" 
                    sx={{
                        margin: '10px',
                        color: 'black', 
                        textAlign: 'center', 
                        fontSize: '1.05em',
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
