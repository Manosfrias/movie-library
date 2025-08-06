# Movie Library 🎬

A modern movie library application built with Next.js, TypeScript and React.

## 🚀 Tech Stack

- **Frontend**: React 18 + TypeScript
- **Framework**: Next.js 14 (App Router)
- **Build Tool**: Vite
- **Testing**: Vitest + Cypress
- **Code Quality**: ESLint + Prettier
- **Git Hooks**: Husky
- **Styling**: CSS Modules
- **CI/CD**: GitHub Actions  
- **Deploy**: Vercel

## 📦 Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd movie-library
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables:

```bash
cp .env.example .env.local
```

Edit `.env.local` and configure the necessary variables (see **Configuration** section).

4. Set up Git hooks:

```bash
npm run prepare
```

## 🛠️ Available Scripts

### Development

```bash
npm run dev          # Start development server (next dev)
npm run build        # Build application for production (next build)
npm run start        # Start production server (next start)
```

### Testing

```bash
npm run test         # Run unit tests once (vitest run)
npm run test:watch   # Run tests in watch mode (vitest)
npm run test:ui      # Run Vitest with web UI (vitest --ui)
npm run test:coverage # Generate coverage report (vitest run --coverage)
npm run test:coverage-check # Verify coverage meets minimum + check script
npm run cypress:open # Open Cypress in interactive mode
npm run cypress:run  # Run E2E tests headlessly
```

### Code Quality

```bash
npm run lint         # Run ESLint (next lint)
npm run lint:fix     # Auto-fix ESLint errors (next lint --fix)
npm run format       # Format code with Prettier (prettier --write .)
npm run format:check # Check code formatting (prettier --check .)
npm run type-check   # Check TypeScript types (tsc --noEmit)
```

### Setup

```bash
npm run prepare      # Install Husky git hooks (husky install)
```

## ⚙️ Configuration

### Environment Variables

The application uses the following environment variables:

```bash
# API Configuration - Movies API URL (REQUIRED)
NEXT_PUBLIC_MOVIES_API_URL=https://your-api-url.io/api/v1/movies

# Storage Configuration - localStorage keys (OPTIONAL)
NEXT_PUBLIC_STORAGE_FILTERS_KEY=movie-library-filters
NEXT_PUBLIC_STORAGE_FAVORITES_KEY=movie-library-favorites

# Environment - Runtime environment
NODE_ENV=development
```

> ⚠️ **Important**: `NEXT_PUBLIC_MOVIES_API_URL` is required. The application won't start without it.
>
> **Demo API**: For testing purposes, we recommend using: `https://68820fb566a7eb81224d439c.mockapi.io/api/v1/movies`
>
> **Storage Keys**: localStorage keys are optional. If not provided, default values will be used.

### Configuration File

The `src/config/env.ts` file centralizes all application configuration:

```typescript
import config from '@/config/env';

// API Configuration
config.api.baseUrl; // API base URL
config.api.timeout; // Request timeout (10s)
config.api.retryAttempts; // Retry attempts (3)

// Environment detection
config.isDevelopment; // true if NODE_ENV === 'development'
config.isProduction; // true if NODE_ENV === 'production'
config.isTest; // true if NODE_ENV === 'test'

// Feature flags (empty, ready for future features)
config.features; // {}

// App configuration (reads from package.json)
config.app.name; // App name
config.app.version; // App version
config.app.defaultPageSize; // Default pagination (20)
config.app.maxRetries; // Maximum retries (3)
```

## 🏗️ Project Structure

```
movie-library/
├── src/
│   ├── app/                     # Next.js 14 App Router
│   │   ├── [id]/                # Dynamic movie detail routes
│   │   ├── globals.css          # Global styles and CSS variables
│   │   ├── layout.tsx           # Root layout component
│   │   ├── page.tsx             # Home page
│   │   ├── favicon.ico          # Application favicon
│   │   └── _layout.test.tsx     # Layout component tests
│   ├── config/                  # Application configuration
│   │   └── env.ts               # Environment variables and settings
│   ├── core/                    # Domain layer (Clean Architecture)
│   │   ├── data/                # Sample data and fixtures
│   │   ├── infrastructure/      # External adapters (API, Storage)
│   │   │   ├── mappers/         # Data transformation utilities
│   │   │   └── repositories/    # Repository implementations
│   │   ├── models/              # Domain models and types
│   │   ├── use-cases/           # Business logic and use cases
│   │   └── utils/               # Domain utilities
│   └── ui/                      # Presentation layer
│       ├── components/          # Reusable UI components
│       │   ├── movie-card/      # Movie display card
│       │   ├── movie-details/   # Movie detail components
│       │   ├── filter-movies/   # Filtering functionality
│       │   ├── search-movies/   # Search functionality
│       │   ├── add-movie-form/  # Movie creation forms
│       │   ├── aside-card/      # Sidebar card component
│       │   └── ...              # 20+ other components
│       ├── context/             # React Context providers
│       ├── hooks/               # Custom React hooks
│       ├── locales/             # Internationalization files
│       └── views/               # Page-level components
├── __vitest__/                  # Unit testing configuration
│   └── setup.ts                # Vitest global configuration
├── __cypress__/                 # E2E testing
│   ├── e2e/                    # End-to-end test files
│   └── support/                # Cypress support files
├── coverage/                    # Test coverage reports
├── scripts/                     # Build and utility scripts
├── .husky/                     # Git hooks configuration
├── cypress.config.ts          # Cypress configuration
├── next.config.js              # Next.js configuration
├── vite.config.ts              # Vite configuration for tests
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies and scripts
```

### 🏛️ Architecture Overview

The project follows **Clean Architecture** principles with clear separation of concerns:

- **`core/`**: Contains the business logic, independent of UI and external dependencies
- **`ui/`**: Presentation layer with React components, hooks, and context
- **`app/`**: Next.js App Router with pages and layouts
- **`config/`**: Centralized configuration management

### 🧪 Testing Strategy

- **Unit Tests**: Co-located with `_` prefix (e.g., `_Component.test.tsx`)
- **Integration Tests**: In `__vitest__/` for cross-component testing
- **E2E Tests**: In `__cypress__/` for full user workflow testing
- **Coverage**: Minimum 80% across all metrics

## 🔧 Configuration

### ESLint + Prettier

The project comes configured with strict ESLint and Prettier rules to maintain code quality.

### Husky Pre-commit Hooks

Before each commit, the following are automatically executed:

- Lint and automatic fixes
- Code formatting
- TypeScript type checking
- Unit tests

### Testing

- **Vitest**: For unit and integration tests
- **Cypress**: For end-to-end tests
- **@testing-library/react**: For React component testing
- **Minimum coverage**: 80% in lines, functions, branches and statements
- **Structure**: Tests co-located with `_` prefix

### TypeScript

Strict TypeScript configuration with:

- Optimized module resolution
- Import aliases (`@/*` for `src/*`)
- Strict type checking

## 🤖 Development Methodology

This project is being built through a **collaborative process between human and AI**, with **GitHub Copilot** supporting the development.

### 🎯 How We Work

- **Planning**: We organize and track tasks using a dynamic [KANBAN.md](KANBAN.md)
- **Architecture**: The project structure and patterns are defined by a human (me! Ana 😉)
- **Implementation**: GitHub Copilot helps generate code based on clear specifications
- **Review**: We refine the code continuously to improve quality and clarity
- **Testing**: Tests are included to ensure everything works as expected

### 📊 Project Metrics

- **Current progress**: 89.7% completed (70/78 tasks) - See [KANBAN.md](KANBAN.md)
- **Development time**: ~29 hours invested (actual time tracked)
- **Test coverage**: 80% minimum required
- **Architecture**: Clean Architecture with Repository + Service Layer pattern
- **API**: MockAPI integration for rapid prototyping
- **Components**: 20+ UI components with responsive design
- **Mobile support**: Full responsive design with mobile-specific features

### ⏱️ Actual Time Investment

**Total: ~29 hours** (tracked across development sessions)

> 💡 **AI Collaboration Efficiency**: Around 29 hours with AI support, compared to an estimated 60–80 hours using a more traditional approach. Working alongside the AI helped speed things up significantly, while keeping an acceptable level of code quality.

### 🔧 Workflow

1. **Requirements analysis** → Task definition in KANBAN
2. **Assisted implementation** → Code generation with GitHub Copilot
3. **Automated testing** → Unit and integration tests
4. **Quality review** → ESLint, Prettier, and Husky hooks
5. **Documentation** → Continuous progress and architecture updates

This approach blends **human creativity and direction** with **AI support and speed** to build a solid and thoughtfully structured project.

## 💭 Reflection

Overall, I really enjoyed working on this project. The idea from the beginning was to create a sort of team: on one side, the AI acting like a junior developer who needs guidance (I even had to define some guidelines!), and on the other, a more senior role leading the direction of the project.

It’s been an interesting experience. The AI is great at generating things quickly — above all, it *creates*. Sometimes it’s hard to keep it focused or minimal, and guiding it in the right direction takes intention.

If I had to do it again, I’m not sure I’d use the exact same approach or rely so much on AI. But one thing is clear: without this setup, I probably wouldn’t have reached the level of depth I was aiming for.

I hope you find it interesting too.

## 📄 License

This project is under the MIT license - see the [LICENSE](LICENSE) file for more details.
