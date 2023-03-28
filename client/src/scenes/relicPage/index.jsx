import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import { Link,Box, Typography,useTheme, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import relic from "./samurai.jpg";
import RelicsWidget from "scenes/widgets/RelicsWidget";
import MyRelicWidget from "scenes/widgets/MyRelicWidget";

const RelicPage = () =>{
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
        <Typography variant = "h1" sx = {{ mb : "1.5rem"}}>Relic Weapons</Typography>
        <Box
            component = "img"
            sx ={{
                height: 450,
                width: 1000,
                maxHeight: { xs: 300, md: 800},
                maxWidth: {xs: 600, md: 1000},
            }} 
            alt = "samurai relic"
            src = {relic}
         />
        <Typography word-wrap = "break-word" fontWeight = "500"  sx = {{mb: "1.5rem"}}>
            While generally powerful for their time, relic weapons eventually turn into very pretty cosmetics. 
        </Typography>
        <Typography variant = "h1">Gamerescape</Typography>
        <Typography fontWeight = "500" fontSize = "20px">
             <Link href="https://ffxiv.gamerescape.com/wiki/Category:Relic_Weapons" target = "blank">https://ffxiv.gamerescape.com/wiki/Category:Relic_Weapons</Link>
        </Typography>
        <Typography sx = {{mt: "1.5rem"}}>There are many resources for relic weapons, but I believe Gamerescape to be the best guide on acquiring these weapons. Gamerescape provides a clean format for what weapon expansion's relic you want to aim for, while also very neatly showing the quest order and requirements. Super simple and super straight foward. </Typography>
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
            <MyRelicWidget></MyRelicWidget>
            <RelicsWidget></RelicsWidget>
        </Box>
    );
};

export default RelicPage;