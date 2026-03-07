# stayIndia - Residential Apartment Rental Portal

This is a production-level MERN stack application designed for managing and renting luxury apartments. It features JWT authentication, role-based access control, a secure backend, and a highly responsive frontend built with Vite and Tailwind CSS.

## Features

- **User Portal**: Browse flats, search, filter, request bookings, and view dashboard.
- **Admin Portal**: Manage users, towers, flats, amenities, and approve/reject bookings.
- **Security**: Password hashing, secure JWT endpoints, Helmet headers, Rate Limiting, CORS.
- **Beautiful UI**: Built with pure Tailwind CSS components and Lucide React icons.

## Quick Start (Docker - Recommended)

This project contains a `docker-compose.yml` file which orchestrates the MongoDB database, the Node.js API, and the compiled Vite SPA hosted on Nginx.

1. Install Docker and Docker Compose.
2. In the root directory, run:
```bash
docker-compose up --build -d
```
3. Access the frontend app at `http://localhost`.
4. Access the backend API at `http://localhost:5000`.

## Manual Setup (Development)

### Backend
1. Navigate to the `backend` folder: `cd backend`
2. Install dependencies: `npm install`
3. Make sure MongoDB is running locally on port 27017.
4. Start the server: `npm run dev` (Requires adding `"dev": "nodemon src/server.js"` to `package.json`).

### Frontend
1. Navigate to the `frontend` folder: `cd frontend`
2. Install dependencies: `npm install`
3. Start the Vite dev server: `npm run dev`
4. Access at `http://localhost:5173`.

# Stayindia-booking-mern-HOTEL-BOOKING-
StayIndia is a full-stack hotel booking web application that allows users to search, explore, and reserve hotels across India with secure authentication and a seamless booking experience.
