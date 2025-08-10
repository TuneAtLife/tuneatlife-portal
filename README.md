# TuneAtLife Portal

**Version:** 1.0.0  
**Framework:** Vite + React 19 + TailwindCSS 4  
**Package Manager:** pnpm 10.4.1

## 🎯 **Overview**

TuneAtLife Portal is the user-facing dashboard for the TuneAtLife wellness coaching platform. It provides a modern, responsive interface for users to track their wellness journey, access personalized insights, and interact with AI wellness experts.

## 🏗️ **Architecture**

### **Core Features:**
- **User Dashboard** - Wellness journey tracking and progress visualization
- **Assessment Interface** - Personalized wellness assessments and evaluations
- **AI Chat Integration** - Interface for interacting with AI wellness experts
- **Progress Tracking** - Metrics visualization and goal monitoring
- **Settings Management** - User preferences and account configuration

### **Technology Stack:**
- **Frontend Framework:** React 19.1.0 with modern hooks and concurrent features
- **Build Tool:** Vite 6.3.5 for fast development and optimized production builds
- **Styling:** TailwindCSS 4.1.7 with utility-first approach
- **UI Components:** Comprehensive Radix UI component library
- **Routing:** React Router DOM 7.6.1 for client-side navigation
- **Forms:** React Hook Form with Zod validation
- **Animation:** Framer Motion for smooth interactions
- **Package Manager:** pnpm for efficient dependency management

## 🚀 **Getting Started**

### **Prerequisites:**
- Node.js 20+
- pnpm 10.4.1+
- Docker (for containerized deployment)

### **Local Development:**
```bash
# Clone the repository
git clone https://github.com/talagmon/tuneatlife-portal.git
cd tuneatlife-portal

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Open browser to http://localhost:5173
```

### **Build for Production:**
```bash
# Build the application
pnpm build

# Preview production build
pnpm preview
```

### **Docker Development:**
```bash
# Build the Docker image
docker build -t tuneatlife-portal .

# Run the container
docker run -p 3000:3000 tuneatlife-portal
```

## 🔧 **Configuration**

### **Environment Variables:**
```bash
# Application
VITE_APP_VERSION=1.0.0
VITE_BUILD_TIME=2025-08-10T12:00:00Z
VITE_GIT_COMMIT=abc123def

# API Configuration (when integrated)
VITE_API_BASE_URL=https://api.tuneatlife.com
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### **Build Configuration:**
The application uses Vite for build configuration with:
- **Hot Module Replacement (HMR)** for fast development
- **Code Splitting** for optimized loading
- **Tree Shaking** for minimal bundle size
- **Asset Optimization** for images and static files

## 🧪 **Testing and Quality**

### **Code Quality:**
```bash
# Run ESLint
pnpm lint

# Run build test
pnpm build

# Check for unused dependencies
npx depcheck
```

### **Security Scanning:**
```bash
# Run npm audit
pnpm audit

# Run dependency security check
npx audit-ci

# Check for outdated packages
pnpm outdated
```

## 📊 **API Integration**

### **Planned Integrations:**
- **TuneAtLife Backend API** - User data and wellness metrics
- **Supabase Auth** - Authentication and user management
- **WebSocket Connection** - Real-time updates and notifications
- **AI Chat API** - Wellness expert interactions

### **API Endpoints (Future):**
```javascript
// User Dashboard Data
GET /api/v1/dashboard
GET /api/v1/user/progress
GET /api/v1/user/assessments

// AI Chat Integration
POST /api/v1/chat/message
GET /api/v1/chat/history

// Settings Management
GET /api/v1/user/settings
PUT /api/v1/user/settings
```

## 🚀 **Deployment**

### **Fly.io Deployment:**
The application is configured for deployment on Fly.io with automated CI/CD via GitHub Actions.

```bash
# Manual deployment
flyctl deploy

# Check application status
flyctl status --app tuneatlife-portal

# View logs
flyctl logs --app tuneatlife-portal
```

### **CI/CD Pipeline:**
- **Automated Testing** - ESLint, build verification, and quality checks
- **Security Scanning** - npm audit, dependency scanning, and container security
- **Code Quality** - ESLint, unused dependency detection, and bundle analysis
- **Deployment** - Automated deployment to Fly.io on master/main branch
- **Health Verification** - Post-deployment health checks and application testing

## 🔒 **Security**

### **Security Features:**
- **Dependency Scanning** - Daily vulnerability checks with npm audit
- **Container Security** - Trivy scanning for container vulnerabilities
- **Secret Detection** - TruffleHog for credential scanning
- **License Compliance** - Automated license checking
- **Code Quality** - ESLint for code style and security patterns

### **Security Headers:**
The Nginx configuration includes security headers:
- `X-Frame-Options: SAMEORIGIN`
- `X-Content-Type-Options: nosniff`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`

### **Security Best Practices:**
- Environment variables for sensitive configuration
- Non-root user in Docker containers
- HTTPS enforcement in production
- Regular security updates and dependency audits

## 📋 **Monitoring**

### **Health Monitoring:**
- **Health Endpoint:** `/health` - Application status and version
- **Build Version Display** - Visible in UI for deployment verification
- **Fly.io Monitoring** - Built-in application monitoring and alerting

### **Performance Monitoring:**
- **Bundle Size Analysis** - Automated bundle size checking
- **Core Web Vitals** - Performance metrics tracking
- **Error Tracking** - Client-side error monitoring (when integrated)

## 🎨 **Design System**

### **TailwindCSS Configuration:**
- **Custom Color Palette** - TuneAtLife brand colors
- **Responsive Design** - Mobile-first approach
- **Component Variants** - Consistent UI patterns
- **Animation System** - Smooth transitions and interactions

### **UI Components:**
- **Radix UI Primitives** - Accessible, unstyled components
- **Custom Components** - TuneAtLife-specific UI elements
- **Form Components** - React Hook Form integration
- **Layout Components** - Responsive grid and flexbox utilities

## 🤝 **Contributing**

### **Development Workflow:**
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes and test locally
4. Run quality checks (`pnpm lint`, `pnpm build`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### **Development Guidelines:**
- Follow React and modern JavaScript best practices
- Use TailwindCSS for styling (avoid custom CSS when possible)
- Write accessible components using Radix UI primitives
- Test components in different screen sizes
- Run security scans before submitting PRs
- Update documentation for new features

## 📄 **License**

This project is proprietary software for TuneAtLife platform.

## 🆘 **Support**

For support and questions:
- **Documentation:** This README and inline code comments
- **Issues:** GitHub Issues for bug reports and feature requests
- **Health Check:** `https://tuneatlife-portal.fly.dev/health`
- **Application:** `https://tuneatlife-portal.fly.dev`

---

**TuneAtLife Portal - Empowering wellness journeys with modern, accessible web technology.**

