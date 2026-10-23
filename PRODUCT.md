# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Students and early-career people choosing a first career or first job, often with limited professional networks.

## Product Purpose

Guidelynn is an AI-powered career counsellor that helps users navigate career paths, make informed decisions, and receive personalized guidance based on their skills, interests, and goals. Success means a user leaves with a clearer next career move and more confidence in it.

## Positioning

Guidelynn's current durable difference is persistent career memory: it retains the user's profile and prior conversations and uses them in later guidance. Its confirmed direction is to extend this into a guided career process rather than open-ended Q&A. The specific guided-process mechanics are not yet defined.

## Operating Context

A web application. Users create an account, complete or update a profile covering education, current role, experience, industry, skills, interests, location, and career stage, then hold career conversations in a chat interface. Chats are retained per user and listed for return visits.

## Capabilities and Constraints

- Account creation and sign-in through Better-Auth with Google and credential providers.
- Profile management for education, current role, experience, industry, skills, interests, location, and career stage.
- AI career conversations through OpenRouter, with chat history stored per user.
- Persistent memory of the user and their conversations through Mem0.
- Transactional email for account recovery flows.
- Technical constraints: Next.js 15 App Router, React 19, TypeScript, Tailwind CSS 4, shadcn/ui, tRPC, Prisma with PostgreSQL, deployed on Vercel.
- Undecided: the guided career process's steps, success metrics, and business model.

## Evidence on Hand

- Live application: https://guidelynn.vercel.app/
- Product screenshots: `public/landing-page.png`, `public/new-chat-page.png`, `public/chat-page.png`
- No testimonials, case studies, customer names, benchmarks, press, pricing evidence, or usage data exist in the repository. Future work must not fabricate them.

## Product Principles

1. Serve students and early-career users first; their constraints shape every decision.
2. Earn personalization through retained context, not by asserting it.
3. Guide users toward decisions, not only answers.
4. Ground guidance in the user's actual profile and history.
5. Claim only what the product can demonstrate.
