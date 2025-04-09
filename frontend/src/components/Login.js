import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import backendUrl from '../config';
import './CSS/Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${backendUrl}/login`, { username, password });
            localStorage.setItem('authToken', response.data.token);
            window.location.href = '/';
        } catch (error) {
            setError('Невірний логін або пароль');
        }
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleLogin}>
                <h2>Ласкаво просимо!</h2>
                <input
                    type="text"
                    placeholder="Ваш логін"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {error && <p className="error-message">{error}</p>}
                <button type="submit" className="auth-button">Увійти</button>
                <div className="switch-link">
                    Немає акаунта? <Link to="/register" className="link">Створити</Link>
                </div>
            </form>
        </div>
    );
};

export default Login;