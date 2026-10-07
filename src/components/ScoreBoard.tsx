import { useGame } from "../context/GameContext";

function ScoreBoard() {
    const {
        score,
        playerName,
    } = useGame();

    return (
        <div className="score-board">
            <div className="score-player">
                <span>
                    JUGADOR
                </span>

                <strong>
                    {playerName}
                </strong>
            </div>

            <div className="score-points">
                <span>
                    PUNTOS
                </span>

                <strong>
                    {score}
                </strong>
            </div>
        </div>
    );
}

export default ScoreBoard;