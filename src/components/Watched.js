import React, { useContext, useState } from 'react';
import { RootContext } from '../context/RootContext';
import defaultPoster from '../defaultPoster.jpeg';
import { BsCameraVideoOff } from 'react-icons/bs';
import { FaTimes, FaRegStar } from 'react-icons/fa';
import Modal from '../context/Modal';
import RatingForm from './RatingForm';

function Watched() {
  const { watched, markAsUnwatched, removeFromWatched } =
    useContext(RootContext);

  const [showModal, setShowModal] = useState(false);

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
          <button className="ctrl--btn" onClick={() => setShowModal(true)}>
            <FaRegStar className="ctrl--icon" />
          </button>
          {showModal && (
            <Modal onClose={() => setShowModal(false)}>
              <RatingForm selected={movie} />
            </Modal>
          )}
        </div>
      </div>
    );
  });

  return (
    <div>
      <div className="watchlist--container">{watchedDisplay}</div>;
      {/* {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <RatingForm selected={selected} />
        </Modal>
      )} */}
    </div>
  );
}

export default Watched;
