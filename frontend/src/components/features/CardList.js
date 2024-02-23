import {useState, useEffect} from "react";
import axios from "axios";
import {DataGrid} from "@mui/x-data-grid";
import {Link} from "react-router-dom";
import {Button, Container} from "@mui/material";
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
        {field: "cardId", headerName: "Card Id", flex: 1},
        {field: "customerId", headerName: "Customer Id", flex: 1},
        {field: "cardNumber", headerName: "Card Number", flex: 1},
        {field: "cardType", headerName: "Card Type", flex: 1},
        {field: "totalLimit", headerName: "Total Limit", flex: 1},
        {field: "amountUsed", headerName: "Amount Used", flex: 1},
        {field: "availableAmount", headerName: "Available Amount", flex: 1},
        {field: "createDt", headerName: "Create Date", flex: 1}
    ];

    return (
        <div className="CardList" style={{display: "grid", placeItems: "center", minHeight: "100vh"}}>
            <NavBar text="Afficher toutes les cartes"/>
            <Container style={{width: "100%", height: "100%"}}>
                <DataGrid
                    columns={columns}
                    rows={rows}
                    pageSizeOptions={[5, 15, 30]}
                    autoHeight
                    disableColumnMenu
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5
                            },
                        },
                    }}
                />
            </Container>
            <HomeButton/>
        </div>
    );
}

export default CardList;
