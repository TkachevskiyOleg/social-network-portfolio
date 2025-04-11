import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import Home from './components/Home';
//import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

function App() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route element={<PrivateRoute />}>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
            </Route>

            {/* Додати обробку неіснуючих шляхів */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}

export default App;