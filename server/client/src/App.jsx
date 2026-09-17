//pull in function from react library
// special function that connect to react
import { useState, useEffect } from "react";

//defing the componet
// functions that return jsx(html) is a componet
function App(){
    //state returns two things: current value and function to update it
    // takes the first item in array and call it recipes and second item and call it recipes
    //recipes starts empty array
    //setRecipes(newData) = only correct way to update recipes, then re renders screen with updated recipe
const[recipes, setRecipes] = useState([]); //useState creates a state which is a variable which is used between renders and has inital value of empty array
    
    useEffect(() =>{
    fetch('https://localhost:3000/recipes')
    .then(res => res.json())
    .then(data =>setRecipes(data))
    .catch(err => console.error('Error fetching recipes:', err));
},[]);

return(
    <div>
        <h1>My Recipe Box</h1>
        {recipes.map(recipe => (
            <div key={recipe.id}>
                <h2>{recipe.title}</h2>
                <p>{recipe.instructions}</p>
            </div>
        ))}
    </div>
);
}
export default App;
