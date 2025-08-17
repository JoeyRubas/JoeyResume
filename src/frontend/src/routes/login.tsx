import { createFileRoute, useNavigate } from '@tanstack/react-router'
import LoginPage from '../components/LoginPage'
import { useAuth } from '../hooks/useAuth'
import { useEffect } from 'react'

export const Route = createFileRoute('/login')({
  component: LoginComponent,
})

function LoginComponent() {
  const { isAuthenticated, login } = useAuth()
  const navigate = useNavigate()

  const handleLoginSuccess = async () => {
    console.log('Login successful, auth state should update automatically')
    // Don't navigate here - let the useEffect handle it when isAuthenticated changes
  }

  // If already authenticated, redirect to skills
  useEffect(() => {
    console.log('Auth state changed:', isAuthenticated)
    if (isAuthenticated) {
      console.log('Navigating to skills page...')
      navigate({ to: '/skills' })
    }
  }, [isAuthenticated, navigate])

  if (isAuthenticated) {
    return null // Will redirect via useEffect
  }

  return <LoginPage onLoginSuccess={handleLoginSuccess} loginMethod={login} />
}
