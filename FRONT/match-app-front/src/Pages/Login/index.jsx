import { Box, Container, IconButton, InputAdornment, TextField, Typography, Grid2, Button } from "@mui/material";
import { useState } from "react";
import logo from '../../Assets/imgs/logo-completo.png';
import { Link } from 'react-router-dom';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import googleLogo from '../../Assets/imgs/google_logo.png';
import './login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [showSenha, setShowSenha] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevenir o comportamento padrão do formulário
        
        const senhaPerfil = "123"; // Exemplo de senha correta para verificar
        if (senha !== senhaPerfil) {
            setError('As senhas não coincidem!');
        } else {
            setError('');
            console.log({ email, senha });
            // Aqui você pode fazer o envio ao servidor
        }
    };

    // logar com google
    const handleGoogleLogin = async () => {
        try {
            // Lógica de login com Google
            const result = await signInWithPopup(auth, provider);
            console.log('Usuário logado com Google: ', result.user);
            // redireciona ou faz outra ação
        } catch (error) {
            console.error('Erro ao fazer login com Google: ', error);
        }
    };

    return(
        <Container maxWidth="sm" sx={{ backgroundColor: "#ffffff" }}>
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
                        style={{ width: '100%', height: 'auto' }}
                    />
                </Box>
                <Typography variant="h4" component="h1" gutterBottom paddingBottom={2}>
                    Bora jogar?
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid2 
                        container 
                        spacing={2} 
                        fullWidth
                        display='flex'
                        flexDirection='column'
                        alignItems='center'
                    >
                        <Grid2 item xs={12} minWidth='350px'>
                            <TextField
                                label="Email"
                                variant="outlined"
                                fullWidth
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Grid2>
                        <Grid2 item xs={12} minWidth='350px'>
                            <TextField
                                label="Senha"
                                variant="outlined"
                                fullWidth
                                type={showSenha ? 'text' : 'password'}
                                value={senha}
                                onChange={ (e) => setSenha(e.target.value)}
                                required
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowSenha(!showSenha)}
                                            >
                                                {showSenha ? <VisibilityOff/> : <Visibility/>}
                                            </IconButton>
                                        </InputAdornment>
                                    ) ,
                                }}
                            />
                        </Grid2>
                        {error && (
                            <Typography color="error" textAlign="center">
                                {error}
                            </Typography>
                        )}
                        <Grid2 item xs={12} sx={{ padding: 0 }} minWidth='350px'>
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
                        </Grid2>
                        <Grid2 item xs={12} sx={{ marginTop: 2 }} minWidth='350px'>
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
                        </Grid2>
                    </Grid2>
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
