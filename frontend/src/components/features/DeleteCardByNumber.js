import {useState} from "react";
import axios from "axios";
import {Button, Container, FormControl, Input, InputLabel, Typography} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import NavBar from "../common/NavBar";
import HomeButton from "../common/HomeButton";

const DeleteCardByNumber = () => {
    const [cardNumber, setCardNumber] = useState("");
    const [isDeleted, setIsDeleted] = useState(false);

    const deleteCard = async () => {
        await axios.delete(`deleteCardByNumber/${cardNumber}`);
        setIsDeleted(true);
    };

    const handleInputChange = (e) => {
        setCardNumber(e.target.value);
    };

    return (
        <div className="DeleteCardByNumber" style={{display: "flex", flexDirection: "column", minHeight: "100vh"}}>
            <NavBar text="Supprimer une carte par son numero"/>
            <Container style={{
                flex: "1",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <FormControl variant="standard" style={{width: "300px", textAlign: "center"}}>
                    <InputLabel htmlFor="cardNumber">Numéro de carte</InputLabel>
                    <Input type="text" value={cardNumber} onChange={handleInputChange}/>
                    {isDeleted ? (
                        <Typography sx={{color: "green"}}>La carte avec le numéro {cardNumber} a été supprimée avec
                            succès!</Typography>
                    ) : (
                        <Button onClick={deleteCard} variant="contained" startIcon={<DeleteIcon/>}
                                style={{marginTop: "5px"}}>
                            Supprimer carte
                        </Button>
                    )}
                </FormControl>
            </Container>
            <HomeButton/>
        </div>
    );
};

export default DeleteCardByNumber;
