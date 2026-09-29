//db.js
// This file sets up the SQLite database connection and defines the schema.
// It runs once when the server starts, and the resulting `db` object
// is imported anywhere the app needs to read or write recipe data.

const Database = require('better-sqlite3');

// Opens (or creates, if it doesn't exist yet) a file called recipes.db
// in the server folder. Unlike an in-memory array, this file persists
// on disk and survives server restarts.
const db = new Database('recipes.db');

// Define the recipes table structure.
// IF NOT EXISTS means this is safe to run every time the server starts -
// it won't wipe existing data or throw an error on subsequent runs.
db.exec(`
  CREATE TABLE IF NOT EXISTS recipes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,  -- auto-generated unique id per row
    title TEXT NOT NULL,                   -- required text field
    ingredients TEXT NOT NULL,             -- stored as a JSON string (SQLite has no array type)
    instructions TEXT NOT NULL
  )
`);

// Export the configured database connection so controllers can query it
module.exports = db;