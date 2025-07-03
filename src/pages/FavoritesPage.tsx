import React from 'react';
import { useFavorites } from '../contexts/FavoritesContext';
import RecipeCard from '../components/RecipeCard';

function FavoritesPage() {
  const { favorites } = useFavorites();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Favorite Recipes</h1>

      {favorites.length === 0 ? (
        <p className="text-gray-600 text-lg">
          You haven't added any recipes yet. Go explore and add some! 🍽️
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {favorites.map((meal) => (
            <RecipeCard
              key={meal.idMeal}
              id={meal.idMeal}
              name={meal.strMeal}
              image={meal.strMealThumb}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default FavoritesPage;
