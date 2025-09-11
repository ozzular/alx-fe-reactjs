import { useState } from 'react';
import useRecipeStore from './recipeStore';

const DeleteRecipeButton = ({ recipeId, recipeName, onSuccess }) => {
  const deleteRecipe = useRecipeStore(state => state.deleteRecipe);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    
    try {
      deleteRecipe(recipeId);
      
      // Simulate a brief delay for better UX
      await new Promise(resolve => setTimeout(resolve, 300));
      
      onSuccess();
    } catch (error) {
      console.error('Error deleting recipe:', error);
    } finally {
      setIsDeleting(false);
      setShowConfirmation(false);
    }
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };

  if (showConfirmation) {
    return (
      <div style={{
        display: 'inline-block',
        padding: '15px',
        border: '1px solid #dc3545',
        borderRadius: '4px',
        backgroundColor: '#f8d7da',
        color: '#721c24'
      }}>
        <p style={{ margin: '0 0 10px 0', fontWeight: 'bold' }}>
          Are you sure you want to delete "{recipeName}"?
        </p>
        <p style={{ margin: '0 0 15px 0', fontSize: '14px' }}>
          This action cannot be undone.
        </p>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            style={{
              padding: '8px 16px',
              backgroundColor: isDeleting ? '#6c757d' : '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: isDeleting ? 'not-allowed' : 'pointer',
              fontSize: '14px'
            }}
          >
            {isDeleting ? 'Deleting...' : 'Yes, Delete'}
          </button>
          <button
            onClick={handleCancel}
            disabled={isDeleting}
            style={{
              padding: '8px 16px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: isDeleting ? 'not-allowed' : 'pointer',
              fontSize: '14px'
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={() => setShowConfirmation(true)}
      style={{
        padding: '10px 20px',
        backgroundColor: '#dc3545',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
      }}
    >
      Delete Recipe
    </button>
  );
};

export default DeleteRecipeButton;
