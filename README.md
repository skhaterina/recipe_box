# RECIPE BOX

# Recipe Box

A full-stack web application for saving, organizing, and browsing your favorite recipes. Built as a learning project to practice React, Express, REST API design, and backend architecture.

## Features

- View a list of saved recipes
- View full details of a single recipe (ingredients, instructions)
- Add new recipes
- Edit existing recipes
- Delete recipes

**Coming soon:**
- User authentication
- Search/filter by ingredient or tag
- Deployment

## Tech Stack

- **Frontend:** React (Vite)
- **Backend:** Node.js, Express
- **Database:** SQLite (via `better-sqlite3`)

## Architecture
The backend follows a layered structure to separate concerns:

```
server/
├── config/
│   └── db.js              # Database connection and schema
├── controllers/
│   └── recipesController.js  # Route handler logic
├── routes/
│   └── recipesRoutes.js   # URL/method → controller mapping
└── index.js                # Server setup and middleware
```

The frontend is split into focused, reusable components:

```
client/src/
├── App.jsx                 # Top-level state and data flow
├── components/
│   ├── RecipeForm.jsx       # Add-recipe form
│   ├── RecipeCard.jsx       # Single recipe display + inline editing
│   └── RecipeList.jsx       # Renders a list of RecipeCards
```
## Getting Started

### Prerequisites
- Node.js installed (v18+ recommended)

### Installation

1. Clone the repo
```bash
   git clone https://github.com/skhaterina/recipe_box.git
   cd recipe_box
```

2. Install backend dependencies
```bash
   cd server
   npm install
```

3. Install frontend dependencies
```bash
   cd ../client
   npm install
```

### Running Locally

Start the backend (from the `server` folder):
```bash
node index.js
```
The server runs on `http://localhost:3000`

Start the frontend (from the `client` folder):
```bash
npm run dev
```
App runs on `http://localhost:5173` (or the next available port)

## What I Learned

- Building a REST API with Express, including full CRUD (Create, Read, Update, Delete)
- Structuring a backend into routes, controllers, and config layers for maintainability
- Persisting data with SQLite instead of an in-memory array
- Connecting a React frontend to a backend using `fetch`
- Managing async data and component state with `useState` and `useEffect`
- Breaking a React app into focused, reusable components with props
- Debugging real issues: scope errors, typos silently breaking JSX, SQL parameterization, CORS

## Roadmap

- [x] Add create/edit/delete functionality
- [x] Add a real database (SQLite) (finished Oct 1,26)
- [x] Restructure backend into routes/controllers/config layers (finished Oct 2, 26)
- [x] Add input validation and centralized error handling (finished Oct 2, 26)
- [x] Move hardcoded URLs into environment variables
- [ ] Add user authentication
- [ ] Deploy live (Vercel + Railway/Render)
- [ ] Add search/filter by ingredient or tag
