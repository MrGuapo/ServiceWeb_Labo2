import CardList from "./components/CardList";
import DeleteCardByNumber from "./components/DeleteCardByNumber";
import DeleteCardsByCustomerId from "./components/DeleteCardsByCustomerId";

export default function App() {

    return (
        <div className="App">
            <CardList/>
            {/*<DeleteCardByNumber/>*/}
            {/*<DeleteCardsByCustomerId/>*/}
        </div>
    );
}