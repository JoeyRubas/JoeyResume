import React from 'react';
import './styles.css';
import { Typography, Paper, Avatar, Box, Stack } from "@mui/material";

const Home = () => {
    return (
        <Box className="container">
            <Paper elevation={2} className="content-card">
                <Box className="profile-image-mobile">
                    <Box className="profile-image-container-mobile">
                        <Avatar
                            src="/college-graduate.png"
                            sx={{ width: 160, height: 160, mb: 2 }}
                            variant="rounded"
                            className="profile-image-mobile-avatar"
                        />
                    </Box>
                </Box>
                
                <Box className="content-grid">
                    <Box className="left-content">
                        <Stack direction="row" spacing={2} alignItems="center" className="header">
                            <Avatar
                                src="/carmax2.jpg"
                                sx={{ width: 80, height: 80 }}
                                className="logo-avatar"
                            />
                            <Typography variant="h3" component="h1" fontWeight={700} color="primary.main">
                                Joey Rubas
                            </Typography>
                        </Stack>
                        
                        <Typography 
                            variant="h5" 
                            component="h2"
                            color="primary"
                            sx={{ 
                                fontWeight: 500,
                                my: 2,
                                fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' }
                            }}
                        >
                            Software Engineer I - CarMax
                        </Typography>
                        
                        <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6, mb: 3 }}>
                            I'm a full stack developer passionate about building reliable, scalable websites for users. 
                            I graduated from UVA with a double major in Computer Science and Math this past Spring, and 
                            am now working as a software engineering intern at CarMax! Check out my resume to learn more!                     
                        </Typography>
                        
                        <Stack direction="row" spacing={2} className="social-links">
                            {[
                                { src: "/twitter.png", alt: "Twitter", href: "https://x.com" },
                                { src: "/facebook.png", alt: "Facebook", href: "https://facebook.com" },
                                { src: "/linkedin.png", alt: "LinkedIn", href: "https://linkedin.com" }
                            ].map((social, index) => (
                                <a key={index} href={social.href} target="_blank" rel="noopener noreferrer">
                                    <Box 
                                        component="img" 
                                        src={social.src} 
                                        alt={social.alt}
                                        className="social-icon"
                                        sx={{ width: 40, height: 40 }}
                                    />
                                </a>
                            ))}
                        </Stack>
                    </Box>
                    
                    <Box className="right-content">
                        <Box className="profile-image-container">
                            <Avatar
                                src="/college-graduate.png"
                                variant="rounded"
                                sx={{ width: 350, height: 350 }}
                                className="profile-image"
                            />
                        </Box>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
};

export default Home;
