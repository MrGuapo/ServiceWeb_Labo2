import {useState} from "react";
import axios from "axios";
import NavBar from "../common/NavBar";
import {Alert, Button, Container, Fade, FormControl, Input, InputLabel} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import HomeButton from "../common/HomeButton";

const DeleteCardsByCustomerId = () => {
    const [customerId, setCustomerId] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const deleteCards = async () => {
        if (!customerId) {
            setErrorMessage("Veuillez entrer un ID client.");
            setTimeout(() => {
                setErrorMessage("");
            }, 5000);
            return;
        }
        try {
            await axios.delete(`deleteCardsByCustomerId/${customerId}`);
            setCustomerId("");
            setSuccessMessage(`Les cartes avec le ID client "${customerId}" ont été supprimées avec succès!`);
            setTimeout(() => {
                setSuccessMessage("");
            }, 5000);
        } catch (e) {
            if (e.response && e.response.status === 404) {
                setErrorMessage("Ce ID client n'existe pas.");
                setTimeout(() => {
                    setErrorMessage("");
                }, 5000);
            } else {
                console.error(
                    "Une erreur s'est produite lors de la suppression de la carte : ", e);
            }
        }
    };

    const handleInputChange = (e) => {
        setCustomerId(e.target.value);
    }

    return (
        <div className="DeleteCardsByCustomerId" style={{display: "flex", flexDirection: "column", minHeight: "100vh"}}>
            <NavBar text="Supprimer des cartes par leur ID Client"/>
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
                    <Button
                        onClick={deleteCards}
                        variant="contained"
                        startIcon={<DeleteIcon/>}
                        style={{marginTop: "5px"}}>
                        Supprimer cartes
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

export default DeleteCardsByCustomerId;