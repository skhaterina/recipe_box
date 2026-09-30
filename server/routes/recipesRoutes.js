// This file defines WHICH url + HTTP method maps to WHICH controller function.
// It intentionally contains no actual logic - just wiring.
// Keeping routing separate from logic means you can see your entire API's shape
// at a glance, without wading through implementation details.

const express = require('express');
const router = express.Router(); // A mini, self-contained version of `app`, just for these routes
const validateRecipe = require('../middleware/validateRecipe'); 

const {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe
} = require('../controllers/recipesController');

router.get('/', getAllRecipes);
router.get('/:id', getRecipeById);

// Notice validateRecipe is placed BEFORE the controller function.
// Express runs middleware in the order listed - validation happens first,
// and only calls the controller if it passes.
router.post('/', validateRecipe, createRecipe);
router.put('/:id', validateRecipe, updateRecipe);

router.delete('/:id', deleteRecipe);

module.exports = router;