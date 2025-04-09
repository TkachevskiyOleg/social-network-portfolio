import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiUser, FiLock, FiEye, FiEyeOff, FiSmile } from 'react-icons/fi';
import axios from 'axios';
import backendUrl from '../config';
import './CSS/Register.css';

const Register = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [passwordsMatch, setPasswordsMatch] = useState(false);

    useEffect(() => {
        setPasswordsMatch(password === confirmPassword && password !== '');
    }, [password, confirmPassword]);

    const handleRegister = async (event) => {
        event.preventDefault();
        if (!passwordsMatch) {
            setError('Паролі не збігаються');
            return;
        }
        try {
            const response = await axios.post(`${backendUrl}/register`, {
                name,
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
                    <FiSmile className="input-icon" />
                    <input
                        type="text"
                        placeholder="Ім'я"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

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
                        className={passwordsMatch ? 'input-success' : password ? 'input-error' : ''}
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

                <div className="input-group">
                    <FiLock className="input-icon" />
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Повторіть пароль"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={passwordsMatch ? 'input-success' : confirmPassword ? 'input-error' : ''}
                        required
                    />
                </div>

                {error && <p className="error-message">{error}</p>}

                <button
                    type="submit"
                    className="auth-button"
                    disabled={!passwordsMatch}
                >
                    Зареєструватися
                </button>

                <div className="switch-link">
                    Вже є акаунт? <Link to="/login" className="link">Увійти</Link>
                </div>
            </form>
        </div>
    );
};

export default Register;