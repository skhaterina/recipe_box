// client/src/components/RecipeList.jsx
import RecipeCard from './RecipeCard';

function RecipeList({ recipes, onDelete, onUpdate }) {
  return (
    <>
      {recipes.map(recipe => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </>
  );
}

export default RecipeList;