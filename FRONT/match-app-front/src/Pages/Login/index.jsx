import { Box, Container, IconButton, InputAdornment, TextField, Typography, Grid, Button } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuth } from '../../Routes/AuthContext';
import './login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [showSenha, setShowSenha] = useState(false);
    const [error, setError] = useState('');
    const auth = getAuth();
    const { login } = useAuth(); 
    const navigate = useNavigate();
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
        }
    };

    // Login com Google
    const handleGoogleLogin = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            console.log('Usuário logado com Google: ', result.user);
            login();
            navigate('/historico');
        } catch (error) {
            console.error('Erro ao fazer login com Google: ', error);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ backgroundColor: "#ffffff", borderRadius: "8px"}}>
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                height="100vh"
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
                            <Button 
                                type="submit" 
                                variant="contained" 
                                color="primary"
                                fullWidth
                                sx={{ fontWeight: 'bold', fontSize: '1em', borderRadius: '8px' }}
                            >
                                Entrar
                            </Button>
                        </Grid>

                        {/* Botão Login com Google */}
                        <Grid item xs={12} mt={2} style={{ width: '100%' }}>
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
                                />
                                Login com Google
                            </Button>
                        </Grid>
                    </Grid>
                </form>

                {/* Link para a página de cadastro */}
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
                >
                    Não possui conta? <strong>Cadastre-se</strong>
                </Typography>
            </Box>
        </Container>
    );
};

export default Login;
