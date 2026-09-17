# RECIPE BOX

# A full stack web application for saving organizing, and bowsing your favorite recipes. Built as a learning project to practive React, express and rest API design.

# FEATURES:
- views a list of saved recipes
- view full details of a single recipe (ingredients, instructions)

    #COMING SOON:
        - add new recipes
        - edit and delete recipes
        - user authentication
# TECH STACK
**FRONT END:** React(vite)
**BACKEND ** Node.js, Express
**Database: ** (add once you set one up - SQLite, PostgreSQL)*

## GETTING STARTED
## PREREQUISITES
    - Node.js installed(b18+ recommended)

### Installation
1. Clone the repo
'''bash
    git clone https://github.com/skhaterina/recipe_box.git
    cd recipe_box
2. Install backend dependencies
'''bash
    cd server
    npm install
'''
3. Install frontend dependencies
'''bash
    cd../client
    npm install
'''

### RUNNING LOCALLY
Start the backend(from the 'server' folder)
'''bash
node index.js
'''
Server runs on 'http://localhost:3000'
Start the frontend(from the 'client' folder):
'''bash
npm run dev
'''

## WHAT I LEARNED
- Setting up a REST API with Express
-Connecting a react frontend to a backend using 'fetch'
- Managing async data with 'useState' and 'useEffect'
- *(add more as you go - auth, database, deployment, etc)*

## Roadmap

- [ ] Add a database (currently using in-memory fake data)
- [ ] Add create/edit/delete functionality
- [ ] Add user authentication
- [ ] Deploy live (Vercel + Railway)
- [ ] Add search/filter by ingredient or tag