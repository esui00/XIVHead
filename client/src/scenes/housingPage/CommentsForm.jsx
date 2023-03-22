import React, { useState } from 'react';

function CommentsForm({ handleSubmit }) {
  const [comment, setComment] = useState('');

  function handleChange(event) {
    setComment(event.target.value);
  }

  function onSubmit(event) {
    event.preventDefault();
    handleSubmit(comment);
    setComment('');
  }

  return (
    <form onSubmit={onSubmit}>
      <h2>Leave a comment</h2>
      <div>
        <label htmlFor="comment">Comment:</label>
        <input
          type="text"
          id="comment"
          value={comment}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default CommentsForm;