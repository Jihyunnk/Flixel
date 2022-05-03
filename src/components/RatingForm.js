import React, { useState } from 'react';

function RatingForm() {
  const [rating, setRating] = useState(5);

  console.log(rating);

  function handleSubmit(e) {
    e.preventDefault();
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
