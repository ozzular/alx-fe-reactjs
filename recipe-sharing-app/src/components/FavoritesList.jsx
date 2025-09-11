import { Link } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';

const FavoritesList = () => {
  const favorites = useRecipeStore(state => state.favorites.map(id =>
    state.recipes.find(recipe => recipe.id === id)
  ).filter(recipe => recipe !== undefined)); // Filter out any undefined recipes
  
  const removeFavorite = useRecipeStore(state => state.removeFavorite);

  return (
    <div>
      <h2>My Favorites</h2>
      {favorites.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#666', fontSize: '16px' }}>
          No favorite recipes yet. Start adding some recipes to your favorites!
        </p>
      ) : (
        <div>
          {favorites.map(recipe => (
            <div key={recipe.id} style={{ 
              border: '1px solid #ddd', 
              margin: '15px 0', 
              padding: '20px', 
              borderRadius: '8px',
              backgroundColor: '#fff8e1',
              position: 'relative'
            }}>
              <button
                onClick={() => removeFavorite(recipe.id)}
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  background: 'none',
                  border: 'none',
                  fontSize: '20px',
                  cursor: 'pointer',
                  color: '#ff6b6b',
                  padding: '5px'
                }}
                title="Remove from favorites"
              >
                ♥
              </button>
              
              <h3 style={{ 
                margin: '0 0 10px 0', 
                color: '#333',
                paddingRight: '40px'
              }}>
                <Link 
                  to={`/recipe/${recipe.id}`}
                  style={{
                    textDecoration: 'none',
                    color: '#007bff'
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
                View Recipe
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesList;
