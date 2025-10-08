#!/bin/bash
set -e

echo "🚀 Deploying tuneatlife-beta-portal with secure Sentry configuration..."

# Source environment files
if [ -f .env.sentry ]; then
    echo "📦 Loading Sentry configuration..."
    source .env.sentry
else
    echo "⚠️ Warning: .env.sentry file not found"
fi

if [ -f .env.local ]; then
    echo "📦 Loading local environment variables..."
    source .env.local
else
    echo "⚠️ Warning: .env.local file not found"
fi

# Validate required variables
if [ -z "$SENTRY_ORG_TOKEN" ]; then
    echo "❌ Error: SENTRY_ORG_TOKEN not found in .env.sentry"
    exit 1
fi

if [ -z "$VITE_SUPABASE_URL" ]; then
    echo "❌ Error: VITE_SUPABASE_URL not found in .env.local"
    exit 1
fi

if [ -z "$VITE_SUPABASE_ANON_KEY" ]; then
    echo "❌ Error: VITE_SUPABASE_ANON_KEY not found in .env.local"
    exit 1
fi

if [ -z "$VITE_SENTRY_DSN" ]; then
    echo "❌ Error: VITE_SENTRY_DSN not found in .env.local"
    exit 1
fi

echo "✅ All required environment variables found"

# Generate release version
RELEASE_VERSION="$(date +%Y%m%d-%H%M%S)"
echo "📝 Release version: $RELEASE_VERSION"

echo "🏗️ Deploying with secure configuration..."

flyctl deploy --app tuneatlife-beta-portal \
    --build-arg VITE_SUPABASE_URL="$VITE_SUPABASE_URL" \
    --build-arg VITE_SUPABASE_ANON_KEY="$VITE_SUPABASE_ANON_KEY" \
    --build-arg VITE_SENTRY_DSN="$VITE_SENTRY_DSN" \
    --build-arg VITE_ENVIRONMENT="production" \
    --build-arg VITE_SENTRY_RELEASE="$RELEASE_VERSION" \
    --build-arg SENTRY_AUTH_TOKEN="$SENTRY_ORG_TOKEN"

echo "✅ Deployment complete!"
echo "🔗 Visit: https://beta.tuneatlife.com/"