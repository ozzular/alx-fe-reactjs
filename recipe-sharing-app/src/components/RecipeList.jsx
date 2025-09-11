import { Link } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';

const RecipeList = () => {
  const recipes = useRecipeStore(state => state.recipes);
  const filteredRecipes = useRecipeStore(state => state.filteredRecipes);
  const searchTerm = useRecipeStore(state => state.searchTerm);
  const favorites = useRecipeStore(state => state.favorites);
  const addFavorite = useRecipeStore(state => state.addFavorite);
  const removeFavorite = useRecipeStore(state => state.removeFavorite);

  // Use filtered recipes if there's a search term, otherwise show all recipes
  const displayRecipes = searchTerm ? filteredRecipes : recipes;

  return (
    <div style={{ marginTop: '2rem' }}>
      <h2 style={{
        fontSize: '2rem',
        fontWeight: '700',
        color: 'var(--neutral-800)',
        marginBottom: '1.5rem',
        textAlign: 'center',
        fontFamily: 'var(--font-display)'
      }}>
        {searchTerm ? `🔍 Search Results (${displayRecipes.length})` : '🍽️ Recipe Collection'}
      </h2>
      {displayRecipes.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '4rem 2rem',
          background: 'white',
          borderRadius: 'var(--radius-2xl)',
          boxShadow: 'var(--shadow-md)',
          margin: '2rem 0'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>
            {searchTerm ? '🔍' : '📝'}
          </div>
          <h3 style={{
            color: 'var(--neutral-700)',
            fontSize: '1.5rem',
            marginBottom: '0.5rem',
            fontWeight: '600'
          }}>
            {searchTerm ? 'No recipes found' : 'No recipes yet'}
          </h3>
          <p style={{
            color: 'var(--neutral-500)',
            fontSize: '1.1rem',
            maxWidth: '400px',
            margin: '0 auto'
          }}>
            {searchTerm
              ? `No recipes found matching "${searchTerm}". Try a different search term.`
              : 'Start building your recipe collection by adding your first delicious recipe!'
            }
          </p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '2rem',
          marginTop: '2rem'
        }}>
          {displayRecipes.map(recipe => (
            <div key={recipe.id} style={{
              background: 'white',
              borderRadius: 'var(--radius-xl)',
              boxShadow: 'var(--shadow-md)',
              overflow: 'hidden',
              transition: 'all var(--transition-normal)',
              position: 'relative',
              border: '1px solid var(--neutral-200)',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-xl)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'var(--shadow-md)';
            }}>

              {/* Recipe Image Placeholder */}
              <div style={{
                height: '200px',
                background: 'var(--gradient-warm)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '4rem',
                position: 'relative'
              }}>
                🍽️
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    favorites.includes(recipe.id)
                      ? removeFavorite(recipe.id)
                      : addFavorite(recipe.id);
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
                    color: favorites.includes(recipe.id) ? 'var(--accent-red)' : 'var(--neutral-400)',
                    boxShadow: 'var(--shadow-md)',
                    transition: 'all var(--transition-fast)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.1)';
                    e.target.style.boxShadow = 'var(--shadow-lg)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)';
                    e.target.style.boxShadow = 'var(--shadow-md)';
                  }}
                  title={favorites.includes(recipe.id) ? 'Remove from favorites' : 'Add to favorites'}
                >
                  {favorites.includes(recipe.id) ? '❤️' : '🤍'}
                </button>
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
                    onMouseEnter={(e) => e.target.style.color = 'var(--primary-600)'}
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

                <Link
                  to={`/recipe/${recipe.id}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem 1.5rem',
                    background: 'var(--gradient-primary)',
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
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeList;
