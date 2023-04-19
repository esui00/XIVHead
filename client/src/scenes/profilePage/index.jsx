import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@mui/icons-material";
import { Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";


const ProfilePage = () => {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const { _id, admin} = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  const deleteUser = async () => {
    const response = await fetch(`http://localhost:3001/users/delete/${_id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    const result = await response.json();
    dispatch(setUser(result));
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <Box m="2rem 0" />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <Box m="2rem 0" />
          <Box fontSize="2rem" fontWeight="bold" mb="1rem">
            {user.displayName} 
          </Box>
        </Box>
        <Divider sx={{ margin: "1.25rem 0" }} />
        <FlexBetween>
        {admin && (
          <DeleteOutlined 
            disabled={!user}
            onClick={deleteUser}
            sx={{
              color: palette.main,
              backgroundColor: "red",
              borderRadius: "3rem",
            }}
          />
        )}
        </FlexBetween>
      </Box>
    </Box>
  );
};

export default ProfilePage;