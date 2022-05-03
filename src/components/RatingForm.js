import React, { useState, useContext } from 'react';
import { RootContext } from '../context/RootContext';

function RatingForm({ selected, setShowModal }) {
  const { saveRating } = useContext(RootContext);

  const [rating, setRating] = useState(5);

  function handleSubmit(e) {
    e.preventDefault();
    saveRating(selected, rating);
    setShowModal(false);
  }

  return (
    <form onSubmit={handleSubmit} className="form--container">
      <div className="form">
        <label htmlFor="rating">Rating</label>
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        ></input>
      </div>
      <button className="form--button">Save Rating</button>
    </form>
  );
}

export default RatingForm;
