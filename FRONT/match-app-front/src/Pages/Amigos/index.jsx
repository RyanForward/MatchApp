import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, TextField, Button, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { Send } from '@mui/icons-material';
import axios from 'axios';
import Navbar from '../Navbar'; // Importando o componente Navbar

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
            <div style={{ padding: 20, marginTop: '64px' }}> {/* Adjusted marginTop to avoid content being hidden behind the Navbar */}
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
                    {friends.map(friend => (
                        <ListItem key={friend.id}>
                            <ListItemText primary={friend.username} />
                            <TextField
                                label="Mensagem"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                variant="outlined"
                                fullWidth
                            />
                            <IconButton color="primary" onClick={() => handleSendMessage(friend.id)}>
                                <Send />
                            </IconButton>
                        </ListItem>
                    ))}
                </List>
            </div>
        </div>
    );
};

export default Amigos;