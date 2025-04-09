import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiUser, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import axios from 'axios';
import backendUrl from '../config';
import './CSS/Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${backendUrl}/login`, {
                username,
                password
            });
            localStorage.setItem('authToken', response.data.token);
            window.location.href = '/';
        } catch (err) {
            setError('Невірний логін або пароль');
        }
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleLogin}>
                <h2>Увійти в систему</h2>

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
                        type={showPassword ? "text" : "password"}
                        placeholder="Пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                </div>

                {error && <p className="error-message">{error}</p>}

                <button type="submit" className="auth-button">Продовжити</button>

                <div className="switch-link">
                    Немає акаунта? <Link to="/register" className="link">Зареєструватися</Link>
                </div>
            </form>
        </div>
    );
};

export default Login;