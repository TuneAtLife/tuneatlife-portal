/**
 * Standardized Sentry Configuration for TuneAtLife Portal
 * Single Source of Truth (SSoT) Implementation
 * 
 * Based on the comprehensive pattern established in tuneatlife-mobile
 */

import * as Sentry from '@sentry/react';

/**
 * Sentry Configuration for TuneAtLife Portal
 */
interface SentryConfig {
  appName: string;
  appVersion: string;
  buildNumber?: string;
  environment: string;
}

/**
 * Initialize Sentry for comprehensive error tracking and performance monitoring
 */
const initSentry = (config: SentryConfig) => {
  const dsn = import.meta.env.VITE_SENTRY_DSN;
  
  if (!dsn) {
    console.warn('Sentry DSN not found in environment variables');
    if (config.environment === 'development') {
      console.log('Sentry initialization skipped in development without DSN');
      return;
    }
  }

  Sentry.init({
    dsn,
    debug: config.environment === 'development',
    environment: config.environment,
    
    // Release tracking
    release: import.meta.env.VITE_SENTRY_RELEASE || `${config.appName}@${config.appVersion}${config.buildNumber ? `-${config.buildNumber}` : ''}`,
    
    // Session tracking
    enableAutoSessionTracking: true,
    sessionTrackingIntervalMillis: 30000, // 30 seconds
    
    // Performance monitoring
    tracesSampleRate: config.environment === 'development' ? 1.0 : 0.1, // 100% in dev, 10% in production
    
    // Session Replay for debugging user issues
    replaysSessionSampleRate: 0.1, // 10% of sessions
    replaysOnErrorSampleRate: 1.0, // 100% of sessions with errors
    
    // Capture unhandled promise rejections
    captureUnhandledRejections: true,
    
    // Breadcrumbs
    maxBreadcrumbs: 100, // Keep more breadcrumbs for better debugging
    
    // Integrations
    integrations: [
      Sentry.replayIntegration({
        // Privacy-focused replay configuration
        maskAllText: config.environment === 'production',
        blockAllMedia: true,
        maskAllInputs: true,
      }),
      Sentry.browserTracingIntegration(),
    ],
    
    // Error filtering and enhancement
    beforeSend: (event) => {
      // Filter out development warnings in production
      if (config.environment === 'development') {
        // In development, filter out React warnings
        if (event.exception?.values?.[0]?.value?.includes('Warning:')) {
          return null;
        }
        // Filter out common development-only errors
        if (event.exception?.values?.[0]?.value?.includes('React DevTools')) {
          return null;
        }
      }

      // Skip reporting localhost errors in production
      if (config.environment === 'production' && event.request?.url?.includes('localhost')) {
        return null;
      }

      // Add custom tags for better error categorization
      event.tags = {
        ...event.tags,
        app: config.appName,
        platform: 'web',
        frontend: 'react', // React with Vite
      };

      // Enhanced app context
      event.contexts = {
        ...event.contexts,
        app: {
          name: config.appName,
          version: config.appVersion,
          build: config.buildNumber || 'unknown',
          environment: config.environment,
        },
      };

      return event;
    },
  });

  // Set default user context on initialization
  Sentry.setUser({
    id: 'anonymous',
  });

  console.log(`Sentry initialized successfully for ${config.appName}`);
};

// Initialize Sentry for TuneAtLife Portal
initSentry({
  appName: 'tuneatlife-portal',
  appVersion: '1.0.0',
  buildNumber: import.meta.env.VITE_BUILD_NUMBER,
  environment: import.meta.env.VITE_ENVIRONMENT || 'production'
});

/**
 * Set user context for error tracking
 */
export const setSentryUser = (userId: string, email?: string, additionalData?: Record<string, any>) => {
  Sentry.setUser({
    id: userId,
    email,
    ...additionalData,
  });
};

/**
 * Add breadcrumb for user actions
 */
export const addSentryBreadcrumb = (message: string, category: string = 'user', data?: Record<string, any>) => {
  Sentry.addBreadcrumb({
    message,
    category,
    level: 'info',
    data,
    timestamp: Date.now() / 1000,
  });
};

/**
 * Set additional context for debugging
 */
export const setSentryContext = (key: string, context: Record<string, any>) => {
  Sentry.setContext(key, context);
};

/**
 * Capture an exception with context
 */
export const captureException = (error: Error, context?: Record<string, any>) => {
  return Sentry.withScope((scope) => {
    if (context) {
      scope.setContext('additional', context);
    }
    return Sentry.captureException(error);
  });
};

/**
 * Capture a message with optional level
 */
export const captureMessage = (message: string, level: Sentry.SeverityLevel = 'info', context?: Record<string, any>) => {
  return Sentry.withScope((scope) => {
    scope.setLevel(level);
    if (context) {
      scope.setContext('additional', context);
    }
    return Sentry.captureMessage(message);
  });
};

/**
 * Error Boundary Component for React applications
 */
export const SentryErrorBoundary = Sentry.ErrorBoundary;

export default Sentry;
