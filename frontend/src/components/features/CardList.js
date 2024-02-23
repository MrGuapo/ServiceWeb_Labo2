import {useState, useEffect} from "react";
import axios from "axios";
import {DataGrid} from "@mui/x-data-grid";
import {Link} from "react-router-dom";
import {Button} from "@mui/material";

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
        {field: "cardId", headerName: "Card Id", width: "150"},
        {field: "customerId", headerName: "Customer Id", width: "150"},
        {field: "cardNumber", headerName: "Card Number", width: "150"},
        {field: "cardType", headerName: "Card Type", width: "150"},
        {field: "totalLimit", headerName: "Total Limit", width: "150"},
        {field: "amountUsed", headerName: "Amount Used", width: "150"},
        {field: "availableAmount", headerName: "Available Amount", width: "150"},
        {field: "createDt", headerName: "Create Date", width: "150"}
    ];

    return (
        <div className="CardList">
            <DataGrid
                columns={columns}
                rows={rows}
                sx={{marginTop: "80px"}}
                pageSizeOptions={[3, 5, 10]}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 3
                        },
                    },
                }}/>
            <Link to="/">
                <Button variant="contained" sx={{marginTop: "10px"}}>Retour a l'accueil</Button>
            </Link>
        </div>
    );
}

export default CardList;