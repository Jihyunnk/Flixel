import React, { useContext, useState } from 'react';
import { RootContext } from '../context/RootContext';
import defaultPoster from '../defaultPoster.jpeg';
import { BsCameraVideoOff } from 'react-icons/bs';
import { FaTimes, FaRegStar, FaStar } from 'react-icons/fa';
import Modal from '../context/Modal';
import RatingForm from './RatingForm';

function Watched() {
  const { watched, markAsUnwatched, removeFromWatched } =
    useContext(RootContext);

  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState({});

  function handleClick(movie) {
    setSelected(movie);
    setShowModal(true);
  }

  const watchedDisplay = watched.map((movie) => {
    const posterIcon = movie['poster_path']
      ? `https://image.tmdb.org/t/p/w300/${movie['poster_path']}`
      : defaultPoster;

    const ratings = movie.rating
      ? [...Array(Number(movie.rating))].map((e, i) => (
          <FaStar key={i} className="star-rating" />
        ))
      : '';

    return (
      <div key={movie.id} className="list--card rating">
        <div>
          <img src={posterIcon} alt="movie poster" className="list--img" />
          <div className="button--wrapper">
            <button
              className="ctrl--btn"
              onClick={() => markAsUnwatched(movie)}
            >
              <BsCameraVideoOff className="ctrl--icon" />
            </button>
            <button
              className="ctrl--btn"
              onClick={() => removeFromWatched(movie)}
            >
              <FaTimes className="ctrl--icon" />
            </button>
            <button className="ctrl--btn" onClick={() => handleClick(movie)}>
              <FaRegStar className="ctrl--icon" />
            </button>
            {showModal && (
              <Modal onClose={() => setShowModal(false)}>
                <RatingForm selected={selected} setShowModal={setShowModal} />
              </Modal>
            )}
          </div>
        </div>
        {movie.rating && <div className="rating--container">{ratings}</div>}
      </div>
    );
  });

  return (
    <div>
      <div className="watchlist--container">{watchedDisplay}</div>;
    </div>
  );
}

export default Watched;
