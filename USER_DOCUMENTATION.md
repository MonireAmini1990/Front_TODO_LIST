## Overview
The ToDo List application allows users to:
- Add new tasks
- Edit existing tasks
- Delete tasks
- View all tasks

Frontend is built with React + Vite and communicates with the backend API (Node.js + Express + Supabase) to manage tasks.

## Features

- Responsive interface built with React + Vite
- Component-based UI
- API communication using Axios
- Routing with React Router
- Optimized build served by Nginx


# Run Locally (Development)

1. Install dependencies:
npm install
2. Run the app:
npm run dev
3. Open your browser:
 http://localhost:5173

# Run with Docker

1. Build Docker image:
docker build -t todo-frontend .
2. Run container:
docker run -p 3000:80 todo-frontend
3. Open browser:
 http://localhost:3000

## Using the App

Click Add to create a new task

Click Edit to modify a task

Click Delete to remove a task

click  All to view all tasks
