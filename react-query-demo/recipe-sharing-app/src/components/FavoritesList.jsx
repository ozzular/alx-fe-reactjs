import { Link } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';

const FavoritesList = () => {
  const favorites = useRecipeStore(state => state.favorites.map(id =>
    state.recipes.find(recipe => recipe.id === id)
  ).filter(recipe => recipe !== undefined)); // Filter out any undefined recipes
  
  const removeFavorite = useRecipeStore(state => state.removeFavorite);

  return (
    <div style={{ padding: '2rem 0' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>❤️</div>
        <h2 style={{
          fontSize: '2.5rem',
          fontWeight: '700',
          color: 'var(--neutral-800)',
          margin: '0 0 0.5rem 0',
          fontFamily: 'var(--font-display)'
        }}>
          My Favorite Recipes
        </h2>
        <p style={{
          color: 'var(--neutral-600)',
          fontSize: '1.2rem',
          margin: 0
        }}>
          Your personal collection of beloved recipes
        </p>
      </div>

      {favorites.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '4rem 2rem',
          background: 'white',
          borderRadius: 'var(--radius-2xl)',
          boxShadow: 'var(--shadow-md)',
          margin: '2rem auto',
          maxWidth: '500px'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>💔</div>
          <h3 style={{
            color: 'var(--neutral-700)',
            fontSize: '1.5rem',
            marginBottom: '1rem',
            fontWeight: '600'
          }}>
            No favorites yet
          </h3>
          <p style={{
            color: 'var(--neutral-500)',
            fontSize: '1.1rem',
            lineHeight: '1.6',
            marginBottom: '2rem'
          }}>
            Start exploring recipes and click the heart icon to add them to your favorites!
          </p>
          <Link
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '1rem 2rem',
              background: 'var(--gradient-primary)',
              color: 'white',
              textDecoration: 'none',
              borderRadius: 'var(--radius-lg)',
              fontSize: '1rem',
              fontWeight: '500',
              transition: 'all var(--transition-fast)',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            🏠 Browse Recipes
          </Link>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '2rem',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {favorites.map(recipe => (
            <div key={recipe.id} style={{
              background: 'linear-gradient(145deg, #fff5f5 0%, #ffffff 100%)',
              borderRadius: 'var(--radius-xl)',
              boxShadow: 'var(--shadow-md)',
              overflow: 'hidden',
              transition: 'all var(--transition-normal)',
              position: 'relative',
              border: '2px solid #fecaca'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-xl)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'var(--shadow-md)';
            }}>

              {/* Favorite Badge */}
              <div style={{
                position: 'absolute',
                top: '1rem',
                left: '1rem',
                background: 'var(--accent-red)',
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: 'var(--radius-lg)',
                fontSize: '0.875rem',
                fontWeight: '600',
                zIndex: 2,
                boxShadow: 'var(--shadow-md)'
              }}>
                ❤️ Favorite
              </div>

              {/* Recipe Image Placeholder */}
              <div style={{
                height: '200px',
                background: 'linear-gradient(135deg, #fecaca 0%, #f87171 100%)',
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
                    removeFavorite(recipe.id);
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
                    color: 'var(--accent-red)',
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
                  title="Remove from favorites"
                >
                  💔
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
                    onMouseEnter={(e) => e.target.style.color = 'var(--accent-red)'}
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
                    background: 'linear-gradient(135deg, var(--accent-red) 0%, #dc2626 100%)',
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
                  ❤️ View Recipe
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesList;
