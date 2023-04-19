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
  import { setJobs } from "state";
  import { Link } from "react-router-dom";
  
  const JobWidget = ({
    jobId,
    jobUserId,
    name,
    description,
  }) => {
    const dispatch = useDispatch();
    const [job, setJob] = useState("");
    const { palette } = useTheme();
    const { _id, admin} = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const loggedInUserId = useSelector((state) => state.user._id);
    const main = palette.neutral.main;
    const primary = palette.primary.main;
  
    const deleteJob = async () => {
      
      const response = await fetch(`http://localhost:3001/jobs/delete/${jobId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const jobs = await response.json();
      dispatch(setJobs({ jobs }));
      setJob("");
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
        {admin && (
          <DeleteOutlined 
            disabled={!job}
            onClick={deleteJob}
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
  
  export default JobWidget;