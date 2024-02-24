import {useState} from "react";
import axios from "axios";
import {Button, Container, FormControl, TextField, Typography} from "@mui/material";
import NavBar from "../common/NavBar";
import HomeButton from "../common/HomeButton";
import UpgradeIcon from '@mui/icons-material/Upgrade';

const UpdateCardLimit = () => {
    const [cardId, setCardId] = useState("");
    const [newLimit, setNewLimit] = useState("");
    const [isUpdated, setIsUpdated] = useState(false);

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
            setIsUpdated(true);
        } catch (error) {
            console.error("Error updating card limit:", error);
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
                    {isUpdated && (
                        <Typography sx={{color: "green", marginTop: "10px"}}>
                            La limite de la carte avec le ID " {cardId} " a été mise à jour avec succès!
                        </Typography>
                    )}
                </FormControl>
            </Container>
            <HomeButton/>
        </div>
    );
};

export default UpdateCardLimit;