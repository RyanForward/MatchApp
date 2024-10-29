import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import "./navbar.css";
import logo from '../../Assets/imgs/logo-completo.png'; // Importando a logo    

function NavBar() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const drawerContent = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {['Início', 'Histórico', 'Perfil', 'Próximas partidas'].map((text, index) => (
          <ListItem button key={index}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Política de privacidade', 'Termos de serviço'].map((text, index) => (
          <ListItem button key={index}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <AppBar position="static" style={{ backgroundColor: '#ffffff', color: '#000' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Home Page
          </Typography>
          {/* Logo */}
          <img 
            src={logo} 
            alt="Descrição da imagem"
            style={{ width: '10%', height: 'auto' }}
          />
        </Toolbar>
      </AppBar>

      {/* Drawer para o menu lateral */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerContent}
      </Drawer>
    </div>
  );
}

export default NavBar;
