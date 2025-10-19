import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const RecipeDetail = () => {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    // Load recipe data from JSON file and find the specific recipe by ID
    fetch('/src/data.json')
      .then(response => response.json())
      .then(data => {
        const foundRecipe = data.find(r => r.id === parseInt(id));
        setRecipe(foundRecipe);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading recipe:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading recipe...</div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Recipe Not Found</h1>
          <Link
            to="/"
            className="text-blue-600 hover:text-blue-800 font-semibold"
          >
            ← Back to Recipes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="inline-block mb-6 text-blue-600 hover:text-blue-800 font-semibold"
        >
          ← Back to Recipes
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-64 md:h-80 object-cover"
          />

          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {recipe.title}
            </h1>

            <p className="text-lg text-gray-700 mb-8">
              {recipe.summary}
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Ingredients
                </h2>
                <ul className="space-y-2">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li
                      key={index}
                      className="flex items-start"
                    >
                      <span className="text-blue-600 mr-2">•</span>
                      <span className="text-gray-700">{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Instructions
                </h2>
                <ol className="space-y-3">
                  {recipe.instructions.map((instruction, index) => (
                    <li
                      key={index}
                      className="flex items-start"
                    >
                      <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 flex-shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      <span className="text-gray-700 leading-relaxed">
                        {instruction}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;