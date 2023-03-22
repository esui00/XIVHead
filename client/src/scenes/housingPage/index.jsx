import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import {
  Link,
  Box,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import housing from "./ff14-housing.jpg";
import plots from "./HousingDiscordPlots.png";


const HousingPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const { _id } = useSelector((state) => state.user);
  const primaryLight = theme.palette.primary.light;

  useEffect(() => {
    const fetchComments = async () => {
      const response = await fetch("/comments/housingpage");
      const data = await response.json();
      if (response.ok) {
        setComments(data);
      } else {
        console.log("Failed to fetch comments");
      }
    };
    fetchComments();
  }, []);

  const [comments, setComments] = useState([]);

  function handleSubmit(comment) {
    setComments([...comments, comment]);
  }

  return (
    <Box>
      <Navbar />
      <FlexBetween
        display="flex"
        flexDirection="column"
        justifyContent="end"
        alignItems=""
        gap="1rem"
      >
        <Typography variant="h1" sx={{ mb: "1.5rem" }}>
          Housing
        </Typography>
      </FlexBetween>
      <Box
        component="img"
        sx={{
          height: 450,
          width: 1000,
          maxHeight: { xs: 300, md: 800 },
          maxWidth: { xs: 600, md: 1000 },
        }}
        alt="House in FF14"
        src={housing}
      />
      <Typography
        word-wrap="break-word"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Housing in Final Fantasy 14 used to be a massive headache involving
        camping a sign post - spam clicking it for hours on end. Today it is
        made much simpler with the lottery system giving each player a random
        chance to win an available house.
      </Typography>
      <Typography variant="h1">Housing Alert Discord</Typography>
      <Typography fontWeight="500" fontSize="20px">
        <Link href="https://discord.gg/ffxivhousing" target="_blank">
          https://discord.gg/ffxivhousing
        </Link>
      </Typography>
      <Typography sx={{ mt: "1.5rem" }}>
        This discord is best used to find out what houses are available for the
        current lottery! Simply follow the discord's role selection and select
        your Data Center and server. After you select the roles, you will be able
        to see a channel called "servername-plots". In here you can find all
        plots of all sizes that are available to enter the lottery for.{" "}
      </Typography>
      <Box
        component="img"
        sx={{
          height: 150,
          width: 400,
          maxHeight: { xs: 100, md: 150 },
          maxWidth: { xs: 200, md: 400 },
          mb: "1.5rem",
        }}
        alt="discord screenshot"
        src={plots}
      /><Typography variant="h1">Comments</Typography>
<Box sx={{ mt: "2rem" }}>
  {comments.map((comment) => (
    <Box key={comment._id} sx={{ mb: "2rem" }}>
      <Typography variant="h5" fontWeight="bold">
        {comment.name}
      </Typography>
      <Typography sx={{ mt: "0.5rem" }}>{comment.text}</Typography>
    </Box>
  ))}
</Box>

</Box>
);
};

export default HousingPage;