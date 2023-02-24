import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import { Link,Box, Typography,useTheme, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import carbuncle from "./carbuncle.jpg";

const EncounterPage = () =>{
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
        <Typography variant = "h1" sx = {{ mb : "1.5rem"}}>Encounters</Typography>
        <Box
            component = "img"
            sx ={{
                height: 450,
                width: 1000,
                maxHeight: { xs: 300, md: 800},
                maxWidth: {xs: 600, md: 1000},
            }} 
            alt = "carbuncle"
            src = {carbuncle}
         />
        <Typography word-wrap = "break-word" fontWeight = "500"  sx = {{mb: "1.5rem"}}>
            Endwalker is currently the 4th expansion in Final Fantasy 14. Every single expansion released some sort of raid encounter, many still being relevant such as the Ultimates. This page will try to provide some resources on the most relevant encounters (encounters you can solo or easily kill with a small group).
        </Typography>
        <Typography variant = "h1">The Balance Discord</Typography>
        <Typography fontWeight = "500" fontSize = "20px">
             <Link href= "https://discord.gg/thebalanceffxiv" target = "blank">https://discord.gg/thebalanceffxiv</Link>
        </Typography>
        <Typography sx = {{mt: "1.5rem"}}>If you have already seen the job page, then you will have seen this resource reccomendation. The balance is an amazing resource for FF14. Alongside their job guides, there are dedicated sections to encounters. You can find up to date guides created by people who personally cleared these encounters. Also, because of discord's forum-like format, you will be able to "ctrl-f" or even ask in a chat about specific guides/strats/tips for any boss. </Typography>
        <Typography variant = "h1" sx = {{mt: "1.5rem"}}>Youtube</Typography>
        <Typography fontWeight = "500" fontSize = "20px">
             <Link href= "https://www.youtube.com/@HectorHectorson" target ="blank">https://www.youtube.com/@HectorHectorson</Link>
        </Typography>
        <Typography sx = {{mt: "1.5rem"}}>For boss guides in any game ever, a video format is amazing. You can see real time how a mechanic unfolds and how exacly to deal with it - movement, actions, etc. In FF14 there is never one universal strat unfortunately. So you may need to view multiple videos from different creators to find the strat that the general population seems to be using. Some standout creators are Hector, Xenosys Vex, and MrHappy.  </Typography>
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
        </Box>
    );
};

export default EncounterPage;