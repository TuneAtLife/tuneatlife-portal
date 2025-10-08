# Sentry Configuration - Security Guidelines

## Overview
This document outlines the secure configuration of Sentry authentication tokens for the TuneAtLife Portal.

## Security Setup ✅

### 1. **Local Development** 
- **Token stored in**: `.env.sentry` (git-ignored)
- **Usage**: Build-time source map uploads and release creation
- **Access**: Local development only

### 2. **CI/CD Pipeline** 
- **Token stored in**: GitHub repository secrets as `SENTRY_AUTH_TOKEN`
- **Usage**: Automated builds and deployments
- **Access**: GitHub Actions only

### 3. **Production Runtime**
- **Token**: NOT used at runtime (only DSN is used)
- **Usage**: Client-side error reporting via DSN
- **Access**: Public (DSN is safe to expose)

## File Structure

```
tuneatlife-portal/
├── .env.sentry          # Local Sentry token (git-ignored)
├── .env.local           # Local environment (git-ignored)
├── deploy.sh            # Secure deployment script
└── SENTRY_SETUP.md      # This documentation
```

## Environment Variables

### Build-time (Secure)
- `SENTRY_ORG_TOKEN` - Organization authentication token
- `SENTRY_AUTH_TOKEN` - Same token (used by Vite plugin)

### Runtime (Public)
- `VITE_SENTRY_DSN` - Data Source Name (safe to expose)
- `VITE_SENTRY_RELEASE` - Release version
- `VITE_ENVIRONMENT` - Environment name

## Usage

### Secure Deployment
```bash
./deploy.sh
```

This script:
1. ✅ Loads tokens from `.env.sentry`
2. ✅ Validates all required variables
3. ✅ Passes tokens securely to Docker build
4. ✅ Generates unique release versions

### Manual Deployment (Not Recommended)
```bash
flyctl deploy --app tuneatlife-beta-portal \
    --build-arg SENTRY_AUTH_TOKEN="$(grep SENTRY_ORG_TOKEN .env.sentry | cut -d'=' -f2)" \
    # ... other args
```

## Security Best Practices ✅

1. **Token Isolation**: Build token never exposed at runtime
2. **Git Security**: `.env.sentry` is git-ignored
3. **GitHub Secrets**: Token stored securely in repository secrets
4. **Minimal Scope**: Token only has necessary permissions
5. **Validation**: Deployment script validates all variables

## Troubleshooting

### Build Errors
- Ensure `.env.sentry` contains valid `SENTRY_ORG_TOKEN`
- Check that GitHub secret `SENTRY_AUTH_TOKEN` is set
- Verify token has correct Sentry organization permissions

### Runtime Errors
- Check `VITE_SENTRY_DSN` in Fly.io secrets
- Verify Sentry project configuration matches DSN
- Ensure release version is being set correctly

## Token Permissions
The Sentry token requires these permissions:
- `project:read`
- `project:write` 
- `project:releases`
- `org:read`

## Security Notes
- ⚠️ **Never commit** `.env.sentry` to version control
- ⚠️ **Never log** the token value in console/logs  
- ⚠️ **Rotate tokens** periodically for security
- ✅ **Runtime DSN** is safe to expose publicly