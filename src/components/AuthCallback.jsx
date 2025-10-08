import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import * as Sentry from '@sentry/react'

const AuthCallback = () => {
  const [status, setStatus] = useState('processing')
  const [error, setError] = useState(null)

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        console.log('🔄 Processing OAuth callback...')
        
        // Give Supabase's detectSessionInUrl a moment to process hash parameters
        await new Promise(resolve => setTimeout(resolve, 100))
        
        // Add Sentry breadcrumb for callback processing
        Sentry.addBreadcrumb({
          category: 'auth',
          message: 'OAuth callback processing started',
          data: {
            url: window.location.href,
            hash: window.location.hash,
            search: window.location.search,
          },
          level: 'info'
        })

        // Modern Supabase OAuth callback handling
        // Get the full URL with hash and search parameters
        const url = window.location.href
        const urlParams = new URLSearchParams(window.location.search)
        const code = urlParams.get('code')
        
        console.log('🔍 OAuth callback URL analysis:', {
          url,
          search: window.location.search,
          hash: window.location.hash,
          hasCode: !!code,
          code: code?.substring(0, 10) + '...' // Log first 10 chars only for security
        })
        
        let session = null
        let authError = null
        
        if (code) {
          console.log('🔑 Processing OAuth code exchange (PKCE flow)...')
          
          // Use exchangeCodeForSession for explicit code exchange
          const { data, error } = await supabase.auth.exchangeCodeForSession(code)
          
          if (error) {
            console.error('❌ Code exchange failed:', error)
            authError = error
          } else if (data?.session) {
            console.log('✅ Code exchange successful:', data.session.user.email)
            session = data.session
          } else {
            console.warn('⚠️ Code exchange completed but no session returned')
            authError = new Error('No session returned from code exchange')
          }
        } else if (window.location.hash) {
          console.log('🔍 Processing implicit flow tokens from URL hash...')
          console.log('Hash content:', window.location.hash)
          console.log('Full URL:', window.location.href)
          
          // Parse hash parameters manually to extract tokens
          const hashParams = new URLSearchParams(window.location.hash.substring(1))
          const accessToken = hashParams.get('access_token')
          const refreshToken = hashParams.get('refresh_token')
          const providerToken = hashParams.get('provider_token')
          const providerRefreshToken = hashParams.get('provider_refresh_token')
          const expiresIn = hashParams.get('expires_in')
          const tokenType = hashParams.get('token_type')
          
          // Also try alternative parsing in case URLSearchParams has issues
          const hashString = window.location.hash.substring(1)
          const hashPairs = hashString.split('&')
          const hashData = {}
          hashPairs.forEach(pair => {
            const [key, value] = pair.split('=')
            if (key && value) {
              hashData[key] = decodeURIComponent(value)
            }
          })
          
          console.log('Parsed hash tokens (URLSearchParams):', {
            hasAccessToken: !!accessToken,
            hasRefreshToken: !!refreshToken,
            hasProviderToken: !!providerToken,
            expiresIn,
            tokenType,
            accessTokenLength: accessToken?.length,
            refreshTokenLength: refreshToken?.length
          })
          
          console.log('Parsed hash tokens (manual parsing):', {
            hasAccessToken: !!hashData.access_token,
            hasRefreshToken: !!hashData.refresh_token,
            accessTokenLength: hashData.access_token?.length,
            refreshTokenLength: hashData.refresh_token?.length
          })
          
          // Use manual parsing as fallback if URLSearchParams fails
          const finalAccessToken = accessToken || hashData.access_token
          const finalRefreshToken = refreshToken || hashData.refresh_token
          
          console.log('Final tokens to use:', {
            hasAccessToken: !!finalAccessToken,
            hasRefreshToken: !!finalRefreshToken,
            accessTokenLength: finalAccessToken?.length,
            refreshTokenLength: finalRefreshToken?.length
          })
          
          if (finalAccessToken && finalRefreshToken) {
            console.log('🔄 Setting session from hash tokens...')
            
            // Set session using the tokens from hash
            const { data, error } = await supabase.auth.setSession({
              access_token: finalAccessToken,
              refresh_token: finalRefreshToken
            })
            
            if (error) {
              console.error('❌ Failed to set session from hash tokens:', error)
              authError = error
            } else if (data?.session) {
              console.log('✅ Session set successfully from hash tokens:', data.session.user.email)
              session = data.session
            } else {
              console.warn('⚠️ No session returned after setting tokens')
              authError = new Error('Failed to establish session from hash tokens')
            }
          } else {
            console.error('❌ Missing required tokens in hash')
            console.log('Available hash data:', hashData)
            console.log('URLSearchParams results:', {
              access_token: accessToken?.substring(0, 20) + '...',
              refresh_token: refreshToken
            })
            authError = new Error('Missing access_token or refresh_token in OAuth callback')
          }
        } else {
          // No code or hash, try to get existing session
          console.log('🔍 No code or hash found, checking for existing session...')
          const { data, error } = await supabase.auth.getSession()
          session = data?.session
          authError = error
        }
        
        if (authError) {
          console.error('❌ OAuth callback error:', authError)
          setError(authError.message)
          setStatus('error')
          
          // Log callback failure in Sentry
          Sentry.captureException(authError, {
            contexts: {
              oauth_callback: {
                url: window.location.href,
                error_message: authError.message,
                status: 'failed'
              }
            }
          })
          
          return
        }

        if (session) {
          console.log('✅ OAuth callback successful:', session.user.email)
          setStatus('success')
          
          // Log successful callback
          Sentry.addBreadcrumb({
            category: 'auth',
            message: 'OAuth callback successful',
            data: {
              user_id: session.user.id,
              provider: session.user.app_metadata?.provider,
            },
            level: 'info'
          })
          
          // Redirect to home page after a short delay
          setTimeout(() => {
            window.location.href = '/'
          }, 2000)
        } else {
          console.warn('⚠️ No session found in OAuth callback')
          setError('No authentication session found')
          setStatus('error')
        }
      } catch (err) {
        console.error('❌ OAuth callback processing error:', err)
        setError(err.message || 'An unexpected error occurred')
        setStatus('error')
        
        // Capture callback processing error
        Sentry.captureException(err, {
          contexts: {
            oauth_callback: {
              url: window.location.href,
              status: 'processing_error'
            }
          }
        })
      }
    }

    handleAuthCallback()
  }, [])

  const handleRetry = () => {
    window.location.href = '/'
  }

  if (status === 'processing') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Completing Sign In...
          </h2>
          <p className="text-gray-600">
            Please wait while we verify your authentication.
          </p>
        </div>
      </div>
    )
  }

  if (status === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Sign In Successful!
          </h2>
          <p className="text-gray-600 mb-4">
            Redirecting you to the application...
          </p>
          <div className="w-32 h-1 bg-gray-200 rounded-full mx-auto overflow-hidden">
            <div className="h-full bg-blue-600 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Sign In Failed
          </h2>
          <p className="text-gray-600 mb-4">
            {error || 'An unexpected error occurred during authentication.'}
          </p>
          <button
            onClick={handleRetry}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Return to Home
          </button>
        </div>
      </div>
    )
  }

  return null
}

export default AuthCallback