import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Dropzone from "react-dropzone";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRelics } from "state";
import { mainURL } from "lib/api";

const MyRelicWidget = () => {
  const dispatch = useDispatch();
  const [relic, setRelic] = useState("");
  const { palette } = useTheme();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  const handleRelic = async () => {
    
    const data = {
      userId: _id,
      description: relic,
    };

    const response = await fetch(`${mainURL}/relics`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const relics = await response.json();
    dispatch(setRelics({ relics }));
    setRelic("");
  };

  return (
    <WidgetWrapper>
      <FlexBetween gap="1.5rem">
        <InputBase
          placeholder="What's on your mind..."
          onChange={(e) => setRelic(e.target.value)}
          value={relic}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
      </FlexBetween>

      <FlexBetween>
        <Button
          disabled={!relic}
          onClick={handleRelic}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
          }}
        >
          POST
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default MyRelicWidget;
