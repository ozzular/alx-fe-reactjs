import { useState } from 'react';
import useRecipeStore from './recipeStore';

const EditRecipeForm = ({ recipe, onSuccess, onCancel }) => {
  const updateRecipe = useRecipeStore(state => state.updateRecipe);
  const [title, setTitle] = useState(recipe.title);
  const [description, setDescription] = useState(recipe.description);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (title.trim() && description.trim()) {
      setIsSubmitting(true);
      
      try {
        updateRecipe({
          id: recipe.id,
          title: title.trim(),
          description: description.trim()
        });
        
        // Simulate a brief delay for better UX
        await new Promise(resolve => setTimeout(resolve, 300));
        
        onSuccess();
      } catch (error) {
        console.error('Error updating recipe:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div>
      <h2>Edit Recipe</h2>
      <form onSubmit={handleSubmit} style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '15px', 
        maxWidth: '600px'
      }}>
        <div>
          <label htmlFor="title" style={{ 
            display: 'block', 
            marginBottom: '5px', 
            fontWeight: 'bold',
            color: '#333'
          }}>
            Recipe Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter recipe title"
            required
            disabled={isSubmitting}
            style={{ 
              width: '100%',
              padding: '12px', 
              fontSize: '16px', 
              borderRadius: '4px', 
              border: '1px solid #ccc',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div>
          <label htmlFor="description" style={{ 
            display: 'block', 
            marginBottom: '5px', 
            fontWeight: 'bold',
            color: '#333'
          }}>
            Recipe Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter recipe description, ingredients, and instructions"
            required
            rows="8"
            disabled={isSubmitting}
            style={{ 
              width: '100%',
              padding: '12px', 
              fontSize: '16px', 
              borderRadius: '4px', 
              border: '1px solid #ccc',
              resize: 'vertical',
              boxSizing: 'border-box'
            }}
          />
        </div>
        
        <div style={{ 
          display: 'flex', 
          gap: '10px', 
          justifyContent: 'flex-start',
          flexWrap: 'wrap'
        }}>
          <button 
            type="submit"
            disabled={isSubmitting || !title.trim() || !description.trim()}
            style={{ 
              padding: '12px 24px', 
              fontSize: '16px', 
              backgroundColor: isSubmitting ? '#6c757d' : '#28a745', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px', 
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              opacity: isSubmitting || !title.trim() || !description.trim() ? 0.6 : 1
            }}
          >
            {isSubmitting ? 'Updating...' : 'Update Recipe'}
          </button>
          
          <button 
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            style={{ 
              padding: '12px 24px', 
              fontSize: '16px', 
              backgroundColor: '#6c757d', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px', 
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              opacity: isSubmitting ? 0.6 : 1
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditRecipeForm;
