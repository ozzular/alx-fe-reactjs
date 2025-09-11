import React from 'react';
import { useRecipeStore } from './recipeStore';

const SearchBar = () => {
  const setSearchTerm = useRecipeStore(state => state.setSearchTerm);
  const searchTerm = useRecipeStore(state => state.searchTerm);

  return (
    <div style={{
      margin: '2rem 0',
      textAlign: 'center',
      maxWidth: '700px',
      marginLeft: 'auto',
      marginRight: 'auto'
    }}>
      <div style={{
        position: 'relative',
        display: 'inline-block',
        width: '100%',
        marginBottom: searchTerm ? '1rem' : '0'
      }}>
        <div style={{
          position: 'absolute',
          left: '1.25rem',
          top: '50%',
          transform: 'translateY(-50%)',
          fontSize: '1.25rem',
          color: 'var(--neutral-400)',
          pointerEvents: 'none',
          zIndex: 1
        }}>
          🔍
        </div>

        <input
          type="text"
          placeholder="Search for delicious recipes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '1rem 3.5rem 1rem 3.5rem',
            fontSize: '1.1rem',
            border: '2px solid var(--neutral-200)',
            borderRadius: 'var(--radius-2xl)',
            outline: 'none',
            transition: 'all var(--transition-normal)',
            boxSizing: 'border-box',
            background: 'white',
            boxShadow: 'var(--shadow-sm)',
            fontFamily: 'var(--font-sans)',
            color: 'var(--neutral-800)'
          }}
          onFocus={(e) => {
            e.target.style.borderColor = 'var(--primary-500)';
            e.target.style.boxShadow = 'var(--shadow-lg), 0 0 0 3px rgba(245, 158, 11, 0.1)';
            e.target.style.transform = 'translateY(-2px)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = 'var(--neutral-200)';
            e.target.style.boxShadow = 'var(--shadow-sm)';
            e.target.style.transform = 'translateY(0)';
          }}
        />

        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            style={{
              position: 'absolute',
              right: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'var(--neutral-100)',
              border: 'none',
              borderRadius: '50%',
              width: '2rem',
              height: '2rem',
              fontSize: '0.875rem',
              cursor: 'pointer',
              color: 'var(--neutral-500)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all var(--transition-fast)',
              boxShadow: 'var(--shadow-sm)'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'var(--neutral-200)';
              e.target.style.color = 'var(--neutral-700)';
              e.target.style.transform = 'translateY(-50%) scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'var(--neutral-100)';
              e.target.style.color = 'var(--neutral-500)';
              e.target.style.transform = 'translateY(-50%) scale(1)';
            }}
            title="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      {searchTerm && (
        <div style={{
          background: 'white',
          padding: '0.75rem 1.5rem',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-sm)',
          border: '1px solid var(--neutral-200)',
          display: 'inline-block'
        }}>
          <span style={{
            color: 'var(--neutral-600)',
            fontSize: '0.95rem',
            fontWeight: '500'
          }}>
            🔍 Searching for: <span style={{
              color: 'var(--primary-600)',
              fontWeight: '600'
            }}>"{searchTerm}"</span>
          </span>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
