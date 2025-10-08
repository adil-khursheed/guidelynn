# GuideLynn Technical Documentation

## Overview

GuideLynn is an AI-powered career counseling application built with Next.js, React, and TypeScript. It provides personalized career guidance through an interactive chat interface, user profile management, and AI-driven recommendations.

## Architecture

### Frontend

- **Framework**: Next.js 15 with App Router
- **UI Components**: React with Tailwind CSS and shadcn/ui component library
- **State Management**: React Context API and custom hooks
- **Form Handling**: React Hook Form with Zod validation

### Backend

- **API Layer**: tRPC for type-safe API routes
- **Authentication**: Better-Auth with google and credential provider support
- **Database ORM**: Prisma with PostgreSQL
- **AI Integration**: OpenRouter API for conversational capabilities

## Key Components

### Authentication Flow

1. User signs in via Better-Auth (OAuth providers or credentials)
2. Session management handled through Better-Auth session providers
3. Protected routes enforced via middleware.ts

### Chat System

- **Context**: chat-context.tsx manages chat state and interactions
- **API**: tRPC endpoints handle message processing and AI responses
- **UI**: Interactive chat interface with real-time message streaming

### User Profile Management

- **Schema**: Zod validation schemas in schemas/profile-schema.ts
- **Form**: Multi-select components for education and skills selection
- **Storage**: Prisma ORM for database operations

## Data Flow

1. **User Authentication**:

   - User credentials → Better-Auth → Database → Session token
   - Protected routes check session validity via middleware

2. **Chat Interaction**:

   - User input → Chat context → tRPC mutation → AI processing → Response streaming → UI update

3. **Profile Management**:
   - Form input → Zod validation → tRPC mutation → Prisma ORM → Database update

## Database Schema

Key entities in the Prisma schema:

- User (authentication and profile data)
- Chat (conversation sessions)
- Message (individual chat messages)
- UserProfile (extended user information)

## Deployment Architecture

- **Hosting**: Vercel Platform
- **Database**: PostgreSQL (managed service)
- **Environment Variables**: Securely managed through Vercel
- **CI/CD**: Automatic deployments from GitHub repository

## Security Considerations

- Authentication via Better-Auth with secure session management
- Environment variables for sensitive credentials
- Input validation with Zod schemas
- API route protection with middleware
- Type safety with TypeScript and tRPC

## Performance Optimizations

- Server-side rendering for initial page loads
- Client-side navigation for fast page transitions
- Edge functions for low-latency API responses

## Development Workflow

1. Local development with hot reloading
2. TypeScript for type checking
3. ESLint for code quality
4. Prisma migrations for database schema changes
5. Git-based version control
6. Vercel preview deployments for pull requests
