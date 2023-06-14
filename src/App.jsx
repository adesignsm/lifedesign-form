import "./root.css";

import PersonalForm from "./Components/PersonalForm";
import PopUps from "./Components/PopUps";
import LD_FLOWER from "./Assets/Media/LD_FLOWER.png";

const App = () => {
    return (
        <>
            <img id="LD_FLOWER" src={LD_FLOWER} />
            <div id="app">
                <PersonalForm />
                <PopUps />
            </div>
        </>
    )
}

export default App;