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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  useMediaQuery,
  useTheme,
  ButtonGroup,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth } from '../../Routes/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import "./navbar.css";

const logo = 'https://firebasestorage.googleapis.com/v0/b/matchapp-a23bb.appspot.com/o/logo.png?alt=media&token=ba286398-61bd-4cbb-9851-fc58b30ccd2f';

function NavBar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();
  
  // Hook para identificar o tamanho da tela
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);

  const handleLogoutClick = (event) => {
    event.stopPropagation();
    setOpenLogoutDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenLogoutDialog(false);
  };

  const confirmLogout = () => {
    setOpenLogoutDialog(false);
    logout();
    navigate('/login')
  };

  const drawerContent = (
    <Box
      sx={{ maxWidth: "sm" }}
      role="presentation"
      onKeyDown={toggleDrawer(false)}
<<<<<<< HEAD
    >
      <List>
=======
      id="drawer-content"
    >
      <List id="drawer-list">
>>>>>>> origin/matheus
        {[{ text: 'Início', link: '/home' },
          { text: 'Histórico', link: '/historico' },
          { text: 'Perfil', link: '/perfil' },
          { text: 'Próximas partidas', link: '/nextmatch' }
        ].map((item, index) => (
          <ListItem 
            button 
            component={Link} 
            to={item.link} 
            key={index}
            onClick={toggleDrawer(false)} // Fecha a sidebar para os links normais
<<<<<<< HEAD
=======
            id={`list-item-${index}`}
>>>>>>> origin/matheus
          >
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
<<<<<<< HEAD
      <Divider />
      <List>
=======
      <Divider id="drawer-divider" />
      <List id="drawer-bottom-list">
>>>>>>> origin/matheus
        {[{ text: 'Política de privacidade', link: '/privacy' },
          { text: 'Termos de serviço', link: '/terms' },
          { text: 'Sair', action: handleLogoutClick }
        ].map((item, index) => (
          <ListItem 
            button 
            component={item.link ? Link : 'div'} 
            to={item.link || undefined} 
            key={index}
            onClick={item.action || toggleDrawer(false)} // Se tiver `action`, usa handleLogoutClick
<<<<<<< HEAD
=======
            id={`list-item-bottom-${index}`}
>>>>>>> origin/matheus
          >
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>

      {/* Dialog de confirmação de logout */}
      <Dialog
        open={openLogoutDialog}
        onClose={handleCloseDialog}
<<<<<<< HEAD
      >
        <DialogTitle>Confirmar Logout</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Você realmente deseja sair?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={confirmLogout} color="primary" autoFocus>
=======
        id="logout-dialog"
      >
        <DialogTitle id="logout-dialog-title">Confirmar Logout</DialogTitle>
        <DialogContent id="logout-dialog-content">
          <DialogContentText id="logout-dialog-text">
            Você realmente deseja sair?
          </DialogContentText>
        </DialogContent>
        <DialogActions id="logout-dialog-actions">
          <Button onClick={handleCloseDialog} color="primary" id="cancel-logout-button">
            Cancelar
          </Button>
          <Button onClick={confirmLogout} color="primary" autoFocus id="confirm-logout-button">
>>>>>>> origin/matheus
            Sair
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );

  return (
    <div>
<<<<<<< HEAD
      <AppBar className='AppBar' position="fixed" style={{ backgroundColor: '#ffffff', color: '#000', marginBottom: '20px' }}>
        <Toolbar>
          {/* Menu Hamburguer para telas menores */}
          {isMobile && (
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
              <MenuIcon />
=======
      <AppBar className='AppBar' position="fixed" style={{ backgroundColor: '#ffffff', color: '#000', marginBottom: '20px' }} id="app-bar">
        <Toolbar id="toolbar">
          {/* Menu Hamburguer para telas menores */}
          {isMobile && (
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)} id="menu-icon-button">
              <MenuIcon id="menu-icon" />
>>>>>>> origin/matheus
            </IconButton>
          )}

          {/* Logo */}
<<<<<<< HEAD
          <Typography variant="h3" component="div" sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', width: '10px'}}>
=======
          <Typography variant="h3" component="div" sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', width: '10px'}} id="logo-container">
>>>>>>> origin/matheus
            <img 
              src={logo} 
              alt="Descrição da imagem"
              style={{ width: '80px', height: 'auto', margin: -20 }}
<<<<<<< HEAD
=======
              id="logo-img"
>>>>>>> origin/matheus
            />
          </Typography>

          {/* Navbar Links visíveis apenas em telas grandes */}
          {!isMobile && (
<<<<<<< HEAD
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'space-around' }}>
=======
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'space-around' }} id="navbar-links">
>>>>>>> origin/matheus
              <Button
                component={Link}
                to="/home"
                sx={{
                  textTransform: 'none',
                  textDecoration: 'none',
                  border: 'none',
                  fontSize: '1.1rem',
                  color: 'black',
                  '&:not(:last-child)': { marginRight: 0 }
                }}
<<<<<<< HEAD
=======
                id="home-button"
>>>>>>> origin/matheus
              >
                Início
              </Button>
              <Button
                component={Link}
                to="/historico"
                sx={{
                  textTransform: 'none',
                  border: 'none',
                  fontSize: '1.1rem',
                  color: 'black',
                  '&:not(:last-child)': { marginRight: 0 }
                }}
<<<<<<< HEAD
=======
                id="historico-button"
>>>>>>> origin/matheus
              >
                Histórico
              </Button>
              <Button
                component={Link}
                to="/perfil"
                sx={{
                  textTransform: 'none',
                  border: 'none',
                  fontSize: '1.1rem',
                  color: 'black',
                  '&:not(:last-child)': { marginRight: 0 }
                }}
<<<<<<< HEAD
=======
                id="perfil-button"
>>>>>>> origin/matheus
              >
                Perfil
              </Button>
              <Button
                component={Link}
                to="/nextmatch"
                sx={{
                  textTransform: 'none',
                  border: 'none',
                  fontSize: '1.1rem',
                  color: 'black',
                  '&:not(:last-child)': { marginRight: 0 }
                }}
<<<<<<< HEAD
=======
                id="nextmatch-button"
>>>>>>> origin/matheus
              >
                Próximas partidas
              </Button>
              <Button
                component={Link}
                to="/privacy"
                sx={{
                  textTransform: 'none',
                  border: 'none',
                  fontSize: '1.1rem',
                  color: 'black',
                  '&:not(:last-child)': { marginRight: 0 }
                }}
<<<<<<< HEAD
=======
                id="privacy-button"
>>>>>>> origin/matheus
              >
                Política de privacidade
              </Button>
              <Button
                component={Link}
                to="/terms"
                sx={{
                  textTransform: 'none',
                  border: 'none',
                  fontSize: '1.1rem',
                  color: 'black',
                  '&:not(:last-child)': { marginRight: 0 }
                }}
<<<<<<< HEAD
=======
                id="terms-button"
>>>>>>> origin/matheus
              >
                Termos de serviço
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer para o menu lateral em telas menores */}
      {isMobile && (
<<<<<<< HEAD
        <Drawer className="Drawer" anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
=======
        <Drawer className="Drawer" anchor="left" open={drawerOpen} onClose={toggleDrawer(false)} id="mobile-drawer">
>>>>>>> origin/matheus
          {drawerContent}
        </Drawer>
      )}
    </div>
  );
}

export default NavBar;
