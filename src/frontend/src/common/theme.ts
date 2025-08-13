import { createTheme } from "@mui/material/styles";

// Create a minimal theme focused on color palette and typography
const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#2563eb',
        },
        secondary: {
            main: '#64748b',
        },
        background: {
            default: '#f8fafc',
            paper: '#ffffff',
        },
        text: {
            primary: '#1e293b',
            secondary: '#64748b',
        },
    },
    typography: {
        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
        h1: {
            fontWeight: 700,
            letterSpacing: '-0.025em',
        },
        h2: {
            fontWeight: 600,
        },
        subtitle1: {
            fontWeight: 400,
            fontSize: '1.1rem',
            lineHeight: 1.6,
            color: '#64748b',
        },
    },
    shape: {
        borderRadius: 8,
    },
});

export default theme;
