import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";

const CommentsForm = ({ setComments }) => {
  const [comment, setComment] = useState("");
  const [commentText, setCommentText] = useState("");
  const [commentName, setCommentName] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:3001/comments/create', {
        commentName,
        commentText,
      });
      setCommentName("");
      setCommentText("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        id="comment-field"
        label="Add a comment"
        value={comment}
        onChange={(event) => setComment(event.target.value)}
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <Button variant="contained" type="submit">
        Submit
      </Button>
    </form>
  );
};

export default CommentsForm;