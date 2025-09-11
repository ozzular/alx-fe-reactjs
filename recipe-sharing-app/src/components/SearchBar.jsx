import React from 'react';
import { useRecipeStore } from './recipeStore';

const SearchBar = () => {
  const setSearchTerm = useRecipeStore(state => state.setSearchTerm);
  const searchTerm = useRecipeStore(state => state.searchTerm);

  return (
    <div style={{
      margin: '20px 0',
      textAlign: 'center',
      maxWidth: '600px',
      marginLeft: 'auto',
      marginRight: 'auto'
    }}>
      <div style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
        <input
          type="text"
          placeholder="Search recipes by title or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 50px 12px 16px',
            fontSize: '16px',
            border: '2px solid #ddd',
            borderRadius: '25px',
            outline: 'none',
            transition: 'border-color 0.3s ease',
            boxSizing: 'border-box'
          }}
          onFocus={(e) => e.target.style.borderColor = '#007bff'}
          onBlur={(e) => e.target.style.borderColor = '#ddd'}
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              fontSize: '18px',
              cursor: 'pointer',
              color: '#999',
              padding: '5px'
            }}
            title="Clear search"
          >
            ✕
          </button>
        )}
      </div>
      {searchTerm && (
        <p style={{
          marginTop: '10px',
          color: '#666',
          fontSize: '14px'
        }}>
          Searching for: "{searchTerm}"
        </p>
      )}
    </div>
  );
};

export default SearchBar;
