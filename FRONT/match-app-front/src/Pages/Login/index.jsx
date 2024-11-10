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
            console.log('Token de autenticação: ', response);
            localStorage.setItem('token', response.data.token);
            setMsg('Login efetuado com sucesso!');
            console.log(msg);
            login();
            navigate('/home');
        } catch (error) {
            setError(error.response.data.message);
            console.log(error.response.data);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            console.log('Usuário logado com Google: ', result.user.accessToken);
            localStorage.setItem('token', result.user.accessToken);
            login();
            navigate('/home');
        } catch (error) {
            console.error('Erro ao fazer login com Google: ', error);
        }
    };

    return (
        <Container maxWidth="xs" sx={{ backgroundColor: "#ffffff", padding: 2 }}>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
                height="100vh"
                padding={2}
            >
                <Box mb={2} sx={{ maxWidth: '80%' }}>
                    <img 
                        src={logo} 
                        alt="Descrição da imagem"
                        style={{ width: '100%', height: 'auto' }}
                    />
                </Box>
                <Typography variant="h4" component="h1" gutterBottom paddingBottom={2} sx={{ textAlign: 'center', fontSize: '1.5rem' }}>
                    Bora jogar?
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
                    <Box display="flex" flexDirection="column" alignItems="center" width="100%">
                        <Box width="100%" mb={2}>
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
                                    />
                                )}
                            />
                        </Box>
                        <Box width="100%" mb={2}>
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
                                                    >
                                                        {showSenha ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                )}
                            />
                        </Box>
                        {error && (
                            <Typography color="error" textAlign="center" sx={{ marginBottom: '16px' }}>
                                {error}
                            </Typography>
                        )}
                        <Box width="100%" mb={2}>
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
                                Entrar
                            </Button>
                        </Box>
                        <Box width="100%" mb={2}>
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
                >
                    Não possui conta? <strong>Cadastre-se</strong>
                </Typography>
            </Box>
        </Container>
    );
};

export default Login;
