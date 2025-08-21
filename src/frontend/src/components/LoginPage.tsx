import React, { useState } from 'react';
import { 
  Box, 
  Paper, 
  TextField, 
  Button, 
  Typography, 
  Alert,
  Container,
  InputAdornment,
  IconButton
} from '@mui/material';
import authService from '../api/authService';

interface LoginPageProps {
  onLoginSuccess: () => void;
  loginMethod?: (password: string) => Promise<{ success: boolean; message?: string }>;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess, loginMethod }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;

    setLoading(true);
    setError('');

    try {
      const result = loginMethod 
        ? await loginMethod(password)
        : await authService.login(password);
      
      if (result.success) {
        onLoginSuccess();
      } else {
        setError(result.message || 'Login failed');
        setPassword(''); // Clear password on failed attempt
      }
    } catch (error) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            width: '100%', 
            maxWidth: 400,
            textAlign: 'center'
          }}
        >
          <Box sx={{ mb: 3 }}>
            <Typography variant="h1" sx={{ fontSize: 48, mb: 2 }}>
              Login
            </Typography>
            <Typography variant="h4" component="h1" gutterBottom>
              Admin Login
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Enter your password to access edit functionality
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              type={showPassword ? 'text' : 'password'}
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              variant="outlined"
              sx={{ mb: 3 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      disabled={loading}
                    >
                      {showPassword ? '🙈' : '👁️'}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading || !password.trim()}
              sx={{ py: 1.5 }}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </Box>

        </Paper>
      </Box>
    </Container>
  );
};

export default LoginPage;
