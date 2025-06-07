# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

### Database Setup
```bash
# Start local PostgreSQL (port 5434)
docker-compose up dev-postgres

# Run database migrations
npx prisma migrate dev

# Generate Prisma client
npx prisma generate
```

### Development
```bash
# Start development server (http://localhost:3000)
npm run dev

# Run linter
npm run lint

# Run tests
npm test

# Run a single test file
npm test -- path/to/test.spec.ts

# Start Storybook (http://localhost:6006)
npm run storybook
```

### Build & Production
```bash
# Build for production (includes Prisma generation)
npm run build

# Start production server
npm start
```

## Architecture Overview

This is a Next.js financial portfolio management application with the following key architectural patterns:

### Component Organization (Atomic Design)
- `components/atoms/` - Basic UI elements (Button, Text, Loading)
- `components/molecules/` - Composite components (PrimaryButton, DangerButton)
- `components/organisms/` - Complex features (Portfolio, AssetHistory, Login)

### Backend Architecture (Clean Architecture)
- `server/adapters/` - External API integrations (Yahoo Finance, crypto prices, currency rates)
- `server/repositories/` - Database layer using Prisma ORM
- `server/services/` - Business logic layer
- `hooks/` - Custom React hooks that act as an API proxy layer to the backend

### Key Technical Details
- **Authentication**: NextAuth.js with Google and LINE OAuth providers
- **Database**: PostgreSQL with Prisma ORM
- **State Management**: React Context API (`contexts/assetsContext.ts`)
- **Data Visualization**: Highcharts for portfolio graphs
- **Testing**: Jest with React Testing Library for unit tests

### Asset Types Supported
The application manages multiple asset types:
- US Stocks (with ticker-based pricing from Yahoo Finance)
- Japan Stocks (with ticker-based pricing)
- Japan Funds
- Cryptocurrencies
- Fixed Income Assets
- Cash (multiple currencies)

### API Routes Pattern
All API routes follow RESTful conventions:
- `GET/POST /api/[resource]` - List/Create
- `GET/PUT/DELETE /api/[resource]/[id]` - Read/Update/Delete
- Special routes: `/api/me` (user info), `/api/cron` (scheduled tasks)