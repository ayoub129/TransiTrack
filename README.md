# Uber Clone App

A ride-sharing application similar to Uber, built with React Native for mobile and Node.js for the backend.

## Project Structure

```
uber-clone-app/
├── frontend/          # React Native app (iOS & Android)
├── backend/           # Node.js/Express API server
├── database/          # MongoDB schemas and migrations
└── docs/             # Documentation
```

## Tech Stack

### Frontend
- **React Native** with Expo
- **TypeScript** for type safety
- **React Navigation** for navigation
- **Redux Toolkit** for state management
- **Google Maps API** for maps and location

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose
- **Socket.io** for real-time communication
- **JWT** for authentication
- **Stripe** for payments

### Database
- **MongoDB** for user data, ride history, driver locations
- **Redis** for caching and real-time data

## Getting Started

1. Install dependencies:
```bash
npm run install-all
```

2. Start development servers:
```bash
npm run dev
```

This will start both the backend server and React Native development server.

## Environment Setup

1. Copy `.env.example` to `.env` in both frontend and backend directories
2. Configure your API keys and database connections
3. Set up MongoDB database
4. Configure Google Maps API key

## Features (To Be Implemented)

- User authentication (passengers and drivers)
- Real-time ride booking
- GPS tracking and navigation
- Payment processing
- Ride history
- Rating and review system
- Driver management
- Admin dashboard
