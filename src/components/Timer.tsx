import { useGame } from "../context/GameContext";

function formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
        remainingSeconds
    ).padStart(2, "0")}`;
}

function Timer() {
    const { flagTime } = useGame();

    return (
        <div className="flag-timer">
            <span className="timer-icon">⏱️</span>

            <div>
                <small>Tiempo de esta bandera</small>

                <strong>
                    {formatTime(flagTime)}
                </strong>
            </div>
        </div>
    );
}

export default Timer;