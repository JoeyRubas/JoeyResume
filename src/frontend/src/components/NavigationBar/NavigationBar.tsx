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
        <Paper elevation={2} sx={{ borderRadius: '30px' }}>
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
                </div>
                
                <div className="nav-auth">
                    {isAuthenticated ? (
                        <Tooltip title="Admin Mode - Click to logout">
                            <IconButton 
                                onClick={handleLogout}
                                size="small"
                                sx={{ 
                                    color: 'success.main',
                                    '&:hover': { 
                                        backgroundColor: 'success.light',
                                        color: 'white'
                                    }
                                }}
                            >
                                ✓👤
                            </IconButton>
                        </Tooltip>
                    ) : (
                        <Tooltip title="Admin Login">
                            <Link to="/login">
                                <IconButton 
                                    size="small"
                                    sx={{ 
                                        color: 'text.secondary',
                                        '&:hover': { 
                                            backgroundColor: 'primary.light',
                                            color: 'white'
                                        }
                                    }}
                                >
                                    🔒
                                </IconButton>
                            </Link>
                        </Tooltip>
                    )}
                </div>
            </nav>
        </Paper>
    );
};

export default NavigationBar;
