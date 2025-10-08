# OAuth Authentication Issue Diagnostic Guide

## The Issue
You're experiencing: `"Authentication failed: Invalid API key. Refresh attempt also failed: Invalid API key"`

## Likely Causes

### 1. **Token Expiration** (Most Likely)
OAuth access tokens typically expire in 1 hour. If the callback URL sits in your browser too long, tokens expire.

**Solution**: Try the OAuth flow again with a fresh login.

### 2. **URL Corruption**
Very long URLs can sometimes get truncated or corrupted.

**Solution**: Check if the full callback URL is intact - no missing characters.

### 3. **Project Mismatch**
Tokens were issued for a different Supabase project.

**Solution**: Ensure your OAuth provider (Google, GitHub, etc.) is configured with the correct Supabase project.

## Diagnostic Steps

### When This Happens Again:

1. **Open Browser DevTools** (F12)
2. **Go to Console tab**
3. **Look for these logs from the AuthCallback component**:
   ```
   🔍 Token details:
      Has access_token: true/false
      Has refresh_token: true/false
      Access token length: [number]
      Refresh token: [string]
   ```

4. **Check for specific error details**:
   ```
   ❌ Failed to set session with hash tokens: {
      message: "...",
      name: "...", 
      status: "..."
   }
   ```

## Quick Fix
If you encounter this issue:

1. **Clear browser cache** for beta.tuneatlife.com
2. **Start fresh OAuth flow** from the beginning
3. **Complete the flow quickly** (don't leave the callback URL sitting)

## Current Protection
The app now has enhanced error handling that will:
- ✅ Log detailed token information
- ✅ Try refresh token as fallback
- ✅ Provide clear error messages
- ✅ Report to Sentry for debugging

## Testing OAuth Flow
To test if OAuth is working:
1. Go to https://beta.tuneatlife.com/
2. Try to sign in with your OAuth provider
3. Complete the flow within 2-3 minutes
4. Check console for any error details

## Need More Help?
If this continues happening:
1. Save the **full callback URL** (with tokens redacted)
2. Copy the **browser console logs**
3. Note the **exact time** it happened
4. Check **Sentry** for additional error context