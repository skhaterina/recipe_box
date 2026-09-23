import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');

  const [editingID, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editIngredients, setEditIngredients] = useState('');
  const [editInstructions, setEditInstructions] = useState('');


  // automatically fetches data from a serve when a componet loads on the screen
  useEffect(() => {
    fetch('http://localhost:3000/recipes')
      .then(res => res.json())
      .then(data => setRecipes(data))
      .catch(err => console.error('Error fetching recipes:', err));
  }, []);


//e -event
//.split(,) - array of elements
//item.trim - removes white space
  function handleSubmit(e) {
    e.preventDefault(); //presents page reload or redirection to new URL
    const newRecipe = {
      title: title,
      ingredients: ingredients.split(',').map(item => item.trim()),
      instructions: instructions
    };

    //new data will be saved
    //
    fetch('http://localhost:3000/recipes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newRecipe) // turns into texr
    })
      .then(res => res.json()) //turns response into json
      .then(createdRecipe => {
        setRecipes([...recipes, createdRecipe]);//turned back into json, screen will be update
        setTitle(''); //test boxes clean 
        setIngredients('');
        setInstructions('');
      })
      .catch(err => console.error('Error creating recipe:', err));
  }

  function startEdit(recipe) {
    setEditingId(recipe.id);
    setEditTitle(recipe.title);
    setEditIngredients(recipe.ingredients.join(', '));
    setEditInstructions(recipe.instructions);
  }

  function cancelEdit() {
    setEditingId(null);
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

  function handleUpdate(id) {
    const updatedRecipe = {
      title: editTitle,
      ingredients: editIngredients.split(',').map(item => item.trim()),
      instructions: editInstructions
    };

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
        setEditingId(null);
      })
      .catch(err => console.error('Error updating recipe:', err));
  }

  return (
    <div className="app-container">
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
        <div key={recipe.id} className="recipe-card">
          {editingID === recipe.id ? (
            <>
              <input
                type="text"
                value={editTitle}
                onChange={e => setEditTitle(e.target.value)}
              />
              <input
                type="text"
                value={editIngredients}
                onChange={e => setEditIngredients(e.target.value)}
              />
              <textarea
                value={editInstructions}
                onChange={e => setEditInstructions(e.target.value)}
              />
              <button onClick={() => handleUpdate(recipe.id)}>Save</button>
              <button onClick={cancelEdit}>Cancel</button>
            </>
          ) : (
            <>
              <h2>{recipe.title}</h2>
              <p><strong>Ingredients:</strong> {(recipe.ingredients || []).join(', ')}</p>   
                <p>{recipe.instructions}</p>
                <p><strong>Instructions</strong> {(recipe.ingredients || []).join(', ')}</p>   

              <button onClick={() => startEdit(recipe)}>Edit</button>
              <button onClick={() => handleDelete(recipe.id)}>Delete</button>

              
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default App;