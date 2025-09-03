## Overview
The ToDo List application consists of:
Frontend – React + Vite
Backend – Node.js + Express + Supabase + Drizzle ORM
You can run each service separately or both together using Docker Compose.

# Backend Developer Guide
Project Structure
backend/
│── src/
│   ├── routes/
│   ├── controllers/
│   ├── middlewares/
│   ├── core/config/dataBase
│   └── services/
│── server.js
│── drizzle.config.js
│── package.json
│── Dockerfile
│── README.md

Copy .env and configure:

# Variable	             # Description
PORT	                 Server port
SUPABASE_URL	         Supabase project URL
SUPABASE_KEY	         Supabase service key

# Run Locally
npm install
npm start
Backend API:
http://localhost:3000

# Run with Docker
docker build -t todo-backend .
docker run -p 5001:5000 todo-backend
API available at:
http://localhost:5001

# Frontend Developer Guide
Project Structure
frontend/
│── public/
│── src/
│   ├── components/
│   ├── contexts/
│   ├── hooks/
│   ├── App.jsx
│   ├── api.jsx
│   └── supabaseClient.jsx
│── package.json
│── Dockerfile
│── vite.config.js
│── nginx.conf

# Run Locally
npm install
npm run dev
Frontend available at:
http://localhost:5173

# Run with Docker
docker build -t todo-frontend .
docker run -p 3000:80 todo-frontend


## Run with Docker Compose

Bring up both frontend and backend:
docker compose up
Access services:
Frontend → http://localhost:3000
Backend → http://localhost:5001

## Stop services:

docker-compose down         # stop containers
docker-compose down -v      # stop containers + remove volumes

## Tech Stack

Frontend: React + Vite, React Router, Axios, Tailwind CSS, Docker + Nginx

Backend: Node.js, Express, Supabase, Drizzle ORM, CORS, dotenv, Docker