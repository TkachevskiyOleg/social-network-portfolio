import { useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import api from '../api';

const PrivateRoute = () => {
    const [isValid, setIsValid] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifyToken = async () => {
            try {
                await api.get('/auth/protected');
                setIsValid(true);
            } catch (error) {
                localStorage.removeItem('authToken');
            } finally {
                setLoading(false);
            }
        };
        verifyToken();
    }, []);

    if (loading) return <div className="loading-spinner">Loading...</div>;
    return isValid ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;