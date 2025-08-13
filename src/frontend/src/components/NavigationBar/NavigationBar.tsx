import React from 'react';
import './styles.css';
import { useLocation, Link } from "@tanstack/react-router";
import { Paper } from '@mui/material';

const NavigationBar = () => {
    const location = useLocation();

    return (
        <Paper elevation={2} sx={{ borderRadius: '30px' }}>
            <nav className="navigation_container">
                <Link to="/" className={`link ${location.pathname === '/' ? 'active' : ''}`}>
                    Home
                </Link>
                <Link to="/skills" className={`link ${location.pathname === '/skills' ? 'active' : ''}`}>
                    Skills
                </Link>
                <Link to="/resume" className={`link ${location.pathname === '/resume' ? 'active' : ''}`}>
                    Resume
                </Link>
            </nav>
        </Paper>
    );
};

export default NavigationBar;
