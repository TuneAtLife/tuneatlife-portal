import * as Sentry from "@sentry/react";

// Initialize Sentry for the TuneAtLife Beta Portal
Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  
  // Set environment based on deployment
  environment: import.meta.env.VITE_ENVIRONMENT || "production",
  
  // Performance Monitoring
  tracesSampleRate: import.meta.env.VITE_ENVIRONMENT === "development" ? 1.0 : 0.1,
  
  // Capture unhandled promise rejections
  captureUnhandledRejections: true,
  
  // Session Replay - helpful for debugging user issues
  replaysSessionSampleRate: 0.1, // 10% of sessions will be recorded
  replaysOnErrorSampleRate: 1.0, // 100% of sessions with errors will be recorded
  
  integrations: [
    Sentry.replayIntegration({
      // Mask all text content, images, and user inputs for privacy
      maskAllText: true,
      blockAllMedia: true,
      maskAllInputs: true,
    }),
    Sentry.browserTracingIntegration(),
  ],

  // Release tracking - will be set by CI/CD pipeline
  release: import.meta.env.VITE_SENTRY_RELEASE,
  
  // User context will be set dynamically when users log in
  beforeSend(event, hint) {
    // Filter out development errors in production
    if (import.meta.env.VITE_ENVIRONMENT === "development") {
      return event;
    }
    
    // Skip reporting localhost errors
    if (event.request?.url?.includes("localhost")) {
      return null;
    }
    
    return event;
  },
  
  // Additional integrations can be added here
  // Note: React Router instrumentation will be added when routing is implemented
});

export default Sentry;