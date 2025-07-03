import React from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import RecipeCard from '../components/RecipeCard';


interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

interface CategoryMealsResponse {
  meals: Meal[];
}

function CategoryPage() {
  const { categoryName } = useParams<{ categoryName: string }>();

  const { data, loading, error } = useFetch<CategoryMealsResponse>(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`
  );

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Recipes in category: {categoryName}</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data?.meals.map((meal) => (
  <RecipeCard
    key={meal.idMeal}
    id={meal.idMeal}
    name={meal.strMeal}
    image={meal.strMealThumb}
  />
))}

      </div>
    </div>
  );
}

export default CategoryPage;
