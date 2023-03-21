import React, { useState } from 'react';
import axios from 'axios';

const CommentsForm = ({ pageId }) => {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [user, setUser] = useState({});
  const [comments, setComments] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/comments/create", {
        name: name,
        comment: comment,
        pageId: pageId,
        displayname: user.displayname
      });
      setComments([...comments, response.data]);
      setName('');
      setComment('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="comment">Comment:</label>
        <textarea className="form-control" id="comment" rows="3" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
};

export default CommentsForm;