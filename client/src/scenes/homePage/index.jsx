import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import { Box, Typography,useTheme, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import ReactDOM from 'react-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HomePageAPI from "./HomePage";
import { createRoot } from 'react-dom/client';
import root from '../../root.js';

const HomePage = () =>{
    const theme = useTheme();
    //const navigate = useNavigate();
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const {_id} = useSelector((state) => state.user); 
    const primaryLight = theme.palette.primary.light;
    const [newsData, setNewsData] = useState([]);

    return(
        <Box>
            <Navbar/>   
            <FlexBetween display = "flex" flexDirection = "column" justifyContent = "end" alignItems = "" gap = "1rem" >
            <HomePageAPI/>
        </FlexBetween>  
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

// Render the App component using the existing root object
root.render(<HomePage/>);
export default HomePage;