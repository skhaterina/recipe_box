// This file defines WHICH url + HTTP method maps to WHICH controller function.
// It intentionally contains no actual logic - just wiring.
// Keeping routing separate from logic means you can see your entire API's shape
// at a glance, without wading through implementation details.

const express = require('express');
const router = express.Router(); // A mini, self-contained version of `app`, just for these routes

const {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe
} = require('../controllers/recipesController');

// Note: paths here do NOT include "/recipes" - that prefix gets added once,
// where this router is mounted in index.js (app.use('/recipes', recipesRoutes))
router.get('/', getAllRecipes);       // GET    /recipes
router.get('/:id', getRecipeById);    // GET    /recipes/:id
router.post('/', createRecipe);       // POST   /recipes
router.put('/:id', updateRecipe);     // PUT    /recipes/:id
router.delete('/:id', deleteRecipe);  // DELETE /recipes/:id

// Export this configured router so index.js can mount it onto the main app
module.exports = router;