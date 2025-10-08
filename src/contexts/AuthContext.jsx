import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase, createCustomOAuthClient, customAuthDomain } from '../lib/supabase'
import * as Sentry from '@sentry/react'

// Authentication Context
const AuthContext = createContext({
  isAuthenticated: false,
  user: null,
  session: null,
  login: () => {},
  loginWithGoogle: () => {},
  logout: () => {},
  loading: true,
})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Authentication Provider
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  const loginWithGoogle = async () => {
    const startTime = Date.now()
    
    try {
      console.log('🚀 ===================================')
      console.log('🚀 GOOGLE OAUTH LOGIN INITIATED')
      console.log('🚀 ===================================')
      
      // Get current URL for redirect - handle both development and production
      const currentUrl = window.location.origin
      const redirectTo = `${currentUrl}/auth/callback`
      
      console.log('🌐 Environment Details:')
      console.log('   Origin:', currentUrl)
      console.log('   Redirect URL:', redirectTo)
      console.log('   Hostname:', window.location.hostname)
      console.log('   Protocol:', window.location.protocol)
      console.log('   Custom Auth Domain:', customAuthDomain)
      
      // Add Sentry breadcrumb for OAuth attempt
      Sentry.addBreadcrumb({
        category: 'auth',
        message: 'OAuth login initiated',
        data: {
          provider: 'google',
          custom_domain: customAuthDomain,
          redirect_to: redirectTo
        },
        level: 'info'
      })
      
      console.log('🔗 Generating OAuth URL...')
      
      // Use OAuth client with custom domain
      const oauthClient = createCustomOAuthClient()
      const { data, error } = await oauthClient.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectTo,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent'
          }
        }
      })
      
      if (error) {
        console.error('❌ OAuth URL generation failed:')
        console.error('   Error:', error.message)
        console.error('   Code:', error.code)
        console.error('   Details:', error)
        
        const duration = Date.now() - startTime
        
        // Capture OAuth error in Sentry with context
        Sentry.captureException(error, {
          contexts: {
            oauth: {
              provider: 'google',
              duration_ms: duration,
              custom_domain: customAuthDomain,
              redirect_to: redirectTo,
              flow: 'oauth_initiation_failed'
            }
          }
        })
        
        return {
          success: false,
          error: `OAuth setup failed: ${error.message}`
        }
      }
      
      if (data?.url) {
        console.log('✅ OAuth URL generated successfully!')
        console.log('   URL length:', data.url.length)
        console.log('   URL preview:', data.url.substring(0, 100) + '...')
        
        console.log('🌐 Redirecting to Google OAuth...')
        console.log('⏳ User will be redirected back to:', redirectTo)
        
        // Redirect to OAuth URL (this will navigate away from the current page)
        window.location.href = data.url
        
        return { success: true }
      }
      
      console.error('❌ No OAuth URL was generated')
      console.error('   Data returned:', data)
      
      return {
        success: false,
        error: 'OAuth URL generation failed. Please try again.'
      }
      
    } catch (error) {
      console.error('Google authentication error:', error)
      
      const duration = Date.now() - startTime
      const errorMessage = error?.message || 'Unknown error'
      
      // Log OAuth failure metrics
      console.error('📉 OAuth Failure Metrics:', {
        provider: 'google',
        duration_ms: duration,
        error: errorMessage,
        timestamp: new Date().toISOString(),
        custom_domain: customAuthDomain
      })
      
      // Add Sentry breadcrumb for OAuth failure
      Sentry.addBreadcrumb({
        category: 'auth',
        message: 'OAuth login failed',
        data: {
          provider: 'google',
          error: errorMessage,
          duration_ms: duration,
          custom_domain: customAuthDomain
        },
        level: 'error'
      })
      
      // Capture OAuth error in Sentry with context
      Sentry.captureException(error, {
        contexts: {
          oauth: {
            provider: 'google',
            duration_ms: duration,
            custom_domain: customAuthDomain,
            flow: 'supabase_custom_domain'
          }
        }
      })
      
      return { 
        success: false, 
        error: 'Network error. Please check your connection and try again.' 
      }
    }
  }

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error('Supabase logout error:', error)
        Sentry.captureException(error)
      }
      
      setIsAuthenticated(false)
      setUser(null)
      setSession(null)
      
      // Clear Sentry user context
      Sentry.setUser(null)
      
      console.log('✅ Successfully logged out')
    } catch (error) {
      console.error('Logout error:', error)
      Sentry.captureException(error)
    }
  }

  const checkAuthStatus = async () => {
    try {
      setLoading(true)
      
      // Check for existing Supabase session
      const { data: { session }, error } = await supabase.auth.getSession()
      
      if (error) {
        console.error('Session check error:', error)
        Sentry.captureException(error)
        return
      }

      if (session) {
        console.log('✅ Existing session found:', session.user.email)
        setSession(session)
        setUser(session.user)
        setIsAuthenticated(true)
        
        // Update Sentry user context
        Sentry.setUser({
          id: session.user.id,
          email: session.user.email,
          username: session.user.user_metadata?.full_name,
        })
      } else {
        console.log('ℹ️ No existing session found')
      }
    } catch (error) {
      console.error('Auth check error:', error)
      Sentry.captureException(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    checkAuthStatus()

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('🔔 Auth state changed:', event, {
          hasSession: !!session,
          userEmail: session?.user?.email,
          userId: session?.user?.id,
        })
        
        if (session) {
          console.log('✅ Setting authenticated state - user logged in')
          setSession(session)
          setUser(session.user)
          setIsAuthenticated(true)
          
          // Update Sentry user context
          Sentry.setUser({
            id: session.user.id,
            email: session.user.email,
            username: session.user.user_metadata?.full_name,
          })
          
          // Add breadcrumb for successful authentication
          Sentry.addBreadcrumb({
            category: 'auth',
            message: 'User authenticated',
            data: {
              user_id: session.user.id,
              provider: session.user.app_metadata?.provider,
            },
            level: 'info'
          })
          
          console.log('✅ Auth state updated: isAuthenticated = true')
        } else {
          console.log('❌ Clearing authenticated state - user logged out')
          setSession(null)
          setUser(null)
          setIsAuthenticated(false)
          
          // Reset Sentry user context on logout
          Sentry.setUser(null)
          
          // Add breadcrumb for logout
          Sentry.addBreadcrumb({
            category: 'auth',
            message: 'User logged out',
            level: 'info'
          })
          
          console.log('❌ Auth state updated: isAuthenticated = false')
        }
        
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      user, 
      session, 
      login: () => {}, // Placeholder for other login methods
      loginWithGoogle, 
      logout, 
      loading 
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider