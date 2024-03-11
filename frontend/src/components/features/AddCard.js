import {useState} from "react";
import axios from "axios";
import {Alert, Button, Container, Fade, FormControl, TextField, Typography} from "@mui/material";
import NavBar from "../common/NavBar";
import HomeButton from "../common/HomeButton";
import AddIcon from '@mui/icons-material/Add';

const AddCard = () => {
    const [customerId, setCustomerId] = useState("");
    const [cardType, setCardType] = useState("");
    const [totalLimit, setTotalLimit] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const date = `${year}-${month}-${day}`;

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        if (name === "customerId") {
            setCustomerId(value);
        } else if (name === "cardType") {
            setCardType(value);
        } else if (name === "totalLimit") {
            setTotalLimit(value);
        }
    };

    const createCard = async () => {
        try {
            if (!customerId || !cardType || !totalLimit) {
                setErrorMessage("Merci de remplir tous les champs.");
                setTimeout(() => {
                    setErrorMessage("");
                }, 5000);
                return;
            }

            const randomCardNumber = Math.floor(1000000000000000 + Math.random() * 9000000000000000);
            await axios.post(`newCard`, {
                customerId,
                cardNumber: randomCardNumber,
                cardType,
                totalLimit,
                amountUsed: "0",
                availableAmount: totalLimit,
                date
            });
            setCustomerId("");
            setCardType("");
            setTotalLimit("");
            setSuccessMessage("La carte a été créée avec succès!");
            setTimeout(() => {
                setSuccessMessage("");
            }, 5000);
        } catch (error) {
            console.error("Error creating card:", error);
            setErrorMessage("Une erreur s'est produite lors de la création de la carte. Veuillez réessayer.");
            setTimeout(() => {
                setErrorMessage("");
            }, 5000);
        }
    };

    return (
        <div className="AddCard" style={{display: "flex", flexDirection: "column", minHeight: "100vh"}}>
            <NavBar text="Ajouter une nouvelle carte"/>
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
                        id="customerId"
                        name="customerId"
                        label="Customer ID"
                        value={customerId}
                        onChange={handleInputChange}
                        variant="outlined"
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        id="cardType"
                        name="cardType"
                        label="Card Type"
                        value={cardType}
                        onChange={handleInputChange}
                        variant="outlined"
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        id="totalLimit"
                        name="totalLimit"
                        label="Total Limit"
                        value={totalLimit}
                        onChange={handleInputChange}
                        variant="outlined"
                        margin="normal"
                        fullWidth
                    />
                    <Button
                        onClick={createCard}
                        variant="contained"
                        startIcon={<AddIcon/>}
                        style={{marginTop: "10px"}}
                    >
                        Créer une carte
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
}

export default AddCard;
