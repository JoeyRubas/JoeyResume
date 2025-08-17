class AuthService {
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl = import.meta.env.VITE_API_URL || 'https://wapp-joeytest2321.azurewebsites.net';
  }

  async login(password: string): Promise<{ success: boolean; message?: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store auth status in localStorage for persistence across page reloads
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('authExpiry', data.expiresAt);
        return { success: true };
      } else {
        return { success: false, message: data.message || 'Login failed' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Network error' };
    }
  }

  async logout(): Promise<void> {
    try {
      await fetch(`${this.baseUrl}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('authExpiry');
    }
  }

  async verifyAuth(): Promise<boolean> {
    try {
      // Check localStorage first for quick response
      const isAuth = localStorage.getItem('isAuthenticated');
      const expiry = localStorage.getItem('authExpiry');
      
      if (!isAuth || !expiry || new Date() > new Date(expiry)) {
        this.clearAuth();
        return false;
      }

      // Verify with server
      const response = await fetch(`${this.baseUrl}/api/auth/verify`, {
        credentials: 'include',
      });

      if (response.ok) {
        return true;
      } else {
        this.clearAuth();
        return false;
      }
    } catch (error) {
      console.error('Auth verification error:', error);
      this.clearAuth();
      return false;
    }
  }

  isAuthenticated(): boolean {
    const isAuth = localStorage.getItem('isAuthenticated');
    const expiry = localStorage.getItem('authExpiry');
    
    if (!isAuth || !expiry) return false;
    
    if (new Date() > new Date(expiry)) {
      this.clearAuth();
      return false;
    }
    
    return true;
  }

  private clearAuth(): void {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('authExpiry');
  }
}

const authService = new AuthService();
export default authService;
