import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
  DeleteOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
}) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const deletePost = async () => {
    
    const response = await fetch(`http://localhost:3001/posts/delete/${postId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  return (
    <WidgetWrapper m="2rem 0">
      <Typography color={primary} sx={{ mt: "1rem" }}>
        {name}
      </Typography>
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      <Divider sx={{ margin: "1.25rem 0" }} />
      <FlexBetween gap="0.25rem">
              <DeleteOutlined sx={{ color: main }} 
                onClick={deletePost}
              />
              <Typography color={main}></Typography>
      </FlexBetween>
    </WidgetWrapper>
    
  );
};

export default PostWidget;