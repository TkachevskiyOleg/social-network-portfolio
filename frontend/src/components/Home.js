import React from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import './CSS/Home.css';

const Home = () => {
    return (
        <div className="home-container">
            <h1>Головна сторінка</h1>
            <nav>
                <Link to="/profile">Профіль</Link>
            </nav>
            <LogoutButton />
        </div>
    );
};

export default Home;