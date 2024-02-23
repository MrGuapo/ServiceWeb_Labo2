import {AppBar, Box, Toolbar, Typography} from "@mui/material";

const NavBar = ({text}) => {
    return (
        <div className="NavBar">
            <AppBar position="fixed">
                <Box sx={{display: "flex", justifyContent: "center"}}>
                    <Toolbar>
                        <Typography variant="h6" component="div">
                            Interface Utilisateur : {text}
                        </Typography>
                    </Toolbar>
                </Box>
            </AppBar>
        </div>
    );
}

export default NavBar;