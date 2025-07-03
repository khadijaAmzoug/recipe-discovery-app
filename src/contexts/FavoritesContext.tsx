import React, { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

type Recipe = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

interface FavoritesContextType {
  favorites: Recipe[];
  addToFavorites: (recipe: Recipe) => void;
  removeFromFavorites: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useLocalStorage<Recipe[]>('favorites', []);

  const addToFavorites = (recipe: Recipe) => {
    if (!favorites.find((fav) => fav.idMeal === recipe.idMeal)) {
      setFavorites([...favorites, recipe]);
    }
  };

  const removeFromFavorites = (id: string) => {
    setFavorites(favorites.filter((fav) => fav.idMeal !== id));
  };

  const isFavorite = (id: string) => {
    return favorites.some((fav) => fav.idMeal === id);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addToFavorites, removeFromFavorites, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

// custom hook
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error('useFavorites must be used within a FavoritesProvider');
  return context;
};
