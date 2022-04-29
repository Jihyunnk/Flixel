import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RootContext } from '../context/RootContext';
import { FaFilm, FaSearch } from 'react-icons/fa';

function Navbar() {
  const { query, setQuery, searchMovie } = useContext(RootContext);
  const navigate = useNavigate();

  function handleSubmit(e) {
    searchMovie(e);
    setQuery('');
    navigate('/search');
  }

  return (
    <nav className="nav--container">
      <Link to="/" className="logo--container">
        <FaFilm className="logo" />
        <div>FLIXEL</div>
      </Link>
      <Link to="/discover" className="watchlist link">
        Discover
      </Link>
      <Link to="/" className="link">
        My List
      </Link>
      <Link to="/watched" className="link">
        Watched
      </Link>
      <form onSubmit={handleSubmit}>
        <button className="search-icon">
          <FaSearch />
        </button>
        <input
          type="text"
          placeholder="Search movie"
          value={query}
          className="search"
          onChange={(e) => setQuery(e.target.value)}
        ></input>
      </form>
    </nav>
  );
}

export default Navbar;
