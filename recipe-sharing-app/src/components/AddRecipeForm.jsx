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
        id: Date.now(), 
        title: title.trim(), 
        description: description.trim() 
      });
      setTitle('');
      setDescription('');
    }
  };

  return (
    <div>
      <h2>Add New Recipe</h2>
      <form onSubmit={handleSubmit} style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '10px', 
        maxWidth: '400px', 
        margin: '0 auto' 
      }}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Recipe Title"
          required
          style={{ 
            padding: '10px', 
            fontSize: '16px', 
            borderRadius: '4px', 
            border: '1px solid #ccc' 
          }}
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Recipe Description"
          required
          rows="4"
          style={{ 
            padding: '10px', 
            fontSize: '16px', 
            borderRadius: '4px', 
            border: '1px solid #ccc',
            resize: 'vertical'
          }}
        />
        <button 
          type="submit"
          style={{ 
            padding: '12px', 
            fontSize: '16px', 
            backgroundColor: '#007bff', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px', 
            cursor: 'pointer' 
          }}
        >
          Add Recipe
        </button>
      </form>
    </div>
  );
};

export default AddRecipeForm;
