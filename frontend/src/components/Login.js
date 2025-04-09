import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiUser, FiLock } from 'react-icons/fi';
import axios from 'axios';
import backendUrl from '../config';
import './CSS/Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${backendUrl}/login`, { username, password });
            localStorage.setItem('authToken', response.data.token);
            window.location.href = '/';
        } catch (err) {
            setError('Невірний логін або пароль');
        }
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleLogin}>
                <h2>Ласкаво просимо!</h2>

                <div className="input-group">
                    <FiUser className="input-icon" />
                    <input
                        type="text"
                        placeholder="Логін"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>

                <div className="input-group">
                    <FiLock className="input-icon" />
                    <input
                        type="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

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