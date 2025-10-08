import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Button } from '@/components/ui/button.jsx'
import { LogOut, User } from 'lucide-react'

const LoginButton = ({ size = "lg", className = "" }) => {
  const { isAuthenticated, user, loginWithGoogle, logout, loading } = useAuth()
  const [isLoggingIn, setIsLoggingIn] = useState(false)

  const handleLogin = async () => {
    setIsLoggingIn(true)
    try {
      const result = await loginWithGoogle()
      if (!result.success) {
        console.error('Login failed:', result.error)
        // Could show toast notification here
      }
    } catch (error) {
      console.error('Login error:', error)
    } finally {
      setIsLoggingIn(false)
    }
  }

  const handleLogout = async () => {
    await logout()
  }

  if (loading) {
    return (
      <Button size={size} disabled className={className}>
        <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin mr-2"></div>
        Loading...
      </Button>
    )
  }

  if (isAuthenticated && user) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <User className="w-4 h-4" />
          <span className="hidden sm:inline">
            {user.user_metadata?.full_name || user.email}
          </span>
        </div>
        <Button 
          size={size} 
          variant="outline" 
          onClick={handleLogout}
          className={className}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </div>
    )
  }

  return (
    <Button 
      size={size} 
      onClick={handleLogin}
      disabled={isLoggingIn}
      className={`bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg ${isLoggingIn ? 'animate-pulse' : ''} ${className}`}
    >
      {isLoggingIn ? (
        <>
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
          Signing In...
        </>
      ) : (
        'Sign In with Google'
      )}
    </Button>
  )
}

export default LoginButton