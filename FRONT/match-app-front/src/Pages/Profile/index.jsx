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

    if (loading) return <div>Loading...</div>;

    if (!user) return <div>Usuário não encontrado</div>;

    return (
        <div>
            <h1>Olá, {user.user_nome}</h1>
            <p>{user.user_email}</p>
        </div>
    );
};

export default UserProfile;