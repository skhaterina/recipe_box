// This file contains the actual logic for handling recipe-related requests.
// Routes (in recipesRoutes.js) point HERE when a matching request comes in.
// Keeping logic separate from routing makes each piece easier to test and reason about.
//
// Every function below now accepts `next` as a third parameter, and wraps its logic
// in try/catch. If something unexpected throws (a database error, a corrupted file, etc.),
// catch forwards it to next(err), which Express routes to our centralized errorHandler
// middleware instead of crashing the whole server or leaking a stack trace to the client.

const db = require('../config/db');

// GET /recipes - returns every recipe in the database
function getAllRecipes(req, res, next) {
  try {
    // .all() runs the query and returns every matching row as an array
    const rows = db.prepare('SELECT * FROM recipes').all();

    // SQLite stores ingredients as a JSON string (it has no array column type),
    // so we parse each row's ingredients back into a real array before sending it to the frontend
    const recipes = rows.map(row => ({
      ...row,
      ingredients: JSON.parse(row.ingredients)
    }));

    res.json(recipes);
  } catch (err) {
    // Something unexpected went wrong (e.g. a malformed row, a database read failure).
    // Hand it off to the centralized error handler rather than crashing.
    next(err);
  }
}

// GET /recipes/:id - returns a single recipe by its id
function getRecipeById(req, res, next) {
  try {
    // .get() returns one row, or undefined if nothing matches
    const row = db.prepare('SELECT * FROM recipes WHERE id = ?').get(req.params.id);

    // Guard clause: stop early and respond with 404 if no recipe was found,
    // so the code below never tries to read properties off `undefined`.
    // Note: this is an EXPECTED outcome (a normal "not found"), not a server error,
    // which is why it's handled directly here rather than going through next(err).
    if (!row) return res.status(404).json({ error: "Recipe not found" });

    const recipe = { ...row, ingredients: JSON.parse(row.ingredients) };
    res.json(recipe);
  } catch (err) {
    next(err);
  }
}

// POST /recipes - creates a new recipe
// Note: by the time this function runs, validateRecipe middleware has already
// confirmed title/ingredients/instructions are well-formed, so this function
// can focus purely on the "happy path" logic.
function createRecipe(req, res, next) {
  try {
    // Pull the three expected fields out of the request body
    const { title, ingredients, instructions } = req.body;

    // .run() executes an INSERT/UPDATE/DELETE and returns metadata about what happened.
    // The '?' placeholders keep this query safe from SQL injection -
    // never build SQL strings by directly gluing in user input.
    const result = db.prepare(
      'INSERT INTO recipes (title, ingredients, instructions) VALUES (?, ?, ?)'
    ).run(title, JSON.stringify(ingredients), instructions);

    // result.lastInsertRowid is the auto-generated id SQLite assigned to this new row
    const newRecipe = {
      id: result.lastInsertRowid,
      title,
      ingredients,
      instructions
    };

    // 201 = "Created" - the correct status code for a successful POST
    res.status(201).json(newRecipe);
  } catch (err) {
    next(err);
  }
}

// PUT /recipes/:id - updates an existing recipe (supports partial updates)
function updateRecipe(req, res, next) {
  try {
    const existing = db.prepare('SELECT * FROM recipes WHERE id = ?').get(req.params.id);
    if (!existing) return res.status(404).json({ error: "Recipe not found" });

    // The ?? (nullish coalescing) fallback means:
    // "use the new value if the client sent one, otherwise keep the existing value."
    // This lets the frontend update just one field without having to resend everything.
    const title = req.body.title ?? existing.title;
    const ingredients = req.body.ingredients ?? JSON.parse(existing.ingredients);
    const instructions = req.body.instructions ?? existing.instructions;

    db.prepare(
      'UPDATE recipes SET title = ?, ingredients = ?, instructions = ? WHERE id = ?'
    ).run(title, JSON.stringify(ingredients), instructions, req.params.id);

    // Respond with the recipe as it now exists, so the frontend can update its state immediately
    res.json({ id: Number(req.params.id), title, ingredients, instructions });
  } catch (err) {
    next(err);
  }
}

// DELETE /recipes/:id - removes a recipe
function deleteRecipe(req, res, next) {
  try {
    const result = db.prepare('DELETE FROM recipes WHERE id = ?').run(req.params.id);

    // result.changes tells us how many rows were actually deleted.
    // If it's 0, nothing matched that id, so respond with 404 instead of a false success.
    if (result.changes === 0) return res.status(404).json({ error: "Recipe not found" });

    // 204 = "No Content" - success, but nothing meaningful to send back
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

// Export every controller function so recipesRoutes.js can wire them up to specific routes
module.exports = {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe
};