import {Button, ButtonGroup, Container} from "@mui/material";
import {Link} from "react-router-dom";
import NavBar from "./NavBar";

const Home = () => {
    return (
        <div className="Home">
            <NavBar text="Gestion de cartes"/>
            <Container sx={{marginTop: "80px"}}>
                <ButtonGroup>
                    <Link to="/cardList">
                        <Button>Afficher toutes les cartes</Button>
                    </Link>
                    <Link to="/deleteCardByNumber">
                        <Button>Supprimer une carte par numero</Button>
                    </Link>
                    <Link to="/deleteCardByCustomerId">
                        <Button>Supprimer des cartes par ID Client</Button>
                    </Link>
                    <Link to="/updateCardLimit">
                        <Button>Mettre a jour limite d'une carte</Button>
                    </Link>
                    <Link to="getCardsByType">
                        <Button>Rechercher cartes par type</Button>
                    </Link>
                    <Link to="addCard">
                        <Button>Ajouter une nouvelle carte</Button>
                    </Link>
                </ButtonGroup>
            </Container>
        </div>
    );
}

export default Home;