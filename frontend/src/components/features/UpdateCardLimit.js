import {useState} from "react";
import axios from "axios";
import {Alert, Button, Container, Fade, FormControl, TextField, Typography} from "@mui/material";
import NavBar from "../common/NavBar";
import HomeButton from "../common/HomeButton";
import UpgradeIcon from '@mui/icons-material/Upgrade';

const UpdateCardLimit = () => {
    const [cardId, setCardId] = useState("");
    const [newLimit, setNewLimit] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        if (name === "cardId") {
            setCardId(value);
        } else if (name === "newLimit") {
            setNewLimit(value);
        }
    };

    const updateCard = async () => {
        try {
            await axios.put(`updateCardLimit/${cardId}`, parseInt(newLimit),
                {headers: {'Content-Type': 'application/json'}});
            setCardId("");
            setNewLimit("");
            setSuccessMessage(`La limite de la carte avec le ID " ${cardId} " a été mise à jour avec succès!`);
            setTimeout(() => {
                setSuccessMessage("");
            }, 5000);
        } catch (e) {
            if (e.response && e.response.status === 404) {
                setErrorMessage("Ce Card ID n'existe pas.");
                setTimeout(() => {
                    setErrorMessage("");
                }, 5000);
            } else {
                console.error(
                    "Une erreur s'est produite lors de la modification de la carte : ", e);
            }
        }
    };

    return (
        <div className="UpdateCardLimit" style={{display: "flex", flexDirection: "column", minHeight: "100vh"}}>
            <NavBar text="Mettre à jour la limite d'une carte"/>
            <Container
                style={{
                    flex: "1",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <FormControl style={{width: "300px"}}>
                    <TextField
                        id="cardId"
                        name="cardId"
                        label="Card ID"
                        value={cardId}
                        onChange={handleInputChange}
                        variant="outlined"
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        id="newLimit"
                        name="newLimit"
                        label="Nouvelle Limite"
                        value={newLimit}
                        onChange={handleInputChange}
                        variant="outlined"
                        margin="normal"
                        fullWidth
                    />
                    <Button
                        onClick={updateCard}
                        variant="contained"
                        startIcon={<UpgradeIcon/>}
                        style={{marginTop: "10px"}}
                    >
                        Mettre à jour la limite
                    </Button>
                    {successMessage && (
                        <Fade in={true} timeout={1000}>
                            <Alert sx={{marginTop: "10px"}}>
                                {successMessage}
                            </Alert>
                        </Fade>
                    )}
                    {errorMessage && (
                        <Fade in={true} timeout={1000}>
                            <Alert severity="error" sx={{marginTop: "10px"}}>
                                {errorMessage}
                            </Alert>
                        </Fade>
                    )}
                </FormControl>
            </Container>
            <HomeButton/>
        </div>
    );
};

export default UpdateCardLimit;