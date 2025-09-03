# ToDo List - Frontend

Frontend of the **ToDo List** application built with **React + Vite**.  
The app communicates with the backend API (Node.js + Express + Supabase) to manage tasks, add, edit, and delete them.

---

## Features
- Built with **React (Vite)**
- Component-based structure
- Axios for API requests
- Routing with React Router
- Optimized build served by **Nginx**

---

## Project Structure
frontend/
│── public/ # Static assets
│── src/
│ ├── components/ # Reusable UI components
│ ├── contexts/ # API service (axios) 
│ ├── App.jsx # Root component
│ ├── api.jsx/ # Authentication
│ └── hooks/ # Custom hooks
│ └── main.jsx # Entry point
│ └── supabaseClient.jsx # Supabase client
│── package.json
│── tailwind.config.js
│── README.md
│── vite.config.js
│── Dockerfile
│── nginx.conf


### Install dependencies
npm install
npm run dev
The app will be available at:
http://localhost:5173

### Production Build
npm run build
Output will be inside the /dist folder.

### Run with Docker
1. Build the Docker image
docker build -t todo-frontend .
2. Run a container
docker run -p 3000:80 todo-frontend
Now visit => http://localhost:3000

### Tech Stack
React (Vite)
React Router
Axios
Tailwind CSS (optional)
Docker + Nginx








