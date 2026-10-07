import {
    useNavigate,
} from "react-router-dom";

import {
    useGame,
} from "../context/GameContext";

import Leaderboard from "../components/LeaderBoard";

function formatTime(
    seconds: number
): string {
    const minutes =
        Math.floor(seconds / 60);

    const remainingSeconds =
        seconds % 60;

    return `${String(minutes).padStart(
        2,
        "0"
    )}:${String(
        remainingSeconds
    ).padStart(2, "0")}`;
}

function LeaderboardPage() {
    const {
        startGame,
        playerName,
        score,
        elapsedTime,
    } = useGame();

    const navigate =
        useNavigate();

    function playAgain(): void {
        startGame();
        navigate("/game");
    }

    return (
        <main className="leaderboard-page">

            <div className="leaderboard-container">

                <section className="results-card">

                    <div className="results-top">
                        <div className="finished-icon">
                            🏆
                        </div>

                        <div>
                            <span className="results-eyebrow">
                                PARTIDA FINALIZADA
                            </span>

                            <h1>
                                ¡Excelente partida!
                            </h1>

                            <p>
                                Estos son los
                                resultados de{" "}
                                <strong>
                                    {playerName}
                                </strong>
                            </p>
                        </div>
                    </div>

                    <div className="final-result">

                        <div className="final-result-item score-result">
                            <span>
                                🏆 Puntos
                            </span>

                            <strong>
                                {score}
                            </strong>

                            <small>
                                puntos
                            </small>
                        </div>

                        <div className="final-result-divider" />

                        <div className="final-result-item">
                            <span>
                                ⏱️ Tiempo total
                            </span>

                            <strong>
                                {formatTime(
                                    elapsedTime
                                )}
                            </strong>

                            <small>
                                minutos
                            </small>
                        </div>

                        <div className="final-result-divider" />

                        <div className="final-result-item">
                            <span>
                                🌎 Banderas
                            </span>

                            <strong>
                                15
                            </strong>

                            <small>
                                completadas
                            </small>
                        </div>

                    </div>

                    <button
                        className="play-again-button"
                        onClick={
                            playAgain
                        }
                    >
                        <span>
                            🔄
                        </span>

                        Jugar de nuevo
                    </button>

                </section>

                <section className="ranking-section">

                    <div className="ranking-header">
                        <div className="ranking-title-icon">
                            🏆
                        </div>

                        <div>
                            <span>
                                CLASIFICACIÓN
                            </span>

                            <h2>
                                Ranking
                            </h2>

                            <p>
                                Los mejores jugadores
                            </p>
                        </div>
                    </div>

                    <Leaderboard />

                </section>

                <button
                    className="ranking-back-button"
                    onClick={() =>
                        navigate("/")
                    }
                >
                    ← Volver al inicio
                </button>

            </div>

        </main>
    );
}

export default LeaderboardPage;
