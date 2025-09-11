import { Link } from 'react-router-dom';
import useRecipeStore from './recipeStore';

const RecipeList = () => {
  const recipes = useRecipeStore(state => state.recipes);

  return (
    <div>
      <h2>Recipe List</h2>
      {recipes.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#666', fontSize: '18px' }}>
          No recipes yet. Add your first recipe!
        </p>
      ) : (
        <div>
          {recipes.map(recipe => (
            <div key={recipe.id} style={{
              border: '1px solid #ddd',
              margin: '15px 0',
              padding: '20px',
              borderRadius: '8px',
              backgroundColor: '#f9f9f9',
              transition: 'box-shadow 0.2s ease'
            }}>
              <h3 style={{
                margin: '0 0 10px 0',
                color: '#333'
              }}>
                <Link
                  to={`/recipe/${recipe.id}`}
                  style={{
                    textDecoration: 'none',
                    color: '#007bff',
                    hover: { textDecoration: 'underline' }
                  }}
                >
                  {recipe.title}
                </Link>
              </h3>
              <p style={{
                margin: '0 0 15px 0',
                color: '#666',
                lineHeight: '1.5'
              }}>
                {recipe.description.length > 150
                  ? `${recipe.description.substring(0, 150)}...`
                  : recipe.description
                }
              </p>
              <Link
                to={`/recipe/${recipe.id}`}
                style={{
                  display: 'inline-block',
                  padding: '8px 16px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeList;
