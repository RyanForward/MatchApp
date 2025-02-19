import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button, List, ListItem, ListItemText, ListItemAvatar, IconButton, Box, Avatar, Grid2, Badge } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Send } from '@mui/icons-material';
import axios from 'axios';
import Navbar from '../Navbar'; // Importando o componente Navbar

const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: "#44b700",
      color: "#44b700",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      }
  }));
  const conversations = ["Amigo1", "Amigo2", "Amigo3"];

const Amigos = () => {
    const [search, setSearch] = useState('');
    const [friends, setFriends] = useState([]);
    const [messages, setMessages] = useState({});
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        // Fetch friends from the backend
        axios.get('/api/amizade')
            .then(response => setFriends(response.data))
            .catch(error => console.error('Error fetching friends:', error));
    }, []);

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    const handleAddFriend = () => {
        axios.post('/api/amizade', { username: search })
            .then(response => {
                setFriends([...friends, response.data]);
                setSearch('');
            })
            .catch(error => console.error('Error adding friend:', error));
    };

    const handleSendMessage = (friendId) => {
        axios.post('/api/chat', { friendId, message: newMessage })
            .then(response => {
                setMessages({
                    ...messages,
                    [friendId]: [...(messages[friendId] || []), response.data]
                });
                setNewMessage('');
            })
            .catch(error => console.error('Error sending message:', error));
    };

    return (
        <div>
            <nav id="navbar">
                <Navbar id="navbar-component" />
            </nav>
            <div style={{ padding: 20, marginTop: '64px' }}>
                <TextField
                    label="Buscar usuário"
                    value={search}
                    onChange={handleSearchChange}
                    variant="outlined"
                    fullWidth
                />
                <Button variant="contained" color="primary" onClick={handleAddFriend} style={{ marginTop: 10 }}>
                    Adicionar Amigo
                </Button>
                <List>
                    {friends
                        .filter(friend => friend.username.toLowerCase().includes(search.toLowerCase()))
                        .map(friend => (
                            <ListItem key={friend.id}>
                                <ListItemText primary={friend.username} />
                                <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                    <TextField
                                        label="Mensagem"
                                        value={messages[friend.id] || ''}
                                        onChange={(e) => setMessages({ ...messages, [friend.id]: e.target.value })}
                                        variant="outlined"
                                        fullWidth
                                    />
                                    <IconButton color="primary" onClick={() => handleSendMessage(friend.id)}>
                                        <Send />
                                    </IconButton>
                                </div>
                                <List>
                                    {(messages[friend.id] || []).map((msg, index) => (
                                        <ListItem key={index}>
                                            <ListItemText primary={msg} />
                                        </ListItem>
                                    ))}
                                </List>
                            </ListItem>
                        ))}
                </List>
                <Box sx={{ width: 300, padding: 2, borderRadius: 4, backgroundColor: "#fff" }}>
      {/* Lista de Amigos */}
      <Typography variant="h6" sx={{ fontWeight: "bold", textAlign: "center", mb: 2 }}>
      <Grid2 container spacing={2} justifyContent="center" />
      </Typography>
      <Grid2 container spacing={2} justifyContent="center">
        {friends.map((friend, index) => (
          <Grid2 item key={index}>
            {friend.username}
          </Grid2>
        ))}
      </Grid2>
      
      {/* Lista de Conversas */}
      <Typography variant="h6" sx={{ fontWeight: "bold", textAlign: "center", mt: 3, mb: 1 }}>
        Conversas
      </Typography>
      <List>
        {conversations.map((friend, index) => (
          <ListItem key={index} button>
            <ListItemAvatar>
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
              >
                <Avatar sx={{ bgcolor: "#333" }} />
              </StyledBadge>
            </ListItemAvatar>
            <ListItemText primary={friend} secondary="Última mensagem..." sx={{ color: "gray" }} />
          </ListItem>
        ))}
      </List>
    </Box>
            </div>
        </div>
    );
};

export default Amigos;