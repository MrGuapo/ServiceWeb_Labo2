import {useState} from "react";
import axios from "axios";

const DeleteCardsByCustomerId = () => {
    const [customerId, setCustomerId] = useState("");
    const [isDeleted, setIsDeleted] = useState(false);
    const [error, setError] = useState(null);

    const deleteCards = async () => {
        try {
            await axios.delete(`deleteCardsByCustomerId/${customerId}`);
            setIsDeleted(true);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleInputChange = (e) => {
        setCustomerId(e.target.value);
    }

    return (
        <div className="DeleteCardsByCustomerId">
            <input type="text" value={customerId} onChange={handleInputChange}/>
            {isDeleted ? (
                <p>Cards with customer id {customerId} have been successfully deleted.</p>
            ) : (
                <button onClick={deleteCards}>Delete Cards</button>
            )}
            {error && <p>Error: {error}</p>}
        </div>
    );
};

export default DeleteCardsByCustomerId;