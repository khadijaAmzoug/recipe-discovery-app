import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const linkClass = (path: string) =>
    `px-4 py-2 rounded font-medium transition ${
      pathname === path
        ? 'bg-blue-600 text-white'
        : 'text-gray-700 hover:bg-gray-200'
    }`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
    }
  };

  return (
    <nav className="bg-white shadow-md p-4 flex flex-wrap justify-between items-center mb-6">
      <h1 className="text-xl font-bold text-blue-700">🍽️ Recipe App</h1>
      <div className="flex items-center space-x-4">
        <Link to="/" className={linkClass('/')}>
          Home
        </Link>
        <Link to="/favorites" className={linkClass('/favorites')}>
          Favorites
        </Link>
        <Link to="/search" className={linkClass('/search')}>
          Search
        </Link>
        <form onSubmit={handleSubmit} className="ml-4">
          <input
            type="text"
            placeholder="Search recipes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-1 border rounded w-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
