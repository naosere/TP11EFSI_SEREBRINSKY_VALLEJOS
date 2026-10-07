import { useGame } from "../context/GameContext";

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

function Leaderboard() {
    const {
        leaderboard,
    } = useGame();

    return (
        <section className="leaderboard">
            <h1>
                🏆 Ranking
            </h1>

            <p className="leaderboard-subtitle">
                Mejor resultado de cada jugador
            </p>

            {leaderboard.length === 0 ? (
                <p>
                    Todavía no hay jugadores.
                </p>
            ) : (
                <div className="ranking-list">
                    <div className="ranking-header">
                        <span>
                            #
                        </span>

                        <span>
                            Jugador
                        </span>

                        <span>
                            Puntos
                        </span>

                        <span>
                            Tiempo
                        </span>

                        <span>
                            Partidas
                        </span>
                    </div>

                    {leaderboard.map(
                        (
                            player,
                            index
                        ) => (
                            <div
                                className={`ranking-item ${
                                    index ===
                                    0
                                        ? "ranking-first"
                                        : ""
                                }`}
                                key={
                                    player.name
                                }
                            >
                                <span>
                                    {index + 1}
                                </span>

                                <strong>
                                    {
                                        player.name
                                    }
                                </strong>

                                <span>
                                    {
                                        player.bestScore
                                    }
                                </span>

                                <span>
                                    {formatTime(
                                        player.bestTime
                                    )}
                                </span>

                                <span>
                                    {
                                        player.games
                                    }
                                </span>
                            </div>
                        )
                    )}
                </div>
            )}
        </section>
    );
}

export default Leaderboard;