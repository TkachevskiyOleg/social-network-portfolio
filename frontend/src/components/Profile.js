import React, { useState, useEffect } from 'react';
import api from '../api';
import LogoutButton from './LogoutButton';
import './CSS/Profile.css';

const Profile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get('/auth/protected');
                setUser(response.data.user);
            } catch (error) {
                console.error('Помилка завантаження даних:', error);
            }
        };
        fetchUser();
    }, []);

    return (
        <div className="profile-container">
            {user && (
                <div className="profile-content">
                    <h2>Вітаємо, {user.name} {user.surname}</h2>
                    <p>Email: {user.email}</p>
                    <LogoutButton />
                </div>
            )}
        </div>
    );
};

export default Profile;