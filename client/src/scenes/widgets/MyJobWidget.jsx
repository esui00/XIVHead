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
import { setJobs } from "state";
import { mainURL } from "lib/api";

const MyJobWidget = () => {
  const dispatch = useDispatch();
  const [job, setJob] = useState("");
  const { palette } = useTheme();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  const handleJob = async () => {

    const data = {
      userId: _id,
      description: job,
    }

    const response = await fetch(`${mainURL}/jobs`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const jobs = await response.json();
    dispatch(setJobs({ jobs }));
    setJob("");
  };

  return (
    <WidgetWrapper>
      <FlexBetween gap="1.5rem">
        <InputBase
          placeholder="What's on your mind..."
          onChange={(e) => setJob(e.target.value)}
          value={job}
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
          disabled={!job}
          onClick={handleJob}
          sx={{
            color: palette.background.main,
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

export default MyJobWidget;
