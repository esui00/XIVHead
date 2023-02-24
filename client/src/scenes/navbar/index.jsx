import { useState } from "react";
import { 
    Box,
    IconButton,
    InputBase,
    Typography,
    Select,
    MenuItem,
    FormControl,
    useTheme,
    useMediaQuery,
    InputLabel
} from "@mui/material";
import{
    Search,
    Message,
    DarkMode,
    LightMode,
    Notifications,
    Help,
    Menu,
    Close,
    NetworkCell
} from "@mui/icons-material";
import { useDispatch,useSelector } from "react-redux";
import {setMode, setLogout} from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";



const Navbar = () =>{
    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

    //theme.palette.dark for dark, etc. from theme.js
    const theme = useTheme();
    const neutralLight = theme.palette.neutralLight;
    const dark = theme.palette.neutralDark;
    const background = theme.palette.background.default;
    const primaryLight = theme.palette.primary.light;
    const alt = theme.palette.background.alt;

    const shownName = `${user.displayName}`;

    return <FlexBetween padding = "1rem 6%" backgroundColor = {alt}> 
        <FlexBetween gap = "1.75rem 6%">
            <Typography 
            fontWeight = "bold" 
            fontSize = "clamp(1rem,2rem, 2.25rem)"
            color = "primary" 
            onClick ={() => navigate ("/")}
            sx={{
                "&:hover":{
                    color: primaryLight,
                    cursor: "pointer",
                },
            }}
            >
                XIVHead
            </Typography>
            {isNonMobileScreens && (
                <FlexBetween backgroundColor = {neutralLight} borderRadius= "9px" gap = "3rem" padding = "0.1rem 1.5rem">
                    <InputBase placeholder = "Search..."/>
                    <IconButton>
                        <Search />
                    </IconButton>
                </FlexBetween>    
            )}
        </FlexBetween>


        <FormControl variant ="standard">
            <InputLabel id = "glam">Glamour</InputLabel>
                <Select
                    id = "glam"
                    sx = {{
                        backgroundColor: neutralLight,
                        width: "150px",
                        borderRadius: "0.25rem",
                        p: "0.25rem 1rem",
                        "& .MuiSvgIcon-root": {
                            pr: "0.25rem",
                            width: "3rem"
                        },
                        "& .MuiSelect-select:focus":{
                            backgroundColor: neutralLight
                        }
                    }}

                > 
                    <MenuItem onClick ={() => navigate ("/housing")}>
                        <Typography>Housing</Typography>
                    </MenuItem>
                    <MenuItem onClick ={() => navigate ("/relic")}>
                        <Typography>Relic Weapons</Typography>
                    </MenuItem>
                </Select>
        </FormControl> 

        <FormControl variant ="standard">
            <InputLabel id = "glam">Combat</InputLabel>
                <Select
                    id = "glam"
                    sx = {{
                        backgroundColor: neutralLight,
                        width: "150px",
                        borderRadius: "0.25rem",
                        p: "0.25rem 1rem",
                        "& .MuiSvgIcon-root": {
                            pr: "0.25rem",
                            width: "3rem"
                        },
                        "& .MuiSelect-select:focus":{
                            backgroundColor: neutralLight
                        }
                    }}

                > 
                    <MenuItem onClick ={() => navigate ("/jobs")}>
                        <Typography>Job Guides</Typography>
                    </MenuItem>
                    <MenuItem onClick ={() => navigate ("/encounters")}>
                        <Typography>Encounter Guides</Typography>
                    </MenuItem>
                </Select>
        </FormControl> 

        {isNonMobileScreens ? 
        (<FlexBetween gap = "2rem">
            <IconButton onClick ={() =>dispatch(setMode())}>
                {theme.palette.mode === "dark" ? (
                    <DarkMode sx = {{fontSize: "25px"}}/>
                ):(
                    <LightMode sx = {{color: dark, fontSize: "25px"}} />
                )}
            </IconButton>
            <FormControl variant ="standard" value = {shownName}>
                <Select
                    value = {shownName}
                    sx = {{
                        backgroundColor: neutralLight,
                        width: "150px",
                        borderRadius: "0.25rem",
                        p: "0.25rem 1rem",
                        "& .MuiSvgIcon-root": {
                            pr: "0.25rem",
                            width: "3rem"
                        },
                        "& .MuiSelect-select:focus":{
                            backgroundColor: neutralLight
                        }
                    }}
                    input = {<InputBase/>}
                >
                    <MenuItem value = {shownName}>
                        <Typography>{shownName}</Typography>
                    </MenuItem>
                    <MenuItem onClick={() => {dispatch (setLogout());navigate ("/login");}} >Log Out</MenuItem>
                </Select>
            </FormControl>
        </FlexBetween>
        ) : (
        <IconButton
            onClick={()=> setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
            <Menu />
        </IconButton>
        )}

        {!isNonMobileScreens && isMobileMenuToggled && (
            <Box
                position = "fixed"
                right = "0"
                bottom = "0"
                height = "100%"
                zIndex = "10"
                maxWidth = "500px"
                minWidth = "300px"
                backgroundColor= {background}
            >
                <Box display= "flex" justifyContent= "flex-end"p = "1rem">
                    <IconButton
                        onClick={()=> setIsMobileMenuToggled(!isMobileMenuToggled)}
                    >
                        <Close></Close>
                    </IconButton>
                </Box>


            <FlexBetween display = "flex" flexDirection = "column" justifyContent = "center" alignItems = "center" gap = "3rem">
            <IconButton onClick ={() =>dispatch(setMode())}>
                {theme.palette.mode === "dark" ? (
                    <DarkMode sx = {{fontSize: "25px"}}/>
                ):(
                    <LightMode sx = {{color: dark, fontSize: "25px"}} />
                )}
            </IconButton>
            <FormControl variant ="standard" value = {shownName}>
                <Select
                    value = {shownName}
                    sx = {{
                        backgroundColor: neutralLight,
                        width: "150px",
                        borderRadius: "0.25rem",
                        p: "0.25rem 1rem",
                        "& .MuiSvgIcon-root": {
                            pr: "0.25rem",
                            width: "3rem"
                        },
                        "& .MuiSelect-select:focus":{
                            backgroundColor: neutralLight
                        }
                    }}
                    input = {<InputBase/>}
                >
                    <MenuItem value = {shownName}>
                        <Typography>{shownName}</Typography>
                    </MenuItem>
                    <MenuItem onClick={() => {dispatch (setLogout());navigate ("/login");}}>Log Out</MenuItem>
                </Select>
            </FormControl>
        </FlexBetween>
            </Box>
        )}
    </FlexBetween>
};

export default Navbar;