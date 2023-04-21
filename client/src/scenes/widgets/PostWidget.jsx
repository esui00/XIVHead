import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import { Link } from "react-router-dom";

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  userId,
  createdAt
}) => {
  const dispatch = useDispatch();
  const [post, setPost] = useState("");
  const { palette } = useTheme();
  const { _id, admin} = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const main = palette.neutral.main;
  const primary = palette.primary.main;
  


  const deletePost = async () => {
    
    const response = await fetch(`http://localhost:3001/posts/delete/${postId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    const posts = await response.json();
    dispatch(setPosts({ posts }));
    setPost("");
  };


  return (
    <WidgetWrapper m="2rem 0">
      <Link to={`/profile/${userId}`}>
  <Typography color={primary} sx={{ mt: "1rem" }}>
    {name}
  </Typography>
</Link>
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      <Typography>{createdAt}</Typography>
      <Divider sx={{ margin: "1.25rem 0" }} />
      <>
      <FlexBetween>
        {admin &&(
        <DeleteOutlined
          disabled={!post}
          onClick={deletePost}
          sx={{
            color: palette.main,
            backgroundColor: "red",
            borderRadius: "3rem",
          }}
        >
        </DeleteOutlined>
        )}
      </FlexBetween>

      </>
    </WidgetWrapper>
    
  );
};

export default PostWidget;