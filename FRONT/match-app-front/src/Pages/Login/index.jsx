import { Box, Container, IconButton, InputAdornment, TextField, Typography, Grid2, Button } from "@mui/material";
import { useState } from "react"
import { column } from "stylis";
import logo from '../../Assets/imgs/logo-completo.png';
import { Link } from 'react-router-dom';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import googleLogo from '../../Assets/imgs/google_logo.png'

const Login = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [showSenha, setShowSenha] = useState(false);

        const handleSubmit = (e) => {
            //envia dados para o servidor
            const senhaPerfil = 123;
            console.log(nome, senha)
            if (senha !== senhaPerfil) {
                setError('As senhas não coincidem!');
            } else {
            setError('');
            console.log({ nome, email, senha });
            }
        };

      
        //logar com google
        const handleGoogleLogin = async () => {
            try {
            const result = await signInWithPopup(auth, provider);
            console.log('Usuário logado com Google: ', result.user);
            // redireciona
            } catch (error) {
            console.error('Erro ao fazer login com Google: ', error);
            }
        };

    return(
        <Container maxWidth="sm" sx={{backgroundColor: "#ffffff"}}>
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
                <Typography variant="h4" component="h1" gutterBottom paddingBottom={10}>
                    Bora jogar?
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid2 container spacing={2} >
                        <Grid2 item xs={1}>
                            <TextField
                            label="Email"
                            variant="outlined"
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            />
                        </Grid2>
                        <Grid2 item xs={18}>
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
                        </Grid2>
                        <Grid2 item xs={12} sx={{padding: 2}}>
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
                                }}
                                >
                                Entrar
                            </Button>
                        </Grid2>
                </form>
                <Grid2 item xs={18} sx={{ marginTop: 2 }}>
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
                        width: {
                        xs: '290px',
                        sm: '500px',
                        md: '500px', 
                        lg: '500px', 
                        },
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
    )
};

export default Login;