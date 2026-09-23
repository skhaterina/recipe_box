// client/src/App.jsx
import { useState, useEffect } from 'react';
import './App.css';
import RecipeForm from './components/RecipeForm';
import RecipeList from './components/RecipeList';

function App() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/recipes')
      .then(res => res.json())
      .then(data => setRecipes(data))
      .catch(err => console.error('Error fetching recipes:', err));
  }, []);

  function handleAddRecipe(newRecipe) {
    fetch('http://localhost:3000/recipes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newRecipe)
    })
      .then(res => res.json())
      .then(createdRecipe => {
        setRecipes([...recipes, createdRecipe]);
      })
      .catch(err => console.error('Error creating recipe:', err));
  }

  function handleDelete(id) {
    fetch(`http://localhost:3000/recipes/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        setRecipes(recipes.filter(recipe => recipe.id !== id));
      })
      .catch(err => console.error('Error deleting recipe:', err));
  }

  function handleUpdate(id, updatedRecipe) {
    fetch(`http://localhost:3000/recipes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedRecipe)
    })
      .then(res => res.json())
      .then(returnedRecipe => {
        setRecipes(recipes.map(recipe =>
          recipe.id === id ? returnedRecipe : recipe
        ));
      })
      .catch(err => console.error('Error updating recipe:', err));
  }

  return (
    <div className="app-container">
      <h1>My Recipe Box</h1>
      <RecipeForm onAddRecipe={handleAddRecipe} />
      <hr />
      <RecipeList
        recipes={recipes}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
      />
    </div>
  );
}

export default App;