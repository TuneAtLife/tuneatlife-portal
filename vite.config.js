import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { sentryVitePlugin } from '@sentry/vite-plugin'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // Sentry plugin for source maps and release tracking
    sentryVitePlugin({
      org: process.env.SENTRY_ORG || "tuneatlife",
      project: process.env.SENTRY_PROJECT || "tuneatlife-portal",
      authToken: process.env.SENTRY_AUTH_TOKEN,
      // Only upload source maps in production builds
      disable: process.env.NODE_ENV !== "production",
      // Upload source maps for better error tracking
      sourcemaps: {
        assets: ["./dist/**"],
        ignore: ["node_modules/**"],
      },
      // Set release name based on environment variables
      release: {
        name: process.env.VITE_SENTRY_RELEASE || `tuneatlife-portal@${process.env.npm_package_version || "unknown"}`,
        finalize: true,
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Generate source maps for Sentry
    sourcemap: true,
  },
})
