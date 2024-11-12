import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('Token not found');
                    throw new Error('Token not found');
                }
                const response = await axios.get('/api/usuario_logado', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUser(response.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    if (loading) return <div id="loading-message">Carregando...</div>;

    if (!user) return <div id="user-not-found-message">Usuário não encontrado</div>;

    return (
        <div id="user-profile">
            <h1 id="user-greeting">Olá, {user.user_nome}</h1>
        </div>
    );
};

export default UserProfile;
