import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiUser, FiLock } from 'react-icons/fi';
import axios from 'axios';
import backendUrl from '../config'; // Виправлено шлях
import './CSS/Register.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleRegister = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${backendUrl}/register`, {
                username,
                password
            });
            localStorage.setItem('authToken', response.data.token);
            window.location.href = '/';
        } catch (error) {
            setError('Помилка реєстрації: перевірте дані');
        }
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleRegister}>
                <h2>Створити акаунт</h2>

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

                <button type="submit" className="auth-button">Зареєструватися</button>

                <div className="switch-link">
                    Вже є акаунт? <Link to="/login" className="link">Увійти</Link>
                </div>
            </form>
        </div>
    );
};

export default Register;