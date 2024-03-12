import {useState, useEffect} from "react";
import axios from "axios";
import {DataGrid, frFR} from "@mui/x-data-grid";
import {Container, createTheme, ThemeProvider} from "@mui/material";
import NavBar from "../common/NavBar";
import HomeButton from "../common/HomeButton";

const CardList = () => {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const response = await axios.get(`AllCards`);
                setRows(response.data.map(row => ({...row, id: row["cardId"]})));
            } catch (error) {
                console.error("Error fetching cards:", error);
            }
        };
        fetchCards().catch(error => {
            console.error("Error in fetchCards:", error);
        });
    }, []);

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

    const theme = createTheme(
        frFR
    );

    return (
        <div className="CardList" style={{display: "grid", placeItems: "center", minHeight: "100vh"}}>
            <NavBar text="Afficher toutes les cartes"/>
            <Container style={{width: "100%", height: "100%"}}>
                <ThemeProvider theme={theme}>
                    <DataGrid
                        columns={columns}
                        rows={rows}
                        pageSizeOptions={[5, 15, 30]}
                        autoHeight
                        disableColumnMenu
                        rowSelection={false}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 5
                                },
                            },
                        }}
                    />
                </ThemeProvider>
            </Container>
            <HomeButton/>
        </div>
    );
}

export default CardList;