import React, { useContext } from 'react';
import { RootContext } from '../context/RootContext';
import defaultPoster from '../defaultPoster.jpeg';
import { BsCameraVideoOff } from 'react-icons/bs';
import { FaTimes } from 'react-icons/fa';

function Watched() {
  const { watched, markAsUnwatched, removeFromWatched } =
    useContext(RootContext);

  const watchedDisplay = watched.map((movie) => {
    const posterIcon = movie['poster_path']
      ? `https://image.tmdb.org/t/p/w300/${movie['poster_path']}`
      : defaultPoster;

    return (
      <div key={movie.id} className="list--card">
        <img src={posterIcon} alt="movie poster" className="list--img" />
        <div className="button--wrapper">
          <button className="ctrl--btn" onClick={() => markAsUnwatched(movie)}>
            <BsCameraVideoOff className="ctrl--icon" />
          </button>
          <button
            className="ctrl--btn"
            onClick={() => removeFromWatched(movie)}
          >
            <FaTimes className="ctrl--icon" />
          </button>
        </div>
      </div>
    );
  });

  return <div className="watchlist--container">{watchedDisplay}</div>;
}

export default Watched;
