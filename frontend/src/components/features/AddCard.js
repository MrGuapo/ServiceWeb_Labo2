import {useState} from "react";
import axios from "axios";
import {Button, Container, FormControl, TextField, Typography} from "@mui/material";
import NavBar from "../common/NavBar";
import HomeButton from "../common/HomeButton";
import AddIcon from '@mui/icons-material/Add';

const AddCard = () => {
    const [customerId, setCustomerId] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [cardType, setCardType] = useState("");
    const [totalLimit, setTotalLimit] = useState("");
    const [amountUsed, setAmountUsed] = useState("");
    const [availableAmount, setAvailableAmount] = useState("");
    const [createDt, setCreateDt] = useState("");
    const [isCreated, setIsCreated] = useState(false);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        if (name === "customerId") {
            setCustomerId(value);
        } else if (name === "cardNumber") {
            setCardNumber(value);
        } else if (name === "cardType") {
            setCardType(value);
        } else if (name === "totalLimit") {
            setTotalLimit(value);
        } else if (name === "amountUsed") {
            setAmountUsed(value);
        } else if (name === "availableAmount") {
            setAvailableAmount(value);
        } else if (name === "createDt") {
            setCreateDt(value);
        }
    };

    const createCard = async () => {
        try {
            await axios.post(`newCard`, {
                customerId,
                cardNumber,
                cardType,
                totalLimit,
                amountUsed,
                availableAmount,
                createDt
            });
            setIsCreated(true);
        } catch (error) {
            console.error("Error creating card:", error);
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
                        id="cardNumber"
                        name="cardNumber"
                        label="Card Number"
                        value={cardNumber}
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
                    <TextField
                        id="amountUsed"
                        name="amountUsed"
                        label="Amount Used"
                        value={amountUsed}
                        onChange={handleInputChange}
                        variant="outlined"
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        id="availableAmount"
                        name="availableAmount"
                        label="Available Amount"
                        value={availableAmount}
                        onChange={handleInputChange}
                        variant="outlined"
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        id="createDt"
                        name="createDt"
                        label="Create Date"
                        value={createDt}
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
                    {isCreated && (
                        <Typography sx={{color: "green", marginTop: "10px"}}>
                            La carte a été créée avec succès!
                        </Typography>
                    )}
                </FormControl>
            </Container>
            <HomeButton/>
        </div>
    );
}

export default AddCard;
