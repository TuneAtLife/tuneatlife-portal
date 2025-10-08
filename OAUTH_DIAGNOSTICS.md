# OAuth Configuration Diagnostic Guide

## 🚨 **Issue Identified**
**Root Cause**: OAuth tokens are valid but being rejected by Supabase project `xqxxtmrinjromjxhutcj`

**Error Pattern**: `AuthApiError: Invalid API key` from `/auth/v1/user` endpoint

## 🔍 **Evidence**
- ✅ Tokens present: `access_token`, `refresh_token`, `expires_at`
- ✅ Token format: Valid JWT structure  
- ✅ Token timing: `expires_at=1759917000` (valid until 2025)
- ❌ Supabase rejection: 401 Unauthorized from auth endpoint

## 🎯 **Root Cause**
The OAuth provider (Google) is configured to issue tokens for a **different Supabase project** than the one your app is using.

## 🛠️ **Fix Required**

### Option 1: Update Google OAuth Configuration
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to APIs & Services → Credentials
3. Find your OAuth 2.0 Client ID
4. Update "Authorized redirect URIs" to:
   ```
   https://xqxxtmrinjromjxhutcj.supabase.co/auth/v1/callback
   ```

### Option 2: Update Supabase OAuth Settings  
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select project `xqxxtmrinjromjxhutcj`
3. Go to Authentication → Providers
4. Configure Google OAuth with correct Client ID/Secret
5. Ensure callback URL matches: `https://xqxxtmrinjromjxhutcj.supabase.co/auth/v1/callback`

## 🔍 **How to Verify Current Configuration**

### Check Google OAuth Config:
1. Google Cloud Console → Credentials
2. Look at "Authorized redirect URIs"
3. Should match: `https://xqxxtmrinjromjxhutcj.supabase.co/auth/v1/callback`

### Check Supabase Config:
1. Supabase Dashboard → Authentication → Providers
2. Google provider should be enabled
3. Client ID should match your Google OAuth app
4. Callback URL should be auto-generated correctly

## ⚠️ **Common Mistakes**
- Google OAuth configured for different Supabase project
- Wrong Client ID/Secret in Supabase
- Callback URL mismatch between Google and Supabase
- OAuth app not published/approved in Google Console

## 🧪 **Testing After Fix**
1. Clear browser cache/cookies for `beta.tuneatlife.com`
2. Start fresh OAuth flow
3. Should see successful authentication without "Invalid API key"

## 📞 **Next Steps**
1. Check both Google and Supabase configurations
2. Ensure they match exactly
3. Test with fresh OAuth flow
4. Monitor Sentry for any remaining issues