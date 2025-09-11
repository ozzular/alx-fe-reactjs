import { create } from 'zustand'

const useRecipeStore = create((set, get) => ({
  recipes: [],
  searchTerm: '',
  filteredRecipes: [],

  // Search and filtering
  setSearchTerm: (term) => set((state) => {
    const newState = { searchTerm: term };
    // Auto-filter when search term changes
    newState.filteredRecipes = state.recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(term.toLowerCase()) ||
      recipe.description.toLowerCase().includes(term.toLowerCase())
    );
    return newState;
  }),

  filterRecipes: () => set(state => ({
    filteredRecipes: state.recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
      recipe.description.toLowerCase().includes(state.searchTerm.toLowerCase())
    )
  })),

  // Add a new recipe
  addRecipe: (newRecipe) => set((state) => {
    const newRecipes = [...state.recipes, { ...newRecipe, id: Date.now() }];
    // Update filtered recipes when adding new recipe
    const filteredRecipes = newRecipes.filter(recipe =>
      recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
      recipe.description.toLowerCase().includes(state.searchTerm.toLowerCase())
    );
    return {
      recipes: newRecipes,
      filteredRecipes: filteredRecipes
    };
  }),

  // Set all recipes
  setRecipes: (recipes) => set((state) => {
    // Update filtered recipes when setting recipes
    const filteredRecipes = recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
      recipe.description.toLowerCase().includes(state.searchTerm.toLowerCase())
    );
    return {
      recipes,
      filteredRecipes: filteredRecipes
    };
  }),

  // Update an existing recipe
  updateRecipe: (updatedRecipe) => set((state) => {
    const newRecipes = state.recipes.map(recipe =>
      recipe.id === updatedRecipe.id ? { ...recipe, ...updatedRecipe } : recipe
    );
    // Update filtered recipes when updating recipe
    const filteredRecipes = newRecipes.filter(recipe =>
      recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
      recipe.description.toLowerCase().includes(state.searchTerm.toLowerCase())
    );
    return {
      recipes: newRecipes,
      filteredRecipes: filteredRecipes
    };
  }),

  // Delete a recipe by ID
  deleteRecipe: (recipeId) => set((state) => {
    const newRecipes = state.recipes.filter(recipe => recipe.id !== recipeId);
    // Update filtered recipes when deleting recipe
    const filteredRecipes = newRecipes.filter(recipe =>
      recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
      recipe.description.toLowerCase().includes(state.searchTerm.toLowerCase())
    );
    return {
      recipes: newRecipes,
      filteredRecipes: filteredRecipes
    };
  }),

  // Get a recipe by ID (helper function)
  getRecipeById: (recipeId) => {
    const state = get();
    return state.recipes.find(recipe => recipe.id === recipeId);
  }
}));

export default useRecipeStore;
export { useRecipeStore };
