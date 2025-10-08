# OAuth Troubleshooting Guide

## Common OAuth Issues and Solutions

### "Invalid API key" Error ✅ RESOLVED

**Symptoms:**
- OAuth login fails with "Invalid API key" error
- Error occurs during `supabase.auth.setSession()` in auth callback
- Google OAuth redirect works but session creation fails

**Root Cause:**
- Using deprecated legacy Supabase anon key format (starts with `eyJ...`)
- Supabase now requires new publishable key format (starts with `sb_publishable_`)

**Solution:**
1. Get new publishable key from Supabase dashboard or CLI:
   ```bash
   supabase projects api-keys --project-ref YOUR_PROJECT_REF --output json
   ```

2. Update environment variables:
   - Local: `.env.local` → `VITE_SUPABASE_ANON_KEY=sb_publishable_...`
   - Production: `fly.toml` build args → `VITE_SUPABASE_ANON_KEY = "sb_publishable_..."`
   - Fly.io secrets: `fly secrets set VITE_SUPABASE_ANON_KEY="sb_publishable_..."`

3. Deploy with fresh build:
   ```bash
   fly deploy --no-cache --app tuneatlife-beta-portal
   ```

4. Verify key is embedded in production bundle:
   ```bash
   curl -s "https://beta.tuneatlife.com/assets/index-*.js" | grep -o 'sb_publishable_[a-zA-Z0-9_]*'
   ```

### OAuth Configuration Checklist

**Google Cloud Console:**
- ✅ OAuth client ID configured
- ✅ Redirect URIs match exactly:
  - `https://auth.tuneatlife.com/auth/v1/callback`
  - `https://beta.tuneatlife.com/auth/callback`
- ✅ Client secret set in Supabase Auth settings

**Supabase Configuration:**
- ✅ Google OAuth provider enabled
- ✅ Custom auth domain configured: `auth.tuneatlife.com`
- ✅ Site URL set to production domain
- ✅ Publishable key (not legacy anon key) in use

**Frontend Implementation:**
- ✅ Supabase client initialized with correct URL and key
- ✅ Auth context properly handles OAuth flow
- ✅ Callback route handles auth hash parameters
- ✅ Error handling for auth failures

### Debugging Commands

```bash
# Check current environment variables
fly secrets list --app tuneatlife-beta-portal

# Test Supabase OAuth endpoint
curl -s "https://auth.tuneatlife.com/auth/v1/authorize?provider=google"

# Verify key format in deployed bundle
curl -s "https://beta.tuneatlife.com/" | grep -o 'index-[a-zA-Z0-9]*\.js'
curl -s "https://beta.tuneatlife.com/assets/[BUNDLE_NAME]" | grep -o 'sb_[a-zA-Z0-9_]*'

# Check deployment status
fly status --app tuneatlife-beta-portal
```

### Key Migration Notes

- **Legacy Format**: `eyJ...` (JWT-like format, deprecated)
- **New Format**: `sb_publishable_...` (publishable key format, required)
- **Migration Required**: Yes, for all OAuth functionality
- **Backward Compatibility**: No, legacy keys will fail OAuth

---
**Last Updated:** 2025-10-08  
**Status:** OAuth fully functional with publishable key