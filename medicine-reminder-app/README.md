# Medicine Reminder App

Vue 3 + Express + MongoDB project.

## Folder structure
```
medicine-reminder-app/
├── server/     -> Express + MongoDB backend (API)
└── client/     -> Vue 3 + Vite frontend (UI)
```

## How to run

### 1. Backend
```
cd server
npm install
copy .env.example to .env, and set your MONGO_URI
npm run dev
```
Runs on http://localhost:5000

### 2. Frontend (separate terminal)
```
cd client
npm install
npm run dev
```
Runs on http://localhost:5173

Open http://localhost:5173 in your browser.
