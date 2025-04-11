import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/login');
    };

    return (
        <button
            onClick={handleLogout}
            className="logout-button"
        >
            Вийти з акаунту
        </button>
    );
};

export default LogoutButton;