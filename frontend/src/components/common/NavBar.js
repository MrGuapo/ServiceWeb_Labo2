import {AppBar, Box, Toolbar, Typography} from "@mui/material";

const NavBar = () => {
    return (
        <div className="NavBar">
            <AppBar position="fixed">
                <Box sx={{display: "flex", justifyContent: "center"}}>
                    <Toolbar>
                        <Typography variant="h6" component="div">
                            Interface Utilisateur : Gestion de cartes
                        </Typography>
                    </Toolbar>
                </Box>
            </AppBar>
        </div>
    );
}

export default NavBar;