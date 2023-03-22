import React, { useState } from 'react';
import axios from 'axios';

const CommentsForm = ({ postId, refreshComments }) => {
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/comments/create', {
        postId,
        comment,
      });
      setComment('');
      refreshComments();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <textarea
          className="form-control"
          placeholder="Write a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default CommentsForm;