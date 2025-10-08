import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import * as Sentry from '@sentry/react'
import App from './App.jsx'
import './index.css'
import './sentry.client.config.ts'

console.log('🚀 TuneAtLife Portal - Starting application...');
console.log('Environment Variables:', {
  VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
  VITE_SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY ? 'Present' : 'Missing',
  VITE_SENTRY_DSN: import.meta.env.VITE_SENTRY_DSN ? 'Present' : 'Missing',
  VITE_ENVIRONMENT: import.meta.env.VITE_ENVIRONMENT,
});

const root = createRoot(document.getElementById('root'))

root.render(
  <StrictMode>
    <Sentry.ErrorBoundary fallback={({ error, resetError }) => (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fee2e2',
        fontFamily: 'system-ui, sans-serif',
        padding: '20px'
      }}>
        <div style={{
          maxWidth: '600px',
          background: 'white',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          border: '2px solid #fecaca'
        }}>
          <h1 style={{ color: '#dc2626', fontSize: '1.5rem', marginBottom: '1rem' }}>
            🚨 Application Error
          </h1>
          <p style={{ marginBottom: '1rem' }}>
            Something went wrong with the application.
          </p>
          <details style={{ marginBottom: '1rem' }}>
            <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>Error Details</summary>
            <pre style={{
              background: '#f3f4f6',
              padding: '1rem',
              borderRadius: '4px',
              fontSize: '0.875rem',
              overflow: 'auto',
              marginTop: '0.5rem'
            }}>
              {error.toString()}
            </pre>
          </details>
          <button 
            onClick={resetError}
            style={{
              background: '#dc2626',
              color: 'white',
              padding: '0.5rem 1rem',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginRight: '0.5rem'
            }}
          >
            Try Again
          </button>
          <button 
            onClick={() => window.location.reload()}
            style={{
              background: '#6b7280',
              color: 'white',
              padding: '0.5rem 1rem',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Reload Page
          </button>
        </div>
      </div>
    )} showDialog>
      <App />
    </Sentry.ErrorBoundary>
  </StrictMode>
)
