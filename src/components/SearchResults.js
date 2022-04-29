import React, { useContext } from 'react';
import { RootContext } from '../context/RootContext';
import defaultPoster from '../defaultPoster.jpeg';
import { useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';

function SearchResults() {
  const { searchTerm, setSearchTerm, results, addToWatchlist } =
    useContext(RootContext);

  const navigate = useNavigate();

  function handleClick(movie) {
    addToWatchlist(movie);
    setSearchTerm('');
    navigate('/');
  }

  const displayResults = results.map((movie) => {
    const posterIcon = movie['poster_path']
      ? `https://image.tmdb.org/t/p/w300/${movie['poster_path']}`
      : defaultPoster;

    return (
      <div key={movie.id} className="movie--card">
        <img src={posterIcon} alt="movie poster" className="movie--img" />
        <div className="movie--title">{movie.title}</div>
        <div className="movie--description">{movie.overview}</div>

        <button className="addBtn" onClick={() => handleClick(movie)}>
          <FaPlus />
        </button>
      </div>
    );
  });

  return (
    <div>
      {displayResults.length === 0 ? (
        <div className="no--results">{`No results for "${searchTerm}"`}</div>
      ) : (
        <div>
          <div className="results--text">Search results for "{searchTerm}"</div>
          <div className="results--container">{displayResults}</div>
        </div>
      )}
    </div>
  );
}

export default SearchResults;
