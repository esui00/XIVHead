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
  import { setEncounters } from "state";
import { mainURL } from "lib/api";
  
  const MyEncounterWidget = () => {
    const dispatch = useDispatch();
    const [encounter, setEncounter] = useState("");
    const { palette } = useTheme();
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const mediumMain = palette.neutral.mediumMain;
    const medium = palette.neutral.medium;
  
    const handleEncounter = async () => {
      const formData = new FormData();
      formData.append("userId", _id);
      formData.append("description", encounter);
  
      const response = await fetch(`${mainURL}/encounters`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const encounters = await response.json();
      dispatch(setEncounters({ encounters }));
      setEncounter("");
    };
  
    return (
      <WidgetWrapper>
        <FlexBetween gap="1.5rem">
          <InputBase
            placeholder="What's on your mind..."
            onChange={(e) => setEncounter(e.target.value)}
            value={encounter}
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
            disabled={!encounter}
            onClick={handleEncounter}
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
  
  export default MyEncounterWidget;