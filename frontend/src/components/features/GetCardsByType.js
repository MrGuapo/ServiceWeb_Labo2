import {useState, useEffect} from "react";
import axios from "axios";
import {DataGrid} from "@mui/x-data-grid";
import {Container, TextField, Button} from "@mui/material";
import NavBar from "../common/NavBar";
import HomeButton from "../common/HomeButton";

const GetCardsByType = () => {
    const [cardType, setCardType] = useState("");
    const [rows, setRows] = useState([]);

    useEffect(() => {
        const fetchCards = async () => {
            if (cardType.trim() === "") return;

            try {
                const response = await axios.get(`AllCardsByCardType/${cardType}`);
                setRows(response.data.map(row => ({...row, id: row["cardId"]})));
            } catch (error) {
                console.error("Error fetching cards:", error);
            }
        };
        fetchCards().catch(error => {
            console.error("Error in fetchCards:", error);
        });
    }, [cardType]);

    const handleInputChange = (e) => {
        const inputValue = e.target.value.toLowerCase();
        if (inputValue === "credit" || inputValue === "crédit") {
            setCardType("Crédit");
        } else if (inputValue === "debit" || inputValue === "débit") {
            setCardType("Débit");
        } else {
            setCardType(inputValue);
        }
    };


    const handleReset = () => {
        setCardType("");
        setRows([]);
    };

    const columns = [
        {field: "cardId", headerName: "ID Carte", flex: 1},
        {field: "customerId", headerName: "ID Client", flex: 1},
        {field: "cardNumber", headerName: "Numéro Carte", flex: 1},
        {field: "cardType", headerName: "Type Carte", flex: 1},
        {field: "totalLimit", headerName: "Limite Totale", flex: 1},
        {field: "amountUsed", headerName: "Montant Utilisé", flex: 1},
        {field: "availableAmount", headerName: "Montant Disponible", flex: 1},
        {field: "createDt", headerName: "Date Création", flex: 1}
    ];

    return (
        <div className="GetCardsByType"
             style={{display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh"}}>
            <NavBar text="Rechercher les cartes par type"/>
            <Container style={{width: "100%", padding: "20px", boxSizing: "border-box", marginTop: "80px"}}>
                <TextField
                    id="cardType"
                    name="cardType"
                    label="Type de carte"
                    value={cardType}
                    onChange={handleInputChange}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                />
                <Button variant="contained" onClick={handleReset} style={{marginTop: "20px"}}>Réinitialiser</Button>
                {rows.length > 0 && (
                    <div style={{width: "100%", marginTop: "20px"}}>
                        <DataGrid
                            columns={columns}
                            rows={rows}
                            pageSizeOptions={[5, 15, 30]}
                            autoHeight
                            disableColumnMenu
                            rowSelection={false}
                            pagination
                            style={{width: "100%"}}
                            initialState={{
                                pagination: {
                                    paginationModel: {
                                        pageSize: 5
                                    },
                                },
                            }}
                        />
                    </div>
                )}
            </Container>
            <HomeButton/>
        </div>
    );
}

export default GetCardsByType;
