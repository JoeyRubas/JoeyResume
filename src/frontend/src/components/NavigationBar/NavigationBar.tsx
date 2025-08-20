import React from 'react';
import './styles.css';
import { useLocation, Link } from "@tanstack/react-router";
import { Paper, IconButton, Tooltip } from '@mui/material';
import { useAuth } from '../../hooks/useAuth';

const NavigationBar = () => {
    const location = useLocation();
    const { isAuthenticated, logout } = useAuth();

    const handleLogout = async () => {
        await logout();
    };

    return (
        <div className='nav-wrapper'>
            <nav className="navigation_container">
                <div className="nav-links">
                    <Link to="/" className={`link ${location.pathname === '/' ? 'active' : ''}`}>
                        Home
                    </Link>
                    <Link to="/skills" className={`link ${location.pathname === '/skills' ? 'active' : ''}`}>
                        Skills
                    </Link>
                    <Link to="/resume" className={`link ${location.pathname === '/resume' ? 'active' : ''}`}>
                        Resume
                    </Link>
                    <Link to="/portfolio" className={`link ${location.pathname === '/portfolio' ? 'active' : ''}`}>
                        Portfolio
                    </Link>
                    {isAuthenticated ? (
                        <Link to="/login" className={`link auth-link`} onClick={async (e) => { e.preventDefault(); await handleLogout(); }}>
                            Logout
                        </Link>
                    ) : (
                        <Link to="/login" className={`link auth-link ${location.pathname === '/login' ? 'active' : ''}`}>
                            Login
                        </Link>
                    )}
                    </div>
            </nav>
        </div>
    );
};

export default NavigationBar;
