import React from 'react';
import { Link } from 'react-router-dom';

interface RecipeCardProps {
  id: string;
  name: string;
  image: string;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ id, name, image }) => {
  return (
    <Link to={`/recipe/${id}`} className="block">
      <div className="border rounded-lg p-2 shadow hover:shadow-md transition">
        <img
          src={image}
          alt={name}
          className="w-full h-32 object-cover rounded"
        />
        <h2 className="text-center mt-2 font-semibold">{name}</h2>
      </div>
    </Link>
  );
};

export default RecipeCard;
