import React, { useState, useContext, useEffect } from 'react';
import { RootContext } from '../context/RootContext';
import defaultPoster from '../defaultPoster.jpeg';
import { useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';

function SearchResults() {
  const { addToWatchlist } = useContext(RootContext);

  const navigate = useNavigate();

  const [popular, setPopular] = useState([]);

  useEffect(() => {
    const popularList = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=6c95b5c8fd99ea472bb06ae3c2004c44&language=en-US&page=1`
      );
      const data = await res.json();
      console.log('popular movies data: ', data.results);
      setPopular(data.results);
    };
    popularList();
  }, []);

  function handleClick(movie) {
    addToWatchlist(movie);
    navigate('/');
  }

  const displayPopular = popular.map((movie) => {
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
      <div className="results--text">
        Current popular movies on TMDB. This list updates daily.
      </div>
      <div className="results--container">{displayPopular}</div>
    </div>
  );
}

export default SearchResults;
