# GuideLynn - AI-Powered Career Counselling

GuideLynn is an advanced AI-powered application designed to provide enhanced career counselling services. It helps users navigate their career paths, make informed decisions, and receive personalized guidance based on their skills, interests, and goals.

## Features

- **Personalized Career Guidance**: Get tailored advice based on your profile and career goals
- **Skill Assessment**: Identify your strengths and areas for improvement
- **Industry Insights**: Access up-to-date information about various industries and job markets
- **Interactive Chat Interface**: Engage in natural conversations with our AI counsellor
- **Profile Management**: Create and update your professional profile to receive more relevant guidance

## Live Demo

You can access the live, deployed version of the application here:

**[[Guidelynn](https://guidelynn.vercel.app/)]**

## Screenshots

### Landing Page

![Landing Page](./public/landing-page.png)

### New Chat Page

![New Chat Page](./public/new-chat-page.png)

### Chat Interface

![Chat Page](./public/chat-page.png)

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm
- PostgreSQL database

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/adilkhursheed/guidelynn.git
   cd guidelynn
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:

   ```
   # Database (NeonDB)
   DATABASE_URL="postgresql://username:password@localhost:5432/guidelynn"

   # Authentication (NextAuth.js)
   BETTER_AUTH_URL="http://localhost:3000"
   BETTER_AUTH_SECRET="your-nextauth-secret"
   NEXT_PUBLIC_API_URL="http://localhost:3000"

   # OAuth Providers
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"

   # AI Provider
   OPEN_ROUTER_API_KEY="your-open-router-api-key"
   MEM0_API_KEY="your-mem0-api-key"
   ```

4. Initialize the database:

   ```bash
   npx @better-auth/cli migrate
   ```

5. Push the prisma schema to the database:

   ```bash
   npx prisma db push
   ```

6. Start the development server:

   ```bash
   npm run dev
   ```

7. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Project Structure

```
guidelynn/
├── prisma/              # Database schema and migrations
├── public/              # Static assets
├── src/
│   ├── app/             # Next.js App Router pages
│   ├── components/      # Reusable UI components
│   ├── contexts/        # React contexts
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions and libraries
│   ├── schemas/         # Validation schemas
│   ├── trpc/            # tRPC API routes
│   └── types/           # TypeScript type definitions
└── ...
```

## Technologies Used

- **Frontend**: Next.js, React, Tailwind CSS, shadcn/ui, Tanstack Query
- **Backend**: Next.js API routes, tRPC
- **Database**: PostgreSQL (NeonDB), Prisma ORM
- **Authentication**: Better-Auth
- **AI Integration**: Open-router API
- **AI Memory**: Mem0.ai

## Deployment

The application can be deployed on Vercel:

1. Push your code to a GitHub repository
2. Import the project in Vercel
3. Configure the environment variables
4. Deploy

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
