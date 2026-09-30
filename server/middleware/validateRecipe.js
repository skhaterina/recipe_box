// This middleware checks that incoming recipe data is well-formed
// BEFORE it ever reaches the database. It runs on POST and PUT requests.
// If validation fails, it responds immediately with a 400 error and
// the request never reaches the controller at all.

function validateRecipe(req, res, next) {
  const { title, ingredients, instructions } = req.body;

  const errors = [];

  // Title must exist and be a non-empty string
  if (!title || typeof title !== 'string' || title.trim().length === 0) {
    errors.push('Title is required and must be a non-empty string.');
  }

  // Title shouldn't be absurdly long — protects against someone
  // pasting in a massive block of text meant to abuse the database
  if (title && title.length > 200) {
    errors.push('Title must be under 200 characters.');
  }

  // Ingredients must be an array, and every item in it must be a string
  if (!Array.isArray(ingredients) || ingredients.length === 0) {
    errors.push('Ingredients must be a non-empty array.');
  } else if (!ingredients.every(item => typeof item === 'string')) {
    errors.push('Every ingredient must be a string.');
  }

  // Instructions must exist and be a non-empty string
  if (!instructions || typeof instructions !== 'string' || instructions.trim().length === 0) {
    errors.push('Instructions are required and must be a non-empty string.');
  }

  if (instructions && instructions.length > 5000) {
    errors.push('Instructions must be under 5000 characters.');
  }

  // If any checks failed, stop here and respond with all the errors at once —
  // more helpful to the client than failing on just the first problem found
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  // next() hands control forward to the next thing in the chain —
  // in this case, the actual controller function for the route.
  // If we never call next(), the request just stops here.
  next();
}

module.exports = validateRecipe;