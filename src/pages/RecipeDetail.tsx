import React from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { useFavorites } from '../contexts/FavoritesContext';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';



interface Recipe {
  idMeal: string;
  strMeal: string;
  strInstructions: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
  [key: string]: any; // allows access to dynamic ingredients
}

interface RecipeResponse {
  meals: Recipe[];
}

function RecipeDetailPage() {
  const { recipeId } = useParams<{ recipeId: string }>();

  const { data, loading, error } = useFetch<RecipeResponse>(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`
  );
    if (loading) return <Spinner />;
    if (error) return <ErrorMessage message={error} />


  const recipe = data?.meals?.[0];

  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

const favorite = recipe && isFavorite(recipe.idMeal);


  if (!recipe) return <p className="text-center text-gray-500">Recipe not found.</p>;

  // Get ingredients + measures
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push(`${ingredient} - ${measure}`);
    }
  }

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{recipe.strMeal}</h1>
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="w-full h-64 object-cover rounded mb-4"
      />
      <button
  onClick={() =>
    favorite
      ? removeFromFavorites(recipe.idMeal)
      : addToFavorites({
          idMeal: recipe.idMeal,
          strMeal: recipe.strMeal,
          strMealThumb: recipe.strMealThumb,
        })
        }
        className={`px-4 py-2 rounded font-semibold text-white ${
            favorite ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
        }`}
        >
        {favorite ? 'Remove from Favorites ❤️' : 'Add to Favorites 🤍'}
        </button>

      <p className="mb-4 text-gray-700"><strong>Category:</strong> {recipe.strCategory}</p>
      <p className="mb-4 text-gray-700"><strong>Area:</strong> {recipe.strArea}</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Ingredients</h2>
      <ul className="list-disc pl-5 mb-4">
        {ingredients.map((item, index) => (
          <li key={index} className="text-gray-800">{item}</li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">Instructions</h2>
      <p className="text-gray-800 whitespace-pre-line">{recipe.strInstructions}</p>
    </div>
  );
}

export default RecipeDetailPage;
