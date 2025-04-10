import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiLock, FiEye, FiEyeOff, FiMail } from 'react-icons/fi';
import api from '../api';
import './CSS/Register.css';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const { password, confirmPassword } = formData;
        const passwordValid = password.length >= 8 && /[A-Z]/.test(password) && /\d/.test(password);
        const passwordsMatch = password === confirmPassword;
        setIsValid(passwordValid && passwordsMatch);
    }, [formData]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isValid) return;

        try {
            const { data } = await api.post('/user/create_user', {
                name: formData.name,
                surname: formData.surname,
                email: formData.email,
                password: formData.password
            });
            localStorage.setItem('authToken', data.token);
            navigate('/profile');
        } catch (error) {
            setError(error.response?.data?.message || 'Registration failed. Please try again.');
        }
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleSubmit}>
                <h2>Create Account</h2>

                <div className="input-group">
                    <FiUser className="input-icon" />
                    <input
                        type="text"
                        name="name"
                        placeholder="First Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="input-group">
                    <FiUser className="input-icon" />
                    <input
                        type="text"
                        name="surname"
                        placeholder="Last Name"
                        value={formData.surname}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="input-group">
                    <FiMail className="input-icon" />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="input-group">
                    <FiLock className="input-icon" />
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className={
                            formData.password ?
                                (isValid ? 'input-success' : 'input-error') : ''
                        }
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

                <div className="password-rules">
                    <p style={{color: formData.password.length >=8 ? '#2D8CFF' : '#ff6b6b'}}>
                        ✓ At least 8 characters
                    </p>
                    <p style={{color: /[A-Z]/.test(formData.password) ? '#2D8CFF' : '#ff6b6b'}}>
                        ✓ At least one uppercase letter
                    </p>
                    <p style={{color: /\d/.test(formData.password) ? '#2D8CFF' : '#ff6b6b'}}>
                        ✓ At least one number
                    </p>
                </div>

                {error && <p className="error-message">{error}</p>}

                <button
                    type="submit"
                    className="auth-button"
                    disabled={!isValid}
                >
                    Sign Up
                </button>

                <div className="switch-link">
                    Already have an account? <Link to="/login" className="link">Sign In</Link>
                </div>
            </form>
        </div>
    );
};

export default Register;