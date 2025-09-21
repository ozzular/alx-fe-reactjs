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
    <div style={{ marginBottom: '3rem' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: '700',
            color: 'var(--neutral-800)',
            margin: '0 0 0.5rem 0',
            fontFamily: 'var(--font-display)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            ✨ Recommended for You
          </h2>
          <p style={{
            color: 'var(--neutral-600)',
            fontSize: '1rem',
            margin: 0
          }}>
            Discover recipes tailored to your taste
          </p>
        </div>
        <button
          onClick={generateRecommendations}
          style={{
            padding: '0.75rem 1.5rem',
            background: 'var(--gradient-primary)',
            color: 'white',
            border: 'none',
            borderRadius: 'var(--radius-lg)',
            cursor: 'pointer',
            fontSize: '0.95rem',
            fontWeight: '500',
            transition: 'all var(--transition-fast)',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-1px)';
            e.target.style.boxShadow = 'var(--shadow-md)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = 'var(--shadow-sm)';
          }}
        >
          🔄 Refresh
        </button>
      </div>
      
      {recommendations.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '3rem 2rem',
          background: 'white',
          borderRadius: 'var(--radius-2xl)',
          boxShadow: 'var(--shadow-md)',
          border: '1px solid var(--neutral-200)'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
            {favorites.length === 0 ? '🤔' : '🔄'}
          </div>
          <h3 style={{
            color: 'var(--neutral-700)',
            fontSize: '1.5rem',
            marginBottom: '0.5rem',
            fontWeight: '600'
          }}>
            {favorites.length === 0 ? 'No recommendations yet' : 'No recommendations available'}
          </h3>
          <p style={{
            color: 'var(--neutral-500)',
            fontSize: '1rem',
            lineHeight: '1.6'
          }}>
            {favorites.length === 0
              ? 'Add some recipes to your favorites to get personalized recommendations!'
              : 'No recommendations available right now. Try refreshing or add more favorites!'
            }
          </p>
        </div>
      ) : (
        <div>
          <div style={{
            background: 'linear-gradient(135deg, var(--secondary-50) 0%, var(--primary-50) 100%)',
            padding: '1rem 1.5rem',
            borderRadius: 'var(--radius-lg)',
            marginBottom: '2rem',
            border: '1px solid var(--primary-200)'
          }}>
            <p style={{
              color: 'var(--neutral-700)',
              fontSize: '1rem',
              margin: 0,
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              🎯 Based on your {favorites.length} favorite recipe{favorites.length !== 1 ? 's' : ''}
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '2rem'
          }}>
            {recommendations.map(recipe => (
            <div key={recipe.id} style={{
              background: 'linear-gradient(145deg, #f0f9ff 0%, #ffffff 100%)',
              borderRadius: 'var(--radius-xl)',
              boxShadow: 'var(--shadow-md)',
              overflow: 'hidden',
              transition: 'all var(--transition-normal)',
              position: 'relative',
              border: '2px solid var(--secondary-200)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-xl)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'var(--shadow-md)';
            }}>

              {/* Recommendation Badge */}
              <div style={{
                position: 'absolute',
                top: '1rem',
                left: '1rem',
                background: 'var(--secondary-500)',
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: 'var(--radius-lg)',
                fontSize: '0.875rem',
                fontWeight: '600',
                zIndex: 2,
                boxShadow: 'var(--shadow-md)'
              }}>
                ✨ Recommended
              </div>

              {/* Recipe Image Placeholder */}
              <div style={{
                height: '200px',
                background: 'linear-gradient(135deg, var(--secondary-200) 0%, var(--secondary-300) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '4rem',
                position: 'relative'
              }}>
                🍽️
                {!favorites.includes(recipe.id) && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addFavorite(recipe.id);
                    }}
                    style={{
                      position: 'absolute',
                      top: '1rem',
                      right: '1rem',
                      background: 'white',
                      border: 'none',
                      borderRadius: '50%',
                      width: '48px',
                      height: '48px',
                      fontSize: '20px',
                      cursor: 'pointer',
                      color: 'var(--neutral-400)',
                      boxShadow: 'var(--shadow-md)',
                      transition: 'all var(--transition-fast)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'scale(1.1)';
                      e.target.style.boxShadow = 'var(--shadow-lg)';
                      e.target.style.color = 'var(--accent-red)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'scale(1)';
                      e.target.style.boxShadow = 'var(--shadow-md)';
                      e.target.style.color = 'var(--neutral-400)';
                    }}
                    title="Add to favorites"
                  >
                    🤍
                  </button>
                )}
              </div>

              {/* Recipe Content */}
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{
                  margin: '0 0 0.75rem 0',
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  color: 'var(--neutral-800)',
                  fontFamily: 'var(--font-display)',
                  lineHeight: '1.3'
                }}>
                  <Link
                    to={`/recipe/${recipe.id}`}
                    style={{
                      textDecoration: 'none',
                      color: 'inherit',
                      transition: 'color var(--transition-fast)'
                    }}
                    onMouseEnter={(e) => e.target.style.color = 'var(--secondary-600)'}
                    onMouseLeave={(e) => e.target.style.color = 'var(--neutral-800)'}
                  >
                    {recipe.title}
                  </Link>
                </h3>

                <p style={{
                  margin: '0 0 1.5rem 0',
                  color: 'var(--neutral-600)',
                  lineHeight: '1.6',
                  fontSize: '0.95rem'
                }}>
                  {recipe.description.length > 120
                    ? `${recipe.description.substring(0, 120)}...`
                    : recipe.description
                  }
                </p>

                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
                  <Link
                    to={`/recipe/${recipe.id}`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.75rem 1.5rem',
                      background: 'linear-gradient(135deg, var(--secondary-500) 0%, var(--secondary-600) 100%)',
                      color: 'white',
                      textDecoration: 'none',
                      borderRadius: 'var(--radius-lg)',
                      fontSize: '0.95rem',
                      fontWeight: '500',
                      transition: 'all var(--transition-fast)',
                      boxShadow: 'var(--shadow-sm)'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-1px)';
                      e.target.style.boxShadow = 'var(--shadow-md)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'var(--shadow-sm)';
                    }}
                  >
                    👀 View Recipe
                  </Link>

                  {!favorites.includes(recipe.id) && (
                    <button
                      onClick={() => addFavorite(recipe.id)}
                      style={{
                        padding: '0.75rem 1.5rem',
                        background: 'linear-gradient(135deg, var(--accent-red) 0%, #dc2626 100%)',
                        color: 'white',
                        border: 'none',
                        borderRadius: 'var(--radius-lg)',
                        cursor: 'pointer',
                        fontSize: '0.95rem',
                        fontWeight: '500',
                        transition: 'all var(--transition-fast)',
                        boxShadow: 'var(--shadow-sm)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'translateY(-1px)';
                        e.target.style.boxShadow = 'var(--shadow-md)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = 'var(--shadow-sm)';
                      }}
                    >
                      ❤️ Add to Favorites
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecommendationsList;
