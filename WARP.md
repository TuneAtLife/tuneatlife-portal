# WARP AI Assistant Rules - TuneAtLife Portal

## Repository Context

This is the **tuneatlife-portal** repository - Next-Generation Portal. Future replacement for tuneatlife-web with modern architecture

## Repository Purpose & Architecture

### Core Function
- **Primary Purpose**: Future replacement for tuneatlife-web with modern architecture
- **Service Type**: Application
- **Business Domain**: User Interface
- **SSoT Responsibility**: Next-generation web portal architecture

### Key Components
- `public/` - Static assets served directly (favicons, images, etc.)
- `src/` - React application source code
- `favicon.*` - Complete TuneAtLife favicon package for cross-platform compatibility

## Technology Stack & Dependencies

### Core Technologies
- **Language**: TypeScript/JavaScript
- **Framework**: Vite + React 19
- **Runtime**: Node.js
- **Package Manager**: pnpm

### External Dependencies
- **Database**: Supabase (tuneatlife-db)
- **Authentication**: Supabase Auth (OAuth with Google)
- **Monitoring**: Sentry
- **Image Management**: Cloudinary
- **External APIs**: Supabase API, Sentry, Cloudinary

### Internal Dependencies
- **Upstream Services**: None
- **Downstream Consumers**: None
- **Shared Libraries**: [Common packages/modules used]

## Deployment & Operations

### Deployment Target
- **Platform**: Fly.io
- **Application Name**: tuneatlife-beta-portal
- **Hostname(s)**: beta.tuneatlife.com
- **Environment Variables**: 
  - `VITE_SUPABASE_URL` - Supabase project URL
  - `VITE_SUPABASE_ANON_KEY` - Supabase public anon key
  - `VITE_SENTRY_DSN` - Sentry DSN for error tracking
  - `VITE_CLOUDINARY_*` - Cloudinary configuration

### CI/CD Pipeline
- **Build Process**: [Description of build steps]
- **Test Suite**: [Testing approach and requirements]
- **Deployment Trigger**: [What triggers deployments]
- **Rollback Process**: [How to rollback deployments]

### Monitoring & Observability
- **Logging**: [Logging approach and tools]
- **Metrics**: [Key metrics tracked]
- **Alerts**: [Critical alerts configured]
- **Health Checks**: [Health check endpoints]

## Brand Assets & Favicon

### TuneAtLife Favicon Package
The portal includes a complete favicon implementation optimized for all platforms:

- **`favicon.svg`** - Scalable vector favicon (modern browsers)
- **`favicon.ico`** - Multi-size ICO file (legacy browsers)
- **`favicon-16x16.png`** - 16x16 PNG version
- **`favicon-32x32.png`** - 32x32 PNG version  
- **`apple-touch-icon.png`** - 180x180 PNG for iOS devices
- **`favicon.png`** - 32x32 fallback PNG

### Design Features
- **Brand Colors**: Primary #2D7D7D (teal), Accent #4A9B9B (lighter teal)
- **Key Elements**: Simplified "T" and "L" letters with signature pulse wave
- **Optimization**: Circular white background for visibility at small sizes
- **Cross-Platform**: Full compatibility across browsers and mobile devices

### Implementation
Favicons are automatically included via `index.html` with complete meta tags for:
- Standard favicon support (ICO, PNG)
- Apple Touch Icons for iOS
- Modern SVG favicon for scalable displays
- Theme colors for browser chrome integration

## Development Guidelines

### Local Development Setup
```bash
# Prerequisites
brew install supabase/tap/supabase

# Installation steps
pnpm install

# Link to remote Supabase project
supabase link --project-ref xqxxtmrinjromjxhutcj

# Copy environment variables
cp .env.local.template .env.local
# Edit .env.local with actual Supabase credentials

# Running locally
pnpm dev

# Build for production
pnpm build
```

### Supabase CLI Maintenance
```bash
# Upgrading Supabase CLI
# IMPORTANT: Follow this process when upgrading CLI versions

# 1. Backup local schema changes (if any)
supabase db diff -f local_schema_backup

# 2. Stop local containers and clear volumes
supabase stop --no-backup

# 3. Update CLI via Homebrew
brew upgrade supabase

# 4. Verify upgrade
supabase --version

# 5. Update config.toml if database version mismatch
# (Set major_version = 15 in [db] section to match remote)

# 6. Restart services with new CLI version
supabase start
```

### Local vs Remote Database Strategy

**Default: Remote Development (Current)**
- ✅ Use remote tuneatlife-db for regular development
- ✅ Shared schema across all TuneAtLife apps
- ✅ Real data for testing
- ✅ No synchronization issues

**When to Use Local Database:**
```bash
# For major schema changes or experimental features
supabase init  # Initialize local project
supabase start # Start local Supabase stack

# Pull remote schema to local
supabase db pull

# Make schema changes locally
# Test thoroughly

# Generate migration
supabase db diff -f new_feature_migration

# Apply to remote via migration
supabase db push
```

**Environment Variable Switching:**
```bash
# Remote development (default)
VITE_SUPABASE_URL=https://xqxxtmrinjromjxhutcj.supabase.co
VITE_SUPABASE_ANON_KEY=<remote_key>

# Local development (for schema changes)
VITE_SUPABASE_URL=http://localhost:54321
VITE_SUPABASE_ANON_KEY=<local_anon_key>
```

### Code Organization
- **Architecture Pattern**: [MVC/Clean/Hexagonal/etc.]
- **File Structure Convention**: [How files should be organized]
- **Naming Conventions**: [Standards for naming]
- **Module Boundaries**: [How to maintain separation of concerns]

### Testing Strategy
- **Unit Tests**: [Approach and coverage expectations]
- **Integration Tests**: [What should be integration tested]
- **E2E Tests**: [If applicable]
- **Contract Tests**: [Pact or other contract testing]

## AI Assistant Behavior Guidelines

### Repository-Specific Rules
- [Key rule 1 specific to this repository]
- [Key rule 2 specific to this repository]
- [Additional rules as needed]

### Common Tasks
- [Common task 1 that AI might help with]
- [Common task 2 that AI might help with]
- [Additional tasks as needed]

### Safety Considerations
- **Production Impact**: [What changes could affect production]
- **Data Sensitivity**: [Sensitive data to be aware of]
- **Security Concerns**: [Security considerations specific to this repo]
- **Breaking Changes**: [What could break downstream services]

## Integration Points

### API Endpoints (if applicable)
- **Base URL**: [Production API base URL]
- **Authentication**: [How authentication works]
- **Key Endpoints**: [List of important endpoints]
- **API Documentation**: [Where to find API docs]

### Database Schema (if applicable)
- **Primary Database**: [Database name and type]
- **Key Tables/Collections**: [Important data structures]
- **Migration Strategy**: [How database changes are managed]

### Event System (if applicable)
- **Published Events**: [Events this service publishes]
- **Consumed Events**: [Events this service listens to]
- **Event Schema**: [Where event schemas are defined]

## Current Status & Roadmap

### Current State
- **Production Status**: Beta deployment active at beta.tuneatlife.com
- **Recent Changes**: 
  - OAuth integration with Supabase Auth (Google login)
  - Direct Fly.io deployment from local feature branch
  - Supabase CLI upgraded to v2.47.2
- **Known Issues**: 
  - Remote Git push blocked by HTTP 400 error
  - OAuth callback requires environment variables configuration

### Future Direction
- **Planned Features**: [Upcoming features or changes]
- **Migration Plans**: [If this repo is being replaced/migrated]
- **Technical Debt**: [Known technical debt to address]

## Quick Reference

### Environment URLs
- **Beta**: https://beta.tuneatlife.com
- **Local**: http://localhost:5173

### Key Commands
```bash
# Deploy to beta
fly deploy --app tuneatlife-beta-portal --remote-only

# Check deployment status
fly status --app tuneatlife-beta-portal

# View deployment logs
fly logs --app tuneatlife-beta-portal

# Manage environment secrets
fly secrets list --app tuneatlife-beta-portal
fly secrets set VITE_SUPABASE_URL="..." --app tuneatlife-beta-portal

# Supabase operations
supabase projects list
supabase projects api-keys --project-ref xqxxtmrinjromjxhutcj
```

### Team Contacts
- **Code Owners**: [Primary maintainers]
- **Domain Expert**: [Subject matter expert]
- **Emergency Contact**: [Who to contact for production issues]

## Related Documentation

### Internal References
- **ADRs**: [Relevant Architecture Decision Records]
- **Runbooks**: [Operational runbooks]
- **Design Docs**: [Design documentation]

### External References
- **Framework Docs**: [Links to framework documentation]
- **API References**: [Links to third-party API docs]
- **Best Practices**: [Relevant best practice guides]

---

## Summary

[Brief summary paragraph explaining this repository's critical role and main responsibilities in 2-3 sentences]