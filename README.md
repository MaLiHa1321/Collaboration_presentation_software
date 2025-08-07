# Collaborative Presentation App
The purpose of this project is to allow multiple users to collaboratively create and edit presentation slides. 

## 🚀 Features Implemented

- Create a new presentation
- Join an existing presentation
- View slides in presentation mode
- Save presentation slides to database
- Persistent storage with MongoDB

## 🛠 Tech Stack

- **Frontend**: React, Tailwind CSS,
- **Backend**: Express.js, MongoDB, node.js, Socket.IO
- **Deployment**: Vercel (Frontend), Render (Backend)

## ⚠️ Limitations
- Real-time collaboration (live syncing of slide edits) is not fully implemented. Only basic Socket.IO connection exists.
- Switching user roles (editor/viewer) during a session is not implemented. Roles are static based on entry.

## 🌐 Live Demo

- **Frontend (Vercel)**: [https://collaboration-presentation-software.vercel.app]


## 📦 Installation & Running Locally

1. **Backend**
cd backend
npm install
npm start

2. **Frontend**
cd frontend
npm install
npm run dev


  
