 // client/src/components/RecipeForm.jsx
import { useState } from 'react';

function RecipeForm({ onAddRecipe }) {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    const newRecipe = {
      title: title,
      ingredients: ingredients.split(',').map(item => item.trim()),
      instructions: instructions
    };

    onAddRecipe(newRecipe);

    setTitle('');
    setIngredients('');
    setInstructions('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title: </label>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>Ingredients (comma-separated): </label>
        <input
          type="text"
          value={ingredients}
          onChange={e => setIngredients(e.target.value)}
        />
      </div>
      <div>
        <label>Instructions: </label>
        <textarea
          value={instructions}
          onChange={e => setInstructions(e.target.value)}
        />
      </div>
      <button type="submit">Add Recipe</button>
    </form>
  );
}

export default RecipeForm;