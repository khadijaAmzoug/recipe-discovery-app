import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage'; 
import RecipeDetailPage from './pages/RecipeDetail';
import FavoritesPage from './pages/FavoritesPage';
import Navbar from './components/Navbar';
import SearchPage from './pages/SearchPage';




function App() {
  return (
     <>

    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/category/:categoryName" element={<CategoryPage />} />
      <Route path="/recipe/:recipeId" element={<RecipeDetailPage />} />
      <Route path="/favorites" element={<FavoritesPage />} />
      <Route path="/search" element={<SearchPage />} />



    </Routes>
  </>
  );
}

export default App;
