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
import { mainURL } from "lib/api";

const EncounterWidget = ({
  encounterId,
  user,
  name,
  description,
  userId,
  createdAt
}) => {
  const dispatch = useDispatch();
  const [encounter, setEncounter] = useState("");
  const { palette } = useTheme();
  const { _id, admin } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const deleteEncounter = async () => {
    const response = await fetch(`${mainURL}/encounters/delete/${encounterId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    const encounters = await response.json();
    dispatch(setEncounters({ encounters }));
    setEncounter("");
  };

  return (
    <WidgetWrapper m="2rem 0">
      {/* Use Link component to wrap the name */}
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
      <FlexBetween>
      {admin && (
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
    </WidgetWrapper>
  );
};

export default EncounterWidget;