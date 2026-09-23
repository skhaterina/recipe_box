// client/src/components/RecipeCard.jsx
import { useState } from 'react';

function RecipeCard({ recipe, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(recipe.title);
  const [editIngredients, setEditIngredients] = useState(recipe.ingredients.join(', '));
  const [editInstructions, setEditInstructions] = useState(recipe.instructions);

  function startEdit() {
    setEditTitle(recipe.title);
    setEditIngredients(recipe.ingredients.join(', '));
    setEditInstructions(recipe.instructions);
    setIsEditing(true);
  }

  function handleSave() {
    const updatedRecipe = {
      title: editTitle,
      ingredients: editIngredients.split(',').map(item => item.trim()),
      instructions: editInstructions
    };
    onUpdate(recipe.id, updatedRecipe);
    setIsEditing(false);
  }

  return (
  <div className="recipe-card">
    {isEditing ? (
      <>
        <div>
          <label>Title: </label>
          <input
            type="text"
            value={editTitle}
            onChange={e => setEditTitle(e.target.value)}
          />
        </div>

        <div>
          <label>Ingredients (comma-separated): </label>
          <input
            type="text"
            value={editIngredients}
            onChange={e => setEditIngredients(e.target.value)}
          />
        </div>

        <div>
          <label>Instructions: </label>
          <textarea
            value={editInstructions}
            onChange={e => setEditInstructions(e.target.value)}
          />
        </div>

        <button onClick={handleSave}>Save</button>
        <button onClick={() => setIsEditing(false)}>Cancel</button>
      </>
    ) : (
      <>
        <h2>{recipe.title}</h2>
        <p><strong>Ingredients:</strong> {recipe.ingredients.join(', ')}</p>
        <p>{recipe.instructions}</p>
        <button onClick={startEdit}>Edit</button>
        <button onClick={() => onDelete(recipe.id)}>Delete</button>
      </>
    )}
  </div>
);

}

export default RecipeCard;