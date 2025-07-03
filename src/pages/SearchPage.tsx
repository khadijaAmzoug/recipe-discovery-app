import React from 'react';
import { useLocation } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import RecipeCard from '../components/RecipeCard';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';


interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

interface SearchResponse {
  meals: Meal[] | null;
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SearchPage() {
  const query = useQuery().get('query') || '';
  const { data, loading, error } = useFetch<SearchResponse>(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Search results for: "{query}"</h1>

      {loading && <Spinner />}
      {error && <ErrorMessage message={error} />}

      {loading && <p className="text-lg">Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {!loading && !error && data?.meals === null && (
        <p className="text-gray-600">No recipes found. Try a different search 🔍</p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data?.meals?.map((meal) => (
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

export default SearchPage;
