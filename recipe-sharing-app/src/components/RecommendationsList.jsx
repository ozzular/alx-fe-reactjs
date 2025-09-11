import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';

const RecommendationsList = () => {
  const recommendations = useRecipeStore(state => state.recommendations);
  const generateRecommendations = useRecipeStore(state => state.generateRecommendations);
  const favorites = useRecipeStore(state => state.favorites);
  const addFavorite = useRecipeStore(state => state.addFavorite);

  // Generate recommendations when component mounts or favorites change
  useEffect(() => {
    generateRecommendations();
  }, [favorites.length, generateRecommendations]);

  return (
    <div>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <h2>Recommended for You</h2>
        <button
          onClick={generateRecommendations}
          style={{
            padding: '8px 16px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          Refresh Recommendations
        </button>
      </div>
      
      {recommendations.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#666', fontSize: '16px' }}>
          {favorites.length === 0 
            ? 'Add some recipes to your favorites to get personalized recommendations!'
            : 'No recommendations available right now. Try refreshing or add more favorites!'
          }
        </p>
      ) : (
        <div>
          <p style={{ color: '#666', fontSize: '14px', marginBottom: '15px' }}>
            Based on your {favorites.length} favorite recipe{favorites.length !== 1 ? 's' : ''}
          </p>
          {recommendations.map(recipe => (
            <div key={recipe.id} style={{ 
              border: '1px solid #ddd', 
              margin: '15px 0', 
              padding: '20px', 
              borderRadius: '8px',
              backgroundColor: '#f0f8ff',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                backgroundColor: '#007bff',
                color: 'white',
                padding: '4px 8px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                Recommended
              </div>
              
              <h3 style={{ 
                margin: '0 0 10px 0', 
                color: '#333',
                paddingRight: '120px'
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
              
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
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
                
                {!favorites.includes(recipe.id) && (
                  <button
                    onClick={() => addFavorite(recipe.id)}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: '#ff6b6b',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    ♡ Add to Favorites
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecommendationsList;
