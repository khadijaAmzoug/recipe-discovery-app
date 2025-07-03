import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';


import { BrowserRouter } from 'react-router-dom';
import { FavoritesProvider } from './contexts/FavoritesContext';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <FavoritesProvider>
      <App />
    </FavoritesProvider>
    </BrowserRouter>
  </React.StrictMode>
);
