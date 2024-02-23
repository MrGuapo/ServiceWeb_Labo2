import {Link} from "react-router-dom";
import {Button} from "@mui/material";

const HomeButton = () => {
    return (
        <div className="HomeButton" style={{position: "absolute", bottom: "10px", right: "10px"}}>
            <Link to="/">
                <Button variant="contained">Retour a l'accueil</Button>
            </Link>
        </div>
    );
}

export default HomeButton;