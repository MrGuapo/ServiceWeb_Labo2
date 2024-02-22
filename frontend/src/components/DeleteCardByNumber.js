import {useState} from "react";
import axios from "axios";

const DeleteCardByNumber = () => {
    const [cardNumber, setCardNumber] = useState("");
    const [isDeleted, setIsDeleted] = useState(false);
    const [error, setError] = useState(null);

    const deleteCard = async () => {
        try {
            await axios.delete(`deleteCardByNumber/${cardNumber}`);
            setIsDeleted(true);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleInputChange = (e) => {
        setCardNumber(e.target.value);
    };

    return (
        <div className="DeleteCardByNumber">
            <input type="text" value={cardNumber} onChange={handleInputChange}/>
            {isDeleted ? (
                <p>Card with number {cardNumber} has been successfully deleted.</p>
            ) : (
                <button onClick={deleteCard}>Delete Card</button>
            )}
            {error && <p>Error: {error}</p>}
        </div>
    );
};

export default DeleteCardByNumber;