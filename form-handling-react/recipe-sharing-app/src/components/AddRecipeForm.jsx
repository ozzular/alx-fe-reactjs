import { useState } from 'react';
import useRecipeStore from './recipeStore';

const AddRecipeForm = () => {
  const addRecipe = useRecipeStore(state => state.addRecipe);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (title.trim() && description.trim()) {
      addRecipe({
        title: title.trim(),
        description: description.trim()
      });
      setTitle('');
      setDescription('');
    }
  };

  return (
    <div style={{
      background: 'white',
      borderRadius: 'var(--radius-2xl)',
      padding: '2.5rem',
      boxShadow: 'var(--shadow-lg)',
      border: '1px solid var(--neutral-200)',
      maxWidth: '600px',
      margin: '0 auto 3rem auto'
    }}>
      <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
        <div style={{
          width: '80px',
          height: '80px',
          backgroundColor: 'var(--primary-100)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto var(--space-4) auto',
          color: 'var(--primary)'
        }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2v20M2 12h20"></path>
          </svg>
        </div>
        <h2 style={{
          fontSize: 'var(--text-2xl)',
          fontWeight: '700',
          color: 'var(--gray-800)',
          margin: '0 0 var(--space-2) 0',
          fontFamily: 'var(--font-family-display)'
        }}>
          Share Your Recipe
        </h2>
        <p style={{
          color: 'var(--gray-600)',
          fontSize: 'var(--text-base)',
          margin: 0
        }}>
          Add a delicious recipe to share with the community
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem'
      }}>
        <div>
          <label style={{
            display: 'block',
            fontSize: '1rem',
            fontWeight: '600',
            color: 'var(--neutral-700)',
            marginBottom: '0.5rem'
          }}>
            Recipe Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Grandma's Chocolate Chip Cookies"
            required
            style={{
              width: '100%',
              padding: '1rem',
              fontSize: '1rem',
              borderRadius: 'var(--radius-lg)',
              border: '2px solid var(--neutral-200)',
              outline: 'none',
              transition: 'all var(--transition-normal)',
              fontFamily: 'var(--font-sans)',
              boxSizing: 'border-box'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'var(--primary-500)';
              e.target.style.boxShadow = '0 0 0 3px rgba(245, 158, 11, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'var(--neutral-200)';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>

        <div>
          <label style={{
            display: 'block',
            fontSize: '1rem',
            fontWeight: '600',
            color: 'var(--neutral-700)',
            marginBottom: '0.5rem'
          }}>
            Recipe Description & Instructions
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Share the ingredients, cooking steps, and any special tips..."
            required
            rows="6"
            style={{
              width: '100%',
              padding: '1rem',
              fontSize: '1rem',
              borderRadius: 'var(--radius-lg)',
              border: '2px solid var(--neutral-200)',
              resize: 'vertical',
              outline: 'none',
              transition: 'all var(--transition-normal)',
              fontFamily: 'var(--font-sans)',
              lineHeight: '1.6',
              boxSizing: 'border-box'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'var(--primary-500)';
              e.target.style.boxShadow = '0 0 0 3px rgba(245, 158, 11, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'var(--neutral-200)';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: '1rem 2rem',
            fontSize: '1.1rem',
            fontWeight: '600',
            background: 'var(--gradient-primary)',
            color: 'white',
            border: 'none',
            borderRadius: 'var(--radius-lg)',
            cursor: 'pointer',
            transition: 'all var(--transition-normal)',
            boxShadow: 'var(--shadow-md)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            margin: '1rem auto 0 auto',
            minWidth: '200px'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = 'var(--shadow-lg)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = 'var(--shadow-md)';
          }}
        >
          Add Recipe
        </button>
      </form>
    </div>
  );
};

export default AddRecipeForm;
