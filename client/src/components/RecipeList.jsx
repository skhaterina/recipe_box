// client/src/components/RecipeList.jsx
import RecipeCard from './RecipeCard';

function RecipeList({ recipes, onDelete, onUpdate }) {
  return (
    <div className="recipe-grid">
      {recipes.map(recipe => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
}

export default RecipeList;