import {useState} from "react";
import axios from "axios";
import NavBar from "../common/NavBar";
import {Button, Container, FormControl, Input, InputLabel, Typography} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import HomeButton from "../common/HomeButton";

const DeleteCardsByCustomerId = () => {
    const [customerId, setCustomerId] = useState("");
    const [isDeleted, setIsDeleted] = useState(false);

    const deleteCards = async () => {
        await axios.delete(`deleteCardsByCustomerId/${customerId}`);
        setIsDeleted(true);

    };

    const handleInputChange = (e) => {
        setCustomerId(e.target.value);
    }

    return (
        <div className="DeleteCardsByCustomerId" style={{display: "flex", flexDirection: "column", minHeight: "100vh"}}>
            <NavBar text="Supprimer des cartes par ID Client"/>
            <Container
                style={{
                    flex: "1",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                <FormControl variant="standard" style={{width: "300px", textAlign: "center"}}>
                    <InputLabel htmlFor="cardNumber">ID du Client</InputLabel>
                    <Input type="text" value={customerId} onChange={handleInputChange}/>
                    {isDeleted ? (
                        <Typography sx={{color: "green"}}>
                            Les cartes avec le ID client " {customerId} " ont été supprimées avec succès!
                        </Typography>
                    ) : (
                        <Button
                            onClick={deleteCards}
                            variant="contained"
                            startIcon={<DeleteIcon/>}
                            style={{marginTop: "5px"}}>
                            Supprimer cartes
                        </Button>
                    )}
                </FormControl>
            </Container>
            <HomeButton/>
        </div>
    );
};

export default DeleteCardsByCustomerId;