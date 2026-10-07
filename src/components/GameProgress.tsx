import { useGame } from "../context/GameContext";

function GameProgress() {
    const {
        currentRound,
    } = useGame();

    return (
        <div className="game-progress">
            <span>
                BANDERA
            </span>

            <strong>
                {currentRound} / 15
            </strong>
        </div>
    );
}

export default GameProgress;