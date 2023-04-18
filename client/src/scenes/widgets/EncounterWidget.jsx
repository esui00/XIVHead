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
  import { setEncounters } from "state";
  import { Link } from "react-router-dom";
  
  const EncounterWidget = ({
    encounterId,
    user,
    name,
    description,
  }) => {
    const dispatch = useDispatch();
    const [encounter, setEncounter] = useState("");
    const { palette } = useTheme();
    const { _id, admin} = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const loggedInUserId = useSelector((state) => state.user._id);
    const main = palette.neutral.main;
    const primary = palette.primary.main;
  
    const deleteEncounter = async () => {
      
      const response = await fetch(`http://localhost:3001/encounters/delete/${encounterId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const encounters = await response.json();
      dispatch(setEncounters({ encounters }));
      setEncounter("");
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
        <>
        <FlexBetween>
          {admin === true && (
            <DeleteOutlined
              disabled={!encounter}
              onClick={deleteEncounter}
              sx={{
                color: palette.main,
                backgroundColor: "red",
                borderRadius: "3rem",
              }}
            />
          )}
        </FlexBetween>
  
        </>
      </WidgetWrapper>
      
    );
  };
  
  export default EncounterWidget;