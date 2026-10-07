import { useGame } from "../context/GameContext";

function Flag() {
    const {
        currentCountry,
    } = useGame();

    if (!currentCountry) {
        return null;
    }

    return (
        <div className="flag-container">
            <img
                src={currentCountry.flag}
                alt="Bandera del país"
                className="flag"
            />
        </div>
    );
}

export default Flag;