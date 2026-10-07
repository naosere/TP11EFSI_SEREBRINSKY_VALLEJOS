import { useGame } from "../context/GameContext";

function SkipButton() {
    const {
        skipCountry,
        gameActive,
    } = useGame();

    return (
        <button
            className="skip-button"
            onClick={skipCountry}
            disabled={!gameActive}
        >
            ⏭️ Saltear
            <span>
                -3 puntos
            </span>
        </button>
    );
}

export default SkipButton;