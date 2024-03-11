import {useState} from "react";
import axios from "axios";
import {
    Alert,
    Button,
    Container, Fade,
    FormControl,
    Input,
    InputLabel,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import NavBar from "../common/NavBar";
import HomeButton from "../common/HomeButton";

const DeleteCardByNumber = () => {
    const [cardNumber, setCardNumber] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const deleteCard = async () => {
        try {
            await axios.delete(`deleteCardByNumber/${cardNumber}`);
            setCardNumber("");
            setSuccessMessage(`La carte avec le numéro "${cardNumber}" a été supprimée avec succès!`);
            setTimeout(() => {
                setSuccessMessage("");
            }, 5000);
        } catch (e) {
            if (e.response && e.response.status === 404) {
                setErrorMessage("Une carte avec ce numéro n'existe pas.");
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
        setCardNumber(e.target.value);
    };

    return (
        <div
            className="DeleteCardByNumber"
            style={{display: "flex", flexDirection: "column", minHeight: "100vh"}}
        >
            <NavBar text="Supprimer une carte par son numero"/>
            <Container
                style={{
                    flex: "1",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <FormControl variant="standard" style={{width: "300px", textAlign: "center"}}>
                    <InputLabel htmlFor="cardNumber">Numéro de carte</InputLabel>
                    <Input type="text" value={cardNumber} onChange={handleInputChange}/>
                    <Button
                        onClick={deleteCard}
                        variant="contained"
                        startIcon={<DeleteIcon/>}
                        style={{marginTop: "5px"}}
                    >
                        Supprimer carte
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

export default DeleteCardByNumber;
