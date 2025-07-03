import React from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

interface CategoriesResponse {
  categories: Category[];
}

function Home() {
  const {
    data,
    loading,
    error,
  } = useFetch<CategoriesResponse>('https://www.themealdb.com/api/json/v1/1/categories.php');

  if (loading) {
    return <p className="text-center text-lg"> Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">An error occurred: {error}</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Recipe Categories</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data?.categories.map((cat) => (
           <Link
            to={`/category/${cat.strCategory}`}
            key={cat.idCategory}
            className="border rounded-lg p-2 shadow hover:shadow-md block"
          >
            <img src={cat.strCategoryThumb} alt={cat.strCategory} className="w-full h-32 object-cover rounded" />
            <h2 className="text-center mt-2 font-semibold">{cat.strCategory}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
