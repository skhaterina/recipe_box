import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/recipes')
      .then(res => res.json())
      .then(data => setRecipes(data))
      .catch(err => console.error('Error fetching recipes:', err));
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    const newRecipe = {
      title: title,
      ingredients: ingredients.split(',').map(item => item.trim()),
      instructions: instructions
    };

    fetch('http://localhost:3000/recipes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newRecipe)
    })
      .then(res => res.json())
      .then(createdRecipe => {
        setRecipes([...recipes, createdRecipe]);
        setTitle('');
        setIngredients('');
        setInstructions('');
      })
      .catch(err => console.error('Error creating recipe:', err));
  }

  return (
    <div className = "app-container">
      <h1>My Recipe Box</h1>

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

      <hr />

      {recipes.map(recipe => (
        <div key={recipe.id} className = "recipe-card">
          <h2>{recipe.title}</h2>
          <p>{recipe.instructions}</p>
        </div>
      ))}
    </div>
  );
}

export default App;