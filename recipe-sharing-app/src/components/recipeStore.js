import { create } from 'zustand'

const useRecipeStore = create((set, get) => ({
  recipes: [],

  // Add a new recipe
  addRecipe: (newRecipe) => set((state) => ({
    recipes: [...state.recipes, { ...newRecipe, id: Date.now() }]
  })),

  // Set all recipes
  setRecipes: (recipes) => set({ recipes }),

  // Update an existing recipe
  updateRecipe: (updatedRecipe) => set((state) => ({
    recipes: state.recipes.map(recipe =>
      recipe.id === updatedRecipe.id ? { ...recipe, ...updatedRecipe } : recipe
    )
  })),

  // Delete a recipe by ID
  deleteRecipe: (recipeId) => set((state) => ({
    recipes: state.recipes.filter(recipe => recipe.id !== recipeId)
  })),

  // Get a recipe by ID (helper function)
  getRecipeById: (recipeId) => {
    const state = get();
    return state.recipes.find(recipe => recipe.id === recipeId);
  }
}));

export default useRecipeStore;
export { useRecipeStore };
