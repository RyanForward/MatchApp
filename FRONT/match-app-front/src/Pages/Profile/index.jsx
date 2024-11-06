import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const response = await axios.get('/api/usuario_logado', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h1>Olá, {user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
};

export default UserProfile;