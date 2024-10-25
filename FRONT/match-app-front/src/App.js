  import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import RoutesApp from './Routes/routes';
import Cadastro from './Components/Cadastro';

const theme = createTheme({
  typography: {
    fontFamily: 'Exo 2, sans-serif',
  },
  palette: {
    primary: {
      main: '#309F5C', 
      light: '#5EBF8E',
      dark: '#1E6B3B', 
      contrastText: '#FFFFFF', 
    },
    secondary: {
      main: '#FFFFFF', 
    }
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RoutesApp/>
    </ThemeProvider>
  );
}

export default App;