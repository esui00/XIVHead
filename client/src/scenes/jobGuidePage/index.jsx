import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import { Link,Box, Typography,useTheme, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import jobs from "./jobs.jpg";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import MyJobWidget from "scenes/widgets/MyJobWidget";
import JobsWidget from "scenes/widgets/JobsWidget";

const JobGuidePage = () =>{
    const theme = useTheme();
    const navigate = useNavigate();
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const {_id} = useSelector((state) => state.user); 
    const primaryLight = theme.palette.primary.light;


    return(
        <Box>
            <Navbar/>   
            <FlexBetween display = "flex" flexDirection = "column" justifyContent = "end" alignItems = "" gap = "1rem" >
        </FlexBetween>  
        <Typography variant = "h1" sx = {{ mb : "1.5rem"}}>Job Guides</Typography>
        <Box
            component = "img"
            sx ={{
                height: 450,
                width: 1000,
                maxHeight: { xs: 300, md: 800},
                maxWidth: {xs: 600, md: 1000},
            }} 
            alt = "Job Icons"
            src = {jobs}
         />
        <Typography word-wrap = "break-word" fontWeight = "500"  sx = {{mb: "1.5rem"}}>
            Currently, there are four tanks, four healers, three ranged dps, three caster dps, and five melee dps. Final Fantasy 14 is a very balanced game, but to achieve this, most jobs play very similarly or share similar features. If you can get good at one job, you can probably get good at all the others. But, you probbaly need a proper guide for optimal play.
        </Typography>
        <Typography variant = "h1">The Balance Discord</Typography>
        <Typography fontWeight = "500" fontSize = "20px">
             <Link href= "https://discord.gg/thebalanceffxiv" target = "blank">https://discord.gg/thebalanceffxiv</Link>
        </Typography>
        <Typography sx = {{mt: "1.5rem"}}>The Balance discord channel will be the best place to find up to date beginner info and even advanced tech about any jobs. Each job will have a section explaining the best stats, gear, and consumables. Then each job will also have a section dedicated to showing you the best opener combo and cooldown bursts. Inbetween these bursts you will find a section telling you the optimal way to spend your resources or do your rotation. </Typography>
        <Typography variant = "h1" sx = {{mt: "1.5rem"}}>Youtube</Typography>
        <Typography fontWeight = "500" fontSize = "20px">
            <Link href= "https://www.youtube.com/@XenosysVex" target="blank" underline="hover" >https://www.youtube.com/@XenosysVex</Link>
        </Typography>
        <Typography sx = {{mt: "1.5rem"}}>While The Balance will be more up to date, sometimes specific youtubers who specialize in a job can be more thorough in providing a guide in video format. The biggest issue with youtube video guides - is that they are quickly outdated. It is way harder to re-record and edit a whole 10-20 minute video than it is to edit a text section in a discord. Despite this, if you are actively learning at a time an expert releases their guide, this guide can be the best resource you find. Some standouts are Xenosys Vex for all Tank content, WeskAlber for general guides on all jobs, and many more. </Typography>
            <Box
                width = "100%"
                padding = "2rem 6%"
                display = {isNonMobileScreens ? "flex" : "block"}
                gap = "0.5rem"
                justifyContent = "space-between"
            >
                
                <Box flexBasis= {isNonMobileScreens ? "26%" : undefined}>
                    
                </Box>
                <Box flexBasis= {isNonMobileScreens ? "42%" : undefined}
                    mt = {isNonMobileScreens? undefined: "2rem"}
                >
                </Box>

            </Box>
            <MyJobWidget></MyJobWidget>
            <JobsWidget></JobsWidget>
        </Box>
    );
};

export default JobGuidePage;