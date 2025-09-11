import { create } from 'zustand'

const useRecipeStore = create((set, get) => ({
  recipes: [],
  searchTerm: '',
  filteredRecipes: [],
  favorites: [],
  recommendations: [],

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
  },

  // Favorites functionality
  addFavorite: (recipeId) => set(state => ({
    favorites: [...state.favorites, recipeId]
  })),

  removeFavorite: (recipeId) => set(state => ({
    favorites: state.favorites.filter(id => id !== recipeId)
  })),

  // Helper function to check if a recipe is favorited
  isFavorite: (recipeId) => {
    const state = get();
    return state.favorites.includes(recipeId);
  },

  // Recommendations functionality
  generateRecommendations: () => set(state => {
    // Enhanced recommendation algorithm
    if (state.favorites.length === 0) {
      // If no favorites, recommend random recipes
      const shuffled = [...state.recipes].sort(() => Math.random() - 0.5);
      return { recommendations: shuffled.slice(0, 3) };
    }

    // Get favorite recipes to analyze
    const favoriteRecipes = state.favorites.map(id =>
      state.recipes.find(recipe => recipe.id === id)
    ).filter(recipe => recipe !== undefined);

    // Simple content-based filtering: recommend recipes with similar words
    const recommendations = state.recipes.filter(recipe => {
      // Don't recommend recipes that are already favorites
      if (state.favorites.includes(recipe.id)) return false;

      // Check if recipe shares keywords with favorites
      const recipeWords = (recipe.title + ' ' + recipe.description).toLowerCase().split(/\s+/);
      const favoriteWords = favoriteRecipes.flatMap(fav =>
        (fav.title + ' ' + fav.description).toLowerCase().split(/\s+/)
      );

      // Count common words (excluding common stop words)
      const stopWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by'];
      const commonWords = recipeWords.filter(word =>
        word.length > 3 &&
        !stopWords.includes(word) &&
        favoriteWords.includes(word)
      );

      return commonWords.length > 0;
    });

    // Shuffle and limit recommendations
    const shuffled = recommendations.sort(() => Math.random() - 0.5);
    return { recommendations: shuffled.slice(0, 4) };
  })
}));

export default useRecipeStore;
export { useRecipeStore };
