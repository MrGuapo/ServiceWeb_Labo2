import {Route, Routes} from "react-router-dom";
import NavBar from "./components/common/NavBar";
import Home from "./components/common/Home";
import CardList from "./components/features/CardList";
import DeleteCardByNumber from "./components/features/DeleteCardByNumber";
import DeleteCardsByCustomerId from "./components/features/DeleteCardsByCustomerId";
import UpdateCardLimit from "./components/features/UpdateCardLimit";
import GetCardsByType from "./components/features/GetCardsByType";
import AddCard from "./components/features/AddCard";

export default function App() {

    return (
        <div className="App">
            <NavBar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/cardList" element={<CardList/>}/>
                <Route path="/deleteCardByNumber" element={<DeleteCardByNumber/>}/>
                <Route path="/deleteCardByCustomerId" element={<DeleteCardsByCustomerId/>}/>
                <Route path="/updateCardLimit" element={<UpdateCardLimit/>}/>
                <Route path="/getCardsByType" element={<GetCardsByType/>}/>
                <Route path="/addCard" element={<AddCard/>}/>
                <Route/>
            </Routes>
        </div>
    );
}